"use client";

import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

export function PostForm() {
    const [content, setContent] = useState("");
    const [imageUrl, setImageUrl] = useState("");
    const [gifUrl, setGifUrl] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [isGifPickerOpen, setIsGifPickerOpen] = useState(false);
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!content && !imageUrl && !gifUrl) {
            return;
        }

        try {
            setIsLoading(true);
            await axios.post("/api/posts", {
                content,
                imageUrl,
                gifUrl,
            });

            setContent("");
            setImageUrl("");
            setGifUrl("");
            setIsGifPickerOpen(false);
            router.refresh();
        } catch (error) {
            console.error("Error creating post:", error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleGifSelect = (url: string) => {
        setGifUrl(url);
        setIsGifPickerOpen(false);
    };

    return (
        <div className="bg-gray-800 p-4 rounded-lg mb-6">
            <form onSubmit={handleSubmit}>
                <textarea
                    className="w-full p-3 bg-gray-900 rounded-md border border-gray-700 focus:outline-none focus:ring-2 focus:ring-primary mb-3 text-white"
                    placeholder="Share your thoughts anonymously..."
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    rows={3}
                />

                {imageUrl && (
                    <div className="relative mb-3">
                        <img
                            src={imageUrl}
                            alt="Preview"
                            className="w-full max-h-60 object-contain rounded-md"
                        />
                        <button
                            type="button"
                            onClick={() => setImageUrl("")}
                            className="absolute top-2 right-2 bg-gray-900 p-1 rounded-full"
                        >
                            &times;
                        </button>
                    </div>
                )}

                {gifUrl && (
                    <div className="relative mb-3">
                        <img
                            src={gifUrl}
                            alt="GIF"
                            className="w-full max-h-60 object-contain rounded-md"
                        />
                        <button
                            type="button"
                            onClick={() => setGifUrl("")}
                            className="absolute top-2 right-2 bg-gray-900 p-1 rounded-full"
                        >
                            &times;
                        </button>
                    </div>
                )}

                <div className="flex justify-between items-center">
                    <div className="flex gap-2">
                        <button
                            type="button"
                            onClick={() => {
                                const input = document.createElement("input");
                                input.type = "file";
                                input.accept = "image/*";
                                input.onchange = (e) => {
                                    const file = (e.target as HTMLInputElement)
                                        .files?.[0];
                                    if (file) {
                                        // In a real app, you would upload to a storage service
                                        // This is a placeholder for demo purposes
                                        const reader = new FileReader();
                                        reader.onload = () => {
                                            setImageUrl(
                                                reader.result as string
                                            );
                                        };
                                        reader.readAsDataURL(file);
                                    }
                                };
                                input.click();
                            }}
                            className="p-2 bg-gray-700 rounded-md hover:bg-gray-600"
                        >
                            📷 Image
                        </button>
                        <button
                            type="button"
                            onClick={() => setIsGifPickerOpen(!isGifPickerOpen)}
                            className="p-2 bg-gray-700 rounded-md hover:bg-gray-600"
                        >
                            🎭 GIF
                        </button>
                    </div>
                    <button
                        type="submit"
                        disabled={
                            isLoading || (!content && !imageUrl && !gifUrl)
                        }
                        className="px-4 py-2 bg-primary rounded-md hover:bg-primary/80 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {isLoading ? "Posting..." : "Post"}
                    </button>
                </div>
            </form>

            {isGifPickerOpen && (
                <div className="mt-3 p-3 bg-gray-900 rounded-md">
                    <div className="mb-2">
                        <input
                            type="text"
                            placeholder="Search GIFs..."
                            className="w-full p-2 bg-gray-800 border border-gray-700 rounded-md"
                        />
                    </div>
                    <div className="grid grid-cols-3 gap-2">
                        {/* This would be connected to a real GIF API like GIPHY or Tenor */}
                        {[
                            "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExcmZzdzFrZ3BsZWVrbjA2dHJ2M3liaW5xeG1xeHR4Z3B1Z3VzaXFqNiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/QMHoU66sBXqqLqYvGO/giphy.gif",
                            "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExbHJxZWZvOGRzaTM5dzd5dTJlMXgxeWtsMDlxam80MnFiNXZrODBycSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/VbnUQpnihPSIgIXuZv/giphy.gif",
                            "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExdm8zZmNmOGcwajEwdHVyOXZ5cnA3OHN3anMxYnJxbjZhaDd4c2pjaiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/5xtDarqlsEW6F7F14Fq/giphy.gif",
                        ].map((gif, i) => (
                            <img
                                key={i}
                                src={gif}
                                alt={`GIF ${i}`}
                                className="w-full h-20 object-cover rounded cursor-pointer"
                                onClick={() => handleGifSelect(gif)}
                            />
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}
