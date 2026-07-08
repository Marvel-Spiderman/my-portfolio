"use client";

import React, { useEffect, useState } from "react";
import { GitHubCalendar } from "react-github-calendar";
import { motion } from "framer-motion";
import { usePortfolioStore } from "../../store/portfolioStore";
import { TbBrandGithub } from "react-icons/tb";

export default function GithubContributions() {
  const { activeUniverse } = usePortfolioStore();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Theme optimized colors based on universe
  const getThemeColors = () => {
    const baseEmpty = "rgba(100, 100, 100, 0.1)"; // Dark subtle empty block
    
    switch (activeUniverse) {
      case "universe-cyberpunk":
        return {
          light: [baseEmpty, '#facc15', '#f59e0b', '#f97316', '#ef4444'], 
          dark: [baseEmpty, '#facc15', '#f59e0b', '#f97316', '#ef4444'],
        };
      case "universe-gaming":
        return {
          light: [baseEmpty, '#4ade80', '#22c55e', '#16a34a', '#15803d'],
          dark: [baseEmpty, '#4ade80', '#22c55e', '#16a34a', '#15803d'],
        };
      case "universe-cosmos":
        return {
          light: [baseEmpty, '#a78bfa', '#8b5cf6', '#7c3aed', '#6d28d9'],
          dark: [baseEmpty, '#a78bfa', '#8b5cf6', '#7c3aed', '#6d28d9'],
        };
      case "universe-blueprint":
        return {
          light: [baseEmpty, '#67e8f9', '#22d3ee', '#06b6d4', '#0891b2'],
          dark: [baseEmpty, '#67e8f9', '#22d3ee', '#06b6d4', '#0891b2'],
        };
      default:
        // liquid-glass or illustration
        return {
          light: [baseEmpty, '#bfdbfe', '#60a5fa', '#3b82f6', '#1d4ed8'],
          dark: [baseEmpty, '#bfdbfe', '#60a5fa', '#3b82f6', '#1d4ed8'],
        };
    }
  };

  const themeColors = getThemeColors();

  if (!mounted) return null; // Hydration safety

  return (
    <div className="py-12 border-t" id="github" style={{ borderColor: "var(--border-primary)" }}>
      <div className="container mx-auto px-5 lg:px-28">
        
        <motion.div 
          className="p-8 lg:p-10 rounded-3xl border backdrop-blur shadow-2xl relative overflow-hidden liquid-glass-border cursor-default"
          style={{ background: "var(--bg-card)", borderColor: "var(--border-primary)" }}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          whileHover={{
            y: -3,
            borderColor: "var(--accent)",
            boxShadow: "0 10px 30px var(--shadow-glow)",
          }}
          transition={{ duration: 0.3 }}
        >
          {/* Subtle gradient glow in background */}
          <div className="absolute top-0 right-0 w-64 h-64 rounded-full blur-[80px] pointer-events-none transition-all duration-700"
            style={{ background: "var(--accent)", opacity: 0.1 }} />

          <div className="relative z-10 flex flex-col items-center">
            <div className="flex items-center gap-3 mb-8">
              <TbBrandGithub size={28} style={{ color: "var(--text-primary)" }} />
              <h3 className="text-xl md:text-2xl font-black tracking-tight" style={{ color: "var(--text-primary)" }}>
                Open Source <span style={{ color: "var(--accent)" }}>Activity</span>
              </h3>
            </div>
            
            <div className="w-full max-w-5xl overflow-x-auto flex justify-center pb-4 hide-scrollbar">
              <div className="min-w-[800px] flex justify-center font-mono">
                <GitHubCalendar 
                  username="Marvel-Spiderman" 
                  colorScheme="dark"
                  theme={themeColors as any}
                  blockSize={14}
                  blockMargin={6}
                  fontSize={14}
                  labels={{
                    totalCount: '{{count}} contributions in the last year',
                  }}
                  style={{ color: "var(--text-muted)" }}
                />
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
