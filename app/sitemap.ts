import type { MetadataRoute } from "next";
import { PAGES, type PageKey } from "@/lib/routes";
import { SITE_URL } from "@/lib/seo";

const EXCLUDED: PageKey[] = ["legal", "privacy"];

export default function sitemap(): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = [];
  for (const key of Object.keys(PAGES) as PageKey[]) {
    if (EXCLUDED.includes(key)) continue;
    for (const locale of ["fr", "en"] as const) {
      entries.push({
        url: `${SITE_URL}${PAGES[key][locale] === "/" ? "" : PAGES[key][locale]}`,
        changeFrequency: "monthly",
        priority: key === "home" ? 1 : key === "demo" ? 0.9 : 0.7,
        alternates: {
          languages: {
            fr: `${SITE_URL}${PAGES[key].fr === "/" ? "" : PAGES[key].fr}`,
            en: `${SITE_URL}${PAGES[key].en}`,
          },
        },
      });
    }
  }
  return entries;
}
