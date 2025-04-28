'use client';

import { PostFeed } from "@/components/PostFeed";
import LeftSidebar from "@/components/LeftSidebar";
import RightSidebar from "@/components/RightSidebar";
import { PostForm } from "@/components/PostForm";
import { useEffect, useState } from "react";
import axios from "axios";

export default function Post() {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchPosts = async () => {
        try {
            const res = await axios.get(`/api/posts`);
            setPosts(res.data.posts);
        } catch (error) {
            console.error("Failed to fetch posts", error);  
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchPosts();
    }, []);

    return (
        <div className="flex flex-row h-screen">
            <div className="w-1/3 -ml-12">
                <LeftSidebar posts={posts} setPosts={setPosts} />
            </div>
            <div className="w-2/4 px-4 mt-0 top-0">
                <PostForm onPostsCreated={fetchPosts} />
                <PostFeed posts={posts} loading={loading} />
            </div>
            <div className="w-1/3 mr-4">
                <RightSidebar />
            </div>
        </div>
    )
}