import React from "react";
import { motion } from "framer-motion";

export default function HolographicMonitors() {
  return (
    <div className="w-full max-w-[360px] mx-auto aspect-[4/3] flex items-center justify-center p-4 relative group">
      <svg
        viewBox="0 0 240 180"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full text-current drop-shadow-[0_0_18px_var(--shadow-glow)] transition-transform duration-500 group-hover:scale-105"
      >
        {/* Rear projection panel */}
        <motion.g
          animate={{ y: [0, -5, 0] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        >
          {/* Wireframe Grid backplate */}
          <rect x="25" y="15" width="150" height="110" rx="4" fill="var(--ill-bg)" stroke="var(--ill-stroke)" strokeWidth="1" />
          <path d="M25 45 L175 45 M25 75 L175 75 M25 105 L175 105 M70 15 L70 125 M120 15 L120 125" stroke="var(--ill-stroke)" strokeWidth="0.5" strokeDasharray="2 4" />
          
          {/* Telemetry charts */}
          <motion.path
            d="M 35 100 Q 60 70 85 90 T 135 60 T 165 85"
            stroke="var(--accent-glow)"
            strokeWidth="1.5"
            strokeLinecap="round"
            fill="none"
            animate={{ pathLength: [0, 1, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          />

          {/* Dots flashing */}
          <circle cx="85" cy="90" r="2.5" fill="var(--accent)" />
          <circle cx="135" cy="60" r="2.5" fill="var(--accent)" />
        </motion.g>

        {/* Foreground floating panel (layered shift) */}
        <motion.g
          animate={{ y: [0, 6, 0], x: [0, -4, 0] }}
          transition={{ duration: 4.2, repeat: Infinity, ease: "easeInOut" }}
        >
          {/* Main Console window */}
          <rect x="65" y="55" width="145" height="105" rx="6" fill="rgba(5, 7, 16, 0.85)" stroke="var(--accent-glow)" strokeWidth="1.5" />
          
          {/* Header bar */}
          <rect x="65" y="55" width="145" height="18" rx="5" fill="var(--ill-bg)" />
          <circle cx="75" cy="64" r="2" fill="var(--accent-glow)" />
          <circle cx="82" cy="64" r="2" fill="var(--accent-secondary)" />
          <circle cx="89" cy="64" r="2" fill="var(--ill-stroke)" />
          <line x1="165" x2="195" y1="64" y2="64" stroke="var(--text-muted)" strokeWidth="1.5" strokeLinecap="round" />

          {/* Content area: Bar Graph metrics */}
          <g>
            {[
              { x: 80, h: 35, delay: 0.1 },
              { x: 95, h: 55, delay: 0.3 },
              { x: 110, h: 42, delay: 0.2 },
              { x: 125, h: 68, delay: 0.5 },
              { x: 140, h: 25, delay: 0.4 },
              { x: 155, h: 50, delay: 0.7 },
              { x: 170, h: 60, delay: 0.6 }
            ].map((bar, idx) => (
              <motion.rect
                key={idx}
                x={bar.x}
                y={145 - bar.h}
                width="8"
                height={bar.h}
                rx="1"
                fill="var(--accent-secondary)"
                animate={{
                  height: [bar.h * 0.7, bar.h * 1.15, bar.h * 0.7],
                  y: [145 - bar.h * 0.7, 145 - bar.h * 1.15, 145 - bar.h * 0.7]
                }}
                transition={{
                  duration: 2.5,
                  repeat: Infinity,
                  delay: bar.delay,
                  ease: "easeInOut"
                }}
              />
            ))}
          </g>

          {/* Scanline element */}
          <motion.line
            x1="67"
            x2="208"
            y1="75"
            y2="75"
            stroke="var(--accent-glow)"
            strokeWidth="1"
            opacity="0.3"
            animate={{ y: [0, 80, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
          />

          {/* Terminal details */}
          <text x="80" y="88" fill="var(--text-muted)" fontSize="6" fontFamily="monospace">&gt; COMPILING MODEL_KERNELS</text>
          <motion.text
            x="180"
            y="88"
            fill="var(--accent)"
            fontSize="6"
            fontFamily="monospace"
            animate={{ opacity: [0.1, 1, 0.1] }}
            transition={{ duration: 1.2, repeat: Infinity }}
          >
            [OK]
          </motion.text>
        </motion.g>
      </svg>
    </div>
  );
}
