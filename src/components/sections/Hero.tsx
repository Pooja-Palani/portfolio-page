"use client";

import { motion } from "framer-motion";
import { ArrowDown, Download, Sparkles } from "lucide-react";

/* ─── Hero ─── */
export function Hero() {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center text-center px-6 pt-24 pb-20 overflow-hidden">

      <div className="relative z-10 flex flex-col items-center w-full max-w-4xl mx-auto">

        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.2 }}
        >
          <span className="chip glass-liquid text-[12px]">
            <Sparkles size={11} className="mr-1.5 text-blue-500" />
            Available for Opportunities
          </span>
        </motion.div>

        {/* Name — single line, no wrap */}
        <motion.h1
          initial={{ opacity: 0, y: 36, filter: "blur(14px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 0.95, delay: 0.35, ease: [0.25, 0.4, 0.25, 1] }}
          className="mt-7 whitespace-nowrap gradient-text-soft"
          style={{
            fontSize: "clamp(3rem, 8vw, 7.5rem)",
            fontWeight: 700,
            letterSpacing: "-0.035em",
            lineHeight: 0.92,
          }}
        >
          Pooja Palani
        </motion.h1>

        {/* Role */}
        <motion.p
          initial={{ opacity: 0, y: 18, filter: "blur(6px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 0.7, delay: 0.58, ease: [0.25, 0.4, 0.25, 1] }}
          className="mt-5 gradient-text"
          style={{
            fontSize: "clamp(1.05rem, 2vw, 1.5rem)",
            fontWeight: 600,
            letterSpacing: "-0.01em",
          }}
        >
          AI Innovation Engineer
        </motion.p>

        {/* Tagline */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.9, delay: 0.78 }}
          className="mt-6 text-gray-400 leading-relaxed max-w-2xl font-light"
          style={{ fontSize: "clamp(0.9rem, 1.4vw, 1.1rem)" }}
        >
          Designing agentic AI systems, enterprise data intelligence platforms,
          and governance-first software for regulated industries.
        </motion.p>

        {/* CTA buttons */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.0 }}
          className="mt-9 flex flex-wrap items-center justify-center gap-3"
        >
          <button
            onClick={() => document.getElementById("work")?.scrollIntoView({ behavior: "smooth" })}
            className="btn-glow px-7 py-3.5 rounded-2xl text-sm font-semibold text-white"
            style={{
              background: "linear-gradient(135deg, #0066ff 0%, #4f46e5 100%)",
              boxShadow: "0 4px 28px rgba(0,102,255,0.28)",
            }}
          >
            Explore My Work
          </button>
          <a
            href="/resume.pdf"
            download
            className="flex items-center gap-2 px-7 py-3.5 rounded-2xl text-sm font-semibold glass-card"
          >
            <Download size={14} />
            Download Résumé
          </a>
        </motion.div>

        {/* Minimal stat highlights */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7, delay: 1.25 }}
          className="mt-12 flex items-center"
        >
          {[
            { value: "2024", label: "Started Engineering" },
            { value: "3+",   label: "Enterprise Products" },
            { value: "AI",   label: "Core Specialisation" },
          ].map(({ value, label }, i) => (
            <div key={label} className="flex items-center">
              <div className="flex flex-col items-center px-8 py-1">
                <span
                  className="gradient-text font-bold leading-none"
                  style={{ fontSize: "clamp(1.05rem, 1.8vw, 1.35rem)" }}
                >
                  {value}
                </span>
                <span className="mt-1.5 text-[11px] text-gray-400 font-medium tracking-wide whitespace-nowrap">
                  {label}
                </span>
              </div>
              {i < 2 && (
                <div className="w-px h-7 bg-gradient-to-b from-transparent via-gray-200 to-transparent flex-shrink-0" />
              )}
            </div>
          ))}
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <motion.div
          animate={{ y: [0, 7, 0] }}
          transition={{ duration: 1.9, repeat: Infinity, ease: "easeInOut" }}
          className="text-gray-300"
        >
          <ArrowDown size={16} />
        </motion.div>
        <span className="text-[10px] text-gray-300 font-medium tracking-[0.22em] uppercase">Scroll</span>
      </motion.div>
    </section>
  );
}
