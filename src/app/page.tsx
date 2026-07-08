"use client";

import React, { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { usePortfolioStore } from "../store/portfolioStore";
import { audioSynth } from "../utils/audioSynth";

// Dynamically import client-only components to prevent SSR hydration mismatches
const Preloader = dynamic(() => import("../components/ui/Preloader"), { ssr: false });
const CustomCursor = dynamic(() => import("../components/ui/CustomCursor"), { ssr: false });
const UniverseSelector = dynamic(() => import("../components/ui/UniverseSelector"), { ssr: false });
const TerminalOverlay = dynamic(() => import("../components/terminal/TerminalOverlay"), { ssr: false });
const AchievementNotification = dynamic(() => import("../components/achievements/AchievementNotification"), { ssr: false });
const AiAssistant = dynamic(() => import("../components/ai/AiAssistant"), { ssr: false });

const Navbar = dynamic(() => import("../components/layout/Navbar"), { ssr: false });
const Footer = dynamic(() => import("../components/layout/Footer"), { ssr: false });

const Home = dynamic(() => import("../components/sections/Home"), { ssr: false });
const About = dynamic(() => import("../components/sections/About"), { ssr: false });
const Skills = dynamic(() => import("../components/sections/Skills"), { ssr: false });
const Projects = dynamic(() => import("../components/sections/Projects"), { ssr: false });
const GithubContributions = dynamic(() => import("../components/sections/GithubContributions"), { ssr: false });
const Education = dynamic(() => import("../components/sections/Education"), { ssr: false });
const Contact = dynamic(() => import("../components/sections/Contact"), { ssr: false });

const CanvasBackground = dynamic(() => import("../components/ui/CanvasBackground"), { ssr: false });

export default function Page() {
  const [booting, setBooting] = useState(true);
  const { activeUniverse, recruiterMode, unlockAchievement } = usePortfolioStore();

  // Sync activeUniverse to <html> class for CSS variable cascade
  useEffect(() => {
    document.documentElement.className = activeUniverse;
  }, [activeUniverse]);

  // Listen for Konami Code easter eggs
  useEffect(() => {
    const code = [
      "ArrowUp", "ArrowUp", 
      "ArrowDown", "ArrowDown", 
      "ArrowLeft", "ArrowRight", 
      "ArrowLeft", "ArrowRight", 
      "b", "a"
    ];
    let cursor = 0;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === code[cursor]) {
        cursor++;
        if (cursor === code.length) {
          unlockAchievement("secret-easter");
          audioSynth.playUnlock();
          cursor = 0;
        }
      } else {
        cursor = 0;
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [unlockAchievement]);

  return (
    <>
      {booting ? (
        <Preloader onComplete={() => setBooting(false)} />
      ) : (
        <div className={`min-h-screen text-[var(--text-primary)] transition-colors duration-500 relative overflow-hidden ${activeUniverse}`}>
          {/* Canvas 2D animated backgrounds — theme-switching via ref */}
          <CanvasBackground />

          {/* Custom Theme Overlays */}
          <div className="cyberpunk-rain pointer-events-none" />
          <div className="blueprint-grid pointer-events-none" />
          <div className="cosmos-stars pointer-events-none" />
          <div className="gaming-hud pointer-events-none" />

          {/* Interactive cursor */}
          <CustomCursor />

          {/* Nav system */}
          <Navbar />

          {/* Main Layout sections */}
          <main className="container mx-auto relative z-10">
            <Home />

            {/* Hoist sections order dynamically for recruiter convenience */}
            {recruiterMode ? (
              <>
                <Projects />
                <Skills />
                <Education />
                <About />
                <GithubContributions />
              </>
            ) : (
              <>
                <About />
                <Skills />
                <Projects />
                <GithubContributions />
                <Education />
              </>
            )}

            <Contact />
          </main>

          {/* Footer diagnostics */}
          <Footer />

          {/* Overlay components */}
          <UniverseSelector />
          <TerminalOverlay />
          <AchievementNotification />
          <AiAssistant />
        </div>
      )}
    </>
  );
}
