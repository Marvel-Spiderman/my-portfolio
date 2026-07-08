"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Terminal, X, CornerDownLeft } from "lucide-react";
import { audioSynth } from "../../utils/audioSynth";
import { usePortfolioStore } from "../../store/portfolioStore";

interface HistoryItem {
  text: string;
  type: "system" | "error" | "output" | "input" | "muted";
}

export default function TerminalOverlay() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const [history, setHistory] = useState<HistoryItem[]>([
    { text: "Core Console v2.0 // Interactive Command Interface", type: "system" },
    { text: "Type 'help' for instructions, or press Escape to close terminal.", type: "muted" }
  ]);
  const inputRef = useRef<HTMLInputElement>(null);
  const historyEndRef = useRef<HTMLDivElement>(null);
  const { unlockAchievement, setUniverse } = usePortfolioStore();

  // Listen for Ctrl + Backtick key shortcut
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.key === "`") {
        e.preventDefault();
        setIsOpen((prev) => {
          const next = !prev;
          if (next) {
            audioSynth.playThemeSwitch();
          } else {
            audioSynth.playClick();
          }
          return next;
        });
      }
      if (e.key === "Escape" && isOpen) {
        setIsOpen(false);
        audioSynth.playClick();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen]);

  // Focus input on open
  useEffect(() => {
    if (isOpen && inputRef.current) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 100);
    }
  }, [isOpen]);

  // Auto scroll terminal logs
  useEffect(() => {
    if (historyEndRef.current) {
      historyEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [history]);

  const handleKeyPress = () => {
    audioSynth.playTyping();
  };

  const executeCommand = (e: React.FormEvent) => {
    e.preventDefault();
    const command = input.trim();
    if (!command) return;

    audioSynth.playClick();
    unlockAchievement("used-terminal");

    const tokens = command.split(" ");
    const baseCmd = tokens[0].toLowerCase();
    const arg = tokens[1] ? tokens[1].toLowerCase() : "";

    const newHistory = [...history, { text: `> ${command}`, type: "input" as const }];

    switch (baseCmd) {
      case "help":
        newHistory.push(
          { text: "Console Commands:", type: "system" },
          { text: "  about       Scroll to bio details", type: "muted" },
          { text: "  skills      Scroll to capability logs", type: "muted" },
          { text: "  projects    Scroll to mission select cards", type: "muted" },
          { text: "  experience  Scroll to timeline milestone grid", type: "muted" },
          { text: "  contact     Scroll to uplink coordinates", type: "muted" },
          { text: "  resume      Download resume PDF package", type: "muted" },
          { text: "  theme <uni> Switch universe theme (e.g. 'theme cyberpunk')", type: "muted" },
          { text: "  clear       Purge command logs", type: "muted" }
        );
        break;

      case "about":
      case "skills":
      case "projects":
      case "experience":
      case "contact":
        setIsOpen(false);
        setTimeout(() => {
          const section = document.getElementById(baseCmd);
          if (section) {
            window.scrollTo({
              top: section.offsetTop - 90,
              behavior: "smooth"
            });
          }
        }, 150);
        break;

      case "resume":
        newHistory.push({ text: "Retracted resume file download successfully.", type: "output" });
        unlockAchievement("downloaded-resume");
        window.open("/resume.pdf", "_blank");
        break;

      case "theme":
        if (!arg) {
          newHistory.push({ text: "Error: Missing universe name. Try 'theme cyberpunk', 'theme gaming', 'theme cosmos', 'theme blueprint', 'theme liquid-glass', 'theme illustration'", type: "error" });
        } else {
          const map: Record<string, string> = {
            "cyberpunk": "universe-cyberpunk",
            "gaming": "universe-gaming",
            "cosmos": "universe-cosmos",
            "blueprint": "universe-blueprint",
            "glass": "universe-liquid-glass",
            "liquid-glass": "universe-liquid-glass",
            "illustration": "universe-illustration"
          };
          const targetId = map[arg];
          if (targetId) {
            setUniverse(targetId);
            newHistory.push({ text: `Successfully transitioned to ${arg} universe.`, type: "output" });
          } else {
            newHistory.push({ text: `Error: Universe '${arg}' not recognized.`, type: "error" });
          }
        }
        break;

      case "clear":
        setHistory([]);
        setInput("");
        return;

      default:
        newHistory.push({ text: `Command not found: '${baseCmd}'. Type 'help' for instructions.`, type: "error" });
    }

    setHistory(newHistory);
    setInput("");
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[90] bg-slate-950/85 backdrop-blur-md flex items-center justify-center p-4"
        >
          {/* Main terminal shell window */}
          <motion.div
            initial={{ scale: 0.95, y: 15 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.95, y: 15 }}
            transition={{ type: "spring", damping: 25, stiffness: 220 }}
            className="w-full max-w-2xl h-[420px] bg-black border border-cyan-500/30 rounded-xl shadow-[0_0_30px_rgba(6,182,212,0.15)] flex flex-col justify-between overflow-hidden relative"
          >
            {/* Scanline HUD filters */}
            <div className="absolute inset-0 bg-gradient-to-b from-white/[0.005] to-transparent pointer-events-none" />

            {/* Header */}
            <div className="bg-slate-900/60 border-b border-white/5 px-4 py-3 flex items-center justify-between select-none">
              <div className="flex items-center space-x-2 text-cyan-400">
                <Terminal size={14} className="animate-pulse" />
                <span className="text-[10px] font-mono font-bold uppercase tracking-widest">
                  SYSTEMS CORE LOGS
                </span>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1 rounded bg-white/5 text-slate-400 hover:text-white transition-colors cursor-pointer"
              >
                <X size={14} />
              </button>
            </div>

            {/* Logs Area */}
            <div className="flex-1 overflow-y-auto p-4 space-y-2 font-mono text-xs leading-relaxed scrollbar-none">
              {history.map((log, idx) => (
                <div
                  key={idx}
                  className={`${
                    log.type === "system" ? "text-cyan-400" :
                    log.type === "error" ? "text-red-400" :
                    log.type === "output" ? "text-yellow-400" :
                    log.type === "input" ? "text-white" : "text-slate-500"
                  }`}
                >
                  {log.text}
                </div>
              ))}
              <div ref={historyEndRef} />
            </div>

            {/* Input prompt */}
            <form onSubmit={executeCommand} className="border-t border-white/5 bg-slate-900/25 p-3 flex items-center gap-x-2 font-mono text-xs">
              <span className="text-cyan-400">&gt;</span>
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyPress}
                className="flex-1 bg-transparent border-none outline-none text-white placeholder-slate-600"
                placeholder="Execute system commands..."
              />
              <button type="submit" className="text-slate-500 hover:text-white transition-colors cursor-pointer flex items-center gap-x-1 text-[10px]">
                ENTER <CornerDownLeft size={10} />
              </button>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
