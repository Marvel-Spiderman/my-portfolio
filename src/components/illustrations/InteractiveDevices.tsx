import React, { useState } from "react";
import { motion } from "framer-motion";
import { audioSynth } from "../../utils/audioSynth";

export default function InteractiveDevices() {
  const [dialRotation, setDialRotation] = useState(45);
  const [sliderVal, setSliderVal] = useState(60);
  const [switchOn, setSwitchOn] = useState(true);

  const handleDialClick = () => {
    audioSynth.playClick();
    setDialRotation((prev) => (prev + 45) % 360);
  };

  const handleSwitchToggle = () => {
    audioSynth.playClick();
    setSwitchOn(!switchOn);
  };

  return (
    <div className="w-full max-w-[280px] mx-auto aspect-square flex items-center justify-center p-4 relative">
      <svg
        viewBox="0 0 160 160"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full text-current drop-shadow-[0_0_15px_var(--shadow-glow)]"
      >
        {/* Device Console Base */}
        <rect x="15" y="15" width="130" height="130" rx="8" fill="var(--ill-bg)" stroke="var(--ill-stroke)" strokeWidth="2" />
        
        {/* Dial Section */}
        <g transform="translate(45, 50)" className="cursor-pointer" onClick={handleDialClick}>
          <circle cx="0" cy="0" r="22" fill="var(--ill-fill)" stroke="var(--ill-stroke)" strokeWidth="1.5" />
          {/* Tick marks */}
          {[-135, -90, -45, 0, 45, 90, 135].map((angle) => {
            const rad = (angle * Math.PI) / 180;
            const x1 = Math.cos(rad) * 25;
            const y1 = Math.sin(rad) * 25;
            const x2 = Math.cos(rad) * 28;
            const y2 = Math.sin(rad) * 28;
            return <line key={angle} x1={x1} y1={y1} x2={x2} y2={y2} stroke="var(--ill-stroke)" strokeWidth="1" />;
          })}
          {/* Rotating Pointer */}
          <motion.g animate={{ rotate: dialRotation }} transition={{ type: "spring", stiffness: 150, damping: 12 }}>
            <line x1="0" y1="0" x2="0" y2="-18" stroke="var(--accent)" strokeWidth="2.5" strokeLinecap="round" />
            <circle cx="0" cy="0" r="4.5" fill="var(--accent-glow)" />
          </motion.g>
        </g>

        {/* Vertical Switch Toggles */}
        <g transform="translate(110, 50)" className="cursor-pointer" onClick={handleSwitchToggle}>
          {/* Switch Slot */}
          <rect x="-8" y="-22" width="16" height="44" rx="8" fill="var(--ill-fill)" stroke="var(--ill-stroke)" strokeWidth="1.5" />
          {/* Switch Cap */}
          <motion.rect
            x="-6"
            y={switchOn ? -18 : 2}
            width="12"
            height="16"
            rx="4"
            fill={switchOn ? "var(--accent)" : "var(--ill-bg)"}
            stroke="var(--ill-stroke)"
            strokeWidth="1.5"
            transition={{ type: "spring", stiffness: 200, damping: 15 }}
          />
          {/* Status Indicator LED */}
          <circle cx="0" cy="-30" r="3" fill={switchOn ? "var(--accent-glow)" : "#3f3f46"} />
        </g>

        {/* Horizontal Slider Controls */}
        <g transform="translate(30, 115)">
          {/* Track */}
          <line x1="0" y1="0" x2="100" y2="0" stroke="var(--ill-stroke)" strokeWidth="4" strokeLinecap="round" />
          
          {/* Slider knob */}
          <motion.rect
            x={sliderVal - 8}
            y="-8"
            width="16"
            height="16"
            rx="4"
            fill="var(--ill-fill)"
            stroke="var(--accent)"
            strokeWidth="1.5"
            className="cursor-ew-resize"
            whileHover={{ scale: 1.15 }}
            onClick={() => {
              audioSynth.playClick();
              setSliderVal((prev) => (prev >= 90 ? 10 : prev + 25));
            }}
          />
        </g>
      </svg>
    </div>
  );
}
