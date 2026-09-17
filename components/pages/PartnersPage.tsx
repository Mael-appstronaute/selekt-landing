import type { PartnersPageContent } from "@/content/pages/partners";
import type { Locale } from "@/lib/routes";
import { JsonLd, organizationJsonLd } from "@/lib/seo";
import { Reveal } from "../fx/Reveal";
import { DemoCta } from "../site/DemoCta";
import { PageHero } from "../site/PageHero";
import { EmText } from "../ui/EmText";
import { Kicker } from "../ui/Kicker";

/** Flèche d'évasion — lien externe, dessinée au trait. */
function ArrowOut({ className = "" }: { className?: string }) {
  return (
    <svg
      aria-hidden
      viewBox="0 0 16 16"
      className={`h-3.5 w-3.5 ${className}`}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.25"
    >
      <path d="M4.5 11.5 11.5 4.5M5.5 4.5h6v6" />
    </svg>
  );
}

/**
 * Page Partenaires — annuaire éditorial : numéraux en contour, filets 1px,
 * chaque rangée est un lien vers le site du partenaire (même grammaire que
 * la liste typographique des pages capacités).
 */
export function PartnersPage({
  locale,
  content,
}: {
  locale: Locale;
  content: PartnersPageContent;
}) {
  const c = content;
  return (
    <>
      <JsonLd data={organizationJsonLd()} />

      <div className="mx-auto flex max-w-[1272px] flex-col gap-5 px-4 pb-6 pt-[92px] md:gap-6 md:px-8 md:pb-8">
        <PageHero
          kicker={c.hero.kicker}
          title={c.hero.title}
          lede={c.hero.lede}
          locale={locale}
          bg={c.hero.bg}
          demoLabel={c.hero.demoLabel}
        />

        <Reveal>
          <section className="py-12 md:py-16">
            <div className="grid gap-6 md:grid-cols-[1.15fr_0.85fr] md:items-end">
              <div>
                <Kicker>{c.list.kicker}</Kicker>
                <h2 className="display-2 mt-4 max-w-[20ch]">
                  <EmText text={c.list.title} />
                </h2>
              </div>
              {c.list.lede && (
                <p className="max-w-[44ch] text-[0.98rem] leading-relaxed muted">{c.list.lede}</p>
              )}
            </div>

            <div className="mt-12 border-b border-ink/14">
              {c.list.partners.map((partner, i) => (
                <a
                  key={partner.name}
                  href={partner.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group grid items-center gap-x-8 gap-y-3 border-t border-ink/14 py-7 no-underline transition-colors duration-300 ease-(--ease-lux) hover:bg-ink/[0.03] md:py-8 lg:grid-cols-[90px_1fr_1.1fr_44px]"
                >
                  <span
                    aria-hidden
                    className="hidden font-serif text-[2.6rem] italic leading-none text-transparent lg:block"
                    style={{ WebkitTextStroke: "1px rgba(42, 34, 22, 0.35)" }}
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <p className="kicker text-sand-muted">{partner.category}</p>
                    {/* logo officiel — <img> simple, les SVG sont refusés par next/image */}
                    <img
                      src={partner.logo}
                      alt={partner.name}
                      className="mt-4 w-auto max-w-[240px] object-contain object-left"
                      style={{ height: partner.logoH }}
                      loading="lazy"
                    />
                    <p className="mt-3 text-[0.82rem] tracking-wide text-brass">
                      {partner.host}
                    </p>
                  </div>
                  <div>
                    <p className="max-w-[52ch] text-[0.94rem] leading-relaxed muted">
                      {partner.description}
                    </p>
                    <span className="link-quiet mt-4 text-brass lg:hidden">
                      {c.list.visitLabel}
                      <ArrowOut />
                    </span>
                  </div>
                  {/* Médaillon d'évasion — visible en desktop, s'anime au survol */}
                  <span
                    aria-hidden
                    className="hidden h-11 w-11 items-center justify-center rounded-full border border-ink/20 text-ink/70 transition-[background-color,border-color,color] duration-300 ease-(--ease-lux) group-hover:border-ink group-hover:bg-ink group-hover:text-cream-2 lg:flex"
                  >
                    <ArrowOut className="transition-transform duration-300 ease-(--ease-lux) group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </span>
                </a>
              ))}
            </div>
          </section>
        </Reveal>

        <DemoCta locale={locale} />
      </div>
    </>
  );
}
