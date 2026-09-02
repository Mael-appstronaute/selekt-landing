"use client";

import { motion, useReducedMotion } from "motion/react";
import { useState } from "react";

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
 * Interactif : « Modifier » retire les mots bloqués, l'envoi se valide
 * d'un geste humain — exactement le flux produit.
 */
export function AiDraft({ labels }: { labels: AiDraftLabels }) {
  const reduced = useReducedMotion();
  const [edited, setEdited] = useState(false);
  const [sent, setSent] = useState(false);

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
          className={`font-serif text-[1.05rem] leading-relaxed transition-opacity duration-500 ease-(--ease-lux) ${
            sent ? "text-on-void/55" : "text-on-void/90"
          }`}
          initial={reduced ? false : { opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, ease: EASE_LUX, delay: 0.2 }}
        >
          {labels.segments.map((seg, i) =>
            seg.blocked ? (
              edited ? null : (
                <s key={i} className="text-[#D68A96] decoration-[#6E2634] decoration-1">
                  {seg.text}
                </s>
              )
            ) : (
              <span key={i}>{seg.text}</span>
            ),
          )}
        </motion.p>
        <div className="mt-6 flex gap-3">
          {!sent && (
            <button
              type="button"
              aria-pressed={edited}
              onClick={() => setEdited(!edited)}
              className={`inline-flex h-9 cursor-pointer items-center rounded-full border px-4 text-[0.8rem] transition-colors duration-300 ease-(--ease-lux) ${
                edited
                  ? "border-gold/50 text-gold"
                  : "border-sand/30 text-on-void/80 hover:border-sand/55"
              }`}
            >
              {labels.editLabel}
            </button>
          )}
          <button
            type="button"
            disabled={sent}
            onClick={() => setSent(true)}
            className={`inline-flex h-9 items-center gap-2 rounded-full px-4 text-[0.8rem] font-medium transition-colors duration-300 ease-(--ease-lux) ${
              sent
                ? "border border-gold/60 bg-gold/10 text-gold"
                : "cursor-pointer bg-cream-2 text-ink hover:bg-cream"
            }`}
          >
            {sent && (
              <svg
                aria-hidden
                viewBox="0 0 12 12"
                className="h-3 w-3"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
              >
                <path d="M1.5 6.5 4.5 9.5 10.5 2.5" />
              </svg>
            )}
            {labels.approveLabel}
          </button>
        </div>
        <p className="mt-5 border-t border-sand/12 pt-4 text-[0.8rem] leading-relaxed muted-dark">
          {labels.footnote}
        </p>
      </div>
    </div>
  );
}
