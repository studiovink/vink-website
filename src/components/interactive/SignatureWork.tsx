"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { useRef, type ReactNode } from "react";

/**
 * "WO [video] RK": el video crece entre las letras mientras haces scroll
 * hasta ocupar casi toda la pantalla. Con movimiento reducido queda estático.
 */
export function SignatureWork({
  left,
  right,
  media,
  overlay,
}: {
  left: string;
  right: string;
  media: ReactNode;
  overlay?: ReactNode;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });

  const width = useTransform(scrollYProgress, [0, 0.7], ["22vw", "94vw"]);
  const height = useTransform(scrollYProgress, [0, 0.7], ["22vw", "82vh"]);
  const radius = useTransform(scrollYProgress, [0, 0.7], [28, 20]);
  const letters = useTransform(scrollYProgress, [0, 0.45], [1, 0]);
  const tilt = useTransform(scrollYProgress, [0, 0.6], [-7, 0]);
  const overlayOpacity = useTransform(scrollYProgress, [0.6, 0.85], [0, 1]);

  if (reduce) {
    return (
      <div className="container-vink">
        <p aria-hidden className="display text-giant text-charcoal">
          {left}
          {right}
        </p>
        <div className="relative mt-6 aspect-video overflow-hidden rounded-[1.5rem]">
          {media}
          {overlay && <div className="absolute inset-0">{overlay}</div>}
        </div>
      </div>
    );
  }

  return (
    <div ref={ref} className="relative h-[260vh]">
      <div className="sticky top-0 flex h-[100svh] items-center justify-center overflow-hidden">
        <div className="flex items-center justify-center gap-[1.5vw]">
          <motion.span aria-hidden style={{ opacity: letters }} className="display text-[22vw] leading-[0.8] text-charcoal">
            {left}
          </motion.span>
          <div className="relative" style={{ width: "22vw", height: "22vw" }} />
          <motion.span aria-hidden style={{ opacity: letters }} className="display text-[22vw] leading-[0.8] text-charcoal">
            {right}
          </motion.span>
        </div>

        <motion.div
          style={{ width, height, borderRadius: radius, rotate: tilt, x: "-50%", y: "-50%" }}
          className="absolute left-1/2 top-1/2 overflow-hidden shadow-[0_40px_90px_-40px_rgba(23,20,22,0.7)]"
        >
          {media}
          {overlay && (
            <motion.div style={{ opacity: overlayOpacity }} className="absolute inset-0">
              {overlay}
            </motion.div>
          )}
        </motion.div>
      </div>
    </div>
  );
}
