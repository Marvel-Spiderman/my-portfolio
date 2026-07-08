"use client";

import React from "react";
import { motion } from "framer-motion";
import { usePortfolioStore } from "../../store/portfolioStore";

const educationTimeline = [
  {
    year: "2022 – 2026",
    title: "Bachelor of Engineering (CSE)",
    subtitle: "Chandigarh University",
    description: (
      <>
        Graduated with honors. Specialized in <strong className="text-highlight">Artificial Intelligence</strong> and <strong className="text-highlight">Distributed Systems</strong>. Led the university's open-source development club.
      </>
    ),
    tags: ["Data Structures", "Machine Learning", "Cloud Computing"],
    color: "#8b5cf6",
  },
  {
    year: "2020 – 2022",
    title: "Intermediate (CBSE) ",
    subtitle: "O.P Jindal Modern School",
    description: (
      <>
        Graduated with honors. Specialized in <strong className="text-highlight">Artificial Intelligence</strong> and <strong className="text-highlight">Distributed Systems</strong>. Led the university's open-source development club.
      </>
    ),
    tags: ["Data Structures", "Machine Learning", "Cloud Computing"],
    color: "#0ea5e9",
  },
  {
    year: "2019 - 2021",
    title: "Matriculation (CBSE) ",
    subtitle: "O.P Jindal Modern School",
    description: (
      <>
        Graduated with honors. Specialized in <strong className="text-highlight">Artificial Intelligence</strong> and <strong className="text-highlight">Distributed Systems</strong>. Led the university's open-source development club.
      </>
    ),
    tags: ["Data Structures", "Machine Learning", "Cloud Computing"],
    color: "#ec4899",
  },
  {
    year: "2023",
    title: "1st Place — Smart City Hackathon",
    subtitle: "Academic Achievement 🏆",
    description: (
      <>
        Won <strong className="text-highlight">1st place</strong> from 120+ teams by building a real-time <strong className="text-highlight">smart traffic routing agent</strong> using <strong className="text-highlight">computer vision</strong> pipelines.
      </>
    ),
    tags: ["Computer Vision", "Python", "Algorithms"],
    color: "#f59e0b",
  },
];

export default function Education() {
  const { recruiterMode } = usePortfolioStore();

  const transDuration = recruiterMode ? 0.15 : 0.6;
  const transDelay = (i: number) => recruiterMode ? 0.02 * i : 0.1 * i;

  return (
    <div className="py-20 relative" id="education"
      style={{ borderTop: "1px solid var(--border-primary)" }}>
      <div className="container mx-auto px-5 lg:px-28 space-y-20">

        {/* ── SECTION HEADER ── */}
        <div className="text-center space-y-3">
          <span className="inline-block text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full"
            style={{ background: "var(--bg-card)", color: "var(--accent)", border: "1px solid var(--border-primary)" }}>
            Academic Background
          </span>
          <h2 className="text-4xl md:text-5xl font-black tracking-tight text-readable">
            Education & <span style={{
              background: "var(--theme-gradient)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}>Achievements</span>
          </h2>
        </div>

        {/* ── TIMELINE ── */}
        <div className="max-w-3xl mx-auto space-y-12 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-[var(--border-primary)] before:to-transparent">
          {educationTimeline.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: transDuration, delay: transDelay(i) }}
              viewport={{ once: true, margin: "-50px" }}
              className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active"
            >
              {/* Icon Marker */}
              <div className="flex items-center justify-center w-10 h-10 rounded-full border-4 shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 shadow-lg transition-transform duration-500 group-hover:scale-125"
                style={{
                  background: "var(--bg-dark)",
                  borderColor: item.color,
                  boxShadow: `0 0 20px ${item.color}40`,
                  marginLeft: "1px"
                }}>
                <div className="w-2.5 h-2.5 rounded-full" style={{ background: item.color }} />
              </div>

              {/* Content Card */}
              <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-5 rounded-2xl transition-all duration-300 hover:-translate-y-1 liquid-glass-border"
                style={{
                  background: "var(--bg-card)",
                  border: "1px solid var(--border-primary)",
                  boxShadow: `0 10px 30px -10px ${item.color}15`
                }}>
                <div className="space-y-3">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <span className="text-xs font-black px-2.5 py-1 rounded-md"
                      style={{ background: `${item.color}15`, color: item.color }}>
                      {item.year}
                    </span>
                    <span className="text-[10px] font-bold uppercase tracking-wider" style={{ color: "var(--text-muted)" }}>
                      {item.subtitle}
                    </span>
                  </div>

                  <div>
                    <h3 className="text-lg font-bold" style={{ color: "var(--text-primary)" }}>{item.title}</h3>
                  </div>

                  {!recruiterMode && (
                    <p className="text-sm leading-relaxed py-1 font-sans-clean" style={{ color: "var(--text-body)" }}>
                      {item.description}
                    </p>
                  )}

                  <div className="flex flex-wrap gap-2 pt-2">
                    {item.tags.map(tag => (
                      <span key={tag} className="text-[10px] font-bold px-2 py-1 rounded-md"
                        style={{ background: "var(--bg-dark)", color: "var(--text-muted)", border: "1px solid var(--border-primary)" }}>
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </div>
  );
}
