/**
 * Photographies Unsplash — chaque URL a été vérifiée (réponse 200, contenu
 * inspecté visuellement sur planche contact) avant intégration. Étalonnage
 * chaud unifié appliqué en CSS (.photo-warm). Registre : boutique, écrin,
 * matière, geste. Sources documentées dans CREDITS.md. Licence Unsplash
 * (attribution non requise, créditée par courtoisie).
 */

const unsplash = (id: string, w: number) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=80`;

export const PHOTOS = {
  /* ——— Home ——— */
  /** Intérieur de boutique de luxe crème, escalier — Pourquoi Selekt & /design */
  heroBoutique: unsplash("photo-1782834294716-8e28c18bdba6", 2000),
  /** Vitrine d'écrin éclairée, tons chauds — panneau « Tracer » */
  vitrine: unsplash("photo-1774110073583-2475ab5ed8b2", 1600),
  /** Maroquinerie sur établi d'atelier — panneau « Attribuer » (split) */
  atelier: unsplash("photo-1628483211662-9bcc692c46dc", 1200),
  /** Mains d'artisan joaillier au travail — panneau « Prouver » */
  artisan: unsplash("photo-1599071338288-49173359e0fd", 1600),
  /** Cuir sombre et outils, nature morte — panneau CTA final */
  cuirSombre: unsplash("photo-1635100299010-0410d7434a93", 1600),

  /* ——— Pages intérieures ——— */
  /** Tailleur ajustant la veste d'un client — Espace Vendeur */
  conseil: unsplash("photo-1781942213919-cae87e52dd90", 1600),
  /** Conseillère au comptoir, tablette en main — La plateforme */
  comptoir: unsplash("photo-1648824571549-c3bc7946d603", 1600),
  /** Tablette posée sur le comptoir d'une boutique sombre — Espace Manager */
  tablette: unsplash("photo-1648824572410-2e15e187084c", 1600),
  /** Plume écrivant sur papier — IA copilote */
  ecriture: unsplash("photo-1455390582262-044cdead277a", 1600),
  /** Bureau de direction en bois sombre, lampe allumée — Espace Siège */
  bureau: unsplash("photo-1770515853604-4487b6370bc1", 1600),
  /** Serrure ancienne ouvragée sur porte en bois — Sécurité */
  serrure: unsplash("photo-1646872686934-cf4c910fc219", 1600),
  /** Atelier de couture, machine et tissus — Configurabilité */
  atelierCouture: unsplash("photo-1618866903271-595806e0679d", 1600),
  /** Veste grise ajustée, montre au poignet — Espace Manager */
  elegance: unsplash("photo-1521485878586-6b92b0c3641c", 1200),
  /** Mains tenant un sac en cuir — La plateforme */
  mainsSac: unsplash("photo-1584184924103-e310d9dc82fc", 1600),
  /** Mouvement de montre, fond ambré — CA influencé */
  mouvement: unsplash("photo-1768062251809-739d987a42fe", 1200),
  /** Montre or rose posée près de livres — IA copilote */
  quietude: unsplash("photo-1770216533493-a25ce4224123", 1200),
  /** Façade de boutique en pierre « Artisans » — Espace Siège */
  facade: unsplash("photo-1781707628090-dd18cfbfda72", 1600),
  /** Gravure ciselée d'une montre de poche — Sécurité */
  gravure: unsplash("photo-1772354318482-9caa5a429320", 1600),
} as const;

export type PhotoKey = keyof typeof PHOTOS;
