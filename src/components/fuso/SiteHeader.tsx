/* eslint-disable @next/next/no-img-element -- logos SVG locales: no pasan por el optimizador */
import { FUSO_BRAND, fuso } from "@/content/fuso";
import { FusoButton, NavToggle } from "./FusoButton";

export function SiteHeader() {
  return (
    <header className="fu-header">
      <a className="fu-logo" href="#inicio" aria-label="FUSO, inicio">
        <img src={`${FUSO_BRAND}/fuso-butter.svg`} width={136} height={69} alt="FUSO" />
      </a>
      <div className="fu-header-actions">
        <FusoButton action="reserve" small roll className="fu-header-reserve">
          {fuso.reserve.cta}
        </FusoButton>
        <NavToggle />
      </div>
    </header>
  );
}
