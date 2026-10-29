export type SectionTone = "cream" | "creamDeep" | "rose" | "burgundy" | "charcoal";

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

export const themes: Record<SectionTone, Theme> = {
  cream: {
    bg: "bg-cream",
    text: "text-charcoal",
    heading: "text-charcoal",
    muted: "text-charcoal-soft",
    rule: "border-charcoal/15",
    accent: "text-burgundy",
    chip: "border-charcoal/15 text-charcoal",
    dark: false,
  },
  creamDeep: {
    bg: "bg-cream-deep",
    text: "text-charcoal",
    heading: "text-charcoal",
    muted: "text-charcoal-soft",
    rule: "border-charcoal/15",
    accent: "text-burgundy",
    chip: "border-charcoal/15 text-charcoal",
    dark: false,
  },
  rose: {
    bg: "bg-rose",
    text: "text-burgundy",
    heading: "text-burgundy",
    muted: "text-burgundy/80",
    rule: "border-burgundy/20",
    accent: "text-charcoal",
    chip: "border-burgundy/25 text-burgundy",
    dark: false,
  },
  burgundy: {
    bg: "bg-burgundy",
    text: "text-cream",
    heading: "text-cream",
    muted: "text-cream/75",
    rule: "border-cream/15",
    accent: "text-rose",
    chip: "border-cream/20 text-cream",
    dark: true,
  },
  charcoal: {
    bg: "bg-charcoal",
    text: "text-cream",
    heading: "text-cream",
    muted: "text-cream/70",
    rule: "border-cream/15",
    accent: "text-rose",
    chip: "border-cream/20 text-cream",
    dark: true,
  },
};
