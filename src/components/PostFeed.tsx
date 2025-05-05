"use client";

import { useEffect, useState } from "react";
import { formatDistanceToNow } from "date-fns";
import { MessageCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import { useSession } from "@clerk/nextjs";
import { PostForm } from "./PostForm";

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
    comments?: number;
    _count?: {
        comments: number
    };
};

type PostFeedProps = {
    initialPosts: Post[];
    loading: boolean;
    setLoading: (loading: boolean) => void;
    onRefresh: (searchQuery?: string | null) => Promise<void>;
};

export function PostFeed({ initialPosts, loading, onRefresh }: PostFeedProps) {
    const [commentsMap, setCommentsMap] = useState<{ [postId: string]: number }>({});

    const router = useRouter();
    const { session, isLoaded } = useSession();

    const handleCommentAuth = (postId: string) => {
        if (!isLoaded) return;

        if (session?.user) {
            router.replace(`/posts/${postId}`);
        } else {
            router.replace(`/sign-in`);
        }
    };

    useEffect(() => {
        if (!initialPosts || initialPosts.length === 0) return;

        const initialComments = initialPosts.reduce((acc: { [postId: string]: number }, post: Post) => {
            acc[post.id] = post._count?.comments || 0;
            return acc;
        }, {});

        setCommentsMap(initialComments);
    }, [initialPosts]);

    if (!loading && (!initialPosts || initialPosts.length === 0)) {
        return (
            <div>
                <PostForm onPostsCreated={() => onRefresh()} />
                <div className="h-64 flex justify-center items-center text-center w-full text-gray-400"
                    style={{ fontFamily: '"BR Firma", sans-serif', fontSize: "18px" }}>
                    No posts found!
                </div>
            </div>
        );
    }

    return (
        <div>
            <PostForm onPostsCreated={() => onRefresh()} />
            <div className="w-full flex flex-col pb-16 md:pb-0">
                {initialPosts.map((post) => (
                    <div key={post.id} className="bg-transparent py-3 px-4 border-t border-white/25 cursor-pointer" style={{ fontFamily: '"BR Firma", sans-serif' }}>
                        <div className="flex items-center mb-2">
                            <div className="bg-primary border border-white/25 h-10 w-10 rounded-full flex items-center justify-center text-white font-bold">
                                {post.user.username[0].toUpperCase()}
                            </div>
                            <div className="ml-3">
                                <p className="font-medium">{post.user.username}</p>
                                <p className="text-xs text-gray-400">
                                    {formatDistanceToNow(new Date(post.createdAt), { addSuffix: true })}
                                </p>
                            </div>
                        </div>

                        {post.content && <p className="mb-3 whitespace-pre-wrap">{post.content}</p>}

                        {post.imageUrl && (
                            <div className="max-h-[500px] overflow-hidden mb-3">
                                <img
                                    src={post.imageUrl}
                                    alt="Post image"
                                    className="w-full h-auto object-contain rounded-md mx-auto"
                                    loading="lazy"
                                />
                            </div>
                        )}

                        {post.gifUrl && (
                            <div className="max-h-[500px] overflow-hidden mb-3">
                                <img
                                    src={post.gifUrl}
                                    alt="Post GIF"
                                    className="w-full h-auto object-contain rounded-md mx-auto"
                                    loading="lazy"
                                />
                            </div>
                        )}

                        <div className="flex flex-row items-center gap-4 text-gray-400 text-sm mt-2">
                            <button className="flex items-center gap-1 hover:text-gray-200" onClick={() => handleCommentAuth(post.id)}>
                                <div className="flex flex-row cursor-pointer items-center justify-center border w-12 h-6 gap-1 rounded-3xl">
                                    <MessageCircle size={12} />
                                    <span className="text-xs">
                                        {commentsMap[post.id] || 0}
                                    </span>
                                </div>
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}