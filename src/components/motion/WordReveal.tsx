"use client";

import { motion, useReducedMotion, useScroll, useTransform, type MotionValue } from "motion/react";
import { useRef } from "react";
import { cn } from "@/lib/cn";

type WordRevealProps = {
  /** Texto siempre visible al inicio. */
  lead?: string;
  /** Texto que se ilumina palabra por palabra con el scroll. */
  text: string;
  as?: "h2" | "p";
  className?: string;
  leadClassName?: string;
  /** Color final de las palabras reveladas. */
  wordClassName?: string;
};

/** Texto gigante que se "enciende" palabra por palabra al hacer scroll. */
export function WordReveal({
  lead,
  text,
  as: Tag = "h2",
  className,
  leadClassName,
  wordClassName,
}: WordRevealProps) {
  const ref = useRef<HTMLHeadingElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.85", "end 0.45"] });
  const words = text.split(" ");

  return (
    <Tag ref={ref} className={className}>
      {lead && <span className={leadClassName}>{lead} </span>}
      {words.map((word, i) =>
        reduce ? (
          <span key={i} className={wordClassName}>
            {word}{" "}
          </span>
        ) : (
          <Word
            key={i}
            progress={scrollYProgress}
            range={[i / words.length, (i + 1) / words.length]}
            className={wordClassName}
          >
            {word}
          </Word>
        ),
      )}
    </Tag>
  );
}

function Word({
  children,
  progress,
  range,
  className,
}: {
  children: string;
  progress: MotionValue<number>;
  range: [number, number];
  className?: string;
}) {
  const opacity = useTransform(progress, range, [0.28, 1]);
  return (
    <motion.span style={{ opacity }} className={cn("inline", className)}>
      {children}{" "}
    </motion.span>
  );
}
