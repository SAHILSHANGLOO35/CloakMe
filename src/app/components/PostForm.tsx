"use client";

import { useState, useRef } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { searchGifs, GiphyImage } from "@/lib/giphy";
import { Loader2 } from "lucide-react";

export function PostForm() {
    const [content, setContent] = useState("");
    const [imageUrl, setImageUrl] = useState("");
    const [gifUrl, setGifUrl] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [isUploading, setIsUploading] = useState(false);
    const [isGifPickerOpen, setIsGifPickerOpen] = useState(false);
    const [gifSearchQuery, setGifSearchQuery] = useState("");
    const [gifs, setGifs] = useState<GiphyImage[]>([]);
    const [isSearchingGifs, setIsSearchingGifs] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);
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

    const uploadImage = async (file: File) => {
        if (!file) return;

        try {
            setIsUploading(true);

            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = async () => {
                try {
                    const base64Image = reader.result as string;
                    const response = await axios.post("/api/upload", {
                        image: base64Image,
                    });
                    setImageUrl(response.data.url);
                } catch (error) {
                    console.error("Error uploading image:", error);
                } finally {
                    setIsUploading(false);
                }
            };
        } catch (error) {
            console.error("Error processing image:", error);
            setIsUploading(false);
        }
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            uploadImage(file);
        }
    };

    const handleGifSelect = (url: string) => {
        setGifUrl(url);
        setIsGifPickerOpen(false);
    };

    const handleGifSearch = async () => {
        setIsSearchingGifs(true);
        const results = await searchGifs(gifSearchQuery);
        setGifs(results);
        setIsSearchingGifs(false);
    };

    const loadTrendingGifs = async () => {
        setIsSearchingGifs(true);
        const results = await searchGifs();
        setGifs(results);
        setIsSearchingGifs(false);
    };

    // Load trending GIFs when GIF picker is opened
    const handleGifPickerToggle = () => {
        const newState = !isGifPickerOpen;
        setIsGifPickerOpen(newState);
        if (newState && gifs.length === 0) {
            loadTrendingGifs();
        }
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

                {isUploading && (
                    <div className="flex justify-center items-center py-4">
                        <Loader2 className="h-8 w-8 animate-spin text-primary" />
                        <span className="ml-2">Uploading image...</span>
                    </div>
                )}

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

                <input
                    type="file"
                    ref={fileInputRef}
                    className="hidden"
                    accept="image/*"
                    onChange={handleFileChange}
                />

                <div className="flex justify-between items-center">
                    <div className="flex gap-2">
                        <button
                            type="button"
                            onClick={() => fileInputRef.current?.click()}
                            className="p-2 bg-gray-700 rounded-md hover:bg-gray-600"
                            disabled={isUploading}
                        >
                            📷 Image
                        </button>
                        <button
                            type="button"
                            onClick={handleGifPickerToggle}
                            className="p-2 bg-gray-700 rounded-md hover:bg-gray-600"
                        >
                            🎭 GIF
                        </button>
                    </div>
                    <button
                        type="submit"
                        disabled={
                            isLoading ||
                            isUploading ||
                            (!content && !imageUrl && !gifUrl)
                        }
                        className="px-4 py-2 bg-primary rounded-md hover:bg-primary/80 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {isLoading ? "Posting..." : "Post"}
                    </button>
                </div>
            </form>

            {isGifPickerOpen && (
                <div className="mt-3 p-3 bg-gray-900 rounded-md">
                    <div className="flex mb-2">
                        <input
                            type="text"
                            placeholder="Search GIFs..."
                            className="flex-1 p-2 bg-gray-800 border border-gray-700 rounded-l-md"
                            value={gifSearchQuery}
                            onChange={(e) => setGifSearchQuery(e.target.value)}
                            onKeyPress={(e) =>
                                e.key === "Enter" && handleGifSearch()
                            }
                        />
                        <button
                            onClick={handleGifSearch}
                            className="p-2 bg-primary rounded-r-md hover:bg-primary/80"
                            disabled={isSearchingGifs}
                        >
                            Search
                        </button>
                    </div>

                    {isSearchingGifs ? (
                        <div className="flex justify-center items-center py-4">
                            <Loader2 className="h-8 w-8 animate-spin text-primary" />
                        </div>
                    ) : (
                        <div className="grid grid-cols-3 gap-2 max-h-60 overflow-y-auto">
                            {gifs.map((gif) => (
                                <img
                                    key={gif.id}
                                    src={gif.preview}
                                    alt={gif.title}
                                    className="w-full h-20 object-cover rounded cursor-pointer"
                                    onClick={() => handleGifSelect(gif.url)}
                                />
                            ))}
                            {gifs.length === 0 && (
                                <div className="col-span-3 text-center py-4 text-gray-400">
                                    No GIFs found. Try another search term.
                                </div>
                            )}
                        </div>
                    )}
                    <div className="text-xs text-gray-400 text-right mt-2">
                        Powered by GIPHY
                    </div>
                </div>
            )}
        </div>
    );
}
