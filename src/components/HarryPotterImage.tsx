'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';

const HarryPotterImage = ({ harrypotter }: any) => {
  const [scrollY, setScrollY] = useState(0);
  const [isVisible, setIsVisible] = useState(true);
  
  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
      
      // Set visibility based on scroll threshold
      if (window.scrollY > 300) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  
  // Create exponential animation effect as user scrolls
  const translateY = Math.pow(scrollY, 1.5) * -0.05;
  const translateX = Math.pow(scrollY, 1.3) * 0.1; 
  const rotate = scrollY * 0.2;
  const scale = Math.max(1 - scrollY * 0.002, 0.1);
  
  return (
    <div 
      className="relative w-[300px] h-[300px] md:w-[600px] md:h-[600px] overflow-visible"
      style={{
        transform: `translateY(${translateY}px) translateX(${translateX}px) rotate(${rotate}deg) scale(${scale})`,
        transition: "transform 0.1s ease-out",
        opacity: isVisible ? Math.max(1 - scrollY * 0.003, 0) : 0,
        pointerEvents: isVisible ? 'auto' : 'none'
      }}
    >
      {harrypotter && (
        <div className="relative w-full h-full">
          <Image
            src={harrypotter}
            alt="Harry Potter"
            fill
            className="object-contain drop-shadow-[0_0_25px_rgba(128,0,128,0.4)]"
          />
          {/* Optional: add a motion blur effect when scrolling */}
          <div 
            className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-blue-500/20"
            style={{
              opacity: Math.min(scrollY * 0.01, 0.7),
              filter: `blur(${Math.min(scrollY * 0.1, 10)}px)`
            }}
          />
        </div>
      )}
    </div>
  );
};

export default HarryPotterImage;