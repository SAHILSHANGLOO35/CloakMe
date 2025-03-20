// app/profile/page.tsx
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { db } from "@/lib/db";

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
      <div className="flex min-h-screen flex-col items-center justify-center">
        <p>User not found.</p>
      </div>
    );
  }
  
  return (
    <main className="flex min-h-screen flex-col items-center p-4 pt-20">
      <div className="w-full max-w-2xl mx-auto">
        <div className="bg-gray-800 p-6 rounded-lg mb-6">
          <h1 className="text-2xl font-bold mb-4">Your Profile</h1>
          <div className="flex items-center gap-4 mb-6">
            <div className="bg-primary h-16 w-16 rounded-full flex items-center justify-center text-white text-2xl font-bold">
              {dbUser.username[0].toUpperCase()}
            </div>
            <div>
              <h2 className="text-xl font-medium">{dbUser.username}</h2>
              <p className="text-gray-400">Anonymous User</p>
            </div>
          </div>
          
          <div className="flex justify-between text-center">
            <div>
              <p className="text-2xl font-bold">{dbUser.posts.length}</p>
              <p className="text-gray-400">Posts</p>
            </div>
            <div>
              <p className="text-2xl font-bold">0</p>
              <p className="text-gray-400">Followers</p>
            </div>
            <div>
              <p className="text-2xl font-bold">0</p>
              <p className="text-gray-400">Following</p>
            </div>
          </div>
        </div>
        
        <h2 className="text-xl font-bold mb-4">Your Posts</h2>
        
        {dbUser.posts.length === 0 ? (
          <div className="text-center py-10 text-gray-400 bg-gray-800 rounded-lg">
            You haven't posted anything yet.
          </div>
        ) : (
          <div className="space-y-4">
            {dbUser.posts.map((post) => (
              <div key={post.id} className="bg-gray-800 p-4 rounded-lg">
                <div className="flex items-center mb-2">
                  <div className="bg-primary h-10 w-10 rounded-full flex items-center justify-center text-white font-bold">
                    {dbUser.username[0].toUpperCase()}
                  </div>
                  <div className="ml-3">
                    <p className="font-medium">{dbUser.username}</p>
                    <p className="text-xs text-gray-400">
                      {new Date(post.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                </div>
                
                {post.content && <p className="mb-3">{post.content}</p>}
                
                {post.imageUrl && (
                  <img 
                    src={post.imageUrl} 
                    alt="Post image" 
                    className="w-full rounded-md mb-3" 
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
    </main>
  );
}