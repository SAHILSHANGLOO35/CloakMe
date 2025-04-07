"use client"
import React from 'react';
import { Home, User, PenSquare, Info, Bell } from 'lucide-react';

function LeftSidebar() {
  return (
    <div className="w-64 fixed inset-y-0 left-40 p-4 text-white flex flex-col">

      {/* Navigation Links */}
      <nav className="flex flex-col space-y-1 mt-12">
        <NavItem icon={<Home size={26} />} label="Home" />
        <NavItem icon={<Bell size={26} />} label="Notifications" />
        <NavItem icon={<User size={26} />} label="Profile" />
        <NavItem icon={<Info size={26} />} label="About Us" />
      </nav>

      <div className="border rounded-4xl cursor-pointer mt-4 flex items-center py-2 justify-center relative w-full hover:bg-[#374151] hover:text-white group" style={{ border: "1px solid #374151" }}>
        <PenSquare size={24} className="ml-2 absolute left-2 text-[#374151] group-hover:text-white" />
        <span className="flex-grow text-center text-lg font-semibold text-[#374151] group-hover:text-white group-hover:font-semibold" style={{ fontFamily: '"BR Firma", sans-serif', fontSize: "18px" }}>
          Create Post
        </span>
      </div>



      {/* Some space before profile section */}
      <div className="flex-grow" />

      {/* User Profile Section */}
      <div className="mt-4 p-4 rounded-full hover:bg-neutral-900 cursor-pointer">
        <div className="flex items-center">
          <div className="w-10 h-10 bg-neutral-800 rounded-full flex items-center justify-center">
            <User size={20} />
          </div>
          <div className="ml-3">
            <p className="" style={{ fontFamily: '"BR Firma", sans-serif', fontSize: "18px" }}>Anonymous</p>
            <p className="text-gray-400 text-sm" style={{ fontFamily: '"BR Firma", sans-serif', fontSize: "14px" }}>@hidden_user</p>
          </div>
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