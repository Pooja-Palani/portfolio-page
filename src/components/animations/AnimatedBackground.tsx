"use client";

import { useEffect, useRef, useState } from "react";

/* ─── CSS custom-prop updater: drives glass card directional shine ─── */
function useCursorLight() {
  useEffect(() => {
    let rafId: number;
    let tx = 0.5, ty = 0, cx = 0.5, cy = 0;

    const onMove = (e: MouseEvent) => {
      tx = e.clientX / window.innerWidth;
      ty = e.clientY / window.innerHeight;
    };

    const tick = () => {
      cx += (tx - cx) * 0.06;
      cy += (ty - cy) * 0.06;
      const angle = 90 + cx * 90;
      const root = document.documentElement;
      root.style.setProperty("--cursor-nx", cx.toFixed(4));
      root.style.setProperty("--cursor-ny", cy.toFixed(4));
      root.style.setProperty("--shine-angle", `${angle.toFixed(1)}deg`);
      rafId = requestAnimationFrame(tick);
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    rafId = requestAnimationFrame(tick);
    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(rafId);
    };
  }, []);
}

/* ─── Canvas ripple on mouse move ─── */
function RippleCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d")!;

    let W = window.innerWidth;
    let H = window.innerHeight;
    canvas.width = W; canvas.height = H;

    type Rip = { x: number; y: number; r: number; a: number };
    const ripples: Rip[] = [];
    let lastX = -999, lastY = -999;

    const onMove = (e: MouseEvent) => {
      const dx = e.clientX - lastX, dy = e.clientY - lastY;
      if (dx * dx + dy * dy < 900) return;
      lastX = e.clientX; lastY = e.clientY;
      if (ripples.length < 20) ripples.push({ x: e.clientX, y: e.clientY, r: 0, a: 0.20 });
    };

    let rafId: number;
    const draw = () => {
      ctx.clearRect(0, 0, W, H);
      for (let i = ripples.length - 1; i >= 0; i--) {
        const rip = ripples[i];
        rip.r += 1.0; rip.a -= 0.005;
        if (rip.a <= 0) { ripples.splice(i, 1); continue; }
        ctx.beginPath();
        ctx.arc(rip.x, rip.y, rip.r, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(0,102,255,${(rip.a * 0.3).toFixed(3)})`;
        ctx.lineWidth = 1;
        ctx.stroke();
      }
      rafId = requestAnimationFrame(draw);
    };

    const onResize = () => {
      W = window.innerWidth; H = window.innerHeight;
      canvas.width = W; canvas.height = H;
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    window.addEventListener("resize", onResize);
    rafId = requestAnimationFrame(draw);
    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("resize", onResize);
      cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 pointer-events-none"
      style={{ opacity: 0.5, mixBlendMode: "multiply" }}
    />
  );
}

/* ─── Floating particles — client-only to avoid hydration mismatch ─── */
type Particle = { size: number; left: number; delay: number; duration: number; drift: number };

function Particles() {
  const [particles, setParticles] = useState<Particle[]>([]);
  useEffect(() => {
    setParticles(
      Array.from({ length: 16 }, () => ({
        size: Math.random() * 2.5 + 1.5,
        left: Math.random() * 100,
        delay: Math.random() * 18,
        duration: Math.random() * 12 + 16,
        drift: (Math.random() - 0.5) * 90,
      }))
    );
  }, []);

  return (
    <>
      {particles.map((p, i) => (
        <div
          key={i}
          className="absolute rounded-full"
          style={{
            width: p.size, height: p.size,
            left: `${p.left}%`, bottom: -16,
            background: `rgba(${i % 3 === 0 ? "0,102,255" : i % 3 === 1 ? "0,198,255" : "79,70,229"}, 0.4)`,
            filter: "blur(0.5px)",
            animation: `particle-drift ${p.duration}s linear ${p.delay}s infinite`,
            ["--drift" as string]: `${p.drift}px`,
          }}
        />
      ))}
    </>
  );
}

export function AnimatedBackground() {
  useCursorLight();

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none" aria-hidden>

      {/* L1: Cool off-white base */}
      <div className="absolute inset-0 bg-[#f4f6fb]" />

      {/* L2: Large radial gradient blobs */}
      {/* Blob A — top-left, blue */}
      <div
        className="absolute animate-blob"
        style={{
          width: "90vw", height: "90vw", maxWidth: 1100, maxHeight: 1100,
          top: "-25%", left: "-15%",
          background: "radial-gradient(ellipse, rgba(0,162,255,0.13) 0%, rgba(0,102,255,0.06) 45%, transparent 70%)",
          borderRadius: "58% 42% 68% 32% / 48% 58% 42% 52%",
          filter: "blur(60px)", animationDuration: "22s",
        }}
      />
      {/* Blob B — bottom-right, indigo */}
      <div
        className="absolute animate-blob-alt"
        style={{
          width: "80vw", height: "80vw", maxWidth: 950, maxHeight: 950,
          bottom: "-20%", right: "-10%",
          background: "radial-gradient(ellipse, rgba(99,88,255,0.11) 0%, rgba(79,70,229,0.05) 45%, transparent 70%)",
          borderRadius: "42% 58% 34% 66% / 56% 44% 68% 32%",
          filter: "blur(70px)", animationDuration: "28s",
        }}
      />
      {/* Blob C — centre, cyan */}
      <div
        className="absolute animate-blob-c"
        style={{
          width: "55vw", height: "55vw", maxWidth: 700, maxHeight: 700,
          top: "35%", left: "28%",
          background: "radial-gradient(ellipse, rgba(0,198,255,0.08) 0%, transparent 65%)",
          borderRadius: "50% 50% 40% 60% / 45% 55% 50% 50%",
          filter: "blur(80px)", animationDuration: "34s",
        }}
      />

      {/* L3: Subtle mesh grid */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage:
            "linear-gradient(rgba(0,102,255,0.022) 1px, transparent 1px)," +
            "linear-gradient(90deg, rgba(0,102,255,0.022) 1px, transparent 1px)",
          backgroundSize: "72px 72px",
          animation: "mesh-drift 20s ease-in-out infinite",
        }}
      />

      {/* L4: Noise texture */}
      <div
        className="absolute inset-0 opacity-[0.028]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.82' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          backgroundSize: "180px 180px",
        }}
      />

      {/* L5: Caustic light patches */}
      <div
        className="absolute"
        style={{
          width: 480, height: 320, top: "15%", left: "40%",
          background:
            "radial-gradient(ellipse 120px 60px at 30% 50%, rgba(0,160,255,0.09), transparent 80%)," +
            "radial-gradient(ellipse 80px 120px at 65% 30%, rgba(0,200,255,0.07), transparent 80%)," +
            "radial-gradient(ellipse 100px 50px at 80% 70%, rgba(120,0,255,0.05), transparent 80%)",
          filter: "blur(4px)",
          animation: "caustic-drift 10s ease-in-out infinite",
          mixBlendMode: "multiply",
        }}
      />
      <div
        className="absolute"
        style={{
          width: 400, height: 280, bottom: "20%", left: "15%",
          background:
            "radial-gradient(ellipse 90px 50px at 40% 60%, rgba(0,140,255,0.08), transparent 80%)," +
            "radial-gradient(ellipse 60px 100px at 70% 25%, rgba(80,0,220,0.06), transparent 80%)",
          filter: "blur(6px)",
          animation: "caustic-drift-b 13s ease-in-out infinite",
          mixBlendMode: "multiply",
        }}
      />

      {/* Floating particles */}
      <Particles />

      {/* L6: Mouse ripple canvas */}
      <RippleCanvas />

      {/* Soft vignette */}
      <div
        className="absolute inset-0"
        style={{
          background: "radial-gradient(ellipse 80% 70% at 50% 0%, transparent 60%, rgba(244,246,251,0.45) 100%)",
        }}
      />
    </div>
  );
}
