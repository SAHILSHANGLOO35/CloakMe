import { CommentForm } from "@/components/CommentForm";
import LeftSidebar from "@/components/LeftSidebar";
import RightSidebar from "@/components/RightSidebar";
import { db } from "@/lib/db";
import { formatDistanceToNow } from "date-fns";

export default async function PostPage({ params }: { params: { postId: string } }) {
  const post = await db.post.findUnique({
    where: {
      id: await params.postId,
    },
    include: {
      user: true
    }
  });

  // Fetch comments for this post
  const comments = await db.comment.findMany({
    where: {
      postId: await params.postId
    },
    include: {
      user: true
    },
    orderBy: {
      createdAt: 'desc'
    }
  });

  if (!post) return <div className="flex justify-center items-center h-screen">Oops Page not Found!</div>;

  return (
    <div className="flex flex-row h-screen">
      <div className="w-1/3 -ml-12">
        <LeftSidebar />
      </div>
      <div className="w-2/4 px-4 mt-0 top-0 overflow-y-auto scrollbar-hide">
        <div className="border-l border-r border-white/25">
          <div style={{ fontFamily: '"BR Firma", sans-serif', fontSize: '20px' }} className="pt-4 pl-4 mb-4">
            Post
          </div>
          <div className="border-b border-l border-r border-white/25" />

          {/* Post Content */}
          <div className="p-4">
            <div className="bg-gray-800 p-4 rounded-lg mb-4">
              <div className="flex items-center mb-2">
                <div className="bg-primary h-10 w-10 rounded-full flex items-center justify-center text-white font-bold">
                  {post.user.username[0].toUpperCase()}
                </div>
                <div className="ml-3">
                  <p className="font-medium">{post.user.username}</p>
                  <p className="text-xs text-gray-400">
                    {formatDistanceToNow(new Date(post.createdAt), {
                      addSuffix: true,
                    })}
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
            
            {/* Comment Form */}
            <div className="mb-6">
              <CommentForm postId={post.id} />
            </div>
            
            {/* Comments Display */}
            <div>
              <h3 className="text-lg font-medium mb-3" style={{ fontFamily: '"BR Firma", sans-serif' }}>
                Comments
              </h3>
              
              {comments.length === 0 ? (
                <div className="text-center text-gray-400 py-4" style={{ fontFamily: '"BR Firma", sans-serif' }}>
                  No comments yet. Be the first to comment!
                </div>
              ) : (
                <div className="space-y-3 mb-6">
                  {comments.map((comment) => (
                    <div key={comment.id} className="bg-gray-800/50 p-3 rounded-lg">
                      <div className="flex items-center mb-2">
                        <div className="bg-primary h-8 w-8 rounded-full flex items-center justify-center text-white text-sm font-bold">
                          {comment.user.username[0].toUpperCase()}
                        </div>
                        <div className="ml-2">
                          <p className="text-sm font-medium">{comment.user.username}</p>
                          <p className="text-xs text-gray-400">
                            {formatDistanceToNow(new Date(comment.createdAt), {
                              addSuffix: true,
                            })}
                          </p>
                        </div>
                      </div>
                      <p className="text-sm">{comment.content}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <div className="w-1/3 mr-4">
        <RightSidebar />
      </div>
    </div>
  );
}