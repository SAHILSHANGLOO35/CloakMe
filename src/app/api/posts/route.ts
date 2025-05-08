import { db } from "@/lib/db";
import { currentUser } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const user = await currentUser();

    if (!user) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const dbUser = await db.user.findUnique({
      where: { clerkId: user.id },
    });

    if (!dbUser) {
      return NextResponse.json(
        { error: "User not found" },
        { status: 404 }
      );
    }

    const { content, imageUrl, gifUrl } = await request.json();

    if (!content && !imageUrl && !gifUrl) {
      return NextResponse.json(
        { error: "Post must have content, image or GIF" },
        { status: 400 }
      );
    }

    const post = await db.post.create({
      data: {
        userId: dbUser.id,
        content: content || "",
        imageUrl,
        gifUrl,
      },
    });

    return NextResponse.json({ post });
  } catch (error) {
    console.error("Error creating post:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const search = searchParams.get("search");

    const posts = await db.post.findMany({
      where: search
        ? {
            OR: [
              {
                content: {
                  contains: search,
                  mode: "insensitive",
                },
              },
              {
                user: {
                  username: {
                    contains: search,
                    mode: "insensitive",
                  },
                },
              },
            ],
          }
        : undefined,
      include: {
        user: {
          select: {
            username: true,
            id: true,
            clerkId: true
          },
        },
        _count: {
          select: {
            comments: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json({ posts });
  } catch (error) {
    console.error("Error fetching posts:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}