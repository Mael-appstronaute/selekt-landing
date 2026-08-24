import type { ReactNode } from "react";
import { Kicker } from "./Kicker";

type Tone = "cream" | "paper" | "dark";

const tones: Record<Tone, string> = {
  cream: "bg-cream text-ink",
  paper: "bg-paper text-ink",
  dark: "dark-vignette on-dark",
};

/**
 * Section de page — porte le rythme sombre chaud / crème du site.
 * La profondeur vient du contraste entre sections, pas des ombres.
 */
export function Section({
  tone = "cream",
  id,
  className = "",
  children,
  bleed = false,
}: {
  tone?: Tone;
  id?: string;
  className?: string;
  children: ReactNode;
  /** true = pas de padding horizontal (marquees, visuels pleine largeur) */
  bleed?: boolean;
}) {
  return (
    <section id={id} className={`${tones[tone]} ${className}`}>
      <div
        className={
          bleed
            ? "py-20 md:py-28"
            : "mx-auto max-w-[1200px] px-6 py-20 md:px-10 md:py-28"
        }
      >
        {children}
      </div>
    </section>
  );
}

/** En-tête de section : kicker mono → titre serif → lede courte. */
export function SectionHeader({
  kicker,
  title,
  lede,
  tone = "light",
  align = "left",
  className = "",
}: {
  kicker?: string;
  title: ReactNode;
  lede?: ReactNode;
  tone?: "light" | "dark";
  align?: "left" | "center";
  className?: string;
}) {
  const centered = align === "center";
  return (
    <header
      className={`max-w-[720px] ${centered ? "mx-auto text-center" : ""} ${className}`}
    >
      {kicker && (
        <div className={centered ? "flex justify-center" : ""}>
          <Kicker tone={tone} rule={!centered}>
            {kicker}
          </Kicker>
        </div>
      )}
      <h2 className="display-2 mt-5">{title}</h2>
      {lede && (
        <p className={`lede mt-6 ${tone === "dark" ? "muted-dark" : "muted"}`}>
          {lede}
        </p>
      )}
    </header>
  );
}
