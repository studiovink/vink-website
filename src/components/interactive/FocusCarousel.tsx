"use client";

import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useEffect, useState, type ReactNode } from "react";
import { cn } from "@/lib/cn";

export type FocusItem = { key: string; title: string; text: string; media: ReactNode };

const ease = [0.22, 1, 0.36, 1] as const;

/**
 * Carrusel con foco central: la imagen activa crece, aparecen escuadras en
 * sus esquinas y su texto debajo; las demás se acomodan a los lados.
 * Avanza solo (salvo movimiento reducido), con flechas, teclado, clic y deslizamiento.
 */
export function FocusCarousel({ items, interval = 4500 }: { items: FocusItem[]; interval?: number }) {
  const reduce = useReducedMotion();
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const n = items.length;

  useEffect(() => {
    if (reduce || paused) return;
    const t = setTimeout(() => setActive((a) => (a + 1) % n), interval);
    return () => clearTimeout(t);
  }, [active, paused, reduce, n, interval]);

  const go = (d: number) => setActive((a) => (a + d + n) % n);
  // Ventana circular de 5 posiciones alrededor de la activa
  const slots = [-2, -1, 0, 1, 2].map((offset) => ({ offset, item: items[(active + offset + n) % n], index: (active + offset + n) % n }));
  const current = items[active];

  return (
    <div
      role="region"
      aria-roledescription="carrusel"
      aria-label="Para quién trabajamos"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "ArrowRight") go(1);
        if (e.key === "ArrowLeft") go(-1);
      }}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
      className="outline-none"
    >
      <motion.div
        className="flex h-[min(70vw,34rem)] items-center justify-center gap-2 overflow-hidden md:gap-3"
        onPanEnd={(_, info) => {
          if (Math.abs(info.offset.x) > 50) go(info.offset.x < 0 ? 1 : -1);
        }}
      >
        {slots.map(({ offset, item, index }) => {
          const isActive = offset === 0;
          return (
            <motion.button
              key={item.key}
              type="button"
              layout
              transition={{ duration: reduce ? 0 : 0.8, ease }}
              onClick={() => setActive(index)}
              aria-label={isActive ? item.title : `Ver ${item.title}`}
              aria-current={isActive}
              className={cn(
                "relative shrink-0",
                isActive ? "z-10 w-[min(70vw,30rem)]" : "w-[min(20vw,15rem)] opacity-70 hover:opacity-100",
                Math.abs(offset) === 2 && "hidden sm:block",
              )}
            >
              <motion.div layout className={cn("relative overflow-hidden", "aspect-square")}>
                {item.media}
              </motion.div>
              {isActive && (
                <>
                  <motion.span
                    aria-hidden
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                    className="absolute -right-2 -top-2 size-3 border-r border-t border-current"
                  />
                  <motion.span
                    aria-hidden
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                    className="absolute -bottom-2 -left-2 size-3 border-b border-l border-current"
                  />
                </>
              )}
            </motion.button>
          );
        })}
      </motion.div>

      <div className="mx-auto mt-8 flex max-w-[30rem] items-start justify-between gap-6 px-5 md:max-w-[min(62vw,30rem)] md:px-0">
        <div aria-live="polite" className="min-h-24">
          <AnimatePresence mode="wait">
            <motion.div
              key={current.key}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.4 }}
            >
              <p className="text-sm font-semibold uppercase tracking-[0.04em]">{current.title}</p>
              <p className="mt-2 max-w-sm text-sm leading-relaxed opacity-65">{current.text}</p>
            </motion.div>
          </AnimatePresence>
        </div>
        <div className="flex shrink-0 gap-2">
          <button type="button" onClick={() => go(-1)} aria-label="Anterior" className="inline-flex size-10 items-center justify-center rounded-full border border-current/30 transition-colors hover:border-current">
            ←
          </button>
          <button type="button" onClick={() => go(1)} aria-label="Siguiente" className="inline-flex size-10 items-center justify-center rounded-full border border-current/30 transition-colors hover:border-current">
            →
          </button>
        </div>
      </div>
    </div>
  );
}
