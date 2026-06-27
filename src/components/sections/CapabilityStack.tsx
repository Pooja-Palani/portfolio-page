"use client";

import { motion } from "framer-motion";
import { FadeIn } from "@/components/animations/FadeIn";

const stack = [
  {
    category: "AI & Agents",
    color: "#0066ff",
    items: ["LangGraph", "LangChain", "Ollama", "OpenAI API", "RAG Pipelines", "Prompt Engineering", "Semantic Search", "Vector Stores", "Agentic Workflows", "Explainable AI"],
  },
  {
    category: "Backend Engineering",
    color: "#4f46e5",
    items: ["Python", "FastAPI", "Node.js", "TypeScript", "Express", "REST APIs", "WebSockets", "SQLAlchemy", "Drizzle ORM", "Celery"],
  },
  {
    category: "Data & Governance",
    color: "#0066ff",
    items: ["PostgreSQL", "Data Quality Frameworks", "Apache Spark", "dbt", "DataHub", "Starburst SEP", "Schema Registry", "Audit Pipelines", "Policy Engines", "LDAP"],
  },
  {
    category: "Frontend",
    color: "#00c6ff",
    items: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Framer Motion", "TanStack Table", "React Query", "TanStack Query", "shadcn/ui", "Recharts"],
  },
  {
    category: "Cloud & Infrastructure",
    color: "#6366f1",
    items: ["AWS", "GCP", "Docker", "Kubernetes", "Terraform", "GitHub Actions", "CI/CD", "Prometheus", "Grafana", "OpenTelemetry"],
  },
  {
    category: "Enterprise & Compliance",
    color: "#4f46e5",
    items: ["BFSI Compliance", "GDPR-aware Design", "Audit Trail Design", "Data Residency", "Role-Based Access", "Approval Workflows", "Privacy Policies", "Governance Lifecycle", "Multi-tenancy", "Regulated Industries"],
  },
];

export function CapabilityStack() {
  return (
    <section id="skills" className="section-pad">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <FadeIn>
          <div className="flex flex-col gap-2 mb-16">
            <span className="chip w-fit">Capability Stack</span>
            <h2 className="text-headline gradient-text-soft">
              Technologies I
              <br />
              build with.
            </h2>
            <p className="text-base text-gray-500 max-w-xl leading-relaxed mt-2">
              A complete view of the tools, frameworks, and platforms across the systems I design and ship.
            </p>
          </div>
        </FadeIn>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {stack.map((group, gi) => (
            <FadeIn key={group.category} delay={gi * 0.08} direction="up">
              <div className="glass-card rounded-3xl p-6 h-full flex flex-col gap-4">
                {/* Category header */}
                <div className="flex items-center gap-2.5">
                  <div
                    className="w-2 h-6 rounded-full flex-shrink-0"
                    style={{ background: `linear-gradient(to bottom, ${group.color}, ${group.color}60)` }}
                  />
                  <h3 className="text-sm font-bold text-gray-900 tracking-tight">{group.category}</h3>
                </div>

                {/* Tech chips */}
                <div className="flex flex-wrap gap-1.5">
                  {group.items.map((item, ii) => (
                    <motion.span
                      key={item}
                      initial={{ opacity: 0, scale: 0.85 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.3, delay: gi * 0.08 + ii * 0.025 }}
                      whileHover={{ scale: 1.05, y: -1 }}
                      className="chip text-[11px] cursor-default"
                      style={{
                        background: `${group.color}0d`,
                        borderColor: `${group.color}22`,
                        color: group.color === "#00c6ff" ? "#0077aa" : group.color,
                      }}
                    >
                      {item}
                    </motion.span>
                  ))}
                </div>
              </div>
            </FadeIn>
          ))}
        </div>

        {/* Bottom accent — total count */}
        <FadeIn delay={0.5}>
          <div className="mt-10 flex justify-center">
            <div className="glass-card rounded-2xl px-8 py-4 flex items-center gap-8">
              {[
                { value: `${stack.reduce((a, g) => a + g.items.length, 0)}+`, label: "Technologies" },
                { value: stack.length.toString(), label: "Domains" },
                { value: "2+", label: "Years in Production" },
              ].map(({ value, label }) => (
                <div key={label} className="flex flex-col items-center gap-0.5">
                  <span className="text-xl font-bold gradient-text">{value}</span>
                  <span className="text-[11px] text-gray-400 font-medium">{label}</span>
                </div>
              ))}
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
