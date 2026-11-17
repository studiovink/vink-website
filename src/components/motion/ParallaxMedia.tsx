"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { useRef, useSyncExternalStore, type ReactNode } from "react";
import { cn } from "@/lib/cn";

const DESKTOP = "(min-width: 768px) and (hover: hover) and (pointer: fine)";

function subscribe(onChange: () => void) {
  const query = window.matchMedia(DESKTOP);
  query.addEventListener("change", onChange);
  return () => query.removeEventListener("change", onChange);
}

/** Verdadero sólo en escritorio con puntero preciso; en móvil la imagen queda estable. */
function useDesktopPointer() {
  return useSyncExternalStore(
    subscribe,
    () => window.matchMedia(DESKTOP).matches,
    () => false,
  );
}

/**
 * Marco con desplazamiento corto de la imagen al hacer scroll (12–24 px).
 * El marco recorta; la capa interior es la única dueña del transform.
 * Sin efecto en móvil ni con movimiento reducido.
 */
export function ParallaxMedia({
  children,
  className,
  distance = 18,
  fill = false,
}: {
  children: ReactNode;
  className?: string;
  /** Recorrido máximo en px hacia cada lado. */
  distance?: number;
  /** La capa interior ocupa todo el marco (para medios con `fill`). */
  fill?: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const desktop = useDesktopPointer();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [-distance, distance]);
  const active = desktop && !reduce;

  return (
    <div ref={ref} className={cn("overflow-hidden", className)}>
      <motion.div
        className={fill ? "absolute inset-0" : undefined}
        style={active ? { y, scale: 1.08 } : undefined}
      >
        {children}
      </motion.div>
    </div>
  );
}
