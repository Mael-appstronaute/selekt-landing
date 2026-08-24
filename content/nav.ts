import type { PhotoKey } from "@/lib/photos";
import { pagePath, type Locale, type PageKey } from "@/lib/routes";

export type NavEntry = { key: PageKey; label: string; desc?: string; photo?: PhotoKey };

export type NavContent = {
  platformLabel: string;
  capabilitiesLabel: string;
  platformColumns: { heading: string; entries: NavEntry[] }[];
  capabilitiesColumns: { heading: string; entries: NavEntry[] }[];
  /** Colonne visuelle du méga-menu */
  spotlight: { kicker: string; title: string; cta: string; key: PageKey };
  directLinks: NavEntry[];
  demoCta: string;
  menuLabel: string;
  closeLabel: string;
  footerHeadings: { platform: string; capabilities: string; company: string };
  footerCompany: NavEntry[];
  legalNote: string;
};

export const NAV: Record<Locale, NavContent> = {
  fr: {
    platformLabel: "La plateforme",
    capabilitiesLabel: "Capacités",
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
        ],
      },
    ],
    spotlight: {
      kicker: "La boucle de valeur",
      title: "Chaque interaction devient une valeur mesurable.",
      cta: "Voir la boucle de valeur",
      key: "influencedRevenue",
    },
    directLinks: [{ key: "whySelekt", label: "Pourquoi Selekt" }],
    demoCta: "Demander une démo",
    menuLabel: "Menu",
    closeLabel: "Fermer",
    footerHeadings: { platform: "La plateforme", capabilities: "Capacités", company: "Selekt" },
    footerCompany: [
      { key: "whySelekt", label: "Pourquoi Selekt" },
      { key: "demo", label: "Demander une démo" },
      { key: "legal", label: "Mentions légales" },
      { key: "privacy", label: "Politique de confidentialité" },
    ],
    legalNote: "Selekt Retail OS, une marque d'Appstronaute SAS.",
  },
  en: {
    platformLabel: "Platform",
    capabilitiesLabel: "Capabilities",
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
        ],
      },
    ],
    spotlight: {
      kicker: "The value loop",
      title: "Every interaction becomes measurable value.",
      cta: "See the value loop",
      key: "influencedRevenue",
    },
    directLinks: [{ key: "whySelekt", label: "Why Selekt" }],
    demoCta: "Request a demo",
    menuLabel: "Menu",
    closeLabel: "Close",
    footerHeadings: { platform: "Platform", capabilities: "Capabilities", company: "Selekt" },
    footerCompany: [
      { key: "whySelekt", label: "Why Selekt" },
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
