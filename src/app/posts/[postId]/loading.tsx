'use client'

import LeftSidebar from "@/components/LeftSidebar";
import RightSidebar from "@/components/RightSidebar";

export default function CustomLoading() {
  return (
    <div className="flex flex-col md:flex-row min-h-screen pb-16 md:pb-0 max-w-screen-2xl mx-auto">
      {/* Left Sidebar */}
      <div className="md:w-1/4 lg:w-1/3 md:-ml-4 lg:-ml-12">
        <LeftSidebar />
      </div>

      {/* Main Content */}
      <div className="w-full md:w-1/2 lg:w-2/4 border-white/25 md:mx-2 lg:mx-8 md:border-l md:border-r overflow-y-auto scrollbar-hide">
        <div className="bg-transparent animate-pulse">
          {/* Section Heading */}
          <div className="pt-4 pl-4 mb-4">
            <div className="h-7 w-40 bg-neutral-700/50 rounded"></div>
          </div>
          <div className="border-b border-white/25" />

          {/* Post Content */}
          <div className="py-4">
            <div className="bg-transparent py-2 rounded-lg mb-2">
              {/* User Info Row */}
              <div className="flex items-center px-4 mb-2">
                <div className="bg-neutral-700/50 h-10 w-10 rounded-full border border-white/25"></div>
                <div className="ml-3">
                  <div className="h-5 w-32 bg-neutral-700/50 rounded mb-1"></div>
                  <div className="h-3 w-24 bg-neutral-700/50 rounded"></div>
                </div>
              </div>

              {/* Post Content */}
              <div className="border-b px-4 border-white/25">
                <div className="h-6 w-1/2 bg-neutral-700/50 rounded mb-3"></div>

                {/* Placeholder for post image */}
                <div className="h-48 w-full bg-neutral-700/50 rounded-md mb-3 mx-auto"></div>
              </div>
            </div>
          </div>

          {/* Comment Form */}
          <div className="mb-4 px-4">
            <div className="h-10 w-full bg-neutral-700/50 rounded"></div>
          </div>

          {/* Comments */}
          <div className="flex flex-col">
            <div className="px-4 mb-3 ml-auto">
              <div className="h-7 w-32 bg-neutral-700/50 rounded"></div>
            </div>

            {/* Comment Skeletons */}
            <div className="space-y-3 mb-6 flex flex-col">
              {[...Array(3)].map((_, index) => (
                <div key={index} className="bg-transparent p-3 border-t border-white/25 px-4">
                  <div className="flex items-center mb-2">
                    <div className="bg-neutral-700/50 h-8 w-8 rounded-full border border-white/25"></div>
                    <div className="ml-2">
                      <div className="h-4 w-28 bg-neutral-700/50 rounded mb-1"></div>
                      <div className="h-3 w-20 bg-neutral-700/50 rounded"></div>
                    </div>
                  </div>
                  <div className="h-4 w-full bg-neutral-700/50 rounded mb-1"></div>
                  <div className="h-4 w-3/4 bg-neutral-700/50 rounded"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Right Sidebar */}
      <div className="hidden md:block md:w-1/4 lg:w-1/3 md:mr-2 lg:mr-4">
        <RightSidebar />
      </div>
    </div>
  );
}