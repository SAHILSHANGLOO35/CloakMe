import { db } from "@/lib/db";
import { currentUser } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
    try {
        const user = await currentUser();

        if (!user) {
            return NextResponse.json(
                {
                    error: "Unauthorized",
                },
                {
                    status: 401,
                }
            );
        }

        const dbUser = await db.user.findUnique({
            where: {
                clerkId: user.id,
            },
        });

        if (!dbUser) {
            return NextResponse.json(
                {
                    error: "User not found",
                },
                {
                    status: 404,
                }
            );
        }

        const notifications = await db.notification.findMany({
            where: {
                userId: dbUser.id,
            },
            orderBy: {
                createdAt: "desc",
            },
            take: 30,
        });

        const notificationsWithDetails = await Promise.all(
            notifications.map(async (notification) => {
                let fromUser = null;
                let post = null;

                if (notification.fromUserId) {
                    fromUser = await db.user.findUnique({
                        where: {
                            id: notification.fromUserId,
                        },
                        select: {
                            id: true,
                            username: true,
                        },
                    });
                }

                if (notification.postId) {
                    post = await db.post.findUnique({
                        where: {
                            id: notification.postId,
                        },
                        select: {
                            id: true,
                            content: true,
                        },
                    });
                }

                return {
                    ...notification,
                    fromUser,
                    post,
                };
            })
        );

        return NextResponse.json({
            notifications: notificationsWithDetails,
        });
    } catch (error) {
        return NextResponse.json(
            {
                error: "Internal server error",
            },
            {
                status: 500,
            }
        );
    }
}
