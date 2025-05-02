"use client"
import React, { useState } from 'react';
import { Users, Search, Calendar, ExternalLink, Star, MoveUpRight, LogIn, HeartHandshake, X } from 'lucide-react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import gpay from "../../public/GPAY.jpeg";
import { SignedIn, SignedOut, SignOutButton } from '@clerk/nextjs';
import axios from 'axios';
import { SearchBar } from './SearchBar';

function RightSidebar() {
  const router = useRouter();
  const [isMobileSearchVisible, setIsMobileSearchVisible] = useState(false);

  return (
    <>
      {/* Mobile Search Bar - Only shown when toggled */}
      {isMobileSearchVisible && (
        <div className="fixed inset-0 bg-black bg-opacity-75 z-50 flex items-center justify-center p-4 md:hidden">
          <div className="w-full max-w-md bg-neutral-900 rounded-xl p-4">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-white font-semibold">Search</h3>
              <button 
                onClick={() => setIsMobileSearchVisible(false)}
                className="text-gray-400 hover:text-white"
              >
                <X size={24} />
              </button>
            </div>
            <div className="relative">
              <input
                id="mobile-search-input"
                type="text"
                placeholder="Search here..."
                className="w-full rounded-full py-2 px-4 pl-10 text-white border bg-transparent border-[#374151] focus:outline-none focus:border-[#374151]"
                style={{ fontFamily: '"BR Firma", sans-serif', fontSize: '14px' }}
                autoFocus
              />
              <Search
                className="absolute left-3 top-2.5 text-gray-400"
                size={16}
              />
            </div>
          </div>
        </div>
      )}

      {/* Desktop search icon in top right corner on mobile */}
      {/* <div className="fixed top-4 right-4 md:hidden z-40">
        <button 
          onClick={() => setIsMobileSearchVisible(true)}
          className="p-2 rounded-full bg-neutral-800 text-white cursor-pointer"
        >
          <Search size={20} />
        </button>
      </div> */}

      {/* Main Sidebar Content - Hidden on mobile, visible on medium screens and up */}
      <aside className="hidden md:flex flex-col fixed right-0 h-screen w-64 lg:w-80 px-4 text-white mr-0 lg:mr-40 bg-black bg-opacity-50 backdrop-blur-sm border-l border-white/25">
        {/* Search Bar */}
        <div className="">
          <div className="relative">
            <SearchBar />
          </div>
        </div>

        {/* Content container with scrolling */}
        <div className="flex-grow overflow-y-auto pr-1 scrollbar-hide pb-4">
          {/* Sign up Section */}
          <div className="mb-6 bg-neutral-900 rounded-xl p-4">
            <SignedIn>
              <div className="flex flex-col bg-neutral-900 rounded-xl space-y-3">
                <h2 className="text-md text-gray-400" style={{ fontFamily: '"BR Firma", sans-serif' }}>
                  Godly! You're signed in
                </h2>

                <p className="text-xs" style={{ fontFamily: '"BR Firma", sans-serif' }}>
                  Enjoy full features — create posts, comment anonymously, and more.
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

              <button className="text-gray-400 flex flex-row items-center justify-center gap-1 mb-4 cursor-pointer hover:text-white text-sm mt-2 transition-colors" style={{ fontFamily: '"BR Firma", sans-serif' }} onClick={() => {
                router.replace('/sign-up')
              }}>
                <MoveUpRight size={18} />
                Sign up
              </button>

              <hr className="mb-4 border-gray-800" />

              <button className="text-gray-400 flex flex-row items-center justify-center gap-1 cursor-pointer hover:text-white text-sm mt-2 transition-colors" style={{ fontFamily: '"BR Firma", sans-serif' }} onClick={() => {
                router.replace('/sign-in')
              }}>
                <LogIn size={18} />
                Sign in
              </button>
            </SignedOut>
          </div>

          {/* GPay donation */}
          <div className="mb-6 bg-neutral-900 rounded-xl p-4">
            <div className="flex items-center mb-1">
              <HeartHandshake size={20} className="mr-2 text-gray-300" />
              <h2 className="text-md text-gray-400" style={{ fontFamily: '"BR Firma", sans-serif' }}>Want to help? Donate here</h2>
            </div>

            <div className="text-xs mb-6" style={{ fontFamily: '"BR Firma", sans-serif' }}>
              Just scan the QR and help
            </div>

            <div className="h-[200px] lg:h-[250px] w-full max-w-[250px] flex items-center justify-center rounded-xl overflow-hidden border border-white/25">
              {/* <Image
                src={gpay}
                alt="GPay QR Scanner"
                className="w-full h-full object-cover rounded-xl"
                unoptimized
              /> */}
            </div>
          </div>

          {/* Privacy Tips Card */}
          <div className="bg-neutral-900 rounded-xl p-4">
            <div className="flex items-center justify-between mb-1">
              <div className="flex items-center">
                <Star size={20} className="mr-2 text-gray-300" />
                <h2 className="text-md text-gray-400 font-semibold" style={{ fontFamily: '"BR Firma", sans-serif' }}>Anonymous Tip</h2>
              </div>
            </div>

            <p className="text-xs mb-3" style={{ fontFamily: '"BR Firma", sans-serif' }}>
              Please do not post disturbing or vulgar contents. It's a public platform. Keep it cool!
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-auto pt-4 pb-6">
          <p className="text-xs text-neutral-500" style={{ fontFamily: '"BR Firma", sans-serif' }}>
            © 2025 Cloak Me • Privacy Policy • Terms
          </p>
        </div>
      </aside>

      {/* Mobile bottom navigation bar - Fixed at bottom of screen on mobile only */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-black border-t border-white/10 flex justify-around items-center py-3 z-40">
        <SignedIn>
          <SignOutButton>
            <button className="text-gray-400 hover:text-white text-xs flex flex-col items-center">
              <LogIn size={20} className="mb-1" />
              <span>Sign Out</span>
            </button>
          </SignOutButton>
        </SignedIn>
        <SignedOut>
          <button 
            className="text-gray-400 hover:text-white text-xs flex flex-col items-center"
            onClick={() => router.replace('/sign-in')}
          >
            <LogIn size={20} className="mb-1" />
            <span>Sign In</span>
          </button>
        </SignedOut>
        
        <button 
          className="text-gray-400 hover:text-white text-xs flex flex-col items-center"
          onClick={() => router.replace('/about-us')}
        >
          <Star size={20} className="mb-1" />
          <span>Tips</span>
        </button>
        
        <button 
          className="text-gray-400 hover:text-white text-xs flex flex-col items-center"
          onClick={() => {
            // Could add a donate modal here
            alert("Thanks for considering a donation!");
          }}
        >
          <HeartHandshake size={20} className="mb-1" />
          <span>Donate</span>
        </button>
      </div>
    </>
  );
}

export default RightSidebar;