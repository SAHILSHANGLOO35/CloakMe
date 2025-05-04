'use client'

import LeftSidebar from "@/components/LeftSidebar";
import RightSidebar from "@/components/RightSidebar";

export default function Loading() {
  return (
    <main className="flex flex-row min-h-screen">
      {/* Left Sidebar */}
      <div className="w-1/3 -ml-12">
        <LeftSidebar />
      </div>

      {/* Center Content */}
      <div className="w-2/4 mt-0 top-0 border-l border-r border-white/25 mx-8">
        <div className="bg-transparent pt-4 rounded-lg mb-4 animate-pulse">
          {/* Section Heading */}
          <div className="pl-4">
            <div className="h-7 w-40 bg-neutral-700/50 rounded mb-4 px-4"></div>
          </div>
          <div className="border-b border-white/25 mb-4" />

          {/* User Info Row */}
          <div className="flex items-center gap-4 mb-4 px-4">
            <div className="bg-neutral-700/50 h-12 w-12 border border-white/25 rounded-full"></div>
            <div>
              <div className="h-6 w-32 bg-neutral-700/50 rounded mb-1"></div>
              <div className="h-4 w-24 bg-neutral-700/50 rounded"></div>
            </div>
          </div>

          {/* Post Content */}
          <div className="pl-4">
            <div className="h-6 w-3/4 bg-neutral-700/50 rounded mb-4 px-4"></div>
          </div>
          

          {/* Action Buttons Row */}
          <div className="flex justify-between text-center px-6 mb-4">
            {[...Array(3)].map((_, i) => (
              <div
                key={i}
                className="flex flex-row gap-1 justify-center items-center"
              >
                <div className="h-5 w-5 bg-neutral-700/50 rounded" />
                <div className="h-5 w-12 bg-neutral-700/50 rounded" />
              </div>
            ))}
          </div>
        </div>

        <div className="border-b border-white/25 mb-4" />

        {/* Add Comment Heading */}
        <div className="pl-4">
          <div className="h-7 w-32 bg-neutral-700/50 rounded px-4 mb-4"></div>
        </div>

        <div className="border-b border-white/25 mb-4" />

        {/* Comments Section Skeleton */}
        <div className="space-y-4">
          {[...Array(2)].map((_, index) => (
            <div
              key={index}
              className="bg-transparent py-4 pl-4 border-b border-white/25"
            >
              {/* Comment header */}
              <div className="flex items-center gap-3 mb-2">
                <div className="h-10 w-10 bg-neutral-700/50 border border-white/25 rounded-full" />
                <div>
                  <div className="h-4 w-28 bg-neutral-700/50 rounded mb-1" />
                  <div className="h-3 w-20 bg-neutral-700/50 rounded" />
                </div>
              </div>

              {/* Comment body */}
              <div className="h-4 w-full bg-neutral-700/50 rounded mb-1" />
              <div className="h-4 w-3/4 bg-neutral-700/50 rounded" />
            </div>
          ))}
        </div>
      </div>

      {/* Right Sidebar */}
      <div className="w-1/3 mr-4">
        <RightSidebar />
      </div>
    </main>
  );
}
