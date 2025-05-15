import type { Metadata } from "next";
import {
    ClerkProvider,
} from "@clerk/nextjs";
import { Geist, Geist_Mono } from "next/font/google";
import './globals.css';
import { AuthSync } from "../components/AuthSync";
import { dark } from "@clerk/themes";
import { UserProvider } from "@/context/UserContext";

const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
});

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
});

export const metadata: Metadata = {
    title: "Cloak Me",
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
                <head>
                    <link rel="icon" href="/favicon.ico" sizes="any" />
                </head>
                <body
                    className={`${geistSans.variable} ${geistMono.variable} antialiased`}
                >
                    <header className="flex justify-end items-center p-4 gap-4 h-16 right-0 fixed">
                    </header>
                    <UserProvider>
                        <AuthSync>{children}</AuthSync>
                    </UserProvider>
                </body>
            </html>
        </ClerkProvider>
    );
}