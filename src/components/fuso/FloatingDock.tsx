"use client";

import { useEffect, useState } from "react";
import { fuso } from "@/content/fuso";
import { FusoButton, NavToggle } from "./FusoButton";

/** Menú y reserva siempre a mano: aparece al salir del hero. */
export function FloatingDock() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const hero = document.getElementById("inicio");
    if (!hero || !("IntersectionObserver" in window)) return;
    const observer = new IntersectionObserver(([entry]) => setVisible(!entry.isIntersecting), {
      rootMargin: "-120px 0px 0px 0px",
    });
    observer.observe(hero);
    return () => observer.disconnect();
  }, []);

  return (
    <div className="fu-dock" data-visible={visible} inert={!visible}>
      <FusoButton action="reserve" small>
        {fuso.reserve.cta}
      </FusoButton>
      <NavToggle />
    </div>
  );
}
