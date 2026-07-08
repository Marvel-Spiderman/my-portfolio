"use client";

import React from "react";
import { motion } from "framer-motion";
import { Bot, Globe2, Plane } from "lucide-react";
import DigitalCity from "../illustrations/DigitalCity";
import RoboticAssistant from "../illustrations/RoboticAssistant";
import { audioSynth } from "../../utils/audioSynth";
import { usePortfolioStore } from "../../store/portfolioStore";

export default function About() {
  const { recruiterMode } = usePortfolioStore();
  const handleHover = () => {
    audioSynth.playHover();
  };

  const transDuration = recruiterMode ? 0.15 : 0.8;

  return (
    <section className="py-20 relative" id="about"
      style={{ borderTop: "1px solid var(--border-primary)" }}>
      <div className="container mx-auto px-5 lg:px-28 flex flex-col lg:flex-row items-center justify-between gap-12">
        
        {/* Left Column - Graphic Illustrations */}
        <motion.div
          className="lg:w-1/2 w-full flex flex-col items-center justify-center relative min-h-[260px]"
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: transDuration, ease: "easeOut" }}
          viewport={{ once: true, margin: "-100px" }}
        >
          {/* Base Digital City Skyline background */}
          <div className="w-full relative opacity-85 hover:opacity-100 transition-opacity">
            <DigitalCity />
          </div>

          {/* Overlapping floating drone helper */}
          <div className="absolute top-[-20px] right-[-10px] w-[140px] h-[140px] z-10">
            <RoboticAssistant />
          </div>
        </motion.div>

        {/* Right Column - Text Bio */}
        <motion.div
          className="lg:w-1/2 space-y-6"
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: transDuration, ease: "easeOut", delay: recruiterMode ? 0.02 : 0.15 }}
          viewport={{ once: true, margin: "-100px" }}
        >
          <div className="space-y-2">
            <span className="inline-block text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full"
              style={{ background: "var(--bg-card)", color: "var(--accent)", border: "1px solid var(--border-primary)" }}>
              About Me
            </span>
            <h2 className="text-3xl lg:text-4xl font-black" style={{ color: "var(--text-primary)" }}>
              Who I{" "}
              <span style={{
                background: "var(--theme-gradient)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}>Am</span>
            </h2>
          </div>

          <div className="text-panel space-y-4">
            <p className="text-sm lg:text-base leading-relaxed" style={{ color: "var(--text-body, var(--text-muted))" }}>
              I engineer{" "}
              <strong className="text-highlight">distributed data streams</strong>,{" "}
              <strong className="text-highlight">custom neural networks</strong>, and{" "}
              <strong className="text-highlight">sleek frontend experiences</strong>{" "}
              — connecting intelligent backends to beautiful human interfaces.
            </p>
            <p className="text-sm lg:text-base leading-relaxed" style={{ color: "var(--text-body, var(--text-muted))" }}>
              My journey began by automating gaming systems and building game mods, sparking a deep curiosity for algorithms and AI. Today I build distributed systems with{" "}
              <strong className="text-highlight">Go, Python, Kafka, AWS & Docker</strong>{" "}
              and craft reactive UIs with{" "}
              <strong className="text-highlight">Next.js & React</strong>.
            </p>
            <p className="text-sm lg:text-base leading-relaxed" style={{ color: "var(--text-body, var(--text-muted))" }}>
              I enjoy dissecting{" "}
              <strong className="text-highlight">LLMs & NLP models</strong>, building open-source plugins, and tinkering with game HUDs — always balancing robust pipeline throughput with pixel-perfect visuals.
            </p>
          </div>

          {/* Colourful illustrative stat cards */}
          <div className="grid grid-cols-3 gap-3">
            {[
              { label: "Role", value: "AI/ML Engineer", icon: <Bot size={28} />, color: "#7c3aed" },
              { label: "Based In", value: "India", icon: <Globe2 size={28} />, color: "#0ea5e9" },
              { label: "Available", value: "Remote OK", icon: <Plane size={28} />, color: "#10b981" },
            ].map(({ label, value, icon, color }) => (
              <div key={label}
                className="glass-panel liquid-glass-border p-3 rounded-2xl text-center space-y-2 flex flex-col items-center justify-center transition-all hover:scale-105 cursor-pointer"
                style={{ background: `${color}12`, borderColor: `${color}30` }}>
                <div style={{ color }}>{icon}</div>
                <div className="space-y-0.5">
                  <div className="text-[9px] font-bold uppercase tracking-wider" style={{ color: "var(--text-muted)" }}>{label}</div>
                  <div className="text-xs font-black" style={{ color }}>{value}</div>
                </div>
              </div>
            ))}
          </div>

          {/* Language chips */}
          <div className="flex flex-wrap gap-2">
            {[
              { name: "Python", color: "#3b82f6" },
              { name: "TypeScript", color: "#7c3aed" },
              { name: "Go", color: "#0ea5e9" },
              { name: "C++", color: "#ef4444" },
            ].map(({ name, color }) => (
              <span key={name}
                className="px-3 py-1 rounded-full text-xs font-bold text-white"
                style={{ background: color }}>
                {name}
              </span>
            ))}
          </div>
        </motion.div>

      </div>
    </section>
  );
}
