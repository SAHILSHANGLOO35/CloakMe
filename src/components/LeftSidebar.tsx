"use client"

import React, { useEffect, useState } from 'react';
import { Home, User, PenSquare, Info, Loader2, Search, Menu, X } from 'lucide-react';
import axios from 'axios';
import { usePathname, useRouter } from 'next/navigation';
import { SignedIn, SignedOut, useSession } from '@clerk/nextjs';
import { CreatePostModal } from './CreatePostModal';

function LeftSidebar({ posts, setPosts }: any) {
  const [username, setUsername] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const router = useRouter();
  const [usernameLoading, setUsernameLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const { session, isLoaded } = useSession();

  useEffect(() => {
    const fetchUser = async () => {
      setUsernameLoading(true);
      try {
        const response = await axios.get(`/api/user`);
        if (response.data.user && response.data.user.username) {
          setUsername(response.data.user.username);
          setIsLoggedIn(true);
        } else {
          setUsername("Anonymous");
          setIsLoggedIn(false);
        }
      } catch (error) {
        console.log("User not authenticated:", error);
        setUsername("Anonymous");
        setIsLoggedIn(false);
      } finally {
        setUsernameLoading(false);
      }
    };

    fetchUser();
  }, []);


  const fetchPostsForModal = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get(`/api/posts`);
      setPosts(response.data.posts);
    } catch (error) {
      console.error("Failed to fetch posts", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleClick = () => {
    if (!isLoaded) return;

    if (session?.user) {
      setIsModalOpen(true);
    } else {
      router.replace('/sign-in');
    }
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleNavItemClick = (action: () => void) => {
    action();
    if (isMobileMenuOpen) {
      setIsMobileMenuOpen(false);
    }
  };

  return (
    <>
      {/* Mobile hamburger menu button */}
      <div className="fixed top-4 left-4 md:hidden z-50">
        <button
          onClick={toggleMobileMenu}
          className="p-2 cursor-pointer rounded-full bg-neutral-800 text-white"
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Sidebar for mobile - slide in from left */}
      <div className={`fixed inset-y-0 left-0 transform ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'} w-64 bg-black z-40 transition-transform duration-300 ease-in-out md:hidden`}>
        <div className="flex flex-col h-full px-4 text-white">
          {/* Top padding for mobile */}
          <div className="pt-16"></div>

          {/* Navigation Links */}
          <nav className="flex flex-col space-y-1 mt-4">
            <NavItem icon={<Home size={26} />} label="Home" href='/posts' pathname={pathname} onClick={() => handleNavItemClick(() => router.replace('/posts'))} />

            <NavItem icon={<User size={26} />} label="Profile" href='/profile' pathname={pathname} onClick={() => handleNavItemClick(() => router.replace('/profile'))} />

            <NavItem icon={<Search size={26} />} label="Search" pathname={pathname} onClick={() => handleNavItemClick(() => {
              const el = document.getElementById('search-input');
              if (el) {
                el.scrollIntoView({ behavior: 'smooth' });
                el.focus();
                el.classList.add('ring-2', 'ring-neutral-100', 'bg-neutral-800');
                setTimeout(() => {
                  el.classList.remove('ring-2', 'ring-neutral-100', 'bg-neutral-800');
                }, 1500);
              }
            })} />

            <NavItem icon={<Info size={26} />} label="About Us" href='/about-us' pathname={pathname} onClick={() => handleNavItemClick(() => router.replace('/about-us'))} />
          </nav>

          <div className="border rounded-4xl cursor-pointer mt-4 flex items-center py-2 justify-center relative w-full hover:bg-[#374151] hover:text-white group" style={{ border: "1px solid #374151" }} onClick={() => {
            handleClick();
            if (isMobileMenuOpen) {
              setIsMobileMenuOpen(false);
            }
          }}>
            <PenSquare size={24} className="ml-2 absolute left-2 text-[#374151] group-hover:text-white" />
            <span className="flex-grow text-center text-lg font-semibold text-[#374151] group-hover:text-white group-hover:font-semibold" style={{ fontFamily: '"BR Firma", sans-serif', fontSize: "18px" }}>
              Create Post
            </span>
          </div>

          {/* Push user profile to bottom with flex */}
          <div className="flex-grow"></div>

          {/* User Profile Section - positioned at bottom */}
          <div className="mb-8 px-2 py-2 w-full rounded-full hover:bg-neutral-900 cursor-pointer transition-colors">
            <div className="flex items-center gap-2">
              {!usernameLoading && (
                <div className="flex-none w-9 h-9 bg-neutral-700 rounded-full flex items-center justify-center">
                  <SignedIn>
                    <div
                      className="font-semibold text-white"
                      style={{ fontFamily: '"BR Firma", sans-serif', fontSize: "20px" }}
                    >
                      {username[0]?.toUpperCase()}
                    </div>
                  </SignedIn>
                  <SignedOut>
                    <User size={18} className="text-white" />
                  </SignedOut>
                </div>
              )}

              {usernameLoading ? (
                <div className="flex items-center text-sm text-gray-400">
                  <Loader2 className="h-4 w-4 mr-2 animate-spin text-primary" />
                  <span>Fetching User...</span>
                </div>
              ) : (
                <p
                  className="text-white"
                  style={{ fontFamily: '"BR Firma", sans-serif', fontSize: "15px" }}
                >
                  {username}
                </p>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Desktop sidebar */}
      <div className="hidden md:flex md:flex-col h-full w-64 fixed inset-y-0 left-0 lg:left-40 px-4 text-white">
        {/* Navigation Links - top section */}
        <div className="flex flex-col mt-12">
          <nav className="flex flex-col space-y-1">
            <NavItem icon={<Home size={26} />} label="Home" href='/posts' pathname={pathname} onClick={() => router.replace('/posts')} />

            <NavItem icon={<User size={26} />} label="Profile" href='/profile' pathname={pathname} onClick={
              () => {
                router.replace('/profile');
              }}
            />

            <NavItem icon={<Search size={26} />} label="Search" pathname={pathname} onClick={() => {
              const el = document.getElementById('search-input');
              if (el) {
                el.scrollIntoView({ behavior: 'smooth' });
                el.focus();

                // Add subtle neutral highlight
                el.classList.add('ring-2', 'ring-neutral-100', 'bg-neutral-800');

                setTimeout(() => {
                  el.classList.remove('ring-2', 'ring-neutral-100', 'bg-neutral-800');
                }, 1500);
              }
            }}
            />

            <NavItem icon={<Info size={26} />} label="About Us" href='/about-us' pathname={pathname} onClick={() => router.replace('/about-us')} />
          </nav>

          <div className="border rounded-4xl cursor-pointer mt-4 flex items-center py-2 justify-center relative w-full hover:bg-[#374151] hover:text-white group" style={{ border: "1px solid #374151" }} onClick={() => {
            handleClick();
          }}>
            <PenSquare size={24} className="ml-2 absolute left-2 text-[#374151] group-hover:text-white" />
            <span className="flex-grow text-center text-lg font-semibold text-[#374151] group-hover:text-white group-hover:font-semibold" style={{ fontFamily: '"BR Firma", sans-serif', fontSize: "18px" }}>
              Create Post
            </span>
          </div>

          <CreatePostModal
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            onPostCreated={fetchPostsForModal}
          />
        </div>

        {/* This empty div will push the user profile to the bottom */}
        <div className="flex-grow"></div>

        {/* User Profile Section - explicitly positioned at bottom */}
        <div className="mb-8 px-2 py-2 w-full rounded-full hover:bg-neutral-900 cursor-pointer transition-colors">
          <div className="flex items-center gap-2">
            {/* Perfect circular icon */}
            {!usernameLoading && (
              <div className="flex-none w-9 h-9 bg-neutral-800 rounded-full flex items-center justify-center">
                <SignedIn>
                  <div className='font-semibold text-white' style={{ fontFamily: '"BR Firma", sans-serif', fontSize: "20px" }}>
                    {username[0]?.toUpperCase()}
                  </div>
                </SignedIn>
                <SignedOut>
                  <User size={18} className="text-white" />
                </SignedOut>
              </div>
            )}

            {/* Username */}
            {usernameLoading ? (
              <div className="flex items-center py-2 text-sm text-gray-400">
                <Loader2 className="h-4 w-4 mr-2 animate-spin text-primary" />
                <span>Fetching User...</span>
              </div>
            ) : (<p
              className="text-white leading-none"
              style={{ fontFamily: '"BR Firma", sans-serif', fontSize: "15px" }}
            >
              {username}
            </p>)
            }
          </div>
        </div>
      </div>
    </>
  );
}

// Helper component for navigation items
function NavItem({ icon, label, href, pathname, onClick }: any) {
  const isSelected = pathname === href;

  return (
    <button
      onClick={onClick}
      className={`flex items-center p-3 rounded-full transition-colors cursor-pointer ${isSelected ? 'bg-neutral-900 text-white w-fit' : 'hover:bg-neutral-800 text-neutral-300'
        }`}
    >
      <span className="mr-5">{icon}</span>
      <span style={{ fontFamily: '"BR Firma", sans-serif', fontSize: '20px' }}>{label}</span>
    </button>
  );
}


export default LeftSidebar;