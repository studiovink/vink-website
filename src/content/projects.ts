import type { AssetId } from "./assets";
import type { ServiceSlug } from "./site";

/*
 * PROYECTOS DEL PORTAFOLIO
 *
 * Empieza VACÍO a propósito: solo se agregan proyectos reales y autorizados.
 * Las campañas conceptuales llevan `isConcept: true` y se etiquetan como tales.
 *
 * Para agregar un proyecto: registra sus imágenes/videos en assets.ts y
 * añade un objeto a `projects` con `status: "published"`.
 */

export type ProductionType =
  | "ai-product-photography"
  | "ai-commercial-film"
  | "hybrid"
  | "campaign"
  | "on-location";

export const productionTypeLabels: Record<ProductionType, string> = {
  "ai-product-photography": "Fotografía IA",
  "ai-commercial-film": "Comerciales",
  hybrid: "Híbrido",
  campaign: "Campañas",
  "on-location": "Foto, video y dron",
};

export type Project = {
  slug: string;
  title: string;
  /** Nombre del cliente, o null si es un proyecto propio/conceptual. */
  client: string | null;
  categories: ServiceSlug[];
  productionTypes?: ProductionType[];
  isConcept: boolean;
  summary: string;
  whatWeDid: string[];
  concept: string;
  cover: AssetId;
  /** Clip corto sin audio que se reproduce al pasar el cursor. */
  previewVideo?: AssetId;
  gallery: AssetId[];
  beforeAfter?: { before: AssetId; after: AssetId };
  links?: { label: string; url: string }[];
  featured: boolean;
  order: number;
  status: "draft" | "published";
  /** Obligatorio para proyectos de clientes. */
  publishAuthorized: boolean;
  /** Solo para la vista de desarrollo; nunca se publica. */
  devExample?: boolean;
};

export const projects: Project[] = [];

export const publishedProjects = projects
  .filter((p) => p.status === "published" && (p.isConcept || p.publishAuthorized))
  .sort((a, b) => a.order - b.order);

/*
 * Fichas de ejemplo SOLO en `npm run dev`, para revisar filtros y diseño
 * mientras no haya proyectos reales. No son proyectos: no tienen nombres de
 * clientes y muestran la etiqueta "Ejemplo de desarrollo".
 */
const devExamples: Project[] = (
  [
    ["creative-studio", ["ai-product-photography"], "services.creative-studio", true],
    ["branding", [], "services.branding", false],
    ["web-studio", [], "services.web-studio", false],
    ["social-content", [], "services.social-content", false],
    ["creative-studio", ["ai-commercial-film", "hybrid"], "service-hero.creative-studio", false],
    ["creative-studio", ["on-location"], "creative.on-location", false],
  ] as const
).map(([category, types, cover, featured], i) => ({
  slug: `ejemplo-${i + 1}`,
  title: `Proyecto pendiente ${String(i + 1).padStart(2, "0")}`,
  client: null,
  categories: [category],
  productionTypes: [...types],
  isConcept: false,
  summary: "Espacio reservado para un proyecto real de VINK.",
  whatWeDid: [],
  concept: "",
  cover,
  gallery: [],
  featured,
  order: i,
  status: "draft",
  publishAuthorized: false,
  devExample: true,
}));

/** Proyectos visibles: los publicados, más los ejemplos en desarrollo. */
export const visibleProjects: Project[] =
  process.env.NODE_ENV === "development" && publishedProjects.length === 0
    ? devExamples
    : publishedProjects;

export function getProject(slug: string) {
  return visibleProjects.find((p) => p.slug === slug);
}
