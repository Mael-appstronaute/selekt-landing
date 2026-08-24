import { pagePath, type Locale } from "@/lib/routes";
import { BlurTitle } from "../fx/BlurTitle";
import {
  AuroraBackground,
  BeamsBackground,
  DotGridBackground,
  ParticlesBackground,
  RaysBackground,
  WavesBackground,
} from "../fx/HeroBackgrounds";
import { Reveal } from "../fx/Reveal";
import { SilkBackground } from "../fx/SilkBackground";
import { ThreadsBackground } from "../fx/ThreadsBackground";
import { Arrow, Button } from "../ui/Button";
import { Kicker } from "../ui/Kicker";

/** Fonds disponibles — tous dans la palette du héros de la home. */
export type HeroBg =
  | "threads"
  | "particles"
  | "waves"
  | "dotgrid"
  | "aurora"
  | "rays"
  | "beams"
  | "silk";

const BACKGROUNDS: Record<HeroBg, React.ComponentType<{ className?: string }>> = {
  threads: ThreadsBackground,
  particles: ParticlesBackground,
  waves: WavesBackground,
  dotgrid: DotGridBackground,
  aurora: AuroraBackground,
  rays: RaysBackground,
  beams: BeamsBackground,
  silk: SilkBackground,
};

/**
 * Héros de page intérieure — panneau flottant, texte centré au milieu
 * (même posture que le héros de la home), un fond par page (ports
 * reactbits), mêmes couleurs partout.
 */
export function PageHero({
  kicker,
  title,
  lede,
  locale,
  demoLabel,
  secondary,
  bg = "threads",
}: {
  kicker: string;
  title: string;
  lede: string;
  locale: Locale;
  /** label du CTA démo — s'il est absent, pas de boutons */
  demoLabel?: string;
  secondary?: { label: string; href: string };
  bg?: HeroBg;
}) {
  const Background = BACKGROUNDS[bg];
  return (
    <section className="panel on-dark relative min-h-[460px] bg-void-2 md:min-h-[520px]">
      <div className="absolute inset-0">
        <Background />
      </div>
      <div
        aria-hidden
        className="absolute inset-0 bg-gradient-to-t from-void/55 via-void/15 to-transparent"
      />
      <div className="relative z-10 flex min-h-[460px] flex-col items-center justify-center p-7 py-16 text-center md:min-h-[520px] md:p-12 md:py-20">
        <Kicker tone="dark" rule={false} className="text-cream-2/90">
          {kicker}
        </Kicker>
        <BlurTitle text={title} className="display-1 mx-auto mt-5 max-w-[18ch]" />
        <Reveal delay={0.3}>
          <p className="lede muted-dark mx-auto mt-6 max-w-[50ch]">{lede}</p>
          {demoLabel && (
            <div className="mt-9 flex flex-wrap justify-center gap-3.5">
              <Button href={pagePath("demo", locale)} variant="primary-inverse">
                {demoLabel}
              </Button>
              {secondary && (
                <Button href={secondary.href} variant="outline-dark">
                  {secondary.label} <Arrow />
                </Button>
              )}
            </div>
          )}
        </Reveal>
      </div>
    </section>
  );
}
