import type { PhotoKey } from "@/lib/photos";
import { pagePath, type Locale, type PageKey } from "@/lib/routes";

export type NavEntry = { key: PageKey; label: string; desc?: string; photo?: PhotoKey };

export type NavContent = {
  platformLabel: string;
  capabilitiesLabel: string;
  solutionsLabel: string;
  platformColumns: { heading: string; entries: NavEntry[] }[];
  capabilitiesColumns: { heading: string; entries: NavEntry[] }[];
  /** Métiers et environnement logiciel : pages sectorielles et intégrations */
  solutionsColumns: { heading: string; entries: NavEntry[] }[];
  /** Colonne visuelle du méga-menu */
  spotlight: { kicker: string; title: string; cta: string; key: PageKey };
  directLinks: NavEntry[];
  demoCta: string;
  menuLabel: string;
  closeLabel: string;
  footerHeadings: { platform: string; capabilities: string; solutions: string; company: string };
  footerSolutions: NavEntry[];
  footerCompany: NavEntry[];
  legalNote: string;
};

export const NAV: Record<Locale, NavContent> = {
  fr: {
    platformLabel: "La plateforme",
    capabilitiesLabel: "Capacités",
    solutionsLabel: "Solutions",
    platformColumns: [
      {
        heading: "Une application, trois métiers",
        entries: [
          { key: "advisor", label: "Espace Vendeur", desc: "Le client sur le bout des doigts.", photo: "conseil" },
          { key: "manager", label: "Espace Manager", desc: "Le cockpit de la boutique.", photo: "tablette" },
          { key: "hq", label: "Espace Siège", desc: "La vue réseau, unifiée.", photo: "bureau" },
        ],
      },
      {
        heading: "Vue d'ensemble",
        entries: [
          { key: "platform", label: "La plateforme", desc: "Le socle commun, présenté en une page.", photo: "comptoir" },
        ],
      },
    ],
    capabilitiesColumns: [
      {
        heading: "Ce qui nous distingue",
        entries: [
          { key: "configurability", label: "Configurabilité", desc: "Ne rien figer.", photo: "atelierCouture" },
          { key: "influencedRevenue", label: "CA influencé", desc: "La preuve du retour sur investissement.", photo: "mouvement" },
          { key: "aiCopilot", label: "IA copilote", desc: "Encadrée, utile, validée par l'humain.", photo: "ecriture" },
          { key: "security", label: "Sécurité & conformité", desc: "La donnée traitée comme un actif.", photo: "serrure" },
          { key: "customerRecord", label: "Référentiel client unique", desc: "Une seule fiche par client, pour tout le réseau.", photo: "facade" },
          { key: "crmRetail", label: "CRM retail", desc: "Le CRM des réseaux de boutiques physiques.", photo: "quietude" },
        ],
      },
    ],
    solutionsColumns: [
      {
        heading: "Par métier",
        entries: [
          { key: "jewelry", label: "Bijouterie & joaillerie", desc: "Ce qui se passe entre deux visites.", photo: "horloger" },
          { key: "fashion", label: "Mode & prêt-à-porter", desc: "Ce qui se passe entre deux collections.", photo: "elegance" },
        ],
      },
      {
        heading: "Votre environnement",
        entries: [
          { key: "integrations", label: "Toutes les intégrations", desc: "Quel que soit votre logiciel.", photo: "mainsSac" },
          { key: "cegid", label: "Cegid", desc: "La relation au-dessus de la caisse." },
          { key: "shopifyPos", label: "Shopify POS", desc: "Un seul client, en ligne et en boutique." },
          { key: "klaviyo", label: "Klaviyo", desc: "La campagne d'un côté, la boutique de l'autre." },
        ],
      },
    ],
    spotlight: {
      kicker: "La boucle de valeur",
      title: "Chaque interaction devient une valeur mesurable.",
      cta: "Voir la boucle de valeur",
      key: "influencedRevenue",
    },
    directLinks: [
      { key: "clienteling", label: "Le clienteling" },
      { key: "whySelekt", label: "Pourquoi Selekt" },
      { key: "partners", label: "Partenaires" },
    ],
    demoCta: "Demander une démo",
    menuLabel: "Menu",
    closeLabel: "Fermer",
    footerHeadings: { platform: "La plateforme", capabilities: "Capacités", solutions: "Solutions", company: "Selekt" },
    footerSolutions: [
      { key: "clienteling", label: "Le clienteling" },
      { key: "jewelry", label: "Bijouterie & joaillerie" },
      { key: "fashion", label: "Mode & prêt-à-porter" },
      { key: "integrations", label: "Toutes les intégrations" },
      { key: "cegid", label: "Cegid" },
      { key: "shopifyPos", label: "Shopify POS" },
      { key: "klaviyo", label: "Klaviyo" },
    ],
    footerCompany: [
      { key: "whySelekt", label: "Pourquoi Selekt" },
      { key: "partners", label: "Partenaires" },
      { key: "demo", label: "Demander une démo" },
      { key: "legal", label: "Mentions légales" },
      { key: "privacy", label: "Politique de confidentialité" },
    ],
    legalNote: "Selekt Retail OS, une marque d'Appstronaute SAS.",
  },
  en: {
    platformLabel: "Platform",
    capabilitiesLabel: "Capabilities",
    solutionsLabel: "Solutions",
    platformColumns: [
      {
        heading: "One application, three roles",
        entries: [
          { key: "advisor", label: "Advisor workspace", desc: "Every client, at your fingertips.", photo: "conseil" },
          { key: "manager", label: "Manager workspace", desc: "The boutique cockpit.", photo: "tablette" },
          { key: "hq", label: "Headquarters", desc: "The unified network view.", photo: "bureau" },
        ],
      },
      {
        heading: "Overview",
        entries: [
          { key: "platform", label: "The platform", desc: "The shared foundation, on one page.", photo: "comptoir" },
        ],
      },
    ],
    capabilitiesColumns: [
      {
        heading: "What sets us apart",
        entries: [
          { key: "configurability", label: "Configurability", desc: "Nothing set in stone.", photo: "atelierCouture" },
          { key: "influencedRevenue", label: "Influenced revenue", desc: "Proof of return on investment.", photo: "mouvement" },
          { key: "aiCopilot", label: "AI copilot", desc: "Guard-railed, useful, human-approved.", photo: "ecriture" },
          { key: "security", label: "Security & compliance", desc: "Data treated as an asset.", photo: "serrure" },
          { key: "customerRecord", label: "Single customer view", desc: "One profile per client, across the network.", photo: "facade" },
          { key: "crmRetail", label: "Retail CRM", desc: "The CRM for networks of physical stores.", photo: "quietude" },
        ],
      },
    ],
    solutionsColumns: [
      {
        heading: "By industry",
        entries: [
          { key: "jewelry", label: "Jewelry & watches", desc: "What happens between two visits.", photo: "horloger" },
          { key: "fashion", label: "Fashion & apparel", desc: "What happens between two collections.", photo: "elegance" },
        ],
      },
      {
        heading: "Your stack",
        entries: [
          { key: "integrations", label: "All integrations", desc: "Whatever software you run.", photo: "mainsSac" },
          { key: "cegid", label: "Cegid", desc: "The relationship above the till." },
          { key: "shopifyPos", label: "Shopify POS", desc: "One client, online and in store." },
          { key: "klaviyo", label: "Klaviyo", desc: "Campaigns on one side, the boutique on the other." },
        ],
      },
    ],
    spotlight: {
      kicker: "The value loop",
      title: "Every interaction becomes measurable value.",
      cta: "See the value loop",
      key: "influencedRevenue",
    },
    directLinks: [
      { key: "clienteling", label: "Clienteling" },
      { key: "whySelekt", label: "Why Selekt" },
      { key: "partners", label: "Partners" },
    ],
    demoCta: "Request a demo",
    menuLabel: "Menu",
    closeLabel: "Close",
    footerHeadings: { platform: "Platform", capabilities: "Capabilities", solutions: "Solutions", company: "Selekt" },
    footerSolutions: [
      { key: "clienteling", label: "Clienteling" },
      { key: "jewelry", label: "Jewelry & watches" },
      { key: "fashion", label: "Fashion & apparel" },
      { key: "integrations", label: "All integrations" },
      { key: "cegid", label: "Cegid" },
      { key: "shopifyPos", label: "Shopify POS" },
      { key: "klaviyo", label: "Klaviyo" },
    ],
    footerCompany: [
      { key: "whySelekt", label: "Why Selekt" },
      { key: "partners", label: "Partners" },
      { key: "demo", label: "Request a demo" },
      { key: "legal", label: "Legal notice" },
      { key: "privacy", label: "Privacy policy" },
    ],
    legalNote: "Selekt Retail OS, an Appstronaute SAS brand.",
  },
};

export function navHref(entry: NavEntry, locale: Locale): string {
  return pagePath(entry.key, locale);
}
