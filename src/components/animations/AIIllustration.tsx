"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useEffect, useRef } from "react";

const nodes = [
  { id: "core", x: 160, y: 160, r: 36, label: "AI Core", color: "#0066ff" },
  { id: "data", x: 60,  y: 80,  r: 22, label: "Data",    color: "#00c6ff" },
  { id: "gov",  x: 270, y: 70,  r: 22, label: "Gov",     color: "#4f46e5" },
  { id: "orch", x: 290, y: 200, r: 22, label: "Orch",    color: "#00c6ff" },
  { id: "api",  x: 60,  y: 240, r: 22, label: "API",     color: "#6366f1" },
  { id: "ml",   x: 160, y: 290, r: 22, label: "ML",      color: "#0066ff" },
  { id: "pipe", x: 100, y: 160, r: 14, label: "",        color: "#00c6ff" },
  { id: "vis",  x: 220, y: 130, r: 14, label: "",        color: "#818cf8" },
];

const edges = [
  ["core", "data"], ["core", "gov"], ["core", "orch"],
  ["core", "api"],  ["core", "ml"],  ["data", "pipe"],
  ["gov",  "vis"],  ["pipe", "api"], ["vis", "orch"],
  ["ml", "api"],
];

function getNode(id: string) {
  return nodes.find((n) => n.id === id)!;
}

export function AIIllustration() {
  const containerRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.5);
  const springX = useSpring(mouseX, { stiffness: 80, damping: 20 });
  const springY = useSpring(mouseY, { stiffness: 80, damping: 20 });
  const rotateX = useTransform(springY, [0, 1], [8, -8]);
  const rotateY = useTransform(springX, [0, 1], [-8, 8]);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const onMove = (e: MouseEvent) => {
      const r = el.getBoundingClientRect();
      mouseX.set((e.clientX - r.left) / r.width);
      mouseY.set((e.clientY - r.top)  / r.height);
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, [mouseX, mouseY]);

  return (
    <div ref={containerRef} className="relative w-full max-w-[420px] aspect-square">
      {/* Outer glow ring */}
      <motion.div
        className="absolute inset-8 rounded-full animate-pulse-glow"
        style={{
          background: "radial-gradient(circle, rgba(0,102,255,0.12) 0%, transparent 70%)",
        }}
      />

      {/* Glass card with 3D tilt */}
      <motion.div
        style={{ rotateX, rotateY, transformPerspective: 800, transformStyle: "preserve-3d" }}
        className="w-full h-full rounded-3xl glass border border-white/70 shadow-[0_24px_80px_rgba(0,102,255,0.15)] p-6 flex items-center justify-center"
      >
        {/* Shimmer top edge */}
        <div className="absolute top-0 left-8 right-8 h-px bg-gradient-to-r from-transparent via-white/80 to-transparent" />

        <svg
          viewBox="0 0 320 320"
          className="w-full h-full"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <filter id="glow">
              <feGaussianBlur stdDeviation="3" result="coloredBlur" />
              <feMerge>
                <feMergeNode in="coloredBlur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
            <filter id="node-glow">
              <feGaussianBlur stdDeviation="6" result="coloredBlur" />
              <feMerge>
                <feMergeNode in="coloredBlur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* Edges */}
          {edges.map(([a, b], i) => {
            const na = getNode(a);
            const nb = getNode(b);
            return (
              <motion.line
                key={`${a}-${b}`}
                x1={na.x} y1={na.y} x2={nb.x} y2={nb.y}
                stroke="url(#edgeGrad)"
                strokeWidth={1.5}
                strokeOpacity={0.4}
                strokeLinecap="round"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{ duration: 1.2, delay: 0.5 + i * 0.08 }}
              />
            );
          })}

          <defs>
            <linearGradient id="edgeGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#0066ff" stopOpacity="0.6" />
              <stop offset="100%" stopColor="#00c6ff" stopOpacity="0.3" />
            </linearGradient>
          </defs>

          {/* Animated pulse along edges */}
          {edges.slice(0, 5).map(([a, b], i) => {
            const na = getNode(a);
            const nb = getNode(b);
            return (
              <motion.circle
                key={`pulse-${i}`}
                r={3}
                fill="#00c6ff"
                filter="url(#glow)"
                animate={{
                  x: [na.x, nb.x],
                  y: [na.y, nb.y],
                  opacity: [0, 1, 0],
                }}
                transition={{
                  duration: 2.5,
                  delay: 1.5 + i * 0.6,
                  repeat: Infinity,
                  ease: "linear",
                }}
              />
            );
          })}

          {/* Nodes */}
          {nodes.map((node, i) => (
            <motion.g
              key={node.id}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.3 + i * 0.1, ease: [0.34, 1.56, 0.64, 1] }}
            >
              {/* Glow bg */}
              <circle
                cx={node.x} cy={node.y}
                r={node.r + 8}
                fill={node.color}
                fillOpacity={0.08}
                filter="url(#node-glow)"
              />
              {/* Main circle */}
              <circle
                cx={node.x} cy={node.y}
                r={node.r}
                fill="rgba(255,255,255,0.85)"
                stroke={node.color}
                strokeWidth={1.5}
                strokeOpacity={0.5}
              />
              {/* Inner dot */}
              <circle
                cx={node.x} cy={node.y}
                r={node.r * 0.35}
                fill={node.color}
                fillOpacity={0.8}
              />
              {/* Label */}
              {node.label && (
                <text
                  x={node.x} y={node.y + node.r + 14}
                  textAnchor="middle"
                  fontSize={9}
                  fontWeight="600"
                  fill={node.color}
                  fontFamily="system-ui"
                  fillOpacity={0.8}
                >
                  {node.label}
                </text>
              )}
            </motion.g>
          ))}
        </svg>
      </motion.div>

      {/* Floating satellite chips */}
      {[
        { label: "GPT-4o",  top: "5%",  left: "-5%",  delay: 1.2 },
        { label: "BFSI",    top: "10%", right: "-8%", delay: 1.5 },
        { label: "ISO 27k", bottom: "15%", right: "-5%", delay: 1.7 },
      ].map(({ label, delay, ...pos }) => (
        <motion.div
          key={label}
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay }}
          style={pos as React.CSSProperties}
          className="absolute chip animate-float-slow text-[10px]"
        >
          {label}
        </motion.div>
      ))}
    </div>
  );
}
