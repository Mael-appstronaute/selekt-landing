import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";
import { Arrow } from "./Button";

/**
 * Carte éditoriale — filet 1px, fond off-white chaud (ou void-2 sur sombre).
 * Aucune ombre : au survol, le filet se réchauffe et la carte se soulève à peine.
 */
export function Card({
  tone = "light",
  className = "",
  children,
  interactive = false,
}: {
  tone?: "light" | "dark";
  className?: string;
  children: ReactNode;
  interactive?: boolean;
}) {
  const surface =
    tone === "dark"
      ? "border-sand/16 bg-void-2 text-on-void"
      : "border-ink/14 bg-card text-ink";
  const hover = interactive
    ? tone === "dark"
      ? "transition-[border-color,transform] duration-300 ease-(--ease-lux) hover:-translate-y-0.5 hover:border-gold/50"
      : "transition-[border-color,transform] duration-300 ease-(--ease-lux) hover:-translate-y-0.5 hover:border-brass/60"
    : "";
  return (
    <div className={`rounded-md border p-7 md:p-8 ${surface} ${hover} ${className}`}>
      {children}
    </div>
  );
}

/** Carte-lien complète (grilles de capacités, sous-pages plateforme). */
export function CardLink({
  href,
  kicker,
  title,
  children,
  tone = "light",
  cta,
  className = "",
}: {
  href: string;
  kicker?: string;
  title: ReactNode;
  children?: ReactNode;
  tone?: "light" | "dark";
  cta?: string;
  className?: string;
}) {
  const surface =
    tone === "dark"
      ? "border-sand/16 bg-void-2 text-on-void hover:border-gold/50"
      : "border-ink/14 bg-card text-ink hover:border-brass/60";
  return (
    <Link
      href={href as ComponentProps<typeof Link>["href"]}
      className={`group block rounded-md border p-7 no-underline transition-[border-color,transform] duration-300 ease-(--ease-lux) hover:-translate-y-0.5 md:p-8 ${surface} ${className}`}
    >
      {kicker && (
        <p className={`kicker ${tone === "dark" ? "text-sand" : "text-sand-muted"}`}>
          {kicker}
        </p>
      )}
      <h3 className="title-1 mt-3">{title}</h3>
      {children && (
        <div className={`mt-3 text-[0.95rem] ${tone === "dark" ? "muted-dark" : "muted"}`}>
          {children}
        </div>
      )}
      {cta && (
        <span
          className={`link-quiet mt-6 ${tone === "dark" ? "text-sand" : "text-brass"}`}
        >
          {cta}
          <Arrow className="transition-transform duration-300 ease-(--ease-lux) group-hover:translate-x-1" />
        </span>
      )}
    </Link>
  );
}
