import Image from "next/image";
import Link from "next/link";
import { PILOTE } from "@/content/pilote";
import { CONNECTOR_ICONS } from "@/lib/connectors";
import { PHOTOS } from "@/lib/photos";
import { JsonLd, organizationJsonLd } from "@/lib/seo";
import { BlurTitle } from "../fx/BlurTitle";
import { Reveal } from "../fx/Reveal";
import { SilkBackground } from "../fx/SilkBackground";
import { ThreadsBackground } from "../fx/ThreadsBackground";
import { AttributionPanel } from "../mockups/AttributionPanel";
import { DashboardMock } from "../mockups/DashboardMock";
import { KpiPanel } from "../mockups/KpiPanel";
import { PrioritiesList } from "../mockups/PrioritiesList";
import { PilotForm } from "../site/PilotForm";
import { Wordmark } from "../site/Wordmark";
import { Accordion } from "../ui/Accordion";
import { Arrow, Button } from "../ui/Button";
import { EmText } from "../ui/EmText";
import { Kicker } from "../ui/Kicker";
import { Stat } from "../ui/Stat";

/**
 * Landing d'acquisition autonome — programme pilote (cold mailing/calling).
 * Pas de navigation du site : un seul objectif, la candidature.
 * Prête à être servie sur un sous-domaine (rewrite Vercel → /pilote).
 */
export function PilotPage() {
  const c = PILOTE;

  return (
    <>
      <JsonLd data={organizationJsonLd()} />

      {/* ——— Héros page de vente — or liquide bord à bord, promesse + CTA
           + réassurances, et le produit en scène : grand cockpit qui
           déborde sur la section suivante ——— */}
      <div className="on-dark relative bg-void-2">
        <div className="absolute inset-0">
          <SilkBackground />
        </div>
        <div
          aria-hidden
          className="absolute inset-0 bg-gradient-to-b from-void/45 via-void/20 to-void/70"
        />

        {/* Barre minimale superposée — wordmark + un seul CTA */}
        <header className="relative z-10 mx-auto flex w-full max-w-[1272px] items-center justify-between px-4 py-6 md:px-8">
          <Wordmark accent="sand" className="text-[1.55rem]" />
          <div className="flex items-center gap-6">
            <p className="kicker hidden text-sand-muted sm:block">{c.header.note}</p>
            <Button href="#candidature" variant="primary-inverse">
              {c.header.cta}
            </Button>
          </div>
        </header>

        {/* Promesse, CTA, réassurances */}
        <div className="relative z-10 mx-auto w-full max-w-[1272px] px-4 pt-8 text-center md:px-8 md:pt-12">
          <Kicker tone="dark" rule={false} className="justify-center text-cream-2/90">
            {c.hero.kicker}
          </Kicker>
          <BlurTitle
            text={c.hero.title}
            className="shine-title mx-auto mt-6 max-w-[17ch] font-serif text-[clamp(2.7rem,5.4vw,4.6rem)] leading-[1.0] tracking-[-0.014em] [text-wrap:balance]"
          />
          <Reveal delay={0.4}>
            <p className="lede muted-dark mx-auto mt-6 max-w-[52ch]">{c.hero.lede}</p>
            <div className="mt-9 flex flex-wrap justify-center gap-3.5">
              <Button href="#candidature" variant="primary-inverse" size="lg">
                {c.hero.primary}
              </Button>
              <Button href="#programme" variant="outline-dark" size="lg">
                {c.hero.secondary} <Arrow />
              </Button>
            </div>
            <ul className="mt-7 flex flex-wrap items-center justify-center gap-x-8 gap-y-3">
              {c.hero.checks.map((check) => (
                <li
                  key={check}
                  className="flex items-center gap-2.5 text-[0.9rem] text-on-void/85"
                >
                  <svg
                    aria-hidden
                    viewBox="0 0 12 12"
                    className="h-3 w-3 shrink-0 text-gold"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                  >
                    <path d="M1.5 6.5 4.5 9.5 10.5 2.5" />
                  </svg>
                  {check}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>

        {/* Le produit en scène — le cockpit déborde sur la section suivante */}
        <Reveal delay={0.55} className="relative z-10 mx-auto w-full max-w-[1060px] px-4 md:px-8">
          <div className="relative mt-12 -mb-28 md:mt-14 md:-mb-44">
            <div
              aria-hidden
              className="absolute -inset-x-12 -top-12 bottom-0 rounded-[48px] bg-[radial-gradient(60%_60%_at_50%_18%,rgba(201,169,106,0.3),transparent_70%)] blur-2xl"
            />
            <DashboardMock />
          </div>
        </Reveal>
      </div>

      <div className="mx-auto flex max-w-[1272px] flex-col gap-5 px-4 pt-40 md:gap-6 md:px-8 md:pt-56">
        {/* ——— Connecteurs — panneau sombre : plaque éditoriale à filets sable
             (icône + nom mono par case) face au propos, comme l'accueil ——— */}
        <Reveal>
          <section className="panel grid bg-void-2 lg:grid-cols-[1.05fr_1fr]">
            <div className="flex items-center p-4 md:p-8 lg:p-10">
              <ul className="grid w-full grid-cols-4">
                {CONNECTOR_ICONS.map((icon) => (
                  <li
                    key={icon.name}
                    title={icon.name}
                    className="group flex aspect-square flex-col items-center justify-center gap-2.5 border-b border-r border-sand/12 transition-colors duration-300 ease-(--ease-lux) hover:bg-sand/8 [&:nth-child(4n)]:border-r-0 [&:nth-child(n+13)]:border-b-0"
                  >
                    <div className="flex h-14 w-14 items-center justify-center rounded-[24%] bg-cream-2 shadow-[0_10px_20px_-12px_rgba(10,8,6,0.7)] transition-transform duration-300 ease-(--ease-lux) group-hover:-translate-y-1 md:h-[76px] md:w-[76px]">
                      {/* img simple : SVG hors optimiseur next/image */}
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={icon.src}
                        alt={icon.name}
                        width={44}
                        height={44}
                        loading="lazy"
                        className={
                          icon.wide
                            ? "h-8 w-11 object-contain md:h-11 md:w-[58px]"
                            : "h-8 w-8 object-contain md:h-11 md:w-11"
                        }
                      />
                    </div>
                    <span className="font-mono text-[0.5rem] uppercase tracking-[0.12em] text-sand-muted transition-colors duration-300 ease-(--ease-lux) group-hover:text-cream-2 md:text-[0.58rem] md:tracking-[0.14em]">
                      {icon.label}
                    </span>
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
                <Button href="#candidature" variant="outline-dark">
                  {c.connectors.cta} <Arrow />
                </Button>
              </div>
            </div>
          </section>
        </Reveal>

        {/* ——— Déclaration éditoriale scindée ——— */}
        <Reveal>
          <section className="grid gap-8 py-12 md:grid-cols-[1.2fr_0.8fr] md:items-end md:py-16">
            <h2 className="display-2 max-w-[22ch]">
              <EmText text={c.intro.title} />
            </h2>
            <p className="max-w-[42ch] text-[0.98rem] leading-relaxed muted">{c.intro.body}</p>
          </section>
        </Reveal>

        {/* ——— Caractéristiques clés — trois espaces, le produit visible ——— */}
        <section>
          <Reveal>
            <Kicker>{c.features.kicker}</Kicker>
            <h2 className="display-2 mt-4 max-w-[22ch]">
              <EmText text={c.features.title} />
            </h2>
            <p className="mt-4 max-w-[52ch] text-[0.98rem] leading-relaxed muted">
              {c.features.body}
            </p>
          </Reveal>
          <div className="mt-10 grid gap-5 lg:grid-cols-3">
            {c.features.cards.map((card, i) => (
              <Reveal key={card.kicker} delay={i * 0.08}>
                <article className="flex h-full flex-col rounded-[20px] border border-ink/10 bg-card p-6 md:p-7">
                  <Kicker>{card.kicker}</Kicker>
                  <h3 className="mt-3 font-serif text-[1.35rem] leading-snug">{card.title}</h3>
                  <p className="mt-2 text-[0.92rem] leading-relaxed muted">{card.body}</p>
                  <div className="mt-6 flex flex-1 items-end">
                    {card.mock.kind === "priorities" ? (
                      <PrioritiesList title={card.mock.title} items={[...card.mock.items]} />
                    ) : card.mock.kind === "kpi" ? (
                      <KpiPanel
                        title={card.mock.title}
                        badge={card.mock.badge}
                        rows={[...card.mock.rows]}
                        footnote={card.mock.footnote}
                      />
                    ) : (
                      <AttributionPanel labels={card.mock.labels} />
                    )}
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </section>

        {/* ——— Différenciation — panneau sombre, le face-à-face avec le marché ——— */}
        <Reveal>
          <section className="panel relative mt-8 bg-void-2 md:mt-10">
            <div className="absolute inset-0">
              <ThreadsBackground />
            </div>
            <div
              aria-hidden
              className="absolute inset-0 bg-gradient-to-b from-void-warm/25 via-void/45 to-void/75"
            />
            <div className="on-dark relative z-10 p-7 md:p-12">
              <div className="grid gap-8 md:grid-cols-[1.15fr_0.85fr] md:items-end">
                <div>
                  <Kicker tone="dark" className="text-cream-2/90">
                    {c.differentiation.kicker}
                  </Kicker>
                  <h2 className="display-2 mt-4 max-w-[20ch]">
                    <EmText text={c.differentiation.title} tone="dark" />
                  </h2>
                </div>
                <p className="muted-dark max-w-[44ch] text-[0.98rem] leading-relaxed">
                  {c.differentiation.body}
                </p>
              </div>

              <div className="mt-12 overflow-hidden rounded-2xl border border-sand/14 bg-void/45 backdrop-blur-sm">
                <div className="hidden gap-6 border-b border-sand/14 px-6 py-4 md:grid md:grid-cols-[0.75fr_1.15fr_1fr] md:px-8">
                  <span aria-hidden />
                  <p className="kicker text-gold">{c.differentiation.colSelekt}</p>
                  <p className="kicker text-sand-muted">{c.differentiation.colOthers}</p>
                </div>
                {c.differentiation.rows.map((row) => (
                  <div
                    key={row.dimension}
                    className="grid gap-3 border-b border-sand/10 px-6 py-6 last:border-b-0 md:grid-cols-[0.75fr_1.15fr_1fr] md:gap-6 md:px-8 md:py-5"
                  >
                    <p className="kicker self-center text-sand">{row.dimension}</p>
                    <p className="flex items-baseline gap-3 text-[0.94rem] leading-relaxed text-cream-2">
                      <span aria-hidden className="inline-block h-px w-4 shrink-0 bg-gold" />
                      {row.selekt}
                    </p>
                    <p className="pl-7 text-[0.92rem] leading-relaxed text-on-void/45 md:pl-0">
                      {row.others}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </Reveal>

        {/* ——— Roadmap — quatre temps, le pilote marqué à l'or ——— */}
        <section className="py-14 md:py-20">
          <Reveal>
            <Kicker>{c.roadmap.kicker}</Kicker>
            <h2 className="display-2 mt-4 max-w-[20ch]">
              <EmText text={c.roadmap.title} />
            </h2>
          </Reveal>
          <div className="mt-12 grid gap-10 md:grid-cols-4 md:gap-8">
            {c.roadmap.steps.map((step, i) => (
              <Reveal key={step.title} delay={i * 0.08}>
                <div
                  className={`border-t pt-5 ${
                    "highlight" in step && step.highlight ? "border-gold" : "border-ink/14"
                  }`}
                >
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <p
                      className={`kicker ${
                        "highlight" in step && step.highlight ? "text-brass" : "text-sand-muted"
                      }`}
                    >
                      {step.date}
                    </p>
                    {"chip" in step && step.chip && (
                      <span className="kicker rounded-full border border-brass/50 px-2.5 py-1 text-[0.55rem] text-brass">
                        {step.chip}
                      </span>
                    )}
                  </div>
                  <h3 className="mt-3 font-serif text-[1.3rem] leading-snug">{step.title}</h3>
                  <p className="mt-2 text-[0.92rem] leading-relaxed muted">{step.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        {/* ——— L'offre pilote — panneau sombre photo, l'or des chiffres ——— */}
        <Reveal>
          <section id="programme" className="panel relative scroll-mt-6">
            <Image
              src={PHOTOS.cuirSombre}
              alt={c.offer.alt}
              fill
              sizes="(max-width: 1272px) 100vw, 1208px"
              className="photo-warm object-cover"
            />
            <div aria-hidden className="absolute inset-0 bg-void/72" />
            <div className="on-dark relative z-10 p-7 md:p-12">
              <div className="grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:gap-14">
                <div>
                  <Kicker tone="dark">{c.offer.kicker}</Kicker>
                  <h2 className="display-2 mt-4 max-w-[16ch]">
                    <EmText text={c.offer.title} tone="dark" />
                  </h2>
                  <p className="muted-dark mt-4 max-w-[48ch] text-[0.98rem] leading-relaxed">
                    {c.offer.body}
                  </p>
                  <ul className="mt-8 max-w-[56ch]">
                    {c.offer.benefits.map((benefit) => (
                      <li
                        key={benefit}
                        className="flex items-baseline gap-3 border-t border-sand/14 py-3.5 text-[0.94rem] text-on-void/85"
                      >
                        <span aria-hidden className="inline-block h-px w-4 shrink-0 bg-gold" />
                        {benefit}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="flex flex-col justify-center gap-10">
                  <div className="grid gap-8 sm:grid-cols-3 lg:grid-cols-1 lg:gap-9">
                    {c.offer.stats.map((stat) => (
                      <Stat
                        key={stat.label}
                        value={stat.value}
                        prefix={"prefix" in stat ? stat.prefix : undefined}
                        suffix={"suffix" in stat ? stat.suffix : undefined}
                        label={stat.label}
                        locale="fr"
                      />
                    ))}
                  </div>
                </div>
              </div>
              <div className="mt-10 flex flex-wrap items-center gap-6 border-t border-sand/14 pt-8">
                <Button href="#candidature" variant="primary-inverse" size="lg">
                  {c.offer.button}
                </Button>
                <p className="kicker text-[0.6rem] text-sand-muted">{c.offer.micro}</p>
              </div>
            </div>
          </section>
        </Reveal>

        {/* ——— Candidature — l'aside qui rassure, le formulaire qui convertit ——— */}
        <section id="candidature" className="scroll-mt-6 py-12 md:py-16">
          <Reveal>
            <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:gap-14">
              <div>
                <Kicker>{c.apply.kicker}</Kicker>
                <h2 className="display-2 mt-4 max-w-[14ch]">{c.apply.title}</h2>
                <div className="mt-8 space-y-6">
                  {c.apply.steps.map((step, i) => (
                    <div key={step.title} className="border-t border-ink/12 pt-5">
                      <p className="kicker text-sand-muted">{String(i + 1).padStart(2, "0")}</p>
                      <h3 className="mt-2 font-serif text-[1.25rem]">{step.title}</h3>
                      <p className="mt-2 text-[0.94rem] muted">{step.body}</p>
                    </div>
                  ))}
                </div>
              </div>
              <div className="relative">
                <PilotForm copy={c.form} />
              </div>
            </div>
          </Reveal>
        </section>

        {/* ——— FAQ — lever les dernières objections ——— */}
        <Reveal>
          <section className="grid gap-10 pb-12 md:grid-cols-[0.8fr_1.2fr] md:gap-14 md:pb-16">
            <div>
              <Kicker>{c.faq.kicker}</Kicker>
              <h2 className="display-2 mt-4 max-w-[14ch]">
                <EmText text={c.faq.title} />
              </h2>
            </div>
            <Accordion
              defaultOpen={0}
              items={c.faq.items.map((item) => ({ title: item.q, content: item.a }))}
            />
          </section>
        </Reveal>

        {/* ——— Dernier appel — sobre, sombre, un seul bouton ——— */}
        <Reveal>
          <section className="panel dark-vignette on-dark flex flex-col items-center gap-8 px-8 py-14 text-center md:py-16">
            <h2 className="display-2 max-w-[18ch]">
              <EmText text={c.finalCta.title} tone="dark" />
            </h2>
            <Button href="#candidature" variant="primary-inverse" size="lg">
              {c.finalCta.button}
            </Button>
          </section>
        </Reveal>

        {/* ——— Pied de page minimal ——— */}
        <footer className="mb-6 flex flex-col items-start justify-between gap-5 border-t border-ink/12 py-7 sm:flex-row sm:items-center md:mb-8">
          <Wordmark accent="brass" className="text-[1.2rem]" />
          <div className="flex flex-wrap items-center gap-x-8 gap-y-3">
            <Link href="/" className="link-quiet text-ink/70">
              {c.footer.site}
            </Link>
            <Link href="/mentions-legales" className="link-quiet text-ink/70">
              {c.footer.legal}
            </Link>
            <Link href="/confidentialite" className="link-quiet text-ink/70">
              {c.footer.privacy}
            </Link>
            <p className="kicker text-[0.6rem] text-sand-muted">{c.footer.copyright}</p>
          </div>
        </footer>
      </div>
    </>
  );
}

