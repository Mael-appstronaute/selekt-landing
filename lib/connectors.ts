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
 * `label` : nom court affiché sous l'icône (une seule ligne en mobile).
 * `wide` : wordmark horizontal (logo fourni par le client sans version icône)
 * — affiché plus large dans la pastille pour rester lisible.
 */
export type ConnectorIcon = { name: string; label: string; src: string; wide?: boolean };

export const CONNECTOR_ICONS: ConnectorIcon[] = [
  { name: "Shopify", label: "Shopify", src: "/icons/shopify.svg" },
  { name: "Salesforce", label: "Salesforce", src: "/icons/salesforce.svg" },
  { name: "Retail Pro", label: "Retail Pro", src: "/icons/retailpro.svg", wide: true },
  { name: "Microsoft 365", label: "Microsoft 365", src: "/icons/microsoft365.svg" },
  { name: "PrestaShop", label: "PrestaShop", src: "/icons/prestashop.svg" },
  { name: "Oracle Xstore", label: "Oracle Xstore", src: "/icons/oracle.svg", wide: true },
  { name: "NewStore", label: "NewStore", src: "/icons/newstore.png" },
  { name: "Microsoft Dynamics 365 Commerce", label: "Dynamics 365", src: "/icons/dynamics365.svg" },
  { name: "WhatsApp", label: "WhatsApp", src: "/icons/whatsapp.svg" },
  { name: "Odeis", label: "Odeis", src: "/icons/odeis.png" },
  { name: "Cegid", label: "Cegid", src: "/icons/cegid.png", wide: true },
  { name: "Openbravo", label: "Openbravo", src: "/icons/openbravo.png" },
  { name: "Fastmag (Orisha)", label: "Fastmag", src: "/icons/fastmag.png" },
  { name: "WooCommerce", label: "WooCommerce", src: "/icons/woocommerce.png" },
  { name: "Bijou3 (Odeis)", label: "Bijou3", src: "/icons/odeis.png" },
  { name: "Splio", label: "Splio", src: "/icons/splio.png", wide: true },
];
