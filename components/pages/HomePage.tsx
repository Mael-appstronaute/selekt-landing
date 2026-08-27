import Image from "next/image";
import Link from "next/link";
import type { ComponentProps } from "react";
import { HOME } from "@/content/home";
import { CONNECTOR_ICONS } from "@/lib/connectors";
import { PHOTOS } from "@/lib/photos";
import { pagePath, type Locale } from "@/lib/routes";
import { JsonLd, organizationJsonLd, softwareJsonLd } from "@/lib/seo";
import { BlurTitle } from "../fx/BlurTitle";
import { Reveal } from "../fx/Reveal";
import { RotatingWord } from "../fx/RotatingWord";
import { RippleChip } from "../fx/RippleChip";
import { SilkBackground } from "../fx/SilkBackground";
import { ThreadsBackground } from "../fx/ThreadsBackground";
import { SpacesList } from "./SpacesList";
import { AttributionPanel } from "../mockups/AttributionPanel";
import { Arrow, Button } from "../ui/Button";
import { EmText } from "../ui/EmText";
import { Kicker } from "../ui/Kicker";
import { Stat } from "../ui/Stat";

const href = (key: Parameters<typeof pagePath>[0], locale: Locale) =>
  pagePath(key, locale) as ComponentProps<typeof Link>["href"];

export function HomePage({ locale }: { locale: Locale }) {
  const c = HOME[locale];

  return (
    <>
      <JsonLd data={organizationJsonLd()} />
      <JsonLd data={softwareJsonLd(locale)} />

      {/* Colonne de panneaux flottants sur fond crème — l'air fait le travail */}
      <div className="mx-auto flex max-w-[1272px] flex-col gap-5 px-4 pt-[92px] md:gap-6 md:px-8">
        {/* ——— Héros — panneau soie (port maison du Silk de reactbits), chips à ondes ——— */}
        <section className="panel relative min-h-[540px] bg-void-2 md:min-h-[640px]">
          <div className="absolute inset-0">
            <SilkBackground />
          </div>
          <div
            aria-hidden
            className="absolute inset-0 bg-gradient-to-t from-void/65 via-transparent to-void-warm/15"
          />
          <div className="on-dark relative z-10 flex min-h-[540px] flex-col items-center justify-center p-7 text-center md:min-h-[640px] md:p-14">
            <Kicker tone="dark" rule={false} className="text-cream-2/90">
              {c.hero.kicker}
            </Kicker>
            <h1 className="display-1 mx-auto mt-5 max-w-[17ch]">
              <span className="sr-only">
                {c.hero.titleBase} {c.hero.rotating[0]}
              </span>
              <span aria-hidden>
                <BlurTitle as="span" text={c.hero.titleBase} />{" "}
                <RotatingWord words={c.hero.rotating} />
              </span>
            </h1>
            <Reveal delay={0.35}>
              <p className="lede muted-dark mx-auto mt-6 max-w-[44ch]">{c.hero.lede}</p>
              <div className="mt-8 flex flex-wrap justify-center gap-3.5">
                <Button href={pagePath("demo", locale)} variant="primary-inverse">
                  {c.hero.primary}
                </Button>
                <Button href={pagePath("platform", locale)} variant="outline-dark">
                  {c.hero.secondary} <Arrow />
                </Button>
              </div>
            </Reveal>
          </div>
        </section>

        {/* ——— Connecteurs — panneau sombre scindé : grille d'icônes d'apps
             sur tuiles crème à gauche, propos et lien à droite ——— */}
        <Reveal>
          <section className="panel grid bg-void-2 lg:grid-cols-[1.04fr_1fr]">
            <div className="flex items-center justify-center bg-sand/10 px-7 py-10 md:p-12 lg:p-16">
              <ul className="grid w-full max-w-[430px] grid-cols-4 gap-4 md:gap-5">
                {CONNECTOR_ICONS.map((icon) => (
                  <li key={icon.name} title={icon.name}>
                    <div className="group flex aspect-square items-center justify-center rounded-[24%] bg-cream-2 shadow-[inset_0_1px_0_rgba(255,255,255,0.9),0_14px_26px_-16px_rgba(10,8,6,0.7)] ring-1 ring-void/25 transition-[transform,box-shadow] duration-300 ease-(--ease-lux) hover:-translate-y-1.5 hover:shadow-[inset_0_1px_0_rgba(255,255,255,0.9),0_22px_34px_-16px_rgba(10,8,6,0.75)]">
                      {/* img simple : SVG hors optimiseur next/image */}
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={icon.src}
                        alt={icon.name}
                        width={44}
                        height={44}
                        loading="lazy"
                        className="h-[46%] w-[46%] object-contain transition-transform duration-300 ease-(--ease-lux) group-hover:scale-108"
                      />
                    </div>
                  </li>
                ))}
              </ul>
            </div>
            <div className="on-dark flex flex-col justify-center p-7 pt-9 md:p-12 lg:p-16">
              <Kicker tone="dark">{c.connectors.kicker}</Kicker>
              <h2 className="display-2 mt-5 max-w-[15ch]">
                <EmText text={c.connectors.title} tone="dark" />
              </h2>
              <p className="muted-dark mt-5 max-w-[42ch] text-[0.98rem] leading-relaxed">
                {c.connectors.body}
              </p>
              <div className="mt-9">
                <Button href={pagePath("platform", locale)} variant="outline-dark">
                  {c.connectors.cta} <Arrow />
                </Button>
              </div>
            </div>
          </section>
        </Reveal>

        {/* ——— Déclaration éditoriale scindée ——— */}
        <Reveal>
          <section className="grid gap-8 py-14 md:grid-cols-[1.2fr_0.8fr] md:items-end md:py-20">
            <h2 className="display-2 max-w-[20ch]">
              <EmText text={c.intro.title} />
            </h2>
            <p className="max-w-[40ch] text-[0.98rem] leading-relaxed muted">{c.intro.body}</p>
          </section>
        </Reveal>

        {/* ——— 01 · Tracer — panneau photo, chips empilées ——— */}
        <Reveal>
          <section className="panel relative min-h-[480px]">
            <Image
              src={PHOTOS.vitrine}
              alt={c.trace.alt}
              fill
              sizes="(max-width: 1272px) 100vw, 1208px"
              className="photo-warm object-cover"
            />
            <div aria-hidden className="photo-veil absolute inset-0" />
            <div className="on-dark relative z-10 flex min-h-[480px] flex-col justify-end p-7 md:p-12">
              <Kicker tone="dark">{c.trace.kicker}</Kicker>
              <h2 className="display-2 mt-4 max-w-[18ch]">
                <EmText text={c.trace.title} tone="dark" />
              </h2>
              <p className="muted-dark mt-4 max-w-[46ch] text-[0.98rem] leading-relaxed">
                {c.trace.body}
              </p>
            </div>
            <div aria-hidden className="absolute inset-0 z-10 hidden md:block">
              {c.trace.chips.map((chip, i) => (
                <RippleChip
                  key={chip}
                  label={chip}
                  index={i + 1}
                  className={["right-[8%] top-[20%]", "right-[14%] top-[40%]", "right-[10%] top-[60%]"][i]}
                />
              ))}
            </div>
          </section>
        </Reveal>

        {/* ——— 02 · Attribuer — panneau scindé, le produit visible ——— */}
        <Reveal>
          <section className="panel grid bg-card lg:grid-cols-2">
            <div className="p-7 md:p-12">
              <Kicker>{c.attribute.kicker}</Kicker>
              <h2 className="display-2 mt-4 max-w-[16ch]">
                <EmText text={c.attribute.title} />
              </h2>
              <p className="muted mt-4 max-w-[48ch] text-[0.98rem] leading-relaxed">
                {c.attribute.body}
              </p>
              <ul className="mt-8 max-w-[52ch]">
                {c.attribute.points.map((point) => (
                  <li
                    key={point}
                    className="flex items-baseline gap-3 border-t border-ink/10 py-3.5 text-[0.92rem] muted"
                  >
                    <span aria-hidden className="inline-block h-px w-4 shrink-0 bg-brass" />
                    {point}
                  </li>
                ))}
              </ul>
            </div>
            <div className="relative min-h-[420px]">
              <Image
                src={PHOTOS.atelier}
                alt={c.attribute.alt}
                fill
                sizes="(max-width: 1024px) 100vw, 604px"
                className="photo-warm object-cover"
              />
              <div
                aria-hidden
                className="absolute inset-0 bg-gradient-to-t from-void/45 to-void-warm/10"
              />
              <div className="absolute inset-0 flex items-center justify-center p-6">
                <AttributionPanel labels={c.attribute.mockup} />
              </div>
            </div>
          </section>
        </Reveal>

        {/* ——— 03 · Prouver — panneau sombre immersif, l'or des chiffres ——— */}
        <Reveal>
          <section className="panel relative">
            <Image
              src={PHOTOS.artisan}
              alt={c.prove.alt}
              fill
              sizes="(max-width: 1272px) 100vw, 1208px"
              className="photo-warm object-cover"
            />
            <div aria-hidden className="absolute inset-0 bg-void/72" />
            <div className="on-dark relative z-10 p-7 md:p-12">
              <Kicker tone="dark">{c.prove.kicker}</Kicker>
              <h2 className="display-2 mt-4 max-w-[20ch]">
                <EmText text={c.prove.title} tone="dark" />
              </h2>
              <p className="muted-dark mt-4 max-w-[46ch] text-[0.98rem] leading-relaxed">
                {c.prove.body}
              </p>
              <div className="mt-12 grid gap-8 border-t border-sand/16 pt-10 sm:grid-cols-2 lg:grid-cols-4">
                {c.prove.stats.map((stat) => (
                  <Stat
                    key={stat.label}
                    value={stat.value}
                    suffix={stat.suffix}
                    label={stat.label}
                    locale={locale}
                  />
                ))}
              </div>
            </div>
          </section>
        </Reveal>

        {/* ——— Trois espaces — liste éditoriale typographique ——— */}
        <section className="py-14 md:py-20">
          <Reveal>
            <Kicker>{c.spaces.kicker}</Kicker>
            <h2 className="display-2 mt-4 max-w-[20ch]">
              <EmText text={c.spaces.title} />
            </h2>
          </Reveal>
          <Reveal className="mt-12">
            <SpacesList locale={locale} content={c.spaces} />
          </Reveal>
        </section>

        {/* ——— Configurabilité — grande carte à fond soie, tuiles translucides
             (grille d'avantages inspirée 21st.dev, recolorée charte) ——— */}
        <Reveal>
          <section className="panel relative bg-void-2">
            <div className="absolute inset-0">
              <ThreadsBackground />
            </div>
            <div
              aria-hidden
              className="absolute inset-0 bg-gradient-to-b from-void-warm/25 via-void/40 to-void/70"
            />
            <div className="on-dark relative z-10 p-7 md:p-12">
              <div className="grid gap-8 md:grid-cols-[1.15fr_0.85fr] md:items-end">
                <div>
                  <Kicker tone="dark" className="text-cream-2/90">
                    {c.statement.kicker}
                  </Kicker>
                  <h2 className="display-2 mt-4 max-w-[20ch]">
                    <EmText text={c.statement.title} tone="dark" />
                  </h2>
                </div>
                <p className="muted-dark max-w-[44ch] text-[0.98rem] leading-relaxed">
                  {c.statement.body}
                </p>
              </div>

              <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {c.statement.items.map((item) => (
                  <div
                    key={item.title}
                    className="group rounded-2xl border border-sand/14 bg-void/45 p-5 backdrop-blur-sm transition-[border-color] duration-300 ease-(--ease-lux) hover:border-gold/40 md:p-6"
                  >
                    <div className="flex items-center gap-3">
                      <svg
                        aria-hidden
                        viewBox="0 0 10 10"
                        className="h-2.5 w-2.5 text-gold transition-transform duration-300 ease-(--ease-lux) group-hover:rotate-90"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1"
                      >
                        <path d="M5 0v10M0 5h10" />
                      </svg>
                      <h3 className="text-[0.96rem] font-medium text-cream-2">{item.title}</h3>
                    </div>
                    <p className="muted-dark mt-2.5 pl-[22px] text-[0.88rem] leading-relaxed">
                      {item.body}
                    </p>
                  </div>
                ))}
              </div>

              <div className="mt-10 flex flex-wrap gap-x-10 gap-y-4 border-t border-sand/14 pt-7">
                {c.statement.links.map((link) => (
                  <Link key={link.key} href={href(link.key, locale)} className="link-quiet text-sand">
                    {link.label} <Arrow />
                  </Link>
                ))}
              </div>
            </div>
          </section>
        </Reveal>

        {/* ——— Preuve sociale — placeholder explicite, jamais inventé ——— */}
        <Reveal>
          <section className="rounded-[20px] bg-cream-2 px-7 py-14 text-center md:py-16">
            <p className="kicker text-sand-muted">{c.proof.kicker}</p>
            <p className="mx-auto mt-5 max-w-[38ch] font-serif text-[1.5rem] italic leading-snug muted">
              {c.proof.body}
            </p>
            {/* PLACEHOLDER — à remplacer par de vraies références publiables */}
            <p className="kicker mt-4 text-[0.6rem] text-sand-muted">{c.proof.note}</p>
          </section>
        </Reveal>

        {/* ——— Panneau CTA final — sombre, photo matière ——— */}
        <Reveal>
          <section className="panel relative mb-6 min-h-[440px] md:mb-8">
            <Image
              src={PHOTOS.cuirSombre}
              alt={c.cta.alt}
              fill
              sizes="(max-width: 1272px) 100vw, 1208px"
              className="photo-warm object-cover"
            />
            <div aria-hidden className="absolute inset-0 bg-void/70" />
            <div className="on-dark relative z-10 flex min-h-[440px] flex-col items-center justify-center p-8 text-center">
              <Kicker tone="dark" rule={false}>
                {c.cta.kicker}
              </Kicker>
              <h2 className="display-2 mt-5 max-w-[18ch]">
                <EmText text={c.cta.title} tone="dark" />
              </h2>
              <p className="muted-dark mt-4 max-w-[44ch] text-[0.98rem]">{c.cta.body}</p>
              <div className="mt-9">
                <Button href={pagePath("demo", locale)} variant="primary-inverse" size="lg">
                  {c.cta.button}
                </Button>
              </div>
              <p className="kicker mt-6 text-[0.6rem] text-sand-muted">{c.cta.micro}</p>
            </div>
          </section>
        </Reveal>
      </div>
    </>
  );
}
