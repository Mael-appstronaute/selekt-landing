"use client";

import { useId, useState, type ReactNode } from "react";

export type AccordionItem = { title: ReactNode; content: ReactNode };

/**
 * Accordéon sobre — hauteur animée sans saccade via grid-rows,
 * chevron fin qui pivote. Un seul volet ouvert à la fois.
 */
export function Accordion({
  items,
  tone = "light",
  className = "",
  defaultOpen = -1,
}: {
  items: AccordionItem[];
  tone?: "light" | "dark";
  className?: string;
  defaultOpen?: number;
}) {
  const [open, setOpen] = useState(defaultOpen);
  const id = useId();
  const border = tone === "dark" ? "border-sand/16" : "border-ink/14";
  const text = tone === "dark" ? "text-on-void" : "text-ink";
  const body = tone === "dark" ? "muted-dark" : "muted";

  return (
    <div className={`border-t ${border} ${className}`}>
      {items.map((item, i) => {
        const isOpen = i === open;
        return (
          <div key={i} className={`border-b ${border}`}>
            <h3>
              <button
                id={`${id}-h-${i}`}
                aria-expanded={isOpen}
                aria-controls={`${id}-p-${i}`}
                onClick={() => setOpen(isOpen ? -1 : i)}
                className={`group flex w-full cursor-pointer items-center justify-between gap-6 py-5 text-left font-serif text-[1.2rem] leading-snug ${text}`}
              >
                <span className="transition-transform duration-300 ease-(--ease-lux) group-hover:translate-x-1">
                  {item.title}
                </span>
                <svg
                  aria-hidden
                  viewBox="0 0 12 12"
                  className={`h-3 w-3 shrink-0 transition-transform duration-300 ease-(--ease-lux) group-hover:scale-125 ${
                    isOpen ? "rotate-45" : ""
                  } ${tone === "dark" ? "text-sand" : "text-brass"}`}
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1"
                >
                  <path d="M6 1v10M1 6h10" />
                </svg>
              </button>
            </h3>
            <div
              id={`${id}-p-${i}`}
              role="region"
              aria-labelledby={`${id}-h-${i}`}
              className="grid transition-[grid-template-rows] duration-300 ease-(--ease-lux)"
              style={{ gridTemplateRows: isOpen ? "1fr" : "0fr" }}
            >
              <div className="overflow-hidden">
                <div className={`pb-6 text-[0.96rem] ${body}`}>{item.content}</div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
