import type { FeaturePageContent } from "@/components/pages/FeaturePage";
import type { Locale } from "@/lib/routes";

export const ADVISOR: Record<Locale, FeaturePageContent> = {
  fr: {
    meta: {
      title: "Espace Vendeur — le client sur le bout des doigts",
      description:
        "Fiche client 360°, wishlist, messagerie tracée, agenda, catalogue avec stock réseau, lookbooks et priorités du jour. L'espace vendeur de Selekt, mobile d'abord.",
    },
    hero: {
      kicker: "Espace Vendeur",
      title: "Le client sur le bout des *doigts*.",
      lede: "Sur mobile ou tablette, entre deux visites : la fiche complète, la wishlist, le bon message au bon moment. L'application travaille à la vitesse de la boutique.",
      demoLabel: "Demander une démo",
      bg: "particles",
      secondary: { label: "Voir la plateforme", key: "platform" },
      mockup: {
        kind: "priorities",
        title: "Priorités du jour — démonstration",
        items: [
          { initials: "A·M", text: "Recontacter après l'essayage du trench", tag: "Relance" },
          { initials: "C·B", text: "Wishlist : la pièce est arrivée en boutique", tag: "Stock" },
          { initials: "L·R", text: "Rendez-vous jeudi 15 h, préparer la sélection", tag: "RDV", wine: true },
          { initials: "S·T", text: "Anniversaire dans cinq jours", tag: "Attention" },
        ],
      },
    },
    sections: [
      {
        type: "photo",
        photo: "conseil",
        alt: "Tailleur ajustant la veste d'un client en boutique",
        kicker: "Le geste juste",
        title: "Le bon geste, au *bon* moment.",
        body: "La relation ne se joue pas dans un back-office : elle se joue en boutique, face au client. L'application suit ce rythme.",
        chips: ["Fiche ouverte", "Taille notée", "Relance prévue"],
      },
      {
        type: "rows",
        tone: "cream",
        kicker: "Le quotidien",
        title: "Tout ce qu'il faut. *Rien* de plus.",
        lede: "Six gestes, appris en une matinée. Chaque écran répond à une situation de vente réelle.",
        rows: [
          {
            title: "Fiche client 360°",
            body: "Historique, préférences, tailles, notes personnelles : tout ce qui permet de recevoir un client comme s'il n'était jamais parti.",
          },
          {
            title: "Wishlist",
            body: "Les envies notées en boutique, suivies dans le temps. Quand la pièce arrive, le vendeur le sait.",
          },
          {
            title: "Messagerie tracée",
            body: "Les messages partent de l'application, dans le ton de la maison. Chaque échange nourrit la fiche et la boucle de valeur.",
          },
          {
            title: "Agenda",
            body: "Rendez-vous clients et organisation boutique dans le même calendrier. Les motifs de rendez-vous sont ceux de votre maison.",
          },
          {
            title: "Catalogue & stock réseau",
            body: "« Pas ici, mais la boutique Vendôme l'a. » Le stock du réseau, consultable en face du client.",
          },
          {
            title: "Lookbooks",
            body: "Des sélections composées et partagées en quelques gestes, fidèles à l'image de la maison.",
          },
        ],
      },
      {
        type: "cards",
        tone: "dark",
        cols: 2,
        kicker: "Avec l'IA copilote",
        title: "Un copilote. Pas un *automate*.",
        cards: [
          {
            kicker: "Au quotidien",
            title: "Des brouillons, jamais des envois",
            body: "L'IA propose un message dans le ton de la maison, résume une fiche avant un rendez-vous, prépare un compte rendu. Le vendeur relit, ajuste, décide.",
          },
          {
            key: "aiCopilot",
            kicker: "IA copilote",
            title: "Les garde-fous, en détail",
            body: "Mots interdits, validation humaine avant envoi, coût maîtrisé : comment l'IA reste au service de la relation.",
            cta: "Explorer",
          },
        ],
      },
    ],
  },

  en: {
    meta: {
      title: "Advisor workspace — every client at your fingertips",
      description:
        "360° client profile, wishlist, traced messaging, agenda, catalog with network stock, lookbooks and daily priorities. Selekt's advisor workspace, mobile-first.",
    },
    hero: {
      kicker: "Advisor workspace",
      title: "Every client, at your *fingertips*.",
      lede: "On mobile or tablet, between two visits: the full profile, the wishlist, the right message at the right time. The application works at the boutique's pace.",
      demoLabel: "Request a demo",
      bg: "particles",
      secondary: { label: "See the platform", key: "platform" },
      mockup: {
        kind: "priorities",
        title: "Daily priorities — demonstration",
        items: [
          { initials: "A·M", text: "Follow up after the trench fitting", tag: "Follow-up" },
          { initials: "C·B", text: "Wishlist: the piece has arrived in boutique", tag: "Stock" },
          { initials: "L·R", text: "Appointment Thursday 3 pm, prepare the selection", tag: "Appt", wine: true },
          { initials: "S·T", text: "Birthday in five days", tag: "Attention" },
        ],
      },
    },
    sections: [
      {
        type: "photo",
        photo: "conseil",
        alt: "Tailor adjusting a client's jacket in a boutique",
        kicker: "The right gesture",
        title: "The right gesture, at the *right* moment.",
        body: "The relationship does not happen in a back office: it happens in the boutique, facing the client. The application keeps that pace.",
        chips: ["Profile open", "Size noted", "Follow-up planned"],
      },
      {
        type: "rows",
        tone: "cream",
        kicker: "The daily work",
        title: "Everything needed. *Nothing* more.",
        lede: "Six gestures, learned in a morning. Every screen answers a real selling situation.",
        rows: [
          {
            title: "360° client profile",
            body: "History, preferences, sizes, personal notes: everything it takes to welcome a client as if they had never left.",
          },
          {
            title: "Wishlist",
            body: "Wishes noted in the boutique, followed over time. When the piece arrives, the advisor knows.",
          },
          {
            title: "Traced messaging",
            body: "Messages leave from the application, in the house's tone. Every exchange feeds the profile and the value loop.",
          },
          {
            title: "Agenda",
            body: "Client appointments and boutique organization in the same calendar. Appointment types are your house's own.",
          },
          {
            title: "Catalog & network stock",
            body: "“Not here, but the Vendôme boutique has it.” The network's stock, consultable in front of the client.",
          },
          {
            title: "Lookbooks",
            body: "Selections composed and shared in a few gestures, faithful to the house's image.",
          },
        ],
      },
      {
        type: "cards",
        tone: "dark",
        cols: 2,
        kicker: "With the AI copilot",
        title: "A copilot. Not an *autopilot*.",
        cards: [
          {
            kicker: "Day to day",
            title: "Drafts, never sends",
            body: "The AI drafts a message in the house's tone, summarizes a profile before an appointment, prepares a report. The advisor reviews, adjusts, decides.",
          },
          {
            key: "aiCopilot",
            kicker: "AI copilot",
            title: "The guardrails, in detail",
            body: "Blocked words, human approval before sending, controlled cost: how the AI stays in service of the relationship.",
            cta: "Explore",
          },
        ],
      },
    ],
  },
};
