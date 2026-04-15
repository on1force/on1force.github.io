import React, { useEffect, useRef, useState, useCallback } from "react";
import { useScroll, useSpring, useTransform, motion, useVelocity } from "motion/react";

export const SmoothScroll: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const contentRef = useRef<HTMLDivElement>(null);
  const [contentHeight, setContentHeight] = useState(0);

  // Measure the content height to set the body height
  const handleResize = useCallback(() => {
    if (contentRef.current) {
      setContentHeight(contentRef.current.scrollHeight);
    }
  }, []);

  useEffect(() => {
    handleResize();
    window.addEventListener("resize", handleResize);
    
    // Check height again after fonts/images might have loaded
    const timer = setTimeout(handleResize, 1000);
    
    return () => {
      window.removeEventListener("resize", handleResize);
      clearTimeout(timer);
    };
  }, [handleResize, children]);

  const { scrollY } = useScroll();
  
  // Track scroll velocity for effects
  const scrollVelocity = useVelocity(scrollY);
  
  // Map velocity to a subtle blur effect (0px to 10px)
  const blurValue = useTransform(scrollVelocity, [-2000, 0, 2000], [8, 0, 8]);
  const smoothBlur = useSpring(blurValue, { damping: 30, stiffness: 200 });
  const filter = useTransform(smoothBlur, (v) => `blur(${v}px)`);

  // Create a spring-smoothed version of the scroll position
  const smoothScrollY = useSpring(scrollY, {
    damping: 20,
    stiffness: 100,
    mass: 0.5,
    restDelta: 0.001
  });

  // Transform the smoothed scroll value into a negative Y translation
  const y = useTransform(smoothScrollY, (value) => -value);

  return (
    <>
      {/* Fixed container that holds the translated content */}
      <div className="fixed top-0 left-0 w-full h-screen overflow-hidden">
        <motion.div
          ref={contentRef}
          style={{ y, filter }}
          className="w-full will-change-transform"
        >
          {children}
        </motion.div>
      </div>
      
      {/* Invisible spacer to enable native scrollbar and height */}
      <div style={{ height: contentHeight }} className="pointer-events-none" />
    </>
  );
};
