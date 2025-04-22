"use client";

import axios from "axios";
import { Loader2 } from "lucide-react";
import React, { useState } from "react";

interface CommentFormProps {
    postId: string;
    onCommentAdded?: () => void;
}

export function CommentForm({ postId, onCommentAdded }: CommentFormProps) {
    const [comment, setComment] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);

    const fetchComments = async () => {
        const response = await axios.get(`/api/posts/${postId}/comments`);
        setComment(response.data.comments);
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!comment.trim() || !postId) return;

        setIsSubmitting(true);

        try {
            await axios.post(`/api/posts/${postId}/comments`, {
                content: comment.trim(),
            });
            setComment("");

            // Notify parent component that a comment was added
            if (onCommentAdded) {
                onCommentAdded();
            }
            fetchComments();
        } catch (error) {
            console.error("Failed to add comment:", error);
        } finally {
            setIsSubmitting(false);
        }
    }

    return (
        <div className="border-b border-white/25">
            <div className="border-b border-l border-r border-white/25" />
            <form onSubmit={handleSubmit}>
                <textarea
                    className="w-full border-white/25 h-14 pl-4 pt-4 bg-transparent focus:outline-none focus:ring-primary text-white placeholder:text-gray-400 resize-none"
                    style={{
                        fontFamily: '"BR Firma", sans-serif',
                        fontSize: comment.length > 0 ? '16px' : '20px',
                    }}
                    placeholder="Add your comment..."
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    rows={3}
                />

                <div className="flex justify-end p-2">
                    <button
                        type="submit"
                        disabled={isSubmitting || !comment.trim()}
                        className="px-4 py-1 bg-gray-700 text-white cursor-pointer hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed rounded-full"
                        style={{ fontFamily: '"BR Firma", sans-serif', fontSize: "16px" }}
                    >
                        {isSubmitting ? (
                            <span className="flex items-center">
                                <Loader2 className="h-4 w-4 animate-spin mr-2" />
                                Adding...
                            </span>
                        ) : (
                            "Comment"
                        )}
                    </button>
                </div>
            </form>
        </div>
    );
}