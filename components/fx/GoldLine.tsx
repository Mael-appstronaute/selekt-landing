"use client";

import { motion, useReducedMotion, useScroll, useSpring, useTransform } from "motion/react";
import { useRef, type ReactNode } from "react";

/**
 * Effet signature n°2 — la ligne dorée qui se trace au scroll
 * le long de la boucle de valeur. SVG maison, aucune bibliothèque.
 */
export function GoldLine({
  d,
  viewBox,
  className = "",
  children,
  strokeWidth = 1.25,
}: {
  d: string;
  viewBox: string;
  className?: string;
  children?: ReactNode;
  strokeWidth?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.75", "end 0.45"],
  });
  const raw = useTransform(scrollYProgress, [0, 1], [0, 1]);
  const progress = useSpring(raw, { stiffness: 90, damping: 28, restDelta: 0.001 });

  return (
    <div ref={ref} className={`relative ${className}`}>
      <svg
        aria-hidden
        viewBox={viewBox}
        fill="none"
        preserveAspectRatio="none"
        className="absolute inset-0 h-full w-full"
      >
        {/* Tracé fantôme, à peine visible */}
        <path d={d} stroke="var(--sand)" strokeOpacity="0.14" strokeWidth={strokeWidth} />
        {/* Tracé doré piloté par le scroll */}
        <motion.path
          d={d}
          stroke="var(--gold)"
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          pathLength={1}
          style={{ pathLength: reduced ? 1 : progress }}
        />
      </svg>
      {children}
    </div>
  );
}
