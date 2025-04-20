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
}

function CreatePostModal({ isOpen, onClose }: PostModal) {
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
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-neutral-800/70">
            <div 
                ref={modalRef}
                className="bg-black rounded-lg w-full max-w-lg mx-4 relative border border-white/25 shadow-xl"
            >
                <div className="flex justify-between items-center p-4 border-b border-white/25">
                    <h2 className="text-xl font-medium" style={{ fontFamily: '"BR Firma", sans-serif' }}>
                        Create Post
                    </h2>
                    <button 
                        onClick={handleClose}
                        className="p-1 rounded-full hover:bg-gray-800"
                    >
                        <X size={24} />
                    </button>
                </div>
                
                <div className="p-4">
                    <form onSubmit={handleSubmit}>
                        <textarea
                            className="w-full h-24 p-4 bg-transparent focus:outline-none focus:ring-primary text-white placeholder:text-gray-400 rounded-md border border-white/25 resize-none mb-4"
                            style={{
                                fontFamily: '"BR Firma", sans-serif',
                                fontSize: content.length > 0 ? '16px' : '18px',
                            }}
                            placeholder="Express anonymously..."
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                            rows={3}
                            autoFocus
                        /> 

                        {isUploading && (
                            <div className="flex justify-center items-center py-4">
                                <Loader2 className="h-8 w-8 animate-spin text-primary" />
                                <span className="ml-2">Uploading image...</span>
                            </div>
                        )}

                        {imageUrl && (
                            <div className="relative mb-4">
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
                            <div className="relative mb-4">
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

                        {isGifPickerOpen && (
                            <div className="mb-4 p-3 bg-gray-800 rounded-md">
                                <div className="flex mb-2">
                                    <input
                                        type="text"
                                        placeholder="Search GIFs..."
                                        className="flex-1 p-2 bg-gray-700 border border-gray-600 rounded-l-md"
                                        value={gifSearchQuery}
                                        onChange={(e) => setGifSearchQuery(e.target.value)}
                                        onKeyPress={(e) =>
                                            e.key === "Enter" && handleGifSearch()
                                        }
                                    />
                                    <button
                                        onClick={handleGifSearch}
                                        className="p-2 rounded-r-md hover:bg-gray-600 bg-gray-700"
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
                                                // @ts-ignore
                                                key={gif.id}
                                                // @ts-ignore
                                                src={gif.preview}
                                                // @ts-ignore
                                                alt={gif.title}
                                                className="w-full h-20 object-cover rounded cursor-pointer"
                                                // @ts-ignore
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

                        <div className="flex justify-between items-center">
                            <div className="flex gap-2">
                                <button
                                    type="button"
                                    // @ts-ignore
                                    onClick={() => fileInputRef.current?.click()}
                                    className="w-10 h-10 flex items-center justify-center hover:bg-gray-800 rounded-full cursor-pointer"
                                    disabled={isUploading}
                                >
                                    <ImageIcon size={20} className="text-gray-400" />
                                </button>

                                <button
                                    type="button"
                                    onClick={handleGifPickerToggle}
                                    className="w-10 h-10 flex items-center justify-center hover:bg-gray-800 rounded-full cursor-pointer"
                                >
                                    <Image
                                        src={giphyIcon}
                                        alt="Giphy icon"
                                        width={18}
                                        height={18}
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
                                className="px-6 py-2 rounded-full bg-gray-700 hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed"
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

export default CreatePostModal;