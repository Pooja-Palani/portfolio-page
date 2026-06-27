"use client";

import {
  motion,
  useMotionValue,
  useSpring,
  useMotionTemplate,
  useTransform,
} from "framer-motion";
import { useEffect } from "react";
import { ArrowDown, Download, Sparkles } from "lucide-react";

// Apple-grade fast-in ease-out
const EASE = [0.22, 0.03, 0.26, 1] as const;

// Tracks cursor position with spring smoothing — drives ambient hero glow
function useCursorAmbient() {
  const mx = useMotionValue(0.5);
  const my = useMotionValue(0.5);
  const sx = useSpring(mx, { stiffness: 28, damping: 22 });
  const sy = useSpring(my, { stiffness: 28, damping: 22 });

  useEffect(() => {
    const fn = (e: MouseEvent) => {
      mx.set(e.clientX / window.innerWidth);
      my.set(e.clientY / window.innerHeight);
    };
    window.addEventListener("mousemove", fn, { passive: true });
    return () => window.removeEventListener("mousemove", fn);
  }, [mx, my]);

  return { sx, sy };
}

// Glass capsule stat — custom inline glass styles to avoid glass-card CSS hover conflict
function StatCard({ value, label }: { value: string; label: string }) {
  return (
    <motion.div
      className="relative overflow-hidden rounded-2xl flex flex-col items-center gap-1.5 px-7 py-5 min-w-[110px]"
      style={{
        background: "rgba(255,255,255,0.62)",
        backdropFilter: "blur(24px) saturate(200%)",
        WebkitBackdropFilter: "blur(24px) saturate(200%)",
        border: "1px solid rgba(255,255,255,0.82)",
        boxShadow: "0 4px 24px rgba(0,0,0,0.05), 0 1px 0 rgba(255,255,255,0.92) inset",
      }}
      whileHover={{
        y: -5,
        boxShadow: "0 18px 52px rgba(0,102,255,0.10), 0 1px 0 rgba(255,255,255,0.97) inset",
      }}
      transition={{ type: "spring", stiffness: 420, damping: 28 }}
    >
      {/* Top specular line */}
      <div className="absolute top-0 left-4 right-4 h-px bg-gradient-to-r from-transparent via-white to-transparent" />
      <span
        className="gradient-text font-bold leading-none"
        style={{ fontSize: "1.35rem", letterSpacing: "-0.02em" }}
      >
        {value}
      </span>
      <span className="text-[11px] text-gray-400 font-medium tracking-wide text-center leading-tight whitespace-nowrap">
        {label}
      </span>
    </motion.div>
  );
}

export function Hero() {
  const { sx, sy } = useCursorAmbient();

  // Cursor-driven ambient light: very gentle radial glow that follows the mouse
  const ambientX = useTransform(sx, [0, 1], [0, 100]);
  const ambientY = useTransform(sy, [0, 1], [0, 85]);
  const ambientBg = useMotionTemplate`radial-gradient(ellipse 72% 62% at ${ambientX}% ${ambientY}%, rgba(100,148,255,0.052) 0%, transparent 70%)`;

  return (
    <section
      className="relative flex flex-col items-center justify-center text-center px-6"
      style={{ minHeight: "100svh", paddingTop: "8rem", paddingBottom: "6rem" }}
    >
      {/* Cursor-responsive ambient glow */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{ background: ambientBg }}
      />

      {/* Static ambient — soft blue crown, soft indigo base */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 55% 40% at 50% -5%, rgba(80,130,255,0.038) 0%, transparent 70%)," +
            "radial-gradient(ellipse 40% 30% at 80% 110%, rgba(99,88,255,0.030) 0%, transparent 70%)",
        }}
      />

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center w-full max-w-5xl mx-auto">

        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20, filter: "blur(6px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 0.65, delay: 0.1, ease: EASE }}
        >
          <span className="chip glass-liquid text-[12px]">
            <Sparkles size={11} className="mr-1.5 text-blue-500" />
            Available for Opportunities
          </span>
        </motion.div>

        {/* Name — the dominant visual element */}
        <motion.h1
          initial={{ opacity: 0, y: 44, filter: "blur(18px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 1.05, delay: 0.24, ease: EASE }}
          className="mt-8 gradient-text-soft"
          style={{
            fontSize: "clamp(96px, 12vw, 180px)",
            fontWeight: 700,
            letterSpacing: "-0.04em",
            lineHeight: 1.06,
          }}
        >
          Pooja Palani
        </motion.h1>

        {/* Role */}
        <motion.p
          initial={{ opacity: 0, y: 22, filter: "blur(8px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 0.75, delay: 0.4, ease: EASE }}
          className="mt-6 gradient-text font-semibold"
          style={{ fontSize: "clamp(1.1rem, 2vw, 1.5rem)", letterSpacing: "-0.01em" }}
        >
          AI Innovation Engineer
        </motion.p>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.75, delay: 0.56, ease: EASE }}
          className="mt-8 text-gray-500 max-w-xl"
          style={{ fontSize: "clamp(1rem, 1.4vw, 1.1rem)", lineHeight: 1.8 }}
        >
          Designing agentic AI systems, enterprise data intelligence platforms,
          and governance-first software for regulated industries.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, delay: 0.7, ease: EASE }}
          className="mt-12 flex flex-wrap items-center justify-center gap-4"
        >
          {/* Primary — gradient + periodic shimmer sweep */}
          <motion.button
            onClick={() => document.getElementById("work")?.scrollIntoView({ behavior: "smooth" })}
            className="relative overflow-hidden px-8 py-4 rounded-2xl text-sm font-semibold text-white"
            style={{
              background: "linear-gradient(135deg, #0066ff 0%, #4f46e5 100%)",
              boxShadow: "0 1px 0 rgba(255,255,255,0.14) inset, 0 6px 28px rgba(0,102,255,0.24)",
            }}
            whileHover={{
              boxShadow: "0 1px 0 rgba(255,255,255,0.22) inset, 0 14px 44px rgba(0,102,255,0.34)",
            }}
            transition={{ duration: 0.22 }}
          >
            <motion.span
              className="absolute inset-0 pointer-events-none"
              style={{
                background:
                  "linear-gradient(100deg, transparent 20%, rgba(255,255,255,0.14) 50%, transparent 80%)",
              }}
              animate={{ x: ["-110%", "210%"] }}
              transition={{ duration: 2.6, repeat: Infinity, ease: "linear", repeatDelay: 2.8 }}
            />
            <span className="relative z-10">Explore My Work</span>
          </motion.button>

          {/* Secondary — glass, no glass-card class (avoids CSS hover conflict) */}
          <motion.a
            href="/resume.pdf"
            download
            className="relative overflow-hidden flex items-center gap-2.5 px-8 py-4 rounded-2xl text-sm font-semibold text-gray-700"
            style={{
              background: "rgba(255,255,255,0.64)",
              backdropFilter: "blur(24px) saturate(200%)",
              WebkitBackdropFilter: "blur(24px) saturate(200%)",
              border: "1px solid rgba(255,255,255,0.84)",
              boxShadow: "0 4px 20px rgba(0,0,0,0.06), 0 1px 0 rgba(255,255,255,0.92) inset",
            }}
            whileHover={{
              y: -2,
              boxShadow: "0 12px 38px rgba(0,0,0,0.09), 0 1px 0 rgba(255,255,255,0.97) inset",
            }}
            transition={{ type: "spring", stiffness: 400, damping: 28 }}
          >
            <Download size={14} strokeWidth={2} />
            Download Résumé
          </motion.a>
        </motion.div>

        {/* Stats — elegant glass capsules */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, delay: 0.86, ease: EASE }}
          className="mt-14 flex flex-wrap items-center justify-center gap-4"
        >
          <StatCard value="2024" label="Started Engineering" />
          <StatCard value="3+"   label="Enterprise Products" />
          <StatCard value="AI"   label="Core Specialisation" />
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.9 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <motion.div
          animate={{ y: [0, 7, 0] }}
          transition={{ duration: 2.0, repeat: Infinity, ease: "easeInOut" }}
          className="text-gray-300"
        >
          <ArrowDown size={16} />
        </motion.div>
        <span className="text-[10px] text-gray-300 font-medium tracking-[0.22em] uppercase">Scroll</span>
      </motion.div>
    </section>
  );
}
