"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { formatDistanceToNow } from "date-fns";

type Post = {
    id: string;
    content: string;
    imageUrl: string | null;
    gifUrl: string | null;
    createdAt: string;
    user: {
        username: string;
        id: string;
    };
};

export function PostFeed() {
    const [posts, setPosts] = useState<Post[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const response = await axios.get("/api/posts");
                setPosts(response.data.posts);
            } catch (error) {
                console.error("Error fetching posts:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchPosts();
    }, []);

    // Container class that's consistent across all states
    const containerClass = "max-w-3xl mx-auto px-4 py-6";

    if (loading) {
        return (
            <div className={`${containerClass} flex justify-center items-center text-center h-64`}>
                <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-primary text-center items-center justify-center"></div>
            </div>
        );
    }

    if (posts.length === 0) {
        return (
            <div className={`${containerClass} flex justify-center items-center text-center h-64 text-gray-400`} style={{ fontFamily: '"BR Firma", sans-serif', fontSize: "18px" }}>
                Fetching Posts...
            </div>
        );
    }

    return (
        <div className={`${containerClass} space-y-4`}>
            {posts.map((post) => (
                <div key={post.id} className="bg-gray-800 p-4 rounded-lg">
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

                    <div className="flex gap-4 text-gray-400 text-sm mt-2">
                        <button className="flex items-center gap-1 hover:text-gray-200">
                            <span>👍</span> Like
                        </button>
                        <button className="flex items-center gap-1 hover:text-gray-200">
                            <span>💬</span> Comment
                        </button>
                        <button className="flex items-center gap-1 hover:text-gray-200">
                            <span>🔄</span> Share
                        </button>
                    </div>
                </div>
            ))}
        </div>
    );
}