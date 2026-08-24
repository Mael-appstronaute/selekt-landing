import Link from "next/link";
import type { ComponentProps } from "react";
import { NAV, navHref } from "@/content/nav";
import { pagePath, type Locale } from "@/lib/routes";
import { Button } from "../ui/Button";
import { Wordmark } from "./Wordmark";

export function Footer({ locale }: { locale: Locale }) {
  const nav = NAV[locale];
  const platformEntries = nav.platformColumns.flatMap((c) => c.entries);
  const capabilityEntries = nav.capabilitiesColumns.flatMap((c) => c.entries);

  const columns = [
    { heading: nav.footerHeadings.platform, entries: platformEntries },
    { heading: nav.footerHeadings.capabilities, entries: capabilityEntries },
    { heading: nav.footerHeadings.company, entries: nav.footerCompany },
  ];

  return (
    <footer className="dark-vignette on-dark relative overflow-hidden border-t border-gold/25">
      <div className="relative z-10 mx-auto max-w-[1272px] px-4 pt-16 md:px-8 md:pt-20">
        <div className="grid gap-14 lg:grid-cols-[1.1fr_2fr] lg:gap-20">
          {/* ——— Bloc de marque ——— */}
          <div>
            <Wordmark className="text-[2rem]" />
            <p className="muted-dark mt-5 max-w-[28ch] text-[0.95rem] leading-relaxed">
              {locale === "fr"
                ? "Le clienteling des maisons de luxe, mesurable du vendeur au siège."
                : "Luxury clienteling, measurable from the sales floor to headquarters."}
            </p>
            <div className="mt-8">
              <Button href={pagePath("demo", locale)} variant="primary-inverse">
                {nav.demoCta}
              </Button>
            </div>
            <p className="kicker mt-8 text-[0.62rem] text-sand-muted">
              Français · English · Español · 中文
            </p>
          </div>

          {/* ——— Colonnes de navigation ——— */}
          <div className="grid gap-10 sm:grid-cols-3">
            {columns.map((col) => (
              <nav key={col.heading} aria-label={col.heading}>
                <p className="kicker flex items-center gap-3 text-sand-muted">
                  <span aria-hidden className="inline-block h-3 w-px bg-current opacity-60" />
                  {col.heading}
                </p>
                <ul className="mt-6 space-y-3">
                  {col.entries.map((entry) => (
                    <li key={entry.key}>
                      <Link
                        href={navHref(entry, locale) as ComponentProps<typeof Link>["href"]}
                        className="group inline-flex items-baseline gap-2 text-[0.93rem] text-on-void/75 no-underline transition-colors duration-150 ease-(--ease-lux) hover:text-on-void"
                      >
                        <span
                          aria-hidden
                          className="inline-block h-px w-0 bg-gold transition-[width] duration-300 ease-(--ease-lux) group-hover:w-3"
                        />
                        {entry.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
            ))}
          </div>
        </div>

        {/* ——— Bas de page ——— */}
        <div className="mt-16 flex flex-wrap items-center justify-between gap-6 border-t border-sand/14 py-7">
          <p className="text-[0.82rem] text-on-void/50">
            © {new Date().getFullYear()} {nav.legalNote}
          </p>
          <div className="flex items-center gap-6">
            <p className="kicker text-[0.6rem] text-sand-muted">
              {locale === "fr" ? "Sobre. Chaud. Précis." : "Quiet. Warm. Precise."}
            </p>
            {/* Retour en haut — médaillon */}
            <a
              href="#"
              aria-label={locale === "fr" ? "Revenir en haut de page" : "Back to top"}
              className="flex h-11 w-11 items-center justify-center rounded-full border border-sand/30 text-on-void/80 no-underline transition-[background-color,border-color,color] duration-300 ease-(--ease-lux) hover:border-cream-2 hover:bg-cream-2 hover:text-ink"
            >
              <svg
                aria-hidden
                viewBox="0 0 16 16"
                className="h-4 w-4"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.1"
              >
                <path d="M8 14.5v-12M3.5 7 8 2.5 12.5 7" />
              </svg>
            </a>
          </div>
        </div>
      </div>

      {/* ——— Wordmark filigrane en contour — écho des numéraux ——— */}
      <div aria-hidden className="pointer-events-none relative z-10 select-none overflow-hidden">
        <p
          className="mx-auto max-w-[1272px] translate-y-[28%] px-4 text-center font-serif leading-none text-transparent md:px-8"
          style={{
            WebkitTextStroke: "1px rgba(201, 185, 158, 0.18)",
            fontSize: "clamp(6rem, 17vw, 14rem)",
          }}
        >
          Sel<em className="italic">e</em>kt
        </p>
      </div>
    </footer>
  );
}
