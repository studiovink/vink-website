/*
 * Tonos de sección. Todo el sitio es oscuro: negro con letras blancas y
 * acentos vino; `burgundy` se reserva para bloques de acento puntuales.
 */
export type SectionTone = "ink" | "ink2" | "burgundy";

export type Theme = {
  bg: string;
  text: string;
  heading: string;
  muted: string;
  rule: string;
  accent: string;
  chip: string;
  dark: boolean;
};

const base = {
  text: "text-cream",
  heading: "text-cream",
  muted: "text-cream/70",
  rule: "border-cream/15",
  accent: "text-rose",
  chip: "border-cream/20 text-cream",
  dark: true,
};

export const themes: Record<SectionTone, Theme> = {
  ink: { ...base, bg: "bg-ink" },
  ink2: { ...base, bg: "bg-ink-2" },
  burgundy: { ...base, bg: "bg-burgundy", accent: "text-cream", muted: "text-cream/75" },
};
