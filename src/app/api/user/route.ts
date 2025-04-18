import { currentUser } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { generateRandomUsername } from "@/lib/generateUsername";

export async function GET(request: Request) {
    try {
        const user = await currentUser();

        if (!user) {
            return NextResponse.json(
                { error: "Unauthorized" },
                { status: 401 }
            );
        }

        let dbUser = await db.user.findUnique({
            where: { clerkId: user.id },
        });

        if (!dbUser) {
            const username = generateRandomUsername();

            dbUser = await db.user.create({
                data: {
                    clerkId: user.id,
                    username,
                    phoneNumber: user.phoneNumbers?.[0]?.phoneNumber
                },
            });
        }

        return NextResponse.json({ user: dbUser });
    } catch (error) {
        console.error("Error creating/fetching user:", error);
        return NextResponse.json(
            { error: "Internal server error" },
            { status: 500 }
        );
    }
}
