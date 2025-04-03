"use server";

import { db } from "@/lib/db";

export async function isUsernameTaken(username: string): Promise<boolean> {
    try {
        const user = await db.user.findUnique({
            where: {
                username: username,
            },
        });

        return user !== null;
    } catch (error) {
        console.error("Error checking username:", error);
        return true;
    }
}
