"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { TbDownload } from "react-icons/tb";
import { Menu, X, ShieldAlert } from "lucide-react";
import { audioSynth } from "../../utils/audioSynth";
import { usePortfolioStore } from "../../store/portfolioStore";

const NAV_LINKS = [
  { id: "home", label: "Home" },
  { id: "about", label: "About" },
  { id: "skills", label: "Technologies" },
  { id: "projects", label: "Projects" },
  { id: "github", label: "GitHub" },
  { id: "education", label: "Education" },
  { id: "contact", label: "Contact" },
];

export default function Navbar() {
  const [hasShadow, setHasShadow] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const { recruiterMode, toggleRecruiterMode } = usePortfolioStore();

  useEffect(() => {
    const handleScroll = () => {
      setHasShadow(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    audioSynth.playClick();
    const section = document.getElementById(id);
    if (section) {
      window.scrollTo({
        top: section.offsetTop - 90,
        behavior: "smooth",
      });
    }
    setIsOpen(false);
  };

  const handleHover = () => {
    audioSynth.playHover();
  };

  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="fixed lg:px-28 px-5 top-0 left-0 w-full z-50 transition-all duration-300 py-4"
      style={{
        background: hasShadow ? "var(--bg-dark)" : "transparent",
        opacity: hasShadow ? 0.95 : 1,
        borderBottom: hasShadow ? "1px solid var(--border-primary)" : "none",
        boxShadow: hasShadow ? "0 10px 30px rgba(0, 0, 0, 0.05)" : "none",
        backdropFilter: hasShadow ? "blur(20px)" : "none",
        WebkitBackdropFilter: hasShadow ? "blur(20px)" : "none",
      }}
    >
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo with magnetic hover */}
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onMouseEnter={handleHover}
          onClick={() => scrollToSection("home")}
          className="flex items-center cursor-pointer select-none font-mono font-bold tracking-widest text-lg"
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5 mr-2 logo-glow-anim">
            <rect width="20" height="20" x="2" y="2" rx="5" fill="rgba(255, 255, 255, 0.05)" />
            <polyline points="7 14 11 10 7 6" />
            <line x1="13" y1="14" x2="17" y2="14" />
          </svg>
          <span className="logo-glow-anim opacity-80 mr-0.5">&lt;</span>
          <span className="text-[var(--accent)]">ROUNIT</span>
          <span className="text-[var(--accent-secondary)]">.RAJ</span>
          <span className="logo-glow-anim opacity-80 ml-0.5">/&gt;</span>
        </motion.div>

        {/* Desktop Links */}
        <ul className="hidden lg:flex items-center gap-x-8 font-semibold font-mono text-sm">
          {NAV_LINKS.map(({ id, label }) => (
            <motion.li
              key={id}
              className="relative"
              whileHover={{ scale: 1.05 }}
              onMouseEnter={handleHover}
            >
              <button 
                onClick={() => scrollToSection(id)}
                className="text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors cursor-pointer font-bold"
              >
                {label}
              </button>
            </motion.li>
          ))}
        </ul>

        {/* Action Controls: Recruiter Mode & Resume */}
        <div className="hidden lg:flex items-center gap-x-4">
          {/* Recruiter Mode Toggle */}
          <motion.button
            onClick={toggleRecruiterMode}
            onMouseEnter={handleHover}
            className={`px-4 py-2 rounded-full font-mono text-xs font-bold border transition-all cursor-pointer flex items-center gap-x-2 ${
              recruiterMode 
                ? "border-red-500 bg-red-950/20 text-red-400 shadow-[0_0_12px_rgba(239,68,68,0.3)] animate-pulse" 
                : "border-[var(--btn-border)] bg-[var(--btn-bg)] text-[var(--btn-text)] hover:border-[var(--accent)] hover:text-[var(--text-primary)]"
            }`}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
          >
            <ShieldAlert size={14} />
            {recruiterMode ? "RECRUITER_MODE: ON" : "RECRUITER MODE"}
          </motion.button>

          {/* Resume Download */}
          <motion.a
            href="/resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            onMouseEnter={handleHover}
            onClick={() => audioSynth.playClick()}
            className="relative inline-flex px-5 py-2.5 font-mono text-xs font-bold items-center gap-x-2 border border-[var(--btn-border)] bg-[var(--btn-bg)] hover:bg-[var(--btn-hover-bg)] hover:border-[var(--accent)] text-[var(--text-primary)] rounded-full transition-all duration-300 cursor-pointer shadow-lg backdrop-blur"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
          >
            Resume <TbDownload size={14} className="text-[var(--accent-glow)]" />
          </motion.a>
        </div>

        {/* Mobile menu toggle */}
        <motion.button
          className="lg:hidden cursor-pointer p-1.5 rounded-lg border border-[var(--btn-border)] bg-[var(--btn-bg)] text-[var(--text-primary)]"
          onClick={() => {
            audioSynth.playClick();
            setIsOpen(!isOpen);
          }}
          whileTap={{ scale: 0.9 }}
        >
          {isOpen ? <X size={20} /> : <Menu size={20} />}
        </motion.button>
      </div>

      {/* Mobile Drawer Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.25 }}
            className="lg:hidden fixed top-[72px] left-0 w-full shadow-2xl z-40 py-6 px-8 space-y-6"
            style={{
              background: "var(--bg-dark)",
              borderBottom: "1px solid var(--border-primary)",
              backdropFilter: "blur(24px)",
              WebkitBackdropFilter: "blur(24px)",
            }}
          >
            <ul className="flex flex-col gap-y-4 font-mono font-semibold">
              {NAV_LINKS.map(({ id, label }) => (
                <li key={id}>
                  <button 
                    onClick={() => scrollToSection(id)}
                    className="cursor-pointer text-lg block w-full text-left transition-colors font-bold py-2"
                    style={{ color: "var(--text-muted)" }}
                    onMouseEnter={(e) => { e.currentTarget.style.color = "var(--accent)"; }}
                    onMouseLeave={(e) => { e.currentTarget.style.color = "var(--text-muted)"; }}
                  >
                    {label}
                  </button>
                </li>
              ))}
            </ul>

            <div className="flex flex-col gap-y-3 pt-2">
              {/* Recruiter Switch Mobile */}
              <button
                onClick={() => {
                  toggleRecruiterMode();
                  setIsOpen(false);
                }}
                className={`py-3 text-center border font-mono text-xs font-bold rounded-xl cursor-pointer ${
                  recruiterMode 
                    ? "border-red-500 bg-red-950/20 text-red-400" 
                    : "border-[var(--btn-border)] bg-[var(--btn-bg)] text-[var(--btn-text)]"
                }`}
              >
                {recruiterMode ? "RECRUITER_MODE: ACTIVE" : "ACTIVATE RECRUITER MODE"}
              </button>

              <a
                href="/resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => audioSynth.playClick()}
                onMouseEnter={handleHover}
                className="flex w-full py-3 border border-[var(--btn-border)] bg-[var(--btn-bg)] text-[var(--text-primary)] font-mono text-center justify-center items-center gap-x-2 rounded-xl cursor-pointer"
              >
                Resume <TbDownload size={15} />
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
