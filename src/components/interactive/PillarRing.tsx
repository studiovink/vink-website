"use client";

import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useEffect, useState } from "react";
import { cn } from "@/lib/cn";

type Item = { n: string; title: string; subtitle: string; text: string };

const DURATION = 5500;
const R = 47;
const C = 2 * Math.PI * R;

/**
 * Círculo con anillo de progreso que recorre los pilares de VINK.
 * Avanza solo (salvo movimiento reducido), se pausa al pasar el cursor o
 * enfocar, y se controla con botones y flechas del teclado.
 */
export function PillarRing({ items }: { items: Item[] }) {
  const reduce = useReducedMotion();
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const auto = !reduce && !paused;

  useEffect(() => {
    if (!auto) return;
    const t = setTimeout(() => setIndex((i) => (i + 1) % items.length), DURATION);
    return () => clearTimeout(t);
  }, [auto, index, items.length]);

  const go = (d: number) => setIndex((i) => (i + d + items.length) % items.length);
  const item = items[index];
  // Fracción del anillo que representa el pilar actual
  const segment = (index + 1) / items.length;

  return (
    <div
      className="relative mx-auto w-full max-w-[34rem]"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
      onKeyDown={(e) => {
        if (e.key === "ArrowRight") go(1);
        if (e.key === "ArrowLeft") go(-1);
      }}
      role="region"
      aria-roledescription="carrusel"
      aria-label="Los cuatro pilares de VINK"
    >
      <div className="relative aspect-square">
        <svg viewBox="0 0 100 100" className="absolute inset-0 size-full -rotate-90" aria-hidden>
          <circle cx="50" cy="50" r={R} fill="none" stroke="currentColor" strokeWidth="1.6" className="text-cream/15" />
          <motion.circle
            cx="50"
            cy="50"
            r={R}
            fill="none"
            strokeWidth="1.6"
            strokeLinecap="round"
            className="stroke-rose"
            strokeDasharray={C}
            initial={false}
            animate={{ strokeDashoffset: C * (1 - segment) }}
            transition={{ duration: reduce ? 0 : 0.9, ease: [0.22, 1, 0.36, 1] }}
          />
        </svg>

        <div className="absolute inset-[14%] flex flex-col items-center justify-center text-center" aria-live="polite">
          <AnimatePresence mode="wait">
            <motion.div
              key={item.n}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.45 }}
            >
              <p className="display text-5xl text-cream/35 md:text-6xl">{item.n}</p>
              <h3 className="display mt-3 text-4xl text-cream md:text-5xl">{item.title}</h3>
              <p className="mt-2 text-sm font-semibold uppercase tracking-[0.16em] text-rose">
                {item.subtitle}
              </p>
              <p className="mx-auto mt-4 max-w-xs text-sm text-cream/75 md:text-base">{item.text}</p>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      <div className="mt-6 flex items-center justify-center gap-4">
        <RoundButton label="Pilar anterior" onClick={() => go(-1)}>
          ←
        </RoundButton>
        <div className="flex gap-2">
          {items.map((it, i) => (
            <button
              key={it.n}
              type="button"
              aria-label={`Ver pilar ${it.n}: ${it.title}`}
              aria-current={i === index}
              onClick={() => setIndex(i)}
              className="flex size-6 items-center justify-center"
            >
              <span
                className={cn(
                  "block h-1.5 rounded-full transition-all duration-500",
                  i === index ? "w-6 bg-rose" : "w-1.5 bg-cream/30",
                )}
              />
            </button>
          ))}
        </div>
        <RoundButton label="Siguiente pilar" onClick={() => go(1)}>
          →
        </RoundButton>
      </div>
    </div>
  );
}

function RoundButton({
  label,
  onClick,
  children,
}: {
  label: string;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      aria-label={label}
      onClick={onClick}
      className="inline-flex size-11 items-center justify-center rounded-full bg-cream text-charcoal transition-transform hover:scale-105"
    >
      {children}
    </button>
  );
}
