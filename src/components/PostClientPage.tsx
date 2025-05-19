'use client';

import { CommentForm } from "@/components/CommentForm";
import LeftSidebar from "@/components/LeftSidebar";
import RightSidebar from "@/components/RightSidebar";
import axios from "axios";
import { formatDistanceToNow } from "date-fns";
import { useEffect, useState } from "react";

export default function PostClientPage({ post }: { post: any }) {
  const [postComments, setPostComments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchPostComments = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(`/api/posts/${post.id}/comments`);
      setPostComments(response.data.comments);
    } catch (error) {
      console.error("Failed to fetch comments: ", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchPostComments();
  }, [post.id]);

  return (
    <div className="flex flex-col md:flex-row min-h-screen pb-16 md:pb-0 max-w-screen-2xl mx-auto">
      {/* Left Sidebar */}
      <div className="md:w-1/4 lg:w-1/3 md:-ml-4 lg:-ml-12">
        <LeftSidebar />
      </div>

      {/* Main Content */}
      <div className="w-full md:w-1/2 lg:w-2/4 border-white/25 md:mx-2 lg:mx-8 md:border-l md:border-r overflow-y-auto scrollbar-hide">
        <div style={{ fontFamily: '"BR Firma", sans-serif', fontSize: '20px' }} className="pt-4 pl-4 mb-4">
          Post
        </div>
        <div className="border-b border-white/25" />

        {/* Post Content */}
        <div className="py-4">
          <div className="bg-transparent py-2 rounded-lg mb-2">
            <div className="flex items-center px-4 mb-2">
              <div className="bg-primary h-10 w-10 rounded-full flex items-center justify-center text-white font-bold border border-white/25" style={{ fontFamily: '"BR Firma", sans-serif' }}>
                {post.user.username?.[0]?.toUpperCase() ?? "?"}
              </div>
              <div className="ml-3">
                <p className="font-medium" style={{ fontFamily: '"BR Firma", sans-serif' }}>{post.user.username}</p>
                <p className="text-xs text-gray-400">
                  {formatDistanceToNow(new Date(post.createdAt), { addSuffix: true })}
                </p>
              </div>
            </div>

            <div className="border-b px-4 border-white/25 whitespace-pre-wrap">
              {post.content && (
                <p className="mb-3" style={{ fontFamily: '"BR Firma", sans-serif' }}>{post.content}</p>
              )}
              {post.imageUrl && (
                <img
                  src={post.imageUrl}
                  alt="Post image"
                  className="w-auto h-auto rounded-md mb-3 mx-auto"
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
          </div>
        </div>

        {/* Comment Form */}
        <div className="mb-4">
          <CommentForm postId={post.id} onPostComment={fetchPostComments} />
        </div>

        {/* Comments Section */}
        <div className="flex flex-col">
          <h3 className="text-lg font-medium mb-3 px-4" style={{ fontFamily: '"BR Firma", sans-serif' }}>
            Comments
          </h3>

          <div className="border-b border-white/25" />

          {isLoading ? (
            <div className="flex flex-col items-center justify-center py-8 space-y-4">
              {/* Animated loading spinner */}
              <div className="w-8 h-8 border-4 border-t-blue-500 border-r-transparent border-b-blue-500 border-l-transparent rounded-full animate-spin"></div>
              <p className="text-lg font-medium text-gray-700">Loading Comments...</p>
            </div>
          ) : postComments.length === 0 ? (
            <div className="text-center text-gray-400 py-4" style={{ fontFamily: '"BR Firma", sans-serif' }}>
              No comments yet. Be the first to comment!
            </div>
          ) : (
            <div className="space-y-3 mb-6 flex flex-col">
              {postComments.map((comment: any) => (
                <div key={comment.id} className="bg-transparent p-3 border-b border-white/25 px-4">
                  <div className="flex items-center mb-2">
                    <div className="bg-primary h-8 w-8 rounded-full border border-white/25 flex items-center justify-center text-white text-sm font-bold" style={{ fontFamily: '"BR Firma", sans-serif', fontSize: '20px' }}>
                      {comment.user.username[0].toUpperCase()}
                    </div>
                    <div className="ml-2">
                      <p className="text-sm font-medium" style={{ fontFamily: '"BR Firma", sans-serif', fontSize: '14px' }}>
                        {comment.user.username}
                      </p>
                      <p className="text-xs text-gray-400">
                        {formatDistanceToNow(new Date(comment.createdAt), { addSuffix: true })}
                      </p>
                    </div>
                  </div>
                  <p className="text-sm" style={{ fontFamily: '"BR Firma", sans-serif' }}>{comment.content}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Right Sidebar */}
      <div className="hidden md:block md:w-1/4 lg:w-1/3 md:mr-2 lg:mr-4">
        <RightSidebar />
      </div>
    </div>
  );
}