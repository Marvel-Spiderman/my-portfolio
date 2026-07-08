import React from "react";
import { motion } from "framer-motion";

export default function CloudInfrastructure() {
  return (
    <div className="w-full max-w-[340px] mx-auto aspect-square flex items-center justify-center p-4 relative">
      <svg
        viewBox="0 0 200 200"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full text-current drop-shadow-[0_0_15px_var(--shadow-glow)]"
      >
        {/* Main Central Cloud Container */}
        <motion.g
          animate={{ y: [0, -4, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        >
          <path
            d="M100 55 C115 55 125 65 122 78 C135 78 142 88 138 98 C135 106 125 110 115 110 L85 110 C72 110 62 102 62 90 C62 78 74 72 85 75 C88 64 92 55 100 55 Z"
            fill="var(--ill-bg)"
            stroke="var(--accent)"
            strokeWidth="2.5"
            strokeLinejoin="round"
          />
          <circle cx="100" cy="85" r="4.5" fill="var(--accent-glow)" className="animate-glow-pulse" />
        </motion.g>

        {/* Database Node Bottom Left */}
        <g>
          {/* Cylinder 1 */}
          <rect x="35" y="130" width="34" height="42" rx="4" fill="var(--ill-bg)" stroke="var(--ill-stroke)" strokeWidth="1.5" />
          <ellipse cx="52" cy="130" rx="17" ry="5" fill="var(--ill-fill)" stroke="var(--ill-stroke)" strokeWidth="1.5" />
          <ellipse cx="52" cy="144" rx="17" ry="4" fill="none" stroke="var(--ill-stroke)" strokeWidth="1" strokeDasharray="3 3" />
          <ellipse cx="52" cy="158" rx="17" ry="4" fill="none" stroke="var(--ill-stroke)" strokeWidth="1" strokeDasharray="3 3" />
          
          {/* Glowing Disk Activity Lights */}
          <motion.circle cx="44" cy="139" r="1.5" fill="var(--accent-glow)" animate={{ opacity: [0.1, 1, 0.1] }} transition={{ duration: 1.2, repeat: Infinity }} />
          <motion.circle cx="44" cy="153" r="1.5" fill="var(--accent-secondary)" animate={{ opacity: [1, 0.1, 1] }} transition={{ duration: 1.5, repeat: Infinity }} />
        </g>

        {/* Server Tower Node Bottom Right */}
        <g>
          <rect x="131" y="125" width="34" height="48" rx="3" fill="var(--ill-bg)" stroke="var(--ill-stroke)" strokeWidth="1.5" />
          {/* Horizontal server plates */}
          <line x1="136" y1="135" x2="160" y2="135" stroke="var(--ill-stroke)" strokeWidth="2" />
          <line x1="136" y1="145" x2="160" y2="145" stroke="var(--ill-stroke)" strokeWidth="2" />
          <line x1="136" y1="155" x2="160" y2="155" stroke="var(--ill-stroke)" strokeWidth="2" />

          {/* LED blinkers */}
          <motion.circle cx="161" cy="135" r="1.2" fill="var(--accent)" animate={{ opacity: [0.2, 1, 0.2] }} transition={{ duration: 0.8, repeat: Infinity }} />
          <motion.circle cx="161" cy="145" r="1.2" fill="var(--accent-glow)" animate={{ opacity: [0.2, 1, 0.2] }} transition={{ duration: 0.9, repeat: Infinity, delay: 0.2 }} />
          <motion.circle cx="161" cy="155" r="1.2" fill="var(--accent-secondary)" animate={{ opacity: [0.2, 1, 0.2] }} transition={{ duration: 1, repeat: Infinity, delay: 0.4 }} />
        </g>

        {/* Pipelines from Central Cloud to DB & Server */}
        <g>
          {/* Cloud -> Database Pipeline */}
          <path d="M 80 110 L 80 122 Q 80 135 62 130" stroke="var(--ill-stroke)" strokeWidth="2" fill="none" />
          <path
            d="M 80 110 L 80 122 Q 80 135 62 130"
            stroke="var(--accent-glow)"
            strokeWidth="1.5"
            fill="none"
            className="animate-flow"
          />

          {/* Cloud -> Server Pipeline */}
          <path d="M 120 110 L 120 122 Q 120 130 136 135" stroke="var(--ill-stroke)" strokeWidth="2" fill="none" />
          <path
            d="M 120 110 L 120 122 Q 120 130 136 135"
            stroke="var(--accent)"
            strokeWidth="1.5"
            fill="none"
            className="animate-flow"
          />
        </g>
      </svg>
    </div>
  );
}
