import type { FeaturePageContent } from "@/components/pages/FeaturePage";
import type { Locale } from "@/lib/routes";

export const CONFIGURABILITY: Record<Locale, FeaturePageContent> = {
  fr: {
    meta: {
      title: "Configurabilité — ne rien figer",
      description:
        "Rôles, permissions, champs, règles d'attribution, modèles de messages, motifs de rendez-vous, catégories : tout se configure sans développeur. L'outil s'adapte à votre maison.",
    },
    hero: {
      kicker: "Configurabilité",
      title: "Ne rien *figer*.",
      lede: "Rôles, permissions, champs, règles d'attribution, modèles de messages, motifs de rendez-vous, catégories de produits : tout se configure depuis la console, sans développeur. Votre maison garde la main.",
      demoLabel: "Demander une démo",
      bg: "threads",
      secondary: { label: "Pourquoi Selekt", key: "whySelekt" },
    },
    sections: [
      {
        type: "tabs",
        tone: "cream",
        kicker: "La console",
        title: "Votre maison, vos *règles*.",
        lede: "Six familles de réglages, toutes accessibles au siège. Aucune ne demande un ticket, un développeur ou un redéploiement.",
        tabs: [
          {
            label: "Rôles & permissions",
            title: "Des rôles définis par vous",
            body: "Vendeur, manager, siège ne sont que des points de départ. Vous créez vos rôles et décidez de ce que chacun voit et fait, champ par champ.",
            points: [
              "Aucun rôle codé en dur dans l'application",
              "Permissions au niveau de la donnée, pas de l'écran",
              "Changements appliqués sans redéploiement",
            ],
          },
          {
            label: "Champs",
            title: "La fiche client à votre image",
            body: "Ajoutez, réordonnez, rendez obligatoires les champs qui comptent pour votre maison. La fiche 360° parle votre vocabulaire.",
            points: [
              "Champs propres à chaque marque du groupe",
              "Vocabulaire métier respecté à l'écran",
              "Historique conservé quand un champ évolue",
            ],
          },
          {
            label: "Attribution",
            title: "Les règles du CA influencé",
            body: "Fenêtre d'attribution, canaux pris en compte, méthode de rattachement : la définition du CA influencé vous appartient, et elle est écrite noir sur blanc.",
            points: [
              "Fenêtre réglable en jours, par maison",
              "Canaux inclus ou exclus explicitement",
              "Une définition stable, auditable, partagée",
            ],
          },
          {
            label: "Messages",
            title: "Des modèles dans le ton",
            body: "Les modèles de messages portent la voix de la maison, dans chaque langue. Les vendeurs personnalisent, la cohérence demeure.",
            points: [
              "Modèles par situation : relance, arrivage, remerciement",
              "Variables insérées proprement, sans erreur",
              "Disponibles dans les langues de l'interface",
            ],
          },
          {
            label: "Rendez-vous",
            title: "Vos motifs, vos durées",
            body: "Essayage, retrait, présentation privée : les motifs de rendez-vous, leurs durées et leurs ressources sont les vôtres.",
            points: [
              "Motifs et durées libres",
              "Rendez-vous clients et organisation boutique distincts",
              "Visibilité selon les permissions",
            ],
          },
          {
            label: "Catégories",
            title: "Le catalogue rangé à votre façon",
            body: "Catégories de produits, tags, saisons : la taxonomie du catalogue suit celle de votre maison, pas l'inverse.",
            points: [
              "Catégories et sous-catégories libres",
              "Tags transverses pour les sélections",
              "Un référentiel unique pour tout le réseau",
            ],
          },
        ],
      },
      {
        type: "split",
        photo: "atelierCouture",
        alt: "Atelier de couture, machine et tissus sombres",
        kicker: "Pourquoi ça compte",
        title: "Du *sur-mesure*, pas du prêt-à-porter.",
        body: "Une maison ne reprend pas ses processus pour entrer dans un logiciel. La console met l'outil à vos mesures, et l'y maintient.",
        points: [
          "Pas de projet de développement à chaque évolution",
          "Un déploiement qui suit votre organisation",
          "Des marques isolées, des réglages propres",
        ],
      },
    ],
  },

  en: {
    meta: {
      title: "Configurability — nothing set in stone",
      description:
        "Roles, permissions, fields, attribution rules, message templates, appointment types, categories: everything is configured without a developer. The tool adapts to your house.",
    },
    hero: {
      kicker: "Configurability",
      title: "Nothing set in *stone*.",
      lede: "Roles, permissions, fields, attribution rules, message templates, appointment types, product categories: everything is configured from the console, without a developer. Your house keeps the hand.",
      demoLabel: "Request a demo",
      bg: "threads",
      secondary: { label: "Why Selekt", key: "whySelekt" },
    },
    sections: [
      {
        type: "tabs",
        tone: "cream",
        kicker: "The console",
        title: "Your house, your *rules*.",
        lede: "Six families of settings, all managed at headquarters. None requires a ticket, a developer or a redeployment.",
        tabs: [
          {
            label: "Roles & permissions",
            title: "Roles defined by you",
            body: "Advisor, manager, headquarters are only starting points. You create your roles and decide what each one sees and does, field by field.",
            points: [
              "No hard-coded roles in the application",
              "Permissions at the data level, not the screen level",
              "Changes applied without redeployment",
            ],
          },
          {
            label: "Fields",
            title: "The client profile in your image",
            body: "Add, reorder, make mandatory the fields that matter to your house. The 360° profile speaks your vocabulary.",
            points: [
              "Fields specific to each brand in the group",
              "Business vocabulary respected on screen",
              "History preserved when a field evolves",
            ],
          },
          {
            label: "Attribution",
            title: "The rules of influenced revenue",
            body: "Attribution window, channels taken into account, linking method: the definition of influenced revenue belongs to you, and it is written down in black and white.",
            points: [
              "Window adjustable in days, per house",
              "Channels explicitly included or excluded",
              "A stable, auditable, shared definition",
            ],
          },
          {
            label: "Messages",
            title: "Templates in the right tone",
            body: "Message templates carry the house's voice, in every language. Advisors personalize, consistency remains.",
            points: [
              "Templates per situation: follow-up, arrival, thank-you",
              "Variables inserted cleanly, without errors",
              "Available in the interface languages",
            ],
          },
          {
            label: "Appointments",
            title: "Your types, your durations",
            body: "Fitting, pickup, private presentation: appointment types, their durations and their resources are yours.",
            points: [
              "Free types and durations",
              "Client appointments distinct from boutique organization",
              "Visibility according to permissions",
            ],
          },
          {
            label: "Categories",
            title: "The catalog arranged your way",
            body: "Product categories, tags, seasons: the catalog's taxonomy follows your house's, not the other way around.",
            points: [
              "Free categories and subcategories",
              "Cross-cutting tags for selections",
              "One referential for the whole network",
            ],
          },
        ],
      },
      {
        type: "split",
        photo: "atelierCouture",
        alt: "Sewing atelier, machine and dark fabrics",
        kicker: "Why it matters",
        title: "*Made to measure*, not ready-to-wear.",
        body: "A house does not rework its processes to fit into software. The console tailors the tool to your measurements, and keeps it there.",
        points: [
          "No development project for every evolution",
          "A rollout that follows your organization",
          "Isolated brands, clean settings",
        ],
      },
    ],
  },
};
