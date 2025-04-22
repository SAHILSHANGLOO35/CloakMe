import { uploadImage } from "@/lib/cloudinary";
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

        console.log("Upload rqst received")

        const body = await request.json();
        
        if (!body.image) {
            return NextResponse.json(
                { error: "No image provided" },
                { status: 400 }
            );
        }

        try {
            const imageUrl = await uploadImage(body.image);
            return NextResponse.json({ url: imageUrl });
        } catch (uploadError) {
            console.error("Cloudinary upload error:", uploadError);
            return NextResponse.json(
                // @ts-ignore
                { error: "Image upload failed", details: uploadError.message },
                { status: 500 }
            );
        }
    } catch (error) {
        console.error("Error in upload route:", error);
        return NextResponse.json(
            // @ts-ignore
            { error: "Internal server error", details: error.message },
            { status: 500 }
        );
    }
}