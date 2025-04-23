import PostClientPage from "@/components/PostClientPage";
import { db } from "@/lib/db";

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

  return <PostClientPage post={post} />
}