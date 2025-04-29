'use client'

import LeftSidebar from "@/components/LeftSidebar";
import RightSidebar from "@/components/RightSidebar";

export default function Loading() {
  return (
    <main className="flex flex-row min-h-screen">
      {/* Left Sidebar - matching the exact width and margin from profile page */}
      <div className="w-1/3 -ml-12">
        <LeftSidebar />
      </div>
      
      {/* Center Content - matching the border and width from profile page */}
      <div className="w-2/4 mt-0 top-0 border-l border-r border-white/25 mx-8">
        {/* Profile header skeleton */}
        <div className="bg-transparent px-6 pt-6 rounded-lg mb-4">
          <div className="h-8 w-48 bg-gray-700/50 rounded mb-4"></div>
          <div className="flex items-center gap-4 mb-4">
            <div className="bg-gray-700/50 h-12 w-12 rounded-full"></div>
            <div>
              <div className="h-6 w-32 bg-gray-700/50 rounded mb-2"></div>
              <div className="h-4 w-24 bg-gray-700/50 rounded"></div>
            </div>
          </div>

          <div className="flex justify-between text-center">
            <div className="flex flex-row gap-1 justify-center items-center">
              <div className="h-5 w-5 bg-gray-700/50 rounded"></div>
              <div className="h-5 w-12 bg-gray-700/50 rounded"></div>
            </div>
            <div className="flex flex-row gap-1 justify-center items-center">
              <div className="h-5 w-5 bg-gray-700/50 rounded"></div>
              <div className="h-5 w-12 bg-gray-700/50 rounded"></div>
            </div>
            <div className="flex flex-row gap-1 justify-center items-center">
              <div className="h-5 w-5 bg-gray-700/50 rounded"></div>
              <div className="h-5 w-12 bg-gray-700/50 rounded"></div>
            </div>
          </div>
        </div>

        <div className="border-b border-white/25 mb-4" />

        {/* Posts heading skeleton */}
        <div className="h-7 w-32 bg-gray-700/50 rounded mx-6 mb-4"></div>

        <div className="border-b border-white/25 mb-4" />

        {/* Loading spinner centered in posts area */}
        <div className="flex justify-center items-center py-12">
          <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-primary"></div>
        </div>
      </div>
      
      {/* Right Sidebar - matching the width from profile page */}
      <div className="w-1/3 mr-4">
        <RightSidebar />
      </div>
    </main>
  );
}