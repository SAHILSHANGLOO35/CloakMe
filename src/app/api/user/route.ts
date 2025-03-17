import { currentUser } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { db } from "@/lib/db";

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
            const username =
                user.username ||
                `${user.firstName?.toLowerCase() || ""}${
                    user.lastName?.toLowerCase() || ""
                }` ||
                `user_${user.id.substring(0, 6)}`;

            dbUser = await db.user.create({
                data: {
                    clerkId: user.id,
                    username: username,
                },
            });

            console.log("Created new user in database:", dbUser);
        } else {
            console.log("Found existing user in database:", dbUser);
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
