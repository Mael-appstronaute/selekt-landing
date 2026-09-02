"use client";

import { motion, useReducedMotion } from "motion/react";
import { useState } from "react";

const EASE_LUX = [0.22, 1, 0.36, 1] as const;

export type PriorityItem = { initials: string; text: string; tag: string; wine?: boolean };

/**
 * Mockup maison — « priorités du jour » du vendeur. Données fictives
 * et anonymes (initiales), jamais de vraies informations clients.
 * Interactif : toucher une priorité la coche — le geste du vendeur.
 */
export function PrioritiesList({
  title,
  items,
}: {
  title: string;
  items: PriorityItem[];
}) {
  const reduced = useReducedMotion();
  const [done, setDone] = useState<boolean[]>(() => items.map(() => false));

  const toggle = (i: number) =>
    setDone((prev) => prev.map((d, j) => (j === i ? !d : d)));

  return (
    <div className="mock-chrome dark on-dark w-full max-w-[420px]">
      <div className="border-b border-sand/12 px-5 py-3">
        <p className="kicker text-[0.6rem] text-sand-muted">{title}</p>
      </div>
      <ul className="divide-y divide-sand/8 p-2">
        {items.map((item, i) => (
          <motion.li
            key={i}
            initial={reduced ? false : { opacity: 0, x: 18 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: EASE_LUX, delay: 0.15 + i * 0.12 }}
          >
            <button
              type="button"
              aria-pressed={done[i]}
              onClick={() => toggle(i)}
              className="flex w-full cursor-pointer items-center gap-4 rounded-lg px-3 py-3.5 text-left transition-colors duration-300 ease-(--ease-lux) hover:bg-sand/6"
            >
              <span
                className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full border font-serif text-[0.8rem] italic transition-colors duration-300 ease-(--ease-lux) ${
                  done[i]
                    ? "border-gold/60 bg-gold/10 text-gold"
                    : "border-sand/25 text-sand"
                }`}
              >
                {done[i] ? (
                  <svg
                    aria-hidden
                    viewBox="0 0 12 12"
                    className="h-3.5 w-3.5"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                  >
                    <path d="M1.5 6.5 4.5 9.5 10.5 2.5" />
                  </svg>
                ) : (
                  item.initials
                )}
              </span>
              <p
                className={`flex-1 text-[0.84rem] leading-snug transition-all duration-300 ease-(--ease-lux) ${
                  done[i] ? "text-on-void/40 line-through decoration-sand/40" : "text-on-void/85"
                }`}
              >
                {item.text}
              </p>
              <span
                className={`kicker shrink-0 rounded-full border px-2.5 py-1 text-[0.52rem] transition-colors duration-300 ease-(--ease-lux) ${
                  done[i]
                    ? "border-gold/50 text-gold"
                    : item.wine
                      ? "border-wine text-[#D68A96]"
                      : "border-sand/30 text-sand-muted"
                }`}
              >
                {done[i] ? "✓" : item.tag}
              </span>
            </button>
          </motion.li>
        ))}
      </ul>
    </div>
  );
}
