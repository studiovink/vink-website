/*
 * Datos globales del sitio. Lo marcado con `null` está pendiente:
 * los componentes ocultan automáticamente un enlace sin URL.
 */

export const site = {
  name: "VINK Creative Studio",
  shortName: "VINK",
  tagline: "Think with Vink.",
  concept: "Ideas humanas. Posibilidades extraordinarias.",
  description:
    "Estudio creativo y digital. Creatividad, estrategia, diseño y tecnología para marcas que quieren ir más allá.",
  /** Dominio definitivo — pendiente. Se usa para SEO y Open Graph. */
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  locale: "es_MX",
  contact: {
    email: "studiovink27@gmail.com",
    /** Número en formato internacional sin signos, p. ej. 5213312345678 — PENDIENTE */
    whatsapp: null as string | null,
    /** URL completa del perfil — PENDIENTE */
    instagram: null as string | null,
  },
} as const;

export const whatsappUrl = (message?: string) =>
  site.contact.whatsapp
    ? `https://wa.me/${site.contact.whatsapp}${message ? `?text=${encodeURIComponent(message)}` : ""}`
    : null;

export type ServiceSlug =
  | "creative-studio"
  | "branding"
  | "web-studio"
  | "social-content";

/** Las cuatro especialidades definitivas (sin VINK Strategy). */
export const specialties: {
  slug: ServiceSlug;
  name: string;
  short: string;
  summary: string;
}[] = [
  {
    slug: "creative-studio",
    name: "VINK Creative Studio",
    short: "Creative Studio",
    summary: "Producción visual e IA",
  },
  {
    slug: "branding",
    name: "VINK Branding",
    short: "Branding",
    summary: "Identidad de marca",
  },
  {
    slug: "web-studio",
    name: "VINK Web Studio",
    short: "Web Studio",
    summary: "Diseño y desarrollo web",
  },
  {
    slug: "social-content",
    name: "VINK Social & Content",
    short: "Social & Content",
    summary: "Gestión mensual de redes sociales",
  },
];

/** Cada especialidad es una sección de la página principal. */
export const serviceHref = (slug: ServiceSlug) => `/#${slug}`;

export const mainNav = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "/#about" },
  { label: "Services", href: "/#services", children: specialties },
  { label: "Our Work", href: "/work" },
  { label: "Contact", href: "/#contact" },
] as const;

export const legalNav = [
  { label: "Aviso de Privacidad", href: "/aviso-de-privacidad" },
  { label: "Términos y Condiciones", href: "/terminos-y-condiciones" },
] as const;
