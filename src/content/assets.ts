import manifest from "./media-manifest.json";

/*
 * REGISTRO CENTRAL DE RECURSOS VISUALES
 *
 * Cada espacio visual del sitio tiene un ID y un nombre de archivo (`file`).
 * Los componentes usan <MediaSlot id="…" /> y nunca rutas directas.
 *
 * CÓMO AGREGAR UNA IMAGEN O VIDEO (sin tocar código):
 *   1. Exporta con la proporción indicada (`ratio`) y al menos `minWidth` px.
 *   2. Guárdalo en /public con el nombre de `file` + extensión:
 *        imágenes → .jpg .jpeg .png .webp .avif
 *        videos   → .mp4 (o .webm)
 *      Ej.: file "/media/hero/hero-vink-16x9" → public/media/hero/hero-vink-16x9.mp4
 *   3. Videos (opcional): un póster con el mismo nombre + "-poster" (.jpg/.png/.webp).
 *   4. Listo: al compilar, `scripts/scan-media.mjs` detecta el archivo y lo muestra.
 *
 * La lista completa de archivos y medidas está en docs/FORMATOS.md
 * (se regenera con `npm run media:scan`).
 *
 * Mientras no exista el archivo se muestra un espacio reservado con la
 * proporción exacta. Nunca se sustituye por fotos de stock ni personas ficticias.
 */

export type AssetSource = "higgsfield" | "chatgpt" | "real-photo" | "client" | "code";
export type AssetTone = "burgundy" | "rose" | "cream" | "charcoal" | "sage" | "light" | "red";

export type Asset = {
  kind: "image" | "video";
  ratio: `${number}:${number}`;
  minWidth: number;
  /** Ruta dentro de /public SIN extensión. */
  file: string;
  /** Video vertical para celular (9:16), sin extensión. */
  fileMobile?: string;
  alt: string;
  source: AssetSource;
  status: "pending" | "draft" | "final";
  /** Campaña conceptual: se muestra una etiqueta visible. */
  isConcept?: boolean;
  /** Indicaciones de producción. */
  brief: string;
  /** Color del espacio reservado mientras no haya archivo. */
  tone: AssetTone;
};

export const assets = {
  "hero.video": {
    kind: "video",
    ratio: "16:9",
    minWidth: 1920,
    alt: "",
    source: "higgsfield",
    status: "pending",
    tone: "charcoal",
    brief:
      "Montaje cinematográfico de 8–12 s en bucle limpio: productos, escenarios creativos y transformaciones visuales. Sin texto quemado. Zona inferior y superior izquierda con aire para el texto. Entregar también versión 9:16 (1080×1920) para móvil y un fotograma de póster de cada versión.",
    file: "/media/hero/hero-vink-16x9",
    fileMobile: "/media/hero/hero-vink-9x16",
  },
  "founders.together": {
    kind: "image",
    ratio: "4:5",
    minWidth: 1600,
    alt: "Pau y Dany, founders de VINK Creative Studio",
    source: "real-photo",
    status: "pending",
    tone: "burgundy",
    brief:
      "Fotografía REAL de Pau y Dany juntos. Vestuario negro, fondo neutro, iluminación marcada; cámara, laptop o celular. Edición en Higgsfield conservando rasgos reales.",
    file: "/media/founders/founders-together-4x5",
  },
  "founders.pau": {
    kind: "image",
    ratio: "4:5",
    minWidth: 1200,
    alt: "Pau, Co-Founder y Creative Director de VINK Creative Studio",
    source: "real-photo",
    status: "pending",
    tone: "charcoal",
    brief: "Retrato individual REAL de Pau, misma dirección editorial que la foto juntas.",
    file: "/media/founders/founder-pau-4x5",
  },
  "founders.dany": {
    kind: "image",
    ratio: "4:5",
    minWidth: 1200,
    alt: "Dany, Co-Founder y Digital Strategist de VINK Creative Studio",
    source: "real-photo",
    status: "pending",
    tone: "charcoal",
    brief: "Retrato individual REAL de Dany, misma dirección editorial que la foto juntas.",
    file: "/media/founders/founder-dany-4x5",
  },
  "creative.before": {
    kind: "image",
    ratio: "4:5",
    minWidth: 1600,
    alt: "Fotografía original del producto",
    source: "real-photo",
    status: "pending",
    tone: "cream",
    brief:
      "Foto sencilla del producto real (material inicial). MISMA resolución y encuadre que creative.after.",
    file: "/media/creative/creative-before-4x5",
  },
  "creative.after": {
    kind: "image",
    ratio: "4:5",
    minWidth: 1600,
    alt: "Campaña comercial creada por VINK a partir del producto",
    source: "higgsfield",
    status: "pending",
    isConcept: true,
    tone: "burgundy",
    brief:
      "Campaña comercial con IA del mismo producto, sin alterar etiquetas, colores ni detalles. MISMO encuadre que creative.before.",
    file: "/media/creative/creative-after-4x5",
  },
  "services.creative-studio": {
    kind: "image",
    ratio: "4:5",
    minWidth: 1200,
    alt: "Producción visual de VINK Creative Studio",
    source: "higgsfield",
    status: "pending",
    tone: "burgundy",
    brief: "Pieza representativa de la campaña conceptual (Pieza 01).",
    file: "/media/services/service-creative-4x5",
  },
  "services.branding": {
    kind: "image",
    ratio: "4:5",
    minWidth: 1200,
    alt: "Identidad visual desarrollada por VINK Branding",
    source: "client",
    status: "pending",
    tone: "rose",
    brief: "Identidad y aplicaciones de un proyecto real de branding.",
    file: "/media/services/service-branding-4x5",
  },
  "services.web-studio": {
    kind: "image",
    ratio: "4:5",
    minWidth: 1200,
    alt: "Sitio web desarrollado por VINK Web Studio",
    source: "client",
    status: "pending",
    tone: "charcoal",
    brief: "Captura real de un sitio publicado, en marco de dispositivo.",
    file: "/media/services/service-web-4x5",
  },
  "services.social-content": {
    kind: "image",
    ratio: "4:5",
    minWidth: 1200,
    alt: "Contenido para redes creado por VINK Social & Content",
    source: "client",
    status: "pending",
    tone: "burgundy",
    brief: "Reel o carrusel real y autorizado.",
    file: "/media/services/service-social-4x5",
  },
  "work.signature": {
    kind: "video",
    ratio: "16:9",
    minWidth: 1920,
    alt: "",
    source: "higgsfield",
    status: "pending",
    tone: "burgundy",
    brief:
      "Clip de 6–10 s de la mejor producción de VINK (puede salir de la campaña conceptual). Se muestra creciendo entre las letras de WORK.",
    file: "/media/work/work-signature-16x9",
  },
  "service-hero.creative-studio": {
    kind: "video",
    ratio: "16:9",
    minWidth: 1920,
    alt: "",
    source: "higgsfield",
    status: "pending",
    tone: "burgundy",
    brief: "Clip de 6–10 s de la campaña conceptual (Pieza 01) para el encabezado de Creative Studio. Sin texto quemado.",
    file: "/media/services/hero-creative-16x9",
  },
  "service-hero.branding": {
    kind: "image",
    ratio: "16:9",
    minWidth: 2000,
    alt: "Identidad visual desarrollada por VINK",
    source: "client",
    status: "pending",
    tone: "rose",
    brief: "Presentación de un sistema de marca real: logo, colores y aplicaciones.",
    file: "/media/services/hero-branding-16x9",
  },
  "service-hero.web-studio": {
    kind: "image",
    ratio: "16:9",
    minWidth: 2000,
    alt: "Sitio web desarrollado por VINK en computadora y celular",
    source: "client",
    status: "pending",
    tone: "charcoal",
    brief: "Mockup de un sitio real de VINK en laptop y celular.",
    file: "/media/services/hero-web-16x9",
  },
  "service-hero.social-content": {
    kind: "video",
    ratio: "16:9",
    minWidth: 1920,
    alt: "",
    source: "client",
    status: "pending",
    tone: "burgundy",
    brief: "Montaje de reels y carruseles reales y autorizados.",
    file: "/media/services/hero-social-16x9",
  },
  "creative.on-location": {
    kind: "image",
    ratio: "3:2",
    minWidth: 2000,
    alt: "Grabación en locación realizada por VINK",
    source: "client",
    status: "pending",
    tone: "charcoal",
    brief: "Foto o fotograma de una producción presencial real (negocio, exterior). No estudio.",
    file: "/media/creative/on-location-3x2",
  },
  "creative.drone": {
    kind: "video",
    ratio: "16:9",
    minWidth: 1920,
    alt: "",
    source: "client",
    status: "pending",
    tone: "burgundy",
    brief: "Toma aérea con dron de un proyecto real, 6–10 s.",
    file: "/media/creative/drone-16x9",
  },
  "branding.identity": {
    kind: "image",
    ratio: "16:9",
    minWidth: 2000,
    alt: "Construcción de una identidad: logotipo, colores y tipografías",
    source: "client",
    status: "pending",
    tone: "cream",
    brief: "Lámina de identidad de un proyecto real: logo, paleta y tipografías.",
    file: "/media/branding/identity-16x9",
  },
  "branding.app.cards": {
    kind: "image",
    ratio: "4:3",
    minWidth: 1600,
    alt: "Tarjetas de presentación de un proyecto de branding de VINK",
    source: "client",
    status: "pending",
    tone: "burgundy",
    brief: "Aplicación real: tarjetas de presentación. Puede presentarse en un escenario generado con Higgsfield.",
    file: "/media/branding/app-cards-4x3",
  },
  "branding.app.labels": {
    kind: "image",
    ratio: "4:3",
    minWidth: 1600,
    alt: "Etiquetas de un proyecto de branding de VINK",
    source: "client",
    status: "pending",
    tone: "rose",
    brief: "Aplicación real: etiquetas. Puede presentarse en un escenario generado con Higgsfield.",
    file: "/media/branding/app-labels-4x3",
  },
  "branding.app.packaging": {
    kind: "image",
    ratio: "4:3",
    minWidth: 1600,
    alt: "Empaques de un proyecto de branding de VINK",
    source: "client",
    status: "pending",
    tone: "burgundy",
    brief: "Aplicación real: empaques. Puede presentarse en un escenario generado con Higgsfield.",
    file: "/media/branding/app-packaging-4x3",
  },
  "branding.app.menus": {
    kind: "image",
    ratio: "4:3",
    minWidth: 1600,
    alt: "Menús de un proyecto de branding de VINK",
    source: "client",
    status: "pending",
    tone: "rose",
    brief: "Aplicación real: menús. Puede presentarse en un escenario generado con Higgsfield.",
    file: "/media/branding/app-menus-4x3",
  },
  "branding.app.stationery": {
    kind: "image",
    ratio: "4:3",
    minWidth: 1600,
    alt: "Papelería de un proyecto de branding de VINK",
    source: "client",
    status: "pending",
    tone: "burgundy",
    brief: "Aplicación real: papelería. Puede presentarse en un escenario generado con Higgsfield.",
    file: "/media/branding/app-stationery-4x3",
  },
  "branding.app.social": {
    kind: "image",
    ratio: "4:3",
    minWidth: 1600,
    alt: "Plantillas para redes de un proyecto de branding de VINK",
    source: "client",
    status: "pending",
    tone: "rose",
    brief: "Aplicación real: plantillas para redes. Puede presentarse en un escenario generado con Higgsfield.",
    file: "/media/branding/app-social-4x3",
  },
  "web.desktop": {
    kind: "image",
    ratio: "1440:900",
    minWidth: 1440,
    alt: "Vista de escritorio de un sitio desarrollado por VINK",
    source: "client",
    status: "pending",
    tone: "cream",
    brief: "Captura real a 1440×900 de un sitio publicado.",
    file: "/media/web/site-desktop",
  },
  "web.mobile": {
    kind: "image",
    ratio: "390:844",
    minWidth: 390,
    alt: "Vista móvil de un sitio desarrollado por VINK",
    source: "client",
    status: "pending",
    tone: "cream",
    brief: "Captura real a 390×844 (o 3x) del mismo sitio en celular.",
    file: "/media/web/site-mobile",
  },
  "social.item.1": {
    kind: "video",
    ratio: "9:16",
    minWidth: 1080,
    alt: "",
    source: "client",
    status: "pending",
    tone: "burgundy",
    brief: "Reel real y autorizado (9:16).",
    file: "/media/social/item-1",
  },
  "social.item.2": {
    kind: "image",
    ratio: "4:5",
    minWidth: 1080,
    alt: "Publicación creada por VINK Social & Content",
    source: "client",
    status: "pending",
    tone: "rose",
    brief: "Carrusel o post real y autorizado (4:5).",
    file: "/media/social/item-2",
  },
  "social.item.3": {
    kind: "image",
    ratio: "4:5",
    minWidth: 1080,
    alt: "Publicación creada por VINK Social & Content",
    source: "client",
    status: "pending",
    tone: "charcoal",
    brief: "Carrusel o post real y autorizado (4:5).",
    file: "/media/social/item-3",
  },
  "social.item.4": {
    kind: "video",
    ratio: "9:16",
    minWidth: 1080,
    alt: "",
    source: "client",
    status: "pending",
    tone: "charcoal",
    brief: "Reel real y autorizado (9:16).",
    file: "/media/social/item-4",
  },
  "social.item.5": {
    kind: "image",
    ratio: "4:5",
    minWidth: 1080,
    alt: "Publicación creada por VINK Social & Content",
    source: "client",
    status: "pending",
    tone: "burgundy",
    brief: "Carrusel o post real y autorizado (4:5).",
    file: "/media/social/item-5",
  },
  "social.item.6": {
    kind: "video",
    ratio: "9:16",
    minWidth: 1080,
    alt: "",
    source: "client",
    status: "pending",
    tone: "rose",
    brief: "Reel real y autorizado (9:16).",
    file: "/media/social/item-6",
  },
  "numa.hero": {
    kind: "video",
    ratio: "16:9",
    minWidth: 1920,
    file: "/media/numa/numa-hero-16x9",
    fileMobile: "/media/numa/numa-hero-9x16",
    alt: "",
    source: "client",
    status: "pending",
    tone: "red",
    brief: "Imagen o video de fondo para el inicio de NUMA, en tonos rojos/cálidos (atardecer, terracota, interiores con luz cálida). Sin texto. El logo de NUMA va encima en blanco, así que debe tener zonas oscuras o tranquilas. Entregar también la versión vertical 9:16.",
  },
  "numa.segment.hotels": {
    kind: "image",
    ratio: "4:5",
    minWidth: 1200,
    file: "/media/numa/numa-segment-hotels-4x5",
    alt: "Hoteles y resorts — NUMA Real Estate",
    source: "client",
    status: "pending",
    tone: "light",
    brief: "Fachada, alberca o suite de un hotel o resort.",
  },
  "numa.segment.vacation": {
    kind: "image",
    ratio: "4:5",
    minWidth: 1200,
    file: "/media/numa/numa-segment-vacation-4x5",
    alt: "Airbnb y rentas vacacionales — NUMA Real Estate",
    source: "client",
    status: "pending",
    tone: "light",
    brief: "Interior o terraza de una renta vacacional.",
  },
  "numa.segment.sale": {
    kind: "image",
    ratio: "4:5",
    minWidth: 1200,
    file: "/media/numa/numa-segment-sale-4x5",
    alt: "Propiedades en venta y renta — NUMA Real Estate",
    source: "client",
    status: "pending",
    tone: "light",
    brief: "Casa o departamento residencial.",
  },
  "numa.segment.land": {
    kind: "image",
    ratio: "4:5",
    minWidth: 1200,
    file: "/media/numa/numa-segment-land-4x5",
    alt: "Terrenos y desarrollos — NUMA Real Estate",
    source: "client",
    status: "pending",
    tone: "light",
    brief: "Toma aérea de un terreno o desarrollo.",
  },
  "numa.segment.yachts": {
    kind: "image",
    ratio: "4:5",
    minWidth: 1200,
    file: "/media/numa/numa-segment-yachts-4x5",
    alt: "Yates y experiencias náuticas — NUMA Real Estate",
    source: "client",
    status: "pending",
    tone: "light",
    brief: "Yate o embarcación navegando, de preferencia en la zona hotelera.",
  },
  "numa.market.cabos": {
    kind: "image",
    ratio: "16:9",
    minWidth: 2000,
    file: "/media/numa/numa-market-cabos-16x9",
    alt: "Los Cabos, Baja California Sur",
    source: "client",
    status: "pending",
    tone: "light",
    brief: "Paisaje o propiedad icónica de Los Cabos: mar, arco, marina o zona hotelera.",
  },
  "numa.market.gdl": {
    kind: "image",
    ratio: "16:9",
    minWidth: 2000,
    file: "/media/numa/numa-market-gdl-16x9",
    alt: "Guadalajara, Jalisco",
    source: "client",
    status: "pending",
    tone: "light",
    brief: "Propiedad residencial premium o vista urbana de Guadalajara (Zapopan, Puerta de Hierro, Providencia…).",
  },
  "numa.logo.white": {
    kind: "image",
    ratio: "3:1",
    minWidth: 800,
    file: "/media/numa/numa-logo-white",
    alt: "NUMA Real Estate",
    source: "client",
    status: "pending",
    tone: "charcoal",
    brief: "Logo de NUMA en blanco, fondo transparente (SVG de preferencia, o PNG). Se usa sobre fondos oscuros.",
  },
  "numa.logo.black": {
    kind: "image",
    ratio: "3:1",
    minWidth: 800,
    file: "/media/numa/numa-logo-black",
    alt: "NUMA Real Estate",
    source: "client",
    status: "pending",
    tone: "cream",
    brief: "Logo de NUMA en negro, fondo transparente (SVG de preferencia, o PNG). Se usa sobre fondos claros.",
  },
} satisfies Record<string, Asset>;

export type AssetId = keyof typeof assets;

export type ResolvedAsset = Asset & {
  src: string | null;
  srcMobile: string | null;
  poster: string | null;
  posterMobile: string | null;
};

const IMAGE_EXT = [".avif", ".webp", ".jpg", ".jpeg", ".png", ".svg"];
const VIDEO_EXT = [".mp4", ".webm"];
const available = new Set<string>(manifest.files);

/** Devuelve la ruta real del archivo si existe en /public (con cualquier extensión válida). */
function find(base: string | undefined, exts: string[]) {
  if (!base) return null;
  for (const ext of exts) if (available.has(base + ext)) return base + ext;
  return null;
}

export function getAsset(id: AssetId): ResolvedAsset {
  const a: Asset = assets[id];
  const exts = a.kind === "video" ? VIDEO_EXT : IMAGE_EXT;
  return {
    ...a,
    src: find(a.file, exts),
    srcMobile: find(a.fileMobile, VIDEO_EXT),
    poster: a.kind === "video" ? find(`${a.file}-poster`, IMAGE_EXT) : null,
    posterMobile: a.fileMobile ? find(`${a.fileMobile}-poster`, IMAGE_EXT) : null,
  };
}
