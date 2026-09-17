"use client";

import { useEffect, useRef } from "react";

/**
 * Orbe d'or — port maison du background « Orb » de reactbits.dev,
 * exclusif à la LP pilote. Un grand astre chaud qui respire bas-centre
 * (lever de soleil sur soie noire), deux arcs fins en rotation lente,
 * poussière d'or ascendante. Canvas 2D sans dépendance, palette héros :
 * base #171512, sable rgba(201,185,158), laiton rgba(140,118,72),
 * or rgba(201,169,106). Image fixe si prefers-reduced-motion ;
 * pause hors viewport ; DPR plafonné à 1.5.
 */

const BASE = "#171512";
const SAND = (a: number) => `rgba(201, 185, 158, ${a})`;
const BRASS = (a: number) => `rgba(140, 118, 72, ${a})`;
const GOLD = (a: number) => `rgba(201, 169, 106, ${a})`;

export function OrbBackground({ className = "" }: { className?: string }) {
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

    const draw = (t: number) => {
      const w = canvas.width;
      const h = canvas.height;
      ctx.fillStyle = BASE;
      ctx.fillRect(0, 0, w, h);

      const cx = w * 0.5;
      const cy = h * 0.68;
      const R = Math.min(w, h) * 0.56 * (1 + 0.025 * Math.sin(t * 0.4));

      /* Halo extérieur — la lueur qui monte sur tout le panneau */
      const halo = ctx.createRadialGradient(cx, cy, R * 0.1, cx, cy, R * 1.9);
      halo.addColorStop(0, BRASS(0.56));
      halo.addColorStop(0.35, BRASS(0.28));
      halo.addColorStop(0.7, SAND(0.09));
      halo.addColorStop(1, "rgba(23, 21, 18, 0)");
      ctx.fillStyle = halo;
      ctx.fillRect(0, 0, w, h);

      /* Cœur de l'astre — or chaud, plus dense */
      const core = ctx.createRadialGradient(cx, cy, 0, cx, cy, R * 0.85);
      core.addColorStop(0, GOLD(0.64 + 0.07 * Math.sin(t * 0.55)));
      core.addColorStop(0.45, BRASS(0.3));
      core.addColorStop(1, "rgba(23, 21, 18, 0)");
      ctx.fillStyle = core;
      ctx.fillRect(0, 0, w, h);

      /* Limbe — un fin croissant de lumière sur le bord supérieur du disque */
      const limb = ctx.createLinearGradient(cx - R * 0.6, cy - R * 0.62, cx + R * 0.6, cy - R * 0.4);
      limb.addColorStop(0, "rgba(23, 21, 18, 0)");
      limb.addColorStop(0.5, SAND(0.75));
      limb.addColorStop(1, "rgba(23, 21, 18, 0)");
      ctx.strokeStyle = limb;
      ctx.lineWidth = Math.max(1.25, R * 0.008);
      ctx.beginPath();
      ctx.arc(cx, cy, R * 0.58, Math.PI * 1.12, Math.PI * 1.88);
      ctx.stroke();

      /* Deux arcs orbitaux fins en rotation lente */
      for (let i = 0; i < 2; i++) {
        const a0 = t * (0.1 + i * 0.05) * (i === 0 ? 1 : -1) + i * 2.4;
        ctx.strokeStyle = SAND(0.24 - i * 0.07);
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.arc(cx, cy, R * (0.72 + i * 0.16), a0, a0 + 1.4 + i * 0.5);
        ctx.stroke();
      }

      /* Poussière d'or ascendante, concentrée autour de l'astre */
      for (let i = 0; i < 80; i++) {
        const seed = i * 127.31;
        const speed = 6 + (i % 5) * 2.5;
        const x = cx + Math.sin(seed) * R * 1.35 + Math.sin(t * 0.2 + seed) * 18;
        const y = (((seed * 104729) % h) - t * speed) % h;
        const yy = y < 0 ? y + h : y;
        const dist = Math.abs(x - cx) / (R * 1.4);
        if (dist > 1) continue;
        const alpha = (0.16 + 0.36 * Math.abs(Math.sin(seed + t * 0.3))) * (1 - dist * 0.55);
        ctx.beginPath();
        ctx.arc(x, yy, 0.9 + (i % 3) * 0.7, 0, Math.PI * 2);
        ctx.fillStyle = i % 5 === 0 ? GOLD(alpha + 0.1) : SAND(alpha);
        ctx.fill();
      }
    };

    const frame = () => {
      resize();
      draw((performance.now() - start) / 1000);
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
  }, []);

  return <canvas ref={ref} aria-hidden className={`h-full w-full ${className}`} />;
}
