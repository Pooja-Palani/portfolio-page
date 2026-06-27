"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { FadeIn } from "@/components/animations/FadeIn";

/* ─── Journey chapters ─── */
const chapters = [
  {
    year: "2024",
    era: "Building My Foundation",
    company: "Crackube",
    role: "Software Engineering Intern → Product Engineer",
    color: "#0066ff",
    paragraphs: [
      "My professional journey began as a Software Engineering Intern at Crackube, where I gained hands-on experience shipping production features, collaborating within engineering teams, and learning how real software development lifecycles operate.",
      "As my responsibilities grew I transitioned into a Product Engineer role, contributing to a large-scale crypto mining game platform. Working alongside architecture and cloud engineering teams, I gained practical experience with scalable backend systems, AWS infrastructure, deployment workflows, and production system design — shaping my understanding that great software is as much about architecture and reliability as it is about code.",
    ],
  },
  {
    year: "Early 2025",
    era: "Enterprise Data, Governance & AI",
    company: "Torro AI Pte. Ltd.",
    role: "Product Full-Stack Engineer",
    color: "#4f46e5",
    paragraphs: [
      "In early 2025 my interests shifted toward enterprise software, data governance, and intelligent systems. Joining Torro AI in Singapore, I contributed to a governance-first platform focused on compliance, privacy, and enterprise data management.",
      "My work extended beyond feature development — participating in product demonstrations, building Power BI dashboards, and translating complex governance requirements into production-ready capabilities. Over time my role expanded into designing larger platform capabilities rather than individual features.",
    ],
  },
  {
    year: "2025",
    era: "Building Products Beyond Engineering",
    company: "QVANTO",
    role: "Co-Founder",
    color: "#00c6ff",
    paragraphs: [
      "As I developed a deeper understanding of enterprise governance challenges, I co-founded QVANTO — positioning it as a solutions partner working alongside Torro AI to build enterprise-grade software for regulated industries.",
      "This marked a transition from contributing to products to helping shape product direction, architecture, and long-term technical strategy.",
    ],
  },
  {
    year: "Today",
    era: "AI Innovation & Enterprise Platforms",
    company: "Torro AI + QVANTO",
    role: "AI & Platform Engineer",
    color: "#6366f1",
    paragraphs: [
      "At Torro AI, recent work includes reimagining platform capabilities with agentic AI workflows, designing and building an enterprise Insight Agent powered by a semantic reasoning model, and developing a unified Data Quality platform featuring multi-dimensional scoring, an intelligent quality engine, and an interactive Data Quality Matrix.",
      "At QVANTO, I contribute to enterprise solutions for BFSI — governance, compliance, and data management — alongside retail technology platforms, product architecture, and AI-driven solution design.",
    ],
  },
];

/* ─── Evolving capability stack ─── */
const evolutionSteps = [
  { label: "Software Engineering",       year: "2024",   color: "#0066ff" },
  { label: "Cloud & Platform Engineering", year: "2024", color: "#2255dd" },
  { label: "Enterprise Governance",      year: "2025",   color: "#4f46e5" },
  { label: "AI Systems",                 year: "2025",   color: "#5b4beb" },
  { label: "Agentic Workflows",          year: "2025",   color: "#00c6ff" },
  { label: "Data Intelligence",          year: "Now",    color: "#0066ff" },
];

/* ─── Focus areas ─── */
const focusAreas = [
  "Artificial Intelligence",
  "Agentic Systems",
  "Enterprise Software Engineering",
  "Data Governance & Privacy",
  "Data Quality Engineering",
  "Platform Architecture",
  "Full-Stack Product Development",
  "Regulated Industries",
];

function ChapterItem({ chapter, index }: { chapter: typeof chapters[0]; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const isLast = index === chapters.length - 1;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: -24 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.65, delay: index * 0.1 }}
      className="relative flex gap-7"
    >
      {/* Timeline spine */}
      <div className="flex flex-col items-center flex-shrink-0">
        <motion.div
          initial={{ scale: 0 }}
          animate={inView ? { scale: 1 } : {}}
          transition={{ duration: 0.45, delay: index * 0.1 + 0.15, type: "spring", stiffness: 300 }}
          className="w-11 h-11 rounded-2xl flex items-center justify-center shadow-[0_4px_16px_rgba(0,0,0,0.1)]"
          style={{
            background: `linear-gradient(135deg, ${chapter.color}22, ${chapter.color}10)`,
            border: `1.5px solid ${chapter.color}35`,
          }}
        >
          <span className="text-[9px] font-black leading-tight text-center" style={{ color: chapter.color }}>
            {chapter.year.split(" ").map((w, i) => <span key={i} className="block">{w}</span>)}
          </span>
        </motion.div>
        {!isLast && (
          <motion.div
            initial={{ scaleY: 0 }}
            animate={inView ? { scaleY: 1 } : {}}
            transition={{ duration: 0.9, delay: index * 0.1 + 0.35 }}
            className="w-px flex-1 mt-3 mb-0 origin-top"
            style={{ background: `linear-gradient(to bottom, ${chapter.color}40, ${chapter.color}08)` }}
          />
        )}
      </div>

      {/* Content */}
      <div className={`flex-1 ${isLast ? "pb-0" : "pb-12"}`}>
        {/* Chapter header */}
        <div className="flex flex-wrap items-start gap-x-3 gap-y-1 mb-3">
          <h3 className="text-base font-bold text-gray-900 leading-tight">{chapter.era}</h3>
          <span
            className="chip text-[10px] mt-0.5"
            style={{
              background: `${chapter.color}10`,
              borderColor: `${chapter.color}25`,
              color: chapter.color === "#00c6ff" ? "#0077aa" : chapter.color,
            }}
          >
            {chapter.company}
          </span>
        </div>
        <p className="text-[11px] font-semibold text-gray-400 uppercase tracking-widest mb-3">{chapter.role}</p>
        {chapter.paragraphs.map((para, pi) => (
          <p key={pi} className={`text-sm text-gray-500 leading-relaxed ${pi < chapter.paragraphs.length - 1 ? "mb-3" : ""}`}>
            {para}
          </p>
        ))}
      </div>
    </motion.div>
  );
}

function EvolutionStep({ step, index }: { step: typeof evolutionSteps[0]; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const isLast = index === evolutionSteps.length - 1;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={inView ? { opacity: 1, scale: 1 } : {}}
      transition={{ duration: 0.4, delay: index * 0.08 }}
      className="flex flex-col items-center"
    >
      <div
        className="w-full text-center px-4 py-2.5 rounded-xl text-xs font-semibold"
        style={{
          background: `${step.color}0d`,
          border: `1px solid ${step.color}28`,
          color: step.color === "#00c6ff" ? "#0077aa" : step.color,
        }}
      >
        {step.label}
      </div>
      {!isLast && (
        <motion.div
          initial={{ scaleY: 0, opacity: 0 }}
          animate={inView ? { scaleY: 1, opacity: 1 } : {}}
          transition={{ duration: 0.4, delay: index * 0.08 + 0.2 }}
          className="flex flex-col items-center py-1 origin-top"
        >
          <div className="w-px h-4" style={{ background: `linear-gradient(to bottom, ${step.color}50, ${evolutionSteps[index + 1].color}30)` }} />
          <div className="w-0 h-0" style={{ borderLeft: "4px solid transparent", borderRight: "4px solid transparent", borderTop: `5px solid ${step.color}50` }} />
        </motion.div>
      )}
    </motion.div>
  );
}

export function About() {
  return (
    <section id="about" className="section-pad">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">

        {/* ── Header ── */}
        <FadeIn>
          <div className="flex flex-col gap-2 mb-20">
            <span className="chip w-fit">My Journey</span>
            <h2 className="text-headline gradient-text-soft">
              From first commit to
              <br />
              enterprise AI.
            </h2>
            <p className="text-base text-gray-500 max-w-xl leading-relaxed mt-2">
              A story of deliberate growth — moving from shipping features to designing
              intelligent enterprise systems.
            </p>
          </div>
        </FadeIn>

        {/* ── Main layout: Journey left, Evolution + Focus right ── */}
        <div className="grid lg:grid-cols-[1fr_360px] gap-16 items-start">

          {/* Left — Story chapters */}
          <div>
            {chapters.map((chapter, i) => (
              <ChapterItem key={chapter.era} chapter={chapter} index={i} />
            ))}

            {/* Terminal pulse */}
            <div className="flex gap-7 mt-1 items-center pl-0">
              <div className="w-11 flex justify-center">
                <motion.div
                  className="w-3 h-3 rounded-full"
                  style={{ background: "linear-gradient(135deg, #0066ff, #00c6ff)" }}
                  animate={{ scale: [1, 1.4, 1], opacity: [0.5, 1, 0.5] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
              </div>
              <p className="text-sm text-gray-400 font-medium">Building. Shipping. Growing.</p>
            </div>
          </div>

          {/* Right column */}
          <div className="flex flex-col gap-6 lg:sticky lg:top-28">

            {/* Evolution stack */}
            <FadeIn direction="right">
              <div className="glass-card rounded-3xl p-7">
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-5">
                  How my thinking evolved
                </p>
                <div className="flex flex-col gap-0">
                  {evolutionSteps.map((step, i) => (
                    <EvolutionStep key={step.label} step={step} index={i} />
                  ))}
                </div>
                <p className="text-[11px] text-gray-400 mt-5 leading-relaxed">
                  Each layer built on the one before — from code to systems, from systems to governance, from governance to intelligence.
                </p>
              </div>
            </FadeIn>

            {/* Current focus */}
            <FadeIn direction="right" delay={0.15}>
              <div className="glass-card rounded-3xl p-7 relative overflow-hidden">
                <div
                  className="absolute -top-6 -right-6 w-24 h-24 rounded-full opacity-15"
                  style={{ background: "radial-gradient(circle, #0066ff, transparent)" }}
                />
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-4 relative z-10">
                  Current Focus
                </p>
                <div className="flex flex-wrap gap-1.5 relative z-10">
                  {focusAreas.map((area) => (
                    <span key={area} className="chip text-[10px]">{area}</span>
                  ))}
                </div>
                <div className="mt-6 pt-5 border-t border-gray-100 relative z-10">
                  <p className="text-sm text-gray-500 leading-relaxed italic">
                    &ldquo;Engineering is no longer just about implementing features. It&rsquo;s about designing systems that help organisations make better decisions with trustworthy data, modern AI, and thoughtful product experiences.&rdquo;
                  </p>
                </div>
              </div>
            </FadeIn>

          </div>
        </div>
      </div>
    </section>
  );
}
