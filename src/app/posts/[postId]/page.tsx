import { db } from "@/lib/db";
import { Suspense } from "react";
import CustomLoading from "./loading";
import PostClientPage from "@/components/PostClientPage";

export const dynamic = "force-dynamic";

export default async function PostPage({ params }: { params: { postId: string } }) {

  const post = await db.post.findUnique({
    where: {
      id: params.postId,
    },
    include: {
      user: true
    }
  });

  if(!post) return <div>Post not found!</div>

  return (
    <Suspense fallback={<CustomLoading />}>
      <PostClientPage post={post} />
    </Suspense>
  )
}