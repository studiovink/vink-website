/*
 * REGISTRO CENTRAL DE RECURSOS VISUALES
 *
 * Cada espacio visual del sitio tiene un ID. Los componentes usan
 * <MediaSlot id="…" /> y nunca rutas directas.
 *
 * Para integrar una pieza (Higgsfield, ChatGPT, foto real o material de cliente):
 *   1. Exportar con la proporción indicada (`ratio`) y al menos `minWidth` px.
 *   2. Guardar en /public/media/<carpeta>/ con el nombre sugerido.
 *   3. Completar `src` (y `poster`/`srcMobile` en videos) y cambiar `status` a "final".
 *
 * Mientras `src` sea null se muestra un espacio reservado con la proporción
 * exacta. Nunca se sustituye por fotos de stock ni personas ficticias.
 */

export type AssetSource = "higgsfield" | "chatgpt" | "real-photo" | "client" | "code";
export type AssetTone = "burgundy" | "rose" | "cream" | "charcoal";

export type Asset = {
  kind: "image" | "video";
  ratio: `${number}:${number}`;
  minWidth: number;
  src: string | null;
  /** Video vertical para móvil (9:16). */
  srcMobile?: string | null;
  poster?: string | null;
  posterMobile?: string | null;
  alt: string;
  source: AssetSource;
  status: "pending" | "draft" | "final";
  /** Campaña conceptual: se muestra una etiqueta visible. */
  isConcept?: boolean;
  /** Indicaciones de producción. */
  brief: string;
  /** Color del espacio reservado mientras no haya archivo. */
  tone: AssetTone;
  suggestedPath: string;
};

export const assets = {
  "hero.video": {
    kind: "video",
    ratio: "16:9",
    minWidth: 1920,
    src: null,
    srcMobile: null,
    poster: null,
    posterMobile: null,
    alt: "",
    source: "higgsfield",
    status: "pending",
    tone: "burgundy",
    brief:
      "Montaje cinematográfico de 8–12 s en bucle limpio: productos, escenarios creativos y transformaciones visuales. Sin texto quemado. Zona inferior y superior izquierda con aire para el texto. Entregar también versión 9:16 (1080×1920) para móvil y un fotograma de póster de cada versión.",
    suggestedPath: "/media/hero/hero-vink-16x9.mp4 · hero-vink-9x16.mp4",
  },
  "founders.together": {
    kind: "image",
    ratio: "4:5",
    minWidth: 1600,
    src: null,
    alt: "Pau y Dany, fundadoras de VINK Creative Studio",
    source: "real-photo",
    status: "pending",
    tone: "burgundy",
    brief:
      "Fotografía REAL de las dos fundadoras juntas. Vestuario negro, fondo neutro, iluminación marcada; cámara, laptop o celular. Edición en Higgsfield conservando rasgos reales.",
    suggestedPath: "/media/founders/founders-together-4x5.avif",
  },
  "founders.pau": {
    kind: "image",
    ratio: "4:5",
    minWidth: 1200,
    src: null,
    alt: "Pau, cofundadora de VINK Creative Studio",
    source: "real-photo",
    status: "pending",
    tone: "charcoal",
    brief: "Retrato individual REAL de Pau, misma dirección editorial que la foto juntas.",
    suggestedPath: "/media/founders/founder-pau-4x5.avif",
  },
  "founders.dany": {
    kind: "image",
    ratio: "4:5",
    minWidth: 1200,
    src: null,
    alt: "Dany, cofundadora de VINK Creative Studio",
    source: "real-photo",
    status: "pending",
    tone: "charcoal",
    brief: "Retrato individual REAL de Dany, misma dirección editorial que la foto juntas.",
    suggestedPath: "/media/founders/founder-dany-4x5.avif",
  },
  "founders.working": {
    kind: "image",
    ratio: "3:2",
    minWidth: 2000,
    src: null,
    alt: "Pau y Dany trabajando en un proyecto",
    source: "real-photo",
    status: "pending",
    tone: "burgundy",
    brief: "Foto REAL trabajando juntas: revisando proyectos, grabando o en laptop.",
    suggestedPath: "/media/founders/founders-working-3x2.avif",
  },
  "founders.creative": {
    kind: "image",
    ratio: "4:5",
    minWidth: 1600,
    src: null,
    alt: "Composición creativa de las fundadoras de VINK",
    source: "real-photo",
    status: "pending",
    tone: "rose",
    brief: "Composición creativa a partir de foto REAL, para usos secundarios del sitio.",
    suggestedPath: "/media/founders/founders-creative-4x5.avif",
  },
  "creative.before": {
    kind: "image",
    ratio: "4:5",
    minWidth: 1600,
    src: null,
    alt: "Fotografía original del producto",
    source: "real-photo",
    status: "pending",
    tone: "cream",
    brief:
      "Foto sencilla del producto real (material inicial). MISMA resolución y encuadre que creative.after.",
    suggestedPath: "/media/creative/creative-before-4x5.avif",
  },
  "creative.after": {
    kind: "image",
    ratio: "4:5",
    minWidth: 1600,
    src: null,
    alt: "Campaña comercial creada por VINK a partir del producto",
    source: "higgsfield",
    status: "pending",
    isConcept: true,
    tone: "burgundy",
    brief:
      "Campaña comercial con IA del mismo producto, sin alterar etiquetas, colores ni detalles. MISMO encuadre que creative.before.",
    suggestedPath: "/media/creative/creative-after-4x5.avif",
  },
  "services.creative-studio": {
    kind: "image",
    ratio: "4:5",
    minWidth: 1200,
    src: null,
    alt: "Producción visual de VINK Creative Studio",
    source: "higgsfield",
    status: "pending",
    tone: "burgundy",
    brief: "Pieza representativa de la campaña conceptual (Pieza 01).",
    suggestedPath: "/media/services/service-creative-4x5.avif",
  },
  "services.branding": {
    kind: "image",
    ratio: "4:5",
    minWidth: 1200,
    src: null,
    alt: "Identidad visual desarrollada por VINK Branding",
    source: "client",
    status: "pending",
    tone: "rose",
    brief: "Identidad y aplicaciones de un proyecto real de branding.",
    suggestedPath: "/media/services/service-branding-4x5.avif",
  },
  "services.web-studio": {
    kind: "image",
    ratio: "4:5",
    minWidth: 1200,
    src: null,
    alt: "Sitio web desarrollado por VINK Web Studio",
    source: "client",
    status: "pending",
    tone: "charcoal",
    brief: "Captura real de un sitio publicado, en marco de dispositivo.",
    suggestedPath: "/media/services/service-web-4x5.avif",
  },
  "services.social-content": {
    kind: "image",
    ratio: "4:5",
    minWidth: 1200,
    src: null,
    alt: "Contenido para redes creado por VINK Social & Content",
    source: "client",
    status: "pending",
    tone: "burgundy",
    brief: "Reel o carrusel real y autorizado.",
    suggestedPath: "/media/services/service-social-4x5.avif",
  },
  "work.signature": {
    kind: "video",
    ratio: "16:9",
    minWidth: 1920,
    src: null,
    poster: null,
    alt: "",
    source: "higgsfield",
    status: "pending",
    tone: "burgundy",
    brief:
      "Clip de 6–10 s de la mejor producción de VINK (puede salir de la campaña conceptual). Se muestra creciendo entre las letras de WORK.",
    suggestedPath: "/media/work/work-signature-16x9.mp4",
  },
  "usecases.1": {
    kind: "image",
    ratio: "1:1",
    minWidth: 800,
    src: null,
    alt: "",
    source: "higgsfield",
    status: "pending",
    tone: "burgundy",
    brief: "Detalle de producción VINK (producto, textura o escena). Decorativo.",
    suggestedPath: "/media/home/usecase-1-1x1.avif",
  },
  "usecases.2": {
    kind: "image",
    ratio: "1:1",
    minWidth: 800,
    src: null,
    alt: "",
    source: "higgsfield",
    status: "pending",
    tone: "charcoal",
    brief: "Detalle de producción VINK. Decorativo.",
    suggestedPath: "/media/home/usecase-2-1x1.avif",
  },
  "usecases.3": {
    kind: "image",
    ratio: "1:1",
    minWidth: 800,
    src: null,
    alt: "",
    source: "higgsfield",
    status: "pending",
    tone: "rose",
    brief: "Detalle de producción VINK. Decorativo.",
    suggestedPath: "/media/home/usecase-3-1x1.avif",
  },
  "usecases.4": {
    kind: "image",
    ratio: "1:1",
    minWidth: 800,
    src: null,
    alt: "",
    source: "higgsfield",
    status: "pending",
    tone: "burgundy",
    brief: "Detalle de producción VINK. Decorativo.",
    suggestedPath: "/media/home/usecase-4-1x1.avif",
  },
} satisfies Record<string, Asset>;

export type AssetId = keyof typeof assets;

export function getAsset(id: AssetId): Asset {
  return assets[id];
}
