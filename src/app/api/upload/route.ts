import { uploadImage } from "@/lib/cloudinary";
import { currentUser } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
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

        const { image } = await request.json();

        if (!image) {
            return NextResponse.json(
                {
                    error: "No image provided",
                },
                {
                    status: 400,
                }
            );
        }

        const imageUrl = await uploadImage(image);

        return NextResponse.json({
            url: imageUrl,
        });
    } catch (error) {
        console.error("Error in upload route:", error);
        return NextResponse.json(
            { error: "Internal server error" },
            { status: 500 }
        );
    }
}
