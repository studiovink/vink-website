/*
 * FUSO · Pasta & aperitivo — contenido editable de la landing (/fuso).
 *
 * FUSO es una marca conceptual: los precios son ejemplos en MXN y los datos
 * del negocio están en `null` hasta que se confirmen. No inventar dirección,
 * teléfono, horarios ni redes: lo que siga en `null` no se muestra.
 */

export const FUSO_IMAGES = "/fuso/images";
export const FUSO_BRAND = "/fuso/brand";

export type FusoCategory = "Todo" | "Pastas" | "Para compartir" | "Postres" | "Aperitivo";

export type FusoDish = {
  id: string;
  name: string;
  description: string;
  category: Exclude<FusoCategory, "Todo">;
  /** Precio de ejemplo en MXN. */
  price: number;
  image: string;
  /** Proporción del recorte: los platos son cuadrados, la copa es vertical. */
  width: number;
  height: number;
  alt: string;
  allergens: string[];
};

export type FusoBusiness = {
  address: string | null;
  city: string | null;
  phone: string | null;
  whatsapp: string | null;
  email: string | null;
  instagram: string | null;
  hours: string | null;
  /**
   * URL del servicio que recibe las solicitudes de mesa (POST con JSON).
   * Mientras sea `null`, el formulario funciona en modo demostración y no envía nada.
   */
  reservationEndpoint: string | null;
};

const business: FusoBusiness = {
  address: null,
  city: null,
  phone: null,
  whatsapp: null,
  email: null,
  instagram: null,
  hours: null,
  reservationEndpoint: null,
};

const items: FusoDish[] = [
  {
    id: "rigatoni",
    name: "Rigatoni rosso",
    description: "Tomate rostizado, albahaca y pecorino.",
    category: "Pastas",
    price: 245,
    image: "rigatoni.webp",
    width: 1254,
    height: 1254,
    alt: "Plato de rigatoni con salsa de tomate, albahaca y pecorino",
    allergens: ["gluten", "lácteos"],
  },
  {
    id: "ravioli",
    name: "Ravioli de ricotta",
    description: "Mantequilla dorada, salvia y parmesano.",
    category: "Pastas",
    price: 265,
    image: "ravioli.webp",
    width: 1254,
    height: 1254,
    alt: "Plato de ravioli con mantequilla dorada y salvia",
    allergens: ["gluten", "huevo", "lácteos"],
  },
  {
    id: "burrata",
    name: "Burrata de temporada",
    description: "Tomates, aceite de oliva y albahaca.",
    category: "Para compartir",
    price: 195,
    image: "burrata.webp",
    width: 1254,
    height: 1254,
    alt: "Burrata con tomates de colores, aceite de oliva y albahaca",
    allergens: ["lácteos"],
  },
  {
    id: "tiramisu",
    name: "Tiramisú de la casa",
    description: "Espresso, mascarpone y cacao.",
    category: "Postres",
    price: 145,
    image: "tiramisu.webp",
    width: 1254,
    height: 1254,
    alt: "Porción de tiramisú espolvoreada con cacao",
    allergens: ["gluten", "huevo", "lácteos"],
  },
  {
    id: "spritz",
    name: "Spritz FUSO",
    description: "Aperitivo de naranja, burbujas y mucho hielo.",
    category: "Aperitivo",
    price: 165,
    image: "spritz.webp",
    width: 1024,
    height: 1536,
    alt: "Spritz de naranja en copa con hielo",
    allergens: [],
  },
];

export type FusoPhotoKey = "table" | "interior" | "hands";

export const fuso = {
  brand: {
    name: "FUSO",
    descriptor: "Pasta & aperitivo",
    tagline: "Dale otra vuelta.",
    isConcept: true,
  },
  metaDescription:
    "FUSO: pasta hecha a mano, aperitivo y sobremesa. Concepto de restaurante contemporáneo.",
  hero: {
    titleLines: ["Dale otra", "vuelta."],
    descriptionLines: ["Pasta hecha a mano.", "Aperitivo sin prisa."],
    primaryCta: "Explorar la carta",
    secondaryCta: "Solicitar mesa",
    imageAlt: "Spaghetti con salsa de tomate enrollado en un tenedor",
  },
  nav: [
    { label: "Inicio", href: "#inicio" },
    { label: "Nuestra cocina", href: "#historia" },
    { label: "La carta", href: "#carta" },
    { label: "El espacio", href: "#espacio" },
    { label: "Galería", href: "#galeria" },
    { label: "Reservas", href: "#reservas" },
  ],
  story: {
    titleLines: ["Lo bueno", "se comparte."],
    body: "Una buena pasta empieza con las manos y termina en una mesa llena. En FUSO mezclamos recetas italianas, ingredientes de temporada y ganas de quedarnos un rato más.",
    secondaryLines: ["Salsa al fuego.", "Pasta al dente.", "Una ronda para todos."],
    link: "Conoce nuestra cocina",
    imageAlt: "Chef del concepto FUSO con un sartén de pasta",
  },
  menu: {
    titleLines: ["La próxima", "buena idea."],
    intro: "Pide al centro, prueba algo nuevo y deja espacio para el postre.",
    currency: "MXN",
    pricesAreExamples: true,
    categories: ["Todo", "Pastas", "Para compartir", "Postres", "Aperitivo"] as FusoCategory[],
    items,
    aperitivoLines: ["La pasta pone el plan.", "El aperitivo lo alarga."],
    aperitivoCta: "Una ronda más",
    fullMenuCta: "Ver la carta completa",
    shortNote: "Carta conceptual. Precios de ejemplo en MXN.",
    note: "Carta conceptual. Precios de ejemplo en MXN. Ingredientes y alérgenos por confirmar con el restaurante antes de publicar.",
  },
  space: {
    titleLines: ["Aquí la", "sobremesa", "cuenta."],
    body: "Luz cálida, cocina abierta y una mesa que invita a quedarse.",
    imageAlt: "Interior cálido con barra de pasta abierta, madera y asientos color berenjena",
  },
  craft: {
    titleLines: ["Tiempo, manos", "y buena pasta."],
    body: "Estirar, cortar y cocinar justo a tiempo. Lo hacemos con calma para que tú sólo tengas que escoger con quién compartirlo.",
    steps: [
      { title: "A mano", body: "La textura empieza en la masa." },
      { title: "Al fuego", body: "La salsa encuentra su punto en la sartén." },
      { title: "A la mesa", body: "Todo está listo para otra vuelta." },
    ],
    imageAlt: "Manos de un artesano cortando tagliatelle fresco sobre una mesa de madera",
    caption: "El oficio se nota en cada vuelta.",
  },
  gallery: {
    titleLines: ["Buena mesa.", "Mejor compañía."],
    photos: [
      {
        key: "table",
        image: "table.webp",
        label: "Ampliar fotografía de la mesa",
        alt: "Mesa con pasta, burrata y dos copas de aperitivo",
        caption: "Una mesa para compartir pasta y aperitivo.",
      },
      {
        key: "interior",
        image: "interior.webp",
        label: "Ampliar fotografía del espacio",
        alt: "Barra e interior de FUSO",
        caption: "Luz cálida, cocina abierta y sobremesa.",
      },
      {
        key: "hands",
        image: "hands.webp",
        label: "Ampliar fotografía del oficio",
        alt: "Preparación artesanal de pasta fresca",
        caption: "El oficio de hacer pasta a mano.",
      },
    ] as { key: FusoPhotoKey; image: string; label: string; alt: string; caption: string }[],
  },
  reserve: {
    titleLines: ["Nos vemos", "en la mesa."],
    body: "Escoge la fecha, reúne a los tuyos y empieza a hacer hambre.",
    cta: "Solicitar mesa",
    conceptNote: "Concepto de restaurante. Reservas de demostración.",
    confirmation: "La solicitud se confirma únicamente cuando el restaurante responde.",
    formTitleLines: ["Una mesa", "para los tuyos."],
    demoNotice: "Formulario de muestra. No envía datos ni confirma reservas reales.",
    demoResult:
      "Vista previa: los campos son válidos. No se enviaron datos y no se reservó ninguna mesa.",
    times: ["13:00", "14:30", "16:00", "18:00", "19:30", "21:00"],
    maxGuests: 8,
    plateAlt: "Plato de ravioli con mantequilla y salvia",
  },
  business,
  footer: {
    links: [
      { label: "Nuestra cocina", href: "#historia" },
      { label: "Carta", href: "#carta" },
      { label: "El espacio", href: "#espacio" },
      { label: "Reservas", href: "#reservas" },
    ],
    conceptLabel: "FUSO es un concepto de marca y restaurante.",
    imagesLabel: "Imágenes generadas con IA para esta propuesta.",
    pendingLabel: "Dirección, horarios y contacto por confirmar.",
    copyright: "FUSO",
  },
};
