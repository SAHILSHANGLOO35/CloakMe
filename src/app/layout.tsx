import type { Metadata } from "next";
import {
    ClerkProvider,
    SignedIn,
    SignedOut,
    UserButton,
} from "@clerk/nextjs";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { AuthSync } from "./components/AuthSync";
import { dark } from "@clerk/themes";
import Link from "next/link";

const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
});

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
});

export const metadata: Metadata = {
    title: "CloakMe",
    description: "Created by Sahil Shangloo AKA doubleSdotdev",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <ClerkProvider
            appearance={{
                baseTheme: dark,
                variables: {
                    colorPrimary: "#ff4500",
                },
            }}
        >
            <html lang="en">
                <body
                    className={`${geistSans.variable} ${geistMono.variable} antialiased`}
                >
                    <header className="flex justify-end items-center p-4 gap-4 h-16 right-0 fixed">
                        <SignedOut>
                            <Link 
                              href="/sign-in"
                              className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2"
                            >
                              Sign in
                            </Link>
                            <Link
                              href="/sign-up"
                              className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2"
                            >
                              Sign up
                            </Link>
                        </SignedOut>
                        <SignedIn>
                            <UserButton />
                        </SignedIn>
                    </header>
                    <AuthSync>{children}</AuthSync>
                </body>
            </html>
        </ClerkProvider>
    );
}