'use client'

import LeftSidebar from "@/components/LeftSidebar";
import RightSidebar from "@/components/RightSidebar";
import { useEffect, useState } from "react";

export default function About() {
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(true);
    }, 300);

    return () => clearTimeout(timer);
  }, []);

  return (
    <main className="flex flex-row min-h-screen">
      <div className="w-1/3 -ml-12">
        <LeftSidebar />
      </div>

      <div className="w-2/4 mt-0 top-0 border-l border-r border-white/25 mx-8">
        {!isLoading ? (
          <div className="py-8">
            <div className="px-4">
              <div className="h-8 w-48 bg-neutral-700/50 rounded mb-6"></div>
            </div>
            <div className="border-b border-white/25 mb-6" />
            <div className="px-4">
              <div className="h-10 w-40 bg-neutral-700/50 rounded mb-6"></div>
              <div className="h-44 w-full bg-neutral-700/50 rounded mb-6"></div>
            </div>
            <div className="border-b border-white/25 mb-6" />
            <div className="px-4">
              <div className="h-10 w-40 bg-neutral-700/50 rounded mb-6"></div>
              <div className="h-52 w-full bg-neutral-700/50 rounded mb-6"></div>
            </div>
            <div className="border-b border-white/25 mb-6" />
            <div className="px-4">
              <div className="h-10 w-40 bg-neutral-700/50 rounded mb-6"></div>
              <div className="h-40 w-full bg-neutral-700/50 rounded"></div>
            </div>
          </div>
        ) : (
          <div className="bg-transparent pt-4 rounded-lg mb-4">
            <div className="px-4 mb-4" style={{ fontFamily: '"BR Firma", sans-serif', fontSize: '20px' }}>
              About Cloak Me
            </div>

            <div className="border-b border-white/25 mb-6" />

            <div className="space-y-6">
              <section>
                <h2 className="text-2xl font-semibold mb-3 px-4" style={{ fontFamily: '"BR Firma", sans-serif' }}>
                  What is Cloak Me?
                </h2>
                <p className="text-gray-300 mb-4 px-4" style={{ fontFamily: '"BR Firma", sans-serif' }}>
                  Cloak Me is a modern platform for anonymous self-expression. Post thoughts, images, or GIFs freely—without the pressure of building a digital identity. Everything you share reaches a global audience, without revealing who you are.
                </p>
              </section>

              <div className="border-b border-white/25 my-6" />

              <section className="px-4">
                <h2 className="text-2xl font-semibold mb-3" style={{ fontFamily: '"BR Firma", sans-serif' }}>
                  Privacy First
                </h2>
                <p className="text-gray-300 mb-4" style={{ fontFamily: '"BR Firma", sans-serif' }}>
                  Privacy is not just a feature—it's the foundation of Cloak Me. Your identity stays completely hidden. No sign-up with personal details. No trackers. No profiling.
                </p>
                <ul className="list-disc pl-6 space-y-2 text-gray-300 px-4" style={{ fontFamily: '"BR Firma", sans-serif' }}>
                  <li>Anonymous posting with zero identifiers</li>
                  <li>End-to-end encryption for sensitive data</li>
                  <li>No tracking or targeted ads</li>
                  <li>No cross-platform data sharing</li>
                </ul>
              </section>

              <div className="border-b border-white/25 my-6" />

              <section className="px-4">
                <h2 className="text-2xl font-semibold mb-3" style={{ fontFamily: '"BR Firma", sans-serif' }}>
                  Media Safety & Storage
                </h2>
                <p className="text-gray-300" style={{ fontFamily: '"BR Firma", sans-serif' }}>
                  Images and GIFs are securely stored on Cloudinary, ensuring fast delivery and safe handling. We don’t allow misuse—our system is designed to protect user-submitted content from abuse or unauthorized use.
                </p>
              </section>

              <div className="border-b border-white/25 my-6" />

              <section className="px-4">
                <h2 className="text-2xl font-semibold mb-3" style={{ fontFamily: '"BR Firma", sans-serif' }}>
                  Dashboard for You
                </h2>
                <p className="text-gray-300" style={{ fontFamily: '"BR Firma", sans-serif' }}>
                  Even in a fully anonymous system, you still have control. Your personal dashboard helps you track your posts, saved items, and interactions—privately and securely.
                </p>
              </section>

              <div className="border-b border-white/25 my-6" />

              <section className="px-4">
                <h2 className="text-2xl font-semibold mb-3" style={{ fontFamily: '"BR Firma", sans-serif' }}>
                  Community Rules
                </h2>
                <p className="text-gray-300 mb-4" style={{ fontFamily: '"BR Firma", sans-serif' }}>
                  Anonymity isn’t a free pass for toxicity. We keep Cloak Me respectful for everyone:
                </p>
                <ul className="list-disc pl-6 space-y-2 text-gray-300 px-4" style={{ fontFamily: '"BR Firma", sans-serif' }}>
                  <li>No hate speech or harassment</li>
                  <li>No illegal content or doxxing</li>
                  <li>No commercial spam or scams</li>
                </ul>
              </section>

              <div className="border-b border-white/25 my-6" />

              <section className="px-4">
                <h2 className="text-2xl font-semibold mb-3" style={{ fontFamily: '"BR Firma", sans-serif' }}>
                  Built for Today
                </h2>
                <p className="text-gray-300" style={{ fontFamily: '"BR Firma", sans-serif' }}>
                  Cloak Me is built with modern tech—from secure cloud storage to real-time UI updates. The design is sleek, minimal, and optimized for distraction-free engagement.
                </p>
              </section>

              <div className="border-b border-white/25 my-6" />

              <section className="pb-12 px-4">
                <h2 className="text-2xl font-semibold mb-3" style={{ fontFamily: '"BR Firma", sans-serif' }}>
                  Be Part of the Movement
                </h2>
                <p className="text-gray-300" style={{ fontFamily: '"BR Firma", sans-serif' }}>
                  Cloak Me is evolving with its users. Drop feedback, suggest features, or just enjoy the experience. This isn't just an app—it's a space to speak your mind without fear.
                </p>
              </section>
            </div>
          </div>
        )}
      </div>

      <div className="w-1/3 mr-4">
        <RightSidebar />
      </div>
    </main>
  );
}
