// Web Audio API Synthesizer Engine for Portfolio
let audioCtx: AudioContext | null = null;
let isMuted = true; // Muted by default per user guidelines
let retroMusicIntervalId: any = null;
let currentStep = 0;
let currentThemeId = "";

function getAudioContext(): AudioContext | null {
  if (isMuted) return null;
  
  if (typeof window === "undefined") return null;

  if (!audioCtx) {
    const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
    audioCtx = new AudioContextClass();
  }
  if (audioCtx && audioCtx.state === "suspended") {
    audioCtx.resume();
  }
  return audioCtx;
}

export const audioSynth = {
  setMuted(muted: boolean) {
    isMuted = muted;
    if (!muted) {
      getAudioContext();
    } else {
      audioSynth.stopRetroMusic();
    }
  },

  getMuted() {
    return isMuted;
  },

  toggleMute() {
    this.setMuted(!isMuted);
    return isMuted;
  },

  playHover() {
    const ctx = getAudioContext();
    if (!ctx) return;

    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.connect(gain);
    gain.connect(ctx.destination);

    // Sleek high-frequency sweep
    const now = ctx.currentTime;
    osc.type = "sine";
    osc.frequency.setValueAtTime(800, now);
    osc.frequency.exponentialRampToValueAtTime(1400, now + 0.05);

    gain.gain.setValueAtTime(0.015, now); // Very quiet
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.05);

    osc.start(now);
    osc.stop(now + 0.06);
  },

  playClick() {
    const ctx = getAudioContext();
    if (!ctx) return;

    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.connect(gain);
    gain.connect(ctx.destination);

    // Warm, retro pop click
    const now = ctx.currentTime;
    osc.type = "triangle";
    osc.frequency.setValueAtTime(220, now);
    osc.frequency.exponentialRampToValueAtTime(60, now + 0.04);

    gain.gain.setValueAtTime(0.08, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.04);

    osc.start(now);
    osc.stop(now + 0.05);
  },

  playThemeSwitch: (themeId?: string) => {
    if (themeId) {
      currentThemeId = themeId;
      audioSynth.stopRetroMusic();
    }

    const ctx = getAudioContext();
    if (!ctx) return;
    const now = ctx.currentTime;

    if (themeId === "universe-cosmos") {
      // Ethereal cosmic shimmer
      const osc1 = ctx.createOscillator();
      const osc2 = ctx.createOscillator();
      const gain = ctx.createGain();
      
      osc1.connect(gain);
      osc2.connect(gain);
      gain.connect(ctx.destination);
      
      osc1.type = "sine";
      osc2.type = "triangle";
      
      osc1.frequency.setValueAtTime(440, now);
      osc1.frequency.exponentialRampToValueAtTime(880, now + 1.2);
      
      osc2.frequency.setValueAtTime(444, now); // Slight detune for shimmer
      osc2.frequency.exponentialRampToValueAtTime(884, now + 1.2);

      gain.gain.setValueAtTime(0, now);
      gain.gain.linearRampToValueAtTime(0.02, now + 0.3);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 1.2);
      
      osc1.start(now);
      osc2.start(now);
      osc1.stop(now + 1.3);
      osc2.stop(now + 1.3);
      return;
    }

    if (themeId === "universe-retro-arcade") {
      // 8-bit retro sound
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.type = "square";
      osc.frequency.setValueAtTime(440, now);
      osc.frequency.setValueAtTime(554.37, now + 0.1);
      osc.frequency.setValueAtTime(659.25, now + 0.2);
      osc.frequency.setValueAtTime(880, now + 0.3);
      gain.gain.setValueAtTime(0.03, now);
      gain.gain.setValueAtTime(0.03, now + 0.3);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.4);
      osc.start(now);
      osc.stop(now + 0.5);
      return;
    }

    if (themeId === "universe-cyberpunk") {
      // Cyberpunk Neon Light (Electrical click + lush synthwave pad)
      
      // 1. Electrical spark (neon tube turning on)
      const spark = ctx.createOscillator();
      const sparkGain = ctx.createGain();
      spark.connect(sparkGain);
      sparkGain.connect(ctx.destination);
      spark.type = "sawtooth";
      spark.frequency.setValueAtTime(800, now);
      spark.frequency.exponentialRampToValueAtTime(100, now + 0.05);
      sparkGain.gain.setValueAtTime(0.04, now);
      sparkGain.gain.exponentialRampToValueAtTime(0.001, now + 0.05);
      spark.start(now);
      spark.stop(now + 0.06);

      // 2. Warm Synthwave Pad (Cm9 Chord) for the neon glow
      const notes = [261.63, 311.13, 392.00, 466.16, 587.33]; // C4, Eb4, G4, Bb4, D5
      notes.forEach((freq) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.type = "sine";
        
        osc.frequency.setValueAtTime(freq, now + 0.05);
        // Slight pitch drift for "analog" instability
        osc.frequency.linearRampToValueAtTime(freq + (Math.random() * 4 - 2), now + 0.8);
        
        gain.gain.setValueAtTime(0, now + 0.05);
        gain.gain.linearRampToValueAtTime(0.02, now + 0.2); // Swell up
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.8); // Fade out
        
        osc.start(now + 0.05);
        osc.stop(now + 0.9);
      });
      return;
    }

    if (themeId === "universe-gaming") {
      // Gaming HUD power-up / tactical scanner
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.type = "square";
      osc.frequency.setValueAtTime(120, now);
      osc.frequency.exponentialRampToValueAtTime(480, now + 0.2);
      gain.gain.setValueAtTime(0.02, now);
      gain.gain.linearRampToValueAtTime(0.03, now + 0.1);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.3);
      osc.start(now);
      osc.stop(now + 0.4);
      return;
    }

    if (themeId === "universe-blueprint") {
      // Mechanical blueprint scanner ping
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.type = "triangle";
      osc.frequency.setValueAtTime(1200, now);
      osc.frequency.exponentialRampToValueAtTime(1800, now + 0.1);
      gain.gain.setValueAtTime(0.03, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.15);
      osc.start(now);
      osc.stop(now + 0.2);
      return;
    }

    if (themeId === "universe-illustration") {
      // Playful multi-bubble pop sequence
      const bubble = (startTime: number, baseFreq: number) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.type = "sine";
        
        // Fast pitch sweep up for the bubble pop characteristic
        osc.frequency.setValueAtTime(baseFreq, startTime);
        osc.frequency.exponentialRampToValueAtTime(baseFreq * 2.5, startTime + 0.08);
        
        // Tight volume envelope
        gain.gain.setValueAtTime(0, startTime);
        gain.gain.linearRampToValueAtTime(0.04, startTime + 0.01);
        gain.gain.exponentialRampToValueAtTime(0.001, startTime + 0.08);
        
        osc.start(startTime);
        osc.stop(startTime + 0.1);
      };

      // Play three distinct bubbles
      bubble(now, 300);
      bubble(now + 0.08, 450);
      bubble(now + 0.18, 600);
      return;
    }

    // Default (Liquid Glass) - Clean droplet chord
    const notes = [523.25, 659.25, 783.99]; // C5, E5, G5
    notes.forEach((freq, idx) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.type = "sine";
      osc.frequency.setValueAtTime(freq, now + idx * 0.03);
      gain.gain.setValueAtTime(0, now);
      gain.gain.linearRampToValueAtTime(0.02, now + idx * 0.03 + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.03 + 0.3);
      osc.start(now);
      osc.stop(now + idx * 0.03 + 0.4);
    });
  },

  playUnlock() {
    const ctx = getAudioContext();
    if (!ctx) return;

    const now = ctx.currentTime;
    // Fast upward chime arpeggio: C5 -> E5 -> G5 -> C6
    const arpeggio = [523.25, 659.25, 783.99, 1046.50];

    arpeggio.forEach((freq, idx) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.type = "sine";
      osc.frequency.setValueAtTime(freq, now + idx * 0.06);

      gain.gain.setValueAtTime(0.03, now + idx * 0.06);
      gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.06 + 0.30);

      osc.start(now + idx * 0.06);
      osc.stop(now + idx * 0.06 + 0.35);
    });
  },

  playTyping() {
    const ctx = getAudioContext();
    if (!ctx) return;

    const now = ctx.currentTime;
    
    // Keystroke sound using filtered white noise burst
    const bufferSize = ctx.sampleRate * 0.02; // 20ms burst
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const data = buffer.getChannelData(0);
    
    for (let i = 0; i < bufferSize; i++) {
      data[i] = Math.random() * 2 - 1;
    }

    const noise = ctx.createBufferSource();
    noise.buffer = buffer;

    const filter = ctx.createBiquadFilter();
    filter.type = "bandpass";
    filter.frequency.value = 1600;
    filter.Q.value = 3.0;

    const gain = ctx.createGain();

    noise.connect(filter);
    filter.connect(gain);
    gain.connect(ctx.destination);

    gain.gain.setValueAtTime(0.015, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.02);

    noise.start(now);
    noise.stop(now + 0.025);
  },

  startRetroMusic() {
    if (isMuted) return;
    if (retroMusicIntervalId) return; // Already running

    const ctx = getAudioContext();
    if (!ctx) return;

    const tempo = 135; // Fast-paced combat rhythm
    const stepDuration = 60 / tempo / 2; // 8th note duration
    
    // Star Wars / plane combat run driving retro bassline (Duel of the Fates / arcade plane combat style)
    const bassSequence = [
      110.00, 110.00, 110.00, 110.00, 130.81, 130.81, 130.81, 130.81,
      146.83, 146.83, 146.83, 146.83, 165.00, 165.00, 165.00, 165.00,
      110.00, 110.00, 110.00, 110.00, 130.81, 130.81, 130.81, 130.81,
      196.00, 196.00, 196.00, 196.00, 165.00, 165.00, 165.00, 165.00
    ]; 

    const leadSequence = [
      440.00, 0, 440.00, 440.00, 523.25, 0, 392.00, 440.00,
      587.33, 0, 587.33, 587.33, 659.25, 0, 523.25, 440.00,
      440.00, 0, 440.00, 440.00, 523.25, 0, 392.00, 440.00,
      783.99, 0, 783.99, 783.99, 659.25, 0, 523.25, 440.00
    ]; 

    currentStep = 0;

    const playStep = () => {
      const activeCtx = getAudioContext();
      if (!activeCtx || isMuted || !currentThemeId.includes("universe-retro-arcade")) {
        audioSynth.stopRetroMusic();
        return;
      }

      const now = activeCtx.currentTime;

      // Play Bass note (low square wave)
      const bassFreq = bassSequence[currentStep % bassSequence.length];
      if (bassFreq > 0) {
        const osc = activeCtx.createOscillator();
        const gain = activeCtx.createGain();
        osc.connect(gain);
        gain.connect(activeCtx.destination);
        osc.type = "square";
        osc.frequency.setValueAtTime(bassFreq, now);
        
        gain.gain.setValueAtTime(0.012, now); // soft volume
        gain.gain.exponentialRampToValueAtTime(0.001, now + stepDuration - 0.02);
        
        osc.start(now);
        osc.stop(now + stepDuration);
      }

      // Play Lead note (heroic triangle wave)
      const leadFreq = leadSequence[currentStep % leadSequence.length];
      if (leadFreq > 0) {
        const osc = activeCtx.createOscillator();
        const gain = activeCtx.createGain();
        osc.connect(gain);
        gain.connect(activeCtx.destination);
        osc.type = "triangle";
        osc.frequency.setValueAtTime(leadFreq, now);
        
        gain.gain.setValueAtTime(0.015, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + stepDuration * 0.9);
        
        osc.start(now);
        osc.stop(now + stepDuration);
      }

      currentStep++;
    };

    // Run scheduler
    playStep();
    retroMusicIntervalId = setInterval(playStep, stepDuration * 1000);
  },

  stopRetroMusic() {
    if (retroMusicIntervalId) {
      clearInterval(retroMusicIntervalId);
      retroMusicIntervalId = null;
    }
  },

  playRetroShoot() {
    const ctx = getAudioContext();
    if (!ctx) return;
    const now = ctx.currentTime;
    
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    
    osc.connect(gain);
    gain.connect(ctx.destination);
    
    osc.type = "sawtooth";
    osc.frequency.setValueAtTime(800, now);
    osc.frequency.exponentialRampToValueAtTime(150, now + 0.1);
    
    gain.gain.setValueAtTime(0.02, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.1);
    
    osc.start(now);
    osc.stop(now + 0.11);
  }
};
