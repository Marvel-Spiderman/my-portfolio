"use client";

import React, { useEffect, useRef } from "react";
import { TbExternalLink } from "react-icons/tb";
import { motion, useScroll, useTransform } from "framer-motion";
import HolographicMonitors from "../illustrations/HolographicMonitors";
import EnergyCubes from "../illustrations/EnergyCubes";
import AiCompanion from "../illustrations/AiCompanion";
import { audioSynth } from "../../utils/audioSynth";
import { usePortfolioStore } from "../../store/portfolioStore";

export default function Projects() {
  const { recruiterMode, unlockAchievement } = usePortfolioStore();

  const handleHover = () => {
    audioSynth.playHover();
  };

  const handleClick = () => {
    audioSynth.playClick();
  };

  // Track achievements: Unlock "viewed-projects" on load/mount
  useEffect(() => {
    const handleScrollCheck = () => {
      const projSec = document.getElementById("projects");
      if (projSec) {
        const rect = projSec.getBoundingClientRect();
        // If projects are visible on screen, unlock achievement!
        if (rect.top < window.innerHeight && rect.bottom > 0) {
          unlockAchievement("viewed-projects");
          window.removeEventListener("scroll", handleScrollCheck);
        }
      }
    };
    window.addEventListener("scroll", handleScrollCheck, { passive: true });
    // Check initially
    handleScrollCheck();
    return () => window.removeEventListener("scroll", handleScrollCheck);
  }, [unlockAchievement]);

  const projects = [
    {
      id: "01",
      title: "NeuroForge RAG Orchestrator",
      type: "AI Platform",
      description: "An enterprise-grade Retrieval-Augmented Generation dashboard supporting agentic memory, multi-vector DB indexes, and custom LLM inference evaluation with real-time analytics graphs.",
      tags: ["React", "Python", "FastAPI", "Pinecone", "LangChain"],
      illustration: <HolographicMonitors />,
      link: "https://github.com/Marvel-Spiderman"
    },
    {
      id: "02",
      title: "Aether Stream Engine",
      type: "Cloud Infrastructure",
      description: "High-performance distributed event ingestion pipeline processing 10k+ msgs/sec. Integrates real-time anomaly detection using an isolation forest ML model running in Python microservices.",
      tags: ["Go", "Kafka", "Python", "Docker", "AWS"],
      illustration: <EnergyCubes />,
      link: "https://github.com/Marvel-Spiderman"
    },
    {
      id: "03",
      title: "Vortex 3D Gaming Arena",
      type: "Interactive Web",
      description: "A full-scale immersive web gaming dashboard incorporating real-time WebGL graphics, user gameplay analytics, and customizable visual profile cards utilizing shader material setups.",
      tags: ["Next.js", "Three.js", "Tailwind CSS", "Framer Motion"],
      illustration: <AiCompanion />,
      link: "https://github.com/Marvel-Spiderman"
    }
  ];

  const transDuration = recruiterMode ? 0.15 : 0.8;
  const transDelay = (idx: number) => recruiterMode ? 0.03 * idx : 0.15 * idx;

  return (
    <div className="py-20 animate-fade-in" id="projects"
      style={{ borderTop: "1px solid var(--border-primary)" }}>
      <div className="container mx-auto px-5 lg:px-28 space-y-16">
        
        {/* Section Title */}
        <div className="text-center space-y-3">
          <span className="inline-block text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full"
            style={{ background: "var(--bg-card)", color: "var(--accent)", border: "1px solid var(--border-primary)" }}>
            My Work
          </span>
          <h2 className="text-3xl lg:text-4xl font-black" style={{ color: "var(--text-primary)" }}>
            Featured{" "}
            <span style={{
              background: "var(--theme-gradient)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}>Projects</span>
          </h2>
        </div>

        {/* Projects List */}
        <div className="space-y-16">
          {projects.map((project, index) => (
            <ProjectCard 
              key={project.id} 
              project={project} 
              index={index} 
              transDuration={transDuration} 
              transDelay={transDelay} 
              handleClick={handleClick}
              handleHover={handleHover}
            />
          ))}
        </div>

      </div>
    </div>
  );
}

// ── Isolated Component to safely use React hooks for Parallax ──
function ProjectCard({ project, index, transDuration, transDelay, handleClick, handleHover }: any) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });
  
  // Creates a subtle parallax shift for the illustration as you scroll past
  const yParallax = useTransform(scrollYProgress, [0, 1], [35, -35]);

  return (
    <motion.div
      ref={ref}
      className={`flex flex-col lg:flex-row gap-10 items-center justify-between ${
        index % 2 === 0 ? "lg:flex-row" : "lg:flex-row-reverse"
      }`}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: transDuration, delay: transDelay(index), ease: "easeOut" }}
      viewport={{ once: true, margin: "-100px" }}
    >
      {/* Left Column: Visual Illustration Component */}
      <motion.div 
        className="w-full lg:w-1/2 flex items-center justify-center p-4 rounded-2xl border backdrop-blur shadow-2xl relative overflow-hidden group/ill"
        style={{ background: "var(--bg-card)", borderColor: "var(--border-primary)", y: yParallax }}
      >
        <div className="absolute inset-0 pointer-events-none"
          style={{ background: "linear-gradient(135deg, var(--accent-secondary), transparent)", opacity: 0.05 }} />
        <div className="w-full max-w-[280px] transition-transform duration-500 group-hover/ill:scale-105">
          {project.illustration}
        </div>
      </motion.div>

      {/* Right Column: Info Details */}
      <div className="w-full lg:w-1/2 space-y-4 lg:space-y-6">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="text-xs font-black px-2 py-0.5 rounded-full"
              style={{ background: "var(--accent)" + "22", color: "var(--accent)" }}>
              {project.id}
            </span>
            <span className="text-xs font-bold uppercase tracking-widest"
              style={{ color: "var(--text-muted)" }}>
              {project.type}
            </span>
          </div>
          <h3 className="font-black text-2xl lg:text-3xl" style={{ color: "var(--text-primary)" }}>
            {project.title}
          </h3>
        </div>

        <div className="text-panel py-3">
          <p className="text-sm lg:text-base leading-relaxed" style={{ color: "var(--text-body, var(--text-muted))" }}>
            {project.description}
          </p>
        </div>

        {/* Tech tags */}
        <div className="flex flex-wrap gap-2 pt-1">
          {project.tags.map((tag: string) => (
            <span key={tag}
              className="text-xs font-semibold px-3 py-1 rounded-full"
              style={{ background: "var(--bg-card)", color: "var(--accent)", border: "1px solid var(--border-primary)" }}>
              {tag}
            </span>
          ))}
        </div>

        {/* Project Links */}
        <motion.a
          href={project.link}
          target="_blank"
          rel="noopener noreferrer"
          onClick={handleClick}
          onMouseEnter={handleHover}
          className="inline-flex items-center gap-x-2 text-sm font-bold transition-colors pt-2 cursor-pointer"
          style={{ color: "var(--accent)" }}
          whileHover={{ x: 4 }}
        >
          View on GitHub <TbExternalLink size={16} />
        </motion.a>
      </div>
    </motion.div>
  );
}
