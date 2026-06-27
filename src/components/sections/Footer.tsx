"use client";

import { motion } from "framer-motion";

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="border-t border-white/60">
      {/* Glass separator line */}
      <div className="h-px w-full" style={{ background: "linear-gradient(to right, transparent, rgba(0,102,255,0.2), transparent)" }} />

      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-10 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex flex-col gap-0.5">
          <span className="text-sm font-semibold text-gray-900">Pooja Palani</span>
          <span className="text-xs text-gray-400">AI & Enterprise Platform Engineer</span>
        </div>

        <div className="flex flex-col items-center gap-1">
          <p className="text-xs text-gray-400">
            © {year} — Crafted with precision using
          </p>
          <div className="flex items-center gap-2">
            {["Next.js", "React", "Tailwind CSS", "Framer Motion"].map((tech, i) => (
              <span key={tech} className="flex items-center gap-2">
                <span className="text-[10px] font-medium text-gray-500">{tech}</span>
                {i < 3 && <span className="w-0.5 h-0.5 rounded-full bg-gray-300" />}
              </span>
            ))}
          </div>
        </div>

        <motion.button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          data-cursor="hover"
          whileHover={{ y: -2 }}
          className="text-xs font-medium text-gray-500 hover:text-blue-600 transition-colors flex items-center gap-1.5"
        >
          Back to top
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
            <path d="M6 10V2M6 2L2 6M6 2L10 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </motion.button>
      </div>
    </footer>
  );
}
