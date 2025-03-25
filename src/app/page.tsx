import { currentUser } from "@clerk/nextjs/server";
import { db } from "@/lib/db";
import { PostForm } from "./components/PostForm";
import { PostFeed } from "./components/PostFeed";

export default async function Home() {
  const user = await currentUser();
  let dbUser = null;

  if (user) {
    dbUser = await db.user.findUnique({
      where: { clerkId: user.id },
    });
  }

  return (
    <main className="flex min-h-screen flex-col items-center p-4 pt-20 bg-gray-600">
      <div className="w-full max-w-2xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-8">CloakMe</h1>
        <h2 className="text-xl text-center mb-8 text-gray-400">
          Where thoughts hide, but voices are heard
        </h2>

        {dbUser && <PostForm />}
        <PostFeed />
      </div>
    </main>
  );
}