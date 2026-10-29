import type { AssetId } from "./assets";
import type { ServiceSlug } from "./site";

/*
 * Las cuatro especialidades de VINK (puntos 5–8 del documento maestro).
 * Sin paquetes con nombre ni precios públicos: cada proyecto se cotiza.
 */

export type Specialty = {
  slug: ServiceSlug;
  name: string;
  short: string;
  tagline: string;
  /** Texto corto para la lista "¿Qué podemos crear?" de Home. */
  description: string;
  offerings: string[];
  /** Cómo se contrata. */
  engagement: string;
  cta: string;
  image: AssetId;
  addOn?: { name: string; note: string };
};

export const specialtiesDetail: Specialty[] = [
  {
    slug: "creative-studio",
    name: "VINK Creative Studio",
    short: "Creative Studio",
    tagline: "Producción visual que lleva las ideas más lejos.",
    description:
      "Fotografía comercial, videos publicitarios, contenido híbrido y campañas visuales que combinan dirección creativa con herramientas de producción avanzadas.",
    offerings: [
      "AI Product Photography",
      "AI Commercial Films",
      "Hybrid Production",
      "Creative Campaigns",
      "On-Location Photo & Video",
    ],
    engagement: "Por proyecto",
    cta: "Cotizar una producción",
    image: "services.creative-studio",
  },
  {
    slug: "branding",
    name: "VINK Branding",
    short: "Branding",
    tagline: "Marcas con identidad, personalidad y propósito.",
    description:
      "Creamos y transformamos identidades visuales para que cada marca tenga una personalidad clara, reconocible y coherente.",
    offerings: ["Brand Identity — Identidad visual", "Brand Applications — Aplicaciones de marca"],
    engagement: "Por proyecto",
    cta: "Crear mi marca",
    image: "services.branding",
  },
  {
    slug: "web-studio",
    name: "VINK Web Studio",
    short: "Web Studio",
    tagline: "Experiencias digitales que combinan diseño y funcionalidad.",
    description:
      "Diseñamos experiencias digitales atractivas y funcionales, desde landing pages hasta sitios web completos.",
    offerings: ["Landing Pages", "Business Websites", "Digital Catalogs"],
    engagement: "Por proyecto",
    cta: "Crear mi página web",
    image: "services.web-studio",
  },
  {
    slug: "social-content",
    name: "VINK Social & Content",
    short: "Social & Content",
    tagline: "No se trata de publicar más. Se trata de comunicar mejor.",
    description:
      "Tu marca tiene algo que contar. Nosotros te ayudamos a comunicarlo mes a mes, con una propuesta mensual personalizada.",
    offerings: [
      "Content Strategy",
      "Content Creation",
      "Photo & Video Content",
      "Copywriting & Publishing",
      "Performance & Optimization",
    ],
    engagement: "Mensual personalizado",
    cta: "Hablemos de tu marca",
    image: "services.social-content",
    addOn: {
      name: "Meta Ads Management",
      note: "Servicio adicional opcional. Cotización y presupuesto publicitario independientes.",
    },
  },
];
