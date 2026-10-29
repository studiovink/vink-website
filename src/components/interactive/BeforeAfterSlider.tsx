"use client";

import { useState, type ReactNode } from "react";

type Props = {
  before: ReactNode;
  after: ReactNode;
  beforeLabel: string;
  afterLabel: string;
};

/**
 * Comparador antes / después. Un <input type="range"> invisible cubre la
 * imagen: funciona con arrastre, toque y flechas del teclado.
 */
export function BeforeAfterSlider({ before, after, beforeLabel, afterLabel }: Props) {
  const [pos, setPos] = useState(50);

  return (
    <div className="relative select-none overflow-hidden rounded-[2rem]">
      <div className="[&>*]:block">{before}</div>
      <div className="absolute inset-0 [&>*]:!absolute [&>*]:inset-0 [&>*]:!h-full" style={{ clipPath: `inset(0 0 0 ${pos}%)` }}>
        {after}
      </div>

      <span className="pointer-events-none absolute left-4 top-4 rounded-full bg-cream/90 px-3 py-1.5 text-xs font-semibold uppercase tracking-wider text-charcoal">
        {beforeLabel}
      </span>
      <span className="pointer-events-none absolute right-4 top-4 rounded-full bg-burgundy px-3 py-1.5 text-xs font-semibold uppercase tracking-wider text-cream">
        {afterLabel}
      </span>

      {/* Línea y tirador */}
      <div className="pointer-events-none absolute inset-y-0 w-0.5 bg-cream" style={{ left: `${pos}%` }}>
        <span className="absolute left-1/2 top-1/2 flex size-14 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-cream text-lg text-burgundy shadow-lg">
          ↔
        </span>
      </div>

      <input
        type="range"
        min={0}
        max={100}
        value={pos}
        onChange={(e) => setPos(Number(e.target.value))}
        aria-label={`Comparar: ${beforeLabel} y ${afterLabel}`}
        className="absolute inset-0 size-full cursor-ew-resize opacity-0"
      />
    </div>
  );
}
