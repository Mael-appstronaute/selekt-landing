import type { LegalContent } from "@/content/legal";
import { EmText } from "../ui/EmText";
import { Kicker } from "../ui/Kicker";

export function LegalPage({ content }: { content: LegalContent }) {
  return (
    <div className="mx-auto flex max-w-[1272px] flex-col gap-6 px-4 pb-8 pt-[92px] md:px-8">
      <header className="py-10 md:py-14">
        <Kicker>{content.kicker}</Kicker>
        <h1 className="display-2 mt-4">
          <EmText text={content.title} />
        </h1>
      </header>
      <section className="max-w-[820px] rounded-[20px] bg-card p-7 md:p-10">
        {content.sections.map((section, i) => (
          <div key={section.title} className={i === 0 ? "" : "mt-10"}>
            <h2 className="title-1 border-t border-ink/12 pt-6">{section.title}</h2>
            {section.paragraphs.map((paragraph, j) => (
              <p key={j} className="mt-4 text-[0.96rem] leading-relaxed muted">
                {paragraph}
              </p>
            ))}
          </div>
        ))}
      </section>
    </div>
  );
}
