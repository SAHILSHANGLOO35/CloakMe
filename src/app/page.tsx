"use client";

import Image from "next/image";
import harryPotterImage from "../../public/harrypotter.png";
import harryPotterImage2 from "../../public/Dumbledore.png";

import React, { useState } from "react"; // Import useState
import {
    Shield,
    Image as Imageicon,
    MessageCircle,
    Gift as Gif,
    Lock,
    Users,
    Sparkles,
    ArrowRight,
    Globe2,
    Eye,
    Share2,
    Loader2, // Import Loader2 icon for loading animation
} from "lucide-react";
import { useRouter } from "next/navigation";

function App() {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false); // Add loading state

    // Handle navigation with loading state
    const handleNavigation = () => {
        setIsLoading(true);
        router.push('/posts');

        // Optional: If you want to reset loading state after a timeout
        // in case navigation takes too long or fails
        // setTimeout(() => setIsLoading(false), 3000);
    };

    return (
        <main className="min-h-screen bg-black/50 text-white relative overflow-x-hidden">
            {/* Animated Background */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute w-[300px] md:w-[500px] h-[300px] md:h-[500px] top-48 md:top-96 -left-24 md:-left-48 bg-pink-800/20 rounded-full blur-3xl" />
            </div>

            <div className="text-4xl md:text-8xl flex items-center justify-center font-bold pt-8 text-center bg-gradient-to-r from-white to-gray-400/90 text-transparent bg-clip-text">
                CLOAK ME
            </div>

            {/* Hero Section */}
            <div className="relative pt-10 md:pt-10 pb-10 md:pb-20">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center">
                        {/* Left Column - Text Content */}
                        <div className="flex flex-col text-center md:text-left">
                            <h1 className="text-4xl md:text-7xl font-bold tracking-tight text-transparent bg-clip-text">
                                <span className="text-white">Express Yourself</span>
                                <br />
                                <span className="block bg-gradient-to-r from-[#39c5bb] to-pink-400 text-transparent bg-clip-text pt-4">Without Boundaries</span>
                            </h1>
                            <p className="text-base md:text-xl pt-4 text-gray-300 mb-8 md:mb-12 leading-relaxed">
                                Share your thoughts, images, and stories with
                                complete anonymity. Your voice matters, your
                                identity stays hidden.
                            </p>
                            <div className="flex justify-center md:justify-start">
                                <button
                                    className="w-full md:w-80 px-4 flex items-center justify-center py-3 md:py-4 text-base md:text-lg font-semibold bg-gradient-to-r from-purple-600 to-pink-600 rounded-full shadow-lg hover:bg-gradient-to-l hover:from-purple-400 hover:to-pink-600 transition-all duration-300 shadow-purple-500/10 cursor-pointer hover:opacity-80 disabled:opacity-70 disabled:cursor-not-allowed"
                                    onClick={handleNavigation}
                                    disabled={isLoading}
                                >
                                    <span className="flex-1 text-center flex items-center justify-center">
                                        {isLoading ? (
                                            <>
                                                <Loader2 className="animate-spin mr-2" size={20} />
                                                Loading...
                                            </>
                                        ) : (
                                            "Go to feed"
                                        )}
                                    </span>
                                    {!isLoading && (
                                        <span>
                                            <ArrowRight className="ml-auto" />
                                        </span>
                                    )}
                                </button>
                            </div>
                        </div>

                        {/* Rest of the code remains the same */}
                        {/* Right Column - Image */}
                        <div className="relative w-full flex justify-center md:block">
                            <div className="relative w-[300px] h-[300px] md:w-[600px] md:h-[600px]">
                                {harryPotterImage && (
                                    <Image
                                        src={harryPotterImage}
                                        alt="Harry Potter"
                                        fill
                                        className="object-contain relative drop-shadow-[0_0_25px_rgba(128,0,128,0.4)]"
                                    />
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="relative border-y border-gray-800/50 backdrop-blur-sm bg-black/20" />

            {/* Features Grid */}
            <div className="relative">
                <div className="max-w-7xl mx-auto pt-16 px-6">
                    <h2 className="text-3xl md:text-4xl font-bold text-center mb-16 text-white bg-clip-text leading-[1.5]">
                        Why Choose Cloak Me?
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {[
                            {
                                icon: Shield,
                                title: "Complete Anonymity",
                                description:
                                    "Post without revealing your identity. Your privacy is our top priority.",
                                color: "purple",
                            },
                            {
                                icon: Lock,
                                title: "End-to-End Security",
                                description:
                                    "Advanced encryption keeps your content safe and private.",
                                color: "pink",
                            },
                            {
                                icon: Globe2,
                                title: "Global Reach",
                                description:
                                    "Connect with millions of users worldwide while staying anonymous.",
                                color: "purple",
                            },
                        ].map((feature, index) => (
                            <div
                                key={index}
                                className="group p-6 md:p-8 rounded-2xl border border-gray-800 hover:border-gray-700 bg-gradient-to-b from-gray-900/50 to-black/50 backdrop-blur-sm transition-all hover:transform hover:-translate-y-1"
                            >
                                <feature.icon
                                    className={`w-10 h-10 md:w-12 md:h-12 mb-4 md:mb-6 text-${feature.color}-400 group-hover:scale-110 transition-transform`}
                                />
                                <h3 className="text-lg md:text-xl font-bold text-white mb-2 md:mb-4">
                                    {feature.title}
                                </h3>
                                <p className="text-sm md:text-base text-gray-400">
                                    {feature.description}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Content Types Section */}
            <div className="pt-16 pb-24 bg-gradient-to-b from-black to-gray-900">
                <div className="max-w-7xl mx-auto px-4">
                    <h2 className="text-3xl md:text-4xl font-bold text-center mb-16 text-white bg-clip-text">
                        Share What Matters
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {[
                            {
                                icon: Imageicon,
                                text: "Images",
                                color: "text-blue-400",
                                desc: "Share moments visually",
                            },
                            {
                                icon: MessageCircle,
                                text: "Thoughts",
                                color: "text-green-400",
                                desc: "Express your ideas",
                            },
                            {
                                icon: Gif,
                                text: "GIFs",
                                color: "text-pink-400",
                                desc: "Add some animation",
                            },
                        ].map((item, index) => (
                            <div
                                key={index}
                                className="group flex flex-col items-center p-6 md:p-8 rounded-xl border border-gray-800 hover:border-gray-700 bg-black/30 backdrop-blur-sm transition-all hover:transform hover:-translate-y-1"
                            >
                                <item.icon
                                    className={`w-10 h-10 md:w-12 md:h-12 ${item.color} mb-2 md:mb-4 group-hover:scale-110 transition-transform`}
                                />
                                <span className="text-base md:text-lg font-semibold text-gray-200 mb-1 md:mb-2">
                                    {item.text}
                                </span>
                                <span className="text-xs md:text-sm text-gray-400">
                                    {item.desc}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* How It Works */}
            <div className="relative pt-0 pb-10 bg-gray-600/15">
                <div className="max-w-7xl mx-auto px-4 md:px-6">
                    {/* Main Flex Container */}
                    <div className="flex flex-col md:flex-row items-center justify-center gap-12">
                        {/* Left - Image */}
                        <div className="relative flex-shrink-0 w-[550px] h-[550px] md:w-[700px] md:h-[700px] flex items-center justify-center overflow-hidden">
                            {harryPotterImage2 && (
                                <Image
                                    src={harryPotterImage2}
                                    alt="Dumbledore Image"
                                    width={500}
                                    height={500}
                                    className="object-contain drop-shadow-[0_0_25px_rgba(128,0,128,0.4)] fadeout-bottom"
                                />
                            )}
                        </div>

                        {/* Right - How It Works Section */}
                        <div className="flex-1 w-full max-w-lg">
                            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-8 text-center md:text-left">
                                How It Works
                            </h2>

                            {/* Steps Grid */}
                            <div className="grid grid-cols-1 gap-6">
                                {[
                                    {
                                        icon: Eye,
                                        title: "Stay Anonymous",
                                        description: "Create posts without revealing your identity",
                                    },
                                    {
                                        icon: Share2,
                                        title: "Share Content",
                                        description: "Upload images, GIFs, or share your thoughts",
                                    },
                                    {
                                        icon: Users,
                                        title: "Connect",
                                        description: "Engage with a global community",
                                    },
                                ].map((step, index) => (
                                    <div
                                        key={index}
                                        className="flex items-center space-x-6 p-4 bg-black/20 rounded-xl hover:bg-black/30 transition-all"
                                    >
                                        <div className="w-16 h-16 rounded-full bg-gradient-to-r from-purple-600/20 to-pink-600/20 flex items-center justify-center flex-shrink-0">
                                            <step.icon className="w-8 h-8 text-white" />
                                        </div>
                                        <div>
                                            <h3 className="text-xl font-bold text-white mb-2">
                                                {step.title}
                                            </h3>
                                            <p className="text-base text-gray-400">
                                                {step.description}
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>


            {/* Footer */}
            <footer className="relative border-t border-gray-800">
                <div className="max-w-7xl mx-auto px-6 md:px-12 py-8 md:py-12 flex flex-col md:flex-row items-center justify-between relative space-y-4 md:space-y-0">
                    {/* Logo / Brand Name */}
                    <div className="text-xl md:text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-300 text-transparent bg-clip-text text-center w-full md:w-auto">
                        Cloak Me
                    </div>

                    {/* Navigation Links */}
                    <div className="flex items-center space-x-4 md:space-x-6 text-gray-300 text-center w-full md:w-auto md:absolute md:left-1/2 md:transform md:-translate-x-1/2">
                        <a href="#" className="hover:text-white transition-colors">Terms</a>
                        <a href="#" className="hover:text-white transition-colors">Privacy</a>
                        <a href="#" className="hover:text-white transition-colors">Contact</a>
                    </div>

                    {/* Copyright Text */}
                    <p className="text-gray-300 text-center w-full md:w-auto">
                        © 2025 Cloak Me. All rights reserved.
                    </p>
                </div>
            </footer>
        </main>
    );
}

export default App;