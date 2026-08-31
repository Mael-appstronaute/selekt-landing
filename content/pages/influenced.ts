import type { FeaturePageContent } from "@/components/pages/FeaturePage";
import type { Locale } from "@/lib/routes";

export const INFLUENCED: Record<Locale, FeaturePageContent> = {
  fr: {
    meta: {
      title: "CA influencé — la preuve du retour sur investissement",
      description:
        "Selekt attribue les ventes aux actions de clienteling selon des règles paramétrables, et distingue toujours le CA direct du CA influencé. Jamais additionnés, toujours réconciliables.",
    },
    hero: {
      kicker: "CA influencé",
      title: "Le CA influencé, *visible et mesurable*.",
      lede: "Selekt attribue les ventes aux actions de clienteling selon vos règles, et distingue toujours le CA direct du CA influencé. Jamais additionnés, toujours réconciliables, du vendeur au siège.",
      demoLabel: "Demander une démo",
      bg: "waves",
      secondary: { label: "Explorer la configurabilité", key: "configurability" },
      mockup: {
        kind: "attribution",
        labels: {
          title: "CA du mois — Boutique Vendôme",
          window: "Fenêtre : 30 j",
          direct: "CA direct",
          influenced: "CA influencé",
          note: "Deux chiffres distincts, jamais additionnés. Réconciliables du vendeur au siège, ligne à ligne.",
        },
      },
    },
    sections: [
      {
        type: "split",
        photo: "mouvement",
        alt: "Mouvement mécanique d'une montre, fond ambré",
        kicker: "La mécanique",
        title: "Une *mécanique* de précision.",
        body: "L'attribution fonctionne comme un mouvement : chaque pièce a sa place, chaque vente son origine. Rien ne se devine, tout se règle.",
        mockup: {
          kind: "attribution",
          labels: {
            title: "CA du mois — Boutique Vendôme",
            window: "Fenêtre : 30 j",
            direct: "CA direct",
            influenced: "CA influencé",
            note: "Deux chiffres distincts, jamais additionnés. Réconciliables du vendeur au siège, ligne à ligne.",
          },
        },
      },
      {
        type: "loop",
        kicker: "Le calcul du CA influencé",
        title: "Quatre étapes. Un *résultat*.",
        steps: [
          {
            title: "Contact tracé",
            body: "Un message envoyé depuis l'application, un rendez-vous tenu, une relance : l'action existe, datée et attribuée à son auteur.",
          },
          {
            title: "Vente attribuée",
            body: "Quand le client achète dans la fenêtre définie, la vente est rattachée à l'action selon vos règles.",
          },
          {
            title: "CA influencé",
            body: "Le montant rejoint le CA influencé du vendeur. Le CA direct, lui, reste ce qu'il est. Les deux ne se mélangent jamais.",
          },
          {
            title: "Réconcilié au siège",
            body: "Boutique par boutique, ligne par ligne, la direction lit les mêmes montants que le terrain.",
          },
        ],
      },
      {
        type: "tabs",
        tone: "cream",
        kicker: "L'attribution",
        title: "Des règles *à votre main*.",
        lede: "L'attribution n'est pas une boîte noire : c'est une définition que vous écrivez, appliquée uniformément, lisible par tous.",
        tabs: [
          {
            label: "Fenêtre",
            title: "Le temps que vous jugez juste",
            body: "Sept jours, trente, quatre-vingt-dix : la fenêtre entre l'action et la vente se règle par maison. La décision vous appartient, l'application l'applique.",
            points: [
              "Réglable en jours, depuis la console",
              "Une seule fenêtre active par maison, sans ambiguïté",
              "Le changement de règle est journalisé",
            ],
          },
          {
            label: "Canaux",
            title: "Ce qui compte comme action",
            body: "Message, rendez-vous, lookbook partagé : vous décidez quels gestes de clienteling entrent dans l'attribution.",
            points: [
              "Canaux inclus ou exclus explicitement",
              "Les actions hors application n'inventent pas de CA",
              "Une seule définition, valable pour tout le monde",
            ],
          },
          {
            label: "Rattachement",
            title: "Une vente, une explication",
            body: "Quand plusieurs actions précèdent une vente, la règle de rattachement tranche, toujours de la même façon. Pas de double compte.",
            points: [
              "Une vente n'est jamais comptée deux fois",
              "Le rattachement est consultable sur chaque vente",
              "Les cas limites suivent une règle écrite, pas une exception",
            ],
          },
        ],
      },
    ],
  },

  en: {
    meta: {
      title: "Influenced revenue — proof of return on investment",
      description:
        "Selekt attributes sales to clienteling actions according to configurable rules, and always distinguishes direct from influenced revenue. Never added, always reconcilable.",
    },
    hero: {
      kicker: "Influenced revenue",
      title: "Influenced revenue, *visible and measurable*.",
      lede: "Selekt attributes sales to clienteling actions according to your rules, and always distinguishes direct from influenced revenue. Never added together, always reconcilable, from advisor to headquarters.",
      demoLabel: "Request a demo",
      bg: "waves",
      secondary: { label: "Explore configurability", key: "configurability" },
      mockup: {
        kind: "attribution",
        labels: {
          title: "Monthly revenue — Vendôme boutique",
          window: "Window: 30 d",
          direct: "Direct revenue",
          influenced: "Influenced revenue",
          note: "Two distinct figures, never added together. Reconcilable from advisor to headquarters, line by line.",
        },
      },
    },
    sections: [
      {
        type: "split",
        photo: "mouvement",
        alt: "Mechanical watch movement on an amber background",
        kicker: "The mechanism",
        title: "A precision *mechanism*.",
        body: "Attribution works like a movement: every part has its place, every sale its origin. Nothing is guessed, everything is tuned.",
        mockup: {
          kind: "attribution",
          labels: {
            title: "Monthly revenue — Vendôme boutique",
            window: "Window: 30 d",
            direct: "Direct revenue",
            influenced: "Influenced revenue",
            note: "Two distinct figures, never added together. Reconcilable from advisor to headquarters, line by line.",
          },
        },
      },
      {
        type: "loop",
        kicker: "The influenced revenue calculation",
        title: "Four steps. One *result*.",
        steps: [
          {
            title: "Traced contact",
            body: "A message sent from the application, an appointment held, a follow-up: the action exists, dated and attributed to its author.",
          },
          {
            title: "Attributed sale",
            body: "When the client purchases within the defined window, the sale is linked to the action according to your rules.",
          },
          {
            title: "Influenced revenue",
            body: "The amount joins the advisor's influenced revenue. Direct revenue stays what it is. The two never mix.",
          },
          {
            title: "Reconciled at headquarters",
            body: "Boutique by boutique, line by line, leadership reads the same amounts as the field.",
          },
        ],
      },
      {
        type: "tabs",
        tone: "cream",
        kicker: "Attribution",
        title: "Rules *in your hands*.",
        lede: "Attribution is not a black box: it is a definition you write, applied uniformly, readable by everyone.",
        tabs: [
          {
            label: "Window",
            title: "The timespan you judge fair",
            body: "Seven days, thirty, ninety: the window between action and sale is set per house. The decision is yours, the application enforces it.",
            points: [
              "Adjustable in days, from the console",
              "One active window per house, no ambiguity",
              "Rule changes are logged",
            ],
          },
          {
            label: "Channels",
            title: "What counts as an action",
            body: "Message, appointment, shared lookbook: you decide which clienteling gestures enter attribution.",
            points: [
              "Channels explicitly included or excluded",
              "Actions outside the application do not invent revenue",
              "One definition, valid for everyone",
            ],
          },
          {
            label: "Linking",
            title: "One sale, one explanation",
            body: "When several actions precede a sale, the linking rule decides, always the same way. No double counting.",
            points: [
              "A sale is never counted twice",
              "The linking is consultable on every sale",
              "Edge cases follow a written rule, not an exception",
            ],
          },
        ],
      },
    ],
  },
};
