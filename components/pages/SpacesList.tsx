import Link from "next/link";
import type { ComponentProps } from "react";
import type { HomeContent } from "@/content/home";
import { pagePath, type Locale } from "@/lib/routes";

/**
 * Les trois espaces — liste éditoriale purement typographique.
 * Numéral serif en contour, filets 1px, flèche en médaillon.
 * Aucune carte, aucun mockup : la précision typographique fait le travail.
 */
export function SpacesList({
  locale,
  content,
}: {
  locale: Locale;
  content: HomeContent["spaces"];
}) {
  return (
    <div className="border-b border-ink/14">
      {content.cards.map((space, i) => (
        <Link
          key={space.key}
          href={pagePath(space.key, locale) as ComponentProps<typeof Link>["href"]}
          className="group grid items-center gap-x-8 gap-y-3 border-t border-ink/14 py-9 no-underline md:py-11 lg:grid-cols-[90px_1.05fr_0.95fr_64px]"
        >
          {/* Numéral fantôme */}
          <span
            aria-hidden
            className="hidden font-serif text-[3.2rem] italic leading-none text-transparent transition-colors duration-300 ease-(--ease-lux) lg:block"
            style={{ WebkitTextStroke: "1px rgba(42, 34, 22, 0.35)" }}
          >
            0{i + 1}
          </span>

          <span className="block">
            <span className="kicker text-sand-muted">{space.kicker}</span>
            <span className="mt-2 block font-serif text-[1.7rem] leading-tight text-ink transition-transform duration-300 ease-(--ease-lux) group-hover:translate-x-1.5 md:text-[2rem]">
              {space.title}
            </span>
          </span>

          <span className="block max-w-[46ch] text-[0.95rem] leading-relaxed muted">
            {space.body}
          </span>

          {/* Flèche en médaillon */}
          <span
            aria-hidden
            className="hidden h-13 w-13 items-center justify-center justify-self-end rounded-full border border-ink/20 text-ink transition-[background-color,border-color,color] duration-300 ease-(--ease-lux) group-hover:border-ink group-hover:bg-ink group-hover:text-cream-2 lg:flex"
          >
            <svg
              viewBox="0 0 16 16"
              className="h-4 w-4"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.1"
            >
              <path d="M1.5 8h12M9 3.5 13.5 8 9 12.5" />
            </svg>
          </span>
        </Link>
      ))}
    </div>
  );
}
