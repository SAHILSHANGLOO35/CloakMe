"use client"
import React from 'react';
import { Users, Search, Calendar, ExternalLink, Star, MoveUpRight, LogIn, HeartHandshake } from 'lucide-react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import gpay from "../../public/GPAY.jpeg";

function RightSidebar() {
  const router = useRouter();

  return (
    <div className="w-80 fixed right-0 h-screen p-4 border-l border-l-white/25 text-white flex flex-col mr-40">
      {/* Search Bar */}
      <div className="mb-6 mt-8">
        <div className="relative">
          <input
            type="text"
            placeholder="Search here..."
            className="w-full bg-neutral-800 rounded-full py-2 px-4 pl-10 text-white border border-transparent focus:outline-none focus:border-[#374151] peer"
            style={{ fontFamily: '"BR Firma", sans-serif', fontSize: '14px' }}
          />
          <Search
            className="absolute left-3 top-2.5 text-gray-400 focus:text-[#374151]"
            size={16}
          />
        </div>

      </div>

      {/* Content container with scrolling */}
      <div className='flex-grow overflow-y-auto pr-1 scrollbar-hide'>
        {/* Sign up Section */}
        <div className="mb-6 bg-neutral-900 rounded-xl p-4">
          <div className="flex items-center mb-1">
            <h2 className="text-md text-gray-400" style={{ fontFamily: '"BR Firma", sans-serif' }}>Stay Signed in</h2>
          </div>

          <div className="text-xs mb-6" style={{ fontFamily: '"BR Firma", sans-serif' }}>
            Sign up to enjoy the anonymity
          </div>

          <button className="text-gray-400 flex flex-row items-center justify-center gap-1 mb-4 cursor-pointer hover:text-white text-sm mt-2 transition-colors" style={{ fontFamily: '"BR Firma", sans-serif' }} onClick={() => {
            router.push('/sign-up')
          }}>
            <MoveUpRight size={18} />
            Sign up
          </button>

          <hr className='mb-4 text-gray-200' />

          <button className="text-gray-400 flex flex-row items-center justify-center gap-1 cursor-pointer hover:text-white text-sm mt-2 transition-colors" style={{ fontFamily: '"BR Firma", sans-serif' }} onClick={() => {
            router.push('/sign-in')
          }}>
            <LogIn size={18} />
            Sign in
          </button>
        </div>

        {/* GPay lol */}
        <div className="mb-6 bg-neutral-900 rounded-xl p-4">
          <div className="flex items-center mb-1">
            <HeartHandshake size={20} className="mr-2 text-gray-300" />
            <h2 className="text-md text-gray-400" style={{ fontFamily: '"BR Firma", sans-serif' }}>Want to help? Donate here</h2>
          </div>

          <div className="text-xs mb-6" style={{ fontFamily: '"BR Firma", sans-serif' }}>
            Just scan the QR and help
          </div>

          <div className="h-[300px] w-[250px] flex items-center justify-center rounded-xl overflow-hidden border border-white/25">
            <Image
              src={gpay}
              alt="GPay QR Scanner"
              className="w-full h-full object-cover rounded-xl"
              unoptimized
            />
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
      <div className="mt-auto pt-4">
        <p className="text-xs text-neutral-500" style={{ fontFamily: '"BR Firma", sans-serif' }}>
          © 2025 Cloak Me • Privacy Policy • Terms
        </p>
      </div>
    </div>
  );
}

export default RightSidebar;