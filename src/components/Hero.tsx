import React from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { ArrowDownRight, Sparkles, Eye } from "lucide-react";

interface HeroProps {
  setCursorState: (s: "default" | "hover" | "drag" | "view") => void;
  onExplore: () => void;
}

export const Hero: React.FC<HeroProps> = ({ setCursorState, onExplore }) => {
  const { scrollY } = useScroll();

  // Parallax offsets for each line to create spatial depth
  const y1 = useTransform(scrollY, [0, 1000], [0, 200]); // Moves slower
  const y2 = useTransform(scrollY, [0, 1000], [0, -150]); // Moves in opposite direction
  const y3 = useTransform(scrollY, [0, 1000], [0, 350]); // Moves much faster
  const opacity = useTransform(scrollY, [0, 600], [1, 0]); // Fades out as we scroll deep

  return (
    <section className="relative min-h-screen flex flex-col justify-between px-6 md:px-16 pt-32 pb-16 z-10 selection:bg-accent">
      {/* Top Header/Status bar */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 border-b border-white/10 pb-8">
        <div className="flex items-center gap-3">
          <span className="w-2.5 h-2.5 rounded-full bg-accent animate-pulse" />
          <span className="font-grotesk text-xs tracking-[0.2em] uppercase text-white/50">
            Current Status: Redefining Digital Experience
          </span>
        </div>

        <div className="flex gap-12 font-grotesk text-xs tracking-widest text-white/40">
          <div className="flex flex-col gap-1">
            <span className="text-white">LOCATION</span>
            <span>INDONESIA // EAST BORNEO</span>
          </div>
          <div className="flex flex-col gap-1">
            <span className="text-white">COORDINATES</span>
            <span>1°14'11.6"S 116°51'04.2"E</span>
          </div>
          <div className="flex flex-col gap-1">
            <span className="text-white">SONG</span>
            <span>Tamlin - Alive [NCS RELEASE]</span>
          </div>
        </div>
      </div>

      {/* Main Kinetic Title / Avant-Garde Grid */}
      <div className="flex-1 flex flex-col justify-center my-16 md:my-0">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
          {/* Left Title Column */}
          <div className="md:col-span-8 flex flex-col items-start">
            <div className="py-2">
              <motion.h1
                style={{ y: y1, opacity }}
                initial={{ y: 100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 2.2, ease: [0.16, 1, 0.3, 1] }}
                className="font-syne text-[clamp(4rem,10vw,11rem)] leading-[1.1] font-extrabold tracking-tight uppercase block break-all md:break-normal"
              >
                ON1FORCE
              </motion.h1>
            </div>

            <div className="flex flex-wrap items-center gap-4 md:gap-8 mt-1">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{
                  duration: 1.2,
                  delay: 0.4,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="flex items-center justify-center w-16 h-16 md:w-24 md:h-24 rounded-full border border-white/20 backdrop-blur-md shrink-0"
              >
                <Sparkles className="w-6 h-6 md:w-10 md:h-10 text-accent animate-spin-slow" />
              </motion.div>

              <div className="py-2">
                <motion.h1
                  style={{ y: y2, opacity }}
                  initial={{ y: 100, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{
                    duration: 2.2,
                    delay: 0.2,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  className="font-serif text-[clamp(4rem,10vw,11rem)] leading-[1.1] italic font-light tracking-wide text-white/90 glow-text block"
                >
                  Ethereal
                </motion.h1>
              </div>
            </div>

            <div className="py-2">
              <motion.h1
                style={{ y: y3, opacity }}
                initial={{ y: 100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{
                  duration: 2.2,
                  delay: 0.4,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="font-syne text-[clamp(3.5rem,8vw,9rem)] leading-[1.1] font-extrabold tracking-tight uppercase text-accent block"
              >
                Space //|
              </motion.h1>
            </div>
          </div>

          {/* Right Abstract Box / Statement */}
          <div className="md:col-span-4 flex flex-col justify-end gap-8 pt-8 md:pt-0">
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{
                duration: 1.8,
                delay: 0.8,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="border border-white/10 p-6 md:p-8 backdrop-blur-md bg-white/[0.02] rounded-2xl relative overflow-hidden group hover:border-accent/40 transition-colors duration-500"
              onMouseEnter={() => setCursorState("hover")}
              onMouseLeave={() => setCursorState("default")}
            >
              <div className="absolute top-0 right-0 w-24 h-24 bg-accent/20 blur-3xl rounded-full" />

              <p className="font-grotesk text-sm md:text-base leading-relaxed text-white/70 relative z-10">
                A digital design atelier merging extreme typography, physical
                motion logic, and interactive spatial sound environments.
              </p>

              <button
                onClick={onExplore}
                className="mt-8 flex items-center gap-3 font-grotesk text-xs uppercase tracking-[0.2em] text-accent font-bold group/btn"
              >
                <span>Discover Me</span>
                <ArrowDownRight className="w-4 h-4 transform group-hover/btn:translate-x-1 group-hover/btn:translate-y-1 transition-transform" />
              </button>
            </motion.div>

            {/* Micro Interaction Element */}
            <div className="flex items-center gap-4 text-white/30 font-grotesk text-xs tracking-widest">
              <div className="w-12 h-[1px] bg-white/20" />
              <span>SCROLL TO DIVE IN</span>
            </div>
          </div>
        </div>
      </div>

      {/* Footer bar / stats */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 font-grotesk text-xs tracking-widest uppercase border-t border-white/10 pt-6">
        <div className="flex items-center gap-8">
          <div>
            <span className="text-white/40 block mb-1">Total Projects</span>
            <span className="text-white font-bold">1 Recent | 1 All Time</span>
          </div>
          <div>
            <span className="text-white/40 block mb-1">Toolkits</span>
            <span className="text-white font-bold">
              2 Code Lang | 3 Database | 3 Design Tools
            </span>
          </div>
        </div>

        <div className="flex items-center gap-4 text-white/50">
          <Eye className="w-4 h-4" />
          <span>Experience: 3+ Years</span>
        </div>
      </div>
    </section>
  );
};
