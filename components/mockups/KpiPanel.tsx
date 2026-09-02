"use client";

import { motion, useReducedMotion } from "motion/react";
import { useState } from "react";

const EASE_LUX = [0.22, 1, 0.36, 1] as const;

export type KpiRow = { label: string; value: string; share: number; green?: boolean };

/**
 * Mockup maison — cockpit de pilotage (manager ou siège).
 * Barres en parts relatives, aucune donnée réelle. Interactif :
 * survoler ou toucher une ligne la met en avant et révèle sa part.
 */
export function KpiPanel({
  title,
  badge,
  rows,
  footnote,
}: {
  title: string;
  badge?: string;
  rows: KpiRow[];
  footnote?: string;
}) {
  const reduced = useReducedMotion();
  const [active, setActive] = useState<number | null>(null);
  return (
    <div className="mock-chrome dark on-dark w-full max-w-[460px]">
      <div className="flex items-center justify-between border-b border-sand/12 px-5 py-3">
        <p className="kicker text-[0.6rem] text-sand-muted">{title}</p>
        {badge && (
          <span className="kicker whitespace-nowrap rounded-full border border-gold/40 px-2.5 py-1 text-[0.55rem] text-gold">
            {badge}
          </span>
        )}
      </div>
      <div className="space-y-2 p-4 md:p-5">
        {rows.map((row, i) => {
          const isActive = active === i;
          return (
            <button
              key={i}
              type="button"
              aria-pressed={isActive}
              onClick={() => setActive(isActive ? null : i)}
              onMouseEnter={() => setActive(i)}
              onMouseLeave={() => setActive(null)}
              className={`block w-full cursor-pointer rounded-lg px-2.5 py-2.5 text-left transition-colors duration-300 ease-(--ease-lux) ${
                isActive ? "bg-sand/8" : ""
              }`}
            >
              <div className="flex items-baseline justify-between gap-4">
                <p
                  className={`text-[0.84rem] transition-colors duration-300 ease-(--ease-lux) ${
                    isActive ? "text-cream-2" : "text-on-void/85"
                  }`}
                >
                  {row.label}
                </p>
                <p className="flex items-baseline gap-2 whitespace-nowrap">
                  <span
                    aria-hidden
                    className={`font-mono text-[0.62rem] tracking-[0.08em] text-sand-muted transition-opacity duration-300 ease-(--ease-lux) ${
                      isActive ? "opacity-100" : "opacity-0"
                    }`}
                  >
                    {row.share}&nbsp;%
                  </span>
                  <span
                    className={`font-serif text-[1.15rem] leading-none ${
                      row.green ? "text-green-on-void" : "text-sand"
                    }`}
                  >
                    {row.value}
                  </span>
                </p>
              </div>
              <div className="mt-2 rounded-full bg-sand/10">
                <motion.div
                  className={`h-1.5 rounded-full transition-opacity duration-300 ease-(--ease-lux) ${
                    row.green ? "bg-green-on-void/80" : "bg-sand/55"
                  } ${active !== null && !isActive ? "opacity-45" : ""}`}
                  initial={reduced ? { width: `${row.share}%` } : { width: 0 }}
                  whileInView={{ width: `${row.share}%` }}
                  viewport={{ once: true }}
                  transition={{ duration: 1, ease: EASE_LUX, delay: 0.15 + i * 0.1 }}
                />
              </div>
            </button>
          );
        })}
        {footnote && (
          <p className="border-t border-sand/12 px-2.5 pb-1 pt-4 text-[0.8rem] leading-relaxed muted-dark">
            {footnote}
          </p>
        )}
      </div>
    </div>
  );
}
