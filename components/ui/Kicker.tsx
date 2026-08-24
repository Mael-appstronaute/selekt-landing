import type { ReactNode } from "react";

export function Kicker({
  children,
  tone = "light",
  rule = true,
  className = "",
}: {
  children: ReactNode;
  /** light = sur fond crème, dark = sur fond sombre */
  tone?: "light" | "dark";
  rule?: boolean;
  className?: string;
}) {
  return (
    <p
      className={`kicker flex items-center gap-3 ${
        tone === "dark" ? "text-sand" : "text-sand-muted"
      } ${className}`}
    >
      {rule && (
        <span aria-hidden className="inline-block h-3 w-px bg-current opacity-60" />
      )}
      {children}
    </p>
  );
}
