"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import type { ReactNode } from "react";

const ease = [0.22, 1, 0.36, 1] as const;
const FRAMED = "inset(16% 22% 16% 22%)";
const OPEN = "inset(0% 0% 0% 0%)";

/**
 * Firma del inicio de NUMA: la fotografía arranca dentro de un encuadre y se
 * expande hasta ocupar toda la pantalla; después se acerca levemente al bajar.
 * El recorte y la escala viven en capas distintas. Con movimiento reducido
 * la foto aparece completa desde el primer momento.
 */
export function ExpandingFrame({ children }: { children: ReactNode }) {
  const reduce = useReducedMotion();
  const { scrollY } = useScroll();
  const scale = useTransform(scrollY, [0, 800], [1, 1.08], { clamp: true });

  return (
    <motion.div
      className="absolute inset-0 -z-20"
      initial={reduce ? false : { clipPath: FRAMED }}
      animate={{ clipPath: OPEN }}
      transition={{ duration: 1.6, delay: 0.15, ease }}
    >
      <motion.div className="absolute inset-0" style={reduce ? undefined : { scale }}>
        {children}
      </motion.div>
    </motion.div>
  );
}
