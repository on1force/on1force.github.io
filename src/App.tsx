import React, { useState } from "react";
import { AbstractCanvas } from "./components/AbstractCanvas";
import { CustomCursor } from "./components/CustomCursor";
import { Navigation } from "./components/Navigation";
import { Hero } from "./components/Hero";
import { Showcase } from "./components/Showcase";
import { SynesthesiaLab } from "./components/SynesthesiaLab";
import { MarqueeManifesto } from "./components/MarqueeManifesto";
import { Footer } from "./components/Footer";
import { SmoothScroll } from "./components/SmoothScroll";
import { motion, AnimatePresence } from "motion/react";
import { ExternalLink, Sparkles } from "lucide-react";

// Project interface for global modal
interface Project {
  id: string;
  number: string;
  title: string;
  type: string;
  description: string;
  tags: string[];
  color: string;
}

export const App: React.FC = () => {
  const [cursorState, setCursorState] = useState<
    "default" | "hover" | "drag" | "view"
  >("default");

  const [activeProject, setActiveProject] = useState<Project | null>(null);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const top = element.getBoundingClientRect().top + window.scrollY;
      window.scrollTo({
        top,
        behavior: "smooth",
      });
    }
  };

  const handleExplore = () => {
    scrollToSection("experiments");
  };

  return (
    <div className="relative bg-bg-primary text-text-primary min-h-screen selection:bg-accent selection:text-white">
      {/* Dynamic Noise Grain Texture */}
      <div className="noise-bg" />

      {/* Organic WebGL-like Canvas Interaction */}
      <AbstractCanvas />

      {/* UI Elements outside of scroll container to remain fixed */}
      <Navigation
        setCursorState={setCursorState}
        scrollToSection={scrollToSection}
      />

      {/* Global Project Detail Overlay */}
      <AnimatePresence>
        {activeProject && (
          <div className="fixed inset-0 z-[300] flex items-center justify-center p-6 bg-black/80 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="w-full max-w-2xl bg-bg-tertiary border border-white/20 rounded-3xl p-10 relative overflow-hidden"
            >
              {/* Background Glow */}
              <div
                className="absolute -top-40 -left-40 w-80 h-80 blur-[100px] rounded-full pointer-events-none"
                style={{ background: activeProject.color, opacity: 0.3 }}
              />

              <button
                onClick={() => setActiveProject(null)}
                className="absolute top-6 right-6 text-white/60 hover:text-white font-grotesk text-xs tracking-widest uppercase underline z-20"
              >
                Close Overlay
              </button>

              <span className="font-serif italic text-8xl text-white/10 block mb-6">
                {activeProject.number}
              </span>

              <h3 className="font-syne text-4xl font-extrabold uppercase tracking-tight mb-2 relative z-10">
                {activeProject.title}
              </h3>
              <span className="font-grotesk text-xs tracking-[0.2em] text-accent uppercase block mb-8 relative z-10">
                {activeProject.type}
              </span>

              <p className="font-grotesk text-base leading-relaxed text-white/80 mb-10 max-w-lg relative z-10">
                {activeProject.description}
              </p>

              <div className="flex items-center gap-4 relative z-10">
                <a
                  href="#"
                  onClick={(e) => e.preventDefault()}
                  className="flex items-center gap-3 bg-accent text-white hover:text-black font-grotesk text-xs uppercase tracking-widest font-extrabold px-6 py-4 rounded-full transition-colors"
                >
                  <span>Launch Experience</span>
                  <ExternalLink className="w-4 h-4" />
                </a>

                <div className="flex items-center gap-2 text-white/40 font-grotesk text-xs">
                  <Sparkles className="w-4 h-4" />
                  <span>Requires WebGL / WebGPU</span>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Smooth Inertial Scroll Wrapper */}
      <SmoothScroll>
        <main>
          <div id="manifesto">
            <Hero setCursorState={setCursorState} onExplore={handleExplore} />
          </div>

          <div id="experiments">
            <Showcase
              setCursorState={setCursorState}
              onProjectClick={setActiveProject}
            />
          </div>

          <div id="audio-synesthesia">
            <SynesthesiaLab setCursorState={setCursorState} />
          </div>

          <MarqueeManifesto />

          <div id="contact">
            <Footer setCursorState={setCursorState} />
          </div>
        </main>
      </SmoothScroll>

      {/* Premium Magnetic Cursor Interaction */}
      <CustomCursor cursorState={cursorState} />
    </div>
  );
};

export default App;
