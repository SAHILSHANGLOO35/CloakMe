import { db } from "@/lib/db";
import { currentUser } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function POST(
    request: Request,
    {
        params,
    }: {
        params: {
            userId: string;
        };
    }
) {
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

        const followerUser = await db.user.findUnique({
            where: {
                clerkId: user.id,
            },
        });

        if (!followerUser) {
            return NextResponse.json(
                {
                    error: "User not found",
                },
                {
                    status: 404,
                }
            );
        }

        const followingUserId = await params.userId;

        const followingUser = await db.user.findUnique({
            where: {
                id: followingUserId,
            },
        });

        if (!followingUser) {
            return NextResponse.json(
                {
                    error: "User to follow not found",
                },
                {
                    status: 404,
                }
            );
        }

        if (followerUser.id === followingUserId) {
            return NextResponse.json(
                {
                    error: "Cannot follow yourself, Dumb!",
                },
                {
                    status: 400,
                }
            );
        }

        const existingFollow = await db.follow.findUnique({
            where: {
                followerId_followingId: {
                    followerId: followerUser.id,
                    followingId: followingUserId,
                },
            },
        });

        if (existingFollow) {
            await db.follow.delete({
                where: {
                    id: existingFollow.id,
                },
            });

            return NextResponse.json({
                following: false,
            });
        } else {
            await db.follow.create({
                data: {
                    followerId: followerUser.id,
                    followingId: followingUserId,
                },
            });
        }

        await db.notification.create({
            data: {
                userId: followingUserId,
                type: "follow",
                fromUserId: followerUser.id,
            },
        });

        return NextResponse.json({
            following: true,
        });
    } catch (error) {
        console.error("Error following/unfollowing user:", error);
        return NextResponse.json(
            { error: "Internal server error" },
            { status: 500 }
        );
    }
}

export async function GET(
    request: Request,
    {
        params,
    }: {
        params: {
            userId: string;
        };
    }
) {
    try {
        const user = await currentUser();
        const targetUserId = await params.userId;

        if (!user) {
            return NextResponse.json(
                {
                    following: false,
                },
                {
                    status: 401,
                }
            );
        }

        const followerUser = await db.user.findUnique({
            where: {
                clerkId: user.id,
            },
        });

        if (!followerUser) {
            return NextResponse.json({
                following: false,
            });
        }

        const existingFollow = await db.follow.findUnique({
            where: {
                followerId_followingId: {
                    followerId: followerUser.id,
                    followingId: targetUserId,
                },
            },
        });

        return NextResponse.json({
            following: !!existingFollow,
        });
    } catch (error) {
        console.error("Error checking follow status:", error);
        return NextResponse.json(
            { error: "Internal server error" },
            { status: 500 }
        );
    }
}
