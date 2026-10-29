"use client";

import { AnimatePresence, motion } from "motion/react";
import { useState, type ReactNode } from "react";
import { cn } from "@/lib/cn";

export type FounderTab = {
  id: string;
  label: string;
  role: string | null;
  bio: string | null;
  media: ReactNode;
};

/** Presentación de las fundadoras: alterna entre la foto juntas y cada retrato. */
export function FounderSpotlight({ tabs }: { tabs: FounderTab[] }) {
  const [active, setActive] = useState(tabs[0].id);
  const tab = tabs.find((t) => t.id === active) ?? tabs[0];

  return (
    <div>
      <div className="relative overflow-hidden rounded-[2rem]">
        <AnimatePresence mode="popLayout" initial={false}>
          <motion.div
            key={tab.id}
            initial={{ opacity: 0, scale: 1.04 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            id={`founder-panel-${tab.id}`}
            role="tabpanel"
            aria-labelledby={`founder-tab-${tab.id}`}
          >
            {tab.media}
          </motion.div>
        </AnimatePresence>
        <div className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/60 to-transparent p-6 pt-20 text-cream">
          <p className="display text-4xl">{tab.label}</p>
          {tab.role && <p className="mt-1 text-sm text-cream/85">{tab.role}</p>}
          {tab.bio && <p className="mt-3 max-w-sm text-sm text-cream/80">{tab.bio}</p>}
        </div>
      </div>

      <div role="tablist" aria-label="Fundadoras" className="mt-4 flex gap-2">
        {tabs.map((t) => (
          <button
            key={t.id}
            id={`founder-tab-${t.id}`}
            role="tab"
            type="button"
            aria-selected={t.id === active}
            aria-controls={`founder-panel-${t.id}`}
            onClick={() => setActive(t.id)}
            className={cn(
              "min-h-11 rounded-full px-5 text-sm font-medium uppercase tracking-wide transition-colors",
              t.id === active ? "bg-burgundy text-cream" : "bg-burgundy/10 text-burgundy hover:bg-burgundy/20",
            )}
          >
            {t.label}
          </button>
        ))}
      </div>
    </div>
  );
}
