import React from "react";
import { motion } from "framer-motion";

export default function RoboticAssistant() {
  return (
    <div className="w-full max-w-[280px] mx-auto aspect-square flex items-center justify-center p-4 relative">
      <svg
        viewBox="0 0 200 200"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full text-current drop-shadow-[0_0_18px_var(--shadow-glow)]"
      >
        {/* Floating Animation Group */}
        <motion.g
          animate={{ y: [0, -12, 0] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        >
          {/* Antenna Spire */}
          <line x1="100" y1="50" x2="100" y2="25" stroke="var(--ill-stroke)" strokeWidth="2.5" />
          <motion.circle
            cx="100"
            cy="25"
            r="3.5"
            fill="var(--accent)"
            animate={{ scale: [1, 1.4, 1], opacity: [0.6, 1, 0.6] }}
            transition={{ duration: 1.2, repeat: Infinity }}
          />

          {/* Left Wing / Thruster Thruster plates */}
          <path d="M 68 85 L 35 105 L 42 120 L 70 100 Z" fill="var(--ill-bg)" stroke="var(--ill-stroke)" strokeWidth="1.5" />
          <motion.polygon
            points="35,107 20,122 30,128 40,118"
            fill="var(--accent-glow)"
            animate={{ opacity: [0.2, 0.9, 0.2] }}
            transition={{ duration: 0.8, repeat: Infinity }}
          />

          {/* Right Wing / Thruster */}
          <path d="M 132 85 L 165 105 L 158 120 L 130 100 Z" fill="var(--ill-bg)" stroke="var(--ill-stroke)" strokeWidth="1.5" />
          <motion.polygon
            points="165,107 180,122 170,128 160,118"
            fill="var(--accent-glow)"
            animate={{ opacity: [0.2, 0.9, 0.2] }}
            transition={{ duration: 0.8, repeat: Infinity, delay: 0.4 }}
          />

          {/* Core Drone Spherical Body */}
          <circle cx="100" cy="95" r="42" fill="var(--ill-fill)" stroke="var(--ill-stroke)" strokeWidth="2" />
          
          {/* Glass Visor / Eye lens */}
          <rect x="72" y="78" width="56" height="24" rx="10" fill="#080911" stroke="var(--ill-stroke)" strokeWidth="1.5" />
          
          {/* Visor scan grid */}
          <g clipPath="url(#visor-clip)">
            <defs>
              <clipPath id="visor-clip">
                <rect x="74" y="80" width="52" height="20" rx="8" />
              </clipPath>
            </defs>

            {/* Glowing robot expression matrix */}
            <motion.circle
              cx="100"
              cy="90"
              r="6.5"
              fill="var(--accent-glow)"
              animate={{ scale: [1, 1.25, 1], opacity: [0.7, 1, 0.7] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            />
            {/* Auxiliary telemetry lens */}
            <circle cx="86" cy="90" r="1.5" fill="var(--accent-secondary)" />
            <circle cx="114" cy="90" r="1.5" fill="var(--accent-secondary)" />
          </g>

          {/* Front LED Badge */}
          <circle cx="100" cy="125" r="3.5" fill="var(--ill-bg)" stroke="var(--ill-stroke)" strokeWidth="1" />
          <motion.circle
            cx="100"
            cy="125"
            r="2"
            fill="var(--accent)"
            animate={{ opacity: [0.3, 1, 0.3] }}
            transition={{ duration: 2, repeat: Infinity }}
          />

          {/* Projecting holographic scanning line */}
          <motion.polygon
            points="100,100 60,170 140,170"
            fill="url(#laser-beam)"
            animate={{ opacity: [0, 0.15, 0] }}
            transition={{ duration: 3, repeat: Infinity }}
          />
        </motion.g>

        <defs>
          <linearGradient id="laser-beam" x1="100" y1="100" x2="100" y2="170" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="var(--accent-glow)" stopOpacity="0.8" />
            <stop offset="100%" stopColor="var(--accent-glow)" stopOpacity="0" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
}
