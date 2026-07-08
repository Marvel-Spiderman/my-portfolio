"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Trophy, X } from "lucide-react";
import { usePortfolioStore } from "../../store/portfolioStore";

export default function AchievementNotification() {
  const { activeNotification, setActiveNotification } = usePortfolioStore();

  return (
    <div className="fixed top-6 right-6 z-[80] pointer-events-none w-full max-w-sm">
      <AnimatePresence>
        {activeNotification && (
          <motion.div
            initial={{ x: "120%", opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: "120%", opacity: 0 }}
            transition={{ type: "spring", damping: 15, stiffness: 180 }}
            className="pointer-events-auto w-full border border-yellow-500/30 bg-slate-950/95 shadow-[0_0_20px_rgba(234,179,8,0.25)] rounded-xl p-4 flex gap-x-4 items-start select-none relative overflow-hidden backdrop-blur-md"
          >
            {/* Holographic light gradient bar */}
            <div className="absolute top-0 left-0 w-1.5 h-full bg-gradient-to-b from-yellow-400 to-amber-600" />

            {/* Shield/Trophy container */}
            <div className="p-2 rounded-lg bg-yellow-500/10 text-yellow-500 border border-yellow-500/20 mt-0.5">
              <Trophy size={18} className="animate-bounce" />
            </div>

            <div className="flex-1 space-y-1">
              <div className="flex justify-between items-start">
                <span className="text-[10px] font-mono text-yellow-500 font-bold uppercase tracking-widest">
                  🏆 Achievement Unlocked
                </span>
                <button
                  onClick={() => setActiveNotification(null)}
                  className="text-slate-500 hover:text-white cursor-pointer -mt-1 -mr-1"
                >
                  <X size={12} />
                </button>
              </div>

              <h4 className="text-xs font-bold text-white leading-tight font-mono">
                {activeNotification.name}
              </h4>
              <p className="text-[10px] text-slate-400 leading-normal font-sans">
                {activeNotification.desc}
              </p>
              
              <div className="pt-1 flex items-center justify-between text-[9px] font-mono text-yellow-500">
                <span>REWARD CREDITS:</span>
                <span className="font-bold">+{activeNotification.xp} XP</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
