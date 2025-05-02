'use client';

import { PostFeed } from "@/components/PostFeed";
import LeftSidebar from "@/components/LeftSidebar";
import RightSidebar from "@/components/RightSidebar";
import { PostForm } from "@/components/PostForm";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import axios from "axios";

export default function Post() {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const searchParams = useSearchParams();
    const searchQuery = searchParams.get("search");

    const fetchPosts = async () => {
        try {
            setLoading(true);
            // Use the search query if available
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
    };

    // Re-fetch posts when search query changes
    useEffect(() => {
        fetchPosts();
    }, [searchQuery]); // Add searchQuery as a dependency

    return (
        <div className="flex flex-row h-screen">
            <div className="w-1/3 -ml-12">
                <LeftSidebar posts={posts} setPosts={setPosts}/>
            </div>
            <div className="w-2/4 px-4 mt-0 top-0">
                <PostForm onPostsCreated={fetchPosts} />
                <PostFeed initialPosts={posts} loading={loading} />
            </div>
            <div className="w-1/3 mr-4">
                <RightSidebar />
            </div>
        </div>
    )
}