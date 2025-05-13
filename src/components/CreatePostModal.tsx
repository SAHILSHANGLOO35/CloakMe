import { useState, useRef, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { searchGifs, GiphyImage } from "@/lib/giphy";
import { Image as ImageIcon, Loader2, X } from "lucide-react";
import giphyIcon from "../../public/giphy-svgrepo-com.svg";
import Image from "next/image";

interface PostModal {
    isOpen: boolean
    onClose: () => void
    onPostCreated: () => void
}

export function CreatePostModal({ isOpen, onClose, onPostCreated }: PostModal) {
    const [content, setContent] = useState("");
    const [imageUrl, setImageUrl] = useState("");
    const [gifUrl, setGifUrl] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [isUploading, setIsUploading] = useState(false);
    const [isGifPickerOpen, setIsGifPickerOpen] = useState(false);
    const [gifSearchQuery, setGifSearchQuery] = useState("");
    const [gifs, setGifs] = useState([]);
    const [isSearchingGifs, setIsSearchingGifs] = useState(false);
    const fileInputRef = useRef(null);
    const modalRef = useRef(null);
    const router = useRouter();

    useEffect(() => {
        if (!isOpen) {
            setIsGifPickerOpen(false);
            setGifSearchQuery("");
            setContent("");
            setImageUrl("");
            setGifUrl("");
            setGifs([]);
        }
    }, [isOpen]);

    useEffect(() => {
        // Close modal on escape key
        const handleEscKey = (e: any) => {
            if (e.key === "Escape") onClose();
        };

        // Close modal when clicking outside
        const handleClickOutside = (e: any) => {
            // @ts-ignore
            if (modalRef.current && !modalRef.current.contains(e.target)) {
                onClose();
            }
        };

        if (isOpen) {
            document.addEventListener("keydown", handleEscKey);
            document.addEventListener("mousedown", handleClickOutside);
        }

        return () => {
            document.removeEventListener("keydown", handleEscKey);
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [isOpen, onClose]);

    // Prevent body scroll when modal is open
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "auto";
        }
        return () => {
            document.body.style.overflow = "auto";
        };
    }, [isOpen]);


    const handleSubmit = async (e: any) => {
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

            onPostCreated();
            setContent("");
            setImageUrl("");
            setGifUrl("");
            setIsGifPickerOpen(false);
            router.refresh();
            onClose(); // Close modal after successful post
        } catch (error) {
            console.error("Error creating post:", error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleClose = () => {
        setIsGifPickerOpen(false); // Ensure GIF picker is closed
        onClose(); // Then call the parent's onClose function
    };

    // @ts-ignore
    const uploadImage = async (file) => {
        if (!file) return;

        try {
            setIsUploading(true);

            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = async () => {
                try {
                    const base64Image = reader.result;
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

    const handleFileChange = (e: any) => {
        const file = e.target.files?.[0];
        if (file) {
            uploadImage(file);
        }
    };

    // @ts-ignore
    const handleGifSelect = (url) => {
        setGifUrl(url);
        setIsGifPickerOpen(false);
    };

    const handleGifSearch = async () => {
        setIsSearchingGifs(true);
        const results = await searchGifs(gifSearchQuery);
        // @ts-ignore
        setGifs(results);
        setIsSearchingGifs(false);
    };

    const loadTrendingGifs = async () => {
        setIsSearchingGifs(true);
        const results = await searchGifs();
        // @ts-ignore
        setGifs(results);
        setIsSearchingGifs(false);
    };

    const handleGifPickerToggle = () => {
        const newState = !isGifPickerOpen;
        setIsGifPickerOpen(newState);
        if (newState && gifs.length === 0) {
            loadTrendingGifs();
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 bg-neutral-900/70 flex items-center justify-center p-4">
            <div
                ref={modalRef}
                className="bg-black rounded-lg w-full max-w-lg mx-4 relative border border-white/25 shadow-xl"
                style={{ maxHeight: '90vh' }}
            >
                <div className="flex justify-between items-center p-4 border-b border-white/25 sticky top-0 bg-black z-10">
                    <h2 className="text-lg sm:text-xl font-medium" style={{ fontFamily: '"BR Firma", sans-serif' }}>
                        Create Post
                    </h2>
                    <button
                        onClick={handleClose}
                        className="p-1 cursor-pointer rounded-full hover:bg-gray-800"
                        aria-label="Close modal"
                    >
                        <X size={24} />
                    </button>
                </div>

                <div className="p-3 sm:p-4 overflow-y-auto" style={{ maxHeight: 'calc(90vh - 60px)' }}>
                    <form onSubmit={handleSubmit}>
                        <textarea
                            className="w-full h-24 p-3 sm:p-4 bg-transparent focus:outline-none focus:ring-primary text-white placeholder:text-gray-400 rounded-md border border-white/25 resize-none mb-4"
                            style={{
                                fontFamily: '"BR Firma", sans-serif',
                                fontSize: content.length > 0 ? '16px' : '16px',
                            }}
                            placeholder="Express anonymously..."
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                            rows={3}
                            autoFocus
                        />

                        {isUploading && (
                            <div className="flex justify-center items-center py-3 sm:py-4">
                                <Loader2 className="h-6 w-6 sm:h-8 sm:w-8 animate-spin text-primary" />
                                <span className="ml-2 text-sm sm:text-base">Uploading image...</span>
                            </div>
                        )}

                        {imageUrl && (
                            <div className="relative mb-4 flex items-center justify-center">
                                <img
                                    src={imageUrl}
                                    alt="Preview"
                                    className="w-full max-h-40 object-contain rounded-md"
                                />
                                <button
                                    type="button"
                                    onClick={() => setImageUrl("")}
                                    className="absolute cursor-pointer top-2 right-2 bg-gray-900 p-1 rounded-full"
                                    aria-label="Remove image"
                                >
                                    <X size={20} />
                                </button>
                            </div>
                        )}

                        {gifUrl && (
                            <div className="relative mb-4 flex items-center justify-center">
                                <img
                                    src={gifUrl}
                                    alt="GIF"
                                    className="max-h-40 object-contain rounded-md"
                                />
                                <button
                                    type="button"
                                    onClick={() => setGifUrl("")}
                                    className="absolute cursor-pointer top-2 right-2 bg-gray-900 p-1 rounded-full"
                                    aria-label="Remove GIF"
                                >
                                    <X size={20} />
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

                        {isGifPickerOpen && (
                            <div className="max-h-60 sm:max-h-64 overflow-hidden bg-gray-800 rounded-md flex flex-col p-2 sm:p-3 space-y-2 sm:space-y-3 mb-3">
                                {/* Search bar */}
                                <div className="flex">
                                    <input
                                        type="text"
                                        placeholder="Search GIFs..."
                                        className="flex-1 p-1.5 sm:p-2 bg-gray-700 border border-gray-600 text-sm text-white rounded-l-md focus:outline-none focus:ring-primary"
                                        value={gifSearchQuery}
                                        onChange={(e) => setGifSearchQuery(e.target.value)}
                                        onKeyDown={(e) => { if (e.key === "Enter") { e.preventDefault(); handleGifSearch() } }}
                                    />
                                    <button
                                        type="button"
                                        onClick={handleGifSearch}
                                        className="p-1.5 sm:p-2 bg-gray-500 hover:bg-neutral-900 text-white text-xs sm:text-sm rounded-r-md cursor-pointer transition-colors"
                                        disabled={isSearchingGifs}
                                    >
                                        Search
                                    </button>
                                </div>

                                {/* GIF results */}
                                {isSearchingGifs ? (
                                    <div className="flex justify-center items-center flex-1 py-4">
                                        <Loader2 className="h-5 w-5 sm:h-6 sm:w-6 animate-spin text-primary" />
                                    </div>
                                ) : (
                                    <div className="grid grid-cols-3 gap-1 sm:gap-2 overflow-y-auto flex-1" style={{ maxHeight: '150px' }}>
                                        {gifs.length > 0 ? (
                                            gifs.map((gif) => (
                                                <img
                                                    // @ts-ignore
                                                    key={gif.id}
                                                    // @ts-ignore
                                                    src={gif.preview}
                                                    // @ts-ignore
                                                    alt={gif.title}
                                                    className="w-full h-16 sm:h-20 object-cover rounded-md cursor-pointer hover:opacity-80 transition"
                                                    // @ts-ignore
                                                    onClick={() => handleGifSelect(gif.url)}
                                                />
                                            ))
                                        ) : (
                                            <div className="col-span-3 text-center text-gray-400 text-xs py-4">
                                                No GIFs found.
                                            </div>
                                        )}
                                    </div>
                                )}
                            </div>
                        )}

                        <div className="flex justify-between items-center">
                            <div className="flex gap-1 sm:gap-2">
                                <button
                                    type="button"
                                    // @ts-ignore
                                    onClick={() => fileInputRef.current?.click()}
                                    className="w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center hover:bg-gray-800 rounded-full cursor-pointer"
                                    disabled={isUploading}
                                    aria-label="Add image"
                                >
                                    <ImageIcon size={18} className="text-gray-400" />
                                </button>

                                <button
                                    type="button"
                                    onClick={handleGifPickerToggle}
                                    className="w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center hover:bg-gray-800 rounded-full cursor-pointer"
                                    aria-label="Add GIF"
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
                                className="px-4 sm:px-6 py-1.5 sm:py-2 rounded-full bg-gray-700 cursor-pointer hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed text-sm sm:text-base"
                                style={{ fontFamily: '"BR Firma", sans-serif' }}
                            >
                                {isLoading ? "Posting..." : "Post"}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}