"use client";

import { useState, useRef } from "react";
import axios from "axios";
import { searchGifs, GiphyImage } from "@/lib/giphy";
import { Image as ImageIcon, Loader2, X } from "lucide-react";
import giphyIcon from "../../public/giphy-svgrepo-com.svg";
import Image from "next/image";
import { useSession } from "@clerk/nextjs";
import { useRouter } from "next/navigation";

type PostFormProps = {
    onPostsCreated: () => void;
};

export function PostForm({ onPostsCreated }: PostFormProps) {
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
    const { session, isLoaded } = useSession();
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!isLoaded) return;

        if (session?.user) {

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

                onPostsCreated();
            } catch (error) {
                console.error("Error creating post:", error);
            } finally {
                setIsLoading(false);
            }
        } else {
            router.push(`/sign-in`);
        }
    };

    const uploadImage = async (file: File) => {
        if (!file) return;

        if (file.size > 5 * 1024 * 1024) {
            alert("File size too large. Please upload an image smaller than 5MB.");
            return;
        }

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
        <div>
            <div style={{ fontFamily: '"BR Firma", sans-serif', fontSize: '18px' }} className="pt-3 sm:pt-4 pl-3 sm:pl-4 mb-3 sm:mb-4 text-base sm:text-lg md:text-xl">
                Home
            </div>
            <div className="border-b border-l border-r border-white/25" />
            <div className="bg-transparent border-b border-white/25 outline-none z-40">
                <form onSubmit={handleSubmit} className="relative">
                    {/* Fixed height container for content + media */}
                    <div className="min-h-[120px] sm:min-h-[150px] flex flex-col">
                        <textarea
                            className="w-full pl-3 sm:pl-4 pt-3 sm:pt-4 bg-transparent focus:outline-none focus:ring-primary text-white placeholder:text-base sm:placeholder:text-lg md:placeholder:text-xl resize-none flex-grow whitespace-pre-wrap"
                            style={{
                                fontFamily: '"BR Firma", sans-serif',
                                fontSize: content.length > 0 ? '14px' : '16px',
                            }}
                            placeholder="Express anonymously..."
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                            rows={3}
                        />

                        {/* Media preview container with fixed positioning */}
                        <div className="relative px-3 sm:px-4 mb-2">
                            {/* Upload loading indicator */}
                            {isUploading && (
                                <div className="flex items-center py-2 text-xs sm:text-sm text-gray-400">
                                    <Loader2 className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2 animate-spin text-primary" />
                                    <span>Uploading image...</span>
                                </div>
                            )}

                            {/* Image preview */}
                            {imageUrl && (
                                <div className="relative mb-2">
                                    <div className="relative rounded-md overflow-hidden">
                                        <img
                                            src={imageUrl}
                                            alt="Preview"
                                            className="w-full max-h-40 sm:max-h-60 object-contain"
                                        />
                                        <button
                                            type="button"
                                            onClick={() => setImageUrl("")}
                                            className="cursor-pointer absolute top-2 right-2 bg-gray-900 bg-opacity-70 p-1 rounded-full hover:bg-opacity-100"
                                        >
                                            <X size={16} />
                                        </button>
                                    </div>
                                </div>
                            )}

                            {/* GIF preview */}
                            {gifUrl && (
                                <div className="relative mb-2">
                                    <div className="relative rounded-md overflow-hidden">
                                        <img
                                            src={gifUrl}
                                            alt="GIF"
                                            className="w-full max-h-40 sm:max-h-60 object-contain"
                                        />
                                        <button
                                            type="button"
                                            onClick={() => setGifUrl("")}
                                            className="cursor-pointer absolute top-2 right-2 bg-gray-900 bg-opacity-70 p-1 rounded-full hover:bg-opacity-100"
                                        >
                                            <X size={16} />
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>

                    <input
                        type="file"
                        ref={fileInputRef}
                        className="hidden"
                        accept="image/*"
                        onChange={handleFileChange}
                    />

                    <div className="flex flex-wrap justify-between items-center gap-2 px-2 sm:px-3 mb-2">
                        <div className="flex gap-1">
                            <button
                                type="button"
                                onClick={() => fileInputRef.current?.click()}
                                className="w-8 h-8 sm:w-9 sm:h-9 flex items-center justify-center hover:bg-neutral-800 rounded-full cursor-pointer"
                                disabled={isUploading}
                            >
                                <ImageIcon
                                    size={16}
                                    className={`${isUploading ? 'text-gray-700' : 'text-gray-500'} sm:w-[16px] sm:h-[16px]`}
                                />
                            </button>

                            <button
                                type="button"
                                onClick={handleGifPickerToggle}
                                className="w-8 h-8 sm:w-9 sm:h-9 flex items-center justify-center hover:bg-neutral-800 rounded-full cursor-pointer z-40"
                                disabled={isUploading}
                            >
                                <Image
                                    src={giphyIcon}
                                    alt="Giphy icon"
                                    width={14}
                                    height={14}
                                    className={`filter brightness-0 invert ${isUploading ? 'opacity-30' : 'opacity-50'} sm:w-4 sm:h-4`}
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
                            className="px-3 sm:px-4 py-1 disabled:opacity-50 cursor-pointer disabled:cursor-not-allowed rounded-full text-white text-sm sm:text-base"
                            style={{
                                fontFamily: '"BR Firma", sans-serif',
                                backgroundColor: "#374151"
                            }}
                        >
                            {isLoading ? "Posting..." : "Post"}
                        </button>
                    </div>
                </form>

                {/* GIF picker positioned with fixed dimensions - made responsive */}
                {isGifPickerOpen && (
                    <div className="absolute z-50 mt-3 p-2 sm:p-3 bg-gray-900 rounded-md shadow-lg border border-gray-700 w-80 sm:w-72 left-1/2 transform -translate-x-1/2">
                        <div className="flex mb-2">
                            <input
                                type="text"
                                placeholder="Search GIFs..."
                                className="flex-1 outline-none p-1 sm:p-2 text-xs sm:text-sm bg-gray-800 border border-gray-700 rounded-l-md"
                                value={gifSearchQuery}
                                onChange={(e) => setGifSearchQuery(e.target.value)}
                                onKeyPress={(e) =>
                                    e.key === "Enter" && handleGifSearch()
                                }
                            />
                            <button
                                onClick={handleGifSearch}
                                className="p-1 sm:p-2 text-xs sm:text-sm bg-gray-700 rounded-r-md hover:bg-gray-600 cursor-pointer disabled:opacity-50"
                                disabled={isSearchingGifs || gifSearchQuery.trim() === ""}
                            >
                                Search
                            </button>
                        </div>

                        <div className="h-48 sm:h-60 overflow-hidden">
                            {isSearchingGifs ? (
                                <div className="flex justify-center items-center h-full">
                                    <Loader2 className="h-5 w-5 sm:h-6 sm:w-6 animate-spin text-primary" />
                                </div>
                            ) : (
                                <div className="grid grid-cols-3 gap-1 sm:gap-2 h-full overflow-y-auto">
                                    {gifs.map((gif) => (
                                        <img
                                            key={gif.id}
                                            src={gif.preview}
                                            alt={gif.title}
                                            className="w-full h-16 sm:h-20 object-cover rounded cursor-pointer hover:opacity-80"
                                            onClick={() => handleGifSelect(gif.url)}
                                        />
                                    ))}
                                    {gifs.length === 0 && (
                                        <div className="col-span-3 text-center py-4 text-gray-400 text-xs sm:text-sm">
                                            No GIFs found. Try another search term.
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>
                        <div className="text-xs text-gray-400 text-right mt-1 sm:mt-2">
                            Powered by GIPHY
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}