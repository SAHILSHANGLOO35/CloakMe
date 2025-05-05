'use client'

import LeftSidebar from "@/components/LeftSidebar";
import RightSidebar from "@/components/RightSidebar";

export default function Loading() {
  return (
    <main className="flex flex-row min-h-screen">
      <div className="w-1/3 -ml-12">
        <LeftSidebar />
      </div>

      <div className="w-2/4 mt-0 top-0 border-l border-r border-white/25 mx-8">
        <div className="bg-transparent pt-4 rounded-lg mb-4">
          <div className="pl-4">
            <div className="h-7 w-40 bg-neutral-700/50 rounded mb-4 px-4"></div>
          </div>
          <div className="border-b border-white/25 mb-4" />
          <div className="flex items-center gap-4 mb-4 px-4">
            <div className="bg-neutral-700/50 h-12 w-12 border border-white/25 rounded-full"></div>
            <div>
              <div className="h-6 w-32 bg-neutral-700/50 rounded mb-1"></div>
              <div className="h-4 w-24 bg-neutral-700/50 rounded"></div>
            </div>
          </div>

          <div className="flex justify-between text-center px-6">
            <div className="flex flex-row gap-1 justify-center items-center">
              <div className="h-5 w-5 bg-neutral-700/50 rounded"></div>
              <div className="h-5 w-12 bg-neutral-700/50 rounded"></div>
            </div>
            <div className="flex flex-row gap-1 justify-center items-center">
              <div className="h-5 w-5 bg-neutral-700/50 rounded"></div>
              <div className="h-5 w-12 bg-neutral-700/50 rounded"></div>
            </div>
          </div>
        </div>

        <div className="border-b border-white/25 mb-4" />
        
        <div className="pl-4">
          <div className="h-7 w-32 bg-neutral-700/50 rounded px-4 mb-4"></div>
        </div>

        <div className="border-b border-white/25 mb-4" />

        {/* Post skeletons - matching the exact structure of real posts */}
        <div className="space-y-4">
          {[...Array(3)].map((_, index) => (
            <div key={index} className="bg-transparent p-4 border-b border-white/25">
              <div className="flex items-center mb-2">
                <div className="bg-neutral-700/50 h-10 w-10 border border-white/25 rounded-full"></div>
                <div className="ml-3">
                  <div className="h-5 w-24 bg-neutral-700/50 rounded mb-1"></div>
                  <div className="h-3 w-20 bg-neutral-700/50 rounded"></div>
                </div>
              </div>
              <div className="h-16 w-full bg-neutral-700/50 rounded mb-3"></div>
              <div className="h-48 w-full bg-neutral-700/50 rounded"></div>
            </div>
          ))}
        </div>
      </div>
      
      <div className="w-1/3 mr-4">
        <RightSidebar />
      </div>
    </main>
  );
}