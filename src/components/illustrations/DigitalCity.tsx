import React from "react";
import { motion } from "framer-motion";

export default function DigitalCity() {
  return (
    <div className="w-full max-w-[400px] mx-auto aspect-[16/9] flex items-center justify-center p-2 relative overflow-hidden">
      <svg
        viewBox="0 0 320 180"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full text-current drop-shadow-[0_0_12px_var(--shadow-glow)]"
      >
        {/* Background Skyline Silhouette */}
        <g opacity="0.4">
          <path d="M 0 180 L 0 110 L 25 110 L 25 130 L 50 130 L 50 90 L 80 90 L 80 180 Z" fill="var(--ill-bg)" />
          <path d="M 240 180 L 240 120 L 270 120 L 270 100 L 290 100 L 290 140 L 320 140 L 320 180 Z" fill="var(--ill-bg)" />
        </g>

        {/* Midground towers with glowing lights */}
        <g>
          {/* Tower Left */}
          <rect x="40" y="80" width="35" height="100" fill="var(--ill-fill)" stroke="var(--ill-stroke)" strokeWidth="1.5" />
          {/* Windows Grid */}
          {[90, 105, 120, 135, 150, 165].map((yVal) => (
            <g key={yVal}>
              <motion.circle cx="48" cy={yVal} r="1.2" fill="var(--accent-glow)" animate={{ opacity: [0.1, 0.9, 0.1] }} transition={{ duration: 2, repeat: Infinity, delay: Math.random() }} />
              <motion.circle cx="58" cy={yVal} r="1.2" fill="var(--accent-secondary)" animate={{ opacity: [0.1, 0.9, 0.1] }} transition={{ duration: 2.2, repeat: Infinity, delay: Math.random() }} />
              <motion.circle cx="68" cy={yVal} r="1.2" fill="var(--accent)" animate={{ opacity: [0.1, 0.9, 0.1] }} transition={{ duration: 1.8, repeat: Infinity, delay: Math.random() }} />
            </g>
          ))}

          {/* Tower Center Tall */}
          <rect x="110" y="45" width="45" height="135" fill="var(--ill-fill)" stroke="var(--ill-stroke)" strokeWidth="1.5" />
          {/* Antenna Spire */}
          <line x1="132.5" y1="45" x2="132.5" y2="15" stroke="var(--accent)" strokeWidth="1.5" />
          <motion.circle cx="132.5" cy="15" r="2.5" fill="var(--accent-glow)" animate={{ scale: [1, 1.6, 1], opacity: [0.5, 1, 0.5] }} transition={{ duration: 1.5, repeat: Infinity }} />

          {/* Windows Grid Tall Tower */}
          {[55, 70, 85, 100, 115, 130, 145, 160].map((yVal) => (
            <g key={yVal}>
              {[118, 128, 138, 148].map((xVal) => (
                <motion.rect
                  key={xVal}
                  x={xVal - 2}
                  y={yVal - 2}
                  width="4"
                  height="4"
                  rx="0.5"
                  fill="var(--accent-glow)"
                  animate={{ opacity: [0.15, 0.85, 0.15] }}
                  transition={{ duration: 3, repeat: Infinity, delay: Math.random() * 2 }}
                />
              ))}
            </g>
          ))}

          {/* Tower Right */}
          <rect x="200" y="70" width="38" height="110" fill="var(--ill-fill)" stroke="var(--ill-stroke)" strokeWidth="1.5" />
          {[80, 95, 110, 125, 140, 155].map((yVal) => (
            <g key={yVal}>
              <motion.circle cx="208" cy={yVal} r="1.2" fill="var(--accent-secondary)" animate={{ opacity: [0.1, 0.9, 0.1] }} transition={{ duration: 2.5, repeat: Infinity, delay: Math.random() }} />
              <motion.circle cx="219" cy={yVal} r="1.2" fill="var(--accent)" animate={{ opacity: [0.1, 0.9, 0.1] }} transition={{ duration: 2.1, repeat: Infinity, delay: Math.random() }} />
              <motion.circle cx="230" cy={yVal} r="1.2" fill="var(--accent-glow)" animate={{ opacity: [0.1, 0.9, 0.1] }} transition={{ duration: 1.9, repeat: Infinity, delay: Math.random() }} />
            </g>
          ))}
        </g>

        {/* Sweeping Sky Searchlights */}
        <motion.g
          animate={{ rotate: [-20, 20, -20] }}
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
          style={{ originX: "132px", originY: "45px" }}
        >
          <polygon points="132,45 100,0 164,0" fill="url(#light-beam-1)" opacity="0.12" />
        </motion.g>

        <motion.g
          animate={{ rotate: [15, -15, 15] }}
          transition={{ duration: 8.5, repeat: Infinity, ease: "easeInOut" }}
          style={{ originX: "220px", originY: "70px" }}
        >
          <polygon points="220,70 190,0 250,0" fill="url(#light-beam-2)" opacity="0.12" />
        </motion.g>

        {/* Ground grid streets representation */}
        <rect x="0" y="172" width="320" height="8" fill="var(--ill-fill)" />
        <line x1="0" y1="172" x2="320" y2="172" stroke="var(--ill-stroke)" strokeWidth="1.5" />
        
        {/* Flying Traffic particles (moving dots) */}
        <motion.circle
          cx="0"
          cy="150"
          r="1.5"
          fill="var(--accent)"
          animate={{ cx: [30, 290] }}
          transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
        />
        <motion.circle
          cx="320"
          cy="138"
          r="1.5"
          fill="var(--accent-glow)"
          animate={{ cx: [280, 40] }}
          transition={{ duration: 7.5, repeat: Infinity, ease: "linear" }}
        />

        <defs>
          <linearGradient id="light-beam-1" x1="132" y1="45" x2="132" y2="0" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="var(--accent-glow)" stopOpacity="0.8" />
            <stop offset="100%" stopColor="var(--accent-glow)" stopOpacity="0" />
          </linearGradient>
          <linearGradient id="light-beam-2" x1="220" y1="70" x2="220" y2="0" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="var(--accent-secondary)" stopOpacity="0.8" />
            <stop offset="100%" stopColor="var(--accent-secondary)" stopOpacity="0" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
}
