import React, { useEffect, useRef } from "react";

export const AbstractCanvas: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    // Track mouse
    let mouse = {
      x: width / 2,
      y: height / 2,
      targetX: width / 2,
      targetY: height / 2,
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouse.targetX = e.clientX;
      mouse.targetY = e.clientY;
    };

    window.addEventListener("mousemove", handleMouseMove);

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", handleResize);

    // Create organic floating orbs/shapes
    const orbs = Array.from({ length: 6 }).map((_, i) => {
      return {
        x: Math.random() * width,
        y: Math.random() * height,
        radius: 100 + Math.random() * 200,
        color:
          i % 2 === 0 ? "rgba(255, 77, 0, 0.15)" : "rgba(120, 50, 255, 0.12)",
        vx: (Math.random() - 0.5) * 0.8,
        vy: (Math.random() - 0.5) * 0.8,
        scale: 1,
      };
    });

    // Cursor ripple/trail history
    const trail: { x: number; y: number; r: number; alpha: number }[] = [];

    const animate = () => {
      // Smoothly interpolate mouse position (lerp)
      mouse.x += (mouse.targetX - mouse.x) * 0.1;
      mouse.y += (mouse.targetY - mouse.y) * 0.1;

      // Subtle clear with slight fade for trail effect
      ctx.fillStyle = "rgba(3, 3, 3, 0.1)";
      ctx.fillRect(0, 0, width, height);

      // Add a trail point at current lerped mouse position
      trail.push({
        x: mouse.x,
        y: mouse.y,
        r: 8 + Math.random() * 12,
        alpha: 0.8,
      });

      // Draw and update trail
      for (let i = trail.length - 1; i >= 0; i--) {
        const p = trail[i];
        p.r *= 0.96;
        p.alpha -= 0.02;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 77, 0, ${p.alpha})`;
        ctx.fill();

        if (p.alpha <= 0 || p.r <= 0.1) {
          trail.splice(i, 1);
        }
      }

      // Draw main orbs
      orbs.forEach((orb) => {
        orb.x += orb.vx;
        orb.y += orb.vy;

        // Bounce off walls
        if (orb.x - orb.radius > width) orb.x = -orb.radius;
        if (orb.x + orb.radius < 0) orb.x = width + orb.radius;
        if (orb.y - orb.radius > height) orb.y = -orb.radius;
        if (orb.y + orb.radius < 0) orb.y = height + orb.radius;

        // Interactive gravity towards mouse when close
        const dx = mouse.x - orb.x;
        const dy = mouse.y - orb.y;
        const dist = Math.hypot(dx, dy);

        if (dist < 400) {
          orb.x += (dx / dist) * 1.5;
          orb.y += (dy / dist) * 1.5;
        }

        // Draw radial gradient orb
        const gradient = ctx.createRadialGradient(
          orb.x,
          orb.y,
          10,
          orb.x,
          orb.y,
          orb.radius,
        );
        gradient.addColorStop(0, orb.color);
        gradient.addColorStop(1, "rgba(0,0,0,0)");

        ctx.beginPath();
        ctx.arc(orb.x, orb.y, orb.radius, 0, Math.PI * 2);
        ctx.fillStyle = gradient;
        ctx.fill();
      });

      // Draw geometric precision dots/lines (creating an abstract star chart aesthetic)
      ctx.strokeStyle = "rgba(255, 255, 255, 0.05)";
      ctx.lineWidth = 1;
      ctx.beginPath();
      for (let i = 0; i < orbs.length; i++) {
        for (let j = i + 1; j < orbs.length; j++) {
          const dist = Math.hypot(orbs[i].x - orbs[j].x, orbs[i].y - orbs[j].y);
          if (dist < 450) {
            ctx.moveTo(orbs[i].x, orbs[i].y);
            ctx.lineTo(orbs[j].x, orbs[j].y);
          }
        }
      }
      ctx.stroke();

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <canvas ref={canvasRef} className="fixed inset-0 pointer-events-none z-0" />
  );
};
