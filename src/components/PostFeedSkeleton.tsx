export default function PostFeedSkeleton() {
  return (
    <div className="w-full flex flex-col bg-transparent pt-4 rounded-lg mb-4">
      {/* Skeleton for PostForm */}
      <div className="mb-6 border-b border-white/25 pb-4">
        <div className="pl-4 pr-4">
          <div className="h-8 w-20 bg-neutral-700/50 rounded mb-4"></div>
          <div className="h-12 w-full bg-neutral-700/50 rounded mb-3"></div>
        </div>
      </div>

      {/* Skeleton for posts */}
      <div className="space-y-6">
        {[...Array(3)].map((_, index) => (
          <div key={index} className="p-4 border-b border-white/25">
            <div className="flex items-center mb-4">
              <div className="bg-neutral-700/50 h-10 w-10 border border-white/25 rounded-full"></div>
              <div className="ml-3">
                <div className="h-5 w-24 bg-neutral-700/50 rounded mb-1"></div>
                <div className="h-3 w-20 bg-neutral-700/50 rounded"></div>
              </div>
            </div>
            <div className="h-4 w-3/4 bg-neutral-700/50 rounded mb-3"></div>
            <div className="h-48 w-full bg-neutral-700/50 rounded"></div>
          </div>
        ))}
      </div>
    </div>
  );
}
