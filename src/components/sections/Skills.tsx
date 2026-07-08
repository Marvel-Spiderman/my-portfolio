"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import CloudInfrastructure from "../illustrations/CloudInfrastructure";
import InteractiveDevices from "../illustrations/InteractiveDevices";
import GamingSetup from "../illustrations/GamingSetup";
import { audioSynth } from "../../utils/audioSynth";
import { usePortfolioStore } from "../../store/portfolioStore";

import {
  SiPython,
  SiTypescript,
  SiReact,
  SiNextdotjs,
  SiThreedotjs,
  SiPytorch,
  SiFastapi,
  SiGo,
  SiDocker,
  SiPostgresql,
  SiApachekafka,
  SiTailwindcss,
  SiFramer,
  SiOpencv,
  SiLangchain,
  SiTensorflow,
  SiHuggingface,
  SiCplusplus,
  SiKubernetes,
  SiMongodb
} from "react-icons/si";
import { FaAws } from "react-icons/fa6";
import { TbBrain, TbCode, TbDatabase, TbPalette } from "react-icons/tb";

// ── Tech Stack data with colours ────────────────────────────────────
const techStack = [
  { name: "Python", icon: SiPython, color: "#3b82f6" },
  { name: "TypeScript", icon: SiTypescript, color: "#3178c6" },
  { name: "React", icon: SiReact, color: "#61dafb" },
  { name: "Next.js", icon: SiNextdotjs, color: "var(--text-primary)" },
  { name: "Three.js", icon: SiThreedotjs, color: "#10b981" },
  { name: "PyTorch", icon: SiPytorch, color: "#ee4c2c" },
  { name: "LangChain", icon: SiLangchain, color: "#f59e0b" },
  { name: "FastAPI", icon: SiFastapi, color: "#009688" },
  { name: "Go", icon: SiGo, color: "#00add8" },
  { name: "Docker", icon: SiDocker, color: "#2496ed" },
  { name: "AWS", icon: FaAws, color: "#ff9900" },
  { name: "PostgreSQL", icon: SiPostgresql, color: "#4169e1" },
  { name: "Kafka", icon: SiApachekafka, color: "var(--text-primary)" },
  { name: "Tailwind", icon: SiTailwindcss, color: "#06b6d4" },
  { name: "Framer", icon: SiFramer, color: "#0055ff" },
  { name: "OpenCV", icon: SiOpencv, color: "#5c3ee8" },
];

const skillCategories = [
  {
    title: "AI & Machine Learning",
    icon: TbBrain,
    color: "#7c3aed",
    skills: [
      { name: "PyTorch & TensorFlow", percentage: 90, icon: SiPytorch },
      { name: "LLM Fine-Tuning & RAG", percentage: 88, icon: SiLangchain },
      { name: "Computer Vision", percentage: 85, icon: SiOpencv },
      { name: "NLP & Transformers", percentage: 84, icon: SiHuggingface },
    ],
  },
  {
    title: "Programming",
    icon: TbCode,
    color: "#0ea5e9",
    skills: [
      { name: "Python", percentage: 95, icon: SiPython },
      { name: "TypeScript / JavaScript", percentage: 92, icon: SiTypescript },
      { name: "Go", percentage: 80, icon: SiGo },
      { name: "C++", percentage: 78, icon: SiCplusplus },
    ],
  },
  {
    title: "Cloud & Data",
    icon: TbDatabase,
    color: "#f97316",
    skills: [
      { name: "AWS Cloud", percentage: 85, icon: FaAws },
      { name: "Docker & Kubernetes", percentage: 80, icon: SiDocker },
      { name: "PostgreSQL & MongoDB", percentage: 88, icon: SiPostgresql },
      { name: "Apache Kafka", percentage: 75, icon: SiApachekafka },
    ],
  },
  {
    title: "Frontend & UI",
    icon: TbPalette,
    color: "#ec4899",
    skills: [
      { name: "Next.js & React", percentage: 92, icon: SiReact },
      { name: "Tailwind CSS", percentage: 95, icon: SiTailwindcss },
      { name: "Framer Motion", percentage: 85, icon: SiFramer },
      { name: "Three.js / WebGL", percentage: 78, icon: SiThreedotjs },
    ],
  },
];

const careerTimeline = [
  {
    year: "2024 – Present",
    title: "AI Specialist & Cloud Practitioner",
    subtitle: "Intelligence Labs",
    description: (
      <>
        Fine-tuning <strong className="text-highlight">LLMs</strong>, designing <strong className="text-highlight">multi-vector RAG indexes</strong>, and scaling <strong className="text-highlight">cloud microservices</strong> in secure <strong className="text-highlight">Docker</strong> containers on <strong className="text-highlight">AWS</strong>.
      </>
    ),
    tags: ["PyTorch", "LangChain", "AWS", "Docker"],
    color: "#7c3aed",
  },
  {
    year: "2024",
    title: "Full-Stack Engineer Intern",
    subtitle: "Quantum Software Solutions",
    description: (
      <>
        Engineered scalable <strong className="text-highlight">Next.js</strong> dashboards, optimized <strong className="text-highlight">PostgreSQL</strong> indexing, and integrated <strong className="text-highlight">REST APIs</strong> with <strong className="text-highlight">Go</strong> server cores.
      </>
    ),
    tags: ["Next.js", "PostgreSQL", "Go", "REST API"],
    color: "#0ea5e9",
  },
];

export default function Skills() {
  const [activeCategory, setActiveCategory] = useState("AI & Machine Learning");
  const { recruiterMode, activeUniverse } = usePortfolioStore();

  const currentCat = skillCategories.find((c) => c.title === activeCategory) || skillCategories[0];
  const transDuration = recruiterMode ? 0.15 : 0.6;
  const transDelay = (i: number) => recruiterMode ? 0.02 * i : 0.1 * i;

  return (
    <div className="py-20 relative" id="skills"
      style={{ borderTop: "1px solid var(--border-primary)" }}>
      <div className="container mx-auto px-5 lg:px-28 space-y-20">

        {/* ── SECTION HEADER ── */}
        <div className="text-center space-y-3">
          <span className="inline-block text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full"
            style={{ background: "var(--bg-card)", color: "var(--accent)", border: "1px solid var(--border-primary)" }}>
            My Toolkit
          </span>
          <h2 className="text-4xl lg:text-5xl font-black" style={{ color: "var(--text-primary)" }}>
            Skills &{" "}
            <span style={{
              background: "var(--theme-gradient)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}>
              Expertise
            </span>
          </h2>
        </div>

        {/* ── COLOURFUL TECH STACK ICON GRID ── */}
        <div className="space-y-6">
          <h3 className="text-center text-lg font-bold" style={{ color: "var(--text-primary)" }}>
            Tech Stack 🚀
          </h3>
          <div className="grid grid-cols-4 sm:grid-cols-6 lg:grid-cols-8 gap-3">
            {techStack.map((tech, i) => (
              <motion.div
                key={tech.name}
                className="flex flex-col items-center gap-2 p-2 cursor-default group"
                initial={{ opacity: 0, scale: 0.7 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.04, duration: 0.35, ease: [0.175, 0.885, 0.32, 1.275] }}
                whileHover={{
                  scale: 1.15,
                  y: -4,
                }}
              >
                {/* Borderless Fluid 3D Glass Icon */}
                <div
                  className="w-16 h-16 rounded-3xl flex items-center justify-center select-none transition-all duration-300 relative"
                  style={{
                    background: "linear-gradient(135deg, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0.02) 100%)",
                    backdropFilter: "blur(16px)",
                    WebkitBackdropFilter: "blur(16px)",
                    boxShadow: `
                      inset 0 3px 5px rgba(255, 255, 255, 0.28),
                      inset 0 -3px 5px rgba(0, 0, 0, 0.25),
                      0 8px 16px rgba(0, 0, 0, 0.15),
                      0 4px 12px ${tech.color}25
                    `.trim(),
                  }}
                >
                  {/* Internal fluid color lens glow */}
                  <div
                    className="absolute inset-2.5 rounded-full filter blur-md opacity-20 pointer-events-none group-hover:opacity-40 transition-opacity duration-300"
                    style={{ background: tech.color }}
                  />
                  <tech.icon size={30} style={{ color: tech.color, zIndex: 1 }} />
                </div>
                <span className="text-[11px] font-bold text-center leading-tight mt-1"
                  style={{ color: "var(--text-primary)" }}>
                  {tech.name}
                </span>
              </motion.div>
            ))}
          </div>
        </div>

        {/* ── SKILLS PROGRESS + ILLUSTRATIONS ── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">

          {/* Illustrations */}
          <div className="lg:col-span-5 flex flex-col sm:flex-row items-center justify-center gap-5">
            {[
              { 
                label: activeUniverse === "universe-gaming" ? "Gaming Setup" : "Device Console", 
                component: activeUniverse === "universe-gaming" ? <GamingSetup /> : <InteractiveDevices /> 
              },
              { label: "Cloud Stream", component: <CloudInfrastructure /> },
            ].map(({ label, component }) => (
              <div key={label} className="w-full max-w-[200px] rounded-2xl p-2 border"
                style={{ background: "var(--bg-card)", borderColor: "var(--border-primary)" }}>
                <p className="text-[9px] font-semibold text-center mb-1 uppercase tracking-wider"
                  style={{ color: "var(--text-muted)" }}>
                  {label}
                </p>
                {component}
              </div>
            ))}
          </div>

          {/* Category tabs + progress bars */}
          <div className="lg:col-span-7 space-y-5">
            {/* Category buttons */}
            <div className="flex flex-wrap gap-2">
              {skillCategories.map((cat) => (
                <motion.button
                  key={cat.title}
                  onClick={() => { audioSynth.playClick(); setActiveCategory(cat.title); }}
                  onMouseEnter={() => audioSynth.playHover()}
                  className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold border cursor-pointer transition-all"
                  style={activeCategory === cat.title ? {
                    background: cat.color,
                    color: "#fff",
                    borderColor: cat.color,
                    boxShadow: `0 0 16px ${cat.color}50`,
                  } : {
                    background: "var(--bg-card)",
                    color: "var(--text-muted)",
                    borderColor: "var(--border-primary)",
                  }}
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.97 }}
                >
                  <cat.icon size={16} /> {cat.title}
                </motion.button>
              ))}
            </div>

            {/* Progress bars */}
            <div className="space-y-4">
              {currentCat.skills.map((skill, i) => (
                <div key={i} className="space-y-1.5">
                  <div className="flex justify-between items-center text-xs font-semibold font-sans-clean">
                    <div className="flex items-center gap-2">
                      <skill.icon size={16} style={{ color: currentCat.color }} />
                      <span style={{ color: "var(--text-primary)" }}>{skill.name}</span>
                    </div>
                    <span style={{ color: currentCat.color }}>{skill.percentage}%</span>
                  </div>
                  <div className="h-2.5 w-full rounded-full overflow-hidden"
                    style={{ background: "var(--bg-card)", border: "1px solid var(--border-primary)" }}>
                    <motion.div
                      className="h-full rounded-full"
                      style={{ background: `linear-gradient(90deg, ${currentCat.color}88, ${currentCat.color})` }}
                      initial={{ width: 0 }}
                      animate={{ width: `${skill.percentage}%` }}
                      transition={{ duration: transDuration, ease: "easeOut", delay: transDelay(i) }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── EXPERIENCE TIMELINE ── */}
        <div className="space-y-8 pt-4" id="experience"
          style={{ borderTop: "1px solid var(--border-primary)" }}>
          <div className="text-center space-y-2">
            <span className="inline-block text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full"
              style={{ background: "var(--bg-card)", color: "var(--accent)", border: "1px solid var(--border-primary)" }}>
              Journey
            </span>
            <h2 className="text-3xl lg:text-4xl font-black" style={{ color: "var(--text-primary)" }}>
              Experience{" "}
              <span style={{
                background: "var(--theme-gradient)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}>
                Timeline
              </span>
            </h2>
          </div>

          <div className="max-w-3xl mx-auto space-y-6 relative">
            {/* Timeline line */}
            <div className="absolute left-5 top-2 bottom-2 w-0.5 rounded-full"
              style={{ background: "var(--border-primary)" }} />

            {careerTimeline.map((item, idx) => (
              <motion.div
                key={idx}
                className="relative pl-14 group"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: transDuration, delay: transDelay(idx) }}
                viewport={{ once: true, margin: "-80px" }}
              >
                {/* Timeline dot */}
                <motion.span
                  className="absolute left-[14px] top-3 w-4 h-4 rounded-full z-10"
                  style={{ background: item.color, boxShadow: `0 0 12px ${item.color}60` }}
                  whileHover={{ scale: 1.4 }}
                />

                <div className="p-5 rounded-2xl border glass-panel liquid-glass-border space-y-3">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                    <div>
                      <h3 className="font-bold text-base" style={{ color: "var(--text-primary)" }}>{item.title}</h3>
                      <span className="text-xs font-semibold" style={{ color: item.color }}>{item.subtitle}</span>
                    </div>
                    <span className="text-xs font-semibold px-3 py-1 rounded-full self-start"
                      style={{ background: `${item.color}18`, color: item.color, border: `1px solid ${item.color}30` }}>
                      {item.year}
                    </span>
                  </div>

                  {!recruiterMode && (
                    <p className="text-sm leading-relaxed py-1" style={{ color: "var(--text-body)" }}>
                      {item.description}
                    </p>
                  )}

                  <div className="flex flex-wrap gap-1.5">
                    {item.tags.map((tag) => (
                      <span key={tag} className="text-[10px] font-bold px-2.5 py-0.5 rounded-full"
                        style={{ background: `${item.color}15`, color: item.color }}>
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
