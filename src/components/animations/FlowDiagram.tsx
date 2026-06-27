"use client";

import { motion } from "framer-motion";

interface FlowDiagramProps {
  steps: string[];
  color: string;
}

export function FlowDiagram({ steps, color }: FlowDiagramProps) {
  return (
    <div className="w-full rounded-2xl glass p-5">
      <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-5">
        Architecture Flow
      </p>

      <div className="flex flex-col items-center gap-0">
        {steps.map((step, i) => (
          <div key={step} className="flex flex-col items-center">
            {/* Node */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, delay: i * 0.1, ease: [0.34, 1.56, 0.64, 1] }}
              className="px-5 py-2.5 rounded-xl text-xs font-semibold text-center w-full max-w-xs"
              style={{
                background: i === 0 || i === steps.length - 1
                  ? `linear-gradient(135deg, ${color}20, ${color}10)`
                  : `${color}0d`,
                border: `1px solid ${color}${i === 0 || i === steps.length - 1 ? "35" : "20"}`,
                color: color === "#00c6ff" ? "#0077aa" : color,
                boxShadow: i === 0 || i === steps.length - 1
                  ? `0 4px 16px ${color}15`
                  : "none",
              }}
            >
              {step}
            </motion.div>

            {/* Arrow connector */}
            {i < steps.length - 1 && (
              <motion.div
                initial={{ scaleY: 0, opacity: 0 }}
                animate={{ scaleY: 1, opacity: 1 }}
                transition={{ duration: 0.35, delay: i * 0.1 + 0.25 }}
                className="flex flex-col items-center gap-0 origin-top"
              >
                <div
                  className="w-px"
                  style={{
                    height: 20,
                    background: `linear-gradient(to bottom, ${color}50, ${color}20)`,
                  }}
                />
                {/* Animated travel dot */}
                <motion.div
                  className="w-1.5 h-1.5 rounded-full"
                  style={{ background: color, opacity: 0.7 }}
                  animate={{ y: [-8, 0, -8] }}
                  transition={{ duration: 1.8, repeat: Infinity, delay: i * 0.3, ease: "easeInOut" }}
                />
                <div
                  className="w-px"
                  style={{
                    height: 20,
                    background: `linear-gradient(to bottom, ${color}20, ${color}50)`,
                  }}
                />
              </motion.div>
            )}
          </div>
        ))}
      </div>

      {/* Animated progress bar */}
      <div className="mt-5 h-0.5 rounded-full overflow-hidden" style={{ background: `${color}15` }}>
        <motion.div
          className="h-full rounded-full"
          style={{ background: `linear-gradient(to right, transparent, ${color}70, transparent)` }}
          animate={{ x: ["-100%", "200%"] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: "linear" }}
        />
      </div>
    </div>
  );
}
