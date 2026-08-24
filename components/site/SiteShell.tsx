import type { ReactNode } from "react";
import type { Locale } from "@/lib/routes";
import { Footer } from "./Footer";
import { Header } from "./Header";

export function SiteShell({ locale, children }: { locale: Locale; children: ReactNode }) {
  return (
    <>
      <a
        href="#contenu"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-100 focus:rounded-md focus:bg-card focus:px-4 focus:py-2 focus:text-ink"
      >
        {locale === "fr" ? "Aller au contenu" : "Skip to content"}
      </a>
      <Header locale={locale} />
      <main id="contenu">{children}</main>
      <Footer locale={locale} />
    </>
  );
}
