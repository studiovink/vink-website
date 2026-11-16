"use client";

import {
  createContext,
  useCallback,
  useContext,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import type { FusoCategory, FusoPhotoKey } from "@/content/fuso";
import { MenuDialog } from "./MenuDialog";
import { NavigationDrawer } from "./NavigationDrawer";
import { PhotoDialog } from "./PhotoDialog";
import { ReservationDialog } from "./ReservationDialog";
import { useModal } from "./useModal";

type Trigger = HTMLElement | null | undefined;

type FusoContextValue = {
  navOpen: boolean;
  paused: boolean;
  togglePaused: () => void;
  openNav: (trigger?: Trigger) => void;
  openMenu: (category?: FusoCategory, trigger?: Trigger) => void;
  openReserve: (trigger?: Trigger) => void;
  openPhoto: (key: FusoPhotoKey, trigger?: Trigger) => void;
};

const FusoContext = createContext<FusoContextValue | null>(null);

export function useFuso() {
  const value = useContext(FusoContext);
  if (!value) throw new Error("useFuso debe usarse dentro de <FusoExperience>");
  return value;
}

/**
 * Envoltura de la landing: estado compartido (diálogos, pausa de movimiento)
 * y revelado de secciones al entrar al viewport.
 */
export function FusoExperience({ children, className }: { children: ReactNode; className?: string }) {
  const root = useRef<HTMLDivElement>(null);
  const [navOpen, setNavOpen] = useState(false);
  const [paused, setPaused] = useState(false);
  const [category, setCategory] = useState<FusoCategory>("Todo");
  const [photo, setPhoto] = useState<FusoPhotoKey>("table");

  const nav = useModal({ kind: "drawer", onClosed: () => setNavOpen(false) });
  const menu = useModal({ kind: "modal" });
  const reserve = useModal({ kind: "modal" });
  const lightbox = useModal({ kind: "modal" });

  const { open: showNav } = nav;
  const { open: showMenu } = menu;
  const { open: showReserve } = reserve;
  const { open: showPhoto } = lightbox;

  const openNav = useCallback(
    (trigger?: Trigger) => {
      setNavOpen(true);
      showNav(trigger);
    },
    [showNav],
  );
  const openMenu = useCallback(
    (next: FusoCategory = "Todo", trigger?: Trigger) => {
      setCategory(next);
      showMenu(trigger);
    },
    [showMenu],
  );
  const openReserve = useCallback((trigger?: Trigger) => showReserve(trigger), [showReserve]);
  const openPhoto = useCallback(
    (key: FusoPhotoKey, trigger?: Trigger) => {
      setPhoto(key);
      showPhoto(trigger);
    },
    [showPhoto],
  );
  const togglePaused = useCallback(() => setPaused((value) => !value), []);

  /*
   * Revelado por grupos, una sola vez. El contenido es visible sin JavaScript:
   * la clase que lo oculta sólo se añade aquí, y lo que ya está en pantalla
   * se marca como visible antes para que no parpadee.
   */
  useLayoutEffect(() => {
    const el = root.current;
    if (!el || !("IntersectionObserver" in window)) return;
    const nodes = Array.from(el.querySelectorAll<HTMLElement>(".fu-reveal"));
    const viewport = window.innerHeight;
    const pending = nodes.filter((node) => {
      const rect = node.getBoundingClientRect();
      const onScreen = rect.top < viewport && rect.bottom > 0;
      if (onScreen) node.classList.add("fu-shown");
      return !onScreen;
    });
    el.classList.add("fu-enhanced");
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          entry.target.classList.add("fu-shown");
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.08 },
    );
    pending.forEach((node) => observer.observe(node));
    return () => {
      observer.disconnect();
      el.classList.remove("fu-enhanced");
    };
  }, []);

  const value = useMemo<FusoContextValue>(
    () => ({ navOpen, paused, togglePaused, openNav, openMenu, openReserve, openPhoto }),
    [navOpen, paused, togglePaused, openNav, openMenu, openReserve, openPhoto],
  );

  return (
    <FusoContext.Provider value={value}>
      <div
        ref={root}
        className={`fuso ${className ?? ""}`}
        data-motion={paused ? "paused" : "playing"}
        lang="es-MX"
      >
        {children}
        <NavigationDrawer dialogRef={nav.ref} onClose={nav.close} />
        <MenuDialog
          dialogRef={menu.ref}
          onClose={menu.close}
          category={category}
          onCategory={setCategory}
        />
        <ReservationDialog dialogRef={reserve.ref} onClose={reserve.close} />
        <PhotoDialog dialogRef={lightbox.ref} onClose={lightbox.close} photo={photo} />
      </div>
    </FusoContext.Provider>
  );
}
