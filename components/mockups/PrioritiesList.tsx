"use client";

import { motion, useReducedMotion } from "motion/react";

const EASE_LUX = [0.22, 1, 0.36, 1] as const;

export type PriorityItem = { initials: string; text: string; tag: string; wine?: boolean };

/**
 * Mockup maison — « priorités du jour » du vendeur. Données fictives
 * et anonymes (initiales), jamais de vraies informations clients.
 */
export function PrioritiesList({
  title,
  items,
}: {
  title: string;
  items: PriorityItem[];
}) {
  const reduced = useReducedMotion();
  return (
    <div className="mock-chrome dark on-dark w-full max-w-[420px]">
      <div className="border-b border-sand/12 px-5 py-3">
        <p className="kicker text-[0.6rem] text-sand-muted">{title}</p>
      </div>
      <ul className="divide-y divide-sand/8 p-2">
        {items.map((item, i) => (
          <motion.li
            key={i}
            className="flex items-center gap-4 px-3 py-3.5"
            initial={reduced ? false : { opacity: 0, x: 18 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: EASE_LUX, delay: 0.15 + i * 0.12 }}
          >
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-sand/25 font-serif text-[0.8rem] italic text-sand">
              {item.initials}
            </span>
            <p className="flex-1 text-[0.84rem] leading-snug text-on-void/85">{item.text}</p>
            <span
              className={`kicker shrink-0 rounded-full border px-2.5 py-1 text-[0.52rem] ${
                item.wine
                  ? "border-wine text-[#D68A96]"
                  : "border-sand/30 text-sand-muted"
              }`}
            >
              {item.tag}
            </span>
          </motion.li>
        ))}
      </ul>
    </div>
  );
}
