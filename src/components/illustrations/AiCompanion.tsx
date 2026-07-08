import React from "react";
import { motion } from "framer-motion";

export default function AiCompanion() {
  return (
    <div className="w-full max-w-[320px] mx-auto aspect-square flex items-center justify-center p-4 relative">
      <svg
        viewBox="0 0 200 200"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full text-current drop-shadow-[0_0_20px_var(--shadow-glow)]"
      >
        {/* Floating Animation Group */}
        <motion.g
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        >
          {/* Outermost Orbit Grid */}
          <circle cx="100" cy="100" r="75" stroke="var(--ill-stroke)" strokeWidth="1" strokeDasharray="3 3" />

          {/* Outer Orbit with Rotating Nodes */}
          <motion.g
            animate={{ rotate: 360 }}
            transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
            style={{ originX: "100px", originY: "100px" }}
          >
            <circle cx="100" cy="100" r="60" stroke="var(--ill-stroke)" strokeWidth="1.5" />
            <circle cx="100" cy="40" r="4.5" fill="var(--accent)" />
            <circle cx="100" cy="160" r="3" fill="var(--accent-glow)" />
          </motion.g>

          {/* Mid Orbit Rotating Reverse */}
          <motion.g
            animate={{ rotate: -360 }}
            transition={{ duration: 16, repeat: Infinity, ease: "linear" }}
            style={{ originX: "100px", originY: "100px" }}
          >
            <circle cx="100" cy="100" r="42" stroke="var(--ill-stroke)" strokeWidth="1" strokeDasharray="6 3" />
            <circle cx="142" cy="100" r="4" fill="var(--accent-secondary)" />
            <circle cx="58" cy="100" r="2.5" fill="var(--text-muted)" />
          </motion.g>

          {/* Core Energy Pulses / Inner Rings */}
          <motion.circle
            cx="100"
            cy="100"
            r="28"
            stroke="var(--accent)"
            strokeWidth="1.5"
            animate={{ scale: [0.9, 1.15, 0.9], opacity: [0.4, 0.8, 0.4] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            style={{ originX: "100px", originY: "100px" }}
          />

          <motion.circle
            cx="100"
            cy="100"
            r="22"
            fill="url(#core-glow-companion)"
            animate={{ scale: [1, 1.25, 1] }}
            transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
            style={{ originX: "100px", originY: "100px" }}
          />

          {/* Neural Connection Lines */}
          <g>
            {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, index) => {
              const rad = (angle * Math.PI) / 180;
              const x2 = 100 + Math.cos(rad) * 60;
              const y2 = 100 + Math.sin(rad) * 60;
              return (
                <motion.line
                  key={index}
                  x1="100"
                  y1="100"
                  x2={x2}
                  y2={y2}
                  stroke="var(--ill-stroke)"
                  strokeWidth="0.75"
                  animate={{ opacity: [0.1, 0.6, 0.1] }}
                  transition={{ duration: 2.5, repeat: Infinity, delay: index * 0.3 }}
                />
              );
            })}
          </g>

          {/* Glowing central node */}
          <circle cx="100" cy="100" r="7" fill="var(--accent)" />
          <motion.circle
            cx="100"
            cy="100"
            r="12"
            fill="var(--accent-glow)"
            animate={{ opacity: [0.2, 0.7, 0.2] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          />
        </motion.g>

        <defs>
          <radialGradient id="core-glow-companion" cx="100" cy="100" r="22" fx="100" fy="100" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="var(--accent-glow)" stopOpacity="0.75" />
            <stop offset="70%" stopColor="var(--accent-secondary)" stopOpacity="0.25" />
            <stop offset="100%" stopColor="var(--ill-fill)" stopOpacity="0" />
          </radialGradient>
        </defs>
      </svg>
    </div>
  );
}
