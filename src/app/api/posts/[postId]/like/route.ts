import { db } from "@/lib/db";
import { currentUser } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function POST(
    request: Request,
    {
        params,
    }: {
        params: { postId: string };
    }
) {
    try {
        const user = await currentUser();

        if (!user) {
            return NextResponse.json(
                {
                    error: "Unauthorized user",
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

        const postId = params.postId;

        const post = await db.post.findUnique({
            where: {
                id: postId,
            },
            include: {
                user: true,
            },
        });

        if (!post) {
            return NextResponse.json(
                {
                    error: "Post not found",
                },
                {
                    status: 404,
                }
            );
        }

        const existingLike = await db.like.findUnique({
            where: {
                postId_userId: {
                    postId,
                    userId: dbUser.id,
                },
            },
        });

        if (existingLike) {
            await db.like.delete({
                where: {
                    id: existingLike.id,
                },
            });
            return NextResponse.json({
                liked: false,
            });
        } else {
            await db.like.create({
                data: {
                    postId,
                    userId: dbUser.id,
                },
            });
        }

        return NextResponse.json({
            liked: true,
        });
    } catch (error) {
        console.error("Error liking/unliking the post: ", error);
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
