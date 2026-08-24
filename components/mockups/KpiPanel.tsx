"use client";

import { motion, useReducedMotion } from "motion/react";

const EASE_LUX = [0.22, 1, 0.36, 1] as const;

export type KpiRow = { label: string; value: string; share: number; green?: boolean };

/**
 * Mockup maison — cockpit de pilotage (manager ou siège).
 * Barres en parts relatives, aucune donnée réelle.
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
      <div className="space-y-5 p-6">
        {rows.map((row, i) => (
          <div key={i}>
            <div className="flex items-baseline justify-between gap-4">
              <p className="text-[0.84rem] text-on-void/85">{row.label}</p>
              <p
                className={`font-serif text-[1.15rem] leading-none ${
                  row.green ? "text-green-on-void" : "text-sand"
                }`}
              >
                {row.value}
              </p>
            </div>
            <div className="mt-2 rounded-full bg-sand/10">
              <motion.div
                className={`h-1.5 rounded-full ${
                  row.green ? "bg-green-on-void/80" : "bg-sand/55"
                }`}
                initial={reduced ? { width: `${row.share}%` } : { width: 0 }}
                whileInView={{ width: `${row.share}%` }}
                viewport={{ once: true }}
                transition={{ duration: 1, ease: EASE_LUX, delay: 0.15 + i * 0.1 }}
              />
            </div>
          </div>
        ))}
        {footnote && (
          <p className="border-t border-sand/12 pt-4 text-[0.8rem] leading-relaxed muted-dark">
            {footnote}
          </p>
        )}
      </div>
    </div>
  );
}
