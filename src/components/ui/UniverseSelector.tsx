"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, Volume2, VolumeX, X, Check } from "lucide-react";
import { universesData } from "../../utils/universes";
import { usePortfolioStore } from "../../store/portfolioStore";
import { audioSynth } from "../../utils/audioSynth";

// Universe emoji icons for each theme
const universeEmojis: Record<string, string> = {
  "universe-liquid-glass": "💎",
  "universe-cyberpunk": "⚡",
  "universe-gaming": "🎮",
  "universe-illustration": "🎨",
  "universe-blueprint": "📐",
  "universe-cosmos": "🌌",
  "universe-retro-arcade": "🕹️",
};

// Universe preview gradients for the mini card
const universePreviews: Record<string, { from: string; to: string }> = {
  "universe-liquid-glass":  { from: "#60a5fa", to: "#3b82f6" },
  "universe-cyberpunk":     { from: "#d946ef", to: "#06b6d4" },
  "universe-gaming":        { from: "#ef4444", to: "#f97316" },
  "universe-illustration":  { from: "#f43f5e", to: "#fbbf24" },
  "universe-blueprint":     { from: "#22d3ee", to: "#0ea5e9" },
  "universe-cosmos":        { from: "#7c3aed", to: "#a78bfa" },
  "universe-retro-arcade":  { from: "#3b82f6", to: "#f43f5e" },
};

export default function UniverseSelector() {
  const [isOpen, setIsOpen] = useState(false);
  const {
    activeUniverse,
    setUniverse,
    isMuted,
    setMuted,
    initializeFromStorage,
  } = usePortfolioStore();

  useEffect(() => {
    initializeFromStorage();
  }, [initializeFromStorage]);

  const handleUniverseSwitch = (id: string) => {
    setUniverse(id);
    audioSynth.playThemeSwitch(id);
  };

  const { from, to } = universePreviews[activeUniverse] || { from: "#60a5fa", to: "#3b82f6" };

  return (
    <>
      {/* ── FAB Button Group ── */}
      <div className="fixed bottom-6 right-6 z-[60] flex flex-col gap-3 items-end">

        {/* Mute toggle */}
        <motion.button
          onClick={() => setMuted(!isMuted)}
          title={isMuted ? "Unmute audio" : "Mute audio"}
          className="w-11 h-11 rounded-full flex items-center justify-center cursor-pointer transition-all"
          style={{
            background: "var(--bg-card)",
            backdropFilter: "blur(20px)",
            WebkitBackdropFilter: "blur(20px)",
            border: "1.5px solid var(--border-primary)",
            boxShadow: "0 4px 20px rgba(0,0,0,0.25)",
          }}
          whileHover={{ scale: 1.1, borderColor: "var(--accent)" }}
          whileTap={{ scale: 0.93 }}
        >
          {isMuted
            ? <VolumeX size={17} style={{ color: "#ef4444" }} />
            : <Volume2 size={17} className="animate-pulse" style={{ color: "#22c55e" }} />
          }
        </motion.button>

        {/* Theme picker trigger */}
        <motion.button
          onClick={() => { audioSynth.playClick(); setIsOpen(true); }}
          title="Switch Universe Theme"
          className="w-14 h-14 rounded-full flex items-center justify-center cursor-pointer relative overflow-hidden"
          style={{
            background: `linear-gradient(135deg, ${from}, ${to})`,
            boxShadow: `0 0 24px ${from}60, 0 4px 16px rgba(0,0,0,0.3)`,
            border: "2px solid rgba(255,255,255,0.25)",
          }}
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.94 }}
          animate={{ boxShadow: [`0 0 18px ${from}40`, `0 0 32px ${from}70`, `0 0 18px ${from}40`] }}
          transition={{ duration: 2.5, repeat: Infinity }}
        >
          <span className="text-2xl">{universeEmojis[activeUniverse] || "✨"}</span>
        </motion.button>
      </div>

      {/* ── Side Drawer ── */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Frosted backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 z-[65]"
              style={{ backdropFilter: "blur(6px)", WebkitBackdropFilter: "blur(6px)", background: "rgba(0,0,0,0.3)" }}
            />

            {/* Drawer panel — blended with active theme */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 28, stiffness: 240 }}
              className="fixed top-0 right-0 z-[70] h-screen w-[85vw] max-w-[340px] flex flex-col"
              style={{
                background: "var(--bg-card)",
                backdropFilter: "blur(40px)",
                WebkitBackdropFilter: "blur(40px)",
                borderLeft: "1px solid var(--border-primary)",
                boxShadow: "-8px 0 40px rgba(0,0,0,0.35)",
              }}
            >
              {/* Gradient accent bar at top */}
              <div className="h-1 w-full flex-shrink-0" style={{ background: `linear-gradient(90deg, ${from}, ${to})` }} />

              {/* Header */}
              <div className="flex items-center justify-between px-6 py-5 flex-shrink-0"
                style={{ borderBottom: "1px solid var(--border-primary)" }}>
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-xl flex items-center justify-center text-xl"
                    style={{ background: `linear-gradient(135deg, ${from}30, ${to}30)`, border: `1px solid ${from}50` }}>
                    <Sparkles size={16} style={{ color: from }} />
                  </div>
                  <div>
                    <h3 className="font-black text-base" style={{ color: "var(--text-primary)" }}>
                      Choose Universe
                    </h3>
                    <p className="text-[10px] font-medium" style={{ color: "var(--text-muted)" }}>
                      6 visual dimensions
                    </p>
                  </div>
                </div>
                <motion.button
                  onClick={() => setIsOpen(false)}
                  className="w-8 h-8 rounded-lg flex items-center justify-center cursor-pointer transition-all"
                  style={{ background: "var(--bg-card)", border: "1px solid var(--border-primary)", color: "var(--text-muted)" }}
                  whileHover={{ scale: 1.1, color: "var(--text-primary)" }}
                  whileTap={{ scale: 0.93 }}
                >
                  <X size={15} />
                </motion.button>
              </div>

              {/* Universe list */}
              <div className="flex-1 overflow-y-auto px-5 py-4 space-y-2.5"
                style={{ scrollbarWidth: "none" }}>
                {universesData.map((uni, idx) => {
                  const isActive = activeUniverse === uni.id;
                  const prev = universePreviews[uni.id];
                  const emoji = universeEmojis[uni.id];

                  return (
                    <motion.div
                      key={uni.id}
                      onClick={() => handleUniverseSwitch(uni.id)}
                      className="flex items-center gap-3.5 p-3.5 rounded-2xl cursor-pointer relative overflow-hidden group"
                      style={isActive ? {
                        background: `linear-gradient(135deg, ${prev.from}22, ${prev.to}16)`,
                        border: `1.5px solid ${prev.from}55`,
                        boxShadow: `0 0 20px ${prev.from}25`,
                        transition: "all 0.25s ease",
                      } : {
                        background: "var(--bg-card)",
                        border: "1.5px solid var(--border-primary)",
                        transition: "all 0.25s ease",
                      }}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: idx * 0.05 }}
                      whileHover={{
                        scale: 1.02,
                        borderColor: prev.from + "80",
                      }}
                      whileTap={{ scale: 0.98 }}
                    >
                      {/* Mini gradient preview pill */}
                      <div className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0 text-xl"
                        style={{ background: `linear-gradient(135deg, ${prev.from}, ${prev.to})` }}>
                        {emoji}
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-bold" style={{ color: "var(--text-primary)" }}>
                            {uni.name}
                          </span>
                          {isActive && (
                            <motion.div
                              initial={{ scale: 0 }}
                              animate={{ scale: 1 }}
                              className="flex items-center gap-1 px-1.5 py-0.5 rounded-full text-[9px] font-bold"
                              style={{ background: prev.from + "25", color: prev.from }}
                            >
                              <Check size={9} />
                              Active
                            </motion.div>
                          )}
                        </div>
                        <p className="text-[10px] font-medium truncate mt-0.5" style={{ color: "var(--text-muted)" }}>
                          {uni.description}
                        </p>
                      </div>

                      {/* Colour swatch dots */}
                      <div className="flex gap-1 flex-shrink-0">
                        <div className="w-3 h-3 rounded-full" style={{ background: uni.swatch.accent }} />
                        <div className="w-3 h-3 rounded-full" style={{ background: uni.swatch.accentSecondary }} />
                      </div>
                    </motion.div>
                  );
                })}
              </div>

              {/* Footer */}
              <div className="px-6 py-4 flex-shrink-0 space-y-3"
                style={{ borderTop: "1px solid var(--border-primary)" }}>
                {/* Sound toggle */}
                <button
                  onClick={() => setMuted(!isMuted)}
                  className="w-full flex items-center justify-between px-4 py-2.5 rounded-xl cursor-pointer transition-all"
                  style={{ background: "var(--bg-card)", border: "1px solid var(--border-primary)" }}
                >
                  <span className="text-xs font-semibold" style={{ color: "var(--text-muted)" }}>
                    Sound Effects
                  </span>
                  <div className={`w-8 h-4 rounded-full relative transition-all ${isMuted ? "" : ""}`}
                    style={{ background: isMuted ? "rgba(255,255,255,0.08)" : from }}>
                    <motion.div
                      className="absolute top-0.5 w-3 h-3 rounded-full bg-white"
                      animate={{ left: isMuted ? 2 : 18 }}
                      transition={{ type: "spring", stiffness: 300, damping: 25 }}
                    />
                  </div>
                </button>

                <p className="text-[9px] text-center font-medium" style={{ color: "var(--text-muted)", opacity: 0.5 }}>
                  Portfolio Engine v2.0
                </p>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
