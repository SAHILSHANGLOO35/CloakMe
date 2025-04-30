"use client";

import { useEffect, useState } from "react";
import { formatDistanceToNow } from "date-fns";
import { Heart, MessageCircle } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

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
    likes: number;
    comments?: number;
};

type PostFeedProps = {
    posts: Post[];
    loading: boolean;
}

export function PostFeed({ posts, loading }: PostFeedProps) {
    const [likedPosts, setLikedPosts] = useState<string[]>([]);
    const [likesMap, setLikesMap] = useState<{ [postId: string]: number }>({});
    const [commentsMap, setCommentsMap] = useState<{ [postId: string]: number }>({});

    const router = useRouter();

    useEffect(() => {
        const initialLikes = posts.reduce((acc: { [postId: string]: number }, post: Post) => {
            acc[post.id] = post.likes;
            return acc;
        }, {});

        const initialComments = posts.reduce((acc: { [postId: string]: number }, post: Post) => {
            // @ts-ignore
            acc[post.id] = post._count?.comments || 0;
            return acc;
        }, {});

        setLikesMap(initialLikes);
        setCommentsMap(initialComments);
    }, [posts]);

    // Responsive container classes based on screen size
    const containerClass = "w-full md:max-w-3xl mx-auto border-l border-r border-white/25 flex top-0 overflow-y-auto scrollbar-hide";
    const loaderContainerClass = "h-screen flex justify-center items-center w-full";
    const emptyContainerClass = "h-screen flex justify-center items-center text-center w-full text-gray-400";

    if (loading) {
        return (
            <div className={containerClass}>
                <div className={loaderContainerClass}>
                    <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-primary" />
                </div>
            </div>
        );
    }

    if (posts.length === 0) {
        return (
            <div className={containerClass}>
                <div className={emptyContainerClass} style={{ fontFamily: '"BR Firma", sans-serif', fontSize: "18px" }}>
                    Fetching Posts...
                </div>
            </div>
        );
    }

    return (
        <div className={containerClass}>
            <div className="space-y-4 w-full flex flex-col pb-16 md:pb-0"> {/* Added padding at the bottom for mobile to avoid content being hidden by the bottom nav bar */}
                {posts.map((post) => (
                    <div key={post.id} className="bg-transparent py-3 px-4 border-b border-white/25 cursor-pointer" style={{ fontFamily: '"BR Firma", sans-serif'}}>
                        <div className="flex items-center mb-2">
                            <div className="bg-primary border border-white/25 h-10 w-10 rounded-full flex items-center justify-center text-white font-bold">
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
                            <button
                                // onClick={() => toggleLike(post.id)}
                                className={`flex cursor-pointer items-center gap-1 ${likedPosts.includes(post.id) ? '' : 'text-gray-400 hover:text-gray-200'}`}
                            >
                                <div className="flex flex-row items-center justify-center border w-12 h-6 gap-1 rounded-3xl">
                                    <Heart size={12} fill={likedPosts.includes(post.id) ? 'red' : 'none'} />
                                    <span className="text-xs">
                                        {(likesMap[post.id] ?? post.likes ?? 0) || 0}
                                    </span>
                                </div>
                            </button>
                            <button className="flex items-center gap-1 hover:text-gray-200">
                                <Link href={`/posts/${post.id}`}>
                                    <div className="flex flex-row cursor-pointer items-center justify-center border w-12 h-6 gap-1 rounded-3xl">
                                        <MessageCircle size={12} />
                                        <span className="text-xs">
                                            {commentsMap[post.id] || 0}
                                        </span>
                                    </div>
                                </Link>
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}