import { Inter, Inter_Tight } from "next/font/google";

/*
 * Títulos: grotesca apretada (Inter Tight), fuerte y limpia, al estilo
 * editorial de estudio. Texto, etiquetas y botones: Inter.
 */
export const headingFont = Inter_Tight({
  subsets: ["latin"],
  variable: "--font-heading",
  display: "swap",
});

export const bodyFont = Inter({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});
