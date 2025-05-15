"use client"

import React, { useState } from 'react';
import { Home, User, PenSquare, Info, Loader2, Menu, X, Search } from 'lucide-react';
import { usePathname, useRouter } from 'next/navigation';
import { SignedIn, SignedOut, useSession } from '@clerk/nextjs';
import { useUser } from '@/context/UserContext';
import { CreatePostModal } from '@/components/CreatePostModal';

function LeftSidebar() {
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const pathname = usePathname();
  const { session, isLoaded } = useSession();
  const { user, loading: usernameLoading } = useUser();

  const handleClick = () => {
    if (!isLoaded) return;

    if (session?.user) {
      setIsModalOpen(true);
    } else {
      router.push('/sign-in');
    }
  };

  const handlePostCreated = () => {
    const event = new CustomEvent('postCreated');
    window.dispatchEvent(event);
    
    if (pathname === '/posts') {
      router.refresh();
    }
  };

  // Mobile navigation items - now at bottom with only Home, Profile and About
  const mobileNav = (
    <div className="fixed bottom-0 left-0 right-0 bg-neutral-950 border-t border-neutral-800 flex justify-around items-center h-16 px-4 z-50">
      <NavItem icon={<Home size={24} />} label="Home" href='/posts' pathname={pathname} onClick={() => router.push('/posts')} isMobile />
      <NavItem icon={<User size={24} />} label="Profile" href='/profile' pathname={pathname} onClick={() => router.push('/profile')} isMobile />
      <NavItem icon={<Info size={24} />} label="About" href='/about-us' pathname={pathname} onClick={() => router.push('/about-us')} isMobile />
    </div>
  );

  // Desktop navigation
  const desktopNav = (
    <div className="hidden md:flex md:flex-col h-screen w-44 lg:w-64 sticky inset-y-0 left-0 lg:left-40 px-2 lg:px-4 ml-4 sm:ml-8 text-white">
      <div className="flex flex-col mt-12">
        <nav className="flex flex-col space-y-1">
          <NavItem icon={<Home size={22} />} label="Home" href='/posts' pathname={pathname} onClick={() => router.push('/posts')} />
          <NavItem icon={<User size={22} />} label="Profile" href='/profile' pathname={pathname} onClick={() => router.push('/profile')} />
          <NavItem icon={<Search size={22} />} label="Search" pathname={pathname} onClick={() => {
            const el = document.getElementById('search-input');
            if (el) {
              el.scrollIntoView({ behavior: 'smooth' });
              el.focus();
              el.classList.add('ring-2', 'ring-neutral-100', 'bg-neutral-800');
              setTimeout(() => {
                el.classList.remove('ring-2', 'ring-neutral-100', 'bg-neutral-800');
              }, 1500);
            }
          }} />
          <NavItem icon={<Info size={22} />} label="About Us" href='/about-us' pathname={pathname} onClick={() => router.push('/about-us')} />
        </nav>

        <div 
          className="border rounded-lg cursor-pointer mt-4 flex items-center py-2 justify-center relative w-full hover:bg-[#374151] hover:text-white group transition-colors" 
          style={{ border: "1px solid #374151" }} 
          onClick={handleClick}
        >
          <PenSquare size={20} className="ml-2 absolute left-2 text-[#374151] group-hover:text-white" />
          <span className="flex-grow text-center text-base lg:text-lg font-semibold text-[#374151] group-hover:text-white group-hover:font-semibold" style={{ fontFamily: '"BR Firma", sans-serif' }}>
            Create Post
          </span>
        </div>
      </div>

      <div className="flex-grow"></div>

      <div className="mb-8 px-2 py-2 w-full rounded-full hover:bg-neutral-900 cursor-pointer transition-colors">
        <div className="flex items-center gap-2">
          {!usernameLoading && (
            <div className="flex-none w-8 h-8 bg-neutral-800 rounded-full flex items-center justify-center">
              <SignedIn>
                <div className='font-semibold text-white' style={{ fontFamily: '"BR Firma", sans-serif', fontSize: "18px" }}>
                  {user?.username?.[0]?.toUpperCase() || ''}
                </div>
              </SignedIn>
              <SignedOut>
                <User size={16} className="text-white" />
              </SignedOut>
            </div>
          )}

          {usernameLoading ? (
            <div className="flex items-center py-2 text-xs text-gray-400">
              <Loader2 className="h-3 w-3 mr-1 animate-spin text-primary" />
              <span>Fetching User...</span>
            </div>
          ) : (
            <p className="text-white leading-none text-sm" style={{ fontFamily: '"BR Firma", sans-serif' }}>
              {user?.username || ''}
            </p>
          )}
        </div>
      </div>
    </div>
  );

  // Floating create post button for mobile
  const mobileCreateButton = (
    <div className="md:hidden fixed right-4 bottom-20 z-50">
      <button
        onClick={handleClick}
        className="bg-neutral-900 text-white p-3 rounded-full shadow-lg border border-neutral-700 hover:bg-neutral-800 transition-colors"
      >
        <PenSquare size={24} />
      </button>
    </div>
  );

  return (
    <>
      {/* Render desktop navigation */}
      {desktopNav}
      
      {/* Render mobile navigation at bottom */}
      <div className="md:hidden">
        {mobileNav}
        {mobileCreateButton}
      </div>

      <CreatePostModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        onPostCreated={handlePostCreated}
      />
    </>
  );
}

// Helper component for navigation items
function NavItem({ icon, label, href, pathname, onClick, isMobile = false }: any) {
  const isSelected = pathname === href;

  if (isMobile) {
    return (
      <button
        onClick={onClick}
        className={`flex flex-col items-center justify-center space-y-1 ${
          isSelected ? 'text-white' : 'text-neutral-400 hover:text-white'
        }`}
      >
        {icon}
        <span className="text-xs">{label}</span>
      </button>
    );
  }

  return (
    <button
      onClick={onClick}
      className={`flex items-center p-2 md:p-3 rounded-full transition-colors cursor-pointer ${
        isSelected ? 'bg-neutral-900 text-white' : 'hover:bg-neutral-800 text-neutral-300'
      }`}
    > 
      <span className="mr-3 md:mr-4">{icon}</span>
      <span className="text-base md:text-lg" style={{ fontFamily: '"BR Firma", sans-serif' }}>{label}</span> 
    </button>
  );
}

export default LeftSidebar;