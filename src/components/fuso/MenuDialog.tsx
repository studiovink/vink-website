"use client";

import type { RefObject } from "react";
import { fuso, type FusoCategory } from "@/content/fuso";
import { DishCard } from "./DishCard";

type Props = {
  dialogRef: RefObject<HTMLDialogElement | null>;
  onClose: () => Promise<void>;
  category: FusoCategory;
  onCategory: (category: FusoCategory) => void;
};

/** Carta completa: modal lavanda con cinco categorías que filtran de verdad. */
export function MenuDialog({ dialogRef, onClose, category, onCategory }: Props) {
  const { menu } = fuso;
  const dishes = menu.items.filter((dish) => category === "Todo" || dish.category === category);

  return (
    <dialog ref={dialogRef} className="fu-modal fu-menu-modal" aria-labelledby="fuso-full-menu-title">
      <div className="fu-modal-top">
        <h2 id="fuso-full-menu-title">La carta.</h2>
        <button type="button" className="fu-modal-close" aria-label="Cerrar carta" autoFocus onClick={() => void onClose()}>
          ×
        </button>
      </div>
      <div className="fu-filters" role="group" aria-label="Filtrar carta">
        {menu.categories.map((name) => (
          <button
            key={name}
            type="button"
            className="fu-filter"
            aria-pressed={name === category}
            onClick={() => onCategory(name)}
          >
            {name}
          </button>
        ))}
      </div>
      <p className="sr-only" role="status">
        {dishes.length} {dishes.length === 1 ? "plato" : "platos"} en {category === "Todo" ? "toda la carta" : category}
      </p>
      <div className="fu-full-menu-grid">
        {dishes.map((dish) => (
          <DishCard key={dish.id} dish={dish} showAllergens />
        ))}
      </div>
      <p className="fu-small">{menu.note}</p>
    </dialog>
  );
}
