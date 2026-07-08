import React from "react";
import { motion } from "framer-motion";

export default function EnergyCubes() {
  return (
    <div className="w-full max-w-[280px] mx-auto aspect-square flex items-center justify-center p-4 relative">
      <svg
        viewBox="0 0 200 200"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full text-current drop-shadow-[0_0_20px_var(--shadow-glow)]"
      >
        {/* Left Stacked Cube (Small) */}
        <motion.g
          animate={{ y: [0, -6, 0] }}
          transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
        >
          {/* Isometric projection path */}
          {/* Left Face */}
          <path d="M 35 110 L 35 145 L 65 160 L 65 125 Z" fill="var(--ill-bg)" stroke="var(--ill-stroke)" strokeWidth="1.5" />
          {/* Right Face */}
          <path d="M 65 125 L 65 160 L 95 145 L 95 110 Z" fill="var(--ill-bg)" stroke="var(--ill-stroke)" strokeWidth="1.5" />
          {/* Top Face */}
          <path d="M 35 110 L 65 125 L 95 110 L 65 95 Z" fill="var(--ill-bg)" stroke="var(--ill-stroke)" strokeWidth="1.5" />

          {/* Inner Energy core */}
          <motion.polygon
            points="65,115 50,123 65,131 80,123"
            fill="var(--accent-secondary)"
            animate={{ opacity: [0.3, 0.8, 0.3], scale: [0.9, 1.1, 0.9] }}
            transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
            style={{ originX: "65px", originY: "123px" }}
          />
        </motion.g>

        {/* Central Core Cube (Large) */}
        <motion.g
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 3.8, repeat: Infinity, ease: "easeInOut", delay: 0.2 }}
        >
          {/* Left Face */}
          <path d="M 75 75 L 75 125 L 115 145 L 115 95 Z" fill="var(--ill-bg)" stroke="var(--accent)" strokeWidth="2.5" />
          {/* Right Face */}
          <path d="M 115 95 L 115 145 L 155 125 L 155 75 Z" fill="var(--ill-bg)" stroke="var(--accent)" strokeWidth="2.5" />
          {/* Top Face */}
          <path d="M 75 75 L 115 95 L 155 75 L 115 55 Z" fill="var(--ill-bg)" stroke="var(--accent)" strokeWidth="2.5" />

          {/* Inner glowing power cell */}
          <motion.polygon
            points="115,80 95,90 115,100 135,90"
            fill="var(--accent-glow)"
            animate={{ opacity: [0.4, 0.95, 0.4] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.line
            x1="115"
            y1="100"
            x2="115"
            y2="130"
            stroke="var(--accent-glow)"
            strokeWidth="2"
            animate={{ opacity: [0.2, 0.8, 0.2] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          />
        </motion.g>

        {/* Top Floating Cube (Smallest) */}
        <motion.g
          animate={{ y: [-15, -2, -15], rotate: [0, 5, 0] }}
          transition={{ duration: 5.2, repeat: Infinity, ease: "easeInOut" }}
          style={{ originX: "115px", originY: "35px" }}
        >
          {/* Left Face */}
          <path d="M 100 35 L 100 55 L 115 63 L 115 43 Z" fill="var(--ill-bg)" stroke="var(--ill-stroke)" strokeWidth="1" />
          {/* Right Face */}
          <path d="M 115 43 L 115 63 L 130 55 L 130 35 Z" fill="var(--ill-bg)" stroke="var(--ill-stroke)" strokeWidth="1" />
          {/* Top Face */}
          <path d="M 100 35 L 115 43 L 130 35 L 115 27 Z" fill="var(--ill-bg)" stroke="var(--ill-stroke)" strokeWidth="1" />
        </motion.g>
      </svg>
    </div>
  );
}
