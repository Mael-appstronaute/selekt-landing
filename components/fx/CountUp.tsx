"use client";

import { animate, useInView, useReducedMotion } from "motion/react";
import { useEffect, useRef } from "react";

const EASE_LUX = [0.22, 1, 0.36, 1] as const;

/**
 * Chiffre qui s'incrémente à la révélation — réservé aux chiffres clés.
 * Inspiration ReactBits count-up, formatage selon la locale.
 */
export function CountUp({
  value,
  locale = "fr",
  decimals = 0,
  duration = 1.6,
  className = "",
}: {
  value: number;
  locale?: "fr" | "en";
  decimals?: number;
  duration?: number;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -60px 0px" });
  const reduced = useReducedMotion();
  const intl = locale === "fr" ? "fr-FR" : "en-US";

  useEffect(() => {
    const node = ref.current;
    if (!node || !inView) return;
    if (reduced) {
      node.textContent = value.toLocaleString(intl, {
        minimumFractionDigits: decimals,
        maximumFractionDigits: decimals,
      });
      return;
    }
    const controls = animate(0, value, {
      duration,
      ease: EASE_LUX,
      onUpdate: (v) => {
        node.textContent = v.toLocaleString(intl, {
          minimumFractionDigits: decimals,
          maximumFractionDigits: decimals,
        });
      },
    });
    return () => controls.stop();
  }, [inView, value, duration, decimals, intl, reduced]);

  return (
    <span ref={ref} className={className}>
      {(0).toLocaleString(intl, {
        minimumFractionDigits: decimals,
        maximumFractionDigits: decimals,
      })}
    </span>
  );
}
