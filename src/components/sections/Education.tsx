"use client";

import { motion, useInView, useScroll, useTransform, useMotionValue, useSpring } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import { FadeIn } from "@/components/animations/FadeIn";

/* ─── Data ─────────────────────────────────────────── */
const degrees = [
  {
    id: "vit",
    institution: "Vellore Institute of Technology",
    abbr: "VIT",
    program: "Bachelor of Technology",
    stream: "Electronics & Communication Engineering",
    duration: "2024 – 2028",
    status: "Currently Pursuing",
    color: "#0066ff",
    accentLight: "rgba(0,102,255,0.08)",
    accentBorder: "rgba(0,102,255,0.2)",
    description:
      "Building strong engineering fundamentals across hardware and software systems while applying them to modern enterprise software and AI platforms.",
    focus: [
      "Computer Systems",
      "Embedded Systems",
      "Electronics",
      "Networking",
      "Software Engineering",
      "Cloud Computing",
      "Artificial Intelligence",
    ],
    illustrationType: "circuit" as const,
  },
  {
    id: "iitm",
    institution: "Indian Institute of Technology Madras",
    abbr: "IIT M",
    program: "Bachelor of Science",
    stream: "Data Science & Applications",
    duration: "2024 – 2028",
    status: "Currently Pursuing",
    color: "#4f46e5",
    accentLight: "rgba(79,70,229,0.08)",
    accentBorder: "rgba(79,70,229,0.2)",
    description:
      "Developing a rigorous foundation in data science, analytics, machine learning, and computational thinking to design intelligent, scalable enterprise systems.",
    focus: [
      "Machine Learning",
      "Data Science",
      "Statistics",
      "Algorithms",
      "Data Engineering",
      "Artificial Intelligence",
    ],
    illustrationType: "nodes" as const,
  },
];

const highlights = [
  { value: "Dual Degree", label: "Programme", sub: "2024 – 2028" },
  { value: "2", label: "Institutions", sub: "VIT + IIT Madras" },
  { value: "AI & Data", label: "Specialisation", sub: "Core Focus" },
  { value: "Parallel", label: "Enterprise Experience", sub: "Production systems" },
];

/* ─── Circuit illustration ─────────────────────────── */
function CircuitIllustration({ color }: { color: string }) {
  return (
    <svg viewBox="0 0 120 80" className="w-full h-full" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Main PCB trace lines */}
      {[
        "M10 40 H35 V20 H70 V40 H95 V60 H70 V40",
        "M35 20 V10 H90 V20",
        "M70 60 H110",
        "M10 40 V65 H50 V60",
      ].map((d, i) => (
        <motion.path
          key={i} d={d}
          stroke={color} strokeWidth={1} strokeOpacity={0.3} strokeLinecap="round"
          initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
          transition={{ duration: 1.8, delay: i * 0.25, ease: "easeInOut" }}
        />
      ))}
      {/* Component pads */}
      {[
        [35, 20], [70, 20], [70, 40], [35, 40], [70, 60], [50, 60],
      ].map(([cx, cy], i) => (
        <motion.g key={i} initial={{ opacity: 0, scale: 0 }} animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4, delay: 0.8 + i * 0.1, type: "spring", stiffness: 300 }}>
          <circle cx={cx} cy={cy} r={4} fill="white" stroke={color} strokeWidth={1} strokeOpacity={0.5} />
          <circle cx={cx} cy={cy} r={1.5} fill={color} fillOpacity={0.7} />
        </motion.g>
      ))}
      {/* Pulsing signal */}
      <motion.circle r={2.5} fill={color} fillOpacity={0.8}
        animate={{ offsetDistance: ["0%", "100%"] }}
        style={{ offsetPath: "path('M10 40 H35 V20 H70 V40 H95')" } as React.CSSProperties}
        transition={{ duration: 3, repeat: Infinity, ease: "linear", repeatDelay: 1 }}
      />
    </svg>
  );
}

/* ─── Node graph illustration ──────────────────────── */
const graphNodes = [
  { x: 60, y: 40, r: 10, primary: true },
  { x: 20, y: 20, r: 6, primary: false },
  { x: 100, y: 20, r: 6, primary: false },
  { x: 20, y: 60, r: 6, primary: false },
  { x: 100, y: 60, r: 6, primary: false },
  { x: 40, y: 10, r: 4, primary: false },
  { x: 80, y: 70, r: 4, primary: false },
];
const graphEdges = [[0,1],[0,2],[0,3],[0,4],[1,5],[4,6],[1,3],[2,4]];

function NodeIllustration({ color }: { color: string }) {
  return (
    <svg viewBox="0 0 120 80" className="w-full h-full" fill="none" xmlns="http://www.w3.org/2000/svg">
      {graphEdges.map(([a, b], i) => (
        <motion.line key={i}
          x1={graphNodes[a].x} y1={graphNodes[a].y}
          x2={graphNodes[b].x} y2={graphNodes[b].y}
          stroke={color} strokeWidth={1} strokeOpacity={0.25}
          initial={{ pathLength: 0, opacity: 0 }} animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 1.2, delay: i * 0.12 }}
        />
      ))}
      {graphNodes.map((n, i) => (
        <motion.g key={i} initial={{ scale: 0, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.5 + i * 0.1, type: "spring", stiffness: 280 }}>
          <circle cx={n.x} cy={n.y} r={n.r + 3} fill={color} fillOpacity={0.06} />
          <circle cx={n.x} cy={n.y} r={n.r} fill="white" stroke={color}
            strokeWidth={n.primary ? 1.5 : 1} strokeOpacity={n.primary ? 0.6 : 0.35} />
          <circle cx={n.x} cy={n.y} r={n.r * 0.38} fill={color} fillOpacity={n.primary ? 0.8 : 0.5} />
        </motion.g>
      ))}
      {/* Animated travelling dot */}
      <motion.circle r={2} fill={color} fillOpacity={0.9}
        animate={{ x: [20,60,100,60,20], y: [20,40,20,40,60] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      />
    </svg>
  );
}

/* ─── Mouse-reactive tilt card ─────────────────────── */
function DegreeCard({ degree, index }: { degree: typeof degrees[0]; index: number }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.5);
  const springX = useSpring(mouseX, { stiffness: 60, damping: 20 });
  const springY = useSpring(mouseY, { stiffness: 60, damping: 20 });
  const rotateX = useTransform(springY, [0, 1], [6, -6]);
  const rotateY = useTransform(springX, [0, 1], [-6, 6]);

  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;
    const onMove = (e: MouseEvent) => {
      const r = card.getBoundingClientRect();
      mouseX.set((e.clientX - r.left) / r.width);
      mouseY.set((e.clientY - r.top) / r.height);
    };
    const onLeave = () => { mouseX.set(0.5); mouseY.set(0.5); };
    card.addEventListener("mousemove", onMove);
    card.addEventListener("mouseleave", onLeave);
    return () => { card.removeEventListener("mousemove", onMove); card.removeEventListener("mouseleave", onLeave); };
  }, [mouseX, mouseY]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 48, filter: "blur(8px)" }}
      animate={inView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
      transition={{ duration: 0.8, delay: index * 0.18, ease: [0.25, 0.4, 0.25, 1] }}
      className="relative"
    >
      {/* Outer glow */}
      <motion.div
        className="absolute inset-0 rounded-3xl"
        style={{ background: `radial-gradient(ellipse at 50% 0%, ${degree.color}18, transparent 70%)` }}
        animate={{ opacity: [0.5, 0.8, 0.5] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: index * 1.5 }}
      />

      <motion.div
        ref={cardRef}
        style={{ rotateX, rotateY, transformPerspective: 900, transformStyle: "preserve-3d" }}
        className="relative rounded-3xl overflow-hidden"
        whileHover={{ scale: 1.012 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
      >
        {/* Glass surface */}
        <div
          className="relative p-8 rounded-3xl"
          style={{
            background: "rgba(255,255,255,0.62)",
            backdropFilter: "blur(28px) saturate(180%)",
            WebkitBackdropFilter: "blur(28px) saturate(180%)",
            border: "1px solid rgba(255,255,255,0.78)",
            boxShadow: `0 8px 40px rgba(0,0,0,0.08), 0 2px 0 rgba(255,255,255,0.9) inset, 0 0 0 1px ${degree.accentBorder}`,
          }}
        >
          {/* Shimmer top edge */}
          <div className="absolute top-0 left-10 right-10 h-px"
            style={{ background: "linear-gradient(to right, transparent, rgba(255,255,255,0.9), transparent)" }} />

          {/* Color accent top bar */}
          <div className="absolute top-0 left-0 right-0 h-0.5 rounded-t-3xl"
            style={{ background: `linear-gradient(to right, transparent, ${degree.color}60, transparent)` }} />

          {/* Header row */}
          <div className="flex items-start justify-between gap-6 mb-6">
            <div className="flex flex-col gap-2">
              {/* Institution badge */}
              <div className="flex items-center gap-3">
                {/* Circular glass logo container */}
                <motion.div
                  className="w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0 shadow-[0_4px_16px_rgba(0,0,0,0.1)]"
                  style={{
                    background: `linear-gradient(135deg, ${degree.color}18, ${degree.color}08)`,
                    border: `1.5px solid ${degree.color}30`,
                  }}
                  animate={{ boxShadow: [`0 4px 16px ${degree.color}20`, `0 4px 24px ${degree.color}40`, `0 4px 16px ${degree.color}20`] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                >
                  <span className="text-[10px] font-black leading-tight text-center" style={{ color: degree.color }}>
                    {degree.abbr.split(" ").map((w, i) => <span key={i} className="block">{w}</span>)}
                  </span>
                </motion.div>
                <div>
                  <p className="text-[11px] font-bold text-gray-400 uppercase tracking-widest leading-tight">{degree.program}</p>
                  <h3 className="text-base font-bold text-gray-900 leading-snug">{degree.stream}</h3>
                </div>
              </div>
              <p className="text-sm text-gray-500 leading-tight ml-15">{degree.institution}</p>
            </div>

            {/* Mini illustration */}
            <div className="w-28 h-16 flex-shrink-0 opacity-70">
              {degree.illustrationType === "circuit"
                ? <CircuitIllustration color={degree.color} />
                : <NodeIllustration color={degree.color} />
              }
            </div>
          </div>

          {/* Duration pill */}
          <div className="flex items-center gap-2 mb-5">
            <span
              className="flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-semibold"
              style={{ background: degree.accentLight, border: `1px solid ${degree.accentBorder}`, color: degree.color }}
            >
              <motion.span
                className="w-1.5 h-1.5 rounded-full flex-shrink-0"
                style={{ background: degree.color }}
                animate={{ opacity: [1, 0.3, 1] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              />
              {degree.duration} · {degree.status}
            </span>
          </div>

          {/* Description */}
          <p className="text-sm text-gray-500 leading-relaxed mb-6">{degree.description}</p>

          {/* Focus areas */}
          <div>
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-3">Focus Areas</p>
            <div className="flex flex-wrap gap-1.5">
              {degree.focus.map((area, i) => (
                <motion.span
                  key={area}
                  initial={{ opacity: 0, scale: 0.85 }}
                  animate={inView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ duration: 0.3, delay: 0.5 + index * 0.18 + i * 0.04 }}
                  className="chip text-[10px]"
                  style={{
                    background: `${degree.color}0d`,
                    borderColor: `${degree.color}22`,
                    color: degree.color === "#00c6ff" ? "#0077aa" : degree.color,
                  }}
                >
                  {area}
                </motion.span>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

/* ─── Animated timeline spine ───────────────────────── */
function TimelineSpine() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 80%", "end 20%"] });
  const scaleY = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <div ref={ref} className="hidden lg:flex absolute left-1/2 top-0 bottom-0 -translate-x-1/2 flex-col items-center pointer-events-none">
      {/* Top node */}
      <motion.div
        className="w-3 h-3 rounded-full flex-shrink-0 mt-10"
        style={{ background: "linear-gradient(135deg, #0066ff, #4f46e5)" }}
        animate={{ boxShadow: ["0 0 0 0 rgba(0,102,255,0.3)", "0 0 0 8px rgba(0,102,255,0)", "0 0 0 0 rgba(0,102,255,0)"] }}
        transition={{ duration: 2.5, repeat: Infinity }}
      />
      {/* Growing line */}
      <div className="flex-1 w-px my-2 overflow-hidden origin-top">
        <motion.div
          className="w-full h-full origin-top"
          style={{
            scaleY,
            background: "linear-gradient(to bottom, #0066ff60, #4f46e560, #0066ff30)",
          }}
        />
      </div>
      {/* Middle connector node */}
      <motion.div
        className="w-4 h-4 rounded-full flex-shrink-0 my-1"
        style={{
          background: "white",
          border: "2px solid",
          borderColor: "#4f46e5",
          boxShadow: "0 0 0 4px rgba(79,70,229,0.12)",
        }}
        animate={{ scale: [1, 1.15, 1] }}
        transition={{ duration: 2, repeat: Infinity, delay: 1 }}
      />
      <div className="flex-1 w-px my-2 overflow-hidden origin-top">
        <motion.div
          className="w-full h-full origin-top"
          style={{
            scaleY,
            background: "linear-gradient(to bottom, #4f46e560, #0066ff40)",
          }}
        />
      </div>
      {/* Bottom node */}
      <motion.div
        className="w-3 h-3 rounded-full flex-shrink-0 mb-10"
        style={{ background: "linear-gradient(135deg, #4f46e5, #00c6ff)" }}
        animate={{ boxShadow: ["0 0 0 0 rgba(79,70,229,0.3)", "0 0 0 8px rgba(79,70,229,0)", "0 0 0 0 rgba(79,70,229,0)"] }}
        transition={{ duration: 2.5, repeat: Infinity, delay: 1.25 }}
      />
    </div>
  );
}

/* ─── Continuous learning panel ─────────────────────── */
function ContinuousLearning() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 32 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, ease: [0.25, 0.4, 0.25, 1] }}
      className="mt-16 grid md:grid-cols-[1fr_320px] gap-5"
    >
      {/* Learning philosophy */}
      <div
        className="rounded-3xl p-8 relative overflow-hidden"
        style={{
          background: "rgba(255,255,255,0.55)",
          backdropFilter: "blur(24px) saturate(180%)",
          WebkitBackdropFilter: "blur(24px) saturate(180%)",
          border: "1px solid rgba(255,255,255,0.75)",
          boxShadow: "0 4px 24px rgba(0,0,0,0.06), inset 0 1px 0 rgba(255,255,255,0.85)",
        }}
      >
        <div className="absolute -top-8 -right-8 w-32 h-32 rounded-full opacity-10"
          style={{ background: "radial-gradient(circle, #0066ff, transparent)" }} />
        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-3">Continuous Learning</p>
        <h4 className="text-lg font-bold text-gray-900 mb-3 relative z-10">Engineering evolves continuously.</h4>
        <p className="text-sm text-gray-500 leading-relaxed relative z-10">
          My primary growth comes from building production systems and enterprise platforms. Beyond formal education,
          I actively expand my knowledge through academic coursework at two institutions, independent research,
          technical documentation, and hands-on experimentation with emerging AI and data systems.
        </p>
        <p className="text-sm text-gray-500 leading-relaxed mt-3 relative z-10">
          Studying Electronics & Communication Engineering alongside Data Science creates a rare intersection —
          hardware intuition, statistical rigour, and software craftsmanship working together.
        </p>
      </div>

      {/* Certifications status */}
      <div
        className="rounded-3xl p-7 flex flex-col gap-4"
        style={{
          background: "rgba(255,255,255,0.55)",
          backdropFilter: "blur(24px) saturate(180%)",
          WebkitBackdropFilter: "blur(24px) saturate(180%)",
          border: "1px solid rgba(255,255,255,0.75)",
          boxShadow: "0 4px 24px rgba(0,0,0,0.06), inset 0 1px 0 rgba(255,255,255,0.85)",
        }}
      >
        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Professional Certifications</p>

        <div className="flex items-center gap-2.5">
          <motion.div
            className="w-2 h-2 rounded-full flex-shrink-0"
            style={{ background: "#f59e0b" }}
            animate={{ opacity: [1, 0.4, 1] }}
            transition={{ duration: 1.8, repeat: Infinity }}
          />
          <span className="text-sm font-semibold text-amber-600">Currently In Progress</span>
        </div>

        <p className="text-sm text-gray-500 leading-relaxed">
          Focused on gaining practical production experience across AI systems, cloud platforms,
          and enterprise data infrastructure. Certifications will be listed here as they are completed.
        </p>

        <div className="flex flex-wrap gap-1.5 pt-1">
          {["Cloud Platforms", "AI Engineering", "Data Platforms", "Enterprise Architecture"].map((area) => (
            <span key={area}
              className="text-[10px] font-medium px-3 py-1 rounded-full"
              style={{ background: "rgba(245,158,11,0.08)", border: "1px solid rgba(245,158,11,0.2)", color: "#b45309" }}
            >
              {area}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

/* ─── Highlight strip ───────────────────────────────── */
function HighlightStrip() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay: 0.1 }}
      className="mt-14 rounded-3xl p-6"
      style={{
        background: "rgba(255,255,255,0.5)",
        backdropFilter: "blur(20px) saturate(160%)",
        WebkitBackdropFilter: "blur(20px) saturate(160%)",
        border: "1px solid rgba(255,255,255,0.72)",
        boxShadow: "0 4px 20px rgba(0,0,0,0.05), inset 0 1px 0 rgba(255,255,255,0.85)",
      }}
    >
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {highlights.map(({ value, label, sub }, i) => (
          <motion.div
            key={label}
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.15 + i * 0.08 }}
            className="flex flex-col items-center text-center gap-1"
          >
            <span className="text-lg font-bold gradient-text leading-tight">{value}</span>
            <span className="text-[11px] font-bold text-gray-700">{label}</span>
            <span className="text-[10px] text-gray-400">{sub}</span>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}

/* ─── Section ───────────────────────────────────────── */
export function Education() {
  return (
    <section id="education" className="section-pad relative">
      {/* Subtle background tint */}
      <div className="absolute inset-0 -z-10 pointer-events-none"
        style={{ background: "radial-gradient(ellipse 80% 50% at 50% 60%, rgba(79,70,229,0.05) 0%, transparent 70%)" }} />

      <div className="max-w-7xl mx-auto px-6 lg:px-12">

        {/* Header */}
        <FadeIn>
          <div className="flex flex-col gap-2 mb-18">
            <span className="chip w-fit">Education</span>
            <h2 className="text-headline gradient-text-soft">
              Academic
              <br />
              Foundations.
            </h2>
            <p className="text-base text-gray-500 max-w-2xl leading-relaxed mt-2">
              Building a multidisciplinary foundation across Electronics, Computer Engineering,
              Artificial Intelligence, and Data Science — while simultaneously contributing to
              enterprise AI products in production.
            </p>
          </div>
        </FadeIn>

        {/* Timeline cards */}
        <div className="relative">
          <TimelineSpine />

          <div className="grid lg:grid-cols-2 gap-8 relative z-10">
            {degrees.map((degree, i) => (
              <DegreeCard key={degree.id} degree={degree} index={i} />
            ))}
          </div>
        </div>

        {/* Highlight strip */}
        <HighlightStrip />

        {/* Continuous learning */}
        <ContinuousLearning />

      </div>
    </section>
  );
}
