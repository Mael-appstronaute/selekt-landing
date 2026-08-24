"use client";

import { motion, useReducedMotion } from "motion/react";
import { Fragment, type JSX } from "react";

const EASE_LUX = [0.22, 1, 0.36, 1] as const;

type Part = { text: string; italic: boolean };
type Word = Part[];

/**
 * Découpe « Le CA *influencé*, mesurable » en mots, *…* = italique sable.
 * La ponctuation collée à un segment italique reste soudée au mot
 * (« *doigts*. » ne devient jamais « doigts . »).
 */
function parse(text: string): Word[] {
  const words: Word[] = [];
  let current: Word = [];
  const flush = () => {
    if (current.length) words.push(current);
    current = [];
  };
  for (const segment of text.split(/(\*[^*]+\*)/)) {
    if (!segment) continue;
    const italic = segment.startsWith("*") && segment.endsWith("*");
    const clean = italic ? segment.slice(1, -1) : segment;
    for (const token of clean.split(/(\s+)/)) {
      if (!token) continue;
      if (/^\s+$/.test(token)) flush();
      else current.push({ text: token, italic });
    }
  }
  flush();
  return words;
}

/**
 * Titre révélé mot à mot — flou et translation légers, cascade douce.
 * Inspiration ReactBits blur-text / split-text, sans rebond.
 */
export function BlurTitle({
  text,
  as: Tag = "h1",
  className = "",
  delay = 0,
}: {
  text: string;
  as?: keyof JSX.IntrinsicElements;
  className?: string;
  delay?: number;
}) {
  const reduced = useReducedMotion();
  const words = parse(text);
  const plain = words.map((w) => w.map((p) => p.text).join("")).join(" ");

  return (
    <Tag className={className}>
      <span className="sr-only">{plain}</span>
      <span aria-hidden>
        {words.map((word, i) => (
          <Fragment key={i}>
            <motion.span
              className="inline-block"
              initial={reduced ? false : { opacity: 0, y: "0.35em", filter: "blur(6px)" }}
              animate={{ opacity: 1, y: "0em", filter: "blur(0px)" }}
              transition={{ duration: 0.6, ease: EASE_LUX, delay: delay + i * 0.055 }}
            >
              {word.map((part, j) =>
                part.italic ? (
                  <em key={j} className="italic text-sand">
                    {part.text}
                  </em>
                ) : (
                  <Fragment key={j}>{part.text}</Fragment>
                ),
              )}
            </motion.span>{" "}
          </Fragment>
        ))}
      </span>
    </Tag>
  );
}
