"use client";

import { motion, useReducedMotion } from "motion/react";
import { useState } from "react";

const EASE_LUX = [0.22, 1, 0.36, 1] as const;

export type AttributionLabels = {
  window: string;
  direct: string;
  influenced: string;
  note: string;
  title: string;
};

/* Trois fenêtres d'attribution : la part influencée croît avec la fenêtre.
   Parts en pourcentage du CA total — la somme fait toujours 100. */
const WINDOWS = [
  { days: 7, direct: 82, influenced: 18 },
  { days: 30, direct: 72, influenced: 28 },
  { days: 90, direct: 64, influenced: 36 },
] as const;

/**
 * Mockup maison — CA direct vs CA influencé. Aucune donnée réelle :
 * des parts en pourcentage, un décor. Interactif : la fenêtre
 * d'attribution se règle, les parts se recalculent — c'est le
 * concept produit central, démontré en un geste.
 */
export function AttributionPanel({
  labels,
  locale = "fr",
}: {
  labels: AttributionLabels;
  locale?: "fr" | "en";
}) {
  const reduced = useReducedMotion();
  const [idx, setIdx] = useState(1);
  const current = WINDOWS[idx];
  const unit = locale === "en" ? "d" : "j";

  const bar = (width: number, className: string, delay: number) => (
    <motion.div
      className={`h-2 rounded-full ${className}`}
      initial={reduced ? { width: `${width}%` } : { width: 0 }}
      whileInView={{ width: `${width}%` }}
      viewport={{ once: true }}
      transition={{ duration: reduced ? 0 : 0.9, ease: EASE_LUX, delay }}
    />
  );

  return (
    <div className="mock-chrome dark on-dark w-full max-w-[460px]">
      <div className="flex items-center justify-between gap-3 border-b border-sand/12 px-5 py-3">
        <p className="kicker text-[0.6rem] text-sand-muted">{labels.title}</p>
        <div className="flex items-center gap-1" role="group" aria-label={labels.window}>
          {WINDOWS.map((w, i) => (
            <button
              key={w.days}
              type="button"
              onClick={() => setIdx(i)}
              aria-pressed={i === idx}
              className={`kicker cursor-pointer whitespace-nowrap rounded-full border px-2.5 py-1 text-[0.55rem] transition-colors duration-300 ease-(--ease-lux) ${
                i === idx
                  ? "border-gold/60 bg-gold/10 text-gold"
                  : "border-sand/20 text-sand-muted hover:border-sand/45 hover:text-sand"
              }`}
            >
              {w.days}&nbsp;{unit}
            </button>
          ))}
        </div>
      </div>
      <div className="space-y-6 p-6">
        <div>
          <div className="flex items-baseline justify-between">
            <p className="text-[0.85rem] text-on-void/85">{labels.direct}</p>
            <motion.p
              key={`d-${current.direct}`}
              initial={reduced ? false : { opacity: 0.25 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, ease: EASE_LUX }}
              className="font-serif text-[1.5rem] leading-none text-sand"
            >
              {current.direct}&nbsp;%
            </motion.p>
          </div>
          <div className="mt-2.5 rounded-full bg-sand/10">
            {bar(current.direct, "bg-sand/60", 0.15)}
          </div>
        </div>
        <div>
          <div className="flex items-baseline justify-between">
            <p className="text-[0.85rem] text-on-void/85">{labels.influenced}</p>
            <motion.p
              key={`i-${current.influenced}`}
              initial={reduced ? false : { opacity: 0.25 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, ease: EASE_LUX }}
              className="font-serif text-[1.5rem] leading-none text-green-on-void"
            >
              {current.influenced}&nbsp;%
            </motion.p>
          </div>
          <div className="mt-2.5 rounded-full bg-sand/10">
            {bar(current.influenced, "bg-green-on-void/80", 0.3)}
          </div>
        </div>
        <p className="border-t border-sand/12 pt-4 text-[0.8rem] leading-relaxed muted-dark">
          {labels.note}
        </p>
      </div>
    </div>
  );
}
