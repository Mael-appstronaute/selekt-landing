import Image from "next/image";
import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";
import { PHOTOS, type PhotoKey } from "@/lib/photos";
import { pagePath, type Locale, type PageKey } from "@/lib/routes";
import { JsonLd, organizationJsonLd, softwareJsonLd } from "@/lib/seo";
import { GoldLine } from "../fx/GoldLine";
import { Reveal } from "../fx/Reveal";
import { RippleChip } from "../fx/RippleChip";
import { AiDraft, type AiDraftLabels } from "../mockups/AiDraft";
import { AttributionPanel, type AttributionLabels } from "../mockups/AttributionPanel";
import { KpiPanel, type KpiRow } from "../mockups/KpiPanel";
import { PrioritiesList, type PriorityItem } from "../mockups/PrioritiesList";
import { DemoCta } from "../site/DemoCta";
import { PageHero, type HeroBg } from "../site/PageHero";
import { Arrow } from "../ui/Button";
import { EmText } from "../ui/EmText";
import { Kicker } from "../ui/Kicker";
import { Stat } from "../ui/Stat";
import { Tabs } from "../ui/Tabs";

export type Mockup =
  | { kind: "attribution"; labels: AttributionLabels }
  | { kind: "priorities"; title: string; items: PriorityItem[] }
  | { kind: "kpi"; title: string; badge?: string; rows: KpiRow[]; footnote?: string }
  | { kind: "ai"; labels: AiDraftLabels };

type Tone = "cream" | "paper" | "dark";

export type FeatureSection =
  | {
      type: "rows";
      tone: Tone;
      kicker: string;
      title: string;
      lede?: string;
      /** timeline : déroulé vertical à jalons (inspiration 21st.dev « timelines ») */
      variant?: "timeline";
      rows: { title: string; body: string }[];
    }
  | {
      type: "cards";
      tone: Tone;
      kicker: string;
      title: string;
      lede?: string;
      cols?: 2 | 3;
      /** bento : première carte en large (inspiration 21st.dev « bento grids ») */
      variant?: "bento";
      cards: { kicker?: string; title: string; body: string; key?: PageKey; cta?: string }[];
    }
  | {
      type: "tabs";
      tone: Tone;
      kicker: string;
      title: string;
      lede?: string;
      tabs: { label: string; title: string; body: string; points?: string[] }[];
    }
  | {
      type: "loop";
      kicker: string;
      title: string;
      steps: { title: string; body: string }[];
    }
  | {
      type: "stats";
      kicker: string;
      title: string;
      stats: { value: number; prefix?: string; suffix?: string; label: string; decimals?: number }[];
    }
  | {
      type: "table";
      tone: Tone;
      kicker: string;
      title: string;
      lede?: string;
      columns: string[];
      highlight: number;
      rows: { label: string; cells: (string | boolean)[] }[];
      note?: string;
    }
  | {
      /** panneau photo pleine largeur, texte en bas à gauche (grammaire home) */
      type: "photo";
      photo: PhotoKey;
      alt: string;
      kicker: string;
      title: string;
      body: string;
      chips?: string[];
    }
  | {
      /** panneau scindé : texte clair + photo (mockup optionnel posé dessus) */
      type: "split";
      photo: PhotoKey;
      alt: string;
      kicker: string;
      title: string;
      body: string;
      points?: string[];
      mockup?: Mockup;
      reverse?: boolean;
    }
  | {
      /** liste éditoriale typographique — numéraux en contour, filets 1px */
      type: "list";
      kicker: string;
      title: string;
      lede?: string;
      items: { title: string; body: string }[];
    };

export type FeaturePageContent = {
  meta: { title: string; description: string };
  hero: {
    kicker: string;
    title: string;
    lede: string;
    demoLabel: string;
    secondary?: { label: string; key: PageKey };
    /** fond du héros (port reactbits) — un par page, mêmes couleurs */
    bg?: HeroBg;
    mockup?: Mockup;
  };
  sections: FeatureSection[];
};

function MockupView({ mockup, locale }: { mockup: Mockup; locale: Locale }) {
  switch (mockup.kind) {
    case "attribution":
      return <AttributionPanel labels={mockup.labels} locale={locale} />;
    case "priorities":
      return <PrioritiesList title={mockup.title} items={mockup.items} />;
    case "kpi":
      return (
        <KpiPanel
          title={mockup.title}
          badge={mockup.badge}
          rows={mockup.rows}
          footnote={mockup.footnote}
        />
      );
    case "ai":
      return <AiDraft labels={mockup.labels} />;
  }
}

function Check({ on }: { on: boolean }) {
  return on ? (
    <svg
      aria-hidden
      viewBox="0 0 14 14"
      className="h-3.5 w-3.5"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.4"
    >
      <path d="m2 7.5 3.5 3.5L12 3.5" />
    </svg>
  ) : (
    <span aria-hidden className="inline-block h-px w-3 bg-current opacity-40" />
  );
}

/** En-tête de section claire — titre à gauche, lede en regard (famille home). */
function LightHeader({
  kicker,
  title,
  lede,
}: {
  kicker: string;
  title: string;
  lede?: string;
}) {
  return (
    <div className="grid gap-6 md:grid-cols-[1.15fr_0.85fr] md:items-end">
      <div>
        <Kicker>{kicker}</Kicker>
        <h2 className="display-2 mt-4 max-w-[20ch]">
          <EmText text={title} />
        </h2>
      </div>
      {lede && <p className="max-w-[44ch] text-[0.98rem] leading-relaxed muted">{lede}</p>}
    </div>
  );
}

/** En-tête de panneau sombre. */
function DarkHeader({
  kicker,
  title,
  lede,
}: {
  kicker: string;
  title: string;
  lede?: string;
}) {
  return (
    <div>
      <Kicker tone="dark" className="text-cream-2/90">
        {kicker}
      </Kicker>
      <h2 className="display-2 mt-4 max-w-[22ch]">
        <EmText text={title} tone="dark" />
      </h2>
      {lede && <p className="muted-dark mt-4 max-w-[52ch] text-[0.98rem] leading-relaxed">{lede}</p>}
    </div>
  );
}

/** Panneau sombre générique (vignettage + halo discret). */
function DarkPanel({ children }: { children: ReactNode }) {
  return (
    <section className="panel dark-vignette on-dark relative overflow-hidden">
      <div aria-hidden className="hero-halo opacity-40" />
      <div className="relative z-10 p-7 md:p-12">{children}</div>
    </section>
  );
}

/** Tuile translucide sur panneau sombre (grammaire de la carte configurabilité). */
function DarkTile({
  children,
  href,
  className = "",
}: {
  children: ReactNode;
  href?: string;
  className?: string;
}) {
  const cls =
    "group block rounded-2xl border border-sand/14 bg-void/45 p-5 no-underline backdrop-blur-sm " +
    "transition-[border-color] duration-300 ease-(--ease-lux) hover:border-gold/40 md:p-6 " +
    className;
  if (href) {
    return (
      <Link href={href as ComponentProps<typeof Link>["href"]} className={cls}>
        {children}
      </Link>
    );
  }
  return <div className={cls}>{children}</div>;
}

export function FeaturePage({
  locale,
  content,
}: {
  locale: Locale;
  content: FeaturePageContent;
}) {
  const c = content;
  return (
    <>
      <JsonLd data={organizationJsonLd()} />
      <JsonLd data={softwareJsonLd(locale)} />

      <div className="mx-auto flex max-w-[1272px] flex-col gap-5 px-4 pb-6 pt-[92px] md:gap-6 md:px-8 md:pb-8">
        <PageHero
          kicker={c.hero.kicker}
          title={c.hero.title}
          lede={c.hero.lede}
          locale={locale}
          bg={c.hero.bg}
          demoLabel={c.hero.demoLabel}
          secondary={
            c.hero.secondary
              ? { label: c.hero.secondary.label, href: pagePath(c.hero.secondary.key, locale) }
              : undefined
          }
        />

        {c.sections.map((section, si) => {
          switch (section.type) {
            /* ——— Rangées éditoriales ——— */
            case "rows": {
              if (section.tone === "dark") {
                return (
                  <Reveal key={si}>
                    <DarkPanel>
                      <DarkHeader kicker={section.kicker} title={section.title} lede={section.lede} />
                      <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                        {section.rows.map((row, i) => (
                          <DarkTile key={row.title}>
                            <p className="kicker text-[0.6rem] text-gold">
                              {String(i + 1).padStart(2, "0")}
                            </p>
                            <h3 className="mt-2.5 font-serif text-[1.2rem] leading-snug text-cream-2">
                              {row.title}
                            </h3>
                            <p className="muted-dark mt-2 text-[0.88rem] leading-relaxed">
                              {row.body}
                            </p>
                          </DarkTile>
                        ))}
                      </div>
                    </DarkPanel>
                  </Reveal>
                );
              }
              if (section.variant === "timeline") {
                return (
                  <Reveal key={si}>
                    <section className="py-12 md:py-16">
                      <LightHeader kicker={section.kicker} title={section.title} lede={section.lede} />
                      {/* Déroulé vertical à jalons — inspiration 21st.dev « timelines » */}
                      <div className="mt-12 max-w-[720px]">
                        {section.rows.map((row, i) => (
                          <div
                            key={row.title}
                            className="relative border-l border-ink/15 pb-10 pl-8 last:pb-0"
                          >
                            <span
                              aria-hidden
                              className="absolute -left-[5.5px] top-1.5 h-2.5 w-2.5 rounded-full border border-brass bg-cream"
                            />
                            <p className="kicker text-sand-muted">
                              {String(i + 1).padStart(2, "0")}
                            </p>
                            <h3 className="mt-2 font-serif text-[1.3rem] leading-snug text-ink">
                              {row.title}
                            </h3>
                            <p className="mt-2 max-w-[54ch] text-[0.94rem] leading-relaxed muted">
                              {row.body}
                            </p>
                          </div>
                        ))}
                      </div>
                    </section>
                  </Reveal>
                );
              }
              return (
                <Reveal key={si}>
                  <section className="py-12 md:py-16">
                    <LightHeader kicker={section.kicker} title={section.title} lede={section.lede} />
                    <div className="mt-10 grid gap-x-10 sm:grid-cols-2 lg:grid-cols-3">
                      {section.rows.map((row, i) => (
                        <div key={row.title} className="border-t border-ink/12 py-6 md:py-7">
                          <p className="kicker text-sand-muted">
                            {String(i + 1).padStart(2, "0")}
                          </p>
                          <h3 className="mt-2.5 font-serif text-[1.25rem] leading-snug text-ink">
                            {row.title}
                          </h3>
                          <p className="mt-2.5 text-[0.92rem] leading-relaxed muted">{row.body}</p>
                        </div>
                      ))}
                    </div>
                  </section>
                </Reveal>
              );
            }

            /* ——— Cartes ——— */
            case "cards": {
              const isBento = section.variant === "bento";
              // bento : 1re et 4e cartes en large (inspiration 21st.dev « bento grids »)
              const bentoSpan = (i: number) => (isBento && (i === 0 || i === 3) ? "md:col-span-2" : "");
              const cols = isBento
                ? "md:grid-cols-3"
                : section.cols === 3
                  ? "sm:grid-cols-2 lg:grid-cols-3"
                  : "sm:grid-cols-2 lg:grid-cols-2";
              if (section.tone === "dark") {
                return (
                  <Reveal key={si}>
                    <DarkPanel>
                      <DarkHeader kicker={section.kicker} title={section.title} lede={section.lede} />
                      <div className={`mt-10 grid gap-4 ${cols}`}>
                        {section.cards.map((card, i) => (
                          <DarkTile
                            key={card.title}
                            href={card.key ? pagePath(card.key, locale) : undefined}
                            className={bentoSpan(i)}
                          >
                            {card.kicker && (
                              <p className="kicker text-[0.6rem] text-sand-muted">{card.kicker}</p>
                            )}
                            <h3 className="mt-2.5 font-serif text-[1.2rem] leading-snug text-cream-2">
                              {card.title}
                            </h3>
                            <p className="muted-dark mt-2 text-[0.88rem] leading-relaxed">
                              {card.body}
                            </p>
                            {card.cta && (
                              <span className="link-quiet mt-5 text-sand">
                                {card.cta}
                                <Arrow className="transition-transform duration-300 ease-(--ease-lux) group-hover:translate-x-1" />
                              </span>
                            )}
                          </DarkTile>
                        ))}
                      </div>
                    </DarkPanel>
                  </Reveal>
                );
              }
              return (
                <Reveal key={si}>
                  <section className="py-12 md:py-16">
                    <LightHeader kicker={section.kicker} title={section.title} lede={section.lede} />
                    <div className={`mt-10 grid gap-5 ${cols}`}>
                      {section.cards.map((card, i) => {
                        const inner = (
                          <>
                            {card.kicker && <p className="kicker text-sand-muted">{card.kicker}</p>}
                            <h3 className="title-1 mt-3 text-ink">{card.title}</h3>
                            <p className="mt-3 flex-1 text-[0.92rem] leading-relaxed muted">
                              {card.body}
                            </p>
                            {card.cta && (
                              <span className="link-quiet mt-6 text-brass">
                                {card.cta}
                                <Arrow className="transition-transform duration-300 ease-(--ease-lux) group-hover:translate-x-1" />
                              </span>
                            )}
                          </>
                        );
                        return card.key ? (
                          <Link
                            key={card.title}
                            href={pagePath(card.key, locale) as ComponentProps<typeof Link>["href"]}
                            className={`group flex h-full flex-col rounded-[20px] bg-card p-7 no-underline transition-transform duration-300 ease-(--ease-lux) hover:-translate-y-0.5 md:p-8 ${bentoSpan(i)}`}
                          >
                            {inner}
                          </Link>
                        ) : (
                          <div
                            key={card.title}
                            className={`flex h-full flex-col rounded-[20px] bg-card p-7 md:p-8 ${bentoSpan(i)}`}
                          >
                            {inner}
                          </div>
                        );
                      })}
                    </div>
                  </section>
                </Reveal>
              );
            }

            /* ——— Onglets ——— */
            case "tabs":
              return (
                <Reveal key={si}>
                  <section className="py-12 md:py-16">
                    <LightHeader kicker={section.kicker} title={section.title} lede={section.lede} />
                    <div className="mt-10 rounded-[20px] bg-card p-7 md:p-10">
                      <Tabs
                        items={section.tabs.map((tab) => ({
                          label: tab.label,
                          content: (
                            <div className="grid gap-10 md:grid-cols-[1fr_1fr]">
                              <div>
                                <h3 className="title-1">{tab.title}</h3>
                                <p className="mt-4 max-w-[52ch] text-[0.96rem] muted">{tab.body}</p>
                              </div>
                              {tab.points && (
                                <ul className="space-y-3">
                                  {tab.points.map((point) => (
                                    <li
                                      key={point}
                                      className="flex items-start gap-3 border-t border-ink/10 pt-3 text-[0.92rem] muted"
                                    >
                                      <span
                                        aria-hidden
                                        className="mt-2 inline-block h-px w-4 shrink-0 bg-brass"
                                      />
                                      {point}
                                    </li>
                                  ))}
                                </ul>
                              )}
                            </div>
                          ),
                        }))}
                      />
                    </div>
                  </section>
                </Reveal>
              );

            /* ——— Boucle de valeur — panneau sombre, ligne d'or ——— */
            case "loop":
              return (
                <Reveal key={si}>
                  <DarkPanel>
                    <DarkHeader kicker={section.kicker} title={section.title} />
                    <GoldLine
                      d="M0,84 C140,84 190,24 330,24 S520,104 660,104 S850,34 990,34 S1160,88 1200,88"
                      viewBox="0 0 1200 128"
                      className="mt-12 hidden h-[128px] md:block"
                    />
                    <div className="mt-8 grid gap-x-10 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
                      {section.steps.map((step, i) => (
                        <div key={step.title}>
                          <p className="font-serif text-[2.4rem] leading-none text-gold">
                            0{i + 1}
                          </p>
                          <h3 className="mt-3.5 font-serif text-[1.25rem] leading-snug">
                            {step.title}
                          </h3>
                          <p className="muted-dark mt-2.5 text-[0.9rem] leading-relaxed">
                            {step.body}
                          </p>
                        </div>
                      ))}
                    </div>
                  </DarkPanel>
                </Reveal>
              );

            /* ——— Chiffres — panneau sombre, l'or compté ——— */
            case "stats":
              return (
                <Reveal key={si}>
                  <DarkPanel>
                    <DarkHeader kicker={section.kicker} title={section.title} />
                    <div className="mt-10 grid gap-8 border-t border-sand/16 pt-10 sm:grid-cols-2 lg:grid-cols-4">
                      {section.stats.map((stat) => (
                        <Stat
                          key={stat.label}
                          value={stat.value}
                          prefix={stat.prefix}
                          suffix={stat.suffix}
                          label={stat.label}
                          locale={locale}
                          decimals={stat.decimals}
                        />
                      ))}
                    </div>
                  </DarkPanel>
                </Reveal>
              );

            /* ——— Comparatif — carte claire ——— */
            case "table":
              return (
                <Reveal key={si}>
                  <section className="py-12 md:py-16">
                    <LightHeader kicker={section.kicker} title={section.title} lede={section.lede} />
                    <div className="mt-10 overflow-x-auto rounded-[20px] bg-card p-6 md:p-8">
                      <table className="w-full min-w-[680px] border-collapse text-left">
                        <thead>
                          <tr>
                            <th className="w-[28%]" />
                            {section.columns.map((col, i) => (
                              <th
                                key={col}
                                scope="col"
                                className={`border-b border-ink/14 px-5 pb-4 align-bottom ${
                                  i === section.highlight
                                    ? "font-serif text-[1.3rem] font-normal"
                                    : "kicker text-sand-muted"
                                }`}
                              >
                                {i === section.highlight ? (
                                  <span>
                                    Sel<em className="italic text-brass">e</em>kt
                                  </span>
                                ) : (
                                  col
                                )}
                              </th>
                            ))}
                          </tr>
                        </thead>
                        <tbody>
                          {section.rows.map((row) => (
                            <tr key={row.label}>
                              <th
                                scope="row"
                                className="border-b border-ink/10 py-4 pr-5 text-[0.92rem] font-medium"
                              >
                                {row.label}
                              </th>
                              {row.cells.map((cell, i) => (
                                <td
                                  key={i}
                                  className={`border-b border-ink/10 px-5 py-4 text-[0.9rem] ${
                                    i === section.highlight ? "bg-void text-on-void" : "muted"
                                  }`}
                                >
                                  {typeof cell === "boolean" ? (
                                    <span
                                      className={
                                        i === section.highlight ? "text-gold" : "text-current"
                                      }
                                    >
                                      <Check on={cell} />
                                    </span>
                                  ) : (
                                    cell
                                  )}
                                </td>
                              ))}
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                    {section.note && <p className="mt-5 text-[0.85rem] muted">{section.note}</p>}
                  </section>
                </Reveal>
              );

            /* ——— Panneau photo pleine largeur (grammaire home) ——— */
            case "photo":
              return (
                <Reveal key={si}>
                  <section className="panel relative min-h-[460px]">
                    <Image
                      src={PHOTOS[section.photo]}
                      alt={section.alt}
                      fill
                      sizes="(max-width: 1272px) 100vw, 1208px"
                      className="photo-warm object-cover"
                    />
                    <div aria-hidden className="photo-veil absolute inset-0" />
                    <div className="on-dark relative z-10 flex min-h-[460px] flex-col justify-end p-7 md:p-12">
                      <Kicker tone="dark" className="text-cream-2/90">
                        {section.kicker}
                      </Kicker>
                      <h2 className="display-2 mt-4 max-w-[18ch]">
                        <EmText text={section.title} tone="dark" />
                      </h2>
                      <p className="muted-dark mt-4 max-w-[46ch] text-[0.98rem] leading-relaxed">
                        {section.body}
                      </p>
                    </div>
                    {section.chips && (
                      <div aria-hidden className="absolute inset-0 z-10 hidden md:block">
                        {section.chips.map((chip, i) => (
                          <RippleChip
                            key={chip}
                            label={chip}
                            index={i + 1}
                            className={
                              ["right-[8%] top-[20%]", "right-[14%] top-[42%]", "right-[10%] top-[64%]"][i]
                            }
                          />
                        ))}
                      </div>
                    )}
                  </section>
                </Reveal>
              );

            /* ——— Panneau scindé texte + photo (mockup optionnel) ——— */
            case "split":
              return (
                <Reveal key={si}>
                  <section className="panel grid bg-card lg:grid-cols-2">
                    <div className={`p-7 md:p-12 ${section.reverse ? "lg:order-last" : ""}`}>
                      <Kicker>{section.kicker}</Kicker>
                      <h2 className="display-2 mt-4 max-w-[16ch]">
                        <EmText text={section.title} />
                      </h2>
                      <p className="muted mt-4 max-w-[48ch] text-[0.98rem] leading-relaxed">
                        {section.body}
                      </p>
                      {section.points && (
                        <ul className="mt-8 max-w-[52ch]">
                          {section.points.map((point) => (
                            <li
                              key={point}
                              className="flex items-baseline gap-3 border-t border-ink/10 py-3.5 text-[0.92rem] muted"
                            >
                              <span aria-hidden className="inline-block h-px w-4 shrink-0 bg-brass" />
                              {point}
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                    <div className="relative min-h-[420px]">
                      <Image
                        src={PHOTOS[section.photo]}
                        alt={section.alt}
                        fill
                        sizes="(max-width: 1024px) 100vw, 604px"
                        className="photo-warm object-cover"
                      />
                      <div
                        aria-hidden
                        className="absolute inset-0 bg-gradient-to-t from-void/45 to-void-warm/10"
                      />
                      {section.mockup && (
                        <div className="absolute inset-0 flex items-center justify-center p-6">
                          <MockupView mockup={section.mockup} locale={locale} />
                        </div>
                      )}
                    </div>
                  </section>
                </Reveal>
              );

            /* ——— Liste éditoriale typographique ——— */
            case "list":
              return (
                <Reveal key={si}>
                  <section className="py-12 md:py-16">
                    <LightHeader kicker={section.kicker} title={section.title} lede={section.lede} />
                    <div className="mt-12 border-b border-ink/14">
                      {section.items.map((item, i) => (
                        <div
                          key={item.title}
                          className="grid items-center gap-x-8 gap-y-2 border-t border-ink/14 py-7 md:py-8 lg:grid-cols-[90px_1fr_1.1fr]"
                        >
                          <span
                            aria-hidden
                            className="hidden font-serif text-[2.6rem] italic leading-none text-transparent lg:block"
                            style={{ WebkitTextStroke: "1px rgba(42, 34, 22, 0.35)" }}
                          >
                            {String(i + 1).padStart(2, "0")}
                          </span>
                          <h3 className="font-serif text-[1.4rem] leading-tight text-ink md:text-[1.6rem]">
                            {item.title}
                          </h3>
                          <p className="max-w-[52ch] text-[0.94rem] leading-relaxed muted">
                            {item.body}
                          </p>
                        </div>
                      ))}
                    </div>
                  </section>
                </Reveal>
              );
          }
        })}

        <DemoCta locale={locale} />
      </div>
    </>
  );
}
