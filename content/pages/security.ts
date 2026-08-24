import type { FeaturePageContent } from "@/components/pages/FeaturePage";
import type { Locale } from "@/lib/routes";

export const SECURITY: Record<Locale, FeaturePageContent> = {
  fr: {
    meta: {
      title: "Sécurité & conformité — la donnée traitée comme un actif",
      description:
        "Isolation stricte entre marques, permissions au niveau de la donnée, RGPD opérationnel, journal d'audit complet. Le sérieux qui rend le clienteling possible.",
    },
    hero: {
      kicker: "Sécurité & conformité",
      title: "La donnée, traitée comme un *actif*.",
      lede: "Isolation stricte entre marques, permissions au niveau de la donnée, RGPD opérationnel, journal d'audit complet. Le sérieux qui rend tout le reste possible.",
      demoLabel: "Demander une démo",
      bg: "dotgrid",
      secondary: { label: "Voir l'espace siège", key: "hq" },
    },
    sections: [
      {
        type: "photo",
        photo: "serrure",
        alt: "Serrure ancienne ouvragée sur une porte en bois",
        kicker: "Le précieux",
        title: "Ce qui est précieux se *protège*.",
        body: "Vos données clients valent ce que vaut votre maison. Elles sont traitées avec le même soin que vos pièces.",
      },
      {
        type: "cards",
        tone: "cream",
        cols: 2,
        variant: "bento",
        kicker: "Les fondations",
        title: "Quatre engagements *structurels*.",
        lede: "Ces garanties ne sont pas des options ni des surcouches : elles sont dans l'architecture de la plateforme.",
        cards: [
          {
            kicker: "Multi-marques",
            title: "Isolation stricte",
            body: "Chaque maison opère dans son enceinte. Données, réglages, modèles de messages : rien ne se partage entre marques qui ne doive l'être.",
          },
          {
            kicker: "Permissions",
            title: "Le droit d'accès vit dans la donnée",
            body: "Qui voit quoi se décide au niveau du champ, pas de l'écran. Un rôle sans droit sur une donnée ne la reçoit jamais.",
          },
          {
            kicker: "RGPD",
            title: "Opérationnel, pas déclaratif",
            body: "Export des données d'un client, effacement, anonymisation qui préserve les statistiques : les obligations se traitent dans l'application.",
          },
          {
            kicker: "Audit",
            title: "Journal complet",
            body: "Qui a fait quoi, quand, sur quelle donnée : chaque action sensible est journalisée et consultable.",
          },
        ],
      },
      {
        type: "rows",
        tone: "dark",
        kicker: "Au quotidien",
        title: "La conformité, sans *cérémonie*.",
        rows: [
          {
            title: "Export à la demande",
            body: "Les données d'un client s'exportent en un geste, dans un format lisible. Sans ticket, sans délai technique.",
          },
          {
            title: "Anonymisation utile",
            body: "Quand un client demande l'effacement, ses données personnelles disparaissent ; vos statistiques, elles, restent justes.",
          },
          {
            title: "Habilitations vivantes",
            body: "Une arrivée, un départ, un changement de poste : les droits s'ajustent depuis la console, immédiatement.",
          },
        ],
      },
    ],
  },

  en: {
    meta: {
      title: "Security & compliance — data treated as an asset",
      description:
        "Strict isolation between brands, data-level permissions, operational GDPR, full audit log. The seriousness that makes clienteling possible.",
    },
    hero: {
      kicker: "Security & compliance",
      title: "Data, treated as an *asset*.",
      lede: "Strict isolation between brands, data-level permissions, operational GDPR, a full audit log. The seriousness that makes everything else possible.",
      demoLabel: "Request a demo",
      bg: "dotgrid",
      secondary: { label: "See the headquarters workspace", key: "hq" },
    },
    sections: [
      {
        type: "photo",
        photo: "serrure",
        alt: "Ornate antique lock on a wooden door",
        kicker: "The precious",
        title: "What is precious gets *protected*.",
        body: "Your client data is worth what your house is worth. It is handled with the same care as your pieces.",
      },
      {
        type: "cards",
        tone: "cream",
        cols: 2,
        variant: "bento",
        kicker: "The foundations",
        title: "Four *structural* commitments.",
        lede: "These guarantees are neither options nor overlays: they live in the platform's architecture.",
        cards: [
          {
            kicker: "Multi-brand",
            title: "Strict isolation",
            body: "Each house operates within its own enclosure. Data, settings, message templates: nothing is shared between brands that should not be.",
          },
          {
            kicker: "Permissions",
            title: "Access rights live in the data",
            body: "Who sees what is decided at the field level, not the screen level. A role without rights to a piece of data never receives it.",
          },
          {
            kicker: "GDPR",
            title: "Operational, not declarative",
            body: "Client data export, erasure, anonymization that preserves statistics: obligations are handled inside the application.",
          },
          {
            kicker: "Audit",
            title: "Full log",
            body: "Who did what, when, on which data: every sensitive action is logged and consultable.",
          },
        ],
      },
      {
        type: "rows",
        tone: "dark",
        kicker: "Day to day",
        title: "Compliance, without *ceremony*.",
        rows: [
          {
            title: "Export on demand",
            body: "A client's data exports in one gesture, in a readable format. No ticket, no technical delay.",
          },
          {
            title: "Useful anonymization",
            body: "When a client requests erasure, their personal data disappears; your statistics remain accurate.",
          },
          {
            title: "Living entitlements",
            body: "An arrival, a departure, a role change: rights adjust from the console, immediately.",
          },
        ],
      },
    ],
  },
};
