import React from "react";
import { motion } from "motion/react";
import { Move } from "lucide-react";

interface Project {
  id: string;
  number: string;
  title: string;
  type: string;
  description: string;
  tags: string[];
  color: string;
}

const projects: Project[] = [
  {
    id: "01",
    number: "01",
    title: "Portfolio",
    type: "Interactive",
    description: "My very own portfolio website that you're seeing right now.",
    tags: ["WebGL", "Audio API", "GLSL"],
    color: "#ff4d00",
  },
  {
    id: "02",
    number: "02",
    title: "TBA",
    type: "-",
    description: "-",
    tags: ["Under Construction"],
    color: "#3b82f6",
  },
  {
    id: "03",
    number: "03",
    title: "TBA",
    type: "-",
    description: "-",
    tags: ["Under Construction"],
    color: "#10b981",
  },
];

interface ShowcaseProps {
  setCursorState: (s: "default" | "hover" | "drag" | "view") => void;
  onProjectClick: (project: Project) => void;
}

export const Showcase: React.FC<ShowcaseProps> = ({
  setCursorState,
  onProjectClick,
}) => {
  return (
    <section className="relative min-h-screen py-24 px-6 md:px-16 border-t border-white/10 z-10">
      {/* Background Neon Accent Glows */}
      <div className="absolute top-1/3 left-1/4 w-96 h-96 bg-accent/5 blur-[120px] rounded-full pointer-events-none" />

      {/* Header section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-24">
        <div>
          <span className="font-grotesk text-xs uppercase tracking-[0.3em] text-accent font-bold block mb-4">
            Curated Archives
          </span>
          <h2 className="font-syne text-[clamp(2.5rem,5vw,5rem)] font-extrabold uppercase leading-none tracking-tight">
            Selected <br />
            <span className="font-serif italic font-light text-white/80 lowercase">
              Experiments
            </span>
          </h2>
        </div>

        <div className="flex items-center gap-2 text-white/50 font-grotesk text-xs tracking-widest bg-white/5 border border-white/10 px-4 py-2 rounded-full">
          <Move className="w-3 h-3 animate-bounce" />
          <span>DRAG CARDS FOR INTERACTIVE PHYSICS</span>
        </div>
      </div>

      {/* Projects Draggable Grid / Interactive Area */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
        {projects.map((proj) => (
          <motion.div
            key={proj.id}
            drag
            dragConstraints={{ left: -30, right: 30, top: -30, bottom: 30 }}
            whileDrag={{ scale: 1.05, zIndex: 50 }}
            onMouseEnter={() => setCursorState("drag")}
            onMouseLeave={() => setCursorState("default")}
            onClick={() => onProjectClick(proj)}
            className="group relative border border-white/10 bg-bg-secondary/80 backdrop-blur-xl p-8 rounded-3xl h-[450px] flex flex-col justify-between overflow-hidden cursor-grab active:cursor-grabbing hover:border-white/30 transition-colors duration-500"
          >
            {/* Top info */}
            <div className="flex justify-between items-start">
              <span className="font-serif italic text-6xl text-white/20 group-hover:text-accent transition-colors duration-500 select-none">
                {proj.number}
              </span>
              <span className="font-grotesk text-xs uppercase tracking-widest text-white/40">
                {proj.type}
              </span>
            </div>

            {/* Title & Description */}
            <div className="relative z-10">
              <h3 className="font-syne text-3xl font-extrabold uppercase tracking-tight mb-4 group-hover:text-accent transition-colors duration-500">
                {proj.title}
              </h3>
              <p className="font-grotesk text-sm text-white/60 leading-relaxed mb-6">
                {proj.description}
              </p>

              {/* Tags/Chips */}
              <div className="flex flex-wrap gap-2">
                {proj.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-[10px] font-grotesk tracking-widest uppercase px-3 py-1 bg-white/5 border border-white/10 rounded-full text-white/70"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Glowing Accent Ring / Graphic element */}
            <div
              className="absolute -bottom-12 -right-12 w-48 h-48 rounded-full blur-2xl opacity-20 group-hover:opacity-40 transition-opacity duration-500 pointer-events-none"
              style={{ background: proj.color }}
            />
          </motion.div>
        ))}
      </div>
    </section>
  );
};
