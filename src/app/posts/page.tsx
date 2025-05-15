// app/(your-route)/page.tsx
import { Suspense } from "react";
import PostsClient from "./PostsClient";

export default function PostPage() {
  return (
    <div className="w-full min-h-screen">
      <Suspense fallback={<LoadingUI />}>
        <PostsClient />
      </Suspense>
    </div>
  );
}

function LoadingUI() {
  return (
    <div className="flex flex-col items-center justify-center w-full min-h-screen">
      <div className="flex items-center space-x-4">
        <div className="w-8 h-8 border-4 border-t-blue-500 border-r-transparent border-b-blue-500 border-l-transparent rounded-full animate-spin"></div>
        <p className="text-lg font-medium text-gray-700">Loading posts...</p>
      </div>
    </div>
  );
}