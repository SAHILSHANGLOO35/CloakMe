// "use client";

// import axios from "axios";
// import { useEffect, useState } from "react";
// import Comment from "./Comment";

// type CommentProps = {
//     postId: string;
// };

// type CommentType = {
//     id: string;
//     content: string; // Updated from 'text' to match the backend response
//     user: {
//         username: string;
//     };
//     createdAt: string;
// };

// export function Comments({ postId }: CommentProps) {
//     const [comments, setComments] = useState<CommentType[]>([]);
//     const [loading, setLoading] = useState(false);
//     const [error, setError] = useState("");

//     useEffect(() => {
//         const fetchComments = async () => {
//             if (!postId) return;
            
//             setLoading(true);

//             try {
//                 const response = await axios.get(`/api/posts/${postId}/comments`);
//                 const fetchedComments = response.data.comments;

//                 setComments(fetchedComments);
//                 setError("");
//             } catch (error) {
//                 console.error("Failed to fetch comments: ", error);
//                 setError("Failed to load comments");
//             } finally {
//                 setLoading(false);
//             }
//         };

//         fetchComments();
//         // Remove comments from dependency array to prevent infinite loop
//     }, [postId]);

//     if (loading) {
//         return (
//             <div className="py-4 text-center text-sm text-gray-400">
//                 <div className="animate-spin rounded-full h-6 w-6 border-t-2 border-b-2 border-primary mx-auto mb-2" />
//                 Loading comments...
//             </div>
//         );
//     }

//     if (error) {
//         return (
//             <div className="py-4 text-center text-sm text-red-400">
//                 {error}
//             </div>
//         );
//     }

//     if (comments.length === 0) {
//         return (
//             <div className="py-4 text-center text-sm text-gray-400">
//                 No comments yet. Be the first to comment!
//             </div>
//         );
//     }

//     return (
//         <div className="mt-3 space-y-1">
//             {comments.map((comment) => (
//                 <Comment key={comment.id || Math.random().toString()} comment={comment} />
//             ))}
//         </div>
//     );
// }