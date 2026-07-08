"use client";

import { useEffect, useRef } from "react";
import { usePortfolioStore } from "../../store/portfolioStore";
import { audioSynth } from "../../utils/audioSynth";

// ─── types ────────────────────────────────────────────────────────────────────
interface Star { x: number; y: number; z: number; pz: number }
interface Particle { x: number; y: number; vx: number; vy: number; life: number; maxLife: number; size: number; color: string; trail: {x:number;y:number}[] }
interface GridNode { x: number; y: number; pulse: number; speed: number }
interface Bubble { x: number; y: number; r: number; vx: number; vy: number; hue: number; alpha: number }
interface Shape { x: number; y: number; vx: number; vy: number; rot: number; rspeed: number; size: number; sides: number; color: string; alpha: number }
interface MatrixDrop { x: number; y: number; speed: number; len: number; chars: string[] }

// ─── helpers ──────────────────────────────────────────────────────────────────
const rand = (a: number, b: number) => Math.random() * (b - a) + a;
const pick = <T,>(arr: T[]): T => arr[Math.floor(Math.random() * arr.length)];

// ─── theme palette map ────────────────────────────────────────────────────────
const THEME_COLORS: Record<string, string[]> = {
  "universe-cosmos":       ["#a78bfa", "#7c3aed", "#c084fc", "#ddd6fe", "#ffffff"],
  "universe-cyberpunk":    ["#d946ef", "#06b6d4", "#f43f5e", "#e879f9", "#67e8f9"],
  "universe-gaming":       ["#ef4444", "#f97316", "#fca5a5", "#fde68a", "#ff6b6b"],
  "universe-liquid-glass": ["#60a5fa", "#3b82f6", "#93c5fd", "#38bdf8", "#7dd3fc"],
  "universe-blueprint":    ["#22d3ee", "#0ea5e9", "#67e8f9", "#a5f3fc", "#bae6fd"],
  "universe-illustration": ["#f43f5e", "#f59e0b", "#10b981", "#8b5cf6", "#0ea5e9"],
};

// ══════════════════════════════════════════════════════════════════════════════
// COSMOS — space warp (stars from center, accelerating)
// ══════════════════════════════════════════════════════════════════════════════
function drawCosmos(ctx: CanvasRenderingContext2D, w: number, h: number, stars: Star[]) {
  // Fade trail
  ctx.fillStyle = "rgba(2, 1, 14, 0.18)";
  ctx.fillRect(0, 0, w, h);

  const cx = w / 2, cy = h / 2;
  const speed = 14;

  for (const s of stars) {
    s.pz = s.z;
    s.z -= speed;

    if (s.z <= 0) {
      s.x = rand(-w / 2, w / 2);
      s.y = rand(-h / 2, h / 2);
      s.z = rand(w * 0.3, w);
      s.pz = s.z;
      continue;
    }

    const sx  = (s.x / s.z)  * w + cx;
    const sy  = (s.y / s.z)  * h + cy;
    const psx = (s.x / s.pz) * w + cx;
    const psy = (s.y / s.pz) * h + cy;

    const size = Math.max(0.3, (1 - s.z / w) * 3.5);
    const bright = Math.floor((1 - s.z / w) * 255);
    // colour: deep purple → blue → white as they get close
    const hue = 260 - (1 - s.z / w) * 200;
    const col = `hsl(${hue}, 80%, ${40 + (1 - s.z/w)*60}%)`;

    ctx.beginPath();
    ctx.strokeStyle = col;
    ctx.lineWidth = size;
    ctx.globalAlpha = Math.min(1, (1 - s.z / w) * 1.4);
    ctx.moveTo(psx, psy);
    ctx.lineTo(sx, sy);
    ctx.stroke();
  }
  ctx.globalAlpha = 1;
}

function initStars(count: number, w: number, h: number): Star[] {
  return Array.from({ length: count }, () => ({
    x:  rand(-w / 2, w / 2),
    y:  rand(-h / 2, h / 2),
    z:  rand(1, w),
    pz: 0,
  }));
}

// ══════════════════════════════════════════════════════════════════════════════
// CYBERPUNK — neon rain + particle sparks
// ══════════════════════════════════════════════════════════════════════════════
function drawCyberpunk(ctx: CanvasRenderingContext2D, w: number, h: number, drops: MatrixDrop[], particles: Particle[]) {
  ctx.fillStyle = "rgba(3, 0, 13, 0.15)";
  ctx.fillRect(0, 0, w, h);

  const CHARS = "アイウエオカキクケコサシスセソタチツテトナニヌネノ01010DEV>_[]{}";

  // neon rain
  ctx.font = "13px 'JetBrains Mono', monospace";
  for (const d of drops) {
    for (let i = 0; i < d.chars.length; i++) {
      const alpha = (d.chars.length - i) / d.chars.length;
      const isHead = i === d.chars.length - 1;
      ctx.fillStyle = isHead
        ? `rgba(255, 100, 255, ${alpha})`
        : i > d.chars.length - 4
        ? `rgba(6, 182, 212, ${alpha * 0.9})`
        : `rgba(217, 70, 239, ${alpha * 0.4})`;
      ctx.globalAlpha = alpha;
      ctx.fillText(d.chars[i], d.x, d.y - i * 14);
    }

    d.y += d.speed;
    if (d.y > h + d.len * 14) {
      d.y = rand(-200, 0);
      d.chars = Array.from({ length: d.len }, () => CHARS[Math.floor(Math.random() * CHARS.length)]);
    } else {
      d.chars[d.chars.length - 1] = CHARS[Math.floor(Math.random() * CHARS.length)];
    }
  }

  // spark particles
  for (let i = particles.length - 1; i >= 0; i--) {
    const p = particles[i];
    p.x += p.vx; p.y += p.vy; p.vy += 0.04; p.life--;
    const a = p.life / p.maxLife;
    ctx.globalAlpha = a;
    ctx.fillStyle = p.color;
    ctx.beginPath();
    ctx.arc(p.x, p.y, p.size * a, 0, Math.PI * 2);
    ctx.fill();
    if (p.life <= 0) particles.splice(i, 1);
  }

  // randomly spawn sparks
  if (Math.random() < 0.12) {
    const colors = ["#d946ef", "#06b6d4", "#f43f5e", "#e879f9"];
    particles.push({
      x: rand(0, w), y: rand(0, h),
      vx: rand(-1.5, 1.5), vy: rand(-2, -0.5),
      life: 60, maxLife: 60,
      size: rand(1, 3),
      color: pick(colors),
      trail: [],
    });
  }

  ctx.globalAlpha = 1;
}

function initDrops(w: number, h: number): MatrixDrop[] {
  const CHARS = "アイウエオカキクケコDEV>_[]{}01";
  return Array.from({ length: Math.floor(w / 22) }, (_, i) => {
    const len = Math.floor(rand(6, 22));
    return {
      x: i * 22,
      y: rand(-h, 0),
      speed: rand(2, 5),
      len,
      chars: Array.from({ length: len }, () => CHARS[Math.floor(Math.random() * CHARS.length)]),
    };
  });
}

// ══════════════════════════════════════════════════════════════════════════════
// GAMING — radial burst particles + pulsing ring
// ══════════════════════════════════════════════════════════════════════════════
function drawGaming(ctx: CanvasRenderingContext2D, w: number, h: number, particles: Particle[], t: number) {
  ctx.clearRect(0, 0, w, h);

  const cx = w / 2, cy = h / 2;
  const colors = ["#ef4444", "#f97316", "#fca5a5", "#fde68a"];

  // pulsing rings
  for (let ring = 0; ring < 3; ring++) {
    const r = ((t * 0.4 + ring * 120) % 360) * 2.2;
    if (r > 0 && r < w) {
      const a = 1 - r / (w * 0.8);
      ctx.beginPath();
      ctx.strokeStyle = `rgba(239, 68, 68, ${Math.max(0, a) * 0.25})`;
      ctx.lineWidth = 1.5;
      ctx.globalAlpha = 1;
      ctx.arc(cx, cy, r, 0, Math.PI * 2);
      ctx.stroke();
    }
  }

  // crosshair
  ctx.globalAlpha = 0.08;
  ctx.strokeStyle = "#ef4444";
  ctx.lineWidth = 1;
  ctx.beginPath(); ctx.moveTo(cx, 0); ctx.lineTo(cx, h); ctx.stroke();
  ctx.beginPath(); ctx.moveTo(0, cy); ctx.lineTo(w, cy); ctx.stroke();
  ctx.globalAlpha = 1;

  // particles
  for (let i = particles.length - 1; i >= 0; i--) {
    const p = particles[i];
    p.x += p.vx; p.y += p.vy; p.vy += 0.02; p.life--;
    const a = p.life / p.maxLife;
    ctx.globalAlpha = a * 0.8;
    ctx.fillStyle = p.color;
    ctx.beginPath();
    ctx.arc(p.x, p.y, p.size * a, 0, Math.PI * 2);
    ctx.fill();
    if (p.life <= 0) particles.splice(i, 1);
  }

  // spawn
  if (Math.random() < 0.18) {
    const angle = rand(0, Math.PI * 2);
    const speed = rand(1.5, 4);
    particles.push({
      x: cx + rand(-80, 80), y: cy + rand(-80, 80),
      vx: Math.cos(angle) * speed, vy: Math.sin(angle) * speed - 1,
      life: Math.floor(rand(40, 90)), maxLife: 90,
      size: rand(1.5, 4), color: pick(colors), trail: [],
    });
  }

  ctx.globalAlpha = 1;
}

function drawRetroArcade(ctx: CanvasRenderingContext2D, w: number, h: number, g: any, t: number, keys?: any) {
  // Clear screen with a deep space navy background
  ctx.fillStyle = "rgba(4, 4, 12, 0.4)";
  ctx.fillRect(0, 0, w, h);

  // Sync player position on resize
  if (g.playerY > h) g.playerY = h - 100;
  if (g.playerX > w) g.playerX = w / 2;

  // 0. Update & Draw Star Wars Hyperspace Warp Jump + 3D Vector Tunnel
  const cx = w / 2, cy = h / 2;
  const warpSpeed = 30;

  // Initialize warp stars relative to 3D depth if not present
  if (!g.warpStars || g.warpStars.length === 0) {
    g.warpStars = Array.from({ length: 90 }, () => ({
      x: rand(-w / 2, w / 2),
      y: rand(-h / 2, h / 2),
      z: rand(1, w),
      pz: 0,
      color: pick(["#3b82f6", "#f43f5e", "#60a5fa", "#ff79c6"]) // Retro arcade space hues
    }));
  }

  // Draw concentric expanding vector tunnel rings (Star Wars grid tunnel style)
  ctx.strokeStyle = "rgba(59, 130, 246, 0.08)";
  ctx.lineWidth = 1.5;
  for (let i = 0; i < 4; i++) {
    const ringRadius = ((t * 1.8 + i * 120) % 480);
    ctx.beginPath();
    ctx.arc(cx, cy, ringRadius, 0, Math.PI * 2);
    ctx.stroke();
  }

  // Draw warp star streaks shooting outward from the center
  for (const s of g.warpStars) {
    s.pz = s.z;
    s.z -= warpSpeed;

    if (s.z <= 0) {
      s.x = rand(-w / 2, w / 2);
      s.y = rand(-h / 2, h / 2);
      s.z = rand(w * 0.4, w);
      s.pz = s.z;
      continue;
    }

    const sx  = (s.x / s.z)  * w + cx;
    const sy  = (s.y / s.z)  * h + cy;
    const psx = (s.x / s.pz) * w + cx;
    const psy = (s.y / s.pz) * h + cy;

    // Only draw stars inside screen bounds
    if (sx >= 0 && sx <= w && sy >= 0 && sy <= h) {
      const alpha = Math.min(1, (1 - s.z / w) * 1.5);
      ctx.strokeStyle = s.color;
      ctx.lineWidth = Math.max(1, (1 - s.z / w) * 3);
      ctx.globalAlpha = alpha;
      ctx.beginPath();
      ctx.moveTo(psx, psy);
      ctx.lineTo(sx, sy);
      ctx.stroke();
    }
  }
  ctx.globalAlpha = 1;

  // 1. Controls Interactivity
  if (keys) {
    if (keys.Left || keys.Right || keys.Space) {
      g.isAutoPilot = false;
      g.lastInputTime = t;
    }

    if (!g.isAutoPilot) {
      audioSynth.startRetroMusic();

      // Re-enable autopilot after 6 seconds of inactivity (360 frames)
      if (t - g.lastInputTime > 360) {
        g.isAutoPilot = true;
        audioSynth.stopRetroMusic();
      } else {
        if (keys.Left) g.playerX -= 6.5;
        if (keys.Right) g.playerX += 6.5;
        if (g.playerX < 30) g.playerX = 30;
        if (g.playerX > w - 30) g.playerX = w - 30;

        // Manual shoot
        if (keys.Space && g.shootCooldown === 0) {
          g.lasers.push({ x: g.playerX - 20, y: g.playerY, vy: -10, color: "var(--accent)", type: 'player' });
          g.lasers.push({ x: g.playerX + 20, y: g.playerY, vy: -10, color: "var(--accent)", type: 'player' });
          g.shootCooldown = 15; // Faster shooting when manually holding space!
          audioSynth.playRetroShoot();
        }
      }
    }
  }

  // Fallback to Autopilot if not controlled
  if (g.isAutoPilot) {
    g.playerX += g.playerVx;
    if (g.playerX < 80 || g.playerX > w - 80) {
      g.playerVx *= -1;
    }
    // Auto shooting
    if (g.shootCooldown === 0) {
      g.lasers.push({ x: g.playerX - 20, y: g.playerY, vy: -7.5, color: "var(--accent)", type: 'player' });
      g.lasers.push({ x: g.playerX + 20, y: g.playerY, vy: -7.5, color: "var(--accent)", type: 'player' });
      g.shootCooldown = 32;
    }
  }

  if (g.shootCooldown > 0) g.shootCooldown--;

  // Draw Player Ship (Retro Vector style)
  ctx.strokeStyle = "var(--accent)";
  ctx.lineWidth = 2.5;
  ctx.beginPath();
  ctx.moveTo(g.playerX, g.playerY - 22);
  ctx.lineTo(g.playerX - 22, g.playerY + 16);
  ctx.lineTo(g.playerX - 8, g.playerY + 8);
  ctx.lineTo(g.playerX + 8, g.playerY + 8);
  ctx.lineTo(g.playerX + 22, g.playerY + 16);
  ctx.closePath();
  ctx.stroke();

  // Engine exhaust fire (doodles)
  if (t % 4 < 2) {
    ctx.strokeStyle = "var(--accent-secondary)";
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.moveTo(g.playerX - 6, g.playerY + 9);
    ctx.lineTo(g.playerX, g.playerY + 22);
    ctx.lineTo(g.playerX + 6, g.playerY + 9);
    ctx.stroke();
  }

  // 2. Enemies
  if (g.enemies.length < 6 && Math.random() < 0.025) {
    g.enemies.push({
      id: Math.random(),
      x: rand(100, w - 100),
      y: rand(80, h / 2.5),
      vx: rand(1.2, 3.2) * (Math.random() > 0.5 ? 1 : -1),
      width: 42,
      height: 26,
      life: 2,
      shootCooldown: Math.floor(rand(20, 70))
    });
  }

  for (let i = g.enemies.length - 1; i >= 0; i--) {
    const e = g.enemies[i];
    e.x += e.vx;
    if (e.x < 60 || e.x > w - 60) e.vx *= -1;

    // Draw Alien Saucer (doodle outline)
    ctx.strokeStyle = "#f43f5e";
    ctx.lineWidth = 2.5;
    ctx.beginPath();
    ctx.ellipse(e.x, e.y, e.width / 2, e.height / 3, 0, 0, Math.PI * 2);
    ctx.stroke();
    
    ctx.beginPath();
    ctx.arc(e.x, e.y - 4, 8, Math.PI, 0);
    ctx.stroke();

    ctx.fillStyle = "#f43f5e";
    ctx.beginPath();
    ctx.arc(e.x, e.y - 18, 2.5, 0, Math.PI * 2);
    ctx.fill();

    // Enemy auto shoot
    if (e.shootCooldown > 0) {
      e.shootCooldown--;
    } else {
      g.lasers.push({ x: e.x, y: e.y + 12, vy: 4.8, color: "#f43f5e", type: 'enemy' });
      e.shootCooldown = Math.floor(rand(60, 130));
    }
  }

  // 3. Lasers Collision & Update
  for (let i = g.lasers.length - 1; i >= 0; i--) {
    const l = g.lasers[i];
    l.y += l.vy;

    ctx.strokeStyle = l.color;
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(l.x, l.y);
    ctx.lineTo(l.x, l.y + (l.vy > 0 ? -12 : 12));
    ctx.stroke();

    if (l.y < 0 || l.y > h) {
      g.lasers.splice(i, 1);
      continue;
    }

    if (l.type === 'player') {
      for (let j = g.enemies.length - 1; j >= 0; j--) {
        const e = g.enemies[j];
        if (Math.hypot(l.x - e.x, l.y - e.y) < 26) {
          e.life--;
          // Hits spark particles
          for (let p = 0; p < 5; p++) {
            g.explosions.push({
              x: l.x, y: l.y,
              vx: rand(-3, 3), vy: rand(-3, 3),
              size: rand(2.5, 4.5), life: 25, maxLife: 25,
              color: "var(--accent)"
            });
          }
          g.lasers.splice(i, 1);

          if (e.life <= 0) {
            // Score increment!
            g.score = (g.score || 0) + 100;
            // Big ship explosion
            for (let p = 0; p < 18; p++) {
              g.explosions.push({
                x: e.x, y: e.y,
                vx: rand(-5, 5), vy: rand(-5, 5),
                size: rand(3, 7), life: 45, maxLife: 45,
                color: "#f43f5e"
              });
            }
            g.enemies.splice(j, 1);
          }
          break;
        }
      }
    } else {
      // Player hit check
      if (Math.hypot(l.x - g.playerX, l.y - g.playerY) < 22) {
        // Lose points on hit
        g.score = Math.max(0, (g.score || 0) - 50);
        for (let p = 0; p < 12; p++) {
          g.explosions.push({
            x: g.playerX, y: g.playerY,
            vx: rand(-4, 4), vy: rand(-4, 4),
            size: rand(3, 6), life: 35, maxLife: 35,
            color: "var(--accent)"
          });
        }
        g.lasers.splice(i, 1);
      }
    }
  }

  // 4. Explosions particles update
  for (let i = g.explosions.length - 1; i >= 0; i--) {
    const exp = g.explosions[i];
    exp.x += exp.vx;
    exp.y += exp.vy;
    exp.life--;

    const a = exp.life / exp.maxLife;
    ctx.globalAlpha = a;
    ctx.fillStyle = exp.color;
    ctx.beginPath();
    ctx.arc(exp.x, exp.y, exp.size * a, 0, Math.PI * 2);
    ctx.fill();

    if (exp.life <= 0) {
      g.explosions.splice(i, 1);
    }
  }
  ctx.globalAlpha = 1;

  // 5. HUD Retro Text: Score board & Controls hint
  ctx.fillStyle = "rgba(255, 255, 255, 0.8)";
  ctx.font = "bold 16px 'JetBrains Mono', monospace";
  ctx.textAlign = "right";
  ctx.fillText(`SCORE: ${g.score || 0}`, w - 50, 60);

  ctx.fillStyle = g.isAutoPilot ? "rgba(255, 255, 255, 0.35)" : "rgba(255, 255, 255, 0.15)";
  ctx.font = "12px 'JetBrains Mono', monospace";
  ctx.textAlign = "center";
  const hintText = g.isAutoPilot 
    ? "👾 retro arcade: press arrow keys or [a/d] to pilot ship | [space] to shoot!" 
    : "🚀 manual control active (autopilot in 5s)";
  ctx.fillText(hintText, w / 2, h - 35);
}

// ══════════════════════════════════════════════════════════════════════════════
// LIQUID GLASS — floating gradient orbs
// ══════════════════════════════════════════════════════════════════════════════
function drawLiquidGlass(ctx: CanvasRenderingContext2D, w: number, h: number, bubbles: Bubble[], t: number) {
  ctx.clearRect(0, 0, w, h);

  for (const b of bubbles) {
    b.x += b.vx + Math.sin(t * 0.0008 + b.hue) * 0.3;
    b.y += b.vy;
    if (b.y < -b.r * 2) b.y = h + b.r;
    if (b.x < -b.r) b.x = w + b.r;
    if (b.x > w + b.r) b.x = -b.r;

    const grad = ctx.createRadialGradient(b.x - b.r*0.3, b.y - b.r*0.3, b.r*0.1, b.x, b.y, b.r);
    grad.addColorStop(0, `hsla(${b.hue}, 90%, 75%, ${b.alpha * 0.8})`);
    grad.addColorStop(0.5, `hsla(${b.hue + 30}, 80%, 60%, ${b.alpha * 0.4})`);
    grad.addColorStop(1, `hsla(${b.hue + 60}, 70%, 50%, 0)`);
    ctx.beginPath();
    ctx.fillStyle = grad;
    ctx.globalAlpha = 1;
    ctx.arc(b.x, b.y, b.r, 0, Math.PI * 2);
    ctx.fill();
  }
  ctx.globalAlpha = 1;
}

function initBubbles(w: number, h: number): Bubble[] {
  return Array.from({ length: 18 }, () => ({
    x: rand(0, w), y: rand(0, h),
    vx: rand(-0.3, 0.3), vy: rand(-0.6, -0.2),
    r: rand(60, 200),
    hue: rand(190, 260),
    alpha: rand(0.03, 0.10),
  }));
}

// ══════════════════════════════════════════════════════════════════════════════
// BLUEPRINT — animated circuit grid
// ══════════════════════════════════════════════════════════════════════════════
function drawBlueprint(ctx: CanvasRenderingContext2D, w: number, h: number, nodes: GridNode[], t: number) {
  ctx.clearRect(0, 0, w, h);

  const cols = 20, rows = 12;
  const gx = w / cols, gy = h / rows;

  // grid lines
  ctx.strokeStyle = "rgba(34, 211, 238, 0.06)";
  ctx.lineWidth = 1;
  for (let c = 0; c <= cols; c++) {
    ctx.beginPath(); ctx.moveTo(c * gx, 0); ctx.lineTo(c * gx, h); ctx.stroke();
  }
  for (let r = 0; r <= rows; r++) {
    ctx.beginPath(); ctx.moveTo(0, r * gy); ctx.lineTo(w, r * gy); ctx.stroke();
  }

  // pulsing nodes + trace lines
  for (const n of nodes) {
    n.pulse = (n.pulse + n.speed) % (Math.PI * 2);
    const a = (Math.sin(n.pulse) + 1) / 2;

    // node dot
    ctx.globalAlpha = 0.2 + a * 0.6;
    ctx.fillStyle = `rgba(34, 211, 238, ${0.4 + a * 0.6})`;
    ctx.beginPath();
    ctx.arc(n.x, n.y, 2.5 + a * 2, 0, Math.PI * 2);
    ctx.fill();

    // glow ring
    if (a > 0.7) {
      ctx.globalAlpha = (a - 0.7) / 0.3 * 0.4;
      ctx.strokeStyle = "#22d3ee";
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.arc(n.x, n.y, 8 + a * 6, 0, Math.PI * 2);
      ctx.stroke();
    }
  }

  // animated scan line
  const scanY = ((t * 0.05) % (h + 40)) - 20;
  const scanGrad = ctx.createLinearGradient(0, scanY - 30, 0, scanY + 30);
  scanGrad.addColorStop(0, "rgba(34, 211, 238, 0)");
  scanGrad.addColorStop(0.5, "rgba(34, 211, 238, 0.07)");
  scanGrad.addColorStop(1, "rgba(34, 211, 238, 0)");
  ctx.fillStyle = scanGrad;
  ctx.globalAlpha = 1;
  ctx.fillRect(0, scanY - 30, w, 60);
}

function initNodes(w: number, h: number): GridNode[] {
  return Array.from({ length: 55 }, () => ({
    x: rand(0, w), y: rand(0, h),
    pulse: rand(0, Math.PI * 2),
    speed: rand(0.01, 0.04),
  }));
}

// ══════════════════════════════════════════════════════════════════════════════
// ILLUSTRATION — floating colourful shapes
// ══════════════════════════════════════════════════════════════════════════════
function drawIllustration(ctx: CanvasRenderingContext2D, w: number, h: number, shapes: Shape[]) {
  ctx.clearRect(0, 0, w, h);

  for (const s of shapes) {
    s.x += s.vx; s.y += s.vy; s.rot += s.rspeed;
    if (s.x < -80) s.x = w + 80;
    if (s.x > w + 80) s.x = -80;
    if (s.y < -80) s.y = h + 80;
    if (s.y > h + 80) s.y = -80;

    ctx.save();
    ctx.translate(s.x, s.y);
    ctx.rotate(s.rot);
    ctx.globalAlpha = s.alpha;
    ctx.fillStyle = s.color;
    ctx.strokeStyle = s.color;
    ctx.lineWidth = 2;

    if (s.sides === 0) {
      // circle
      ctx.beginPath(); ctx.arc(0, 0, s.size, 0, Math.PI * 2); ctx.fill();
    } else {
      // polygon
      ctx.beginPath();
      for (let i = 0; i < s.sides; i++) {
        const a = (i / s.sides) * Math.PI * 2 - Math.PI / 2;
        i === 0 ? ctx.moveTo(Math.cos(a) * s.size, Math.sin(a) * s.size)
                : ctx.lineTo(Math.cos(a) * s.size, Math.sin(a) * s.size);
      }
      ctx.closePath();
      ctx.stroke();
    }
    ctx.restore();
  }
  ctx.globalAlpha = 1;
}

function initShapes(w: number, h: number): Shape[] {
  const palette = ["#f43f5e", "#f59e0b", "#10b981", "#8b5cf6", "#0ea5e9", "#ec4899", "#f97316"];
  return Array.from({ length: 35 }, () => ({
    x: rand(0, w), y: rand(0, h),
    vx: rand(-0.8, 0.8), vy: rand(-0.8, 0.8),
    rot: rand(0, Math.PI * 2),
    rspeed: rand(-0.015, 0.015),
    size: rand(20, 80),
    sides: pick([0, 3, 4, 6]),
    color: pick(palette),
    alpha: rand(0.2, 0.45),
  }));
}

// ══════════════════════════════════════════════════════════════════════════════
// MAIN COMPONENT
// ══════════════════════════════════════════════════════════════════════════════
export default function CanvasBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { activeUniverse } = usePortfolioStore();
  const universeRef = useRef(activeUniverse);

  useEffect(() => {
    universeRef.current = activeUniverse;
  }, [activeUniverse]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let w = window.innerWidth;
    let h = window.innerHeight;
    canvas.width = w;
    canvas.height = h;

    // ── init all states ──────────────────────────────────────────────
    let stars    = initStars(480, w, h);
    let drops    = initDrops(w, h);
    let bubbles  = initBubbles(w, h);
    let nodes    = initNodes(w, h);
    let shapes   = initShapes(w, h);
    const gamingParticles: Particle[] = [];
    const retroArcadeState = {
      playerX: w / 2,
      playerY: h - 100,
      playerVx: 2.2,
      shootCooldown: 0,
      enemies: [] as any[],
      lasers: [] as any[],
      explosions: [] as any[],
      stars: [] as any[],
      score: 0,
      isAutoPilot: true,
      lastInputTime: 0
    };
    const cyberParticles:  Particle[] = [];

    const keys = { Left: false, Right: false, Space: false };

    const handleKeyDown = (e: KeyboardEvent) => {
      const u = universeRef.current;
      if (u !== "universe-retro-arcade") return;

      if (e.key === "ArrowLeft" || e.key === "a" || e.key === "A") {
        keys.Left = true;
      }
      if (e.key === "ArrowRight" || e.key === "d" || e.key === "D") {
        keys.Right = true;
      }
      if (e.key === " " || e.key === "Spacebar") {
        keys.Space = true;
        e.preventDefault();
      }
      if (e.key === "ArrowUp" || e.key === "ArrowDown") {
        e.preventDefault();
      }
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft" || e.key === "a" || e.key === "A") keys.Left = false;
      if (e.key === "ArrowRight" || e.key === "d" || e.key === "D") keys.Right = false;
      if (e.key === " ") keys.Space = false;
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);

    let t = 0;
    let raf: number;

    const draw = () => {
      t++;
      const u = universeRef.current;

      if (u === "universe-cosmos") {
        drawCosmos(ctx, w, h, stars);
      } else if (u === "universe-cyberpunk") {
        drawCyberpunk(ctx, w, h, drops, cyberParticles);
      } else if (u === "universe-gaming") {
        drawGaming(ctx, w, h, gamingParticles, t);
      } else if (u === "universe-retro-arcade") {
        drawRetroArcade(ctx, w, h, retroArcadeState, t, keys);
      } else if (u === "universe-liquid-glass") {
        drawLiquidGlass(ctx, w, h, bubbles, t);
      } else if (u === "universe-blueprint") {
        drawBlueprint(ctx, w, h, nodes, t);
      } else if (u === "universe-illustration") {
        drawIllustration(ctx, w, h, shapes);
      } else {
        // fallback: clear
        ctx.clearRect(0, 0, w, h);
      }

      raf = requestAnimationFrame(draw);
    };

    draw();

    const handleResize = () => {
      w = window.innerWidth;
      h = window.innerHeight;
      canvas.width  = w;
      canvas.height = h;
      // reinit position-dependent state
      stars   = initStars(480, w, h);
      drops   = initDrops(w, h);
      bubbles = initBubbles(w, h);
      nodes   = initNodes(w, h);
      shapes  = initShapes(w, h);
    };

    window.addEventListener("resize", handleResize);
    return () => {
      cancelAnimationFrame(raf);
      audioSynth.stopRetroMusic();
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, []); // runs once; universe switching handled via ref

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        zIndex: 0,
        pointerEvents: "none",
        display: "block",
      }}
    />
  );
}
