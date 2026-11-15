import { Instrument_Serif, Manrope } from "next/font/google";

/*
 * Títulos: serif editorial fina (Instrument Serif) para una estética
 * minimalista y elegante. Texto, etiquetas y botones: Manrope.
 */
export const headingFont = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  variable: "--font-heading",
  display: "swap",
});

export const bodyFont = Manrope({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});
