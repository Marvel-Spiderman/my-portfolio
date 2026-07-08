export interface Universe {
  id: string;
  name: string;
  description: string;
  swatch: {
    bg: string;
    accent: string;
    accentSecondary: string;
  };
  cursor: string;
  sound: string;
}

export const universesData: Universe[] = [
  {
    id: "universe-liquid-glass",
    name: "Liquid Glass",
    description: "Apple-inspired minimalist theme with heavy frosted glass, soft transparency, and elegant blur.",
    swatch: { bg: "#0d1222", accent: "#ffffff", accentSecondary: "#3b82f6" },
    cursor: "glass",
    sound: "droplet"
  },
  {
    id: "universe-cyberpunk",
    name: "Cyberpunk",
    description: "Vibrant neon-drenched cityscape with digital rain overlays, glitches, and purple-magenta glow.",
    swatch: { bg: "#030206", accent: "#d946ef", accentSecondary: "#06b6d4" },
    cursor: "glitch",
    sound: "neon"
  },
  {
    id: "universe-gaming",
    name: "Gaming HUD",
    description: "AAA gaming setup: tactical red interface layout, scanner lines, achievements, and crosshair guides.",
    swatch: { bg: "#060101", accent: "#ef4444", accentSecondary: "#f97316" },
    cursor: "crosshair",
    sound: "synth"
  },
  {
    id: "universe-illustration",
    name: "Illustration",
    description: "A friendly, warm, creative workspace with soft shapes and playful vector illustrations.",
    swatch: { bg: "#fafafc", accent: "#f43f5e", accentSecondary: "#fbbf24" },
    cursor: "bubble",
    sound: "friendly"
  },
  {
    id: "universe-blueprint",
    name: "Blueprint",
    description: "CAD-inspired drafting interface showing grid systems, technical wireframes, and design guidelines.",
    swatch: { bg: "#0f172a", accent: "#06b6d4", accentSecondary: "#10b981" },
    cursor: "blueprint",
    sound: "radar"
  },
  {
    id: "universe-cosmos",
    name: "Cosmos",
    description: "Stellar drift through deep space with twinkling constellations, nebulae, and orbital paths.",
    swatch: { bg: "#020205", accent: "#6366f1", accentSecondary: "#a78bfa" },
    cursor: "orbit",
    sound: "space"
  },
  {
    id: "universe-retro-arcade",
    name: "Retro Arcade",
    description: "Classic 8-bit space fight! A playful interactive space shooter with laser-firing retro ships.",
    swatch: { bg: "#05050f", accent: "#3b82f6", accentSecondary: "#f43f5e" },
    cursor: "crosshair",
    sound: "synth"
  }
];
