"use client";

import { useEffect, useRef } from "react";

/**
 * Fonds de héros — ports maison des backgrounds reactbits.dev
 * (particles, waves, dot-grid, soft-aurora, light-rays, beams),
 * tous dans la palette du héros soie : base void-2 #171512,
 * reflets sable rgba(201,185,158) et laiton rgba(140,118,72).
 * Canvas 2D sans dépendance ; image fixe si prefers-reduced-motion ;
 * pause hors viewport ; DPR plafonné à 1.5.
 */

const BASE = "#171512";
const SAND = (a: number) => `rgba(201, 185, 158, ${a})`;
const BRASS = (a: number) => `rgba(140, 118, 72, ${a})`;

type DrawFn = (ctx: CanvasRenderingContext2D, w: number, h: number, t: number) => void;

function useCanvasLoop(draw: DrawFn) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let raf = 0;
    let visible = true;
    const start = performance.now();
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      const w = Math.round(canvas.clientWidth * dpr);
      const h = Math.round(canvas.clientHeight * dpr);
      if (canvas.width !== w || canvas.height !== h) {
        canvas.width = w;
        canvas.height = h;
      }
    };

    const frame = () => {
      resize();
      draw(ctx, canvas.width, canvas.height, (performance.now() - start) / 1000);
      if (!reduced && visible) raf = requestAnimationFrame(frame);
    };

    const ro = new ResizeObserver(() => {
      if (reduced) frame();
    });
    ro.observe(canvas);

    const io = new IntersectionObserver(([entry]) => {
      const nowVisible = entry.isIntersecting;
      if (nowVisible && !visible) {
        visible = true;
        if (!reduced) raf = requestAnimationFrame(frame);
      } else if (!nowVisible) {
        visible = false;
        cancelAnimationFrame(raf);
      }
    });
    io.observe(canvas);

    frame();

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      io.disconnect();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return ref;
}

function fill(ctx: CanvasRenderingContext2D, w: number, h: number) {
  ctx.fillStyle = BASE;
  ctx.fillRect(0, 0, w, h);
}

/* ——— Poussière d'or (reactbits « particles ») — Espace Vendeur ——— */
export function ParticlesBackground({ className = "" }: { className?: string }) {
  const ref = useCanvasLoop((ctx, w, h, t) => {
    fill(ctx, w, h);
    for (let i = 0; i < 110; i++) {
      const seed = i * 127.31;
      const speed = 8 + (i % 5) * 3;
      const x = ((seed * 7919) % w) + Math.sin(t * 0.22 + seed) * 26;
      const y = (((seed * 104729) % h) - t * speed) % h;
      const yy = y < 0 ? y + h : y;
      const r = 1 + ((i % 4) * 0.7);
      const alpha = 0.2 + 0.35 * Math.abs(Math.sin(seed + t * 0.28));
      ctx.beginPath();
      ctx.arc(x, yy, r, 0, Math.PI * 2);
      ctx.fillStyle = i % 6 === 0 ? BRASS(alpha + 0.1) : SAND(alpha);
      ctx.fill();
    }
  });
  return <canvas ref={ref} aria-hidden className={`h-full w-full ${className}`} />;
}

/* ——— Vagues (reactbits « waves ») — CA influencé ——— */
export function WavesBackground({ className = "" }: { className?: string }) {
  const ref = useCanvasLoop((ctx, w, h, t) => {
    fill(ctx, w, h);
    for (let layer = 0; layer < 4; layer++) {
      const baseY = h * (0.45 + layer * 0.16);
      const amp = h * (0.05 + layer * 0.015);
      const phase = t * (0.1 + layer * 0.035);
      ctx.beginPath();
      ctx.moveTo(0, h);
      for (let x = 0; x <= w; x += 8) {
        const n = x / w;
        const y =
          baseY +
          amp * Math.sin(n * 5.2 + phase + layer * 1.7) +
          amp * 0.5 * Math.sin(n * 11.4 - phase * 1.5);
        ctx.lineTo(x, y);
      }
      ctx.lineTo(w, h);
      ctx.closePath();
      ctx.fillStyle = layer === 1 ? BRASS(0.11) : SAND(0.07 + layer * 0.025);
      ctx.fill();
    }
  });
  return <canvas ref={ref} aria-hidden className={`h-full w-full ${className}`} />;
}

/* ——— Grille de points (reactbits « dot-grid ») — Sécurité ——— */
export function DotGridBackground({ className = "" }: { className?: string }) {
  const ref = useCanvasLoop((ctx, w, h, t) => {
    fill(ctx, w, h);
    const gap = Math.max(26, w / 52);
    for (let x = gap / 2; x < w; x += gap) {
      for (let y = gap / 2; y < h; y += gap) {
        const wave = Math.sin(x * 0.008 + y * 0.011 + t * 0.5);
        const alpha = 0.12 + 0.26 * Math.max(0, wave);
        ctx.beginPath();
        ctx.arc(x, y, 1.4, 0, Math.PI * 2);
        ctx.fillStyle = wave > 0.85 ? BRASS(alpha + 0.12) : SAND(alpha);
        ctx.fill();
      }
    }
  });
  return <canvas ref={ref} aria-hidden className={`h-full w-full ${className}`} />;
}

/* ——— Aurore chaude (reactbits « soft-aurora ») — IA copilote ——— */
export function AuroraBackground({ className = "" }: { className?: string }) {
  const ref = useCanvasLoop((ctx, w, h, t) => {
    fill(ctx, w, h);
    const blobs = [
      { x: 0.25 + 0.12 * Math.sin(t * 0.07), y: 0.35 + 0.1 * Math.cos(t * 0.05), r: 0.6, c: BRASS(0.34) },
      { x: 0.72 + 0.1 * Math.cos(t * 0.06), y: 0.3 + 0.12 * Math.sin(t * 0.08), r: 0.52, c: SAND(0.2) },
      { x: 0.5 + 0.14 * Math.sin(t * 0.045), y: 0.75 + 0.08 * Math.cos(t * 0.065), r: 0.65, c: BRASS(0.2) },
    ];
    for (const b of blobs) {
      const g = ctx.createRadialGradient(b.x * w, b.y * h, 0, b.x * w, b.y * h, b.r * Math.max(w, h) * 0.6);
      g.addColorStop(0, b.c);
      g.addColorStop(1, "rgba(23, 21, 18, 0)");
      ctx.fillStyle = g;
      ctx.fillRect(0, 0, w, h);
    }
  });
  return <canvas ref={ref} aria-hidden className={`h-full w-full ${className}`} />;
}

/* ——— Rais de lumière (reactbits « light-rays ») — Espace Siège ——— */
export function RaysBackground({ className = "" }: { className?: string }) {
  const ref = useCanvasLoop((ctx, w, h, t) => {
    fill(ctx, w, h);
    const cx = w * 0.5;
    const cy = -h * 0.25;
    for (let i = 0; i < 9; i++) {
      const angle = Math.PI / 2 + (i - 4) * 0.16 + Math.sin(t * 0.08 + i) * 0.02;
      const spread = 0.05 + (i % 3) * 0.015;
      const len = Math.max(w, h) * 1.6;
      const alpha = 0.07 + 0.1 * Math.abs(Math.sin(t * 0.12 + i * 1.3));
      ctx.beginPath();
      ctx.moveTo(cx, cy);
      ctx.lineTo(cx + Math.cos(angle - spread) * len, cy + Math.sin(angle - spread) * len);
      ctx.lineTo(cx + Math.cos(angle + spread) * len, cy + Math.sin(angle + spread) * len);
      ctx.closePath();
      ctx.fillStyle = i % 3 === 0 ? BRASS(alpha) : SAND(alpha);
      ctx.fill();
    }
  });
  return <canvas ref={ref} aria-hidden className={`h-full w-full ${className}`} />;
}

/* ——— Colonnes lumineuses (reactbits « beams ») — Espace Manager ——— */
export function BeamsBackground({ className = "" }: { className?: string }) {
  const ref = useCanvasLoop((ctx, w, h, t) => {
    fill(ctx, w, h);
    const count = 7;
    for (let i = 0; i < count; i++) {
      const bw = w * (0.06 + (i % 3) * 0.03);
      const x = ((i / count) * w + Math.sin(t * 0.06 + i * 2.1) * w * 0.04 + w) % w;
      const alpha = 0.09 + 0.09 * Math.abs(Math.sin(t * 0.1 + i * 1.7));
      const g = ctx.createLinearGradient(x - bw, 0, x + bw, 0);
      g.addColorStop(0, "rgba(23, 21, 18, 0)");
      g.addColorStop(0.5, i % 3 === 0 ? BRASS(alpha) : SAND(alpha));
      g.addColorStop(1, "rgba(23, 21, 18, 0)");
      ctx.fillStyle = g;
      ctx.fillRect(x - bw, 0, bw * 2, h);
    }
  });
  return <canvas ref={ref} aria-hidden className={`h-full w-full ${className}`} />;
}
