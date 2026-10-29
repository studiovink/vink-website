"use client";

import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "motion/react";

type LoopVideoProps = {
  src: string;
  srcMobile?: string;
  poster?: string;
  posterMobile?: string;
  label?: string;
};

/**
 * Video en bucle, sin sonido, con póster mientras carga.
 * - Usa la versión vertical en pantallas verticales estrechas.
 * - Con movimiento reducido no se reproduce solo (queda el póster).
 * - Se pausa fuera de pantalla y ofrece un botón visible de pausa.
 */
export function LoopVideo({ src, srcMobile, poster, posterMobile, label }: LoopVideoProps) {
  const ref = useRef<HTMLVideoElement>(null);
  const reduce = useReducedMotion();
  const [mobile, setMobile] = useState(false);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 767px) and (orientation: portrait)");
    const update = () => setMobile(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    const video = ref.current;
    if (!video || reduce || paused) return;
    const io = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) video.play().catch(() => {});
      else video.pause();
    });
    io.observe(video);
    return () => io.disconnect();
  }, [reduce, paused, mobile]);

  const toggle = () => {
    const video = ref.current;
    if (!video) return;
    if (video.paused) {
      video.play().catch(() => {});
      setPaused(false);
    } else {
      video.pause();
      setPaused(true);
    }
  };

  const useMobile = mobile && srcMobile;

  return (
    <>
      <video
        ref={ref}
        key={useMobile ? "m" : "d"}
        className="absolute inset-0 size-full object-cover"
        src={useMobile ? srcMobile : src}
        poster={useMobile ? (posterMobile ?? poster) : poster}
        muted
        loop
        playsInline
        preload="metadata"
        aria-label={label || undefined}
        aria-hidden={label ? undefined : true}
      />
      <button
        type="button"
        onClick={toggle}
        aria-label={paused || reduce ? "Reproducir video" : "Pausar video"}
        className="absolute bottom-4 right-4 z-10 inline-flex size-10 items-center justify-center rounded-full bg-black/30 text-white backdrop-blur transition hover:bg-black/50"
      >
        {paused || reduce ? "▶" : "❚❚"}
      </button>
    </>
  );
}
