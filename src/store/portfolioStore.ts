import { create } from "zustand";
import { audioSynth } from "../utils/audioSynth";

export interface Achievement {
  id: string;
  name: string;
  desc: string;
  xp: number;
}

export const ACHIEVEMENT_LIST: Achievement[] = [
  { id: "recruiter-mode", name: "Recruiter Mode Activated", desc: "Initiated high-speed operational mode.", xp: 100 },
  { id: "used-terminal", name: "Terminal Operative", desc: "Executed your first terminal shell command.", xp: 150 },
  { id: "all-universes", name: "Dimensional Traveler", desc: "Switched and experienced every visual universe.", xp: 200 },
  { id: "downloaded-resume", name: "Data Retracted", desc: "Retrieved the developer's resume package.", xp: 100 },
  { id: "secret-easter", name: "Cheat Code Activated", desc: "Triggered the Konami Code easter egg.", xp: 250 },
  { id: "viewed-projects", name: "Mission Scout", desc: "Viewed all projects in the portfolio vault.", xp: 120 }
];

interface PortfolioState {
  recruiterMode: boolean;
  unlockedAchievements: string[];
  activeNotification: Achievement | null;
  universesVisited: string[];
  isMuted: boolean;
  activeUniverse: string;
  
  toggleRecruiterMode: () => void;
  unlockAchievement: (id: string) => void;
  setActiveNotification: (notif: Achievement | null) => void;
  trackUniverseVisit: (universeId: string) => void;
  setMuted: (muted: boolean) => void;
  setUniverse: (universeId: string) => void;
  initializeFromStorage: () => void;
}

export const usePortfolioStore = create<PortfolioState>((set, get) => ({
  recruiterMode: false,
  unlockedAchievements: [],
  activeNotification: null,
  universesVisited: [],
  isMuted: true,
  activeUniverse: "universe-liquid-glass",

  initializeFromStorage: () => {
    if (typeof window === "undefined") return;
    
    // Load achievements
    const savedAch = localStorage.getItem("portfolio-achievements");
    const unlocked = savedAch ? JSON.parse(savedAch) : [];
    
    // Load theme
    const savedUni = localStorage.getItem("portfolio-universe") || "universe-liquid-glass";
    
    // Apply universe class to html element for CSS targeting
    document.documentElement.className = savedUni;
    
    set({
      unlockedAchievements: unlocked,
      activeUniverse: savedUni,
      universesVisited: [savedUni]
    });
  },

  toggleRecruiterMode: () => {
    const next = !get().recruiterMode;
    set({ recruiterMode: next });
    if (next) {
      get().unlockAchievement("recruiter-mode");
    }
  },

  unlockAchievement: (id: string) => {
    const { unlockedAchievements } = get();
    if (unlockedAchievements.includes(id)) return;

    const ach = ACHIEVEMENT_LIST.find((a) => a.id === id);
    if (!ach) return;

    // Play chime sound
    audioSynth.playUnlock();

    const updated = [...unlockedAchievements, id];
    set({
      unlockedAchievements: updated,
      activeNotification: ach
    });

    if (typeof window !== "undefined") {
      localStorage.setItem("portfolio-achievements", JSON.stringify(updated));
    }

    // Auto-hide notification
    setTimeout(() => {
      set((state) => (state.activeNotification?.id === id ? { activeNotification: null } : {}));
    }, 4000);
  },

  setActiveNotification: (notif) => set({ activeNotification: notif }),

  trackUniverseVisit: (universeId: string) => {
    const { universesVisited } = get();
    if (universesVisited.includes(universeId)) return;
    const updated = [...universesVisited, universeId];
    set({ universesVisited: updated });

    if (updated.length === 6) {
      get().unlockAchievement("all-universes");
    }
  },

  setMuted: (muted: boolean) => {
    set({ isMuted: muted });
    audioSynth.setMuted(muted);
    if (!muted) {
      setTimeout(() => {
        audioSynth.playUnlock();
      }, 100);
    }
  },

  setUniverse: (universeId: string) => {
    set({ activeUniverse: universeId });
    if (typeof window !== "undefined") {
      localStorage.setItem("portfolio-universe", universeId);
      document.documentElement.className = universeId;
    }
    get().trackUniverseVisit(universeId);
    audioSynth.playThemeSwitch(universeId);
  }
}));
