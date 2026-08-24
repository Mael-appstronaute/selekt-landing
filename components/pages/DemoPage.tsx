import { DEMO } from "@/content/demo";
import type { Locale } from "@/lib/routes";
import { JsonLd, organizationJsonLd } from "@/lib/seo";
import { Reveal } from "../fx/Reveal";
import { DemoForm } from "../site/DemoForm";
import { PageHero } from "../site/PageHero";

export function DemoPage({ locale }: { locale: Locale }) {
  const c = DEMO[locale];
  return (
    <>
      <JsonLd data={organizationJsonLd()} />

      <div className="mx-auto flex max-w-[1272px] flex-col gap-5 px-4 pb-6 pt-[92px] md:gap-6 md:px-8 md:pb-8">
        <PageHero
          kicker={c.hero.kicker}
          title={c.hero.title}
          lede={c.hero.lede}
          locale={locale}
        />

        <Reveal>
          <section className="grid gap-10 py-8 md:py-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-14">
            <div>
              <h2 className="title-1">{c.aside.title}</h2>
              <div className="mt-7 space-y-7">
                {c.aside.points.map((point, i) => (
                  <div key={point.title} className="border-t border-ink/12 pt-5">
                    <p className="kicker text-sand-muted">{String(i + 1).padStart(2, "0")}</p>
                    <h3 className="mt-2 font-serif text-[1.25rem]">{point.title}</h3>
                    <p className="mt-2 text-[0.94rem] muted">{point.body}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative">
              <DemoForm locale={locale} copy={c.form} />
            </div>
          </section>
        </Reveal>
      </div>
    </>
  );
}
