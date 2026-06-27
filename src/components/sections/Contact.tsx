"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Link, Calendar, Send, CheckCircle } from "lucide-react";
import { FadeIn } from "@/components/animations/FadeIn";

const links = [
  {
    icon: Mail,
    label: "Email",
    value: "pooja.palani184@gmail.com",
    href: "mailto:pooja.palani184@gmail.com",
    color: "#0066ff",
  },
  {
    icon: Link,
    label: "LinkedIn",
    value: "linkedin.com/in/pooja-palani-1804p",
    href: "https://www.linkedin.com/in/pooja-palani-1804p",
    color: "#0A66C2",
  },
  {
    icon: Calendar,
    label: "Schedule a Meeting",
    value: "Book a 30-min call",
    href: "mailto:pooja.palani184@gmail.com?subject=Meeting Request",
    color: "#4f46e5",
  },
];

export function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const subject = encodeURIComponent(`Portfolio Contact from ${form.name}`);
    const body = encodeURIComponent(`Name: ${form.name}\nEmail: ${form.email}\n\n${form.message}`);
    window.open(`mailto:pooja.palani184@gmail.com?subject=${subject}&body=${body}`);
    setSent(true);
    setTimeout(() => setSent(false), 4000);
  };

  return (
    <section id="contact" className="section-pad relative overflow-hidden">
      {/* Background light */}
      <div
        className="absolute inset-0 -z-10 animate-pulse-glow"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 50% 100%, rgba(0,102,255,0.08) 0%, transparent 70%)",
        }}
      />

      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <FadeIn>
          <div className="text-center mb-16">
            <span className="chip mx-auto mb-4">Contact</span>
            <h2 className="text-headline gradient-text-soft mb-4">
              Let&apos;s build something
              <br />
              remarkable.
            </h2>
            <p className="text-base text-gray-500 max-w-lg mx-auto leading-relaxed">
              Whether you&apos;re exploring AI capabilities for your enterprise, need a platform engineering
              partner, or just want to exchange ideas — reach out.
            </p>
          </div>
        </FadeIn>

        <div className="grid lg:grid-cols-2 gap-10 items-start max-w-5xl mx-auto">
          {/* Contact Links */}
          <FadeIn direction="left">
            <div className="flex flex-col gap-4">
              <h3 className="text-title gradient-text-soft mb-2">Get in touch</h3>
              {links.map((link, i) => (
                <motion.a
                  key={link.label}
                  href={link.href}
                  target={link.href.startsWith("http") ? "_blank" : undefined}
                  rel="noopener noreferrer"
                  data-cursor="hover"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className="glass-card rounded-2xl p-5 flex items-center gap-4 group"
                  whileHover={{ x: 4 }}
                >
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                    style={{ background: `${link.color}15`, border: `1px solid ${link.color}25` }}
                  >
                    <link.icon size={17} style={{ color: link.color }} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-0.5">{link.label}</p>
                    <p className="text-sm font-medium text-gray-900 truncate">{link.value}</p>
                  </div>
                  <div
                    className="w-6 h-6 rounded-lg flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-200"
                    style={{ background: `${link.color}15` }}
                  >
                    <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                      <path d="M2 8L8 2M8 2H3M8 2V7" stroke={link.color} strokeWidth="1.5" strokeLinecap="round" />
                    </svg>
                  </div>
                </motion.a>
              ))}
            </div>
          </FadeIn>

          {/* Contact Form */}
          <FadeIn direction="right" delay={0.2}>
            <div className="glass-card rounded-3xl p-8">
              <h3 className="text-title gradient-text-soft mb-6">Send a message</h3>
              <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                {[
                  { name: "name", label: "Your Name", type: "text", placeholder: "Jane Smith" },
                  { name: "email", label: "Email Address", type: "email", placeholder: "jane@company.com" },
                ].map(({ name, label, type, placeholder }) => (
                  <div key={name} className="flex flex-col gap-1.5">
                    <label className="text-xs font-semibold text-gray-600 uppercase tracking-wide">{label}</label>
                    <input
                      type={type}
                      required
                      placeholder={placeholder}
                      value={form[name as keyof typeof form]}
                      onChange={(e) => setForm((f) => ({ ...f, [name]: e.target.value }))}
                      data-cursor="hover"
                      className="rounded-xl px-4 py-3 text-sm text-gray-900 placeholder-gray-400 outline-none transition-all duration-200"
                      style={{
                        background: "rgba(255,255,255,0.7)",
                        border: "1px solid rgba(0,0,0,0.08)",
                        boxShadow: "inset 0 1px 3px rgba(0,0,0,0.04)",
                      }}
                      onFocus={(e) => (e.target.style.borderColor = "rgba(0,102,255,0.4)")}
                      onBlur={(e) => (e.target.style.borderColor = "rgba(0,0,0,0.08)")}
                    />
                  </div>
                ))}

                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-semibold text-gray-600 uppercase tracking-wide">Message</label>
                  <textarea
                    required
                    rows={4}
                    placeholder="Tell me about your project, team, or what you're working on..."
                    value={form.message}
                    onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))}
                    data-cursor="hover"
                    className="rounded-xl px-4 py-3 text-sm text-gray-900 placeholder-gray-400 outline-none transition-all duration-200 resize-none"
                    style={{
                      background: "rgba(255,255,255,0.7)",
                      border: "1px solid rgba(0,0,0,0.08)",
                      boxShadow: "inset 0 1px 3px rgba(0,0,0,0.04)",
                    }}
                    onFocus={(e) => (e.target.style.borderColor = "rgba(0,102,255,0.4)")}
                    onBlur={(e) => (e.target.style.borderColor = "rgba(0,0,0,0.08)")}
                  />
                </div>

                <motion.button
                  type="submit"
                  data-cursor="hover"
                  className="btn-glow mt-2 flex items-center justify-center gap-2 py-3.5 rounded-2xl text-sm font-semibold text-white transition-all duration-300"
                  style={{
                    background: sent
                      ? "linear-gradient(135deg, #10b981, #059669)"
                      : "linear-gradient(135deg, #0066ff 0%, #4f46e5 100%)",
                    boxShadow: sent
                      ? "0 4px 20px rgba(16,185,129,0.3)"
                      : "0 4px 20px rgba(0,102,255,0.3)",
                  }}
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {sent ? (
                    <>
                      <CheckCircle size={15} />
                      Message Sent!
                    </>
                  ) : (
                    <>
                      <Send size={14} />
                      Send Message
                    </>
                  )}
                </motion.button>
              </form>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
