"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import type { ReactNode } from "react";

/*
 * Firma del inicio de VINK: al bajar, la imagen se acerca despacio y las dos
 * líneas del título se separan hacia lados opuestos, abriendo paso al contenido.
 * Cada capa es dueña de un solo transform; con movimiento reducido queda fija.
 */

const RANGE = [0, 700];

/** Fondo del hero: cambio de escala moderado ligado al scroll. */
export function HeroBackdrop({ children }: { children: ReactNode }) {
  const reduce = useReducedMotion();
  const { scrollY } = useScroll();
  const scale = useTransform(scrollY, RANGE, [1, 1.1], { clamp: true });
  return (
    <motion.div className="absolute inset-0 -z-30" style={reduce ? undefined : { scale }}>
      {children}
    </motion.div>
  );
}

/** Línea del título que se desplaza hacia su lado mientras el hero sale de pantalla. */
export function HeroDrift({
  children,
  toward,
  className,
}: {
  children: ReactNode;
  toward: "left" | "right";
  className?: string;
}) {
  const reduce = useReducedMotion();
  const { scrollY } = useScroll();
  const x = useTransform(scrollY, RANGE, ["0vw", toward === "left" ? "-7vw" : "7vw"], { clamp: true });
  return (
    <motion.span aria-hidden className={className} style={reduce ? undefined : { x }}>
      {children}
    </motion.span>
  );
}
