// app/profile/page.tsx
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { db } from "@/lib/db";
import LeftSidebar from "@/components/LeftSidebar";
import RightSidebar from "@/components/RightSidebar";
import { Suspense } from "react";
import Loading from "./loading";

export default async function ProfilePage() {
  const user = await currentUser();

  if (!user) {
    redirect(`/sign-in`);
  }

  const dbUser = await db.user.findUnique({
    where: { clerkId: user.id },
    include: {
      posts: {
        orderBy: {
          createdAt: "desc",
        },
      },
      comments: true
    },
  });

  if (!dbUser) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center" style={{ fontFamily: '"BR Firma", sans-serif' }}>
        <p style={{ fontFamily: '"BR Firma", sans-serif' }}>User not found.</p>
      </div>
    );
  }

  return (
    <main className="flex flex-col md:flex-row min-h-screen pb-16 md:pb-0 max-w-screen-2xl mx-auto">
      {/* Left Sidebar */}
      <div className="md:w-1/4 lg:w-1/3 md:-ml-4 lg:-ml-12">
        <Suspense fallback={<Loading />}>
          <LeftSidebar />
        </Suspense>
      </div>
      
      {/* Main Content */}
      <div className="w-full md:w-1/2 lg:w-2/4 border-white/25 md:mx-2 lg:mx-8 md:border-l md:border-r overflow-y-auto scrollbar-hide">
        <div className="bg-transparent pt-4 rounded-lg mb-4">
          <h1 className="mb-4 px-4" style={{ fontFamily: '"BR Firma", sans-serif', fontSize: '20px' }}>Your Profile</h1>
          <div className="border-b border-white/25 mb-4" />
          
          {/* Profile Header */}
          <div className="flex items-center gap-2 sm:gap-4 mb-4 px-4">
            <div className="bg-primary h-10 w-10 sm:h-12 sm:w-12 border border-white/25 rounded-full flex items-center justify-center text-white text-xl sm:text-2xl font-bold" style={{ fontFamily: '"BR Firma", sans-serif' }}>
              {dbUser.username[0].toUpperCase()}
            </div>
            <div>
              <h2 className="text-lg sm:text-xl font-medium" style={{ fontFamily: '"BR Firma", sans-serif' }}>{dbUser.username}</h2>
              <p className="text-sm text-gray-400" style={{ fontFamily: '"BR Firma", sans-serif' }}>Anonymous User</p>
            </div>
          </div>

          {/* Profile Stats */}
          <div className="flex justify-between text-center px-4 sm:px-6">
            <div className="flex flex-row gap-1 justify-center items-center">
              <p className="text-sm sm:text-base font-bold" style={{ fontFamily: '"BR Firma", sans-serif' }}>{dbUser.posts.length}</p>
              <p className="text-sm text-gray-400" style={{ fontFamily: '"BR Firma", sans-serif' }}>Posts</p>
            </div>
            <div className="flex flex-row gap-1 justify-center items-center">
              <p className="text-sm sm:text-base font-bold" style={{ fontFamily: '"BR Firma", sans-serif' }}>{dbUser.comments.length}</p>
              <p className="text-sm text-gray-400" style={{ fontFamily: '"BR Firma", sans-serif' }}>Comments</p>
            </div>
          </div>
        </div>

        <div className="border-b border-white/25 mb-4" />

        <h2 className="px-4 mb-4" style={{ fontFamily: '"BR Firma", sans-serif', fontSize: '20px' }}>Your Posts</h2>

        <div className="border-b border-white/25 mb-4" />

        {dbUser.posts.length === 0 ? (
          <div className="text-center py-10 text-gray-400 rounded-lg mx-4" style={{ fontFamily: '"BR Firma", sans-serif' }}>
            You haven't posted anything yet.
          </div>
        ) : (
          <div className="space-y-4">
            {dbUser.posts.map((post: any) => (
              <div key={post.id} className="bg-transparent p-2 sm:p-4 border-b border-white/25">
                {/* Post Header */}
                <div className="flex items-center mb-2">
                  <div className="bg-primary h-8 w-8 sm:h-10 sm:w-10 border border-white/25 rounded-full flex items-center justify-center text-white font-bold" style={{ fontFamily: '"BR Firma", sans-serif' }}>
                    {dbUser.username[0].toUpperCase()}
                  </div>
                  <div className="ml-2 sm:ml-3">
                    <p className="font-medium text-sm sm:text-base" style={{ fontFamily: '"BR Firma", sans-serif' }}>{dbUser.username}</p>
                    <p className="text-xs text-gray-400" style={{ fontFamily: '"BR Firma", sans-serif' }}>
                      {new Date(post.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                </div>

                {/* Post Content */}
                {post.content && <p className="mb-3 text-sm sm:text-base whitespace-pre-wrap" style={{ fontFamily: '"BR Firma", sans-serif' }}>{post.content}</p>}

                {/* Post Images */}
                {post.imageUrl && (
                  <div className="max-h-[300px] sm:max-h-[400px] md:max-h-[500px] overflow-hidden mb-3 rounded-md">
                    <img
                      src={post.imageUrl}
                      alt="Post image"
                      className="w-full h-auto object-contain mx-auto"
                      loading="lazy"
                    />
                  </div>
                )}

                {/* Post GIFs */}
                {post.gifUrl && (
                  <div className="mb-3 rounded-md overflow-hidden">
                    <img
                      src={post.gifUrl}
                      alt="Post GIF"
                      className="w-full h-auto object-contain block"
                      loading="lazy"
                    />
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
      
      {/* Right Sidebar */}
      <div className="hidden md:block md:w-1/4 lg:w-1/3 md:mr-2 lg:mr-4">
        <Suspense fallback={<Loading />}>
          <RightSidebar />
        </Suspense>
      </div>
    </main>
  );
}