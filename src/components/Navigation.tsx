import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Menu, X } from "lucide-react";

export const Navigation: React.FC<{
  setCursorState: (s: "default" | "hover" | "drag" | "view") => void;
  scrollToSection: (id: string) => void;
}> = ({ setCursorState, scrollToSection }) => {
  const [isOpen, setIsOpen] = useState(false);

  const links = [
    { name: "Manifesto", id: "manifesto" },
    { name: "Experiments", id: "experiments" },
    { name: "Audio Synesthesia", id: "audio-synesthesia" },
    { name: "Contact", id: "contact" },
  ];

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-[200] px-6 md:px-16 py-8 flex justify-between items-center mix-blend-difference">
        {/* Logo */}
        <a
          href="/"
          className="font-syne text-2xl font-extrabold uppercase tracking-tight text-white select-none"
          onMouseEnter={() => setCursorState("hover")}
          onMouseLeave={() => setCursorState("default")}
        >
          ON1FORCE //
        </a>

        {/* Menu toggle */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          onMouseEnter={() => setCursorState("hover")}
          onMouseLeave={() => setCursorState("default")}
          className="flex items-center gap-3 text-white font-grotesk text-xs tracking-widest uppercase font-bold select-none cursor-pointer"
        >
          <span>{isOpen ? "Close" : "Menu"}</span>
          <div className="w-8 h-8 rounded-full border border-white/20 flex items-center justify-center">
            {isOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </div>
        </button>
      </header>

      {/* Full Screen Interactive Navigation Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, clipPath: "circle(0% at 95% 5%)" }}
            animate={{ opacity: 1, clipPath: "circle(150% at 95% 5%)" }}
            exit={{ opacity: 0, clipPath: "circle(0% at 95% 5%)" }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 bg-bg-secondary z-[150] flex flex-col justify-center px-6 md:px-16"
          >
            {/* Background elements */}
            <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-accent/5 blur-[150px] rounded-full pointer-events-none" />

            {/* Menu Items */}
            <div className="flex flex-col gap-6">
              <span className="font-grotesk text-xs tracking-widest uppercase text-white/40 block mb-4">
                Navigate Experiences
              </span>

              {links.map((link, idx) => (
                <div key={link.id} className="overflow-hidden">
                  <motion.div
                    initial={{ y: 100 }}
                    animate={{ y: 0 }}
                    transition={{
                      delay: 0.1 + idx * 0.1,
                      duration: 0.8,
                      ease: [0.16, 1, 0.3, 1],
                    }}
                  >
                    <button
                      onClick={() => {
                        setIsOpen(false);
                        scrollToSection(link.id);
                      }}
                      onMouseEnter={() => setCursorState("hover")}
                      onMouseLeave={() => setCursorState("default")}
                      className="font-syne text-[clamp(2.5rem,6vw,6rem)] font-extrabold uppercase leading-none hover:text-accent transition-colors duration-500 block text-left"
                    >
                      {link.name}
                    </button>
                  </motion.div>
                </div>
              ))}
            </div>

            {/* Footer / Status under menu */}
            <div className="absolute bottom-12 left-6 md:left-16 right-6 md:right-16 flex flex-col md:flex-row justify-between items-start md:items-center gap-6 font-grotesk text-xs tracking-widest text-white/50 border-t border-white/10 pt-6">
              <span>DESIGNED AND CODED WITH PASSION</span>
              <span>EXPERIMENTAL WEB // SOTD STANDARDS</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
