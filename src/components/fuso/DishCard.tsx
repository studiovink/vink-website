import Image from "next/image";
import { FUSO_IMAGES, fuso, type FusoDish } from "@/content/fuso";

export function DishCard({ dish, showAllergens }: { dish: FusoDish; showAllergens?: boolean }) {
  return (
    <article className="fu-dish-card">
      <Image
        className="fu-dish-img"
        src={`${FUSO_IMAGES}/${dish.image}`}
        width={dish.width}
        height={dish.height}
        alt={dish.alt}
        sizes="(max-width: 760px) 45vw, 320px"
      />
      <h3>{dish.name}</h3>
      <p className="fu-dish-desc">{dish.description}</p>
      {showAllergens && dish.allergens.length > 0 && (
        <p className="fu-dish-allergens">Contiene: {dish.allergens.join(", ")}.</p>
      )}
      <p className="fu-dish-price">
        ${dish.price} <span className="fu-small">{fuso.menu.currency}</span>
      </p>
    </article>
  );
}
