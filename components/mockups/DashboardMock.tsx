"use client";

import { motion } from "motion/react";
import { useState } from "react";

const EASE_LUX = [0.22, 1, 0.36, 1] as const;

/**
 * Grand cockpit de démonstration — la pièce maîtresse du héros de vente.
 * Décor en charte (aucune donnée réelle), cadre navigateur mock-chrome,
 * rail latéral, KPIs or et barres par boutique. Interactif : la fenêtre
 * d'attribution se règle (7/30/90 j) — le CA influencé et les parts par
 * boutique se recalculent, le CA direct ne bouge pas. C'est la logique
 * produit, démontrée dans le héros.
 */
const DASH_WINDOWS = [
  {
    label: "7 j",
    influenced: { value: "0,92 M€", note: "+9 % vs novembre" },
    shareWindow: "Fenêtre 7 jours",
    shares: [26, 21, 15, 11],
  },
  {
    label: "30 j",
    influenced: { value: "1,64 M€", note: "+18 % vs novembre" },
    shareWindow: "Fenêtre 30 jours",
    shares: [34, 29, 22, 18],
  },
  {
    label: "90 j",
    influenced: { value: "2,37 M€", note: "+24 % vs novembre" },
    shareWindow: "Fenêtre 90 jours",
    shares: [41, 36, 28, 24],
  },
] as const;

export function DashboardMock() {
  const [winIdx, setWinIdx] = useState(1);
  const win = DASH_WINDOWS[winIdx];

  const kpis = [
    { label: "CA direct", value: "4,21 M€", note: "+6 % vs novembre" },
    { label: "CA influencé", value: win.influenced.value, note: win.influenced.note, green: true },
    { label: "Actions de clienteling", value: "8 412", note: "312 vendeurs actifs" },
  ];
  const boutiques = ["Vendôme", "Saint-Honoré", "Monaco", "Genève"];
  const nav = ["Tableau de bord", "Clients", "Messages", "Rendez-vous", "Attribution", "Réglages"];

  return (
    <div className="mock-chrome dark on-dark relative overflow-hidden text-left shadow-[0_50px_140px_rgba(16,15,13,0.6)]">
      {/* Barre navigateur */}
      <div className="flex items-center gap-3 border-b border-sand/12 px-5 py-3">
        <span className="flex gap-1.5">
          {[0, 1, 2].map((i) => (
            <span key={i} className="h-2.5 w-2.5 rounded-full border border-sand/30" />
          ))}
        </span>
        <span className="mx-auto rounded-full border border-sand/15 bg-void/50 px-4 py-1 font-mono text-[0.62rem] tracking-[0.14em] text-sand-muted">
          app.selekt.io · cockpit réseau
        </span>
        <span aria-hidden className="w-12" />
      </div>

      <div className="grid md:grid-cols-[212px_1fr]">
        {/* Rail latéral */}
        <aside className="hidden border-r border-sand/10 p-5 md:block">
          <p className="font-serif text-[1.05rem] leading-none">
            Sel<em className="italic text-sand">e</em>kt
          </p>
          <ul className="mt-6 space-y-1 text-[0.8rem]">
            {nav.map((item, i) => (
              <li
                key={item}
                className={`rounded-md px-3 py-2 ${
                  i === 0 ? "bg-sand/10 text-cream-2" : "text-on-void/55"
                }`}
              >
                {item}
              </li>
            ))}
          </ul>
        </aside>

        {/* Contenu du cockpit */}
        <div className="p-5 md:p-7">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <p className="kicker text-[0.6rem] text-sand-muted">Cockpit réseau — décembre</p>
              <p className="mt-1.5 font-serif text-[1.35rem] leading-none">
                Maison Vervel · 12 boutiques
              </p>
            </div>
            <div
              className="flex items-center gap-1.5"
              role="group"
              aria-label="Fenêtre d'attribution"
            >
              <span className="kicker mr-1 text-[0.55rem] text-sand-muted">Fenêtre :</span>
              {DASH_WINDOWS.map((w, i) => (
                <button
                  key={w.label}
                  type="button"
                  onClick={() => setWinIdx(i)}
                  aria-pressed={i === winIdx}
                  className={`kicker cursor-pointer whitespace-nowrap rounded-full border px-3 py-1.5 text-[0.55rem] transition-colors duration-300 ease-(--ease-lux) ${
                    i === winIdx
                      ? "border-gold/60 bg-gold/10 text-gold"
                      : "border-sand/20 text-sand-muted hover:border-sand/45 hover:text-sand"
                  }`}
                >
                  {w.label}
                </button>
              ))}
            </div>
          </div>

          <div className="mt-6 grid gap-4 sm:grid-cols-3">
            {kpis.map((kpi) => (
              <div key={kpi.label} className="rounded-lg border border-sand/12 bg-void/40 p-4">
                <p className="kicker text-[0.55rem] text-sand-muted">{kpi.label}</p>
                <motion.p
                  key={kpi.value}
                  initial={{ opacity: 0.25 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5, ease: EASE_LUX }}
                  className={`mt-2.5 font-serif text-[1.6rem] leading-none ${
                    kpi.green ? "text-green-on-void" : "text-sand"
                  }`}
                >
                  {kpi.value}
                </motion.p>
                <p className="mt-2 text-[0.72rem] text-on-void/50">{kpi.note}</p>
              </div>
            ))}
          </div>

          <div className="mt-4 rounded-lg border border-sand/12 bg-void/40 p-4 md:p-5">
            <div className="flex items-baseline justify-between gap-4">
              <p className="kicker text-[0.55rem] text-sand-muted">
                Part de CA influencé par boutique
              </p>
              <p className="text-[0.7rem] text-on-void/45">{win.shareWindow}</p>
            </div>
            <div className="mt-4 space-y-3.5">
              {boutiques.map((name, i) => (
                <div key={name} className="flex items-center gap-4">
                  <p className="w-24 shrink-0 text-[0.8rem] text-on-void/80">{name}</p>
                  <div className="h-1.5 flex-1 rounded-full bg-sand/10">
                    <motion.div
                      className="h-1.5 rounded-full bg-green-on-void/75"
                      animate={{ width: `${win.shares[i] * 2.4}%` }}
                      transition={{ duration: 0.8, ease: EASE_LUX }}
                    />
                  </div>
                  <p className="w-10 shrink-0 text-right font-serif text-[0.95rem] text-sand">
                    {win.shares[i]} %
                  </p>
                </div>
              ))}
            </div>
          </div>

          <p className="mt-4 text-[0.68rem] text-on-void/40">
            Décor de démonstration — données fictives.
          </p>
        </div>
      </div>
    </div>
  );
}
