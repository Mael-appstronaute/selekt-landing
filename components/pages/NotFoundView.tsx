import { pagePath, type Locale } from "@/lib/routes";
import { ThreadsBackground } from "../fx/ThreadsBackground";
import { Button } from "../ui/Button";
import { Kicker } from "../ui/Kicker";

const COPY: Record<Locale, { kicker: string; title: string; body: string; cta: string }> = {
  fr: {
    kicker: "Erreur 404",
    title: "Cette page n'existe pas.",
    body: "L'adresse a peut-être changé avec la refonte du site. Le plus court chemin repart de l'accueil.",
    cta: "Retour à l'accueil",
  },
  en: {
    kicker: "Error 404",
    title: "This page does not exist.",
    body: "The address may have changed with the site's redesign. The shortest way back starts from the home page.",
    cta: "Back to home",
  },
};

export function NotFoundView({ locale }: { locale: Locale }) {
  const copy = COPY[locale];
  return (
    <div className="mx-auto max-w-[1272px] px-4 pb-6 pt-[92px] md:px-8 md:pb-8">
      <section className="panel on-dark relative bg-void-2">
        <div className="absolute inset-0">
          <ThreadsBackground />
        </div>
        <div
          aria-hidden
          className="absolute inset-0 bg-gradient-to-t from-void/70 via-void/35 to-void-warm/20"
        />
        <div className="relative z-10 flex min-h-[62vh] flex-col items-center justify-center p-8 text-center">
          <Kicker tone="dark" rule={false} className="text-cream-2/90">
            {copy.kicker}
          </Kicker>
          <p aria-hidden className="mt-5 font-serif text-[clamp(5rem,13vw,10rem)] leading-none">
            4<em className="italic text-sand">0</em>4
          </p>
          <h1 className="title-1 mt-5">{copy.title}</h1>
          <p className="lede muted-dark mx-auto mt-3 max-w-[46ch]">{copy.body}</p>
          <div className="mt-9">
            <Button href={pagePath("home", locale)} variant="primary-inverse">
              {copy.cta}
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
