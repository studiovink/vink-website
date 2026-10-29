"use client";

import { AnimatePresence, motion } from "motion/react";
import { useId, useState, type ReactNode } from "react";
import { cn } from "@/lib/cn";

export type AccordionItem = {
  key: string;
  title: string;
  content: ReactNode;
};

/** Lista numerada de servicios que se despliega (estilo "WHAT WE DO"). */
export function ServiceAccordion({ items }: { items: AccordionItem[] }) {
  const [open, setOpen] = useState<string | null>(items[0]?.key ?? null);
  const baseId = useId();

  return (
    <ul className="border-t border-charcoal/15">
      {items.map((item, i) => {
        const isOpen = open === item.key;
        const panelId = `${baseId}-${item.key}`;
        return (
          <li key={item.key} className="border-b border-charcoal/15">
            <h3>
              <button
                type="button"
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => setOpen(isOpen ? null : item.key)}
                className="group flex w-full items-center gap-5 py-6 text-left md:gap-10 md:py-8"
              >
                <span className="w-8 shrink-0 text-xs text-charcoal-soft md:text-sm">(0{i + 1})</span>
                <span
                  className={cn(
                    "display flex-1 text-4xl transition-colors duration-300 md:text-6xl",
                    isOpen ? "text-burgundy" : "text-charcoal group-hover:text-burgundy",
                  )}
                >
                  {item.title}
                </span>
                <span
                  aria-hidden
                  className={cn(
                    "inline-flex size-10 shrink-0 items-center justify-center rounded-full border transition-all duration-300 md:size-12",
                    isOpen
                      ? "rotate-45 border-burgundy bg-burgundy text-cream"
                      : "border-charcoal/25 text-charcoal group-hover:border-burgundy group-hover:text-burgundy",
                  )}
                >
                  +
                </span>
              </button>
            </h3>
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  id={panelId}
                  role="region"
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                  className="overflow-hidden"
                >
                  <div className="pb-8 pl-[3.25rem] md:pb-10 md:pl-[4.5rem]">{item.content}</div>
                </motion.div>
              )}
            </AnimatePresence>
          </li>
        );
      })}
    </ul>
  );
}
