import { Instrument_Serif, Manrope } from "next/font/google";

/*
 * Tipografía principal. La decisión es Satoshi (Fontshare); mientras no
 * estén sus archivos usamos Manrope, también referida en el documento.
 * Para cambiar: colocar Satoshi-Variable.woff2 en src/fonts/ y sustituir
 * por `localFont({ src: "../fonts/Satoshi-Variable.woff2", variable: "--font-display" })`.
 */
export const displayFont = Manrope({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

/* Serif editorial para frases y palabras destacadas. */
export const editorialFont = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  variable: "--font-editorial",
  display: "swap",
});
