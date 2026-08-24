"use client";

import { motion, useReducedMotion } from "motion/react";

const EASE_LUX = [0.22, 1, 0.36, 1] as const;

export type AttributionLabels = {
  window: string;
  direct: string;
  influenced: string;
  note: string;
  title: string;
};

/**
 * Mockup maison — CA direct vs CA influencé. Aucune donnée réelle :
 * des parts en pourcentage, un décor. L'image démontre la réconciliation.
 */
export function AttributionPanel({ labels }: { labels: AttributionLabels }) {
  const reduced = useReducedMotion();

  const bar = (width: string, className: string, delay: number) => (
    <motion.div
      className={`h-2 rounded-full ${className}`}
      initial={reduced ? { width } : { width: 0 }}
      whileInView={{ width }}
      viewport={{ once: true }}
      transition={{ duration: 1.1, ease: EASE_LUX, delay }}
    />
  );

  return (
    <div className="mock-chrome dark on-dark w-full max-w-[460px]">
      <div className="flex items-center justify-between border-b border-sand/12 px-5 py-3">
        <p className="kicker text-[0.6rem] text-sand-muted">{labels.title}</p>
        <span className="kicker whitespace-nowrap rounded-full border border-gold/40 px-2.5 py-1 text-[0.55rem] text-gold">
          {labels.window}
        </span>
      </div>
      <div className="space-y-6 p-6">
        <div>
          <div className="flex items-baseline justify-between">
            <p className="text-[0.85rem] text-on-void/85">{labels.direct}</p>
            <p className="font-serif text-[1.5rem] leading-none text-sand">72&nbsp;%</p>
          </div>
          <div className="mt-2.5 rounded-full bg-sand/10">{bar("72%", "bg-sand/60", 0.15)}</div>
        </div>
        <div>
          <div className="flex items-baseline justify-between">
            <p className="text-[0.85rem] text-on-void/85">{labels.influenced}</p>
            <p className="font-serif text-[1.5rem] leading-none text-green-on-void">
              28&nbsp;%
            </p>
          </div>
          <div className="mt-2.5 rounded-full bg-sand/10">
            {bar("28%", "bg-green-on-void/80", 0.3)}
          </div>
        </div>
        <p className="border-t border-sand/12 pt-4 text-[0.8rem] leading-relaxed muted-dark">
          {labels.note}
        </p>
      </div>
    </div>
  );
}
