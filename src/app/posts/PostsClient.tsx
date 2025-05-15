'use client';

import { PostFeed } from "@/components/PostFeed";
import LeftSidebar from "@/components/LeftSidebar";
import RightSidebar from "@/components/RightSidebar";
import { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { useSearchParams } from "next/navigation";
import PostFeedSkeleton from "@/components/PostFeedSkeleton";

export default function PostsClient() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  const searchParams = useSearchParams();
  const searchQuery = searchParams.get("search");

  const fetchPosts = useCallback(async (searchQuery: any) => {
    try {
      setLoading(true);
      const url = searchQuery
        ? `/api/posts?search=${encodeURIComponent(searchQuery)}`
        : '/api/posts';

      const res = await axios.get(url);

      if (res.data && res.data.posts) {
        setPosts(res.data.posts);
      } else {
        console.error("Unexpected API response format:", res.data);
        setPosts([]);
      }
    } catch (error) {
      console.error("Failed to fetch posts", error);
      setPosts([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchPosts(searchQuery);
    
    const handlePostCreated = () => {
      fetchPosts(searchQuery);
    };
    
    window.addEventListener('postCreated', handlePostCreated);
    
    return () => {
      window.removeEventListener('postCreated', handlePostCreated);
    };
  }, [searchQuery, fetchPosts]);

  return (
    <div className="flex flex-col md:flex-row min-h-screen pb-16 md:pb-0 max-w-screen-2xl mx-auto">
      {/* Left Sidebar - now with a wrapper div that's position:sticky */}
      <div className="md:w-1/4 lg:w-1/3 md:-ml-4 lg:-ml-12 relative">
        <LeftSidebar />
      </div>

      {/* Main Content */}
      <div className="w-full md:w-1/2 lg:w-2/4 border-white/25 md:mx-2 lg:mx-8 md:border-l md:border-r">
        <div className="bg-transparent rounded-lg mb-4">
          {loading ? (
            <PostFeedSkeleton />
          ) : (
            <PostFeed
              initialPosts={posts}
              loading={loading}
              setLoading={setLoading}
              onRefresh={fetchPosts}
            />
          )}
        </div>
      </div>

      {/* Right Sidebar */}
      <div className="hidden md:block md:w-1/3 lg:w-1/3 md:mr-2 lg:mr-4">
        <RightSidebar />
      </div>
    </div>
  );
}