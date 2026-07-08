"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { audioSynth } from "../../utils/audioSynth";

interface PreloaderProps {
  onComplete: () => void;
}

// Floating illustrated shape component
const FloatShape = ({
  color, size, x, y, delay, shape
}: {
  color: string; size: number; x: number; y: number; delay: number; shape: "circle" | "star" | "triangle" | "square" | "donut"
}) => {
  const shapes: Record<string, React.ReactNode> = {
    circle: (
      <div style={{ width: size, height: size, borderRadius: "50%", background: color, opacity: 0.82 }} />
    ),
    star: (
      <svg width={size} height={size} viewBox="0 0 24 24">
        <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26" fill={color} opacity={0.85} />
      </svg>
    ),
    triangle: (
      <svg width={size} height={size} viewBox="0 0 24 24">
        <polygon points="12,2 22,22 2,22" fill={color} opacity={0.8} />
      </svg>
    ),
    square: (
      <div style={{ width: size, height: size, borderRadius: 6, background: color, transform: "rotate(12deg)", opacity: 0.8 }} />
    ),
    donut: (
      <svg width={size} height={size} viewBox="0 0 24 24">
        <circle cx="12" cy="12" r="10" fill="none" stroke={color} strokeWidth="3.5" opacity={0.85} />
        <circle cx="12" cy="12" r="5" fill="none" stroke={color} strokeWidth="2" opacity={0.5} />
      </svg>
    ),
  };

  return (
    <motion.div
      style={{ position: "absolute", left: `${x}%`, top: `${y}%`, zIndex: 0 }}
      initial={{ opacity: 0, scale: 0, y: 30 }}
      animate={{
        opacity: [0, 1, 0.9, 1],
        scale: [0, 1.2, 1],
        y: [30, 0, -8, 0, -6, 0],
        rotate: [0, 10, -5, 0],
      }}
      transition={{
        delay,
        duration: 1.2,
        y: { delay: delay + 1, duration: 3, repeat: Infinity, ease: "easeInOut" },
        rotate: { delay: delay + 1, duration: 4, repeat: Infinity, ease: "easeInOut" },
      }}
    >
      {shapes[shape]}
    </motion.div>
  );
};

const floatingShapes = [
  { color: "#f43f5e", size: 48, x: 5, y: 15, delay: 0.1, shape: "circle" as const },
  { color: "#fbbf24", size: 36, x: 88, y: 8, delay: 0.2, shape: "star" as const },
  { color: "#34d399", size: 42, x: 10, y: 72, delay: 0.3, shape: "triangle" as const },
  { color: "#60a5fa", size: 32, x: 82, y: 65, delay: 0.15, shape: "donut" as const },
  { color: "#a78bfa", size: 40, x: 50, y: 8, delay: 0.4, shape: "square" as const },
  { color: "#fb923c", size: 28, x: 75, y: 30, delay: 0.25, shape: "circle" as const },
  { color: "#e879f9", size: 34, x: 25, y: 85, delay: 0.35, shape: "star" as const },
  { color: "#22d3ee", size: 44, x: 60, y: 75, delay: 0.1, shape: "triangle" as const },
  { color: "#f43f5e", size: 24, x: 40, y: 20, delay: 0.5, shape: "donut" as const },
  { color: "#fbbf24", size: 30, x: 92, y: 45, delay: 0.2, shape: "square" as const },
  { color: "#34d399", size: 38, x: 2, y: 45, delay: 0.4, shape: "circle" as const },
  { color: "#60a5fa", size: 26, x: 55, y: 92, delay: 0.3, shape: "star" as const },
];

export default function Preloader({ onComplete }: PreloaderProps) {
  const [phase, setPhase] = useState(1);
  const [percent, setPercent] = useState(0);
  const [skipTriggered, setSkipTriggered] = useState(false);

  // Phases: 1 = shapes float in, 2 = progress paint, 3 = name reveal, 4 = tagline + enter
  useEffect(() => {
    if (typeof window !== "undefined") {
      const returning = localStorage.getItem("portfolio-boot-completed") === "true";
      if (returning) {
        setPhase(5); // Welcome back
        const t = setTimeout(() => onComplete(), 1400);
        return () => clearTimeout(t);
      }
    }

    // Start building the scene
    const p1 = setTimeout(() => {
      setPhase(2);
      audioSynth.playClick();
    }, 1600);

    return () => clearTimeout(p1);
  }, [onComplete]);

  // Phase 2: animated progress bar (paint brush fill)
  useEffect(() => {
    if (phase !== 2) return;
    const interval = setInterval(() => {
      setPercent((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => { setPhase(3); audioSynth.playThemeSwitch(); }, 300);
          return 100;
        }
        return prev + 1.8;
      });
    }, 25);
    return () => clearInterval(interval);
  }, [phase]);

  // Phase 3 → 4
  useEffect(() => {
    if (phase !== 3) return;
    const t = setTimeout(() => { setPhase(4); audioSynth.playUnlock(); }, 1200);
    return () => clearTimeout(t);
  }, [phase]);

  // Phase 4 → done
  useEffect(() => {
    if (phase !== 4) return;
    const t = setTimeout(() => {
      localStorage.setItem("portfolio-boot-completed", "true");
      onComplete();
    }, 2000);
    return () => clearTimeout(t);
  }, [phase, onComplete]);

  const handleSkip = () => {
    setSkipTriggered(true);
    localStorage.setItem("portfolio-boot-completed", "true");
    audioSynth.playUnlock();
    onComplete();
  };

  return (
    <AnimatePresence>
      {!skipTriggered && (
        <motion.div
          className="fixed inset-0 z-[100] overflow-hidden select-none"
          style={{ background: "linear-gradient(135deg, #fef3c7 0%, #fce7f3 40%, #ede9fe 70%, #e0f2fe 100%)" }}
          exit={{ opacity: 0, scale: 1.03 }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
        >
          {/* Floating background shapes */}
          {floatingShapes.map((s, i) => (
            <FloatShape key={i} {...s} />
          ))}

          {/* Soft radial glow center */}
          <div className="absolute inset-0 pointer-events-none"
            style={{ background: "radial-gradient(ellipse 60% 50% at 50% 50%, rgba(255,255,255,0.7) 0%, transparent 70%)" }}
          />

          {/* Skip button */}
          {phase < 5 && (
            <motion.button
              onClick={handleSkip}
              className="absolute top-5 right-5 z-[110] px-5 py-2 rounded-full text-sm font-semibold cursor-pointer transition-all"
              style={{ background: "rgba(0,0,0,0.07)", color: "#374151", border: "1.5px solid rgba(0,0,0,0.1)" }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.9 }}
              whileHover={{ scale: 1.05, background: "rgba(0,0,0,0.12)" }}
              whileTap={{ scale: 0.95 }}
            >
              Skip ✕
            </motion.button>
          )}

          {/* PHASE 1: Shapes float in (handled by FloatShape) + initial dot */}
          {phase === 1 && (
            <div className="absolute inset-0 flex items-center justify-center">
              <motion.div
                className="flex gap-3"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
              >
                {["#f43f5e", "#fbbf24", "#34d399", "#60a5fa", "#a78bfa"].map((c, i) => (
                  <motion.div
                    key={i}
                    style={{ width: 14, height: 14, borderRadius: "50%", background: c }}
                    animate={{ y: [-8, 0, -8], scale: [1, 1.3, 1] }}
                    transition={{ delay: i * 0.12, duration: 0.8, repeat: Infinity }}
                  />
                ))}
              </motion.div>
            </div>
          )}

          {/* PHASE 2: Paint progress bar */}
          {phase === 2 && (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center space-y-6 px-8 max-w-md w-full">
                <motion.p
                  className="text-base font-bold"
                  style={{ color: "#374151" }}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  Crafting your experience ✨
                </motion.p>

                {/* Paint brush style progress */}
                <div className="relative h-5 rounded-full overflow-hidden"
                  style={{ background: "rgba(0,0,0,0.07)", border: "2px solid rgba(0,0,0,0.1)" }}>
                  <motion.div
                    className="absolute inset-y-0 left-0 rounded-full"
                    style={{
                      width: `${percent}%`,
                      background: "linear-gradient(90deg, #f43f5e, #fbbf24, #34d399, #60a5fa, #a78bfa)",
                    }}
                    transition={{ duration: 0.1 }}
                  />
                  {/* Brush tip glow */}
                  <motion.div
                    className="absolute top-0 bottom-0 w-6 rounded-full"
                    style={{
                      left: `${Math.max(0, percent - 3)}%`,
                      background: "rgba(255,255,255,0.7)",
                      filter: "blur(4px)",
                    }}
                  />
                </div>

                {/* Floating mini icons */}
                <div className="flex justify-center gap-3 flex-wrap">
                  {["🎨", "✏️", "🖌️", "💡", "⚡", "🌈"].map((emoji, i) => (
                    <motion.span
                      key={i}
                      className="text-xl"
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{ opacity: 1, scale: 1, y: [0, -5, 0] }}
                      transition={{ delay: 0.1 * i, duration: 0.4, y: { delay: 0.5 + i * 0.1, duration: 1.5, repeat: Infinity } }}
                    >
                      {emoji}
                    </motion.span>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* PHASE 3: Name reveal with illustrated underline */}
          {phase === 3 && (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center space-y-4">
                <motion.div
                  initial={{ opacity: 0, y: 30, scale: 0.85 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ duration: 0.7, ease: [0.175, 0.885, 0.32, 1.275] }}
                >
                  <h1 className="font-black leading-none"
                    style={{
                      fontSize: "clamp(3rem, 10vw, 7rem)",
                      color: "#1a1a2e",
                      letterSpacing: "-2px",
                    }}>
                    Rounit<span style={{ color: "#f43f5e" }}>.Dev</span>
                  </h1>

                  {/* Hand-drawn underline SVG */}
                  <motion.svg
                    viewBox="0 0 300 20"
                    className="w-full max-w-[400px] mx-auto"
                    style={{ marginTop: -8 }}
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ delay: 0.4, duration: 0.7 }}
                  >
                    <motion.path
                      d="M 10 12 Q 75 4 150 13 Q 225 20 290 10"
                      stroke="#f43f5e"
                      strokeWidth="4"
                      fill="none"
                      strokeLinecap="round"
                      initial={{ pathLength: 0 }}
                      animate={{ pathLength: 1 }}
                      transition={{ delay: 0.4, duration: 0.7 }}
                    />
                  </motion.svg>
                </motion.div>
              </div>
            </div>
          )}

          {/* PHASE 4: Full identity + enter animation */}
          {phase === 4 && (
            <div className="absolute inset-0 flex items-center justify-center">
              <motion.div
                className="text-center space-y-6 px-8"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
              >
                <div>
                  <h1 className="font-black leading-tight" style={{ fontSize: "clamp(2.5rem, 8vw, 5.5rem)", color: "#1a1a2e" }}>
                    Rounit <span style={{ color: "#f43f5e" }}>Raj</span>
                  </h1>
                  <motion.div
                    className="flex items-center justify-center gap-2 mt-3 flex-wrap"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                  >
                    {["Creative Developer", "·", "AI Engineer", "·", "Designer"].map((t, i) => (
                      <span key={i} className="text-base font-semibold" style={{ color: i % 2 === 0 ? "#6b7280" : "#d1d5db" }}>
                        {t}
                      </span>
                    ))}
                  </motion.div>
                </div>

                {/* Colourful tags */}
                <motion.div
                  className="flex flex-wrap justify-center gap-2"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.6 }}
                >
                  {[
                    { label: "React", color: "#60a5fa" },
                    { label: "Three.js", color: "#34d399" },
                    { label: "AI/ML", color: "#a78bfa" },
                    { label: "Next.js", color: "#f43f5e" },
                    { label: "Python", color: "#fbbf24" },
                  ].map(({ label, color }) => (
                    <motion.span
                      key={label}
                      className="px-3 py-1 rounded-full text-xs font-bold text-white"
                      style={{ background: color }}
                      whileHover={{ scale: 1.08 }}
                    >
                      {label}
                    </motion.span>
                  ))}
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.9 }}
                  className="flex justify-center"
                >
                  <div className="w-10 h-10 rounded-full flex items-center justify-center animate-bounce"
                    style={{ background: "#f43f5e" }}>
                    <span className="text-white text-lg">↓</span>
                  </div>
                </motion.div>
              </motion.div>
            </div>
          )}

          {/* PHASE 5: Welcome back — illustrated tech scene */}
          {phase === 5 && (
            <div className="absolute inset-0 flex items-center justify-center overflow-hidden">
              {/* Floating tech icons orbit */}
              {[
                { emoji: "⚛️", x: "12%", y: "18%", delay: 0.05, size: 44 },
                { emoji: "🤖", x: "78%", y: "12%", delay: 0.1,  size: 52 },
                { emoji: "☁️", x: "5%",  y: "55%", delay: 0.15, size: 40 },
                { emoji: "⚡", x: "85%", y: "58%", delay: 0.2,  size: 38 },
                { emoji: "🎨", x: "48%", y: "8%",  delay: 0.25, size: 42 },
                { emoji: "🔥", x: "20%", y: "82%", delay: 0.1,  size: 36 },
                { emoji: "🌐", x: "72%", y: "80%", delay: 0.3,  size: 40 },
                { emoji: "🐍", x: "38%", y: "88%", delay: 0.2,  size: 34 },
              ].map(({ emoji, x, y, delay, size }, i) => (
                <motion.div
                  key={i}
                  style={{ position: "absolute", left: x, top: y, fontSize: size, lineHeight: 1 }}
                  initial={{ opacity: 0, scale: 0, rotate: -20 }}
                  animate={{ opacity: 1, scale: 1, rotate: 0, y: [0, -10, 0] }}
                  transition={{
                    delay,
                    duration: 0.5,
                    y: { delay: delay + 0.5, duration: 2.5 + i * 0.3, repeat: Infinity, ease: "easeInOut" },
                  }}
                >
                  {emoji}
                </motion.div>
              ))}

              {/* Central illustrated monitor */}
              <motion.div
                className="text-center space-y-5 relative z-10"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: [0.175, 0.885, 0.32, 1.275] }}
              >
                {/* Illustrated computer screen */}
                <div className="relative mx-auto" style={{ width: 220 }}>
                  <svg viewBox="0 0 220 160" fill="none" xmlns="http://www.w3.org/2000/svg">
                    {/* Monitor body */}
                    <rect x="10" y="10" width="200" height="120" rx="12" fill="#1e1b4b" stroke="#7c3aed" strokeWidth="3"/>
                    {/* Screen glow */}
                    <rect x="20" y="20" width="180" height="100" rx="8" fill="#0f0a2e"/>
                    {/* Code lines on screen */}
                    <rect x="32" y="34" width="80" height="5" rx="2.5" fill="#f43f5e" opacity="0.9"/>
                    <rect x="32" y="46" width="120" height="5" rx="2.5" fill="#60a5fa" opacity="0.8"/>
                    <rect x="32" y="58" width="60" height="5" rx="2.5" fill="#34d399" opacity="0.9"/>
                    <rect x="48" y="70" width="100" height="5" rx="2.5" fill="#a78bfa" opacity="0.8"/>
                    <rect x="32" y="82" width="140" height="5" rx="2.5" fill="#fbbf24" opacity="0.7"/>
                    <rect x="32" y="94" width="90" height="5" rx="2.5" fill="#60a5fa" opacity="0.6"/>
                    {/* Cursor blink */}
                    <motion.rect
                      x="128" y="94" width="8" height="8" rx="1" fill="#f43f5e"
                      animate={{ opacity: [1, 0, 1] }}
                      transition={{ duration: 0.8, repeat: Infinity }}
                    />
                    {/* Monitor stand */}
                    <rect x="100" y="130" width="20" height="16" rx="2" fill="#1e1b4b"/>
                    <rect x="80" y="144" width="60" height="8" rx="4" fill="#312e81"/>
                    {/* Status dot */}
                    <circle cx="110" cy="17" r="3.5" fill="#34d399">
                      <animate attributeName="opacity" values="1;0.3;1" dur="1.5s" repeatCount="indefinite"/>
                    </circle>
                  </svg>

                  {/* Floating mini chips around monitor */}
                  <motion.div
                    style={{ position: "absolute", top: -16, right: -20 }}
                    animate={{ rotate: [0, 10, -5, 0], y: [0, -4, 0] }}
                    transition={{ duration: 3, repeat: Infinity }}
                  >
                    <div style={{
                      background: "#f43f5e", color: "#fff", fontSize: 10, fontWeight: 800,
                      padding: "3px 9px", borderRadius: 20, whiteSpace: "nowrap",
                    }}>React</div>
                  </motion.div>
                  <motion.div
                    style={{ position: "absolute", bottom: 30, left: -28 }}
                    animate={{ rotate: [0, -8, 5, 0], y: [0, 4, 0] }}
                    transition={{ duration: 3.5, repeat: Infinity, delay: 0.5 }}
                  >
                    <div style={{
                      background: "#7c3aed", color: "#fff", fontSize: 10, fontWeight: 800,
                      padding: "3px 9px", borderRadius: 20,
                    }}>AI/ML</div>
                  </motion.div>
                  <motion.div
                    style={{ position: "absolute", bottom: 18, right: -24 }}
                    animate={{ rotate: [0, 6, -4, 0], y: [0, -5, 0] }}
                    transition={{ duration: 4, repeat: Infinity, delay: 1 }}
                  >
                    <div style={{
                      background: "#0ea5e9", color: "#fff", fontSize: 10, fontWeight: 800,
                      padding: "3px 9px", borderRadius: 20,
                    }}>Cloud</div>
                  </motion.div>
                </div>

                {/* Text */}
                <div className="space-y-2">
                  <h2 className="text-2xl font-black" style={{ color: "#1a1a2e" }}>
                    Welcome back! 👋
                  </h2>
                  <p className="text-sm font-medium" style={{ color: "#6b7280" }}>
                    Your creative space is ready
                  </p>
                  {/* Colourful dots progress */}
                  <div className="flex justify-center gap-2 pt-1">
                    {["#f43f5e","#fbbf24","#34d399","#60a5fa","#a78bfa"].map((c, i) => (
                      <motion.div
                        key={i}
                        style={{ width: 8, height: 8, borderRadius: "50%", background: c }}
                        animate={{ scale: [1, 1.5, 1], opacity: [0.5, 1, 0.5] }}
                        transition={{ duration: 1, repeat: Infinity, delay: i * 0.15 }}
                      />
                    ))}
                  </div>
                </div>
              </motion.div>
            </div>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
