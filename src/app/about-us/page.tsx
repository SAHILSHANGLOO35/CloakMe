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
    <main className="flex flex-col md:flex-row min-h-screen pb-16 md:pb-0 max-w-screen-2xl mx-auto">
      {/* Left Sidebar */}
      <div className="md:w-1/4 lg:w-1/3 md:-ml-4 lg:-ml-12">
        <LeftSidebar />
      </div>

      {/* Main Content */}
      <div className="w-full md:w-1/2 lg:w-2/4 border-white/25 md:mx-2 lg:mx-8 md:border-l md:border-r overflow-y-auto scrollbar-hide">
        {!isLoading ? (
          /* Skeleton Loader - Responsive */
          <div className="py-4 md:py-8">
            <div className="px-4">
              <div className="h-6 md:h-8 w-36 md:w-48 bg-neutral-700/50 rounded mb-4 md:mb-6"></div>
            </div>
            <div className="border-b border-white/25 mb-4 md:mb-6" />
            <div className="px-4">
              <div className="h-8 md:h-10 w-32 md:w-40 bg-neutral-700/50 rounded mb-4 md:mb-6"></div>
              <div className="h-36 md:h-44 w-full bg-neutral-700/50 rounded mb-4 md:mb-6"></div>
            </div>
            <div className="border-b border-white/25 mb-4 md:mb-6" />
            <div className="px-4">
              <div className="h-8 md:h-10 w-32 md:w-40 bg-neutral-700/50 rounded mb-4 md:mb-6"></div>
              <div className="h-40 md:h-52 w-full bg-neutral-700/50 rounded mb-4 md:mb-6"></div>
            </div>
            <div className="border-b border-white/25 mb-4 md:mb-6" />
            <div className="px-4">
              <div className="h-8 md:h-10 w-32 md:w-40 bg-neutral-700/50 rounded mb-4 md:mb-6"></div>
              <div className="h-32 md:h-40 w-full bg-neutral-700/50 rounded"></div>
            </div>
          </div>
        ) : (
          /* Main Content - Responsive */
          <div className="bg-transparent pt-4 rounded-lg mb-4">
            <div className="px-4 mb-4" style={{ fontFamily: '"BR Firma", sans-serif', fontSize: '20px' }}>
              About Cloak Me
            </div>

            <div className="border-b border-white/25 mb-4 md:mb-6" />

            <div className="space-y-4 md:space-y-6">
              <section>
                <h2 className="text-xl md:text-2xl font-semibold mb-2 md:mb-3 px-4" style={{ fontFamily: '"BR Firma", sans-serif' }}>
                  What is Cloak Me?
                </h2>
                <p className="text-sm md:text-base text-gray-300 mb-3 md:mb-4 px-4" style={{ fontFamily: '"BR Firma", sans-serif' }}>
                  Cloak Me is a modern platform for anonymous self-expression. Post thoughts, images, or GIFs freely-without the pressure of building a digital identity. Everything you share reaches a global audience, without revealing who you are.
                </p>
              </section>

              <div className="border-b border-white/25 my-4 md:my-6" />

              <section>
                <h2 className="text-xl md:text-2xl font-semibold mb-2 md:mb-3 px-4" style={{ fontFamily: '"BR Firma", sans-serif' }}>
                  Why I built Cloak Me?
                </h2>
                <p className="text-sm md:text-base text-gray-300 mb-3 md:mb-4 px-4" style={{ fontFamily: '"BR Firma", sans-serif' }}>
                  The internet once promised freedom of expression. But in today's world, your identity is often tied to every post you make. Cloak Me is our response-a safe haven where thoughts come first, not followers or filters.
                </p>
              </section>

              <div className="border-b border-white/25 my-4 md:my-6" />

              <section>
                <h2 className="text-xl md:text-2xl font-semibold mb-2 md:mb-3 px-4" style={{ fontFamily: '"BR Firma", sans-serif' }}>
                  Privacy First
                </h2>
                <p className="text-sm md:text-base text-gray-300 mb-3 md:mb-4 px-4" style={{ fontFamily: '"BR Firma", sans-serif' }}>
                  Privacy is not just a feature-it's the foundation of Cloak Me. Your identity stays completely hidden. No sign-up with personal details. No trackers. No profiling.
                </p>
                <ul className="list-disc pl-8 md:pl-10 space-y-1 md:space-y-2 text-sm md:text-base text-gray-300 px-4" style={{ fontFamily: '"BR Firma", sans-serif' }}>
                  <li>Anonymous posting with zero identifiers</li>
                  <li>End-to-end encryption for sensitive data</li>
                  <li>No tracking or targeted ads</li>
                  <li>No cross-platform data sharing</li>
                </ul>
              </section>

              <div className="border-b border-white/25 my-4 md:my-6" />

              <section>
                <h2 className="text-xl md:text-2xl font-semibold mb-2 md:mb-3 px-4" style={{ fontFamily: '"BR Firma", sans-serif' }}>
                  Media Safety & Storage
                </h2>
                <p className="text-sm md:text-base text-gray-300 px-4" style={{ fontFamily: '"BR Firma", sans-serif' }}>
                  Images and GIFs are securely stored on Cloudinary, ensuring fast delivery and safe handling. We don't allow misuse-our system is designed to protect user-submitted content from abuse or unauthorized use.
                </p>
              </section>

              <div className="border-b border-white/25 my-4 md:my-6" />

              <section>
                <h2 className="text-xl md:text-2xl font-semibold mb-2 md:mb-3 px-4" style={{ fontFamily: '"BR Firma", sans-serif' }}>
                  Dashboard for You
                </h2>
                <p className="text-sm md:text-base text-gray-300 px-4" style={{ fontFamily: '"BR Firma", sans-serif' }}>
                  Even in a fully anonymous system, you still have control. Your personal dashboard helps you track your posts, saved items, and interactions—privately and securely.
                </p>
              </section>

              <div className="border-b border-white/25 my-4 md:my-6" />

              <section>
                <h2 className="text-xl md:text-2xl font-semibold mb-2 md:mb-3 px-4" style={{ fontFamily: '"BR Firma", sans-serif' }}>
                  Community Rules
                </h2>
                <p className="text-sm md:text-base text-gray-300 mb-3 md:mb-4 px-4" style={{ fontFamily: '"BR Firma", sans-serif' }}>
                  Anonymity isn't a free pass for toxicity. We keep Cloak Me respectful for everyone:
                </p>
                <ul className="list-disc pl-8 md:pl-10 space-y-1 md:space-y-2 text-sm md:text-base text-gray-300 px-4" style={{ fontFamily: '"BR Firma", sans-serif' }}>
                  <li>No hate speech or harassment</li>
                  <li>No illegal content or doxxing</li>
                  <li>No commercial spam or scams</li>
                </ul>
              </section>

              <div className="border-b border-white/25 my-4 md:my-6" />

              <section>
                <h2 className="text-xl md:text-2xl font-semibold mb-2 md:mb-3 px-4" style={{ fontFamily: '"BR Firma", sans-serif' }}>
                  Built for Today
                </h2>
                <p className="text-sm md:text-base text-gray-300 px-4" style={{ fontFamily: '"BR Firma", sans-serif' }}>
                  Cloak Me is built with modern tech-from secure cloud storage to real-time UI updates. The design is sleek, minimal, and optimized for distraction-free engagement.
                </p>
              </section>

              <div className="border-b border-white/25 my-4 md:my-6" />

              <section className="pb-8 md:pb-12">
                <h2 className="text-xl md:text-2xl font-semibold mb-2 md:mb-3 px-4" style={{ fontFamily: '"BR Firma", sans-serif' }}>
                  Be Part of the Movement
                </h2>
                <p className="text-sm md:text-base text-gray-300 px-4" style={{ fontFamily: '"BR Firma", sans-serif' }}>
                  Cloak Me is evolving with its users. Drop feedback, suggest features, or just enjoy the experience. This isn't just an app-it's a space to speak your mind without fear.
                </p>
              </section>
            </div>
          </div>
        )}
      </div>

      {/* Right Sidebar */}
      <div className="hidden md:block md:w-1/4 lg:w-1/3 md:mr-2 lg:mr-4">
        <RightSidebar />
      </div>
    </main>
  );
}