import React from "react";
import { motion } from "framer-motion";

export default function DeveloperWorkstation() {
  return (
    <div className="w-full max-w-[480px] mx-auto aspect-[4/3] flex items-center justify-center p-4 relative">
      <svg
        viewBox="0 0 400 300"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full text-current drop-shadow-[0_0_15px_var(--shadow-glow)]"
      >
        {/* Desk Base */}
        <line x1="40" y1="230" x2="360" y2="230" stroke="var(--ill-stroke)" strokeWidth="6" strokeLinecap="round" />
        <line x1="80" y1="230" x2="80" y2="280" stroke="var(--ill-stroke)" strokeWidth="4" />
        <line x1="320" y1="230" x2="320" y2="280" stroke="var(--ill-stroke)" strokeWidth="4" />

        {/* Desk Mat with accent borders */}
        <rect x="70" y="215" width="260" height="15" rx="3" fill="var(--ill-bg)" stroke="var(--ill-stroke)" strokeWidth="2" />
        <motion.rect
          x="72"
          y="225"
          width="256"
          height="3"
          fill="var(--accent)"
          animate={{ opacity: [0.3, 0.9, 0.3] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        />

        {/* Main Monitor Stand */}
        <path d="M185 215 L190 170 L210 170 L215 215 Z" fill="var(--ill-bg)" stroke="var(--ill-stroke)" strokeWidth="2" />

        {/* Main Coding Monitor Body */}
        <rect x="110" y="70" width="180" height="105" rx="6" fill="var(--ill-fill)" stroke="var(--ill-stroke)" strokeWidth="3" />
        {/* Bezel inner */}
        <rect x="115" y="75" width="170" height="88" rx="2" fill="#030408" />

        {/* Scrolling Code Lines on Screen */}
        <g clipPath="url(#screen-clip)">
          <defs>
            <clipPath id="screen-clip">
              <rect x="117" y="77" width="166" height="84" />
            </clipPath>
          </defs>
          
          {/* Moving Code Blocks */}
          <motion.g
            animate={{ y: [0, -32, 0] }}
            transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
          >
            {/* Mock coding paths */}
            <path d="M 125 90 L 160 90" stroke="var(--accent)" strokeWidth="3" strokeLinecap="round" />
            <path d="M 125 100 L 195 100" stroke="var(--accent-secondary)" strokeWidth="3" strokeLinecap="round" />
            <path d="M 135 110 L 175 110" stroke="var(--text-muted)" strokeWidth="3" strokeLinecap="round" />
            <path d="M 135 120 L 210 120" stroke="var(--accent-glow)" strokeWidth="3" strokeLinecap="round" />
            <path d="M 125 130 L 150 130" stroke="var(--accent)" strokeWidth="3" strokeLinecap="round" />
            <path d="M 135 140 L 190 140" stroke="var(--accent-secondary)" strokeWidth="3" strokeLinecap="round" />
            
            {/* Additional lower lines scrolling up */}
            <path d="M 125 155 L 180 155" stroke="var(--accent-secondary)" strokeWidth="3" strokeLinecap="round" />
            <path d="M 125 165 L 215 165" stroke="var(--accent-glow)" strokeWidth="3" strokeLinecap="round" />
            <path d="M 135 175 L 165 175" stroke="var(--text-muted)" strokeWidth="3" strokeLinecap="round" />
            <path d="M 135 185 L 200 185" stroke="var(--accent)" strokeWidth="3" strokeLinecap="round" />
          </motion.g>
        </g>

        {/* Flashing mechanical keyboard */}
        <rect x="140" y="218" width="80" height="8" rx="1.5" fill="var(--ill-fill)" stroke="var(--ill-stroke)" strokeWidth="1" />
        <g>
          {/* Key lights grid */}
          {[145, 155, 165, 175, 185, 195, 205, 215].map((xVal, index) => (
            <motion.circle
              key={xVal}
              cx={xVal}
              cy="222"
              r="1.2"
              fill="var(--accent-glow)"
              animate={{ opacity: [0.2, 1, 0.2] }}
              transition={{ duration: 1.5, repeat: Infinity, delay: index * 0.15 }}
            />
          ))}
        </g>

        {/* Gaming Mouse */}
        <motion.rect
          x="235"
          y="220"
          width="7"
          height="4"
          rx="2"
          fill="var(--accent-secondary)"
          animate={{ x: [235, 238, 235] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        />

        {/* Coffee Mug with Steaming particles */}
        <rect x="85" y="200" width="14" height="16" rx="2" fill="var(--ill-bg)" stroke="var(--ill-stroke)" strokeWidth="1.5" />
        <path d="M 99 203 C 103 203 103 213 99 213" stroke="var(--ill-stroke)" strokeWidth="1.5" strokeLinecap="round" />
        
        {/* Steam */}
        <g>
          {[0, 1, 2].map((i) => (
            <motion.path
              key={i}
              d={`M ${88 + i * 4} 195 Q ${86 + i * 4} 190 ${90 + i * 4} 185`}
              stroke="var(--text-muted)"
              strokeWidth="1"
              strokeLinecap="round"
              fill="none"
              animate={{
                y: [0, -10],
                opacity: [0, 0.7, 0],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                delay: i * 0.6,
                ease: "easeOut",
              }}
            />
          ))}
        </g>

        {/* Workspace Desk Lamp */}
        <path d="M 310 215 L 300 130 L 260 110" stroke="var(--ill-stroke)" strokeWidth="3" fill="none" strokeLinecap="round" />
        <path d="M 252 105 L 268 115" stroke="var(--accent)" strokeWidth="4" strokeLinecap="round" />
        {/* Light Beam glow cone */}
        <motion.polygon
          points="260,110 210,215 285,215"
          fill="url(#lamp-gradient-workstation)"
          animate={{ opacity: [0.1, 0.25, 0.1] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        />
        <defs>
          <linearGradient id="lamp-gradient-workstation" x1="260" y1="110" x2="247" y2="215" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="var(--accent-glow)" stopOpacity="0.8" />
            <stop offset="100%" stopColor="var(--accent-glow)" stopOpacity="0" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
}
