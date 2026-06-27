"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FadeIn } from "@/components/animations/FadeIn";
import {
  Brain, Server, Code2, Globe, Cloud, GitBranch, Database, BarChart3, Shield, Scale,
} from "lucide-react";

const categories = [
  {
    id: "ai",
    label: "AI Engineering",
    icon: Brain,
    color: "#0066ff",
    description: "Building production AI systems with explainability and enterprise constraints",
    skills: [
      { name: "LLM Integration", level: 90 },
      { name: "RAG Pipelines", level: 88 },
      { name: "Prompt Engineering", level: 92 },
      { name: "AI Reasoning Systems", level: 85 },
      { name: "OSI-Inspired AI Design", level: 80 },
      { name: "Explainable AI", level: 82 },
      { name: "Model Evaluation", level: 78 },
      { name: "Vector Databases", level: 75 },
    ],
  },
  {
    id: "enterprise",
    label: "Enterprise Architecture",
    icon: Server,
    color: "#4f46e5",
    description: "Designing systems that scale, comply, and remain maintainable",
    skills: [
      { name: "System Architecture", level: 92 },
      { name: "Microservices Design", level: 88 },
      { name: "Event-Driven Architecture", level: 85 },
      { name: "Platform Engineering", level: 90 },
      { name: "API Design (REST/GraphQL)", level: 88 },
      { name: "Domain-Driven Design", level: 80 },
    ],
  },
  {
    id: "backend",
    label: "Backend Engineering",
    icon: Code2,
    color: "#0066ff",
    description: "Server-side systems built for correctness and performance",
    skills: [
      { name: "Python", level: 95 },
      { name: "TypeScript / Node.js", level: 85 },
      { name: "Java / Spring Boot", level: 78 },
      { name: "FastAPI", level: 90 },
      { name: "SQL (PostgreSQL)", level: 88 },
      { name: "Message Queues (Kafka)", level: 80 },
    ],
  },
  {
    id: "frontend",
    label: "Frontend",
    icon: Globe,
    color: "#00c6ff",
    description: "Product-quality UIs using modern React patterns",
    skills: [
      { name: "React / Next.js", level: 85 },
      { name: "TypeScript", level: 88 },
      { name: "Tailwind CSS", level: 82 },
      { name: "Framer Motion", level: 78 },
    ],
  },
  {
    id: "cloud",
    label: "Cloud & Infrastructure",
    icon: Cloud,
    color: "#6366f1",
    description: "Cloud-native systems across major providers",
    skills: [
      { name: "AWS (EC2, S3, Lambda)", level: 83 },
      { name: "GCP (BigQuery, Dataflow)", level: 78 },
      { name: "Docker / Kubernetes", level: 82 },
      { name: "Terraform", level: 72 },
      { name: "CI/CD Pipelines", level: 85 },
    ],
  },
  {
    id: "devops",
    label: "DevOps & Observability",
    icon: GitBranch,
    color: "#0066ff",
    description: "Making systems observable, deployable, and resilient",
    skills: [
      { name: "GitHub Actions", level: 88 },
      { name: "Prometheus / Grafana", level: 78 },
      { name: "ELK Stack", level: 72 },
      { name: "OpenTelemetry", level: 70 },
    ],
  },
  {
    id: "data",
    label: "Data Engineering",
    icon: Database,
    color: "#00c6ff",
    description: "Pipelines and platforms for large-scale data processing",
    skills: [
      { name: "Apache Spark", level: 85 },
      { name: "dbt", level: 78 },
      { name: "Airflow / Prefect", level: 80 },
      { name: "Data Contracts", level: 82 },
      { name: "ETL / ELT Design", level: 88 },
    ],
  },
  {
    id: "analytics",
    label: "Data Analytics",
    icon: BarChart3,
    color: "#4f46e5",
    description: "Turning data into decisions at enterprise scale",
    skills: [
      { name: "BigQuery", level: 83 },
      { name: "SQL Analytics", level: 90 },
      { name: "Pandas / NumPy", level: 88 },
      { name: "Data Quality Metrics", level: 92 },
    ],
  },
  {
    id: "governance",
    label: "Data Governance",
    icon: Shield,
    color: "#0066ff",
    description: "Frameworks that make compliance an engineering property",
    skills: [
      { name: "Data Quality Frameworks", level: 92 },
      { name: "Policy-as-Configuration", level: 88 },
      { name: "Audit Trail Design", level: 85 },
      { name: "Schema Registry", level: 82 },
      { name: "BFSI Compliance Patterns", level: 80 },
    ],
  },
  {
    id: "compliance",
    label: "Compliance & Regulation",
    icon: Scale,
    color: "#4f46e5",
    description: "Engineering for regulatory environments",
    skills: [
      { name: "GDPR-aware Design", level: 80 },
      { name: "BFSI Regulations", level: 82 },
      { name: "Data Residency Patterns", level: 78 },
      { name: "Audit-Ready Systems", level: 85 },
    ],
  },
];

function SkillBar({ skill, delay, color }: { skill: { name: string; level: number }; delay: number; color: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.4, delay }}
      className="flex flex-col gap-1.5"
    >
      <div className="flex justify-between items-center">
        <span className="text-xs font-medium text-gray-700">{skill.name}</span>
        <span className="text-[10px] text-gray-400 font-mono">{skill.level}%</span>
      </div>
      <div className="h-1 rounded-full bg-gray-100 overflow-hidden">
        <motion.div
          className="h-full rounded-full"
          style={{ background: `linear-gradient(to right, ${color}, ${color}80)` }}
          initial={{ width: 0 }}
          animate={{ width: `${skill.level}%` }}
          transition={{ duration: 0.8, delay: delay + 0.2, ease: [0.25, 0.4, 0.25, 1] }}
        />
      </div>
    </motion.div>
  );
}

export function Skills() {
  const [active, setActive] = useState(categories[0].id);
  const activeCategory = categories.find((c) => c.id === active)!;

  return (
    <section id="skills" className="section-pad">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <FadeIn>
          <div className="flex flex-col gap-2 mb-16">
            <span className="chip w-fit">Technical Skills</span>
            <h2 className="text-headline gradient-text-soft">
              Capability
              <br />
              dashboard.
            </h2>
            <p className="text-base text-gray-500 max-w-xl leading-relaxed mt-2">
              A structured view of what I build with — from AI reasoning systems to enterprise compliance frameworks.
            </p>
          </div>
        </FadeIn>

        <div className="grid lg:grid-cols-[280px_1fr] gap-6">
          {/* Category list */}
          <FadeIn direction="left">
            <div className="glass-card rounded-3xl p-3 flex flex-col gap-1 h-fit lg:sticky lg:top-24">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setActive(cat.id)}
                  data-cursor="hover"
                  className={`flex items-center gap-3 px-4 py-3 rounded-2xl text-sm font-medium text-left transition-all duration-200 ${
                    active === cat.id
                      ? "text-white shadow-[0_4px_16px_rgba(0,102,255,0.25)]"
                      : "text-gray-600 hover:bg-gray-50"
                  }`}
                  style={
                    active === cat.id
                      ? { background: `linear-gradient(135deg, ${cat.color}, ${cat.color}bb)` }
                      : {}
                  }
                >
                  <cat.icon size={15} className="flex-shrink-0" />
                  <span className="truncate">{cat.label}</span>
                </button>
              ))}
            </div>
          </FadeIn>

          {/* Skill panel */}
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="glass-card rounded-3xl p-8"
            >
              {/* Header */}
              <div className="flex items-start gap-4 mb-8 pb-6 border-b border-gray-100">
                <div
                  className="w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0"
                  style={{
                    background: `${activeCategory.color}15`,
                    border: `1px solid ${activeCategory.color}25`,
                  }}
                >
                  <activeCategory.icon size={20} style={{ color: activeCategory.color }} />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-gray-900">{activeCategory.label}</h3>
                  <p className="text-sm text-gray-500 mt-0.5">{activeCategory.description}</p>
                </div>
              </div>

              {/* Skills */}
              <div className="grid sm:grid-cols-2 gap-x-12 gap-y-5">
                {activeCategory.skills.map((skill, i) => (
                  <SkillBar
                    key={skill.name}
                    skill={skill}
                    delay={i * 0.06}
                    color={activeCategory.color}
                  />
                ))}
              </div>

              {/* Floating chips at bottom */}
              <div className="mt-8 pt-6 border-t border-gray-100">
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-3">Technologies</p>
                <div className="flex flex-wrap gap-2">
                  {activeCategory.skills.map(({ name }) => (
                    <motion.span
                      key={name}
                      className="chip text-[10px]"
                      whileHover={{ scale: 1.05, y: -1 }}
                    >
                      {name}
                    </motion.span>
                  ))}
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
