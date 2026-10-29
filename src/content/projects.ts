import type { AssetId } from "./assets";
import type { ServiceSlug } from "./site";

/*
 * Proyectos del portafolio. Empieza VACÍO a propósito: solo se agregan
 * proyectos reales y autorizados. Las campañas conceptuales llevan
 * `isConcept: true` y se etiquetan como tales.
 */

export type Project = {
  slug: string;
  title: string;
  client: string | null;
  categories: ServiceSlug[];
  productionTypes?: (
    | "ai-product-photography"
    | "ai-commercial-film"
    | "hybrid"
    | "campaign"
    | "on-location"
  )[];
  isConcept: boolean;
  summary: string;
  whatWeDid: string[];
  concept: string;
  cover: AssetId;
  gallery: AssetId[];
  links?: { label: string; url: string }[];
  featured: boolean;
  order: number;
  status: "draft" | "published";
  /** Obligatorio para proyectos de clientes. */
  publishAuthorized: boolean;
};

export const projects: Project[] = [];

export const publishedProjects = projects
  .filter((p) => p.status === "published" && (p.isConcept || p.publishAuthorized))
  .sort((a, b) => a.order - b.order);
