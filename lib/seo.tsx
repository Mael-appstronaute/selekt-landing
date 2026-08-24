import type { Metadata } from "next";
import { PAGES, type Locale, type PageKey } from "./routes";

export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://selekt.appstronaute.com";

export const SITE_NAME = "Selekt Retail OS";

/** Métadonnées par page : canonical + hreflang + Open Graph. */
export function pageMetadata(
  key: PageKey,
  locale: Locale,
  meta: { title: string; description: string },
): Metadata {
  const path = PAGES[key][locale];
  return {
    // La home porte déjà le nom du site : titre absolu, sans template.
    title: key === "home" ? { absolute: meta.title } : meta.title,
    description: meta.description,
    alternates: {
      canonical: path,
      languages: {
        fr: PAGES[key].fr,
        en: PAGES[key].en,
        "x-default": PAGES[key].fr,
      },
    },
    openGraph: {
      title: meta.title,
      description: meta.description,
      url: path,
      siteName: SITE_NAME,
      locale: locale === "fr" ? "fr_FR" : "en_US",
      type: "website",
    },
  };
}

export function organizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Selekt Retail OS",
    url: SITE_URL,
    parentOrganization: { "@type": "Organization", name: "Appstronaute SAS" },
  };
}

export function softwareJsonLd(locale: Locale) {
  return {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "Selekt Retail OS",
    applicationCategory: "BusinessApplication",
    operatingSystem: "Web",
    url: SITE_URL,
    inLanguage: ["fr", "en", "es", "zh"],
    description:
      locale === "fr"
        ? "Plateforme SaaS de clienteling augmentée par l'IA pour les réseaux de boutiques de luxe. Vendeurs, managers et siège dans une seule application web."
        : "AI-augmented clienteling SaaS platform for luxury retail networks. Advisors, managers and headquarters in a single web application.",
  };
}

export function JsonLd({ data }: { data: object }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
