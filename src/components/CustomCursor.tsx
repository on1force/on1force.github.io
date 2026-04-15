import React, { useEffect, useState } from "react";
import { motion } from "motion/react";

export const CustomCursor: React.FC<{
  cursorState: "default" | "hover" | "drag" | "view";
}> = ({ cursorState }) => {
  const [mousePos, setMousePos] = useState({ x: -100, y: -100 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  // Set the text and size of the cursor depending on the state
  const isHover = cursorState !== "default";

  return (
    <>
      {/* Small precision dot */}
      <motion.div
        className="fixed top-0 left-0 w-2 h-2 bg-accent rounded-full pointer-events-none z-[9999]"
        animate={{
          x: mousePos.x - 4,
          y: mousePos.y - 4,
          scale: isHover ? 0 : 1,
        }}
        transition={{ type: "spring", stiffness: 500, damping: 28 }}
      />

      {/* Outer ring / label container */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9998] flex items-center justify-center font-grotesk text-[10px] tracking-[0.2em] font-bold overflow-hidden"
        animate={{
          x: mousePos.x - (isHover ? 36 : 16),
          y: mousePos.y - (isHover ? 36 : 16),
          width: isHover ? 72 : 32,
          height: isHover ? 72 : 32,
          backgroundColor: isHover ? "var(--color-accent)" : "transparent",
          color: isHover ? "#000000" : "transparent",
          border: isHover ? "none" : "1px solid rgba(255, 77, 0, 0.4)",
          borderRadius: "50%",
        }}
        transition={{ type: "spring", stiffness: 350, damping: 25 }}
      >
        {cursorState === "hover" && "VIEW"}
        {cursorState === "drag" && "DRAG"}
        {cursorState === "view" && "OPEN"}
      </motion.div>
    </>
  );
};
