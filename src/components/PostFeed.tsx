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

    // const toggleLike = async (postId: string) => {
    //     const alreadyLiked = likedPosts.includes(postId);

    //     try {
    //         await axios.post(`/api/posts/${postId}/like`, {
    //             like: !alreadyLiked
    //         });

    //         setLikesMap((prevLikes) => ({
    //             ...prevLikes,
    //             [postId]: alreadyLiked ? prevLikes[postId] - 1 : prevLikes[postId] + 1,
    //         }));

    //         setLikedPosts((prev) =>
    //             alreadyLiked ? prev.filter((id) => id !== postId) : [...prev, postId]
    //         );
    //     } catch (error) {
    //         console.error("Failed to like/unlike post: ", error);
    //     }
    // };

    // useEffect(() => {
    //     const fetchPosts = async () => {
    //         try {
    //             const response = await axios.get("/api/posts");
    //             setPosts(response.data.posts);

    //             const initialLikes = response.data.posts.reduce((acc: { [postId: string]: number }, post: Post) => {
    //                 acc[post.id] = post.likes;
    //                 return acc;
    //             }, {});

    //             const initialComments = response.data.posts.reduce((acc: { [postId: string]: number }, post: Post) => {
    //                 // @ts-ignore
    //                 acc[post.id] = post._count?.comments || 0;
    //                 return acc;
    //             }, {});

    //             setLikesMap(initialLikes);
    //             setCommentsMap(initialComments);
    //         } catch (error) {
    //             console.error("Error fetching posts:", error);
    //         } finally {
    //             setLoading(false);
    //         }
    //     };

    //     fetchPosts();
    // }, [refreshTrigger]);

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

    const containerClass = "max-w-3xl mx-auto border-l h-screen border-r border-white/25 flex top-0 overflow-y-auto scrollbar-hide";


    if (loading) {
        return (
            <div className={containerClass}>
                <div className="flex justify-center items-center w-full h-full">
                    <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-primary" />
                </div>
            </div>
        );
    }

    if (posts.length === 0) {
        return (
            <div className={containerClass}>
                <div className="flex justify-center items-center text-center w-full h-full text-gray-400" style={{ fontFamily: '"BR Firma", sans-serif', fontSize: "18px" }}>
                    Fetching Posts...
                </div>
            </div>
        );
    }

    return (
        <div className={`${containerClass}`}>
            <div className="space-y-4 w-full flex flex-col">
                {posts.map((post) => (
                    <div key={post.id} className="bg-transparent py-3 px-4 border-b border-white/25 cursor-pointer" style={{ fontFamily: '"BR Firma", sans-serif'}} onClick={() => router.push(`/posts/${post.id}`)}>
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
                                className="w-full rounded-md mb-3 mx-auto"
                            />
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