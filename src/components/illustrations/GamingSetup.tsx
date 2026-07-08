import React from "react";
import { motion } from "framer-motion";

export default function GamingSetup() {
  return (
    <div className="w-full max-w-[360px] mx-auto aspect-[4/3] flex items-center justify-center p-4 relative group">
      <svg
        viewBox="0 0 240 180"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full text-current drop-shadow-[0_0_15px_var(--shadow-glow)]"
      >
        {/* RGB ambient backlight glow */}
        <motion.rect
          x="30"
          y="20"
          width="180"
          height="100"
          rx="12"
          fill="url(#rgb-backlight)"
          animate={{ opacity: [0.15, 0.45, 0.15] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        />

        {/* Wide Curved Monitor Screen */}
        <g>
          {/* Base / Stand */}
          <path d="M 110 148 L 100 162 L 140 162 L 130 148 Z" fill="var(--ill-bg)" stroke="var(--ill-stroke)" strokeWidth="1.5" />
          <line x1="120" y1="125" x2="120" y2="150" stroke="var(--ill-stroke)" strokeWidth="4" />

          {/* Curved Screen Frame */}
          <path
            d="M 30 35 Q 120 28 210 35 L 210 120 Q 120 126 30 120 Z"
            fill="#05060b"
            stroke="var(--ill-stroke)"
            strokeWidth="2.5"
            strokeLinejoin="round"
          />

          {/* Screen Equalizer HUD visualization */}
          <g clipPath="url(#gaming-screen-clip)">
            <defs>
              <clipPath id="gaming-screen-clip">
                <path d="M 33 38 Q 120 31 207 38 L 207 117 Q 120 123 33 117 Z" />
              </clipPath>
            </defs>

            {/* Bouncing Audio Bars */}
            {[
              { x: 50, h: 40, delay: 0.1 },
              { x: 65, h: 55, delay: 0.3 },
              { x: 80, h: 25, delay: 0.2 },
              { x: 95, h: 48, delay: 0.6 },
              { x: 110, h: 65, delay: 0.4 },
              { x: 125, h: 32, delay: 0.5 },
              { x: 140, h: 50, delay: 0.7 },
              { x: 155, h: 62, delay: 0.2 },
              { x: 170, h: 40, delay: 0.4 },
              { x: 185, h: 22, delay: 0.1 }
            ].map((bar, idx) => (
              <motion.rect
                key={idx}
                x={bar.x}
                y={115 - bar.h}
                width="8"
                height={bar.h}
                rx="1"
                fill="var(--accent)"
                animate={{
                  height: [bar.h * 0.6, bar.h * 1.1, bar.h * 0.6],
                  y: [115 - bar.h * 0.6, 115 - bar.h * 1.1, 115 - bar.h * 0.6]
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  delay: bar.delay,
                  ease: "easeInOut"
                }}
              />
            ))}

            {/* crosshairs */}
            <circle cx="120" cy="65" r="14" stroke="var(--accent-glow)" strokeWidth="1" strokeDasharray="3 3" />
            <line x1="120" y1="46" x2="120" y2="84" stroke="var(--accent-glow)" strokeWidth="0.5" opacity="0.6" />
            <line x1="101" y1="65" x2="139" y2="65" stroke="var(--accent-glow)" strokeWidth="0.5" opacity="0.6" />
          </g>
        </g>

        {/* Gaming Headset (floating beside monitor) */}
        <motion.g
          animate={{ y: [0, -6, 0] }}
          transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
        >
          <path d="M 218 55 A 12 12 0 0 1 238 65" stroke="var(--ill-stroke)" strokeWidth="2" fill="none" />
          <rect x="215" y="65" width="6" height="14" rx="2" fill="var(--ill-bg)" stroke="var(--ill-stroke)" strokeWidth="1" />
          <rect x="235" y="65" width="6" height="14" rx="2" fill="var(--ill-bg)" stroke="var(--ill-stroke)" strokeWidth="1" />
          {/* Pulsing ring on side cup */}
          <motion.circle cx="218" cy="72" r="2.5" fill="var(--accent-secondary)" animate={{ opacity: [0.2, 1, 0.2] }} transition={{ duration: 1.5, repeat: Infinity }} />
        </motion.g>

        <defs>
          <linearGradient id="rgb-backlight" x1="30" y1="20" x2="210" y2="120" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="var(--accent-secondary)" stopOpacity="0.8" />
            <stop offset="50%" stopColor="var(--accent)" stopOpacity="0.5" />
            <stop offset="100%" stopColor="var(--accent-glow)" stopOpacity="0.8" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
}
