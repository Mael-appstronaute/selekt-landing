import type { Metadata } from "next";
import Image from "next/image";
import { PHOTOS } from "@/lib/photos";
import { Accordion } from "@/components/ui/Accordion";
import { Arrow, Button } from "@/components/ui/Button";
import { Kicker } from "@/components/ui/Kicker";
import { Stat } from "@/components/ui/Stat";
import { Tabs } from "@/components/ui/Tabs";
import { BlurTitle } from "@/components/fx/BlurTitle";
import { Reveal } from "@/components/fx/Reveal";
import { RippleChip } from "@/components/fx/RippleChip";

export const metadata: Metadata = {
  title: "Design system — page interne",
  robots: { index: false, follow: false },
};

const SWATCHES = [
  ["--void", "#100F0D"],
  ["--void-warm", "#2A2620"],
  ["--void-2", "#171512"],
  ["--cream", "#EDE8DD"],
  ["--cream-2", "#F2EEE6"],
  ["--card", "#FAF7F0"],
  ["--paper", "#FBFAF8"],
  ["--ink", "#2A2216"],
  ["--sand", "#C9B99E"],
  ["--sand-muted", "#A8977A"],
  ["--gold", "#C9A96A"],
  ["--brass", "#8C7648"],
  ["--green", "#3D5238"],
  ["--wine", "#6E2634"],
] as const;

export default function DesignPage() {
  return (
    <div className="mx-auto flex max-w-[1272px] flex-col gap-6 px-4 pb-16 pt-[92px] md:px-8">
      {/* Panneau photo — l'unité de composition de la famille */}
      <section className="panel relative min-h-[480px]">
        <Image
          src={PHOTOS.heroBoutique}
          alt="Intérieur de boutique de luxe aux tons crème"
          fill
          priority
          sizes="(max-width: 1272px) 100vw, 1208px"
          className="photo-warm object-cover"
        />
        <div aria-hidden className="photo-veil absolute inset-0" />
        <div className="on-dark relative z-10 flex min-h-[480px] flex-col justify-end p-7 md:p-12">
          <Kicker tone="dark">Design system · Famille bspk</Kicker>
          <BlurTitle
            text="Le panneau flottant, la photo chaude, l'or *compté*."
            className="display-1 mt-5 max-w-[18ch]"
          />
          <Reveal delay={0.35}>
            <div className="mt-8 flex flex-wrap gap-3.5">
              <Button href="/demo" variant="primary-inverse">
                Pilule inversée (sur sombre)
              </Button>
              <Button href="/plateforme" variant="outline-dark">
                Filet sable <Arrow />
              </Button>
            </div>
          </Reveal>
        </div>
        <div aria-hidden className="absolute inset-0 z-10 hidden lg:block">
          <RippleChip label="Onde d'attribution" index={1} className="right-[12%] top-[26%]" />
        </div>
      </section>

      {/* Boutons & kicker sur clair */}
      <section className="rounded-[20px] bg-card p-8 md:p-10">
        <Kicker>Boutons · pilules compactes</Kicker>
        <div className="mt-6 flex flex-wrap items-center gap-4">
          <Button href="/demo">Primaire encre</Button>
          <Button href="/design" variant="outline-light">
            Secondaire filet
          </Button>
          <span className="link-quiet text-brass">
            Lien éditorial <Arrow />
          </span>
        </div>
        <p className="mt-6 max-w-[60ch] text-[0.92rem] muted">
          La pilule primaire est encre sur clair, crème sur sombre. Le bordeaux a quitté
          les boutons ; il ne subsiste qu'en micro-détail des mockups. Hauteur 44px :
          leur retenue, sans leur illisibilité.
        </p>
      </section>

      {/* Tuiles de réassurance + palette */}
      <section className="rounded-[20px] bg-cream-2 p-8 md:p-10">
        <Kicker>Tuiles & tokens</Kicker>
        <ul className="mt-6 flex flex-wrap gap-3">
          {["Application web responsive", "FR · EN · ES · ZH", "RGPD opérationnel"].map((t) => (
            <li
              key={t}
              className="rounded-xl border border-ink/12 bg-card px-5 py-3 font-mono text-[0.72rem] uppercase tracking-[0.14em] text-ink/75"
            >
              {t}
            </li>
          ))}
        </ul>
        <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-7">
          {SWATCHES.map(([name, hex]) => (
            <div key={name} className="rounded-xl bg-card p-3">
              <div className="h-12 rounded-lg border border-ink/10" style={{ background: `var(${name})` }} />
              <p className="kicker mt-2 text-[0.55rem] text-sand-muted">{name}</p>
              <p className="mt-0.5 font-mono text-[0.65rem] muted">{hex}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Typographie */}
      <section className="rounded-[20px] bg-card p-8 md:p-10">
        <Kicker>Typographie · gabarit resserré</Kicker>
        <p className="display-1 mt-6">
          Le clienteling, <em className="italic text-brass">mesurable.</em>
        </p>
        <p className="display-2 mt-6">Une application, trois métiers.</p>
        <p className="lede mt-6 max-w-[58ch] muted">
          Instrument Serif porte les titres entiers, l'italique reste l'accent. Interlignage
          1.02, tracking légèrement négatif : le poids optique de la famille, servi par un
          serif éditorial.
        </p>
        <p className="kicker mt-6 text-brass">La boucle de valeur — 04 étapes</p>
      </section>

      {/* Panneau sombre : stats or */}
      <section className="panel dark-vignette on-dark p-8 md:p-12">
        <Kicker tone="dark">L&apos;or, réservé aux chiffres</Kicker>
        <div className="mt-8 grid gap-8 sm:grid-cols-3">
          <Stat value={4} label="Langues d'interface" />
          <Stat value={100} suffix=" %" label="Paramétrable sans développeur" />
          <Stat value={2} label="Types de CA, jamais additionnés" />
        </div>
      </section>

      {/* Tabs + accordéon inchangés (pages intérieures) */}
      <section className="rounded-[20px] bg-card p-8 md:p-10">
        <Kicker>Navigation interne</Kicker>
        <div className="mt-8 grid gap-12 lg:grid-cols-2">
          <Tabs
            items={[
              { label: "Rôles", content: <p className="max-w-[48ch] muted">Rôles et permissions se définissent depuis la console, au niveau de la donnée.</p> },
              { label: "Champs", content: <p className="max-w-[48ch] muted">Les champs de la fiche client s&apos;ajoutent et se réordonnent sans développeur.</p> },
              { label: "Attribution", content: <p className="max-w-[48ch] muted">Fenêtre, canaux, pondération : les règles du CA influencé sont à votre main.</p> },
            ]}
          />
          <Accordion
            defaultOpen={0}
            items={[
              { title: "Hauteur animée sans saccade", content: "Transition de grid-rows, easing unique du site." },
              { title: "Un seul volet ouvert", content: "Le précédent se referme quand un nouveau s'ouvre." },
            ]}
          />
        </div>
      </section>
    </div>
  );
}
