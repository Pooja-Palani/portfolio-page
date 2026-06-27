"use client";

import { useState, useEffect } from "react";
import { pauseLenis, resumeLenis } from "@/components/ui/SmoothScroll";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronRight, X, Brain, Database, ShieldCheck, ShoppingBag } from "lucide-react";
import { FadeIn } from "@/components/animations/FadeIn";
import { FlowDiagram } from "@/components/animations/FlowDiagram";

const works = [
  {
    id: "agentic-data-intelligence",
    icon: Brain,
    color: "#0066ff",
    tag: "AI Engineering",
    number: "01",
    title: "Agentic Data Intelligence Platform",
    subtitle: "Natural Language Analytics for Enterprise CRM",
    summary:
      "An AI-powered natural language analytics capability enabling business users to explore enterprise CRM data using plain English. The platform transforms conversational questions into governed database queries while maintaining explainability, traceability, and enterprise-grade security.",
    overview:
      "This platform bridges the gap between business users and complex enterprise data by enabling natural language interaction with CRM systems. Designed for regulated environments where every query must be auditable, the system prioritises explainability and security without sacrificing usability.",
    role: "End-to-end design and development of the agent orchestration layer, semantic query caching system, security validation pipeline, and production API surface. Also contributed to the frontend conversational interface.",
    contributions: [
      "Designed the agent orchestration workflow using a modular multi-stage execution pipeline that separates intent parsing, query generation, validation, and execution into distinct, testable stages.",
      "Built a semantic query layer that improves consistency and performance by reusing validated query patterns instead of regenerating responses from scratch for semantically equivalent questions.",
      "Implemented secure query validation, execution safeguards, and audit-friendly reasoning workflows suitable for regulated enterprise environments.",
      "Developed production APIs and frontend integrations supporting real-time conversational analytics with streaming response delivery.",
    ],
    outcomes: [
      "Enabled non-technical business users to self-serve CRM analytics without SQL knowledge",
      "Reduced time-to-insight for routine CRM queries from hours to seconds",
      "Built audit trail ensuring every AI-generated query is reviewable and explainable",
      "Semantic caching layer significantly improved response consistency for repeated query patterns",
    ],
    tags: ["Python", "LangGraph", "FastAPI", "PostgreSQL", "Ollama", "Next.js", "React Query"],
    flow: {
      steps: [
        "Natural Language Input",
        "Agent Pipeline",
        "Semantic Layer",
        "Query Validation",
        "Database Execution",
        "Business Insights",
      ],
      color: "#0066ff",
    },
  },
  {
    id: "data-quality-platform",
    icon: Database,
    color: "#4f46e5",
    tag: "Enterprise Architecture",
    number: "02",
    title: "Enterprise Data Quality Platform",
    subtitle: "Governance-First Quality Intelligence for Enterprise Assets",
    summary:
      "Core capabilities of a governance-first Data Quality platform helping organizations monitor, prioritize, and improve data quality across enterprise assets through intelligent scoring, operational workflows, and interactive governance tooling.",
    overview:
      "Enterprise data estates suffer from fragmented quality signals, inconsistent standards, and no unified operational layer for governance teams. This platform addresses that by providing a structured quality intelligence system built for analyst workflows and enterprise scale.",
    role: "Led the design and implementation of the quality scoring engine, monitoring capabilities, and the Data Quality Matrix — the primary analyst interface for governance operations.",
    contributions: [
      "Developed configurable data quality scoring across multiple governance dimensions — completeness, consistency, timeliness, uniqueness — with per-asset and portfolio-level rollup.",
      "Built intelligent monitoring capabilities for identifying quality degradation, surfacing operational risks, and triggering governed response workflows.",
      "Designed an interactive Data Quality Matrix enabling analysts to prioritize assets, review governance metadata, and perform bulk operational actions efficiently across large data estates.",
      "Delivered scalable backend services and responsive frontend components supporting large enterprise datasets with performant table rendering and filtering.",
    ],
    outcomes: [
      "Unified quality visibility across fragmented enterprise data assets",
      "Enabled governance teams to self-serve quality reviews without engineering support",
      "Bulk operational tooling reduced manual governance effort for large asset inventories",
      "Configurable scoring dimensions supported diverse organizational quality standards",
    ],
    tags: ["Python", "FastAPI", "PostgreSQL", "SQLAlchemy", "Next.js", "TanStack Table", "React Query"],
    flow: {
      steps: [
        "Enterprise Assets",
        "Quality Evaluation",
        "Risk Prioritization",
        "Governance Actions",
        "Operational Improvements",
      ],
      color: "#4f46e5",
    },
  },
  {
    id: "governance-automation",
    icon: ShieldCheck,
    color: "#00c6ff",
    tag: "Platform Engineering",
    number: "03",
    title: "Governance Automation Platform",
    subtitle: "Unified Compliance & Policy Lifecycle for Regulated Industries",
    summary:
      "Governance capabilities connecting privacy policies, metadata management, approval workflows, and enterprise data governance into a unified operational experience. Built for regulated industries where governance must be enforced, not just documented.",
    overview:
      "Governance in large enterprises breaks down when policies live in one system, metadata in another, and approvals in email chains. This platform unifies the governance lifecycle into a single operational layer — from policy configuration through to audit-ready enforcement.",
    role: "Designed and built the privacy policy management system, approval workflow automation, metadata tagging engine, and integrations with external enterprise data platforms.",
    contributions: [
      "Implemented configurable privacy policy management supporting fine-grained data governance — enabling teams to define policies at column, table, and domain levels with rule inheritance.",
      "Built workflow automation for governed approval lifecycles — routing access requests, data usage approvals, and policy exceptions through configurable team hierarchies.",
      "Designed metadata tagging capabilities enabling governance context — classifications, policies, ownership — to flow consistently across enterprise assets and downstream consumers.",
      "Integrated governance workflows with external enterprise platforms including DataHub for metadata, Starburst SEP for governed query access, and LDAP for identity resolution.",
    ],
    outcomes: [
      "Replaced manual, email-driven approval workflows with auditable automated pipelines",
      "Governance policies enforceable at the asset level rather than relying on process compliance",
      "Metadata context flowed consistently across previously siloed enterprise tools",
      "Audit trail enabled compliance teams to review governance decisions without engineering involvement",
    ],
    tags: ["Python", "FastAPI", "PostgreSQL", "LDAP", "DataHub", "Starburst SEP", "Next.js"],
    flow: {
      steps: [
        "Metadata",
        "Governance Policies",
        "Approval Workflow",
        "Compliance Enforcement",
        "Audit Trail",
      ],
      color: "#00c6ff",
    },
  },
  {
    id: "qmarket-commerce",
    icon: ShoppingBag,
    color: "#6366f1",
    tag: "Full-Stack Engineering",
    number: "04",
    title: "QMarket Community Commerce Platform",
    subtitle: "Multi-Tenant Commerce Architecture for Community Marketplaces",
    summary:
      "Core platform contributions to a multi-tenant commerce system supporting community-driven marketplaces, seller operations, administrative governance, and both B2C and B2B commerce experiences within a unified architecture.",
    overview:
      "Community commerce platforms face a unique engineering challenge: the same underlying system must support radically different personas — community buyers, individual sellers, business buyers, and platform administrators — each with distinct workflows and permissions, all within a multi-tenant architecture.",
    role: "Contributed across the full stack — backend services, API design, database schema, and frontend modules — across buyer, seller, administrator, and B2B commerce experiences.",
    contributions: [
      "Built core marketplace capabilities supporting community-specific and public commerce experiences, including product discovery, listing management, and transaction orchestration.",
      "Implemented scalable seller workflows covering inventory management, order fulfilment, seller analytics, and administrative tooling for marketplace governance.",
      "Developed B2B commerce capabilities including RFQ and quotation workflows, business account onboarding, and taxation configuration supporting enterprise procurement scenarios.",
      "Designed reusable backend service modules and composable frontend components enabling consistent behaviour across buyer, seller, and administrator contexts within a shared platform.",
    ],
    outcomes: [
      "Unified platform architecture reduced duplication across buyer, seller, and admin experiences",
      "B2B quotation and RFQ workflows enabled enterprise procurement use cases previously unsupported",
      "Reusable service and UI modules accelerated feature delivery across platform personas",
      "Multi-tenant data model supported community-specific configurations without divergent codebases",
    ],
    tags: ["TypeScript", "Node.js", "Express", "PostgreSQL", "Drizzle ORM", "React", "TanStack Query"],
    flow: {
      steps: [
        "Communities",
        "Marketplace",
        "Seller Platform",
        "Buyer Experience",
        "Administration",
        "Business Operations",
      ],
      color: "#6366f1",
    },
  },
];

type WorkItem = typeof works[0];

function WorkCard({ work, index, onClick }: { work: WorkItem; index: number; onClick: () => void }) {
  return (
    <FadeIn delay={index * 0.1} direction="up">
      <motion.button
        onClick={onClick}
        data-cursor="hover"
        className="text-left glass-card rounded-3xl p-8 w-full group relative overflow-hidden"
        whileHover={{ y: -6 }}
        transition={{ type: "spring", stiffness: 400, damping: 30 }}
      >
        {/* Top row: icon left, number + chevron right */}
        <div className="flex items-start justify-between mb-5">
          <div
            className="w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0"
            style={{ background: `${work.color}15`, border: `1px solid ${work.color}25` }}
          >
            <work.icon size={20} style={{ color: work.color }} />
          </div>
          <div className="flex items-center gap-2.5">
            <span
              className="text-xs font-mono font-bold select-none"
              style={{ color: `${work.color}55` }}
            >
              {work.number}
            </span>
            <ChevronRight
              size={16}
              className="group-hover:translate-x-1 transition-transform duration-200"
              style={{ color: `${work.color}60` }}
            />
          </div>
        </div>

        <span className="chip text-[10px] mb-3" style={{ color: work.color, borderColor: `${work.color}25`, background: `${work.color}0d` }}>
          {work.tag}
        </span>

        <h3 className="text-lg font-bold text-gray-900 mb-1">{work.title}</h3>
        <p className="text-sm font-medium mb-3" style={{ color: work.color }}>{work.subtitle}</p>
        <p className="text-sm text-gray-500 leading-relaxed line-clamp-3">{work.summary}</p>

        {/* Tech tags */}
        <div className="flex flex-wrap gap-1.5 mt-5">
          {work.tags.slice(0, 4).map((t) => (
            <span key={t} className="chip text-[10px]">{t}</span>
          ))}
          {work.tags.length > 4 && (
            <span className="chip text-[10px]">+{work.tags.length - 4}</span>
          )}
        </div>
      </motion.button>
    </FadeIn>
  );
}

function WorkModal({ work, onClose }: { work: WorkItem; onClose: () => void }) {
  useEffect(() => {
    pauseLenis();
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", onKey);
    return () => {
      resumeLenis();
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [onClose]);

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8"
      style={{ cursor: "default" }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {/* Backdrop */}
      <motion.div
        className="absolute inset-0 bg-black/30 backdrop-blur-md"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        style={{ cursor: "default" }}
      />

      {/* Panel — wider, scroll prevented from leaking to page */}
      <motion.div
        className="relative glass-strong rounded-3xl w-full max-w-4xl max-h-[90vh] overflow-y-auto shadow-[0_48px_120px_rgba(0,0,0,0.22)]"
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        {...{ "data-lenis-prevent": true } as any}
        style={{ cursor: "default", overscrollBehavior: "contain" }}
        initial={{ scale: 0.92, y: 48, opacity: 0 }}
        animate={{ scale: 1, y: 0, opacity: 1 }}
        exit={{ scale: 0.92, y: 48, opacity: 0 }}
        transition={{ type: "spring", damping: 26, stiffness: 320 }}
        onWheel={(e) => e.stopPropagation()}
      >
        {/* Shimmer top */}
        <div className="absolute top-0 left-12 right-12 h-px bg-gradient-to-r from-transparent via-white/90 to-transparent" />

        {/* Close */}
        <button
          onClick={onClose}
          data-cursor="hover"
          className="absolute top-5 right-5 z-10 w-8 h-8 rounded-full glass-card flex items-center justify-center text-gray-400 hover:text-gray-900 transition-colors"
        >
          <X size={14} />
        </button>

        <div className="p-8 pt-10">
          {/* Header */}
          <div className="flex items-center gap-3 mb-4">
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
              style={{ background: `${work.color}15`, border: `1px solid ${work.color}25` }}
            >
              <work.icon size={18} style={{ color: work.color }} />
            </div>
            <span
              className="chip text-[10px]"
              style={{ color: work.color, borderColor: `${work.color}25`, background: `${work.color}0d` }}
            >
              {work.tag}
            </span>
            <span className="text-xs font-mono text-gray-300 ml-auto">{work.number}</span>
          </div>

          <h2 className="text-2xl font-bold text-gray-900 mb-1">{work.title}</h2>
          <p className="text-sm font-semibold mb-5" style={{ color: work.color }}>{work.subtitle}</p>

          {/* Flow Diagram */}
          <FlowDiagram steps={work.flow.steps} color={work.flow.color} />

          {/* Overview */}
          <div className="mt-7 mb-6">
            <Label>Overview</Label>
            <p className="text-sm text-gray-600 leading-relaxed">{work.overview}</p>
          </div>

          {/* Role */}
          <div className="mb-6">
            <Label>Role & Responsibilities</Label>
            <p className="text-sm text-gray-600 leading-relaxed">{work.role}</p>
          </div>

          {/* Contributions */}
          <div className="mb-6">
            <Label>Engineering Contributions</Label>
            <ul className="space-y-3">
              {work.contributions.map((c, i) => (
                <li key={i} className="flex gap-3 text-sm text-gray-600">
                  <motion.span
                    className="mt-1.5 w-1.5 h-1.5 rounded-full flex-shrink-0"
                    style={{ background: work.color }}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: i * 0.08 }}
                  />
                  <span className="leading-relaxed">{c}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Outcomes */}
          <div className="mb-7">
            <Label>Key Outcomes</Label>
            <div className="grid gap-2">
              {work.outcomes.map((o, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 + i * 0.07 }}
                  className="flex gap-3 items-start rounded-2xl px-4 py-3"
                  style={{ background: `${work.color}08`, border: `1px solid ${work.color}15` }}
                >
                  <span className="mt-0.5 text-base leading-none" style={{ color: work.color }}>↗</span>
                  <span className="text-sm text-gray-700 leading-relaxed">{o}</span>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Tech stack */}
          <div className="pt-5 border-t border-gray-100">
            <Label>Technology Stack</Label>
            <div className="flex flex-wrap gap-2 mt-3">
              {work.tags.map((t) => (
                <span
                  key={t}
                  className="chip text-[11px]"
                  style={{
                    background: `${work.color}0d`,
                    borderColor: `${work.color}22`,
                    color: work.color === "#00c6ff" ? "#0077aa" : work.color,
                  }}
                >
                  {t}
                </span>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

function Label({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2">{children}</p>
  );
}

export function Work() {
  const [selected, setSelected] = useState<WorkItem | null>(null);

  return (
    <section id="work" className="section-pad bg-gradient-to-b from-transparent via-blue-50/20 to-transparent">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <FadeIn>
          <div className="flex flex-col gap-2 mb-4">
            <span className="chip w-fit">Selected Product Contributions</span>
            <h2 className="text-headline gradient-text-soft">
              Production systems.
              <br />
              Real impact.
            </h2>
          </div>
          <p className="text-base text-gray-500 max-w-2xl leading-relaxed mb-16">
            The following highlights production software and enterprise platform capabilities I have designed and built as part of commercial products — focusing on architecture, engineering decisions, and business impact.
          </p>
        </FadeIn>

        <div className="grid md:grid-cols-2 gap-5">
          {works.map((work, i) => (
            <WorkCard key={work.id} work={work} index={i} onClick={() => setSelected(work)} />
          ))}
        </div>
      </div>

      <AnimatePresence>
        {selected && <WorkModal work={selected} onClose={() => setSelected(null)} />}
      </AnimatePresence>
    </section>
  );
}
