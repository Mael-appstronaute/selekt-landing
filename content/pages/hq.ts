import type { FeaturePageContent } from "@/components/pages/FeaturePage";
import type { Locale } from "@/lib/routes";

export const HQ: Record<Locale, FeaturePageContent> = {
  fr: {
    meta: {
      title: "Espace Siège — la vue réseau, unifiée",
      description:
        "Analytics réseau, base clients unifiée, catalogue consolidé et console de configuration : l'espace siège de Selekt, sur desktop.",
    },
    hero: {
      kicker: "Espace Siège",
      title: "La vue réseau, *unifiée*.",
      lede: "Sur desktop : les analytics du réseau, la base clients unifiée, le catalogue consolidé, et la console qui rend tout paramétrable sans développeur.",
      demoLabel: "Demander une démo",
      bg: "rays",
      secondary: { label: "Explorer la configurabilité", key: "configurability" },
      mockup: {
        kind: "kpi",
        title: "Analytics réseau — démonstration",
        badge: "Trimestre",
        rows: [
          { label: "CA direct réseau", value: "71 %", share: 71 },
          { label: "CA influencé réseau", value: "29 %", share: 29, green: true },
          { label: "Fiches clients unifiées", value: "1/client", share: 100 },
        ],
        footnote: "Décor de démonstration, données fictives.",
      },
    },
    sections: [
      {
        type: "photo",
        photo: "bureau",
        alt: "Bureau de direction en bois sombre, lampe allumée",
        kicker: "L'institution",
        title: "La maison, vue *d'ensemble*.",
        body: "Du réseau entier à la fiche d'un client : le siège voit tout, règle tout, sans jamais retraiter un chiffre.",
      },
      {
        type: "rows",
        tone: "cream",
        kicker: "Le siège",
        title: "Une seule *source*. Tout le réseau.",
        lede: "Ce que la direction lit n'est pas un export retraité : c'est la même donnée que celle des boutiques, consolidée.",
        rows: [
          {
            title: "Analytics réseau",
            body: "CA direct et influencé par boutique, par région, par période. Les comparaisons se font dans l'application.",
          },
          {
            title: "Base clients unifiée",
            body: "Une fiche par client, sans doublon, pour tout le réseau. Les rapprochements se font automatiquement.",
          },
          {
            title: "Catalogue consolidé",
            body: "Produits, déclinaisons, catégories : un seul référentiel produit, distribué à toutes les boutiques.",
          },
          {
            title: "Console de configuration",
            body: "Rôles, champs, règles d'attribution, modèles de messages : le paramétrage vit au siège, sans développeur.",
          },
          {
            title: "Isolation entre marques",
            body: "Chaque maison du groupe opère dans son enceinte. Rien ne se partage qui ne doive l'être.",
          },
          {
            title: "Journal d'audit",
            body: "Qui a fait quoi, quand : chaque action sensible est journalisée et consultable.",
          },
        ],
      },
      {
        type: "cards",
        tone: "dark",
        cols: 2,
        kicker: "Les deux piliers",
        title: "Configurer. *Prouver*.",
        cards: [
          {
            key: "configurability",
            kicker: "Configurabilité",
            title: "Ne rien figer",
            body: "La console de configuration en détail : ce qui se règle, et pourquoi ça change tout au déploiement.",
            cta: "Explorer",
          },
          {
            key: "security",
            kicker: "Sécurité & conformité",
            title: "La donnée, traitée comme un actif",
            body: "Isolation, permissions au niveau de la donnée, RGPD opérationnel, journal d'audit complet.",
            cta: "Explorer",
          },
        ],
      },
    ],
  },

  en: {
    meta: {
      title: "Headquarters — the unified network view",
      description:
        "Network analytics, unified client base, consolidated catalog and configuration console: Selekt's headquarters workspace, on desktop.",
    },
    hero: {
      kicker: "Headquarters",
      title: "The network view, *unified*.",
      lede: "On desktop: network analytics, the unified client base, the consolidated catalog, and the console that makes everything configurable without a developer.",
      demoLabel: "Request a demo",
      bg: "rays",
      secondary: { label: "Explore configurability", key: "configurability" },
      mockup: {
        kind: "kpi",
        title: "Network analytics — demonstration",
        badge: "Quarter",
        rows: [
          { label: "Network direct revenue", value: "71%", share: 71 },
          { label: "Network influenced revenue", value: "29%", share: 29, green: true },
          { label: "Unified client profiles", value: "1/client", share: 100 },
        ],
        footnote: "Demonstration decor, fictitious data.",
      },
    },
    sections: [
      {
        type: "photo",
        photo: "bureau",
        alt: "Dark wooden executive desk with a lit lamp",
        kicker: "The institution",
        title: "The house, seen as a *whole*.",
        body: "From the entire network down to a single client profile: headquarters sees everything, tunes everything, without ever reprocessing a figure.",
      },
      {
        type: "rows",
        tone: "cream",
        kicker: "Headquarters",
        title: "One *source*. The whole network.",
        lede: "What leadership reads is not a reprocessed export: it is the same data as the boutiques', consolidated.",
        rows: [
          {
            title: "Network analytics",
            body: "Direct and influenced revenue by boutique, by region, by period. Comparisons happen inside the application.",
          },
          {
            title: "Unified client base",
            body: "One profile per client, no duplicates, across the network. Matching happens automatically.",
          },
          {
            title: "Consolidated catalog",
            body: "Products, variations, categories: one product referential, distributed to every boutique.",
          },
          {
            title: "Configuration console",
            body: "Roles, fields, attribution rules, message templates: configuration lives at headquarters, without a developer.",
          },
          {
            title: "Isolation between brands",
            body: "Each house in the group operates within its own enclosure. Nothing is shared that should not be.",
          },
          {
            title: "Audit log",
            body: "Who did what, when: every sensitive action is logged and consultable.",
          },
        ],
      },
      {
        type: "cards",
        tone: "dark",
        cols: 2,
        kicker: "The two pillars",
        title: "Configure. *Prove*.",
        cards: [
          {
            key: "configurability",
            kicker: "Configurability",
            title: "Nothing set in stone",
            body: "The configuration console in detail: what can be tuned, and why it changes everything at rollout.",
            cta: "Explore",
          },
          {
            key: "security",
            kicker: "Security & compliance",
            title: "Data treated as an asset",
            body: "Isolation, data-level permissions, operational GDPR, full audit log.",
            cta: "Explore",
          },
        ],
      },
    ],
  },
};
