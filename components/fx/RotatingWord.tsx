"use client";

import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useEffect, useState } from "react";

const EASE_LUX = [0.22, 1, 0.36, 1] as const;

/**
 * Mot tournant du héros — glissement vertical doux, cadence lente.
 * Inspiration ReactBits rotating-text, sans rebond. La largeur est
 * réservée sur le mot le plus long pour ne jamais faire bouger la ligne.
 * Statique (premier mot) si prefers-reduced-motion.
 */
export function RotatingWord({
  words,
  interval = 2800,
  className = "",
}: {
  words: string[];
  interval?: number;
  className?: string;
}) {
  const [index, setIndex] = useState(0);
  const reduced = useReducedMotion();
  const longest = words.reduce((a, b) => (b.length > a.length ? b : a), "");

  useEffect(() => {
    if (reduced || words.length < 2) return;
    const id = setInterval(() => setIndex((i) => (i + 1) % words.length), interval);
    return () => clearInterval(id);
  }, [words.length, interval, reduced]);

  if (reduced) {
    return <em className={`italic text-sand ${className}`}>{words[0]}</em>;
  }

  return (
    <span className={`relative inline-block overflow-hidden align-bottom ${className}`}>
      {/* réserve la largeur du mot le plus long */}
      <em aria-hidden className="invisible italic">
        {longest}
      </em>
      <AnimatePresence initial={false}>
        <motion.em
          key={words[index]}
          initial={{ y: "105%", opacity: 0 }}
          animate={{ y: "0%", opacity: 1 }}
          exit={{ y: "-105%", opacity: 0 }}
          transition={{ duration: 0.55, ease: EASE_LUX }}
          className="absolute inset-x-0 bottom-0 italic text-sand"
        >
          {words[index]}
        </motion.em>
      </AnimatePresence>
    </span>
  );
}
