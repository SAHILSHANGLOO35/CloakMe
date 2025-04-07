"use client";

import { useState, useRef } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { searchGifs, GiphyImage } from "@/lib/giphy";
import { Image as ImageIcon, Loader2 } from "lucide-react";
import giphyIcon from "../../public/giphy-svgrepo-com.svg";
import Image from "next/image";

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
        <div className="border-l border-r border-white/25 h-48">
            <div style={{ fontFamily: '"BR Firma", sans-serif', fontSize: '20px' }} className="pt-4 pl-4 mb-4">
                Home
            </div>
            <div className="border-b border-l border-r border-white/25" />
            <div className="bg-transparent outline-none mb-6 border-b border-white/25">
                <form onSubmit={handleSubmit}>
                    <textarea
                        className="w-full h-14 pl-4 pt-4 bg-transparent focus:outline-none focus:ring-primary text-white placeholder:text-[20px] resize-none"
                        style={{
                            fontFamily: '"BR Firma", sans-serif',
                            fontSize: content.length > 0 ? '16px' : '20px',
                        }}
                        placeholder="Express anonymously..."
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

                    <div className="flex justify-between items-center pl-3 mb-2">
                        <div className="flex gap-1">
                            <button
                                type="button"
                                onClick={() => fileInputRef.current?.click()}
                                className="w-9 h-9 flex items-center justify-center hover:bg-neutral-800 rounded-full cursor-pointer"
                                disabled={isUploading}
                            >
                                <ImageIcon size={18} className="text-gray-500" />
                            </button>

                            <button
                                type="button"
                                onClick={handleGifPickerToggle}
                                className="w-9 h-9 flex items-center justify-center hover:bg-neutral-800 rounded-full cursor-pointer"
                            >
                                <Image
                                    src={giphyIcon}
                                    alt="Giphy icon"
                                    width={16}
                                    height={16}
                                    className="filter brightness-0 invert opacity-50"
                                />
                            </button>
                        </div>

                        <button
                            type="submit"
                            disabled={
                                isLoading ||
                                isUploading ||
                                (!content && !imageUrl && !gifUrl)
                            }
                            className={`px-4 mr-2 py-1 bg-primary cursor-pointer hover:bg-primary/80 disabled:opacity-50 disabled:cursor-not-allowed rounded-4xl {content || imageUrl || gifUrl ? 'text-white' : 'text-gray-400'
                            }`}
                            style={{ fontFamily: '"BR Firma", sans-serif', fontSize: "16px", backgroundColor: "#374151" }}
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
        </div>
    );
}