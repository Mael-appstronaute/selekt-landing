import { Button } from "../ui/Button";
import { Reveal } from "../fx/Reveal";
import { pagePath, type Locale } from "@/lib/routes";

const COPY: Record<Locale, { kicker: string; title: React.ReactNode; lede: string; cta: string }> = {
  fr: {
    kicker: "Demander une démo",
    title: (
      <>
        Découvrez Selekt directement avec <em className="italic text-sand">vos</em> cas d&apos;usage.
      </>
    ),
    lede: "Une démonstration guidée, adaptée à votre réseau de boutiques. Sans engagement.",
    cta: "Demander une démo",
  },
  en: {
    kicker: "Request a demo",
    title: (
      <>
        Discover Selekt directly with <em className="italic text-sand">your</em> use cases.
      </>
    ),
    lede: "A guided demonstration, tailored to your boutique network. No commitment.",
    cta: "Request a demo",
  },
};

/** Panneau de conversion final — présent sur chaque page intérieure. */
export function DemoCta({ locale }: { locale: Locale }) {
  const copy = COPY[locale];
  return (
    <Reveal>
      <section className="panel dark-vignette on-dark relative overflow-hidden">
        <div aria-hidden className="hero-halo opacity-50" />
        <div className="relative z-10 flex min-h-[380px] flex-col items-center justify-center p-8 text-center md:min-h-[420px]">
          <p className="kicker text-sand-muted">{copy.kicker}</p>
          <h2 className="display-2 mx-auto mt-5 max-w-[20ch]">{copy.title}</h2>
          <p className="lede muted-dark mx-auto mt-5 max-w-[46ch]">{copy.lede}</p>
          <div className="mt-9">
            <Button href={pagePath("demo", locale)} variant="primary-inverse" size="lg">
              {copy.cta}
            </Button>
          </div>
        </div>
      </section>
    </Reveal>
  );
}
