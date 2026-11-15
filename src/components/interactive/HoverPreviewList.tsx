"use client";

import Link from "next/link";
import { AnimatePresence, motion, useMotionValue, useReducedMotion, useSpring } from "motion/react";
import { useState, type ReactNode } from "react";

export type PreviewRow = {
  key: string;
  href: string;
  index: number;
  title: string;
  description: string;
  tags: string[];
  preview: ReactNode;
};

/**
 * Lista de servicios estilo editorial. En escritorio, la imagen del
 * servicio sigue al cursor al pasar por la fila; en táctil y con
 * movimiento reducido la lista funciona sin la vista previa.
 */
export function HoverPreviewList({ rows }: { rows: PreviewRow[] }) {
  const reduce = useReducedMotion();
  const [active, setActive] = useState<string | null>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 260, damping: 30, mass: 0.6 });
  const sy = useSpring(y, { stiffness: 260, damping: 30, mass: 0.6 });

  const current = rows.find((r) => r.key === active);

  return (
    <div
      className="relative"
      onPointerMove={(e) => {
        if (e.pointerType !== "mouse") return;
        x.set(e.clientX);
        y.set(e.clientY);
      }}
      onPointerLeave={() => setActive(null)}
    >
      <ul className="border-t border-cream/15">
        {rows.map((r) => (
          <li key={r.key} className="border-b border-cream/15">
            <Link
              href={r.href}
              onPointerEnter={(e) => e.pointerType === "mouse" && setActive(r.key)}
              onFocus={() => setActive(null)}
              className="group grid gap-5 py-8 md:grid-cols-2 md:gap-10 md:py-10"
            >
              <div>
                <p className="text-sm text-cream/50">({String(r.index).padStart(2, "0")})</p>
                <h3 className="display mt-1 text-3xl transition-colors duration-300 group-hover:text-cream/60 md:text-4xl">
                  {r.title}
                </h3>
                <p className="mt-3 max-w-md text-[13px] uppercase leading-relaxed tracking-[0.03em] text-cream/55">
                  {r.description}
                </p>
              </div>
              <ul className="flex flex-wrap content-start gap-2">
                {r.tags.map((t) => (
                  <li
                    key={t}
                    className="rounded-full border border-cream/30 px-3 py-1 text-[11px] uppercase tracking-[0.03em] text-cream/80 transition-colors duration-300 group-hover:border-burgundy group-hover:bg-burgundy group-hover:text-cream"
                  >
                    {t}
                  </li>
                ))}
              </ul>
            </Link>
          </li>
        ))}
      </ul>

      {!reduce && (
        <motion.div
          aria-hidden
          style={{ x: sx, y: sy }}
          className="pointer-events-none fixed left-0 top-0 z-30 hidden md:block"
        >
          <AnimatePresence>
            {current && (
              <motion.div
                key={current.key}
                initial={{ opacity: 0, scale: 0.85 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.85 }}
                transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                className="absolute w-56 -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-lg"
              >
                {current.preview}
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      )}
    </div>
  );
}
