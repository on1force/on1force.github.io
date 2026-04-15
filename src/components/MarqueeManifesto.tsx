import React from "react";
import { motion } from "motion/react";

export const MarqueeManifesto: React.FC = () => {
  const techStack =
    "Node.js / Typescript / Golang / Postgresql / Redis / Mysql / Sqlite / ";

  return (
    <section className="relative py-24 bg-transparent text-white overflow-hidden z-10 flex flex-col gap-12 border-y border-white/10">
      {/* Moving Marquee Text - Optimized with will-change-transform and seamless duplication */}
      <div className="flex whitespace-nowrap overflow-hidden">
        <motion.div
          animate={{ x: ["0%", "-50%"] }}
          transition={{
            duration: 30,
            repeat: Infinity,
            ease: "linear",
          }}
          className="flex whitespace-nowrap font-syne text-[clamp(4rem,10vw,8rem)] font-extrabold tracking-tight uppercase leading-none select-none text-white will-change-transform shrink-0"
        >
          {/* Render the text twice for a seamless loop */}
          <span className="pr-16">{techStack}</span>
          <span className="pr-16">{techStack}</span>
        </motion.div>
      </div>

      {/* Grid statement & badge */}
      <div className="px-6 md:px-16 grid grid-cols-1 md:grid-cols-2 gap-12 items-end">
        <div>
          <span className="font-grotesk text-xs tracking-[0.2em] uppercase font-bold block mb-4">
            My Digital Manifesto
          </span>
          <p className="font-serif italic text-3xl md:text-5xl font-light leading-[1.1] max-w-2xl">
            "Modern and elegance should be the default, not the exception."
          </p>
        </div>

        {/* Circular Stamp / Badge */}
        <div className="flex justify-start md:justify-end">
          <div className="relative flex items-center justify-center w-36 h-36 rounded-full border border-white/20">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 20, ease: "linear" }}
              className="absolute inset-0 flex items-center justify-center font-grotesk text-[10px] tracking-widest uppercase font-bold text-white/70 will-change-transform"
            >
              <svg
                viewBox="0 0 100 100"
                className="w-full h-full p-2 origin-center"
              >
                <path
                  id="circlePath"
                  d="M 50, 50 m -35, 0 a 35,35 0 1,1 70,0 a 35,35 0 1,1 -70,0"
                  fill="none"
                />
                <text className="fill-white/70">
                  <textPath href="#circlePath">
                    • Always experimental • Boundless potential • Always
                    experimental • Boundless potential
                  </textPath>
                </text>
              </svg>
            </motion.div>
            <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-black font-syne font-bold text-xs relative z-10">
              ON1
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
