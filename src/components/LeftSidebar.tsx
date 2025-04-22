"use client"
import React, { useEffect, useState } from 'react';
import { Home, User, PenSquare, Info, Bell } from 'lucide-react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { SignedIn, SignedOut } from '@clerk/nextjs';
import CreatePostModal from './CreatePostModal';

function LeftSidebar() {
  const [username, setUsername] = useState("Anonymous");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
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
      }
    };

    fetchUser();
  }, []);

  return (
    <div className="w-64 fixed inset-y-0 left-40 p-4 text-white flex flex-col">

      {/* Navigation Links */}
      <nav className="flex flex-col space-y-1 mt-12">
        <div onClick={() => {
          router.push('/posts');
        }}>
          <NavItem icon={<Home size={26} />} label="Home" />
        </div>
        <NavItem icon={<Bell size={26} />} label="Notifications" />
        <div onClick={() => {
          router.push('/profile')
        }}>
          <NavItem icon={<User size={26} />} label="Profile" />
        </div>
        <NavItem icon={<Info size={26} />} label="About Us" />
      </nav>

      <div className="border rounded-4xl cursor-pointer mt-4 flex items-center py-2 justify-center relative w-full hover:bg-[#374151] hover:text-white group" style={{ border: "1px solid #374151" }} onClick={() => {
        setIsModalOpen(true)
      }}>
        <PenSquare size={24} className="ml-2 absolute left-2 text-[#374151] group-hover:text-white" />
        <span className="flex-grow text-center text-lg font-semibold text-[#374151] group-hover:text-white group-hover:font-semibold" style={{ fontFamily: '"BR Firma", sans-serif', fontSize: "18px" }}>
          Create Post
        </span>
      </div>

      <CreatePostModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)}  
      />

      {/* Some space before profile section */}
      <div className="flex-grow" />

      {/* User Profile Section */}
      <div className="mt-4 px-2 py-2 w-full rounded-full hover:bg-neutral-900 cursor-pointer transition-colors">
        <div className="flex items-center gap-2">
          {/* Perfect circular icon */}
          <div className="flex-none w-9 h-9 bg-neutral-800 rounded-full flex items-center justify-center">
            <SignedIn>
              <div className='font-semibold' style={{ fontFamily: '"BR Firma", sans-serif', fontSize: "20px" }}>
                {username[0]?.toUpperCase()}
              </div>
            </SignedIn>
            <SignedOut>
              <User size={18} className="text-white" />
            </SignedOut>
          </div>

          {/* Username */}
          <p
            className="text-white leading-none"
            onClick={() => router.push(`/profile`)}
            style={{ fontFamily: '"BR Firma", sans-serif', fontSize: "15px" }}
          >
            {username}
          </p>
        </div>
      </div>
    </div>
  );
}

// Helper component for navigation items
function NavItem({ icon, label }: any) {
  return (
    <button className="flex items-center p-3 w-fit rounded-full hover:bg-neutral-900 transition-colors cursor-pointer focus:bg-neutral-900">
      <span className="mr-5">{icon}</span>
      <span style={{ fontFamily: '"BR Firma", sans-serif', fontSize: '20px' }}>{label}</span>
    </button>
  );
}

export default LeftSidebar;