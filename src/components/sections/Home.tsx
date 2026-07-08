"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Mail, ShieldAlert } from "lucide-react";
import { FaGithub as Github, FaLinkedin as Linkedin } from "react-icons/fa6";
import { TypeAnimation } from "react-type-animation";
import DeveloperWorkstation from "../illustrations/DeveloperWorkstation";
import FloatingCode from "../illustrations/FloatingCode";
import { audioSynth } from "../../utils/audioSynth";
import { usePortfolioStore } from "../../store/portfolioStore";

// Floating illustrated decorative shapes behind hero text
const HeroShape = ({ color, size, x, y, delay, shape }: {
  color: string; size: number; x: string; y: string; delay: number;
  shape: "circle" | "triangle" | "square" | "donut"
}) => {
  const el = {
    circle: <div style={{ width: size, height: size, borderRadius: "50%", background: color, opacity: 0.22 }} />,
    triangle: (
      <svg width={size} height={size} viewBox="0 0 24 24" style={{ opacity: 0.22 }}>
        <polygon points="12,2 22,22 2,22" fill={color} />
      </svg>
    ),
    square: <div style={{ width: size, height: size, borderRadius: 8, background: color, transform: "rotate(20deg)", opacity: 0.18 }} />,
    donut: (
      <svg width={size} height={size} viewBox="0 0 24 24" style={{ opacity: 0.22 }}>
        <circle cx="12" cy="12" r="10" fill="none" stroke={color} strokeWidth="3.5" />
      </svg>
    ),
  };

  return (
    <motion.div
      style={{ position: "absolute", left: x, top: y, pointerEvents: "none", zIndex: 0 }}
      animate={{ y: ["0%", "-8%", "0%"], rotate: [0, 8, 0] }}
      transition={{ delay, duration: 4 + delay, repeat: Infinity, ease: "easeInOut" }}
    >
      {el[shape]}
    </motion.div>
  );
};

// Count-up digits animation for developer stats
const Counter = ({ value }: { value: string }) => {
  const numericString = value.replace(/\D/g, ""); // Extract digits e.g. "15"
  const suffix = value.replace(/\d/g, ""); // Extract non-digits e.g. "+"
  const target = parseInt(numericString, 10) || 0;
  
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const end = target;
    if (start === end) return;

    // Delay start until name animations finish (1.2 seconds)
    const startDelay = 1200;
    // Slower duration for counting transition (2.2 seconds)
    const duration = 2200; 
    let frameId: number;

    const delayTimeout = setTimeout(() => {
      const startTime = performance.now();

      const updateCount = (currentTime: number) => {
        const elapsedTime = currentTime - startTime;
        const progress = Math.min(elapsedTime / duration, 1);
        
        // Easing function (easeOutQuad)
        const easeProgress = progress * (2 - progress);
        
        const currentVal = Math.floor(easeProgress * (end - start) + start);
        setCount(currentVal);

        if (progress < 1) {
          frameId = requestAnimationFrame(updateCount);
        }
      };

      frameId = requestAnimationFrame(updateCount);
    }, startDelay);

    return () => {
      clearTimeout(delayTimeout);
      if (frameId) cancelAnimationFrame(frameId);
    };
  }, [target]);

  return <>{count}{suffix}</>;
};

export default function Home() {
  const { recruiterMode, toggleRecruiterMode } = usePortfolioStore();

  const handleHover = () => audioSynth.playHover();
  const handleClick = () => audioSynth.playClick();

  const stats = [
    { label: "Projects Completed", value: "15+" },
    { label: "ML Models Built", value: "20+" },
    { label: "Cloud Services", value: "8+" },
  ];

  const transDuration = recruiterMode ? 0.15 : 0.8;
  const transDelay = (d: number) => recruiterMode ? 0.05 : d;

  return (
    <div className="relative min-h-[90vh] flex items-center pt-28 pb-10 overflow-hidden" id="home">
      {/* Background decorative shapes — visible in all themes */}
      <HeroShape color="var(--accent)" size={120} x="3%" y="10%" delay={0} shape="circle" />
      <HeroShape color="var(--accent-secondary)" size={80} x="88%" y="5%" delay={0.5} shape="triangle" />
      <HeroShape color="var(--accent-glow)" size={60} x="6%" y="70%" delay={1} shape="square" />
      <HeroShape color="var(--accent)" size={90} x="85%" y="60%" delay={0.3} shape="donut" />
      <HeroShape color="var(--accent-secondary)" size={50} x="45%" y="85%" delay={0.8} shape="circle" />

      {/* Soft glow blobs */}
      <div className="absolute top-[15%] left-[5%] w-72 h-72 rounded-full pointer-events-none"
        style={{ background: "var(--accent-glow)", opacity: 0.05, filter: "blur(80px)" }} />
      <div className="absolute bottom-[10%] right-[8%] w-80 h-80 rounded-full pointer-events-none"
        style={{ background: "var(--accent-secondary)", opacity: 0.06, filter: "blur(100px)" }} />

      <div className="container mx-auto px-5 lg:px-28 w-full flex flex-col-reverse lg:flex-row items-center justify-between gap-10 relative z-10">

        {/* Left: Text Content */}
        <motion.div
          className="lg:w-[52%] space-y-6 text-left"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: transDuration, ease: "easeOut" }}
        >
          {/* Status chip */}
          <motion.div
            className="glass-panel liquid-glass-border inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold cursor-pointer"
            style={{
              background: "var(--bg-card)",
              borderColor: "var(--border-primary)",
              color: "var(--accent)",
            }}
            whileHover={{ scale: 1.04 }}
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75"
                style={{ background: "var(--accent-glow)" }} />
              <span className="relative inline-flex rounded-full h-2 w-2"
                style={{ background: "var(--accent-glow)" }} />
            </span>
            Available for Work ✨
          </motion.div>

          {/* Name */}
          <div className="space-y-2">
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="text-lg font-medium tracking-wider text-readable" 
              style={{ color: "var(--text-muted)" }}
            >
              Hello, I&apos;m
            </motion.p>
            <h1 className="font-black leading-none text-readable flex flex-wrap" style={{
              fontSize: "clamp(2.8rem, 6vw, 5rem)",
              color: "var(--text-primary)",
              letterSpacing: "-1px",
            }}>
              {"Rounit".split("").map((char, index) => (
                <motion.span
                  key={`r-${index}`}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    delay: 0.3 + index * 0.05,
                    type: "spring",
                    stiffness: 150,
                    damping: 15
                  }}
                  className="inline-block"
                >
                  {char}
                </motion.span>
              ))}
              <span className="inline-block w-[0.25em]" />
              {"Raj".split("").map((char, index) => (
                <motion.span
                  key={`j-${index}`}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    delay: 0.65 + index * 0.05,
                    type: "spring",
                    stiffness: 150,
                    damping: 15
                  }}
                  className="inline-block"
                  style={{
                    background: "var(--theme-gradient)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                  }}
                >
                  {char}
                </motion.span>
              ))}
            </h1>

            {/* Typewriter */}
            <div className="flex items-center gap-2 text-lg font-bold text-readable" style={{ color: "var(--text-primary)" }}>
              <span style={{ color: "var(--accent-glow)" }}>→</span>
              <TypeAnimation
                sequence={[
                  "Software Developer",
                  1500,
                  "AI / ML Engineer",
                  1500,
                  "Cloud Architect",
                  1500,
                  "Creative Tinkerer",
                  1500,
                ]}
                speed={42}
                repeat={Infinity}
              />
            </div>
          </div>

          <div className="text-panel">
            <p className="text-base leading-relaxed" style={{ color: "var(--text-body, var(--text-muted))" }}>
              I engineer{" "}
              <strong className="text-highlight">distributed data streams</strong>,{" "}
              <strong className="text-highlight">custom neural networks</strong>, and{" "}
              <strong className="text-highlight">sleek frontend experiences</strong>{" "}
              — connecting intelligent backends to beautiful human interfaces.
            </p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-4 py-4" style={{ borderTop: "1px solid var(--border-primary)", borderBottom: "1px solid var(--border-primary)" }}>
            {stats.map((s, i) => (
              <div key={i} className="space-y-0.5">
                <span className="text-2xl font-black text-readable" style={{ color: "var(--accent-glow)" }}>
                  <Counter value={s.value} />
                </span>
                <p className="text-[10px] font-bold uppercase tracking-wider" style={{ color: "var(--text-muted)" }}>{s.label}</p>
              </div>
            ))}
          </div>

          {/* CTAs */}
          <div className="flex flex-wrap items-center gap-3 pt-1">
            <motion.a
              href="#projects"
              onClick={handleClick}
              onMouseEnter={handleHover}
              className="px-6 py-3 rounded-full font-bold text-sm cursor-pointer"
              style={{
                background: "var(--theme-gradient)",
                color: "#fff",
                boxShadow: "0 4px 20px var(--shadow-glow)",
              }}
              whileHover={{ scale: 1.04, boxShadow: "0 6px 30px var(--shadow-glow)" }}
              whileTap={{ scale: 0.97 }}
            >
              View My Work ✦
            </motion.a>

            <motion.button
              onClick={toggleRecruiterMode}
              onMouseEnter={handleHover}
              className={`glass-panel liquid-glass-border px-5 py-3 rounded-full text-sm font-bold border cursor-pointer flex items-center gap-2 transition-all ${recruiterMode
                ? "border-red-400 text-red-400"
                : ""
                }`}
              style={recruiterMode
                ? { background: "rgba(239,68,68,0.1)", boxShadow: "0 0 16px rgba(239,68,68,0.2)", borderColor: "rgba(239,68,68,0.4)" }
                : { background: "var(--btn-bg)", borderColor: "var(--btn-border)", color: "var(--btn-text)" }
              }
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
            >
              <ShieldAlert size={14} />
              {recruiterMode ? "Recruiter Mode: ON" : "Recruiter Mode"}
            </motion.button>

            {/* Social links */}
            <div className="flex gap-2">
              {[
                { icon: Github, link: "https://github.com/Marvel-Spiderman", name: "GitHub" },
                { icon: Linkedin, link: "https://www.linkedin.com/in/rounit-raj/", name: "LinkedIn" },
                { icon: Mail, link: "mailto:rounitraj12@gmail.com", name: "Email" },
              ].map((item, i) => {
                const Icon = item.icon;
                return (
                  <motion.a
                    key={i}
                    href={item.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={handleClick}
                    onMouseEnter={handleHover}
                    className="glass-panel liquid-glass-border p-3 rounded-full border cursor-pointer transition-all"
                    style={{
                      background: "var(--btn-bg)",
                      borderColor: "var(--btn-border)",
                      color: "var(--btn-text)",
                    }}
                    whileHover={{ scale: 1.1, borderColor: "var(--accent)", color: "var(--text-primary)" }}
                    whileTap={{ scale: 0.92 }}
                    title={item.name}
                  >
                    <Icon size={15} />
                  </motion.a>
                );
              })}
            </div>
          </div>
        </motion.div>

        {/* Right: Illustration */}
        <motion.div
          className="lg:w-[44%] w-full max-w-sm lg:max-w-none mx-auto flex flex-col items-center justify-center relative"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: transDuration, ease: "easeOut", delay: transDelay(0.15) }}
        >
          <DeveloperWorkstation />
          <div className="absolute right-0 bottom-0 z-10 translate-y-6 hidden lg:block opacity-60 hover:opacity-100 transition-opacity duration-300">
            <FloatingCode />
          </div>
        </motion.div>
      </div>
    </div>
  );
}
