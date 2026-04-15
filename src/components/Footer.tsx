import React, { useEffect, useState } from "react";
import { ArrowUpRight } from "lucide-react";

export const Footer: React.FC<{
  setCursorState: (s: "default" | "hover" | "drag" | "view") => void;
}> = ({ setCursorState }) => {
  const [time, setTime] = useState<string>("");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTime(
        now.toLocaleTimeString("en-US", {
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          hour12: false,
        }),
      );
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <footer className="relative bg-bg-secondary text-white px-6 md:px-16 pt-32 pb-12 z-10 overflow-hidden">
      {/* Background radial gradient / Glow element */}
      <div className="absolute -bottom-1/2 left-0 right-0 m-auto w-[600px] h-[600px] bg-accent/10 blur-[200px] pointer-events-none" />

      {/* Main big statement / CTA */}
      <div className="border-b border-white/10 pb-16 mb-16 flex flex-col md:flex-row justify-between items-start md:items-end gap-10">
        <div>
          <span className="font-grotesk text-xs uppercase tracking-widest text-accent font-bold block mb-6">
            Initiate Conversation
          </span>
          <h2
            onMouseEnter={() => setCursorState("hover")}
            onMouseLeave={() => setCursorState("default")}
            className="font-syne text-[clamp(3rem,8vw,7rem)] font-extrabold uppercase leading-[0.9] tracking-tight group"
          >
            Let's Shape <br />
            <span className="font-serif italic font-light text-white/70">
              The Unknown
            </span>
          </h2>
        </div>

        {/* Action Button */}
        <a
          href="mailto:albyluck@gmail.com"
          className="flex items-center gap-4 bg-white text-black font-grotesk text-xs font-bold uppercase tracking-widest px-8 py-5 rounded-full hover:bg-accent hover:text-white transition-all duration-300"
          onMouseEnter={() => setCursorState("hover")}
          onMouseLeave={() => setCursorState("default")}
        >
          <span>Get in touch</span>
          <ArrowUpRight className="w-4 h-4" />
        </a>
      </div>

      {/* Links & Sub-Footer */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-12 font-grotesk text-xs tracking-widest uppercase text-white/50 mb-16">
        <div>
          <span className="block text-white mb-4">Location</span>
          <span>Indonesia, East Borneo</span>
          <span className="block mt-1">Balikpapan</span>
        </div>

        <div>
          <span className="block text-white mb-4">Current Time (Local)</span>
          <span className="font-mono text-accent">{time}</span>
        </div>

        <div>
          <span className="block text-white mb-4">Social Network</span>
          <ul className="flex flex-col gap-2">
            <li>
              <a
                href="https://instagram.com/willy_julian"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white transition-colors"
              >
                Instagram / @willy_julian
              </a>
            </li>
            <li>
              <a
                href="https://x.com/Will_Wonka20"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white transition-colors"
              >
                X (Twitter) / @Will_Wonka20
              </a>
            </li>
            <li>
              <a
                href="tg://resolve?domain=on1force&text=Hey!%20My%20name%20is%20%5BName%5D%0A%0AI'm%20trying%20to%20reach%20out%20to%20you%20about%0A%5Bsubject%5D"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white transition-colors"
              >
                Telegram / @on1force
              </a>
            </li>
            <li>
              <a
                href="https://github.com/on1force"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white transition-colors"
              >
                Github / on1force
              </a>
            </li>
          </ul>
        </div>

        <div className="flex flex-col justify-end items-start md:items-end">
          <span className="block text-white mb-2">Sound On</span>
          <span>Interactive Audiosphere: ACTIVE</span>
        </div>
      </div>

      {/* Copyright/Signature bar */}
      <div className="flex flex-col md:flex-row justify-between items-center gap-4 font-grotesk text-[10px] tracking-widest uppercase text-white/40 border-t border-white/5 pt-8">
        <span>© 2026 ON1FORCE. ALL RIGHTS RESERVED.</span>
        <span>ENGINEERED FOR EXTREME INTERACTION</span>
      </div>
    </footer>
  );
};
