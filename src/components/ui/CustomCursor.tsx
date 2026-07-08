"use client";

import React, { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { usePortfolioStore } from "../../store/portfolioStore";

export default function CustomCursor() {
  const { activeUniverse } = usePortfolioStore();
  const [isPointer, setIsPointer] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [mousePos, setMousePos] = useState({ x: -100, y: -100 });

  // Spring cursor positions
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  const springX = useSpring(cursorX, { stiffness: 450, damping: 25 });
  const springY = useSpring(cursorY, { stiffness: 450, damping: 25 });

  useEffect(() => {
    // Track mouse events
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);

      // Detect cursor targets
      const target = e.target as HTMLElement | null;
      if (target) {
        const isClickable = !!(
          target.tagName === "BUTTON" || 
          target.tagName === "A" || 
          target.closest("button") || 
          target.closest("a") ||
          window.getComputedStyle(target).cursor === "pointer"
        );
        setIsPointer(isClickable);
      }
    };

    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [cursorX, cursorY]);

  // Hide cursor on mobile touch interfaces
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.matchMedia("(max-width: 768px)").matches);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  if (isMobile) return null;

  return (
    <>
      {/* 1. BLUEPRINT GUIDE LINES (Cross-hair CAD Guides) */}
      {activeUniverse === "universe-blueprint" && (
        <>
          <div
            className="fixed top-0 left-0 w-full h-[1px] bg-cyan-500/25 pointer-events-none z-[9990]"
            style={{ transform: `translateY(${mousePos.y}px)`, willChange: "transform" }}
          />
          <div
            className="fixed top-0 left-0 w-[1px] h-full bg-cyan-500/25 pointer-events-none z-[9990]"
            style={{ transform: `translateX(${mousePos.x}px)`, willChange: "transform" }}
          />
        </>
      )}

      {/* 2. COSMOS ORBITING PARTICLES */}
      {activeUniverse === "universe-cosmos" && (
        <motion.div
          className="fixed top-0 left-0 w-2.5 h-2.5 rounded-full bg-indigo-400 pointer-events-none z-[9992]"
          style={{
            x: springX,
            y: springY,
            translateX: "-50%",
            translateY: "-50%"
          }}
          animate={{
            rotate: 360,
            scale: isPointer ? 1.4 : 1
          }}
          transition={{
            rotate: { repeat: Infinity, duration: 1.5, ease: "linear" }
          }}
        >
          <div className="absolute top-[-10px] left-[5px] w-1.5 h-1.5 rounded-full bg-indigo-300 shadow-[0_0_6px_#818cf8]" />
        </motion.div>
      )}

      {/* 3. CYBERPUNK GLITCH OFFSET SHADOW */}
      {activeUniverse === "universe-cyberpunk" && (
        <div
          className="fixed top-0 left-0 w-5 h-5 rounded-full bg-cyan-500/35 mix-blend-screen pointer-events-none z-[9991]"
          style={{
            transform: `translate(${mousePos.x - 10}px, ${mousePos.y - 10}px)`,
            willChange: "transform",
            boxShadow: "0 0 10px rgba(6, 182, 212, 0.5)"
          }}
        />
      )}

      {/* MAIN SPRING CURSOR */}
      <motion.div
        className={`fixed top-0 left-0 rounded-full pointer-events-none z-[9999] ${
          activeUniverse === "universe-gaming" 
            ? "border border-red-500 flex items-center justify-center bg-transparent" 
            : activeUniverse === "universe-cyberpunk"
            ? "bg-fuchsia-500 shadow-[0_0_12px_rgba(217,70,239,0.8)]"
            : activeUniverse === "universe-illustration"
            ? "bg-rose-500/80 shadow-md"
            : activeUniverse === "universe-blueprint"
            ? "border border-cyan-500 flex items-center justify-center bg-cyan-950/20"
            : "bg-white/10 border border-white/20 backdrop-blur-[3px] shadow-[0_0_10px_rgba(255,255,255,0.1)]"
        }`}
        style={{
          x: springX,
          y: springY,
          translateX: "-50%",
          translateY: "-50%",
          width: isPointer ? 48 : isClicking ? 20 : 32,
          height: isPointer ? 48 : isClicking ? 20 : 32,
          transition: "width 0.2s ease, height 0.2s ease, background-color 0.2s ease, border-color 0.2s ease"
        }}
      >
        {/* Gaming Crosshair Center Dot & Reticles */}
        {activeUniverse === "universe-gaming" && (
          <>
            <div className="w-1.5 h-1.5 rounded-full bg-red-500" />
            <div className="absolute w-1.5 h-[1px] bg-red-500 top-0" />
            <div className="absolute w-1.5 h-[1px] bg-red-500 bottom-0" />
            <div className="absolute w-[1px] h-1.5 bg-red-500 left-0" />
            <div className="absolute w-[1px] h-1.5 bg-red-500 right-0" />
          </>
        )}

        {/* Blueprint coordinate point */}
        {activeUniverse === "universe-blueprint" && (
          <div className="w-1 h-1 bg-cyan-400" />
        )}
      </motion.div>
    </>
  );
}
