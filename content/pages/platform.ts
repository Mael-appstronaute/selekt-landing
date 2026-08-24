import type { FeaturePageContent } from "@/components/pages/FeaturePage";
import type { Locale } from "@/lib/routes";

export const PLATFORM: Record<Locale, FeaturePageContent> = {
  fr: {
    meta: {
      title: "La plateforme — une application, trois métiers",
      description:
        "Vendeur, manager, siège : trois espaces sur un socle commun. Référentiel client unique, messagerie tracée, catalogue avec stock réseau, mêmes chiffres à chaque niveau.",
    },
    hero: {
      kicker: "La plateforme",
      title: "Une application. Trois métiers. Les mêmes *chiffres*.",
      lede: "Vendeur, manager, siège : trois espaces dessinés pour trois quotidiens, sur un socle commun. Chaque niveau lit les mêmes données, chacun à sa hauteur.",
      demoLabel: "Demander une démo",
      bg: "threads",
      secondary: { label: "Voir la boucle de valeur", key: "influencedRevenue" },
      mockup: {
        kind: "kpi",
        title: "Vue réseau — démonstration",
        badge: "Mois en cours",
        rows: [
          { label: "CA direct réseau", value: "71 %", share: 71 },
          { label: "CA influencé réseau", value: "29 %", share: 29, green: true },
          { label: "Boutiques actives", value: "12/12", share: 100 },
        ],
        footnote: "Décor de démonstration, données fictives.",
      },
    },
    sections: [
      {
        type: "photo",
        photo: "comptoir",
        alt: "Conseillère au comptoir d'une boutique, tablette en main",
        kicker: "Le socle commun",
        title: "Une seule *vérité*, partagée.",
        body: "Ce que le vendeur saisit, le manager le lit, le siège le consolide. Le même geste, la même donnée, la même définition du succès.",
      },
      {
        type: "cards",
        tone: "cream",
        cols: 3,
        kicker: "Trois espaces",
        title: "Chacun son poste, la même *vérité*.",
        cards: [
          {
            key: "advisor",
            kicker: "Espace Vendeur",
            title: "Le client sur le bout des doigts",
            body: "Fiche 360°, wishlist, messagerie tracée, agenda, stock réseau, priorités du jour. Sur mobile et tablette.",
            cta: "Découvrir",
          },
          {
            key: "manager",
            kicker: "Espace Manager",
            title: "Le cockpit de la boutique",
            body: "CA direct et influencé, KPIs par vendeur, objectifs, portefeuilles clients. Sur tablette.",
            cta: "Découvrir",
          },
          {
            key: "hq",
            kicker: "Espace Siège",
            title: "La vue réseau, unifiée",
            body: "Analytics réseau, base clients unifiée, catalogue consolidé, console de configuration. Sur desktop.",
            cta: "Découvrir",
          },
        ],
      },
      {
        type: "list",
        kicker: "Dans le détail",
        title: "Ce que tout le monde *partage*.",
        lede: "Un seul référentiel, pas de doublon, pas de retraitement.",
        items: [
          {
            title: "Référentiel client unique",
            body: "Une seule fiche par client, pour tout le réseau. Historique, préférences, échanges : tout au même endroit.",
          },
          {
            title: "Messagerie tracée",
            body: "Chaque échange nourrit la fiche client et alimente la boucle de valeur. Rien ne se perd dans un téléphone personnel.",
          },
          {
            title: "Agenda centralisé",
            body: "Rendez-vous clients et organisation boutique dans le même calendrier, visibles selon les permissions.",
          },
          {
            title: "Catalogue & stock réseau",
            body: "Le produit, ses déclinaisons, et où il se trouve : « pas ici, mais la boutique Vendôme l'a ».",
          },
          {
            title: "Lookbooks",
            body: "Des sélections composées en boutique, partageables au client dans le ton de la maison.",
          },
          {
            title: "Permissions dans la donnée",
            body: "Qui voit quoi se décide champ par champ, depuis la console. Aucun rôle codé en dur.",
          },
        ],
      },
      {
        type: "loop",
        kicker: "La boucle de valeur",
        title: "Le fil conducteur de la *plateforme*.",
        steps: [
          {
            title: "Contact tracé",
            body: "Un message, un rendez-vous, une relance : chaque action de clienteling est enregistrée.",
          },
          {
            title: "Vente attribuée",
            body: "Une vente ultérieure est rattachée à l'action, selon vos règles d'attribution.",
          },
          {
            title: "CA influencé",
            body: "Distinct du CA direct. Les deux chiffres ne sont jamais additionnés.",
          },
          {
            title: "Réconcilié au siège",
            body: "Du vendeur à la boutique au réseau : les mêmes chiffres, à chaque niveau.",
          },
        ],
      },
    ],
  },

  en: {
    meta: {
      title: "The platform — one application, three roles",
      description:
        "Advisor, manager, headquarters: three workspaces on one shared foundation. Unified client base, traced messaging, catalog with network stock, the same figures at every level.",
    },
    hero: {
      kicker: "The platform",
      title: "One application. Three roles. The same *figures*.",
      lede: "Advisor, manager, headquarters: three workspaces designed for three daily realities, on a shared foundation. Every level reads the same data, each at its own altitude.",
      demoLabel: "Request a demo",
      bg: "threads",
      secondary: { label: "See the value loop", key: "influencedRevenue" },
      mockup: {
        kind: "kpi",
        title: "Network view — demonstration",
        badge: "Current month",
        rows: [
          { label: "Network direct revenue", value: "71%", share: 71 },
          { label: "Network influenced revenue", value: "29%", share: 29, green: true },
          { label: "Active boutiques", value: "12/12", share: 100 },
        ],
        footnote: "Demonstration decor, fictitious data.",
      },
    },
    sections: [
      {
        type: "photo",
        photo: "comptoir",
        alt: "Advisor at a boutique counter, tablet in hand",
        kicker: "The shared foundation",
        title: "One *truth*, shared.",
        body: "What the advisor enters, the manager reads, headquarters consolidates. The same gesture, the same data, the same definition of success.",
      },
      {
        type: "cards",
        tone: "cream",
        cols: 3,
        kicker: "Three workspaces",
        title: "Each role its post, the same *truth*.",
        cards: [
          {
            key: "advisor",
            kicker: "Advisor workspace",
            title: "Every client, at your fingertips",
            body: "360° profile, wishlist, traced messaging, agenda, network stock, daily priorities. On mobile and tablet.",
            cta: "Discover",
          },
          {
            key: "manager",
            kicker: "Manager workspace",
            title: "The boutique cockpit",
            body: "Direct and influenced revenue, per-advisor KPIs, targets, client portfolios. On tablet.",
            cta: "Discover",
          },
          {
            key: "hq",
            kicker: "Headquarters",
            title: "The unified network view",
            body: "Network analytics, unified client base, consolidated catalog, configuration console. On desktop.",
            cta: "Discover",
          },
        ],
      },
      {
        type: "list",
        kicker: "In detail",
        title: "What everyone *shares*.",
        lede: "One referential, no duplicates, no reprocessing.",
        items: [
          {
            title: "Unified client base",
            body: "One profile per client, for the whole network. History, preferences, conversations: everything in one place.",
          },
          {
            title: "Traced messaging",
            body: "Every exchange feeds the client profile and the value loop. Nothing gets lost in a personal phone.",
          },
          {
            title: "Centralized agenda",
            body: "Client appointments and boutique organization in the same calendar, visible according to permissions.",
          },
          {
            title: "Catalog & network stock",
            body: "The product, its variations, and where it is: “not here, but the Vendôme boutique has it”.",
          },
          {
            title: "Lookbooks",
            body: "Selections composed in the boutique, shareable with the client in the house's tone.",
          },
          {
            title: "Data-level permissions",
            body: "Who sees what is decided field by field, from the console. No hard-coded roles.",
          },
        ],
      },
      {
        type: "loop",
        kicker: "The value loop",
        title: "The thread running through the *platform*.",
        steps: [
          {
            title: "Traced contact",
            body: "A message, an appointment, a follow-up: every clienteling action is recorded.",
          },
          {
            title: "Attributed sale",
            body: "A later sale is linked to the action, according to your attribution rules.",
          },
          {
            title: "Influenced revenue",
            body: "Distinct from direct revenue. The two figures are never added together.",
          },
          {
            title: "Reconciled at headquarters",
            body: "From advisor to boutique to network: the same figures, at every level.",
          },
        ],
      },
    ],
  },
};
