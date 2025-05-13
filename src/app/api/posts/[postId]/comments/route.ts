import { db } from "@/lib/db";
import { currentUser } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    try {
        const user = await currentUser();

        if (!user) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const dbUser = await db.user.findUnique({
            where: {
                clerkId: user.id,
            },
        });

        if (!dbUser) {
            return NextResponse.json({ error: "User not found" }, { status: 404 });
        }

        const { content } = await req.json();

        // Extract postId from URL
        const postId = req.nextUrl.pathname.split("/")[4];

        const post = await db.post.findUnique({
            where: { id: postId },
            include: { user: true },
        });

        if (!post) {
            return NextResponse.json({ error: "Post not found" }, { status: 404 });
        }

        if (!content.trim()) {
            return NextResponse.json({ error: "Comment cannot be empty" }, { status: 400 });
        }

        const comment = await db.comment.create({
            data: {
                content,
                postId,
                userId: dbUser.id,
            },
            include: {
                user: {
                    select: {
                        username: true,
                        id: true,
                    },
                },
            },
        });

        return NextResponse.json({ comment });
    } catch (error) {
        console.error("Error creating comment: ", error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}

export async function GET(req: NextRequest) {
    try {
        const postId = req.nextUrl.pathname.split("/")[4];

        const comments = await db.comment.findMany({
            where: { postId },
            include: {
                user: {
                    select: {
                        username: true,
                        id: true,
                    },
                },
            },
            orderBy: { createdAt: "desc" },
        });

        return NextResponse.json({ comments });
    } catch (error) {
        console.error("Error fetching comments: ", error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}
