"use client";

import React from "react";
import { motion } from "framer-motion";
import { TbDownload, TbMail, TbBrandGithub, TbBrandLinkedin, TbHeart } from "react-icons/tb";
import { audioSynth } from "../../utils/audioSynth";
import { usePortfolioStore } from "../../store/portfolioStore";

export default function Footer() {
  const { unlockAchievement } = usePortfolioStore();
  const currentYear = new Date().getFullYear();

  const handleHover = () => audioSynth.playHover();
  const handleClick = () => audioSynth.playClick();

  const handleResumeDownload = () => {
    audioSynth.playUnlock?.();
    unlockAchievement("downloaded-resume");
  };

  const navLinks = [
    { label: "Home",         id: "home" },
    { label: "About",        id: "about" },
    { label: "Technologies", id: "skills" },
    { label: "Projects",     id: "projects" },
    { label: "GitHub",       id: "github" },
    { label: "Education",    id: "education" },
    { label: "Contact",      id: "contact" },
  ];

  const scrollTo = (id: string) => {
    audioSynth.playClick();
    const el = document.getElementById(id);
    if (el) window.scrollTo({ top: el.offsetTop - 80, behavior: "smooth" });
  };

  const socialLinks = [
    { icon: TbBrandGithub,   href: "https://github.com/Marvel-Spiderman",   label: "GitHub"   },
    { icon: TbBrandLinkedin, href: "https://www.linkedin.com/in/rounit-raj/", label: "LinkedIn" },
    { icon: TbMail,          href: "mailto:rounitraj12@gmail.com",   label: "Email"    },
  ];

  const statusItems = [
    { dot: "#10b981", label: "Open to Opportunities" },
    { dot: "var(--accent-glow)", label: "Available for Remote Work" },
    { dot: "#f59e0b", label: "Based in India" },
  ];

  return (
    <footer
      className="relative overflow-hidden"
      style={{
        borderTop: "1px solid var(--border-primary)",
        background: "var(--bg-darker)",
      }}
    >
      {/* Top accent line */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[2px]"
        style={{ background: "var(--theme-gradient)", opacity: 0.5 }}
      />

      <div className="container mx-auto px-5 lg:px-28 py-14">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 items-start">

          {/* Brand column */}
          <div className="space-y-5">
            {/* Logo */}
            <div className="space-y-1">
              <p className="text-2xl font-black tracking-tight" style={{ color: "var(--text-primary)" }}>
                Rounit{" "}
                <span style={{
                  background: "var(--theme-gradient)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}>Raj</span>
              </p>
              <p className="text-xs font-semibold uppercase tracking-widest" style={{ color: "var(--text-muted)" }}>
                AI Engineer · Cloud Builder · Frontend Craftsman
              </p>
            </div>

            <p className="text-xs leading-relaxed" style={{ color: "var(--text-body, var(--text-muted))" }}>
              Engineering distributed data streams, custom neural networks, and sleek frontend experiences at the intersection of AI and design.
            </p>

            {/* Social icons */}
            <div className="flex gap-2.5">
              {socialLinks.map(({ icon: Icon, href, label }) => (
                <motion.a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  onMouseEnter={handleHover}
                  onClick={handleClick}
                  title={label}
                  className="p-2.5 rounded-xl cursor-pointer"
                  style={{
                    background: "var(--bg-card)",
                    border: "1px solid var(--border-primary)",
                    color: "var(--text-muted)",
                  }}
                  whileHover={{
                    scale: 1.1,
                    borderColor: "var(--accent)",
                    color: "var(--accent)",
                  }}
                  whileTap={{ scale: 0.93 }}
                >
                  <Icon size={16} />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Navigation column */}
          <div className="space-y-5">
            <p className="text-xs font-black uppercase tracking-widest" style={{ color: "var(--text-primary)" }}>
              Navigation
            </p>
            <ul className="space-y-2.5">
              {navLinks.map(({ label, id }) => (
                <li key={id}>
                  <button
                    onClick={() => scrollTo(id)}
                    onMouseEnter={handleHover}
                    className="flex items-center gap-2.5 text-sm font-medium cursor-pointer group transition-all"
                    style={{ color: "var(--text-muted)" }}
                  >
                    <span
                      className="w-1.5 h-1.5 rounded-full flex-shrink-0 transition-all group-hover:scale-125"
                      style={{ background: "var(--accent)", opacity: 0.5 }}
                    />
                    <span className="group-hover:translate-x-1 transition-transform" style={{ color: "var(--text-muted)" }}
                      onMouseEnter={(e) => (e.currentTarget.style.color = "var(--accent)")}
                      onMouseLeave={(e) => (e.currentTarget.style.color = "var(--text-muted)")}
                    >
                      {label}
                    </span>
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Status column */}
          <div className="space-y-5">
            <p className="text-xs font-black uppercase tracking-widest" style={{ color: "var(--text-primary)" }}>
              Current Status
            </p>

            <div className="space-y-3">
              {statusItems.map(({ dot, label }) => (
                <div key={label} className="flex items-center gap-2.5">
                  <span
                    className="h-2 w-2 rounded-full flex-shrink-0 animate-pulse"
                    style={{ background: dot }}
                  />
                  <span className="text-xs font-medium" style={{ color: "var(--text-muted)" }}>
                    {label}
                  </span>
                </div>
              ))}
            </div>

            <motion.a
              href="/resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              onClick={handleResumeDownload}
              onMouseEnter={handleHover}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-bold cursor-pointer"
              style={{
                background: "var(--theme-gradient)",
                color: "#fff",
              }}
              whileHover={{ scale: 1.04, opacity: 0.92 }}
              whileTap={{ scale: 0.97 }}
            >
              <TbDownload size={14} />
              Download Resume
            </motion.a>
          </div>

        </div>

        {/* Bottom bar */}
        <div
          className="mt-12 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 font-sans-clean"
          style={{ borderTop: "1px solid var(--border-primary)" }}
        >
          <p className="text-xs font-medium" style={{ color: "var(--text-muted)" }}>
            © {currentYear} Rounit Raj. All rights reserved.
          </p>
          <p className="flex items-center gap-1.5 text-xs" style={{ color: "var(--text-muted)" }}>
            Built with <TbHeart size={12} style={{ color: "var(--accent)" }} /> Next.js, Three.js & Framer Motion
          </p>
        </div>
      </div>
    </footer>
  );
}
