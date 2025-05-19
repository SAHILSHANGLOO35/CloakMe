'use client'

import LeftSidebar from "@/components/LeftSidebar";
import RightSidebar from "@/components/RightSidebar";
import { Suspense } from "react";

export default function Loading() {
  return (
    <main className="flex flex-col md:flex-row min-h-screen pb-16 md:pb-0 max-w-screen-2xl mx-auto">
      {/* Left Sidebar */}
      <div className="md:w-1/4 lg:w-1/3 md:-ml-4 lg:-ml-12">
        <Suspense fallback={null}>
          <LeftSidebar />
        </Suspense>
      </div>

      {/* Main Content */}
      <div className="w-full md:w-1/2 lg:w-2/4 border-white/25 md:mx-2 lg:mx-8 md:border-l md:border-r overflow-y-auto scrollbar-hide">
        <div className="bg-transparent pt-4 rounded-lg mb-4">
          {/* Header */}
          <div className="pl-4">
            <div className="h-7 w-40 bg-neutral-700/50 rounded mb-4"></div>
          </div>
          <div className="border-b border-white/25 mb-4" />
          
          {/* Profile Info */}
          <div className="flex items-center gap-2 sm:gap-4 mb-4 px-4">
            <div className="bg-neutral-700/50 h-10 w-10 sm:h-12 sm:w-12 border border-white/25 rounded-full"></div>
            <div>
              <div className="h-5 sm:h-6 w-28 sm:w-32 bg-neutral-700/50 rounded mb-1"></div>
              <div className="h-3 sm:h-4 w-20 sm:w-24 bg-neutral-700/50 rounded"></div>
            </div>
          </div>

          {/* Stats */}
          <div className="flex justify-between text-center px-4 sm:px-6 mb-4">
            <div className="flex flex-row gap-1 justify-center items-center">
              <div className="h-4 sm:h-5 w-4 sm:w-5 bg-neutral-700/50 rounded"></div>
              <div className="h-4 sm:h-5 w-10 sm:w-12 bg-neutral-700/50 rounded"></div>
            </div>
            <div className="flex flex-row gap-1 justify-center items-center">
              <div className="h-4 sm:h-5 w-4 sm:w-5 bg-neutral-700/50 rounded"></div>
              <div className="h-4 sm:h-5 w-10 sm:w-12 bg-neutral-700/50 rounded"></div>
            </div>
          </div>
        </div>

        <div className="border-b border-white/25 mb-4" />
        
        {/* Posts Heading */}
        <div className="px-4">
          <div className="h-7 w-32 bg-neutral-700/50 rounded mb-4"></div>
        </div>

        <div className="border-b border-white/25 mb-4" />

        {/* Post skeletons - matching the responsive structure of real posts */}
        <div className="space-y-4">
          {[...Array(3)].map((_, index) => (
            <div key={index} className="bg-transparent p-2 sm:p-4 border-b border-white/25">
              {/* Post header */}
              <div className="flex items-center mb-2">
                <div className="bg-neutral-700/50 h-8 w-8 sm:h-10 sm:w-10 border border-white/25 rounded-full"></div>
                <div className="ml-2 sm:ml-3">
                  <div className="h-4 sm:h-5 w-20 sm:w-24 bg-neutral-700/50 rounded mb-1"></div>
                  <div className="h-3 w-16 sm:w-20 bg-neutral-700/50 rounded"></div>
                </div>
              </div>
              
              {/* Post content */}
              <div className="h-12 sm:h-16 w-full bg-neutral-700/50 rounded mb-3"></div>
              
              {/* Post image */}
              <div className="h-36 sm:h-48 w-full bg-neutral-700/50 rounded mb-2"></div>
            </div>
          ))}
        </div>
      </div>
      
      {/* Right Sidebar */}
      <div className="hidden md:block md:w-1/4 lg:w-1/3 md:mr-2 lg:mr-4">
        <Suspense fallback={null}>
          <RightSidebar />
        </Suspense>
      </div>
    </main>
  );
}