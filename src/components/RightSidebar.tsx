"use client"

import React from 'react';
import { Search, Star, MoveUpRight, LogIn, HeartHandshake, X, Instagram, Twitter, Mail, Linkedin } from 'lucide-react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import gpay from "../../public/GPAY.jpeg";
import { SignedIn, SignedOut, SignOutButton } from '@clerk/nextjs';
import { SearchBar } from './SearchBar';

function RightSidebar() {
  const router = useRouter();

  return (
    <aside className="hidden md:flex md:flex-col sticky top-0 h-screen w-64 lg:w-80 px-4 text-white mr-0 lg:mr-4 bg-black bg-opacity-50 backdrop-blur-sm">
      {/* Search Bar */}
      <div className="mt-4">
        <div className="relative">
          <SearchBar />
        </div>
      </div>

      {/* Content container with scrolling */}
      <div className="flex-grow overflow-y-auto pr-1 scrollbar-hide pb-4 mt-6">
        {/* Sign up Section */}
        <div className="mb-6 bg-neutral-900 rounded-xl p-4">
          <SignedIn>
            <div className="flex flex-col bg-neutral-900 rounded-xl space-y-3">
              <h2 className="text-md text-gray-400" style={{ fontFamily: '"BR Firma", sans-serif' }}>
                Godly! You're signed in
              </h2>

              <p className="text-xs" style={{ fontFamily: '"BR Firma", sans-serif' }}>
                Enjoy full features - create posts, comment anonymously, and more.
              </p>

              <SignOutButton>
                <button
                  className="w-full border border-[#374151] hover:bg-[#374151] text-white text-sm py-2 rounded-lg flex items-center justify-center gap-2 cursor-pointer transition-colors"
                  style={{ fontFamily: '"BR Firma", sans-serif' }}
                >
                  <LogIn size={16} />
                  Sign Out
                </button>
              </SignOutButton>
            </div>
          </SignedIn>
          <SignedOut>
            <div className="flex items-center mb-1">
              <h2 className="text-md text-gray-400" style={{ fontFamily: '"BR Firma", sans-serif' }}>Stay Signed in</h2>
            </div>

            <div className="text-xs mb-6" style={{ fontFamily: '"BR Firma", sans-serif' }}>
              Sign up to enjoy the anonymity
            </div>

            <button
              className="text-gray-400 flex flex-row items-center justify-center gap-1 mb-4 cursor-pointer hover:text-white text-sm mt-2 transition-colors"
              style={{ fontFamily: '"BR Firma", sans-serif' }}
              onClick={() => router.replace('/sign-up')}
            >
              <MoveUpRight size={18} />
              Sign up
            </button>

            <hr className="mb-4 border-gray-800" />

            <button
              className="text-gray-400 flex flex-row items-center justify-center gap-1 cursor-pointer hover:text-white text-sm mt-2 transition-colors"
              style={{ fontFamily: '"BR Firma", sans-serif' }}
              onClick={() => router.replace('/sign-in')}
            >
              <LogIn size={18} />
              Sign in
            </button>
          </SignedOut>
        </div>

        {/* Social Links */}
        <div className="mb-6 bg-neutral-900 rounded-xl p-4">
          <div className="flex items-center mb-1">
            <HeartHandshake size={20} className="mr-2 text-gray-300" />
            <h2 className="text-md text-gray-400" style={{ fontFamily: '"BR Firma", sans-serif' }}>Want to show your ADS?</h2>
          </div>

          <div className="text-xs mb-6" style={{ fontFamily: '"BR Firma", sans-serif' }}>
            Just DM, will reach you within 24 hours.
          </div>

          {/* Social Links */}
          <div className="mt-4 bg-neutral-800 rounded-xl p-4">
            {/* Social links grid layout */}
            <div className="grid grid-cols-2 gap-4">
              {/* LinkedIn */}
              <a
                href="https://www.linkedin.com/in/sahil-shangloo/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-col items-center group"
              >
                <div className="w-10 h-10 flex items-center justify-center bg-neutral-900 rounded-lg mb-1 group-hover:bg-blue-900 transition-colors">
                  <Linkedin size={20} />
                </div>
                <span className="text-xs text-gray-400 group-hover:text-gray-200" style={{ fontFamily: '"BR Firma", sans-serif' }}>LinkedIn</span>
              </a>

              {/* Email */}
              <a
                href="mailto:sahilshangloo35@gmail.com"
                className="flex flex-col items-center group"
              >
                <div className="w-10 h-10 flex items-center justify-center bg-neutral-900 rounded-lg mb-1 group-hover:bg-red-900 transition-colors">
                  <Mail size={20} />
                </div>
                <span className="text-xs text-gray-400 group-hover:text-gray-200" style={{ fontFamily: '"BR Firma", sans-serif' }}>Email</span>
              </a>

              {/* X (Twitter) */}
              <a
                href="https://x.com/doubleSdotdev"
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-col items-center group"
              >
                <div className="w-10 h-10 flex items-center justify-center bg-neutral-900 rounded-lg mb-1 group-hover:bg-neutral-700 transition-colors">
                  <Twitter size={20} />
                </div>
                <span className="text-xs text-gray-400 group-hover:text-gray-200" style={{ fontFamily: '"BR Firma", sans-serif' }}>Twitter-X</span>
              </a>

              {/* Instagram */}
              <a
                href="https://instagram.com/sahilshangloo.35"
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-col items-center group"
              >
                <div className="w-10 h-10 flex items-center justify-center bg-neutral-900 rounded-lg mb-1 group-hover:bg-purple-900 transition-colors">
                  <Instagram size={20} />
                </div>
                <span className="text-xs text-gray-400 group-hover:text-gray-200" style={{ fontFamily: '"BR Firma", sans-serif' }}>Instagram</span>
              </a>
            </div>
          </div>
        </div>

        {/* Privacy Tips Card */}
        <div className="bg-neutral-900 rounded-xl p-4">
          <div className="flex items-center justify-between mb-1">
            <div className="flex items-center">
              <Star size={20} className="mr-2 text-gray-300" />
              <div className="text-md text-gray-400" style={{ fontFamily: '"BR Firma", sans-serif' }}>Anonymous Tip</div>
            </div>
          </div>

          <p className="text-xs mb-3" style={{ fontFamily: '"BR Firma", sans-serif' }}>
            Please do not post disturbing or vulgar contents. It's a public platform. Keep it cool!
          </p>
        </div>

        {/* Buy Me a Coffee Card */}
        <div className="bg-neutral-900 rounded-xl p-4 mt-4">
          <div className="flex items-center justify-between mb-1">
            <div className="flex items-center">
              <HeartHandshake size={20} className="mr-2 text-gray-300" />
              <div className="text-md text-gray-400" style={{ fontFamily: '"BR Firma", sans-serif' }}>
                Want to buy me a coffee?
              </div>
            </div>
          </div>

          <p className="text-xs mb-3" style={{ fontFamily: '"BR Firma", sans-serif' }}>
            Scan the QR and tadaaa! 🎉
          </p>

          <div className="flex justify-center">
            <Image
              src={gpay}
              alt="GPay QR Code"
              width={250}
              height={120}
              className="rounded-lg border border-gray-700"
            />
          </div>
        </div>

      </div>

      {/* Footer */}
      <div className="mt-auto pt-4 pb-6">
        <p className="text-xs text-neutral-500" style={{ fontFamily: '"BR Firma", sans-serif' }}>
          © 2025 Cloak Me • Privacy Policy • Terms
        </p>
      </div>
    </aside>
  );
}

export default RightSidebar;