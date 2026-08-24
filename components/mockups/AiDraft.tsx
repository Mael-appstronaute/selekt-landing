"use client";

import { motion, useReducedMotion } from "motion/react";

const EASE_LUX = [0.22, 1, 0.36, 1] as const;

export type AiDraftLabels = {
  title: string;
  badge: string;
  /** segments du message : les segments blocked sont barrés au bordeaux */
  segments: { text: string; blocked?: boolean }[];
  editLabel: string;
  approveLabel: string;
  footnote: string;
};

/**
 * Mockup maison — brouillon IA relu avant envoi. Le bouton « envoyer »
 * n'existe pas côté IA : la validation humaine est le garde-fou central.
 */
export function AiDraft({ labels }: { labels: AiDraftLabels }) {
  const reduced = useReducedMotion();
  return (
    <div className="mock-chrome dark on-dark w-full max-w-[440px]">
      <div className="flex items-center justify-between border-b border-sand/12 px-5 py-3">
        <p className="kicker text-[0.6rem] text-sand-muted">{labels.title}</p>
        <span className="kicker whitespace-nowrap rounded-full border border-gold/40 px-2.5 py-1 text-[0.55rem] text-gold">
          {labels.badge}
        </span>
      </div>
      <div className="p-6">
        <motion.p
          className="font-serif text-[1.05rem] leading-relaxed text-on-void/90"
          initial={reduced ? false : { opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, ease: EASE_LUX, delay: 0.2 }}
        >
          {labels.segments.map((seg, i) =>
            seg.blocked ? (
              <s key={i} className="text-[#D68A96] decoration-[#6E2634] decoration-1">
                {seg.text}
              </s>
            ) : (
              <span key={i}>{seg.text}</span>
            ),
          )}
        </motion.p>
        <div className="mt-6 flex gap-3">
          <span className="inline-flex h-9 items-center rounded-full border border-sand/30 px-4 text-[0.8rem] text-on-void/80">
            {labels.editLabel}
          </span>
          <span className="inline-flex h-9 items-center rounded-full bg-cream-2 px-4 text-[0.8rem] font-medium text-ink">
            {labels.approveLabel}
          </span>
        </div>
        <p className="mt-5 border-t border-sand/12 pt-4 text-[0.8rem] leading-relaxed muted-dark">
          {labels.footnote}
        </p>
      </div>
    </div>
  );
}
