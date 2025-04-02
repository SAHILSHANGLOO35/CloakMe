"use client";

import * as React from "react";
import { Heart } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
 
const animations = {
  count: {
    initial: { y: -20, opacity: 0 },
    animate: { y: 0, opacity: 1 },
    exit: { y: 20, opacity: 0 },
  },
  heart: {
    initial: { scale: 1 },
    tapActive: { scale: 0.8 },
    tapCompleted: { scale: 1 },
  },
  particle: (index: number) => ({
    initial: { x: "50%", y: "50%", scale: 0, opacity: 0 },
    animate: {
      x: `calc(50% + ${Math.cos((index * Math.PI) / 3) * 30}px)`,
      y: `calc(50% + ${Math.sin((index * Math.PI) / 3) * 30}px)`,
      scale: [0, 1, 0],
      opacity: [0, 1, 0],
    },
    transition: { duration: 0.8, delay: index * 0.05, ease: "easeOut" },
  }),
  glow: {
    initial: { scale: 1, opacity: 0 },
    animate: { scale: [1, 1.5], opacity: [0.8, 0] },
    transition: { duration: 0.8, ease: "easeOut" },
  },
  pulse: {
    initial: { scale: 1.2, opacity: 0 },
    animate: { scale: [1.2, 1.8, 1.2], opacity: [0, 0.3, 0] },
    transition: { duration: 1.2, ease: "easeInOut" },
  },
};
 
export function HeartButton() {
  const [clickCount, setClickCount] = React.useState(0);
  const [count, setCount] = React.useState(16);
 
  const maxClicks = 5;
  const isCompleted = clickCount >= maxClicks;
 
  const fillPercentage = Math.min(100, (clickCount / maxClicks) * 100);
  const isActive = clickCount > 0;
  const sizeMultiplier = 1 + clickCount * 0.04;
 
  const handleClick = () => {
    if (clickCount < maxClicks) {
      setClickCount((prev) => prev + 1);
      setCount((prev) => prev + 1);
    }
  };
 
  return (
    <div className="relative">
      <Button
        className="py-0 pe-0 overflow-visible"
        variant="outline"
        onClick={handleClick}
        aria-pressed={isActive}
      >
        <motion.div
          initial={{ scale: 1 }}
          animate={{ scale: isActive ? sizeMultiplier : 1 }}
          whileTap={
            isCompleted
              ? animations.heart.tapCompleted
              : animations.heart.tapActive
          }
          transition={{ type: "spring", stiffness: 300, damping: 15 }}
          className="relative"
        >
          <Heart className="opacity-60" size={16} aria-hidden="true" />
 
          <Heart
            className="absolute inset-0 text-red-500 fill-red-500 transition-all duration-300"
            size={16}
            aria-hidden="true"
            style={{ clipPath: `inset(${100 - fillPercentage}% 0 0 0)` }}
          />
 
          <AnimatePresence>
            {isCompleted && (
              <>
                <motion.div
                  className="absolute inset-0 rounded-full"
                  style={{
                    background:
                      "radial-gradient(circle, rgba(239,68,68,0.4) 0%, rgba(239,68,68,0) 70%)",
                  }}
                  {...animations.pulse}
                />
                <motion.div
                  className="absolute inset-0 rounded-full"
                  style={{ boxShadow: "0 0 10px 2px rgba(239,68,68,0.6)" }}
                  {...animations.glow}
                />
              </>
            )}
          </AnimatePresence>
        </motion.div>
 
        <span className="mx-1.5">Like</span>
 
        <span className="relative inline-flex items-center justify-center h-full px-3 text-xs font-medium rounded-full text-muted-foreground before:absolute before:inset-0 before:w-px before:bg-border ms-1">
          <AnimatePresence mode="wait">
            <motion.span
              key={count}
              variants={animations.count}
              initial="initial"
              animate="animate"
              exit="exit"
              transition={{ duration: 0.2 }}
            >
              {count}
            </motion.span>
          </AnimatePresence>
        </span>
      </Button>
 
      <AnimatePresence>
        {isCompleted && (
          <motion.div className="absolute inset-0 pointer-events-none">
            {[...Array(6)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-1 h-1 rounded-full bg-red-500"
                initial={animations.particle(i).initial}
                animate={animations.particle(i).animate}
                transition={animations.particle(i).transition}
              />
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}