"use client";

import type { ReactNode } from "react";
import type { FusoCategory } from "@/content/fuso";
import { useFuso } from "./FusoExperience";

type Props = {
  action: "menu" | "reserve";
  /** Categoría con la que se abre la carta. */
  category?: FusoCategory;
  variant?: "butter" | "outline" | "plum";
  small?: boolean;
  /** Texto que sube dentro de una máscara al pasar el cursor (botones principales). */
  roll?: boolean;
  className?: string;
  children: ReactNode;
};

/** Botón ovalado que abre la carta completa o el formulario de mesa. */
export function FusoButton({ action, category, variant = "butter", small, roll, className, children }: Props) {
  const { openMenu, openReserve } = useFuso();
  const classes = ["fu-btn", `fu-btn-${variant}`, small ? "fu-btn-small" : "", className ?? ""]
    .filter(Boolean)
    .join(" ");

  return (
    <button
      type="button"
      className={classes}
      onClick={(event) =>
        action === "menu" ? openMenu(category, event.currentTarget) : openReserve(event.currentTarget)
      }
    >
      {roll ? (
        <span className="fu-roll">
          <span>{children}</span>
          <span aria-hidden="true">{children}</span>
        </span>
      ) : (
        children
      )}
    </button>
  );
}

/** Disparador del drawer de navegación. */
export function NavToggle({ className }: { className?: string }) {
  const { navOpen, openNav } = useFuso();
  return (
    <button
      type="button"
      className={`fu-nav-toggle ${className ?? ""}`}
      aria-haspopup="dialog"
      aria-controls="fuso-navegacion"
      aria-expanded={navOpen}
      onClick={(event) => openNav(event.currentTarget)}
    >
      Menú <span className="fu-nav-lines" aria-hidden="true" />
    </button>
  );
}
