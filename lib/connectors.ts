/**
 * Systèmes retail auxquels Selekt se connecte — logos officiels,
 * récupérés depuis les sources des éditeurs (voir CREDITS.md).
 * Affichés en silhouette encre (brightness-0) dans un carrousel lent.
 * `h` : hauteur d'affichage en px, équilibrée à l'œil par logo
 * (les wordmarks larges descendent, les monogrammes montent).
 */
export type Connector = { name: string; src: string; width: number; height: number; h: number };

export const CONNECTORS: Connector[] = [
  { name: "Shopify", src: "/logos/shopify.svg", width: 448, height: 127, h: 26 },
  { name: "Cegid", src: "/logos/cegid.svg", width: 1000, height: 408, h: 24 },
  { name: "Salesforce", src: "/logos/salesforce.svg", width: 93, height: 65, h: 30 },
  { name: "Fastmag (Orisha)", src: "/logos/fastmag.png", width: 310, height: 80, h: 24 },
  { name: "Lightspeed", src: "/logos/lightspeed.svg", width: 130, height: 30, h: 22 },
  { name: "Odeis", src: "/logos/odeis.png", width: 250, height: 114, h: 26 },
  { name: "PrestaShop", src: "/logos/prestashop.svg", width: 507, height: 435, h: 36 },
  { name: "Retail Pro", src: "/logos/retailpro.svg", width: 300, height: 113, h: 26 },
];

/**
 * Icônes d'applications seules (jamais de wordmark) pour la grille du
 * panneau « Connecteurs » de l'accueil — sources : svgl.app et Simple Icons
 * en couleur de marque (voir CREDITS.md).
 */
export type ConnectorIcon = { name: string; src: string };

export const CONNECTOR_ICONS: ConnectorIcon[] = [
  { name: "Shopify", src: "/icons/shopify.svg" },
  { name: "Salesforce", src: "/icons/salesforce.svg" },
  { name: "Slack", src: "/icons/slack.svg" },
  { name: "Notion", src: "/icons/notion.svg" },
  { name: "PrestaShop", src: "/icons/prestashop.svg" },
  { name: "Stripe", src: "/icons/stripe.svg" },
  { name: "HubSpot", src: "/icons/hubspot.svg" },
  { name: "Mailchimp", src: "/icons/mailchimp.svg" },
  { name: "WhatsApp", src: "/icons/whatsapp.svg" },
  { name: "Instagram", src: "/icons/instagram.svg" },
  { name: "Gmail", src: "/icons/gmail.svg" },
  { name: "Outlook", src: "/icons/outlook.svg" },
  { name: "Google Agenda", src: "/icons/google-calendar.svg" },
  { name: "Google Sheets", src: "/icons/google-sheets.svg" },
  { name: "Google Analytics", src: "/icons/google-analytics.svg" },
  { name: "Zapier", src: "/icons/zapier.svg" },
];
