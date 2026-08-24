"use client";

import { motion } from "motion/react";
import { useId, useRef, useState, type ReactNode } from "react";

const EASE_LUX = [0.22, 1, 0.36, 1] as const;

export type TabItem = { label: string; content: ReactNode };

/**
 * Onglets éditoriaux — l'onglet actif porte le filet d'or 1px (usage
 * autorisé de l'or par le brief). Navigation clavier flèches/Home/End.
 */
export function Tabs({
  items,
  tone = "light",
  className = "",
}: {
  items: TabItem[];
  tone?: "light" | "dark";
  className?: string;
}) {
  const [active, setActive] = useState(0);
  const id = useId();
  const refs = useRef<(HTMLButtonElement | null)[]>([]);

  function onKeyDown(e: React.KeyboardEvent) {
    const last = items.length - 1;
    let next: number | null = null;
    if (e.key === "ArrowRight") next = active === last ? 0 : active + 1;
    else if (e.key === "ArrowLeft") next = active === 0 ? last : active - 1;
    else if (e.key === "Home") next = 0;
    else if (e.key === "End") next = last;
    if (next !== null) {
      e.preventDefault();
      setActive(next);
      refs.current[next]?.focus();
    }
  }

  const border = tone === "dark" ? "border-sand/16" : "border-ink/14";
  const idle = tone === "dark" ? "text-on-void/60 hover:text-on-void" : "text-ink/55 hover:text-ink";
  const activeColor = tone === "dark" ? "text-on-void" : "text-ink";

  return (
    <div className={className}>
      <div
        role="tablist"
        onKeyDown={onKeyDown}
        className={`flex flex-wrap gap-x-7 gap-y-1 border-b ${border}`}
      >
        {items.map((item, i) => {
          const selected = i === active;
          return (
            <button
              key={i}
              ref={(el) => {
                refs.current[i] = el;
              }}
              role="tab"
              id={`${id}-tab-${i}`}
              aria-selected={selected}
              aria-controls={`${id}-panel-${i}`}
              tabIndex={selected ? 0 : -1}
              onClick={() => setActive(i)}
              className={`kicker relative -mb-px cursor-pointer pb-4 pt-1 transition-colors duration-300 ease-(--ease-lux) ${
                selected ? activeColor : idle
              }`}
            >
              {item.label}
              {selected && (
                <motion.span
                  layoutId={`${id}-underline`}
                  aria-hidden
                  className="absolute inset-x-0 bottom-0 h-px bg-gold"
                  transition={{ duration: 0.3, ease: EASE_LUX }}
                />
              )}
            </button>
          );
        })}
      </div>
      {items.map((item, i) => (
        <div
          key={i}
          role="tabpanel"
          id={`${id}-panel-${i}`}
          aria-labelledby={`${id}-tab-${i}`}
          hidden={i !== active}
          className="pt-8"
        >
          {i === active && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, ease: EASE_LUX }}
            >
              {item.content}
            </motion.div>
          )}
        </div>
      ))}
    </div>
  );
}
