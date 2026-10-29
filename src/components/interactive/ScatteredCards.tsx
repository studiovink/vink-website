"use client";

import { motion, useReducedMotion } from "motion/react";
import { useRef, type ReactNode } from "react";
import { cn } from "@/lib/cn";

export type ScatterCard = {
  key: string;
  content: ReactNode;
  tone: "white" | "burgundy" | "rose";
  /** Posición en escritorio (porcentajes) y giro en grados. */
  pos: { top: string; left?: string; right?: string; rotate: number };
};

export type ScatterTile = {
  key: string;
  media: ReactNode;
  pos: { top: string; left?: string; right?: string; rotate: number };
};

const tones = {
  white: "bg-white text-charcoal",
  burgundy: "bg-burgundy text-cream",
  rose: "bg-rose text-burgundy",
};

/**
 * Tarjetas giradas y dispersas alrededor de un título central.
 * En escritorio se pueden arrastrar; al pasar el cursor se enderezan.
 * En móvil se presentan como carrusel horizontal.
 */
export function ScatteredCards({
  center,
  cards,
  tiles,
}: {
  center: ReactNode;
  cards: ScatterCard[];
  tiles: ScatterTile[];
}) {
  const area = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();

  return (
    <>
      {/* Escritorio */}
      <div ref={area} className="relative hidden h-[68rem] lg:block">
        <div className="absolute inset-x-[29%] top-1/2 -translate-y-1/2 text-center">{center}</div>

        {tiles.map((t) => (
          <motion.div
            key={t.key}
            className="absolute w-32 overflow-hidden rounded-3xl shadow-[0_24px_50px_-24px_rgba(23,20,22,0.6)] xl:w-36"
            style={{ top: t.pos.top, left: t.pos.left, right: t.pos.right, rotate: t.pos.rotate }}
            initial={reduce ? false : { opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            {t.media}
          </motion.div>
        ))}

        {cards.map((c, i) => (
          <motion.article
            key={c.key}
            drag={!reduce}
            dragConstraints={area}
            dragElastic={0.15}
            whileHover={reduce ? undefined : { rotate: 0, scale: 1.03, zIndex: 20 }}
            whileDrag={{ scale: 1.05, zIndex: 30, cursor: "grabbing" }}
            initial={reduce ? false : { opacity: 0, y: 40, rotate: c.pos.rotate }}
            whileInView={{ opacity: 1, y: 0, rotate: c.pos.rotate }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: i * 0.06 }}
            style={{ top: c.pos.top, left: c.pos.left, right: c.pos.right }}
            className={cn(
              "absolute z-10 w-[19rem] cursor-grab rounded-[1.75rem] p-7 shadow-[0_30px_60px_-30px_rgba(23,20,22,0.55)] xl:w-[22rem]",
              tones[c.tone],
            )}
          >
            {c.content}
          </motion.article>
        ))}
      </div>

      {/* Móvil y tablet */}
      <div className="lg:hidden">
        <div className="container-vink">{center}</div>
        <ul className="mt-10 flex snap-x snap-mandatory gap-4 overflow-x-auto px-5 pb-6 md:px-10">
          {cards.map((c) => (
            <li
              key={c.key}
              className={cn("w-[78vw] max-w-sm shrink-0 snap-center rounded-[1.75rem] p-7", tones[c.tone])}
            >
              {c.content}
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
