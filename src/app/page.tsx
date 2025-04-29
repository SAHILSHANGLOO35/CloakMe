"use client";

import Image from "next/image";
import harryPotterImage from "../../public/harrypotter.png";
import harryPotterImage2 from "../../public/Dumbledore.png";
import React, { useState } from "react";
import {
	Shield,
	Image as Imageicon,
	MessageCircle,
	Gift as Gif,
	Lock,
	Users,
	ArrowRight,
	Globe2,
	Eye,
	Share2,
	Loader2,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useUser } from "@clerk/nextjs";
import HarryPotterImage from "@/components/HarryPotterImage";

function App() {
	const router = useRouter();
	const [isLoading, setIsLoading] = useState(false);

	const { isSignedIn } = useUser();
	const harryPotterImage = '/harrypotter.png';

	// Handle navigation with loading state
	const handleNavigation = () => {
		setIsLoading(true);
		router.replace('/posts');
	};

	return (
		<main className="min-h-screen bg-black text-white relative overflow-x-hidden" style={{ fontFamily: '"BR Firma", sans-serif' }}>
			{/* Enhanced Animated Background with multiple elements */}
			<div className="absolute inset-0 overflow-hidden pointer-events-none">
				<div className="absolute w-[300px] md:w-[500px] h-[300px] md:h-[500px] top-48 md:top-96 -left-24 md:-left-48 bg-pink-800/20 rounded-full blur-3xl animate-pulse" />
				<div className="absolute w-[200px] md:w-[300px] h-[200px] md:h-[300px] bottom-20 left-1/2 bg-blue-800/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: "2s" }} />
			</div>

			<div className="text-4xl md:text-8xl flex items-center justify-center font-bold pt-8 text-center bg-gradient-to-r from-white to-gray-400/90 text-transparent bg-clip-text" style={{ fontFamily: '"BR Firma", sans-serif' }}>
				CLOAK ME
			</div>

			{/* Hero Section with floating elements */}
			<div className="relative pt-10 md:pt-0 pb-10 md:pb-10">
				<div className="max-w-7xl mx-auto px-4">
					<div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center">
						{/* Left Column - Text Content */}
						<div className="flex flex-col text-center md:text-left relative">
							<h1 className="text-4xl md:text-7xl font-bold tracking-tight text-transparent bg-clip-text">
								<span className="text-white" style={{ fontFamily: '"BR Firma", sans-serif' }}>Express Yourself</span>
								<br />
								<span className="block bg-gradient-to-r from-[#39c5bb] to-pink-400 text-transparent bg-clip-text pt-4" style={{ fontFamily: '"BR Firma", sans-serif' }}>Without Boundaries</span>
							</h1>
							<p className="text-base md:text-xl pt-4 text-gray-300 mb-8 md:mb-12 leading-relaxed" style={{ fontFamily: '"BR Firma", sans-serif' }}>
								Share your thoughts, images, and stories with
								complete anonymity. Your voice matters, your
								identity stays hidden.
							</p>
							<div className="flex justify-center md:justify-start">
								<button
									className="w-full md:w-80 px-4 flex items-center justify-center py-3 md:py-4 text-base md:text-lg font-semibold bg-transparent hover:bg-neutral-800 rounded-full border border-white/25 transition-all duration-300 cursor-pointer hover:opacity-100 disabled:opacity-70 disabled:cursor-not-allowed shadow-white/25"
									onClick={handleNavigation}
									disabled={isLoading}
								>
									<span className="flex-1 text-center flex items-center justify-center" style={{ fontFamily: '"BR Firma", sans-serif' }}>
										{isLoading ? (
											<>
												<Loader2 className="animate-spin mr-2" size={20} style={{ fontFamily: '"BR Firma", sans-serif' }} />
												Loading...
											</>
										) : (
											"Go to Feed"
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

						{/* Right Column - Image with enhanced effects */}
						<div className="relative w-full flex justify-center md:block">
							{/* {harryPotterImage && (
									<Image
										src={HarryPotterImage}
										alt="Harry Potter"
										fill
										className="object-contain relative drop-shadow-[0_0_25px_rgba(128,0,128,0.4)]"
									/>
								)} */}
							<HarryPotterImage harrypotter={harryPotterImage} />
						</div>
					</div>
				</div>
			</div>

			<div className="relative border-y border-gray-800/50 backdrop-blur-sm bg-black/20" />

			{/* Features Grid with enhanced styling */}
			<div className="relative">
				<div className="max-w-7xl mx-auto pt-16 px-6" style={{ fontFamily: '"BR Firma", sans-serif' }}>
					<h2 className="text-3xl md:text-5xl font-bold text-center mb-6 text-white bg-clip-text leading-[1.5]" style={{ fontFamily: '"BR Firma", sans-serif' }}>
						Why Choose <span className="bg-gradient-to-r from-purple-400 to-pink-400 text-transparent bg-clip-text" style={{ fontFamily: '"BR Firma", sans-serif' }}>Cloak Me?</span>
					</h2>
					<p className="text-gray-400 text-center max-w-2xl mx-auto mb-16">
						Our platform combines cutting-edge security with seamless user experience to create the ultimate anonymous sharing platform.
					</p>
					<div className="grid grid-cols-1 md:grid-cols-3 gap-8" style={{ fontFamily: '"BR Firma", sans-serif' }}>
						{[
							{
								icon: Shield,
								title: "Complete Anonymity",
								description:
									"Post without revealing your identity. Your privacy is our top priority.",
								color: "purple",
								gradient: "from-purple-600/20 to-pink-600/20"
							},
							{
								icon: Lock,
								title: "End-to-End Security",
								description:
									"Advanced encryption keeps your content safe and private.",
								color: "pink",
								gradient: "from-pink-600/20 to-red-600/20"
							},
							{
								icon: Globe2,
								title: "Global Reach",
								description:
									"Connect with millions of users worldwide while staying anonymous.",
								color: "purple",
								gradient: "from-blue-600/20 to-purple-600/20"
							}
						].map((feature, index) => (
							<div
								key={index}
								className="group p-6 md:p-8 rounded-2xl border border-gray-800 hover:border-gray-700 bg-gradient-to-b from-gray-900/80 to-black/80 backdrop-blur-sm transition-all hover:transform hover:-translate-y-2 hover:shadow-[0_10px_20px_rgba(79,70,229,0.15)]"
							>
								<div className={`w-16 h-16 rounded-full bg-gradient-to-r ${feature.gradient} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
									<feature.icon className="w-8 h-8 text-white" />
								</div>
								<h3 className="text-lg md:text-xl font-bold text-white mb-2 md:mb-4">
									{feature.title}
								</h3>
								<p className="text-sm md:text-base text-gray-400" style={{ fontFamily: '"BR Firma", sans-serif' }}>
									{feature.description}
								</p>
							</div>
						))}
					</div>
				</div>
			</div>

			{/* Content Types Section with enhanced visuals */}
			<div className="pt-16 pb-24 bg-gradient-to-b from-black to-gray-900 relative" style={{ fontFamily: '"BR Firma", sans-serif' }}>
				{/* Subtle background pattern */}
				<div className="absolute inset-0 opacity-5">
					<div className="absolute inset-0" style={{
						backgroundImage: "radial-gradient(circle at 25px 25px, white 2%, transparent 0%), radial-gradient(circle at 75px 75px, white 2%, transparent 0%)",
						backgroundSize: "100px 100px"
					}}></div>
				</div>

				<div className="max-w-7xl mx-auto px-4 relative">
					<h2 className="text-3xl md:text-5xl font-bold text-center mb-6 text-white bg-clip-text" style={{ fontFamily: '"BR Firma", sans-serif' }}>
						Share What <span className="bg-gradient-to-r from-purple-400 to-pink-400 text-transparent bg-clip-text">Matters</span>
					</h2>
					<p className="text-gray-400 text-center max-w-2xl mx-auto mb-16">
						Express yourself in multiple formats while maintaining your anonymity
					</p>
					<div className="grid grid-cols-1 md:grid-cols-3 gap-8" style={{ fontFamily: '"BR Firma", sans-serif' }}>
						{[
							{
								icon: Imageicon,
								text: "Images",
								color: "text-blue-400",
								bgColor: "bg-blue-900/20",
								borderColor: "border-blue-800/30",
								desc: "Share moments visually without revealing your identity",
							},
							{
								icon: MessageCircle,
								text: "Thoughts",
								color: "text-green-400",
								bgColor: "bg-green-900/20",
								borderColor: "border-green-800/30",
								desc: "Express your ideas freely in a safe environment",
							},
							{
								icon: Gif,
								text: "GIFs",
								color: "text-pink-400",
								bgColor: "bg-pink-900/20",
								borderColor: "border-pink-800/30",
								desc: "Add animation to your expressions and stand out",
							},
						].map((item, index) => (
							<div
								key={index}
								className={`group flex flex-col items-center p-8 rounded-xl border ${item.borderColor} ${item.bgColor} backdrop-blur-sm transition-all hover:transform hover:-translate-y-2 hover:shadow-[0_10px_25px_rgba(79,70,229,0.2)]`}
							>
								<div className="mb-6 relative">
									<div className="absolute -inset-4 rounded-full bg-gradient-to-r from-purple-600/20 to-pink-600/20 blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
									<item.icon
										className={`w-16 h-16 ${item.color} group-hover:scale-110 transition-transform duration-500 relative`}
									/>
								</div>
								<span className="text-xl font-semibold text-gray-200 mb-3" style={{ fontFamily: '"BR Firma", sans-serif' }}>
									{item.text}
								</span>
								<span className="text-sm text-gray-400 text-center" style={{ fontFamily: '"BR Firma", sans-serif' }}>
									{item.desc}
								</span>
								<button className="mt-6 py-2 px-4 rounded-full bg-black/50 border border-gray-800 text-sm text-gray-300 hover:bg-black/80 hover:text-white transition-all duration-300">
									Learn More
								</button>
							</div>
						))}
					</div>
				</div>
			</div>

			{/* How It Works with enhanced visual elements */}
			<div className="relative pt-0 pb-10 bg-gray-800/15">
				<div className="max-w-7xl mx-auto px-4 md:px-6">
					{/* Main Flex Container */}
					<div className="flex flex-col md:flex-row items-center justify-center gap-12">
						{/* Left - Image with enhanced effects */}
						<div className="relative flex-shrink-0 w-[550px] h-[550px] md:w-[700px] md:h-[700px] flex items-center justify-center overflow-hidden group">
							{harryPotterImage2 && (
								<div className="relative">
									<div className="absolute -inset-4 rounded-2xl bg-gradient-to-r from-purple-600/10 to-pink-600/10 blur-2xl opacity-75 group-hover:opacity-100 transition-opacity duration-1000 animate-pulse"></div>
									<Image
										src={harryPotterImage2}
										alt="Dumbledore Image"
										width={500}
										height={500}
										className="object-contain drop-shadow-[0_0_25px_rgba(128,0,128,0.4)] fadeout-bottom relative group-hover:scale-105 transition-transform duration-700"
									/>
								</div>
							)}
						</div>

						{/* Right - How It Works Section */}
						<div className="flex-1 w-full max-w-lg" style={{ fontFamily: '"BR Firma", sans-serif' }}>
							<h2 className="text-3xl sm:text-5xl font-bold mb-4 text-center md:text-left" style={{ fontFamily: '"BR Firma", sans-serif' }}>
								How It <span className="bg-gradient-to-r from-purple-400 to-pink-400 text-transparent bg-clip-text">Works</span>
							</h2>
							<p className="text-gray-400 mb-8 text-center md:text-left">
								Three simple steps to start sharing anonymously and securely
							</p>

							{/* Steps Grid with enhanced styling */}
							<div className="grid grid-cols-1 gap-6" style={{ fontFamily: '"BR Firma", sans-serif' }}>
								{[
									{
										icon: Eye,
										title: "Stay Anonymous",
										description: "Create posts without revealing your identity",
										gradient: "from-purple-600/30 to-pink-600/30",
										delay: "0s"
									},
									{
										icon: Share2,
										title: "Share Content",
										description: "Upload images, GIFs, or share your thoughts",
										gradient: "from-pink-600/30 to-red-600/30",
										delay: "0.2s"
									},
									{
										icon: Users,
										title: "Connect",
										description: "Engage with a global community",
										gradient: "from-blue-600/30 to-purple-600/30",
										delay: "0.4s"
									},
								].map((step, index) => (
									<div
										key={index}
										className="flex items-center space-x-6 p-6 bg-black/40 backdrop-blur-md border border-gray-800/50 rounded-xl hover:bg-black/50 transition-all duration-300 transform hover:-translate-x-1 hover:translate-y-1 group"
										style={{ fontFamily: '"BR Firma", sans-serif', animationDelay: step.delay }}
									>
										<div className={`w-16 h-16 rounded-full bg-gradient-to-r ${step.gradient} flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-500`}>
											<step.icon className="w-8 h-8 text-white" />
										</div>
										<div>
											<h3 className="text-xl font-bold text-white mb-2">
												{step.title}
											</h3>
											<p className="text-base text-gray-400" style={{ fontFamily: '"BR Firma", sans-serif' }}>
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

			{/* Call to Action Section - New */}
			<div className="py-20 relative overflow-hidden">
				<div className="absolute inset-0 bg-gradient-to-b from-black via-purple-900/20 to-black opacity-80"></div>
				<div className="max-w-5xl mx-auto px-4 relative">
					<div className="py-12 px-8 md:py-16 md:px-12 rounded-3xl border border-purple-800/30 bg-black/60 backdrop-blur-lg relative overflow-hidden">
						{/* Decorative elements */}
						<div className="absolute -top-24 -right-24 w-48 h-48 rounded-full bg-purple-600/20 blur-3xl"></div>
						<div className="absolute -bottom-24 -left-24 w-48 h-48 rounded-full bg-pink-600/20 blur-3xl"></div>

						<div className="relative text-center">
							<h2 className="text-3xl md:text-5xl font-bold mb-6">
								Ready to <span className="bg-gradient-to-r from-purple-400 to-pink-400 text-transparent bg-clip-text">Express Yourself</span>?
							</h2>
							<p className="text-lg text-gray-300 mb-8 max-w-2xl mx-auto">
								Join thousands of users sharing their thoughts anonymously.
								Create your first anonymous post today.
							</p>
							<div className="flex flex-col md:flex-row gap-4 justify-center">
								{!isSignedIn ? (
									<button className="px-8 py-4 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-medium transition-all duration-300 shadow-lg shadow-purple-900/30 cursor-pointer flex items-center justify-center space-x-2" onClick={() => { router.replace(`/sign-in`) }}>
										<span>Get Started Now</span>
										<ArrowRight size={18} />
									</button>
								) : (
									<div>
										<button
											className="w-full md:w-80 px-4 flex items-center justify-center py-3 md:py-4 text-base md:text-lg font-semibold bg-gradient-to-r from-purple-900 to-pink-900 hover:from-purple-800 hover:to-pink-800 rounded-full border border-white/25 transition-all duration-300 cursor-pointer hover:opacity-100 disabled:opacity-70 disabled:cursor-not-allowed shadow-[0_0_15px_rgba(168,85,247,0.4)]"
											onClick={handleNavigation}
											disabled={isLoading}
										>
											<span className="flex-1 text-center flex items-center justify-center" style={{ fontFamily: '"BR Firma", sans-serif' }}>
												{isLoading ? (
													<>
														<Loader2 className="animate-spin mr-2" size={20} style={{ fontFamily: '"BR Firma", sans-serif' }} />
														Loading...
													</>
												) : (
													"Go to Feed"
												)}
											</span>
											{!isLoading && (
												<span>
													<ArrowRight className="ml-auto" />
												</span>
											)}
										</button>
									</div>
								)}
							</div>
						</div>
					</div>
				</div>
			</div>

			{/* FAQ Section - New */}
			<div className="py-16 bg-black/80">
				<div className="max-w-5xl mx-auto px-4">
					<h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
						Frequently Asked <span className="bg-gradient-to-r from-purple-400 to-pink-400 text-transparent bg-clip-text">Questions</span>
					</h2>

					<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
						{[
							{
								q: "Is Cloak Me completely anonymous?",
								a: "Yes, our platform is designed to preserve your anonymity. We don't ask for any of your identity."
							},
							{
								q: "What type of content can I share?",
								a: "You can share text posts, images, and GIFs - all while maintaining your anonymity."
							},
							{
								q: "Is there a mobile app available?",
								a: "No, we don't offer any mobile app services."
							},
							{
								q: "How does Cloak Me ensure my privacy?",
								a: "We use end-to-end encryption and don't store identifying information about our users."
							}
						].map((faq, idx) => (
							<div key={idx} className="p-6 bg-gray-900/30 rounded-xl border border-gray-800/50 hover:border-purple-800/30 transition-all duration-300">
								<h3 className="text-lg md:text-xl font-semibold text-white mb-3">{faq.q}</h3>
								<p className="text-gray-400">{faq.a}</p>
							</div>
						))}
					</div>
				</div>
			</div>

			{/* Enhanced Footer with better organization */}
			<footer className="relative border-t border-gray-800 bg-black/90">
				<div className="min-w-screen mx-auto py-12 md:py-16">
					<div className="flex flex-row items-center justify-center w-full px-10 gap-10" style={{ fontFamily: '"BR Firma", sans-serif' }}>
						{/* Brand Column */}
						<div className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-300 text-transparent bg-clip-text" style={{ fontFamily: '"BR Firma", sans-serif' }}>
							Cloak Me
						</div>
						<p className="text-gray-400 text-sm max-w-full text-right">
							The ultimate platform for anonymous expression. Share your thoughts freely.
						</p>
					</div>

					<div className="border-t border-gray-800 mt-10 pt-8 flex flex-col md:flex-row justify-between items-center px-18">
						<p className="text-gray-500 text-sm order-2 md:order-1" style={{ fontFamily: '"BR Firma", sans-serif' }}>
							© 2025 Cloak Me. All rights reserved.
						</p>

						<div className="flex items-center space-x-6 text-gray-400 mb-4 md:mb-0 order-1 md:order-2" style={{ fontFamily: '"BR Firma", sans-serif' }}>
							<p>~ Sahil Shangloo, aka doubleSdotdev.</p>
						</div>
					</div>
				</div>
			</footer>

			{/* Add global CSS for animations */}
			<style jsx global>{`
                @keyframes float {
                    0% { transform: translateY(0px); }
                    50% { transform: translateY(-20px); }
                    100% { transform: translateY(0px); }
                }
                
                .fadeout-bottom {
                    mask-image: linear-gradient(to bottom, black 85%, transparent 100%);
                }
            `}</style>
		</main>
	);
}

export default App;