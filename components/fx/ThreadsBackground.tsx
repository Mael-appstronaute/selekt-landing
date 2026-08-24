"use client";

import { useEffect, useRef } from "react";

/**
 * Fond « fils » — port maison du background Threads de reactbits.dev,
 * canvas 2D sans dépendance, mêmes couleurs que le héros soie :
 * base void-2, fils sable à faible opacité, dérive très lente.
 * Image fixe si prefers-reduced-motion.
 */
export function ThreadsBackground({ className = "" }: { className?: string }) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const LINES = 30;
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

    const draw = () => {
      resize();
      const { width: w, height: h } = canvas;
      const t = ((performance.now() - start) / 1000) * 0.12; // dérive glaciale

      ctx.fillStyle = "#171512"; /* --void-2 */
      ctx.fillRect(0, 0, w, h);

      for (let i = 0; i < LINES; i++) {
        const progress = i / (LINES - 1);
        const baseY = h * (0.06 + 0.88 * progress);
        const amp = h * 0.05 * (0.5 + Math.sin(progress * Math.PI));
        const alpha = 0.14 + 0.22 * Math.sin(progress * Math.PI);

        ctx.beginPath();
        for (let x = 0; x <= w; x += 6) {
          const n = x / w;
          const y =
            baseY +
            amp *
              (Math.sin(n * 4.2 + t + i * 0.35) * 0.6 +
                Math.sin(n * 9.5 - t * 1.4 + i * 0.18) * 0.3 +
                Math.sin(n * 2.1 + t * 0.7 + i * 0.52) * 0.5);
          if (x === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        /* sable, avec une pointe de laiton sur les fils centraux */
        ctx.strokeStyle =
          progress > 0.35 && progress < 0.65
            ? `rgba(140, 118, 72, ${alpha + 0.02})` /* --brass */
            : `rgba(201, 185, 158, ${alpha})`; /* --sand */
        ctx.lineWidth = 1;
        ctx.stroke();
      }
    };

    const frame = () => {
      draw();
      if (!reduced && visible) raf = requestAnimationFrame(frame);
    };

    const ro = new ResizeObserver(() => {
      if (reduced) draw();
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
