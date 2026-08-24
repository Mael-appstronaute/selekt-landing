import type { ReactNode } from "react";

/**
 * Marquee très lent — bandeau mono (langues, capacités).
 * Jamais de logos clients inventés. Coupé par prefers-reduced-motion (globals).
 */
export function Marquee({
  items,
  tone = "dark",
  className = "",
}: {
  items: ReactNode[];
  tone?: "light" | "dark";
  className?: string;
}) {
  const color = tone === "dark" ? "text-sand-muted" : "text-brass";
  const row = (hidden: boolean) => (
    <div aria-hidden={hidden} className="flex shrink-0 items-center">
      {items.map((item, i) => (
        <span key={i} className={`kicker flex items-center whitespace-nowrap ${color}`}>
          <span className="px-8">{item}</span>
          <span aria-hidden className="text-gold/60">
            ·
          </span>
        </span>
      ))}
    </div>
  );

  return (
    <div className={`overflow-hidden ${className}`}>
      <div className="marquee-track">
        {row(false)}
        {row(true)}
      </div>
    </div>
  );
}
