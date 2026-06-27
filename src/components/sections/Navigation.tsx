"use client";

import { useEffect, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Download } from "lucide-react";

const navLinks = [
  { label: "About",     href: "#about" },
  { label: "Work",      href: "#work" },
  { label: "Skills",    href: "#skills" },
  { label: "Education", href: "#education" },
  { label: "Contact",   href: "#contact" },
];

export function Navigation() {
  const [active, setActive] = useState("");
  const { scrollY } = useScroll();
  const navPadding = useTransform(scrollY, [0, 120], ["1rem", "0.6rem"]);
  const navBlur    = useTransform(scrollY, [0, 120], ["blur(12px)", "blur(28px)"]);
  const navBg      = useTransform(
    scrollY,
    [0, 120],
    ["rgba(255,255,255,0.45)", "rgba(255,255,255,0.8)"]
  );

  useEffect(() => {
    const ids = navLinks.map((l) => l.href.replace("#", ""));
    const observers: IntersectionObserver[] = [];

    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;
      const obs = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActive(id); },
        { threshold: 0.4 }
      );
      obs.observe(el);
      observers.push(obs);
    });

    return () => observers.forEach((o) => o.disconnect());
  }, []);

  const scrollTo = (href: string) => {
    const el = document.querySelector(href);
    el?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <motion.header
      className="fixed top-4 left-1/2 z-50"
      style={{ x: "-50%" }}
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, delay: 0.2, ease: [0.25, 0.4, 0.25, 1] }}
    >
      <motion.nav
        className="flex items-center gap-1 rounded-2xl border border-white/70 shadow-[0_8px_32px_rgba(0,0,0,0.10),inset_0_1px_0_rgba(255,255,255,0.9)]"
        style={{
          paddingTop: navPadding,
          paddingBottom: navPadding,
          paddingLeft: "1.25rem",
          paddingRight: "1.25rem",
          backdropFilter: navBlur,
          WebkitBackdropFilter: navBlur,
          background: navBg,
        }}
      >
        {/* Logo mark */}
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="mr-5 flex items-center gap-2.5 group"
          data-cursor="hover"
        >
          <span
            className="w-7 h-7 rounded-lg flex items-center justify-center text-[11px] font-bold text-white flex-shrink-0 transition-transform duration-200 group-hover:scale-105"
            style={{
              background: "linear-gradient(135deg, #0066ff 0%, #4f46e5 100%)",
              boxShadow: "0 2px 8px rgba(0,102,255,0.32), inset 0 1px 0 rgba(255,255,255,0.18)",
              letterSpacing: "0.01em",
            }}
          >
            P
          </span>
          <span className="text-sm font-semibold text-gray-900 group-hover:text-blue-600 transition-colors duration-200 hidden sm:block tracking-tight">
            Pooja Palani
          </span>
        </button>

        <div className="hidden md:flex items-center gap-1">
          {navLinks.map(({ label, href }) => {
            const id = href.replace("#", "");
            return (
              <button
                key={href}
                onClick={() => scrollTo(href)}
                data-cursor="hover"
                className={`relative px-3 py-1.5 text-sm font-medium rounded-xl transition-colors duration-200 ${
                  active === id
                    ? "text-blue-600"
                    : "text-gray-600 hover:text-gray-900"
                }`}
              >
                {active === id && (
                  <motion.span
                    layoutId="nav-pill"
                    className="absolute inset-0 rounded-xl bg-blue-50/80 border border-blue-100"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.4 }}
                  />
                )}
                <span className="relative z-10">{label}</span>
              </button>
            );
          })}
        </div>

        {/* Resume CTA */}
        <a
          href="/resume.pdf"
          download
          data-cursor="hover"
          className="btn-glow ml-4 flex items-center gap-1.5 px-4 py-1.5 rounded-xl text-sm font-semibold text-white transition-all duration-200"
          style={{
            background: "linear-gradient(135deg, #0066ff 0%, #4f46e5 100%)",
            boxShadow: "0 2px 12px rgba(0,102,255,0.3)",
          }}
        >
          <Download size={13} strokeWidth={2.5} />
          Resume
        </a>
      </motion.nav>
    </motion.header>
  );
}
