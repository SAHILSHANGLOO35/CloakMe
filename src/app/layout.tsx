import type { Metadata } from "next";
import { ClerkProvider } from "@clerk/nextjs";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { AuthSync } from "../components/AuthSync";
import { dark } from "@clerk/themes";
import { UserProvider } from "@/context/UserContext";
import { Analytics } from "@vercel/analytics/next";

// Fonts
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// ✅ SEO Metadata
export const metadata: Metadata = {
  title: "Cloak Me | Anonymous Sharing Platform",
  description:
    "Cloak Me is an anonymous sharing platform built by Sahil Shangloo AKA doubleSdotdev. Share freely, securely, and without fear.",
  keywords: [
    "Cloak Me",
    "Anonymous Sharing",
    "Privacy",
    "Secure Chat",
    "doubleSdotdev",
  ],
  authors: [{ name: "Sahil Shangloo", url: "https://doublesdotdev.me" }],
  creator: "Sahil Shangloo",
  publisher: "Cloak Me",
  metadataBase: new URL("https://cloakme.zodx.tech"),
  openGraph: {
    title: "Cloak Me | Anonymous Sharing Platform",
    description:
      "Share your thoughts securely and anonymously with Cloak Me, a privacy-first sharing platform.",
    url: "https://cloakme.zodx.tech",
    siteName: "Cloak Me",
    images: [
      {
        url: "/og-image.png", // Add OG image in public folder
        width: 1200,
        height: 630,
        alt: "Cloak Me - Anonymous Sharing Platform",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Cloak Me | Anonymous Sharing Platform",
    description:
      "Cloak Me is a secure anonymous sharing platform built by Sahil Shangloo AKA doubleSdotdev.",
    creator: "@doubleSdotdev", // Your Twitter handle
    images: ["/og-image.png"],
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/favicon.png",
  },
  themeColor: "#ff4500",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-snippet": -1,
      "max-image-preview": "large",
      "max-video-preview": -1,
    },
  },
  alternates: {
    canonical: "https://cloakme.zodx.tech",
  },
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
          <header className="flex justify-end items-center p-4 gap-4 h-16 right-0 fixed"></header>
          <UserProvider>
            <AuthSync>{children}</AuthSync>
            <Analytics />
          </UserProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
