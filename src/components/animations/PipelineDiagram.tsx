"use client";

import { motion } from "framer-motion";

type DiagramType = "ai" | "pipeline" | "governance";

const diagrams: Record<DiagramType, { stages: string[]; color: string }> = {
  ai: {
    stages: ["Data Ingestion", "Normalization", "RAG Context", "LLM Inference", "Confidence Score", "Audit Log"],
    color: "#0066ff",
  },
  pipeline: {
    stages: ["Schema Registry", "Rule Engine", "Quality Scoring", "Threshold Check", "Alert / Report", "Remediation"],
    color: "#4f46e5",
  },
  governance: {
    stages: ["Policy Config", "Plugin Loader", "Event Stream", "Lineage Track", "Compliance Report", "Audit Trail"],
    color: "#00c6ff",
  },
};

export function PipelineDiagram({ type, color }: { type: DiagramType; color: string }) {
  const diagram = diagrams[type];

  return (
    <div className="w-full rounded-2xl glass p-5 overflow-x-auto">
      <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-4">System Architecture</p>
      <div className="flex items-center gap-0 min-w-max">
        {diagram.stages.map((stage, i) => (
          <div key={stage} className="flex items-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.7 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              className="flex flex-col items-center"
            >
              <div
                className="w-16 h-16 rounded-2xl flex items-center justify-center text-center text-[9px] font-semibold leading-tight"
                style={{
                  background: `${color}10`,
                  border: `1px solid ${color}25`,
                  color: color,
                  padding: "6px",
                }}
              >
                {stage}
              </div>
              <div
                className="w-1.5 h-1.5 rounded-full mt-2"
                style={{ background: color, opacity: 0.6 }}
              />
            </motion.div>

            {i < diagram.stages.length - 1 && (
              <motion.div
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 0.4, delay: i * 0.1 + 0.3 }}
                className="w-8 h-px origin-left flex-shrink-0"
                style={{ background: `linear-gradient(to right, ${color}60, ${color}20)` }}
              >
                <div
                  className="absolute right-0 top-1/2 -translate-y-1/2 w-0 h-0"
                  style={{
                    borderTop: "3px solid transparent",
                    borderBottom: "3px solid transparent",
                    borderLeft: `5px solid ${color}60`,
                  }}
                />
              </motion.div>
            )}
          </div>
        ))}
      </div>

      {/* Animated pulse */}
      <div className="relative mt-4 h-1 rounded-full overflow-hidden" style={{ background: `${color}15` }}>
        <motion.div
          className="absolute top-0 left-0 h-full w-1/3 rounded-full"
          style={{ background: `linear-gradient(to right, transparent, ${color}60, transparent)` }}
          animate={{ x: ["0%", "300%"] }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
        />
      </div>
    </div>
  );
}
