import type { ReactNode } from "react";
import { CountUp } from "../fx/CountUp";

/**
 * Chiffre clé — l'un des rares emplois autorisés de l'or, sur fond sombre.
 */
export function Stat({
  value,
  prefix,
  suffix,
  label,
  locale = "fr",
  decimals = 0,
}: {
  value: number;
  prefix?: string;
  suffix?: string;
  label: ReactNode;
  locale?: "fr" | "en";
  decimals?: number;
}) {
  return (
    <div className="border-l border-sand/20 pl-6">
      <p className="font-serif text-[clamp(2.2rem,3.6vw,3.2rem)] leading-none text-gold">
        {prefix}
        <CountUp value={value} locale={locale} decimals={decimals} />
        {suffix}
      </p>
      <p className="kicker mt-4 text-sand-muted">{label}</p>
    </div>
  );
}
