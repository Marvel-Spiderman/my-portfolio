"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageSquareCode, Sparkles, X, Send, Trash2 } from "lucide-react";
import { audioSynth } from "../../utils/audioSynth";
import { usePortfolioStore } from "../../store/portfolioStore";
import AiCompanion from "../illustrations/AiCompanion";

interface ChatMessage {
  sender: "bot" | "user";
  text: string;
  timestamp: string;
}

export default function AiAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [showTip, setShowTip] = useState(true);
  const [tipMessage, setTipMessage] = useState("Greetings! Click on me to reveal diagnostic commands and navigation tips.");
  const [inputVal, setInputVal] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  
  const [chatLog, setChatLog] = useState<ChatMessage[]>([
    {
      sender: "bot",
      text: "Greetings! I am Rounit's neural core. Ask me anything, or try typing commands like 'projects', 'theme', 'skills', or 'contact'.",
      timestamp: "System Init",
    },
  ]);

  const { activeUniverse, setUniverse, recruiterMode, unlockedAchievements, unlockAchievement } = usePortfolioStore();
  const logEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll chat log to bottom
  useEffect(() => {
    logEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chatLog, isTyping]);

  // Context-aware background suggestions on scroll (updates the small tip)
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const height = document.documentElement.scrollHeight - window.innerHeight;
      const ratio = scrollY / (height || 1);

      let contextMsg = "";
      if (ratio < 0.15) {
        contextMsg = "Hi! Click the 'Recruiter Mode' button if you're in a rush to check my resume.";
      } else if (ratio >= 0.15 && ratio < 0.45) {
        contextMsg = "Try toggling universes in the Theme selector to watch illustrations and cursor layouts change!";
      } else if (ratio >= 0.45 && ratio < 0.75) {
        contextMsg = "Each project illustration is a custom animated SVG. Tap dials or hover cards to interact!";
      } else if (ratio >= 0.75) {
        contextMsg = "Did you know there's a hidden developer terminal? Press 'Ctrl + `' to launch the console.";
      }

      if (contextMsg && tipMessage !== contextMsg) {
        setTipMessage(contextMsg);
        setShowTip(true);
        
        // Synced to chat log history
        setChatLog((prev) => {
          if (prev.length > 2) return prev; // don't interrupt active chat sessions
          return [
            ...prev.slice(0, 1),
            { sender: "bot", text: contextMsg, timestamp: "System Update" }
          ];
        });
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [tipMessage, chatLog]);

  // Listen for achievement unlocks
  useEffect(() => {
    if (unlockedAchievements.length > 0) {
      const last = unlockedAchievements[unlockedAchievements.length - 1];
      let alertMsg = "";
      if (last === "secret-easter") {
        alertMsg = "Outstanding! You discovered the Konami Code cheat easter egg! +250 XP unlocked.";
      } else if (last === "all-universes") {
        alertMsg = "Incredible! You have visited all 6 dimensions. +200 XP unlocked!";
      } else if (last === "downloaded-resume") {
        alertMsg = "Resume Download initiated successfully! Achievement unlocked: 'Recruiter's Favour'.";
      }

      if (alertMsg) {
        setTipMessage(alertMsg);
        setShowTip(true);
        setChatLog((prev) => [...prev, { sender: "bot", text: alertMsg, timestamp: "Achievement" }]);
      }
    }
  }, [unlockedAchievements]);

  const handleWidgetClick = () => {
    audioSynth.playClick();
    setIsOpen(!isOpen);
    setShowTip(false);
  };

  const getSystemResponse = (cmd: string): string => {
    const cleanCmd = cmd.toLowerCase().trim();

    if (cleanCmd.includes("project") || cleanCmd.includes("work")) {
      return "I've loaded Rounit's featured projects: \n1. NeuroForge RAG Orchestrator\n2. AWS CloudMonitor SaaS\n3. EdgeAI Vision Pipeline\n\nScroll down to the 'My Work' section to see live illustrations and metrics!";
    }
    if (cleanCmd.includes("skill") || cleanCmd.includes("tech")) {
      return "Rounit's expertise covers AI/ML Models (PyTorch, LangChain), Programming (Python, TypeScript, Go), Cloud & Data (AWS, Docker, Kafka), and Frontend UX (React, Tailwind, Framer). Click on any skill card above to check their breakdown!";
    }
    if (cleanCmd.includes("contact") || cleanCmd.includes("hire") || cleanCmd.includes("email")) {
      return "You can get in touch directly via Email (rounitraj12@gmail.com) or LinkedIn. Simply fill out the contact form below or click on the direct cards to reach out!";
    }
    if (cleanCmd.includes("resume") || cleanCmd.includes("cv")) {
      unlockAchievement("downloaded-resume");
      return "Sure thing! Download my resume directly from the header button or from the link in the footer. Achievement unlocked!";
    }
    if (cleanCmd.includes("theme") || cleanCmd.includes("change") || cleanCmd.includes("background")) {
      const themes = ["universe-liquid-glass", "universe-cyberpunk", "universe-gaming", "universe-illustration", "universe-blueprint", "universe-cosmos"];
      const nextTheme = themes[(themes.indexOf(activeUniverse) + 1) % themes.length];
      setUniverse(nextTheme);
      return `Dimension shifted successfully! Switched active universe theme to: ${nextTheme.replace("universe-", "").toUpperCase()}.`;
    }
    if (cleanCmd.includes("secret") || cleanCmd.includes("easter") || cleanCmd.includes("konami")) {
      return "Cheat Code Hint: Try pressing Up, Up, Down, Down, Left, Right, Left, Right, B, A on your keyboard to reveal a hidden achievement!";
    }
    if (cleanCmd === "clear") {
      return "CLEAR_LOG";
    }

    return "Processing request... My knowledge core covers Rounit's projects, skills, resume, and contact links. Try commands like 'projects', 'theme', 'skills', or 'contact'!";
  };

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputVal.trim()) return;

    audioSynth.playClick();
    const userMsg = inputVal;
    setInputVal("");

    const time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    setChatLog((prev) => [...prev, { sender: "user", text: userMsg, timestamp: time }]);

    setIsTyping(true);

    setTimeout(() => {
      const botResponse = getSystemResponse(userMsg);
      setIsTyping(false);

      if (botResponse === "CLEAR_LOG") {
        setChatLog([
          {
            sender: "bot",
            text: "Neural core log cleared. Commands: 'projects', 'theme', 'skills', 'contact'.",
            timestamp: "System Reset",
          },
        ]);
      } else {
        setChatLog((prev) => [
          ...prev,
          { sender: "bot", text: botResponse, timestamp: time },
        ]);
        audioSynth.playUnlock?.();
      }
    }, 900);
  };

  const handleClearHistory = () => {
    audioSynth.playClick();
    setChatLog([
      {
        sender: "bot",
        text: "Log reset. Ready for input. Commands: 'projects', 'theme', 'skills', 'contact'.",
        timestamp: "System Init",
      },
    ]);
  };

  return (
    <div className="fixed bottom-6 left-6 z-[60] flex flex-col items-start gap-y-3">
      {/* 1. Full-Featured Chat Console popup (only shown when expanded) */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.85, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.85, y: 15 }}
            className="w-72 sm:w-80 border rounded-3xl shadow-2xl backdrop-blur-2xl relative flex flex-col max-h-[380px]"
            style={{
              background: "var(--bg-card)",
              borderColor: "var(--border-primary)",
            }}
          >
            {/* Top scanning highlight bar */}
            <div className="absolute top-0 left-0 w-full h-[2px] rounded-t-3xl" style={{ background: "var(--theme-gradient)" }} />

            {/* Header info */}
            <div className="flex justify-between items-center px-4 py-3 border-b select-none font-mono" style={{ borderColor: "var(--border-primary)" }}>
              <span className="text-[10px] font-bold tracking-wider flex items-center gap-x-1.5" style={{ color: "var(--accent)" }}>
                <Sparkles size={11} className="animate-spin-slow" /> COMPANION_CORE.EXE
              </span>
              <div className="flex items-center gap-x-2">
                <button
                  onClick={handleClearHistory}
                  title="Clear Chat Log"
                  className="text-slate-400 hover:text-red-400 cursor-pointer p-0.5"
                >
                  <Trash2 size={12} />
                </button>
                <button
                  onClick={() => {
                    audioSynth.playClick();
                    setIsOpen(false);
                    setShowTip(false);
                  }}
                  className="text-slate-400 hover:text-white cursor-pointer p-0.5"
                >
                  <X size={13} />
                </button>
              </div>
            </div>

            {/* Micro visual avatar companion in background */}
            <div className="absolute top-[48px] right-2 w-14 h-14 opacity-25 pointer-events-none select-none">
              <AiCompanion />
            </div>

            {/* Messages box log */}
            <div className="flex-1 overflow-y-auto px-4 py-3 space-y-3 min-h-[180px] max-h-[220px] rounded-b-3xl">
              {chatLog.map((msg, index) => (
                <div
                  key={index}
                  className={`flex flex-col max-w-[85%] ${
                    msg.sender === "user" ? "ml-auto items-end" : "mr-auto items-start"
                  }`}
                >
                  <div
                    className="p-2.5 rounded-2xl text-[11px] font-medium leading-relaxed font-sans-clean"
                    style={{
                      background: msg.sender === "user" ? "var(--theme-gradient)" : "rgba(255, 255, 255, 0.05)",
                      color: msg.sender === "user" ? "#ffffff" : "var(--text-primary)",
                      border: msg.sender === "user" ? "none" : "1px solid var(--border-primary)",
                    }}
                  >
                    {msg.text.split("\n").map((line, idx) => (
                      <span key={idx} className="block">{line}</span>
                    ))}
                  </div>
                  <span className="text-[8px] font-bold mt-1 font-mono uppercase tracking-wider" style={{ color: "var(--text-muted)", opacity: 0.7 }}>
                    {msg.timestamp}
                  </span>
                </div>
              ))}

              {isTyping && (
                <div className="flex flex-col items-start max-w-[85%] mr-auto">
                  <div
                    className="p-2.5 rounded-2xl text-[10px] font-mono flex items-center gap-1"
                    style={{
                      background: "rgba(255, 255, 255, 0.04)",
                      color: "var(--text-primary)",
                      border: "1px solid var(--border-primary)",
                    }}
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent)] animate-bounce" style={{ animationDelay: "0ms" }} />
                    <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent)] animate-bounce" style={{ animationDelay: "150ms" }} />
                    <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent)] animate-bounce" style={{ animationDelay: "300ms" }} />
                  </div>
                </div>
              )}
              <div ref={logEndRef} />
            </div>

            {/* Input submit form */}
            <form
              onSubmit={handleSend}
              className="p-2.5 border-t flex gap-x-2 rounded-b-3xl"
              style={{ borderColor: "var(--border-primary)", background: "rgba(255, 255, 255, 0.02)" }}
            >
              <input
                type="text"
                value={inputVal}
                onChange={(e) => setInputVal(e.target.value)}
                placeholder="Ask projects, theme, skills..."
                className="flex-1 px-3 py-2 rounded-xl text-[11px] font-medium outline-none border font-sans-clean"
                style={{
                  background: "var(--bg-card)",
                  borderColor: "var(--border-primary)",
                  color: "var(--text-primary)",
                }}
                onFocus={(e) => { e.target.style.borderColor = "var(--accent)"; }}
                onBlur={(e) => { e.target.style.borderColor = "var(--border-primary)"; }}
              />
              <button
                type="submit"
                className="p-2 rounded-xl cursor-pointer flex items-center justify-center transition-all"
                style={{ background: "var(--theme-gradient)", color: "#fff" }}
              >
                <Send size={12} />
              </button>
            </form>

            {/* Glass Arrow Pointing to Launcher */}
            <div
              className="absolute bottom-[-6px] left-[20px] w-3 h-3 rotate-45 border-r border-b z-[-1]"
              style={{
                background: "var(--bg-card)",
                borderColor: "var(--border-primary)",
              }}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* 2. Small passive Tip Bubble next to the button (only shown when closed) */}
      <AnimatePresence>
        {!isOpen && showTip && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 10 }}
            className="w-60 p-3 border rounded-2xl shadow-xl backdrop-blur-md cursor-pointer group flex items-start gap-2 select-none relative"
            style={{
              background: "var(--bg-card)",
              borderColor: "var(--border-primary)",
            }}
            onClick={() => {
              audioSynth.playClick();
              setIsOpen(true);
              setShowTip(false);
            }}
          >
            <p className="text-[10px] leading-relaxed font-sans-clean flex-1 pr-1 font-bold" style={{ color: "var(--text-primary)" }}>
              {tipMessage}
            </p>
            <button
              onClick={(e) => {
                e.stopPropagation();
                audioSynth.playClick();
                setShowTip(false);
              }}
              className="text-slate-400 hover:text-white cursor-pointer self-start p-0.5"
            >
              <X size={11} />
            </button>

            {/* Glass Arrow Pointing to Launcher */}
            <div
              className="absolute bottom-[-6px] left-[20px] w-3 h-3 rotate-45 border-r border-b"
              style={{
                background: "var(--bg-card)",
                borderColor: "var(--border-primary)",
              }}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* COMPANION COMPACT WIDGET BUTTON CORE */}
      <motion.button
        onClick={handleWidgetClick}
        className="p-3.5 rounded-full border text-[var(--accent-glow)] hover:border-[var(--accent-glow)] shadow-2xl backdrop-blur cursor-pointer flex items-center justify-center relative group"
        style={{
          background: "var(--bg-card)",
          borderColor: "var(--border-primary)",
        }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <MessageSquareCode size={18} className="group-hover:rotate-12 transition-transform" />
        <span className="absolute top-[-3px] right-[-3px] w-2.5 h-2.5 rounded-full bg-green-400 border-2 animate-pulse"
          style={{ borderColor: "var(--bg-dark)" }} />
      </motion.button>
    </div>
  );
}
