"use client";

import { AnimatePresence, motion } from "motion/react";
import { useId, useState, type ReactNode } from "react";
import { cn } from "@/lib/cn";

export type SwitcherItem = { key: string; label: string; media: ReactNode };

/**
 * Pestañas que cambian la imagen principal (aplicaciones de marca:
 * tarjetas, etiquetas, empaques…). Funciona con clic, toque y teclado.
 */
export function MediaSwitcher({ items, tone = "light" }: { items: SwitcherItem[]; tone?: "light" | "dark" }) {
  const [active, setActive] = useState(items[0].key);
  const id = useId();
  const current = items.find((i) => i.key === active) ?? items[0];

  const onKey = (e: React.KeyboardEvent, index: number) => {
    const d = e.key === "ArrowRight" || e.key === "ArrowDown" ? 1 : e.key === "ArrowLeft" || e.key === "ArrowUp" ? -1 : 0;
    if (!d) return;
    e.preventDefault();
    const next = items[(index + d + items.length) % items.length];
    setActive(next.key);
    document.getElementById(`${id}-tab-${next.key}`)?.focus();
  };

  return (
    <div className="grid gap-6 lg:grid-cols-12 lg:items-center">
      <div role="tablist" aria-orientation="vertical" className="flex gap-2 overflow-x-auto pb-1 lg:col-span-4 lg:flex-col lg:overflow-visible">
        {items.map((item, i) => {
          const selected = item.key === active;
          return (
            <button
              key={item.key}
              id={`${id}-tab-${item.key}`}
              role="tab"
              type="button"
              aria-selected={selected}
              aria-controls={`${id}-panel`}
              tabIndex={selected ? 0 : -1}
              onClick={() => setActive(item.key)}
              onKeyDown={(e) => onKey(e, i)}
              className={cn(
                "group flex shrink-0 items-center gap-4 rounded-full px-5 py-3 text-left transition-colors lg:rounded-2xl lg:py-4",
                tone === "dark"
                  ? selected ? "bg-cream text-burgundy" : "bg-white/10 text-cream hover:bg-white/15"
                  : selected ? "bg-burgundy text-cream" : "bg-burgundy/8 text-burgundy hover:bg-burgundy/15",
              )}
            >
              <span className="hidden text-xs opacity-60 lg:inline">(0{i + 1})</span>
              <span className="display text-lg leading-none lg:text-2xl">{item.label}</span>
            </button>
          );
        })}
      </div>

      <div id={`${id}-panel`} role="tabpanel" aria-labelledby={`${id}-tab-${active}`} className="relative overflow-hidden rounded-[2rem] lg:col-span-8">
        <AnimatePresence mode="popLayout" initial={false}>
          <motion.div
            key={current.key}
            initial={{ opacity: 0, scale: 1.03 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          >
            {current.media}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
