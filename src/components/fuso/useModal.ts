"use client";

import { useCallback, useEffect, useRef, type RefObject } from "react";

type Options = {
  /** El drawer sale hacia la derecha; los modales se desvanecen. */
  kind: "drawer" | "modal";
  onClosed?: () => void;
};

export type ModalHandle = {
  ref: RefObject<HTMLDialogElement | null>;
  open: (trigger?: HTMLElement | null) => void;
  close: () => Promise<void>;
};

/** Cuántos diálogos hay abiertos, para bloquear el scroll de la página sólo mientras haga falta. */
let openCount = 0;

/**
 * Diálogo nativo (<dialog>.showModal): foco atrapado y fondo inerte de serie.
 * Añade salida animada, cierre con Esc o clic en el backdrop y devuelve el foco
 * al elemento que lo abrió.
 */
export function useModal({ kind, onClosed }: Options): ModalHandle {
  const ref = useRef<HTMLDialogElement | null>(null);
  const opener = useRef<HTMLElement | null>(null);
  const closing = useRef(false);
  const closedCallback = useRef(onClosed);

  useEffect(() => {
    closedCallback.current = onClosed;
  }, [onClosed]);

  const open = useCallback((trigger?: HTMLElement | null) => {
    const dialog = ref.current;
    if (!dialog || dialog.open) return;
    opener.current = trigger ?? (document.activeElement as HTMLElement | null);
    openCount += 1;
    document.documentElement.style.overflow = "hidden";
    dialog.showModal();
  }, []);

  const close = useCallback(async () => {
    const dialog = ref.current;
    if (!dialog || !dialog.open || closing.current) return;
    closing.current = true;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!reduced && typeof dialog.animate === "function") {
      const frames =
        kind === "drawer"
          ? [{ transform: "translateX(0)" }, { transform: "translateX(103%)" }]
          : [
              { opacity: 1, transform: "translateY(0)" },
              { opacity: 0, transform: "translateY(12px)" },
            ];
      try {
        await dialog.animate(frames, {
          duration: kind === "drawer" ? 330 : 160,
          easing: "cubic-bezier(.76,0,.24,1)",
        }).finished;
      } catch {
        /* animación cancelada: se cierra igual */
      }
    }
    closing.current = false;
    if (dialog.open) dialog.close();
  }, [kind]);

  useEffect(() => {
    const dialog = ref.current;
    if (!dialog) return;

    const onCancel = (event: Event) => {
      event.preventDefault();
      void close();
    };
    const onClose = () => {
      openCount = Math.max(0, openCount - 1);
      if (openCount === 0) document.documentElement.style.overflow = "";
      const target = opener.current;
      opener.current = null;
      if (target?.isConnected) target.focus({ preventScroll: true });
      closedCallback.current?.();
    };
    const onClick = (event: MouseEvent) => {
      if (event.target !== dialog) return;
      const rect = dialog.getBoundingClientRect();
      const outside =
        event.clientX < rect.left ||
        event.clientX > rect.right ||
        event.clientY < rect.top ||
        event.clientY > rect.bottom;
      if (outside) void close();
    };

    dialog.addEventListener("cancel", onCancel);
    dialog.addEventListener("close", onClose);
    dialog.addEventListener("click", onClick);
    return () => {
      dialog.removeEventListener("cancel", onCancel);
      dialog.removeEventListener("close", onClose);
      dialog.removeEventListener("click", onClick);
      if (dialog.open) {
        openCount = Math.max(0, openCount - 1);
        if (openCount === 0) document.documentElement.style.overflow = "";
      }
    };
  }, [close]);

  return { ref, open, close };
}
