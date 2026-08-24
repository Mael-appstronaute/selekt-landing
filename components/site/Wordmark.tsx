/**
 * Wordmark « Sel*e*kt » — le e central en italique accentué (brief §5) :
 * sable sur fond sombre, laiton sur fond clair pour le contraste.
 * Logo bordeaux à intégrer plus tard, quand le fichier sera fourni.
 */
export function Wordmark({
  className = "",
  accent = "sand",
}: {
  className?: string;
  accent?: "sand" | "brass";
}) {
  return (
    <span className={`font-serif leading-none tracking-tight ${className}`}>
      Sel
      <em className={`italic ${accent === "brass" ? "text-brass" : "text-sand"}`}>e</em>
      kt
    </span>
  );
}
