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
  
  // Create a 3D pop-out effect towards the user
  
  // Scale effect - image gets larger as if coming towards viewer
  // Slowed down growth rate by reducing coefficient
  const scale = 1 + (scrollY * 0.0012);
  
  // Z-translation effect (coming toward viewer)
  // Slowed down by reducing coefficient
  const translateZ = Math.min(scrollY * 0.8, 250);
  
  // Subtle X and Y positioning for dynamic movement
  // Reduced movement for more subtle effect
  const translateX = Math.sin(scrollY * 0.01) * 10;
  const translateY = Math.min(scrollY * 0.05, 20);
  
  // Very slight tilt/rotation for more natural feel
  // Reduced rotation angles
  const rotateX = Math.sin(scrollY * 0.005) * 2;
  const rotateY = Math.sin(scrollY * 0.01) * 3;
  
  // Shadow effect intensifies with scroll to enhance 3D effect
  // Reduced shadow intensity
  const shadowBlur = Math.min(5 + scrollY * 0.05, 25);
  const shadowOpacity = Math.min(0.15 + scrollY * 0.001, 0.6);
  
  return (
    <div 
      className="relative w-[400px] h-[400px] md:w-[600px] md:h-[600px] overflow-visible"
      style={{
        perspective: '1000px',
        perspectiveOrigin: 'center',
      }}
    >
      {harrypotter && (
        <div className="relative w-full h-full"
          style={{
            transform: isVisible ? 
              `translateZ(${translateZ}px) translateX(${translateX}px) translateY(${translateY}px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(${scale})` : 
              'translateZ(0) scale(0.8)',
            transition: "transform 0.1s ease-out",
            transformOrigin: 'center center',
            opacity: isVisible ? Math.max(1 - scrollY * 0.003, 0) : 0,
            filter: `drop-shadow(0 0 ${shadowBlur}px rgba(128,0,128,${shadowOpacity}))`,
          }}
        >
          <Image
            src={harrypotter}
            alt="Harry Potter"
            fill
            className="object-contain"
            style={{
              transformStyle: 'preserve-3d',
            }}
          />
          
          {/* Very subtle glow effect - significantly reduced */}
          <div 
            className="absolute inset-0 bg-transparent"
            style={{
              boxShadow: `0 0 ${Math.min(scrollY * 0.1, 15)}px ${Math.min(scrollY * 0.05, 7)}px rgba(255,255,255,${Math.min(scrollY * 0.001, 0.3)})`,
              opacity: Math.min(scrollY * 0.003, 0.4),
            }}
          />
          
          {/* Even more subtle motion blur */}
          <div 
            className="absolute inset-0 bg-gradient-radial from-transparent to-purple-500/5"
            style={{
              opacity: Math.min(scrollY * 0.002, 0.2),
              filter: `blur(${Math.min(scrollY * 0.02, 5)}px)`,
              transform: `scale(${Math.min(scrollY * 0.0005 + 1, 1.1)})`,
            }}
          />
        </div>
      )}
    </div>
  );
};

export default HarryPotterImage;