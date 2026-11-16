import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import { FusoExperience } from "@/components/fuso/FusoExperience";
import { fuso } from "@/content/fuso";
import "./fuso.css";

/* Fuentes locales del kit de marca (licencia SIL OFL en public/fuso/fonts). */
const anton = localFont({
  src: "../../../public/fuso/fonts/Anton-Regular.ttf",
  weight: "400",
  style: "normal",
  display: "swap",
  variable: "--fuso-font-display",
  fallback: ["Arial Narrow", "sans-serif"],
  adjustFontFallback: false,
});

const dmSans = localFont({
  src: "../../../public/fuso/fonts/DMSans-Variable.ttf",
  weight: "100 1000",
  style: "normal",
  display: "swap",
  variable: "--fuso-font-body",
  fallback: ["Arial", "sans-serif"],
  /* Sólo se precarga la fuente de títulos, que es la que pinta el hero. */
  preload: false,
});

export const metadata: Metadata = {
  title: { absolute: `${fuso.brand.name} · ${fuso.brand.descriptor}` },
  description: fuso.metaDescription,
  /* Marca conceptual con precios de ejemplo: fuera de buscadores hasta tener datos reales. */
  robots: { index: false, follow: false },
};

export const viewport: Viewport = {
  themeColor: "#36223D",
};

/** Landing de FUSO: restaurante conceptual con identidad, header y footer propios. */
export default function FusoLayout({ children }: LayoutProps<"/">) {
  return (
    <FusoExperience className={`${anton.variable} ${dmSans.variable}`}>{children}</FusoExperience>
  );
}
