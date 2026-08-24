import { Fragment } from "react";

/**
 * Rend une chaîne à convention *mot* en italique accentué —
 * laiton sur fond clair, sable sur fond sombre (DA §5).
 */
export function EmText({ text, tone = "light" }: { text: string; tone?: "light" | "dark" }) {
  const color = tone === "dark" ? "text-sand" : "text-brass";
  return (
    <>
      {text.split(/(\*[^*]+\*)/).map((seg, i) =>
        seg.startsWith("*") && seg.endsWith("*") ? (
          <em key={i} className={`italic ${color}`}>
            {seg.slice(1, -1)}
          </em>
        ) : (
          <Fragment key={i}>{seg}</Fragment>
        ),
      )}
    </>
  );
}
