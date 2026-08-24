import type { Locale, PageKey } from "@/lib/routes";
import type { AttributionLabels } from "@/components/mockups/AttributionPanel";
import type { KpiRow } from "@/components/mockups/KpiPanel";
import type { PriorityItem } from "@/components/mockups/PrioritiesList";

/* Convention : *mot* = italique accentué (sable sur sombre, laiton sur clair). */

export type SpaceMock =
  | { kind: "priorities"; title: string; items: PriorityItem[] }
  | { kind: "kpi"; title: string; badge?: string; rows: KpiRow[]; footnote?: string };

export type HomeContent = {
  meta: { title: string; description: string };
  hero: {
    kicker: string;
    /** début du titre, avant le mot tournant */
    titleBase: string;
    /** mots qui défilent en italique sable (avec leur ponctuation) */
    rotating: string[];
    lede: string;
    primary: string;
    secondary: string;
    alt: string;
    chips: string[];
  };
  connectors: { label: string };
  intro: { title: string; body: string };
  trace: { kicker: string; title: string; body: string; alt: string; chips: string[] };
  attribute: {
    kicker: string;
    title: string;
    body: string;
    points: string[];
    mockup: AttributionLabels;
    alt: string;
  };
  prove: {
    kicker: string;
    title: string;
    body: string;
    alt: string;
    stats: { value: number; suffix?: string; label: string }[];
  };
  spaces: {
    kicker: string;
    title: string;
    cards: {
      key: PageKey;
      kicker: string;
      title: string;
      body: string;
      cta: string;
      mock: SpaceMock;
    }[];
  };
  statement: {
    kicker: string;
    title: string;
    body: string;
    items: { title: string; body: string }[];
    links: { label: string; key: PageKey }[];
  };
  proof: { kicker: string; body: string; note: string };
  cta: { kicker: string; title: string; body: string; button: string; micro: string; alt: string };
};

export const HOME: Record<Locale, HomeContent> = {
  fr: {
    meta: {
      title: "Selekt Retail OS — Le clienteling des maisons de luxe, enfin mesurable",
      description:
        "Plateforme SaaS de clienteling augmentée par l'IA pour les réseaux de boutiques de luxe. Vendeurs, managers et siège dans une seule application. Le CA influencé, mesurable et réconciliable.",
    },
    hero: {
      kicker: "Clienteling · Retail de luxe",
      titleBase: "Chaque interaction client devient une valeur",
      rotating: ["mesurable.", "activable.", "visualisable."],
      lede: "Selekt réunit vendeurs, managers et siège dans une seule application de clienteling, augmentée par une IA encadrée.",
      primary: "Demander une démo",
      secondary: "Voir la plateforme",
      alt: "Intérieur d'une boutique de luxe aux tons crème, escalier et comptoirs",
      chips: ["Contact tracé", "Vente attribuée", "CA influencé"],
    },
    connectors: { label: "Elle se connecte avec :" },
    intro: {
      title: "Le travail de relation existe. Sa *preuve*, enfin, aussi.",
      body: "Selekt trace les gestes de clienteling, attribue les ventes selon vos règles, et fait remonter un CA influencé réconciliable à chaque niveau, du comptoir au comité de direction.",
    },
    trace: {
      kicker: "01 · Tracer",
      title: "Chaque geste laisse une *trace* utile.",
      body: "Messages, rendez-vous, wishlists : les actions de clienteling partent de l'application, dans le ton de la maison, et nourrissent la fiche client.",
      alt: "Vitrine d'écrin éclairée aux tons chauds dans une bijouterie",
      chips: ["Message envoyé", "Rendez-vous tenu", "Wishlist mise à jour"],
    },
    attribute: {
      kicker: "02 · Attribuer",
      title: "La vente retrouve son *origine*.",
      body: "Quand le client achète, la vente est rattachée à l'action selon vos règles. Le CA influencé reste distinct du CA direct : jamais additionnés, toujours réconciliables.",
      points: [
        "Fenêtre d'attribution réglable en jours, par maison",
        "Canaux inclus ou exclus explicitement",
        "Une vente n'est jamais comptée deux fois",
      ],
      mockup: {
        title: "CA du mois — Boutique Vendôme",
        window: "Fenêtre : 30 j",
        direct: "CA direct",
        influenced: "CA influencé",
        note: "Deux chiffres distincts, jamais additionnés. Réconciliables du vendeur au siège, ligne à ligne.",
      },
      alt: "Maroquinerie en cuir naturel posée sur un établi d'atelier",
    },
    prove: {
      kicker: "03 · Prouver",
      title: "Le siège lit les mêmes *chiffres* que le terrain.",
      body: "Ligne à ligne, du vendeur à la boutique au réseau. Le clienteling cesse d'être un acte de foi.",
      alt: "Mains d'un artisan joaillier au travail sur une pièce",
      stats: [
        { value: 3, label: "Métiers, une application" },
        { value: 4, label: "Langues d'interface" },
        { value: 100, suffix: " %", label: "Paramétrable sans développeur" },
        { value: 2, label: "Types de CA, jamais additionnés" },
      ],
    },
    spaces: {
      kicker: "Une application, trois métiers",
      title: "Le même socle, les mêmes *chiffres*.",
      cards: [
        {
          key: "advisor",
          kicker: "Espace Vendeur",
          title: "Le client sur le bout des doigts",
          body: "Fiche 360°, wishlist, messagerie tracée, agenda, stock réseau, priorités du jour.",
          cta: "Découvrir l'espace vendeur",
          mock: {
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
        {
          key: "manager",
          kicker: "Espace Manager",
          title: "Le cockpit de la boutique",
          body: "CA direct et influencé, KPIs par vendeur, objectifs, portefeuilles clients.",
          cta: "Découvrir l'espace manager",
          mock: {
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
          key: "hq",
          kicker: "Espace Siège",
          title: "La vue réseau, unifiée",
          body: "Analytics réseau, base clients unifiée, catalogue consolidé, console de configuration.",
          cta: "Découvrir l'espace siège",
          mock: {
            kind: "kpi",
            title: "Analytics réseau — démonstration",
            badge: "Trimestre",
            rows: [
              { label: "CA direct réseau", value: "71 %", share: 71 },
              { label: "CA influencé réseau", value: "29 %", share: 29, green: true },
              { label: "Boutiques actives", value: "12/12", share: 100 },
            ],
            footnote: "Décor de démonstration, données fictives.",
          },
        },
      ],
    },
    statement: {
      kicker: "Configurabilité",
      title: "L'outil s'adapte à votre maison. *Jamais l'inverse.*",
      body: "Tout se configure sans développeur, depuis la console du siège. Six familles de réglages, aucune ne demande un ticket ni un redéploiement.",
      items: [
        {
          title: "Rôles & permissions",
          body: "Créez vos rôles, décidez qui voit quoi, champ par champ.",
        },
        {
          title: "Champs de fiche",
          body: "La fiche client parle le vocabulaire de votre maison.",
        },
        {
          title: "Règles d'attribution",
          body: "Fenêtre, canaux, méthode : la définition du CA influencé vous appartient.",
        },
        {
          title: "Modèles de messages",
          body: "La voix de la maison, déclinée dans chaque langue.",
        },
        {
          title: "Motifs de rendez-vous",
          body: "Essayage, retrait, présentation privée : vos motifs, vos durées.",
        },
        {
          title: "Catégories produit",
          body: "Le catalogue rangé selon votre taxonomie, pas la nôtre.",
        },
      ],
      links: [
        { label: "Explorer la configurabilité", key: "configurability" },
        { label: "IA copilote", key: "aiCopilot" },
        { label: "Sécurité & conformité", key: "security" },
      ],
    },
    proof: {
      kicker: "Références",
      body: "Les maisons qui nous font confiance seront présentées ici.",
      note: "Emplacement réservé — en attente de références publiables.",
    },
    cta: {
      kicker: "Demander une démo",
      title: "Voyez Selekt sur *vos* cas d'usage.",
      body: "Une démonstration guidée, adaptée à votre réseau de boutiques.",
      button: "Demander une démo",
      micro: "Trente minutes · Sans engagement",
      alt: "Nature morte sombre : cuir et outils de maroquinier",
    },
  },

  en: {
    meta: {
      title: "Selekt Retail OS — Luxury clienteling, finally measurable",
      description:
        "AI-augmented clienteling SaaS platform for luxury boutique networks. Advisors, managers and headquarters in one application. Influenced revenue, measurable and reconcilable.",
    },
    hero: {
      kicker: "Clienteling · Luxury retail",
      titleBase: "Every client interaction becomes a value you can",
      rotating: ["measure.", "act on.", "visualize."],
      lede: "Selekt brings advisors, managers and headquarters together in one clienteling application, augmented by a guard-railed AI.",
      primary: "Request a demo",
      secondary: "Explore the platform",
      alt: "Cream-toned luxury boutique interior with staircase and counters",
      chips: ["Traced contact", "Attributed sale", "Influenced revenue"],
    },
    connectors: { label: "It connects with:" },
    intro: {
      title: "Relationship work happens. Now its *proof* does too.",
      body: "Selekt traces clienteling gestures, attributes sales according to your rules, and surfaces reconcilable influenced revenue at every level, from the sales floor to the boardroom.",
    },
    trace: {
      kicker: "01 · Trace",
      title: "Every gesture leaves a useful *trace*.",
      body: "Messages, appointments, wishlists: clienteling actions leave from the application, in the house's tone, and feed the client profile.",
      alt: "Warm-lit jewelry display case in a boutique",
      chips: ["Message sent", "Appointment held", "Wishlist updated"],
    },
    attribute: {
      kicker: "02 · Attribute",
      title: "The sale finds its *origin*.",
      body: "When the client purchases, the sale is linked to the action according to your rules. Influenced revenue stays distinct from direct revenue: never added, always reconcilable.",
      points: [
        "Attribution window adjustable in days, per house",
        "Channels explicitly included or excluded",
        "A sale is never counted twice",
      ],
      mockup: {
        title: "Monthly revenue — Vendôme boutique",
        window: "Window: 30 d",
        direct: "Direct revenue",
        influenced: "Influenced revenue",
        note: "Two distinct figures, never added together. Reconcilable from advisor to headquarters, line by line.",
      },
      alt: "Natural leather goods resting on a workshop bench",
    },
    prove: {
      kicker: "03 · Prove",
      title: "Headquarters reads the same *figures* as the floor.",
      body: "Line by line, from advisor to boutique to network. Clienteling stops being an act of faith.",
      alt: "A jeweler's hands at work on a piece",
      stats: [
        { value: 3, label: "Roles, one application" },
        { value: 4, label: "Interface languages" },
        { value: 100, suffix: "%", label: "Configurable without a developer" },
        { value: 2, label: "Revenue types, never added" },
      ],
    },
    spaces: {
      kicker: "One application, three roles",
      title: "The same foundation, the same *figures*.",
      cards: [
        {
          key: "advisor",
          kicker: "Advisor workspace",
          title: "Every client, at your fingertips",
          body: "360° profile, wishlist, traced messaging, agenda, network stock, daily priorities.",
          cta: "Discover the advisor workspace",
          mock: {
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
        {
          key: "manager",
          kicker: "Manager workspace",
          title: "The boutique cockpit",
          body: "Direct and influenced revenue, per-advisor KPIs, targets, client portfolios.",
          cta: "Discover the manager workspace",
          mock: {
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
          key: "hq",
          kicker: "Headquarters",
          title: "The unified network view",
          body: "Network analytics, unified client base, consolidated catalog, configuration console.",
          cta: "Discover the headquarters workspace",
          mock: {
            kind: "kpi",
            title: "Network analytics — demonstration",
            badge: "Quarter",
            rows: [
              { label: "Network direct revenue", value: "71%", share: 71 },
              { label: "Network influenced revenue", value: "29%", share: 29, green: true },
              { label: "Active boutiques", value: "12/12", share: 100 },
            ],
            footnote: "Demonstration decor, fictitious data.",
          },
        },
      ],
    },
    statement: {
      kicker: "Configurability",
      title: "The tool adapts to your house. *Never the reverse.*",
      body: "Everything is configured without a developer, from the headquarters console. Six families of settings, none requiring a ticket or a redeployment.",
      items: [
        {
          title: "Roles & permissions",
          body: "Create your roles, decide who sees what, field by field.",
        },
        {
          title: "Profile fields",
          body: "The client profile speaks your house's vocabulary.",
        },
        {
          title: "Attribution rules",
          body: "Window, channels, method: the definition of influenced revenue is yours.",
        },
        {
          title: "Message templates",
          body: "The house's voice, declined in every language.",
        },
        {
          title: "Appointment types",
          body: "Fitting, pickup, private presentation: your types, your durations.",
        },
        {
          title: "Product categories",
          body: "The catalog arranged by your taxonomy, not ours.",
        },
      ],
      links: [
        { label: "Explore configurability", key: "configurability" },
        { label: "AI copilot", key: "aiCopilot" },
        { label: "Security & compliance", key: "security" },
      ],
    },
    proof: {
      kicker: "References",
      body: "The houses that trust us will be featured here.",
      note: "Reserved space — awaiting publishable references.",
    },
    cta: {
      kicker: "Request a demo",
      title: "See Selekt on *your* use cases.",
      body: "A guided demonstration, tailored to your boutique network.",
      button: "Request a demo",
      micro: "Thirty minutes · No commitment",
      alt: "Dark still life: leather and leatherworker's tools",
    },
  },
};
