"use client";

import { AnimatePresence, motion } from "motion/react";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { cn } from "@/lib/cn";

export type LightboxItem = { key: string; label: string; thumb: ReactNode; full: ReactNode; className?: string };

/**
 * Galería en mosaico; cada pieza se abre en un visor a pantalla completa.
 * Teclado: Esc cierra, flechas navegan. El foco vuelve a la miniatura al cerrar.
 */
export function LightboxGallery({ items, className }: { items: LightboxItem[]; className?: string }) {
  const [open, setOpen] = useState<number | null>(null);
  const triggers = useRef<(HTMLButtonElement | null)[]>([]);
  const closeRef = useRef<HTMLButtonElement>(null);
  const lastOpened = useRef<number | null>(null);

  useEffect(() => {
    if (open === null) {
      if (lastOpened.current !== null) triggers.current[lastOpened.current]?.focus();
      return;
    }
    lastOpened.current = open;
    closeRef.current?.focus();
    document.documentElement.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(null);
      if (e.key === "ArrowRight") setOpen((i) => (i === null ? i : (i + 1) % items.length));
      if (e.key === "ArrowLeft") setOpen((i) => (i === null ? i : (i - 1 + items.length) % items.length));
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.documentElement.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open, items.length]);

  return (
    <>
      <ul className={className}>
        {items.map((item, i) => (
          <li key={item.key} className={item.className}>
            <button
              ref={(el) => {
                triggers.current[i] = el;
              }}
              type="button"
              onClick={() => setOpen(i)}
              aria-label={`Abrir ${item.label}`}
              className="group relative block w-full overflow-hidden rounded-[1.5rem]"
            >
              <span className="block transition-transform duration-700 ease-vink group-hover:scale-[1.04]">
                {item.thumb}
              </span>
              <span className="absolute inset-x-3 bottom-3 flex items-center justify-between rounded-full bg-cream/90 px-4 py-2 text-xs font-semibold uppercase tracking-wider text-charcoal opacity-100 transition-opacity md:opacity-0 md:group-hover:opacity-100 md:group-focus-visible:opacity-100">
                {item.label}
                <span aria-hidden>↗</span>
              </span>
            </button>
          </li>
        ))}
      </ul>

      <AnimatePresence>
        {open !== null && (
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label={items[open].label}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] flex items-center justify-center bg-charcoal/95 p-4 md:p-10"
            onClick={(e) => e.target === e.currentTarget && setOpen(null)}
          >
            <motion.div
              key={items[open].key}
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              className={cn("w-full overflow-hidden rounded-[1.5rem]", "max-h-[85vh] max-w-[min(90vw,28rem)]")}
            >
              {items[open].full}
            </motion.div>

            <button
              ref={closeRef}
              type="button"
              onClick={() => setOpen(null)}
              aria-label="Cerrar"
              className="absolute right-4 top-4 inline-flex size-12 items-center justify-center rounded-full bg-cream text-xl text-charcoal md:right-8 md:top-8"
            >
              ×
            </button>
            <button
              type="button"
              onClick={() => setOpen((open - 1 + items.length) % items.length)}
              aria-label="Anterior"
              className="absolute left-3 top-1/2 inline-flex size-12 -translate-y-1/2 items-center justify-center rounded-full bg-cream/15 text-cream hover:bg-cream/25 md:left-8"
            >
              ←
            </button>
            <button
              type="button"
              onClick={() => setOpen((open + 1) % items.length)}
              aria-label="Siguiente"
              className="absolute right-3 top-1/2 inline-flex size-12 -translate-y-1/2 items-center justify-center rounded-full bg-cream/15 text-cream hover:bg-cream/25 md:right-8"
            >
              →
            </button>
            <p className="absolute bottom-6 left-1/2 -translate-x-1/2 text-sm text-cream/70">
              {open + 1} / {items.length} · {items[open].label}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
