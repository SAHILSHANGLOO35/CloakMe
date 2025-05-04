'use client';

import { PostFeed } from "@/components/PostFeed";
import LeftSidebar from "@/components/LeftSidebar";
import RightSidebar from "@/components/RightSidebar";
import { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { useSearchParams } from "next/navigation";

export default function Post() {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);

    const searchParams = useSearchParams();
    const searchQuery = searchParams.get("search");

    // Centralize post fetching in the parent component
    const fetchPosts = useCallback(async (searchQuery?: string | null) => {
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

    // Initial data fetch
    useEffect(() => {
        fetchPosts(searchQuery);
    }, [searchQuery]);

    return (
        <div className="flex flex-row min-h-screen">
            <div className="w-1/3 -ml-12">
                <LeftSidebar posts={posts} setPosts={setPosts} />
            </div>

            <div className="w-2/4 mt-0 top-0 border-l border-r border-white/25 mx-8">
                <div className="bg-transparent rounded-lg mb-4">
                    {loading ? (
                        <div className="h-screen flex justify-center items-center w-full">
                            <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-primary" />
                        </div>
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

            <div className="w-1/3 mr-4">
                <RightSidebar />
            </div>
        </div>
    )
}