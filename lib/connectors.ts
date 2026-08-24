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
