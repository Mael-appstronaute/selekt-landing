/**
 * Motif signature — chip épinglée sur la photo, ondes d'attribution
 * concentriques or très discrètes (écho de la boucle de valeur).
 * Les ondes disparaissent sous prefers-reduced-motion (globals.css).
 */
export function RippleChip({
  label,
  index,
  className = "",
}: {
  label: string;
  /** numéro affiché dans la pastille (1, 2, 3…) */
  index?: number;
  className?: string;
}) {
  return (
    <div className={`absolute ${className}`}>
      <div className="relative flex items-center gap-2.5">
        <span className="relative flex h-7 w-7 shrink-0 items-center justify-center">
          <span aria-hidden className="ripple-ring" />
          <span aria-hidden className="ripple-ring" />
          <span className="relative flex h-7 w-7 items-center justify-center rounded-full bg-cream-2 font-mono text-[0.62rem] font-medium text-ink">
            {index ?? "·"}
          </span>
        </span>
        <span className="rounded-full border border-sand/25 bg-void/60 px-3.5 py-1.5 text-[0.78rem] text-cream-2 backdrop-blur-sm">
          {label}
        </span>
      </div>
    </div>
  );
}
