"use client";

import { AnimatePresence, motion } from "motion/react";
import { useId, useState, type ReactNode } from "react";
import { cn } from "@/lib/cn";

export type AccordionItem = {
  key: string;
  title: string;
  subtitle?: string;
  content: ReactNode;
};

/** Lista numerada que se despliega (estilo "WHAT WE DO"). Funciona con teclado y toque. */
export function ServiceAccordion({ items, dark = false }: { items: AccordionItem[]; dark?: boolean }) {
  const [open, setOpen] = useState<string | null>(items[0]?.key ?? null);
  const baseId = useId();

  const c = dark
    ? {
        rule: "border-cream/15",
        num: "text-cream/60",
        title: "text-cream",
        titleOpen: "text-rose",
        sub: "text-cream/60",
        btn: "border-cream/30 text-cream group-hover:border-rose group-hover:text-rose",
        btnOpen: "border-rose bg-rose text-burgundy",
      }
    : {
        rule: "border-charcoal/15",
        num: "text-charcoal-soft",
        title: "text-charcoal group-hover:text-burgundy",
        titleOpen: "text-burgundy",
        sub: "text-charcoal-soft",
        btn: "border-charcoal/25 text-charcoal group-hover:border-burgundy group-hover:text-burgundy",
        btnOpen: "border-burgundy bg-burgundy text-cream",
      };

  return (
    <ul className={cn("border-t", c.rule)}>
      {items.map((item, i) => {
        const isOpen = open === item.key;
        const panelId = `${baseId}-${item.key}`;
        return (
          <li key={item.key} className={cn("border-b", c.rule)}>
            <h3>
              <button
                type="button"
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => setOpen(isOpen ? null : item.key)}
                className="group flex w-full items-center gap-5 py-6 text-left md:gap-10 md:py-7"
              >
                <span className={cn("w-8 shrink-0 text-xs md:text-sm", c.num)}>(0{i + 1})</span>
                <span className="flex flex-1 flex-col gap-1 md:flex-row md:items-baseline md:gap-6">
                  <span
                    className={cn(
                      "display text-3xl transition-colors duration-300 md:text-5xl",
                      isOpen ? c.titleOpen : c.title,
                    )}
                  >
                    {item.title}
                  </span>
                  {item.subtitle && <span className={cn("text-sm", c.sub)}>{item.subtitle}</span>}
                </span>
                <span
                  aria-hidden
                  className={cn(
                    "inline-flex size-10 shrink-0 items-center justify-center rounded-full border text-lg transition-all duration-300 md:size-12",
                    isOpen ? cn("rotate-45", c.btnOpen) : c.btn,
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
                  <div className="pb-8 md:pb-10 md:pl-[4.5rem]">{item.content}</div>
                </motion.div>
              )}
            </AnimatePresence>
          </li>
        );
      })}
    </ul>
  );
}
