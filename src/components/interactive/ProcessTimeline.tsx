"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";

type Step = { title: string; subtitle: string; text: string };

/**
 * Línea de proceso: una barra rosa avanza con el scroll y conecta los pasos.
 * En celular los pasos se apilan en vertical.
 */
export function ProcessTimeline({ steps }: { steps: Step[] }) {
  const ref = useRef<HTMLOListElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.8", "end 0.5"] });
  const scaleX = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <div className="relative mt-12">
      <div aria-hidden className="absolute left-0 right-0 top-[1.15rem] hidden h-px bg-cream/15 lg:block">
        <motion.div
          className="h-full origin-left bg-rose"
          style={{ scaleX: reduce ? 1 : scaleX }}
        />
      </div>
      <ol ref={ref} className="grid gap-8 lg:grid-cols-5 lg:gap-6">
        {steps.map((s, i) => (
          <motion.li
            key={s.title}
            initial={reduce ? false : { opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "0px 0px -15% 0px" }}
            transition={{ duration: 0.7, delay: i * 0.08 }}
            className="relative grid grid-cols-[2.5rem_1fr] gap-4 lg:block"
          >
            <span className="relative z-10 flex size-9 items-center justify-center rounded-full bg-rose text-sm font-semibold text-burgundy">
              {i + 1}
            </span>
            <div className="lg:mt-6">
              <p className="display text-3xl">{s.title}</p>
              <p className="mt-1 text-xs font-semibold uppercase tracking-[0.16em] text-rose">{s.subtitle}</p>
              <p className="mt-3 text-sm leading-relaxed text-cream/70">{s.text}</p>
            </div>
          </motion.li>
        ))}
      </ol>
    </div>
  );
}
