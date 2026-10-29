"use client";

import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "motion/react";

type LoopVideoProps = {
  src: string;
  srcMobile?: string;
  poster?: string;
  posterMobile?: string;
  label?: string;
  /**
   * loop:    se reproduce solo mientras está en pantalla (hero, fondos).
   * preview: vista previa; en computadora al pasar el cursor o enfocar el
   *          elemento padre `.group`, en pantallas táctiles cuando está visible.
   */
  mode?: "loop" | "preview";
};

/**
 * Video sin sonido y en bucle, optimizado:
 * - No descarga nada hasta acercarse a la pantalla.
 * - Usa la versión vertical en celulares en orientación vertical.
 * - Con movimiento reducido o ahorro de datos se queda en el póster.
 */
export function LoopVideo({ src, srcMobile, poster, posterMobile, label, mode = "loop" }: LoopVideoProps) {
  const ref = useRef<HTMLVideoElement>(null);
  const reduce = useReducedMotion();
  const [near, setNear] = useState(false);
  const [mobile, setMobile] = useState(false);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 767px) and (orientation: portrait)");
    const update = () => setMobile(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  // Carga diferida: solo asigna la fuente cuando está cerca de la pantalla
  // (nunca, si el usuario activó el ahorro de datos).
  useEffect(() => {
    const el = ref.current;
    const conn = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection;
    if (!el || near || conn?.saveData) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) setNear(true);
      },
      { rootMargin: "300px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [near]);

  const still = reduce;

  // Reproducción
  useEffect(() => {
    const video = ref.current;
    if (!video || !near || still || paused) return;
    const play = () => video.play().catch(() => {});
    const pause = () => video.pause();

    const canHover = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    if (mode === "preview" && canHover) {
      const host = video.closest(".group") ?? video.parentElement;
      if (!host) return;
      const stop = () => {
        pause();
        video.currentTime = 0;
      };
      host.addEventListener("pointerenter", play);
      host.addEventListener("pointerleave", stop);
      host.addEventListener("focusin", play);
      host.addEventListener("focusout", stop);
      return () => {
        host.removeEventListener("pointerenter", play);
        host.removeEventListener("pointerleave", stop);
        host.removeEventListener("focusin", play);
        host.removeEventListener("focusout", stop);
      };
    }

    const io = new IntersectionObserver(
      ([e]) => (e.isIntersecting ? play() : pause()),
      { threshold: mode === "preview" ? 0.6 : 0.1 },
    );
    io.observe(video);
    return () => io.disconnect();
  }, [near, still, paused, mode, mobile]);

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
  const currentSrc = useMobile ? srcMobile : src;

  return (
    <>
      <video
        ref={ref}
        key={useMobile ? "m" : "d"}
        className="absolute inset-0 size-full object-cover"
        src={near && !still ? currentSrc : undefined}
        poster={useMobile ? (posterMobile ?? poster) : poster}
        muted
        loop
        playsInline
        preload="none"
        aria-label={label || undefined}
        aria-hidden={label ? undefined : true}
      />
      {mode === "loop" && !still && (
        <button
          type="button"
          onClick={toggle}
          aria-label={paused ? "Reproducir video" : "Pausar video"}
          className="absolute bottom-4 right-4 z-10 inline-flex size-10 items-center justify-center rounded-full bg-black/30 text-xs text-white backdrop-blur transition hover:bg-black/50"
        >
          {paused ? "▶" : "❚❚"}
        </button>
      )}
    </>
  );
}
