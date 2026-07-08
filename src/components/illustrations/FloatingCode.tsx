import React from "react";
import { motion } from "framer-motion";

export default function FloatingCode() {
  const codeItems = [
    { text: "const", x: "15%", yStart: 180, scale: 0.95, duration: 6, delay: 0 },
    { text: "{}", x: "70%", yStart: 200, scale: 1.2, duration: 8, delay: 1.5 },
    { text: "=>", x: "40%", yStart: 160, scale: 1.1, duration: 7, delay: 0.5 },
    { text: "import", x: "85%", yStart: 220, scale: 0.9, duration: 9, delay: 2.2 },
    { text: "await", x: "20%", yStart: 210, scale: 1.05, duration: 6.5, delay: 1.2 },
    { text: "[]", x: "55%", yStart: 190, scale: 1.15, duration: 7.5, delay: 3 },
    { text: "async", x: "75%", yStart: 170, scale: 1, duration: 8, delay: 0.8 },
    { text: "01", x: "30%", yStart: 230, scale: 0.85, duration: 9.5, delay: 1.8 }
  ];

  return (
    <div className="w-full max-w-[280px] mx-auto h-[240px] flex items-center justify-center p-2 relative overflow-hidden bg-transparent select-none">
      {/* Background container grid lines */}
      <div className="absolute inset-0 border border-white/5 rounded-2xl bg-[var(--ill-bg)]/10" />

      {codeItems.map((item, index) => (
        <motion.div
          key={index}
          className="absolute font-mono text-xs font-bold pointer-events-none"
          style={{
            left: item.x,
            scale: item.scale,
            color: index % 3 === 0 ? "var(--accent)" : index % 3 === 1 ? "var(--accent-secondary)" : "var(--accent-glow)",
            textShadow: "0 0 8px var(--shadow-glow)"
          }}
          initial={{ y: item.yStart, opacity: 0 }}
          animate={{
            y: [-10, -250],
            x: [0, Math.sin(index) * 12, 0],
            opacity: [0, 0.85, 0.85, 0]
          }}
          transition={{
            duration: item.duration,
            repeat: Infinity,
            delay: item.delay,
            ease: "linear"
          }}
        >
          {item.text}
        </motion.div>
      ))}
    </div>
  );
}
