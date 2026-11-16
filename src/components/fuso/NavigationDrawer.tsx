/* eslint-disable @next/next/no-img-element -- logo SVG local */
"use client";

import type { CSSProperties, MouseEvent, RefObject } from "react";
import { FUSO_BRAND, fuso } from "@/content/fuso";
import { Lines } from "./Lines";

type Props = { dialogRef: RefObject<HTMLDialogElement | null>; onClose: () => Promise<void> };

/** Drawer lateral derecho: hasta 560 px en escritorio, ancho completo en móvil. */
export function NavigationDrawer({ dialogRef, onClose }: Props) {
  const go = async (event: MouseEvent<HTMLAnchorElement>, href: string) => {
    event.preventDefault();
    await onClose();
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    document.querySelector(href)?.scrollIntoView({ behavior: reduced ? "instant" : "smooth" });
  };

  return (
    <dialog ref={dialogRef} className="fu-drawer" id="fuso-navegacion" aria-labelledby="fuso-nav-title">
      <div className="fu-drawer-top">
        <h2 id="fuso-nav-title" className="sr-only">
          Navegación principal
        </h2>
        <img src={`${FUSO_BRAND}/fuso-butter.svg`} width={100} height={51} alt="FUSO" />
        <button type="button" className="fu-btn fu-btn-butter fu-btn-small" autoFocus onClick={() => void onClose()}>
          Cerrar <span aria-hidden="true">×</span>
        </button>
      </div>
      <nav aria-label="Principal">
        {fuso.nav.map((link, i) => (
          <a
            key={link.href}
            href={link.href}
            style={{ "--i": i } as CSSProperties}
            onClick={(event) => void go(event, link.href)}
          >
            {link.label}
          </a>
        ))}
      </nav>
      <p>
        <Lines lines={fuso.hero.descriptionLines} />
      </p>
    </dialog>
  );
}
