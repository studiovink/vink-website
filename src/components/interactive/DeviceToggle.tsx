"use client";

import { AnimatePresence, motion } from "motion/react";
import { useState, type ReactNode } from "react";
import { cn } from "@/lib/cn";

/** Alterna la vista de un sitio entre computadora y celular, dentro de marcos de dispositivo. */
export function DeviceToggle({ desktop, mobile }: { desktop: ReactNode; mobile: ReactNode }) {
  const [view, setView] = useState<"desktop" | "mobile">("desktop");

  return (
    <div>
      <div role="group" aria-label="Vista del sitio" className="mx-auto flex w-fit gap-1 rounded-full bg-white/10 p-1">
        {(["desktop", "mobile"] as const).map((v) => (
          <button
            key={v}
            type="button"
            aria-pressed={view === v}
            onClick={() => setView(v)}
            className={cn(
              "min-h-11 rounded-full px-6 text-sm font-medium uppercase tracking-wide transition-colors",
              view === v ? "bg-cream text-charcoal" : "text-cream/80 hover:text-cream",
            )}
          >
            {v === "desktop" ? "Desktop" : "Mobile"}
          </button>
        ))}
      </div>

      <div className="mt-10 flex min-h-[22rem] items-center justify-center md:min-h-[34rem]">
        <AnimatePresence mode="wait" initial={false}>
          {view === "desktop" ? (
            <motion.div
              key="desktop"
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -24 }}
              transition={{ duration: 0.45 }}
              className="w-full max-w-5xl"
            >
              <div className="overflow-hidden rounded-2xl bg-charcoal-soft/60 shadow-[0_40px_90px_-40px_rgba(0,0,0,0.8)] ring-1 ring-white/10">
                <div className="flex items-center gap-1.5 px-4 py-3" aria-hidden>
                  <span className="size-2.5 rounded-full bg-rose" />
                  <span className="size-2.5 rounded-full bg-cream/40" />
                  <span className="size-2.5 rounded-full bg-cream/20" />
                  <span className="ml-4 h-5 flex-1 rounded-full bg-white/10" />
                </div>
                {desktop}
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="mobile"
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -24 }}
              transition={{ duration: 0.45 }}
              className="w-[min(78vw,20rem)]"
            >
              <div className="overflow-hidden rounded-[2.75rem] bg-charcoal p-2.5 shadow-[0_40px_90px_-40px_rgba(0,0,0,0.8)] ring-1 ring-white/15">
                <div className="overflow-hidden rounded-[2.2rem]">{mobile}</div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
