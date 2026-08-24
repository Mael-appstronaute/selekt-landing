export type Locale = "fr" | "en";

export const LOCALES: Locale[] = ["fr", "en"];

/** Carte des routes — FR à la racine, EN sous /en avec slugs anglais. */
export const PAGES = {
  home: { fr: "/", en: "/en" },
  platform: { fr: "/plateforme", en: "/en/platform" },
  advisor: { fr: "/plateforme/vendeur", en: "/en/platform/advisor" },
  manager: { fr: "/plateforme/manager", en: "/en/platform/manager" },
  hq: { fr: "/plateforme/siege", en: "/en/platform/headquarters" },
  configurability: { fr: "/configurabilite", en: "/en/configurability" },
  influencedRevenue: { fr: "/ca-influence", en: "/en/influenced-revenue" },
  aiCopilot: { fr: "/ia-copilote", en: "/en/ai-copilot" },
  security: { fr: "/securite", en: "/en/security" },
  whySelekt: { fr: "/pourquoi-selekt", en: "/en/why-selekt" },
  demo: { fr: "/demo", en: "/en/demo" },
  legal: { fr: "/mentions-legales", en: "/en/legal" },
  privacy: { fr: "/confidentialite", en: "/en/privacy" },
} as const;

export type PageKey = keyof typeof PAGES;

export function pagePath(key: PageKey, locale: Locale): string {
  return PAGES[key][locale];
}

/** Retrouve la clé de page depuis un pathname (pour le sélecteur de langue). */
export function pageKeyFromPath(pathname: string): PageKey | null {
  const clean = pathname.replace(/\/+$/, "") || "/";
  for (const key of Object.keys(PAGES) as PageKey[]) {
    if (PAGES[key].fr === clean || PAGES[key].en === clean) return key;
  }
  return null;
}

export function localeFromPath(pathname: string): Locale {
  return pathname === "/en" || pathname.startsWith("/en/") ? "en" : "fr";
}
