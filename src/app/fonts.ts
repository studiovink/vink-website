import { Anton, Manrope } from "next/font/google";

/*
 * Títulos: sans condensada de alto impacto, en mayúsculas (dirección visual
 * inspirada en la referencia Luxfolio). Texto corrido: sans legible.
 */
export const headingFont = Anton({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-heading",
  display: "swap",
});

export const bodyFont = Manrope({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});
