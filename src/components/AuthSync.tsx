"use client";
import { useEffect } from "react";
import { useUser } from "@clerk/nextjs";
import axios from "axios";

export function AuthSync({ children }: any) {
    const { isSignedIn, isLoaded } = useUser();

    useEffect(() => {
        async function syncUser() {
            try {
                if (isLoaded && isSignedIn) {
                    await axios.get("/api/user");
                }
            } catch (error) {
                console.error(error);
            }
        }
        syncUser();
    }, [isLoaded, isSignedIn]);

    return <>{children}</>;
}
