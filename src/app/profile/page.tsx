// app/profile/page.tsx
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { db } from "@/lib/db";
import LeftSidebar from "@/components/LeftSidebar";
import RightSidebar from "@/components/RightSidebar";

export default async function ProfilePage() {
  const user = await currentUser();

  if (!user) {
    redirect("/sign-in");
  }

  const dbUser = await db.user.findUnique({
    where: { clerkId: user.id },
    include: {
      posts: {
        orderBy: {
          createdAt: "desc",
        },
      },
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
    <main className="flex flex-row min-h-screen">
      <div className="w-1/3 -ml-12">
        <LeftSidebar />
      </div>
      <div className="w-2/4 mt-0 top-0 border-l border-r border-white/25 mx-8">
        <div className="bg-transparent pt-6 rounded-lg mb-4">
          <h1 className="mb-4 px-6" style={{ fontFamily: '"BR Firma", sans-serif', fontSize: '20px' }}>Your Profile</h1>
          <div className="border-b border-white/25 mb-4" />
          <div className="flex items-center gap-4 mb-4 px-6">
            <div className="bg-primary h-12 w-12 border border-white/25 rounded-full flex items-center justify-center text-white text-2xl font-bold" style={{ fontFamily: '"BR Firma", sans-serif' }}>
              {dbUser.username[0].toUpperCase()}
            </div>
            <div>
              <h2 className="text-xl font-medium" style={{ fontFamily: '"BR Firma", sans-serif' }}>{dbUser.username}</h2>
              <p className="text-gray-400" style={{ fontFamily: '"BR Firma", sans-serif' }}>Anonymous User</p>
            </div>
          </div>

          <div className="flex justify-between text-center px-6">
            <div className="flex flex-row gap-1 justify-center items-center">
              <p className="text-base font-bold" style={{ fontFamily: '"BR Firma", sans-serif' }}>{dbUser.posts.length}</p>
              <p className="text-gray-400" style={{ fontFamily: '"BR Firma", sans-serif' }}>Posts</p>
            </div>
            <div className="flex flex-row gap-1 justify-center items-center">
              <p className="text-base font-bold" style={{ fontFamily: '"BR Firma", sans-serif' }}>0</p>
              <p className="text-gray-400" style={{ fontFamily: '"BR Firma", sans-serif' }}>Likes</p>
            </div>
            <div className="flex flex-row gap-1 justify-center items-center">
              <p className="textbase font-bold" style={{ fontFamily: '"BR Firma", sans-serif' }}>0</p>
              <p className="text-gray-400" style={{ fontFamily: '"BR Firma", sans-serif' }}>Comments</p>
            </div>
          </div>
        </div>

        <div className="border-b border-white/25 mb-4" />

        <h2 className="px-6 mb-4" style={{ fontFamily: '"BR Firma", sans-serif,', fontSize: '20px' }}>Your Posts</h2>

        <div className="border-b border-white/25 mb-4" />

        {dbUser.posts.length === 0 ? (
          <div className="text-center py-10 text-gray-400 bg-gray-800 rounded-lg" style={{ fontFamily: '"BR Firma", sans-serif' }}>
            You haven't posted anything yet.
          </div>
        ) : (
          <div className="space-y-4">
            {dbUser.posts.map((post) => (
              <div key={post.id} className="bg-transparent p-4 border-b border-white/25">
                <div className="flex items-center mb-2">
                  <div className="bg-primary h-10 w-10 border border-white/25 rounded-full flex items-center justify-center text-white font-bold" style={{ fontFamily: '"BR Firma", sans-serif' }}>
                    {dbUser.username[0].toUpperCase()}
                  </div>
                  <div className="ml-3">
                    <p className="font-medium" style={{ fontFamily: '"BR Firma", sans-serif' }}>{dbUser.username}</p>
                    <p className="text-xs text-gray-400" style={{ fontFamily: '"BR Firma", sans-serif' }}>
                      {new Date(post.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                </div>

                {post.content && <p className="mb-3" style={{ fontFamily: '"BR Firma", sans-serif' }}>{post.content}</p>}

                {post.imageUrl && (
                  <img
                    src={post.imageUrl}
                    alt="Post image"
                    className="w-auto h-auto mx-auto rounded-md mb-3"
                  />
                )}

                {post.gifUrl && (
                  <img
                    src={post.gifUrl}
                    alt="Post GIF"
                    className="w-full rounded-md mb-3"
                  />
                )}
              </div>
            ))}
          </div>
        )}
      </div>
      <div className="w-1/3 mr-4">
        <RightSidebar />
      </div>
    </main>
  );
}