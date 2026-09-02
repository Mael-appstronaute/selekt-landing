"use client";

import { motion } from "motion/react";
import { useState } from "react";

const EASE_LUX = [0.22, 1, 0.36, 1] as const;

/**
 * Grand cockpit de démonstration — la pièce maîtresse du héros de vente.
 * Décor en charte (aucune donnée réelle). Interactif de bout en bout :
 * le rail latéral navigue entre six écrans (tableau de bord, clients,
 * messages, rendez-vous, attribution, réglages — accessibles aussi en
 * mobile via une rangée d'onglets) et la fenêtre d'attribution 7/30/90 j
 * recalcule le CA influencé et les parts — le CA direct ne bouge pas.
 */
const DASH_WINDOWS = [
  {
    label: "7 j",
    influenced: { value: "0,92 M€", note: "+9 % vs novembre" },
    shareWindow: "Fenêtre 7 jours",
    shares: [26, 21, 15, 11],
    split: [82, 18],
  },
  {
    label: "30 j",
    influenced: { value: "1,64 M€", note: "+18 % vs novembre" },
    shareWindow: "Fenêtre 30 jours",
    shares: [34, 29, 22, 18],
    split: [72, 28],
  },
  {
    label: "90 j",
    influenced: { value: "2,37 M€", note: "+24 % vs novembre" },
    shareWindow: "Fenêtre 90 jours",
    shares: [41, 36, 28, 24],
    split: [64, 36],
  },
] as const;

const VIEWS = {
  clients: {
    rows: [
      { initials: "I·M", name: "Cliente VIP", meta: "Vendôme · vue il y a 6 j", value: "48 300 €" },
      { initials: "C·B", name: "Cliente fidèle", meta: "Saint-Honoré · vue il y a 12 j", value: "21 700 €" },
      { initials: "L·R", name: "Nouveau client", meta: "Monaco · vu il y a 2 j", value: "4 950 €" },
      { initials: "A·D", name: "Cliente VIP", meta: "Genève · vue il y a 20 j", value: "36 200 €" },
    ],
    foot: "2 431 fiches unifiées · aucun doublon",
  },
  messages: {
    rows: [
      { title: "Relance après essayage", meta: "I·M · brouillon IA", status: "À relire", pending: true },
      { title: "Wishlist : pièce disponible", meta: "C·B · validé à 9 h 12", status: "Envoyé", pending: false },
      { title: "Confirmation de rendez-vous", meta: "L·R · validé à 8 h 40", status: "Envoyé", pending: false },
    ],
    foot: "Chaque envoi est validé par un humain.",
  },
  appointments: {
    rows: [
      { time: "Jeu 15:00", title: "Essayage", meta: "I·M · Vendôme" },
      { time: "Ven 11:30", title: "Retrait en boutique", meta: "C·B · Saint-Honoré" },
      { time: "Sam 16:00", title: "Présentation privée", meta: "A·D · Genève" },
    ],
    foot: "Motifs et durées configurés par la maison.",
  },
  attribution: {
    directLabel: "CA direct",
    influencedLabel: "CA influencé",
    rule: "Canaux inclus : boutique, e-commerce · Une vente n'est jamais comptée deux fois.",
    foot: "La définition du CA influencé appartient à la maison.",
  },
  settings: {
    rows: [
      { label: "Rôles & permissions", value: "12 rôles actifs", useWindow: false },
      { label: "Champs de fiche", value: "38 champs · 6 personnalisés", useWindow: false },
      { label: "Modèles de messages", value: "24 modèles · 3 langues", useWindow: false },
      { label: "Règles d'attribution", value: "par boutique", useWindow: true },
    ],
    foot: "Tout se règle depuis la console — sans redéploiement.",
  },
} as const;

const NAV = ["Tableau de bord", "Clients", "Messages", "Rendez-vous", "Attribution", "Réglages"];
const BOUTIQUES = ["Vendôme", "Saint-Honoré", "Monaco", "Genève"];

export function DashboardMock() {
  const [winIdx, setWinIdx] = useState(1);
  const [viewIdx, setViewIdx] = useState(0);
  const win = DASH_WINDOWS[winIdx];
  /* La fenêtre n'a de sens que sur le tableau de bord et l'attribution. */
  const windowRelevant = viewIdx === 0 || viewIdx === 4;

  const kpis = [
    { label: "CA direct", value: "4,21 M€", note: "+6 % vs novembre", green: false },
    { label: "CA influencé", value: win.influenced.value, note: win.influenced.note, green: true },
    { label: "Actions de clienteling", value: "8 412", note: "312 vendeurs actifs", green: false },
  ];

  const navButton = (item: string, i: number, compact: boolean) => (
    <button
      key={item}
      type="button"
      onClick={() => setViewIdx(i)}
      aria-current={i === viewIdx ? "true" : undefined}
      className={
        compact
          ? `shrink-0 cursor-pointer whitespace-nowrap rounded-full border px-3.5 py-1.5 text-[0.74rem] transition-colors duration-300 ease-(--ease-lux) ${
              i === viewIdx
                ? "border-sand/40 bg-sand/10 text-cream-2"
                : "border-sand/15 text-on-void/55 hover:text-on-void/85"
            }`
          : `block w-full cursor-pointer rounded-md px-3 py-2 text-left transition-colors duration-300 ease-(--ease-lux) ${
              i === viewIdx
                ? "bg-sand/10 text-cream-2"
                : "text-on-void/55 hover:bg-sand/6 hover:text-on-void/85"
            }`
      }
    >
      {item}
    </button>
  );

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
        {/* Rail latéral — navigation réelle entre les écrans */}
        <aside className="hidden border-r border-sand/10 p-5 md:block">
          <p className="font-serif text-[1.05rem] leading-none">
            Sel<em className="italic text-sand">e</em>kt
          </p>
          <nav aria-label="Cockpit réseau" className="mt-6 space-y-1 text-[0.8rem]">
            {NAV.map((item, i) => navButton(item, i, false))}
          </nav>
        </aside>

        {/* Contenu du cockpit */}
        <div className="p-5 md:p-7">
          {/* Onglets mobile — le rail est masqué sous md */}
          <div className="-mx-1 mb-5 flex gap-1.5 overflow-x-auto px-1 pb-1 md:hidden">
            {NAV.map((item, i) => navButton(item, i, true))}
          </div>

          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <p className="kicker text-[0.6rem] text-sand-muted">Cockpit réseau — décembre</p>
              <p className="mt-1.5 font-serif text-[1.35rem] leading-none">
                Maison Vervel · 12 boutiques
              </p>
            </div>
            {windowRelevant && (
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
            )}
          </div>

          <motion.div
            key={viewIdx}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: EASE_LUX }}
            className="md:min-h-[330px]"
          >
            {viewIdx === 0 && (
              <>
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
                    {BOUTIQUES.map((name, i) => (
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
              </>
            )}

            {viewIdx === 1 && (
              <div className="mt-6 rounded-lg border border-sand/12 bg-void/40 p-2">
                <ul className="divide-y divide-sand/8">
                  {VIEWS.clients.rows.map((row) => (
                    <li key={row.initials} className="flex items-center gap-4 px-3 py-3">
                      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-sand/25 font-serif text-[0.78rem] italic text-sand">
                        {row.initials}
                      </span>
                      <div className="min-w-0 flex-1">
                        <p className="text-[0.84rem] text-on-void/85">{row.name}</p>
                        <p className="mt-0.5 truncate text-[0.72rem] text-on-void/45">{row.meta}</p>
                      </div>
                      <p className="shrink-0 font-serif text-[0.95rem] text-sand">{row.value}</p>
                    </li>
                  ))}
                </ul>
                <p className="border-t border-sand/12 px-3 py-3 text-[0.72rem] muted-dark">
                  {VIEWS.clients.foot}
                </p>
              </div>
            )}

            {viewIdx === 2 && (
              <div className="mt-6 rounded-lg border border-sand/12 bg-void/40 p-2">
                <ul className="divide-y divide-sand/8">
                  {VIEWS.messages.rows.map((row) => (
                    <li key={row.title} className="flex items-center gap-4 px-3 py-3.5">
                      <div className="min-w-0 flex-1">
                        <p className="text-[0.84rem] text-on-void/85">{row.title}</p>
                        <p className="mt-0.5 truncate text-[0.72rem] text-on-void/45">{row.meta}</p>
                      </div>
                      <span
                        className={`kicker shrink-0 rounded-full border px-2.5 py-1 text-[0.52rem] ${
                          row.pending ? "border-gold/50 text-gold" : "border-sand/30 text-sand-muted"
                        }`}
                      >
                        {row.status}
                      </span>
                    </li>
                  ))}
                </ul>
                <p className="border-t border-sand/12 px-3 py-3 text-[0.72rem] muted-dark">
                  {VIEWS.messages.foot}
                </p>
              </div>
            )}

            {viewIdx === 3 && (
              <div className="mt-6 rounded-lg border border-sand/12 bg-void/40 p-2">
                <ul className="divide-y divide-sand/8">
                  {VIEWS.appointments.rows.map((row) => (
                    <li key={row.title} className="flex items-center gap-4 px-3 py-3.5">
                      <span className="shrink-0 rounded-md border border-sand/20 px-2.5 py-1.5 font-mono text-[0.62rem] tracking-[0.08em] text-sand">
                        {row.time}
                      </span>
                      <div className="min-w-0 flex-1">
                        <p className="text-[0.84rem] text-on-void/85">{row.title}</p>
                        <p className="mt-0.5 truncate text-[0.72rem] text-on-void/45">{row.meta}</p>
                      </div>
                    </li>
                  ))}
                </ul>
                <p className="border-t border-sand/12 px-3 py-3 text-[0.72rem] muted-dark">
                  {VIEWS.appointments.foot}
                </p>
              </div>
            )}

            {viewIdx === 4 && (
              <div className="mt-6 rounded-lg border border-sand/12 bg-void/40 p-5">
                <div className="space-y-6">
                  <div>
                    <div className="flex items-baseline justify-between">
                      <p className="text-[0.85rem] text-on-void/85">
                        {VIEWS.attribution.directLabel}
                      </p>
                      <p className="font-serif text-[1.4rem] leading-none text-sand">
                        {win.split[0]}&nbsp;%
                      </p>
                    </div>
                    <div className="mt-2.5 rounded-full bg-sand/10">
                      <motion.div
                        className="h-2 rounded-full bg-sand/60"
                        animate={{ width: `${win.split[0]}%` }}
                        transition={{ duration: 0.8, ease: EASE_LUX }}
                      />
                    </div>
                  </div>
                  <div>
                    <div className="flex items-baseline justify-between">
                      <p className="text-[0.85rem] text-on-void/85">
                        {VIEWS.attribution.influencedLabel}
                      </p>
                      <p className="font-serif text-[1.4rem] leading-none text-green-on-void">
                        {win.split[1]}&nbsp;%
                      </p>
                    </div>
                    <div className="mt-2.5 rounded-full bg-sand/10">
                      <motion.div
                        className="h-2 rounded-full bg-green-on-void/80"
                        animate={{ width: `${win.split[1]}%` }}
                        transition={{ duration: 0.8, ease: EASE_LUX }}
                      />
                    </div>
                  </div>
                </div>
                <p className="mt-6 border-t border-sand/12 pt-4 text-[0.78rem] leading-relaxed text-on-void/60">
                  {VIEWS.attribution.rule}
                </p>
                <p className="mt-2 text-[0.72rem] muted-dark">{VIEWS.attribution.foot}</p>
              </div>
            )}

            {viewIdx === 5 && (
              <div className="mt-6 rounded-lg border border-sand/12 bg-void/40 p-2">
                <ul className="divide-y divide-sand/8">
                  {VIEWS.settings.rows.map((row) => (
                    <li
                      key={row.label}
                      className="flex items-center justify-between gap-4 px-3 py-3.5"
                    >
                      <p className="text-[0.84rem] text-on-void/85">{row.label}</p>
                      <p className="shrink-0 font-mono text-[0.66rem] tracking-[0.08em] text-sand">
                        {row.useWindow ? `${win.label} · ${row.value}` : row.value}
                      </p>
                    </li>
                  ))}
                </ul>
                <p className="border-t border-sand/12 px-3 py-3 text-[0.72rem] muted-dark">
                  {VIEWS.settings.foot}
                </p>
              </div>
            )}
          </motion.div>

          <p className="mt-4 text-[0.68rem] text-on-void/40">
            Décor de démonstration — données fictives.
          </p>
        </div>
      </div>
    </div>
  );
}
