import React, { useState, useEffect, useRef } from "react";
import { motion } from "motion/react";
import { Radio, Zap, Volume2, Play, Square, Loader2 } from "lucide-react";
import * as Tone from "tone";

export const SynesthesiaLab: React.FC<{
  setCursorState: (s: "default" | "hover" | "drag" | "view") => void;
}> = ({ setCursorState }) => {
  const [frequency, setFrequency] = useState(45);
  const [amplitude, setAmplitude] = useState(60);
  const [resonance, setResonance] = useState(30);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  // Audio References
  const playerRef = useRef<Tone.Player | null>(null);
  const filterRef = useRef<Tone.Filter | null>(null);
  const distortionRef = useRef<Tone.Distortion | null>(null);

  useEffect(() => {
    // Initialize Audio Graph
    const reverb = new Tone.Reverb({ decay: 4, wet: 0.3 }).toDestination();
    const delay = new Tone.FeedbackDelay("8n.", 0.2).connect(reverb);
    const filter = new Tone.Filter(2000, "lowpass").connect(delay);
    const distortion = new Tone.Distortion(0).connect(filter);

    // Load local synthwave track from public folder
    const player = new Tone.Player({
      url: "/Tamlin-Alive-[NCS Release].mp3",
      loop: true,
      autostart: false,
      onload: () => setIsLoaded(true),
      fadeIn: 2,
      fadeOut: 2,
    }).connect(distortion);

    playerRef.current = player;
    filterRef.current = filter;
    distortionRef.current = distortion;

    return () => {
      player.dispose();
      distortion.dispose();
      filter.dispose();
      delay.dispose();
      reverb.dispose();
    };
  }, []);

  // Sync state to audio parameters with musical mappings
  useEffect(() => {
    if (filterRef.current && distortionRef.current) {
      // Slider 1 (frequency) -> Filter Cutoff (Brightness)
      const cutoff = 200 + (frequency / 100) * 14000;
      filterRef.current.frequency.rampTo(cutoff, 0.1);

      // Slider 2 (amplitude) -> Distortion (Texture/Grit)
      distortionRef.current.distortion = amplitude / 200;

      // Slider 3 (resonance) -> Filter Q (Resonance Intensity)
      filterRef.current.Q.rampTo(resonance / 8, 0.1);
    }
  }, [frequency, amplitude, resonance]);

  const togglePlayback = async () => {
    if (!isLoaded) return;

    if (Tone.getContext().state !== "running") {
      await Tone.start();
    }

    if (isPlaying) {
      playerRef.current?.stop();
      setIsPlaying(false);
    } else {
      playerRef.current?.start();
      setIsPlaying(true);
    }
  };

  // Autoplay on first interaction
  useEffect(() => {
    const startOnInteraction = async () => {
      if (Tone.getContext().state !== "running" && isLoaded) {
        await Tone.start();
        togglePlayback();
        window.removeEventListener("click", startOnInteraction);
      }
    };
    window.addEventListener("click", startOnInteraction);
    return () => window.removeEventListener("click", startOnInteraction);
  }, [isLoaded]);

  return (
    <section className="relative min-h-screen py-24 px-6 md:px-16 border-t border-white/10 z-10 flex flex-col justify-center">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
        {/* Left Control Panel / Details */}
        <div className="lg:col-span-5 flex flex-col gap-10">
          <div>
            <span className="font-grotesk text-xs uppercase tracking-[0.3em] text-accent font-bold block mb-4 flex items-center gap-2">
              <Zap className="w-4 h-4 text-accent animate-pulse" />
              <span>Feel free to play around!</span>
            </span>
            <h2 className="font-syne text-[clamp(2.5rem,4vw,4.5rem)] font-extrabold uppercase leading-none tracking-tight mb-4 break-all md:break-normal">
              Frequency <br />
              <span className="font-serif italic font-light text-white/80 lowercase">
                Modulation
              </span>
            </h2>
            <p className="font-grotesk text-sm text-white/50 leading-relaxed mt-6 max-w-md">
              Adjust the sliders below to manipulate the generative particle
              structure and soundscape in real-time. This interactive module
              bridges the gap between auditory frequencies and kinetic geometry.
            </p>
          </div>

          {/* Interactive Control Sliders */}
          <div
            className="flex flex-col gap-8 bg-white/5 border border-white/10 p-8 rounded-2xl backdrop-blur-md relative z-20"
            onMouseEnter={() => setCursorState("hover")}
            onMouseLeave={() => setCursorState("default")}
          >
            {/* Control 1 */}
            <div className="flex flex-col gap-4 group">
              <div className="flex justify-between items-center font-grotesk text-[10px] uppercase tracking-[0.2em] text-white/50 group-hover:text-accent transition-colors">
                <span className="flex items-center gap-2">
                  <Zap className="w-3 h-3" />
                  <span>Filter Cutoff</span>
                </span>
                <span className="font-mono text-accent/80 tabular-nums">
                  {Math.round(200 + (frequency / 100) * 11800)} Hz
                </span>
              </div>
              <div className="relative h-6 flex items-center">
                <input
                  type="range"
                  min="10"
                  max="100"
                  value={frequency}
                  onChange={(e) => setFrequency(Number(e.target.value))}
                  className="absolute w-full appearance-none bg-transparent z-10 cursor-pointer [&::-webkit-slider-runnable-track]:h-[2px] [&::-webkit-slider-runnable-track]:bg-white/10 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-accent [&::-webkit-slider-thumb]:-translate-y-[5px] [&::-moz-range-track]:h-[2px] [&::-moz-range-track]:bg-white/10 [&::-moz-range-thumb]:h-3 [&::-moz-range-thumb]:w-3 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:bg-accent [&::-moz-range-thumb]:border-none"
                />
                <div
                  className="absolute h-[2px] bg-accent/30 pointer-events-none transition-all duration-100"
                  style={{ width: `${frequency}%` }}
                />
              </div>
            </div>

            {/* Control 2 */}
            <div className="flex flex-col gap-4 group">
              <div className="flex justify-between items-center font-grotesk text-[10px] uppercase tracking-[0.2em] text-white/50 group-hover:text-accent transition-colors">
                <span className="flex items-center gap-2">
                  <Radio className="w-3 h-3" />
                  <span>Modulation Texture</span>
                </span>
                <span className="font-mono text-accent/80 tabular-nums">
                  {amplitude}%
                </span>
              </div>
              <div className="relative h-6 flex items-center">
                <input
                  type="range"
                  min="10"
                  max="100"
                  value={amplitude}
                  onChange={(e) => setAmplitude(Number(e.target.value))}
                  className="absolute w-full appearance-none bg-transparent z-10 cursor-pointer [&::-webkit-slider-runnable-track]:h-[2px] [&::-webkit-slider-runnable-track]:bg-white/10 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-accent [&::-webkit-slider-thumb]:-translate-y-[5px] [&::-moz-range-track]:h-[2px] [&::-moz-range-track]:bg-white/10 [&::-moz-range-thumb]:h-3 [&::-moz-range-thumb]:w-3 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:bg-accent [&::-moz-range-thumb]:border-none"
                />
                <div
                  className="absolute h-[2px] bg-accent/30 pointer-events-none transition-all duration-100"
                  style={{ width: `${amplitude}%` }}
                />
              </div>
            </div>

            {/* Control 3 */}
            <div className="flex flex-col gap-4 group">
              <div className="flex justify-between items-center font-grotesk text-[10px] uppercase tracking-[0.2em] text-white/50 group-hover:text-accent transition-colors">
                <span className="flex items-center gap-2">
                  <Volume2 className="w-3 h-3" />
                  <span>Resonance Intensity</span>
                </span>
                <span className="font-mono text-accent/80 tabular-nums">
                  {(resonance / 10).toFixed(1)} Q
                </span>
              </div>
              <div className="relative h-6 flex items-center">
                <input
                  type="range"
                  min="10"
                  max="100"
                  value={resonance}
                  onChange={(e) => setResonance(Number(e.target.value))}
                  className="absolute w-full appearance-none bg-transparent z-10 cursor-pointer [&::-webkit-slider-runnable-track]:h-[2px] [&::-webkit-slider-runnable-track]:bg-white/10 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-accent [&::-webkit-slider-thumb]:-translate-y-[5px] [&::-moz-range-track]:h-[2px] [&::-moz-range-track]:bg-white/10 [&::-moz-range-thumb]:h-3 [&::-moz-range-thumb]:w-3 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:bg-accent [&::-moz-range-thumb]:border-none"
                />
                <div
                  className="absolute h-[2px] bg-accent/30 pointer-events-none transition-all duration-100"
                  style={{ width: `${resonance}%` }}
                />
              </div>
            </div>

            {/* Play/Stop Toggle relocated here */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                togglePlayback();
              }}
              disabled={!isLoaded}
              className="w-full py-4 bg-accent rounded-xl text-white font-grotesk font-bold uppercase tracking-widest hover:bg-accent/90 transition-all flex items-center justify-center gap-3 shadow-[0_0_20px_rgba(255,77,0,0.2)] disabled:opacity-50 disabled:cursor-wait"
            >
              {!isLoaded ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  <span>Loading Sonic Core...</span>
                </>
              ) : isPlaying ? (
                <>
                  <Square className="w-5 h-5 fill-white" />
                  <span>Stop Synthesis</span>
                </>
              ) : (
                <>
                  <Play className="w-5 h-5 fill-white" />
                  <span>Start Synthesis</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Right Output / Screen / Generative Audio Visualizer */}
        <div className="lg:col-span-7 flex items-center justify-center relative h-[450px]">
          {/* Neon Backdrop Glow */}
          <div
            className="absolute inset-0 m-auto blur-[100px] rounded-full transition-all duration-300 pointer-events-none"
            style={{
              width: `${amplitude * 3}px`,
              height: `${amplitude * 3}px`,
              background: `radial-gradient(circle, var(--color-accent) 0%, rgba(255, 77, 0, 0) 70%)`,
              opacity: frequency / 100,
            }}
          />

          {/* Generative Rings / SVG Waves */}
          <svg className="w-full h-full max-w-lg overflow-visible">
            {/* Outer Concentric Rings responding to parameters */}
            {Array.from({ length: 8 }).map((_, i) => {
              const radius = 50 + i * (resonance * 0.45);
              const rotationSpeed = (i + 1) * 2;
              return (
                <motion.circle
                  key={i}
                  cx="50%"
                  cy="50%"
                  r={radius}
                  fill="none"
                  stroke={
                    i % 2 === 0
                      ? "var(--color-accent)"
                      : "rgba(255,255,255,0.1)"
                  }
                  strokeWidth={1 + (i % 3)}
                  strokeDasharray={`${frequency * 0.5} ${amplitude * 0.2}`}
                  animate={{
                    rotate: [0, 360],
                    scale: [
                      1,
                      1 + (isPlaying ? amplitude * 0.004 : amplitude * 0.002),
                      1,
                    ],
                  }}
                  transition={{
                    rotate: {
                      repeat: Infinity,
                      duration: 30 / (rotationSpeed * (isPlaying ? 1.5 : 1)),
                      ease: "linear",
                    },
                    scale: {
                      repeat: Infinity,
                      duration: isPlaying ? 0.5 : 2,
                      ease: "easeInOut",
                    },
                  }}
                  className="origin-center"
                />
              );
            })}

            {/* Central glowing orb */}
            <circle
              cx="50%"
              cy="50%"
              r={20 + amplitude * 0.3}
              fill="var(--color-accent)"
              opacity="0.8"
            />
          </svg>

          {/* Interactive coordinates overlay in the corner */}
          <div className="absolute bottom-4 right-4 font-mono text-[10px] text-white/30 tracking-widest">
            X: {(frequency * 1.618).toFixed(2)} // Y:{" "}
            {(amplitude * resonance * 0.01).toFixed(2)}
          </div>
        </div>
      </div>
    </section>
  );
};
