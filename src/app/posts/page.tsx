'use client';

import { PostFeed } from "@/components/PostFeed";
import LeftSidebar from "@/components/LeftSidebar";
import RightSidebar from "@/components/RightSidebar";
import { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { useSearchParams } from "next/navigation";
import PostFeedSkeleton from "@/components/PostFeedSkeleton";

export default function Post() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showMobileSidebar, setShowMobileSidebar] = useState(false);

  const searchParams = useSearchParams();
  const searchQuery = searchParams.get("search");

  // Centralize post fetching in the parent component
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

  // Initial data fetch and listen for post creation events
  useEffect(() => {
    fetchPosts(searchQuery);
    
    // Add event listener for post creation
    const handlePostCreated = () => {
      fetchPosts(searchQuery);
    };
    
    window.addEventListener('postCreated', handlePostCreated);
    
    // Clean up event listener on unmount
    return () => {
      window.removeEventListener('postCreated', handlePostCreated);
    };
  }, [searchQuery, fetchPosts]);

  return (
    <div className="flex flex-col md:flex-row min-h-screen">
      {/* Left sidebar - hidden on mobile */}
      <div className="hidden md:block md:w-1/4 lg:w-1/3 md:-ml-4 lg:-ml-12">
        <LeftSidebar />
      </div>

      {/* Main content - full width on mobile, adjusted on larger screens */}
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

      {/* Right sidebar - hidden on mobile */}
      <div className="hidden md:block md:w-1/4 lg:w-1/3 md:mr-2 lg:mr-4">
        <RightSidebar />
      </div>
    </div>
  );
}