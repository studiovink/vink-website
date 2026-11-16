"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import { FUSO_IMAGES, fuso } from "@/content/fuso";
import { FusoButton } from "./FusoButton";
import { useFuso } from "./FusoExperience";
import { Lines } from "./Lines";

const WORDS = [0, 1, 2, 3];

/** Una banda: dos grupos idénticos; el loop traslada exactamente el ancho de uno. */
function Strip({ className, outlineFirst }: { className: string; outlineFirst?: boolean }) {
  return (
    <div className={`fu-strip ${className}`}>
      <div className="fu-strip-inner">
        {[0, 1].map((group) => (
          <div className="fu-strip-group" key={group}>
            {WORDS.map((i) => (
              <span key={i} className={(i % 2 === 0) === Boolean(outlineFirst) ? "fu-outline" : undefined}>
                FUSO
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

/**
 * Apertura por capas: fondo berenjena, dos bandas tipográficas en sentidos
 * opuestos, el tenedor recortado en primer plano y el mensaje en los márgenes.
 * El tenedor responde con sutileza al cursor (sólo puntero preciso) y al scroll.
 */
export function HeroScene() {
  const { paused, togglePaused } = useFuso();
  const hero = useRef<HTMLElement>(null);
  const float = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = hero.current;
    const object = float.current;
    if (!section || !object) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)");
    const reset = () => {
      for (const name of ["--scroll-y", "--pointer-x", "--pointer-y"]) object.style.setProperty(name, "0px");
      object.style.setProperty("--hero-rotate", "0deg");
    };
    if (paused || reduce.matches) reset();

    let frame: number | null = null;
    const move = () => {
      frame = null;
      const height = section.offsetHeight;
      if (reduce.matches || paused || window.scrollY > height) return;
      const progress = Math.min(1, Math.max(0, window.scrollY / height));
      object.style.setProperty("--scroll-y", `${Math.round(progress * 95)}px`);
      object.style.setProperty("--hero-rotate", `${(progress * -4).toFixed(2)}deg`);
    };
    const onScroll = () => {
      if (frame === null) frame = requestAnimationFrame(move);
    };
    const onPointerMove = (event: PointerEvent) => {
      if (!fine.matches || reduce.matches || paused) return;
      const rect = section.getBoundingClientRect();
      object.style.setProperty("--pointer-x", `${((event.clientX - rect.left) / rect.width - 0.5) * 14}px`);
      object.style.setProperty("--pointer-y", `${((event.clientY - rect.top) / rect.height - 0.5) * 10}px`);
    };
    const onPointerLeave = () => {
      object.style.setProperty("--pointer-x", "0px");
      object.style.setProperty("--pointer-y", "0px");
    };
    const onReduceChange = () => {
      if (reduce.matches) reset();
    };

    move();
    window.addEventListener("scroll", onScroll, { passive: true });
    section.addEventListener("pointermove", onPointerMove, { passive: true });
    section.addEventListener("pointerleave", onPointerLeave);
    reduce.addEventListener("change", onReduceChange);
    return () => {
      if (frame !== null) cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      section.removeEventListener("pointermove", onPointerMove);
      section.removeEventListener("pointerleave", onPointerLeave);
      reduce.removeEventListener("change", onReduceChange);
    };
  }, [paused]);

  return (
    <section ref={hero} className="fu-hero" id="inicio" aria-labelledby="fuso-hero-heading">
      <p className="fu-hero-descriptor">{fuso.brand.descriptor}</p>

      <div className="fu-hero-bands" aria-hidden="true">
        <Strip className="fu-strip-one" />
        <Strip className="fu-strip-two" outlineFirst />
      </div>

      <div className="fu-hero-object">
        <div className="fu-hero-rise">
          <div className="fu-hero-float" ref={float}>
            <Image
              src={`${FUSO_IMAGES}/hero.webp`}
              width={1024}
              height={1536}
              alt={fuso.hero.imageAlt}
              sizes="(max-width: 760px) 84vw, (max-width: 1050px) 53vw, 46vw"
              preload
            />
          </div>
        </div>
      </div>

      <div className="fu-hero-bottom">
        <div className="fu-hero-copy">
          <h1 id="fuso-hero-heading" className="fu-hero-tagline">
            <span className="sr-only">
              {fuso.brand.name}. {fuso.brand.descriptor}.{" "}
            </span>
            <Lines lines={fuso.hero.titleLines} />
          </h1>
          <p>
            <Lines lines={fuso.hero.descriptionLines} />
          </p>
        </div>
        <div className="fu-hero-cta">
          <FusoButton action="menu" roll>
            {fuso.hero.primaryCta}
          </FusoButton>
          <FusoButton action="reserve" variant="outline">
            {fuso.hero.secondaryCta}
          </FusoButton>
        </div>
      </div>

      <button type="button" className="fu-motion-toggle" aria-pressed={paused} onClick={togglePaused}>
        {paused ? "Reanudar movimiento" : "Pausar movimiento"}
      </button>
    </section>
  );
}
