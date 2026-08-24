import type { FeaturePageContent } from "@/components/pages/FeaturePage";
import type { Locale } from "@/lib/routes";

export const MANAGER: Record<Locale, FeaturePageContent> = {
  fr: {
    meta: {
      title: "Espace Manager — le cockpit de la boutique",
      description:
        "CA direct et CA influencé, KPIs par vendeur, objectifs, portefeuilles clients : le cockpit de pilotage du manager de boutique, sur tablette.",
    },
    hero: {
      kicker: "Espace Manager",
      title: "Le cockpit de la *boutique*.",
      lede: "Sur tablette, au cœur du magasin : le CA direct et le CA influencé, les KPIs par vendeur, les objectifs, les portefeuilles. Piloter sans micro-manager.",
      demoLabel: "Demander une démo",
      bg: "beams",
      secondary: { label: "Voir la plateforme", key: "platform" },
      mockup: {
        kind: "kpi",
        title: "Cockpit boutique — démonstration",
        badge: "Mois en cours",
        rows: [
          { label: "CA direct", value: "72 %", share: 72 },
          { label: "CA influencé", value: "28 %", share: 28, green: true },
          { label: "Objectif d'équipe", value: "84 %", share: 84 },
        ],
        footnote: "Deux CA distincts, jamais additionnés. Données fictives.",
      },
    },
    sections: [
      {
        type: "split",
        photo: "tablette",
        alt: "Tablette posée sur le comptoir d'une boutique",
        kicker: "Le cockpit",
        title: "Les chiffres, à *portée* de main.",
        body: "Le cockpit tient sur une tablette : CA direct, CA influencé, objectifs. Lisible entre deux visites en boutique, sans exports ni tableurs.",
        mockup: {
          kind: "kpi",
          title: "Cockpit boutique — démonstration",
          badge: "Mois en cours",
          rows: [
            { label: "CA direct", value: "72 %", share: 72 },
            { label: "CA influencé", value: "28 %", share: 28, green: true },
            { label: "Objectif d'équipe", value: "84 %", share: 84 },
          ],
          footnote: "Deux CA distincts, jamais additionnés. Données fictives.",
        },
      },
      {
        type: "rows",
        tone: "cream",
        variant: "timeline",
        kicker: "Le pilotage",
        title: "Voir juste. Décider *vite*.",
        lede: "Le cockpit répond aux questions qu'un manager se pose chaque matin, sans exports ni tableurs.",
        rows: [
          {
            title: "CA direct vs CA influencé",
            body: "Les deux chiffres de la boutique, distincts, avec les actions qui expliquent le second.",
          },
          {
            title: "KPIs par vendeur",
            body: "Activité de clienteling, rendez-vous, ventes attribuées : la contribution de chacun, factuelle.",
          },
          {
            title: "Objectifs",
            body: "Des objectifs posés par vendeur ou par équipe, suivis en continu, sans cérémonie.",
          },
          {
            title: "Portefeuilles clients",
            body: "Attribuer, rééquilibrer, transmettre un portefeuille quand l'équipe évolue. Rien ne se perd.",
          },
          {
            title: "Agenda boutique",
            body: "Les rendez-vous clients et l'organisation du magasin, sur un seul calendrier d'équipe.",
          },
          {
            title: "Réconciliation ligne à ligne",
            body: "Chaque euro influencé renvoie à une action identifiée. Le manager lit la même somme que le vendeur.",
          },
        ],
      },
      {
        type: "cards",
        tone: "dark",
        cols: 2,
        kicker: "Aller plus loin",
        title: "Des chiffres qui se *défendent*.",
        cards: [
          {
            key: "influencedRevenue",
            kicker: "CA influencé",
            title: "Comprendre l'attribution",
            body: "Fenêtre, canaux, règles : comment une vente est rattachée à une action de clienteling, et comment tout se réconcilie.",
            cta: "Explorer",
          },
          {
            kicker: "Posture",
            title: "Piloter sans surveiller",
            body: "Le cockpit montre des contributions, pas des minutes d'activité. L'outil sert la progression de l'équipe, pas le contrôle.",
          },
        ],
      },
    ],
  },

  en: {
    meta: {
      title: "Manager workspace — the boutique cockpit",
      description:
        "Direct and influenced revenue, per-advisor KPIs, targets, client portfolios: the boutique manager's cockpit, on tablet.",
    },
    hero: {
      kicker: "Manager workspace",
      title: "The boutique *cockpit*.",
      lede: "On tablet, at the heart of the store: direct and influenced revenue, per-advisor KPIs, targets, portfolios. Steering without micromanaging.",
      demoLabel: "Request a demo",
      bg: "beams",
      secondary: { label: "See the platform", key: "platform" },
      mockup: {
        kind: "kpi",
        title: "Boutique cockpit — demonstration",
        badge: "Current month",
        rows: [
          { label: "Direct revenue", value: "72%", share: 72 },
          { label: "Influenced revenue", value: "28%", share: 28, green: true },
          { label: "Team target", value: "84%", share: 84 },
        ],
        footnote: "Two distinct figures, never added together. Fictitious data.",
      },
    },
    sections: [
      {
        type: "split",
        photo: "tablette",
        alt: "Tablet resting on a boutique counter",
        kicker: "The cockpit",
        title: "The figures, within *reach*.",
        body: "The cockpit fits on a tablet: direct revenue, influenced revenue, targets. Readable between two visits on the floor, without exports or spreadsheets.",
        mockup: {
          kind: "kpi",
          title: "Boutique cockpit — demonstration",
          badge: "Current month",
          rows: [
            { label: "Direct revenue", value: "72%", share: 72 },
            { label: "Influenced revenue", value: "28%", share: 28, green: true },
            { label: "Team target", value: "84%", share: 84 },
          ],
          footnote: "Two distinct figures, never added together. Fictitious data.",
        },
      },
      {
        type: "rows",
        tone: "cream",
        variant: "timeline",
        kicker: "Steering",
        title: "See clearly. Decide *fast*.",
        lede: "The cockpit answers the questions a manager asks every morning, without exports or spreadsheets.",
        rows: [
          {
            title: "Direct vs influenced revenue",
            body: "The boutique's two figures, distinct, with the actions that explain the second.",
          },
          {
            title: "Per-advisor KPIs",
            body: "Clienteling activity, appointments, attributed sales: each advisor's contribution, factually.",
          },
          {
            title: "Targets",
            body: "Targets set per advisor or per team, tracked continuously, without ceremony.",
          },
          {
            title: "Client portfolios",
            body: "Assign, rebalance, hand over a portfolio when the team changes. Nothing gets lost.",
          },
          {
            title: "Boutique agenda",
            body: "Client appointments and store organization, on a single team calendar.",
          },
          {
            title: "Line-by-line reconciliation",
            body: "Every influenced euro points back to an identified action. The manager reads the same sum as the advisor.",
          },
        ],
      },
      {
        type: "cards",
        tone: "dark",
        cols: 2,
        kicker: "Going further",
        title: "Figures that *hold up*.",
        cards: [
          {
            key: "influencedRevenue",
            kicker: "Influenced revenue",
            title: "Understanding attribution",
            body: "Window, channels, rules: how a sale is linked to a clienteling action, and how everything reconciles.",
            cta: "Explore",
          },
          {
            kicker: "Posture",
            title: "Steering without surveilling",
            body: "The cockpit shows contributions, not minutes of activity. The tool serves the team's progress, not control.",
          },
        ],
      },
    ],
  },
};
