import type { AssetId } from "./assets";

/*
 * NUMA Real Estate — submarca de VINK Creative Studio para marketing
 * inmobiliario y turístico (Los Cabos y Guadalajara).
 *
 * Los colores de NUMA se cambian en src/app/globals.css (tokens --color-numa-*).
 * El logo se agrega como archivo: public/media/numa/numa-logo-white.svg (o .png)
 * y numa-logo-black.svg (o .png). Mientras no existan se muestra el nombre en texto.
 */

export const numa = {
  name: "NUMA Real Estate",
  short: "NUMA",
  href: "/numa-real-estate",
  endorsement: "Una submarca de VINK Creative Studio",
  /** Promesa de marca (Manual de Identidad NUMA, 1.5). */
  promise: "Cada propiedad que representamos se comunica con el mismo nivel de exigencia que una marca de lujo.",
  metaDescription:
    "Fotografía, video, dron, contenido y páginas web para hoteles, rentas vacacionales, propiedades, terrenos y yates en Los Cabos y Guadalajara.",

  hero: {
    eyebrow: "Real estate · Hospitality · Yachts",
    statement: "Propiedades que se ven tan extraordinarias como son.",
    sub: "Marketing visual para hoteles, rentas vacacionales, propiedades en venta y renta, terrenos y yates en Los Cabos y Guadalajara.",
    media: "numa.hero" as AssetId,
  },


  about: {
    label: "About us",
    statement:
      "NUMA es property marketing: comunicamos propiedades con la misma exigencia que una marca de lujo o una revista de arquitectura.",
    text: "Dirección de arte editorial, fotografía, video y estrategia comercial para desarrolladores, asesores, inversionistas, hoteles y empresas náuticas en Los Cabos y Guadalajara.",
  },

  segments: {
    label: "¿Para quién es NUMA?",
    title: "Para quienes tienen algo que vale la pena mostrar.",
    items: [
      {
        key: "hotels",
        title: "Hoteles y resorts",
        text: "Contenido para atraer reservas directas y fortalecer la presencia de tu hotel en la zona hotelera.",
        produce: ["Fotografía de habitaciones y amenidades", "Video de experiencia", "Contenido para redes"],
        media: "numa.segment.hotels" as AssetId,
      },
      {
        key: "vacation",
        title: "Airbnb y rentas vacacionales",
        text: "Imágenes que hacen destacar tu anuncio y transmiten cómo se vive la estancia.",
        produce: ["Fotos para Airbnb y Booking", "Reels de la propiedad", "Página de reservas"],
        media: "numa.segment.vacation" as AssetId,
      },
      {
        key: "sale",
        title: "Propiedades en venta y renta",
        text: "Casas, departamentos y residencias presentadas con la calidad que esperan los compradores.",
        produce: ["Fotografía y video", "Recorrido cinematográfico", "Ficha web de la propiedad"],
        media: "numa.segment.sale" as AssetId,
      },
      {
        key: "land",
        title: "Terrenos y desarrollos",
        text: "Vistas aéreas y contenido que comunican ubicación, dimensiones y potencial.",
        produce: ["Tomas con dron", "Video de ubicación", "Landing del desarrollo"],
        media: "numa.segment.land" as AssetId,
      },
      {
        key: "yachts",
        title: "Yates y experiencias náuticas",
        text: "Contenido para empresas de yates, barcos y tours que se promocionan en la zona hotelera.",
        produce: ["Video a bordo y aéreo", "Fotografía de la embarcación", "Campañas en redes"],
        media: "numa.segment.yachts" as AssetId,
      },
    ],
  },

  markets: {
    label: "Markets",
    title: "Dos mercados. Un mismo estándar.",
    items: [
      {
        key: "cabos",
        name: "Los Cabos",
        region: "Baja California Sur",
        text: "Propiedades frente al mar, hoteles y resorts, rentas vacacionales, villas, terrenos y experiencias náuticas en la zona hotelera, para compradores y huéspedes nacionales e internacionales.",
        tags: ["Frente al mar", "Hoteles y resorts", "Rentas vacacionales", "Yates"],
        media: "numa.market.cabos" as AssetId,
      },
      {
        key: "gdl",
        name: "Guadalajara",
        region: "Jalisco",
        /* PENDIENTE DE CONFIRMAR: rango de precio del segmento (se habló de 2–10 o 3–10 millones de pesos). */
        text: "Propiedades residenciales de 3 a 10 millones de pesos: casas y departamentos en las zonas de mayor plusvalía, presentadas para compradores que buscan calidad.",
        tags: ["Residencial", "Venta y renta", "3 a 10 MDP"],
        media: "numa.market.gdl" as AssetId,
      },
    ],
  },

  services: {
    label: "What we do",
    title: "Lo que hacemos por tu propiedad",
    items: [
      {
        title: "Real Estate Photography",
        subtitle: "Fotografía profesional",
        text: "Interiores, exteriores, amenidades y detalles con iluminación, composición y edición profesional.",
      },
      {
        title: "Cinematic Tours",
        subtitle: "Video y recorridos",
        text: "Recorridos cinematográficos que transmiten el espacio, la luz y el estilo de vida de la propiedad.",
      },
      {
        title: "Drone & Aerial",
        subtitle: "Tomas aéreas",
        text: "Vistas aéreas de propiedades, terrenos, desarrollos, costa y embarcaciones, sujetas a condiciones climáticas, seguridad y permisos aplicables.",
      },
      {
        title: "Virtual Staging",
        subtitle: "Ambientación digital",
        text: "Ambientamos espacios vacíos con mobiliario y decoración digital, sin alterar la arquitectura real. Las imágenes ambientadas se identifican como tales.",
      },
      {
        title: "Social Content & Reels",
        subtitle: "Contenido para redes",
        text: "Reels, carruseles y publicaciones para Instagram, TikTok y Facebook que muestran cada propiedad de forma atractiva.",
      },
      {
        title: "Meta Ads",
        subtitle: "Campañas para generar prospectos",
        text: "Campañas en Facebook e Instagram dirigidas a compradores, inquilinos o huéspedes. El presupuesto publicitario es independiente.",
      },
      {
        title: "Listing Pages & Catalogs",
        subtitle: "Páginas de propiedad y catálogos",
        text: "Una página para cada propiedad o un catálogo digital con fotos, video, ubicación y contacto directo por WhatsApp.",
      },
      {
        title: "Brand Identity",
        subtitle: "Identidad para desarrollos y hoteles",
        text: "Nombre visual, logotipo y aplicaciones para desarrollos, hoteles, rentas y empresas náuticas.",
      },
    ],
  },





  contact: {
    label: "Let's list it",
    title: ["¿Tienes una propiedad", "que merece ser vista?"],
    text: "Cuéntanos qué quieres promocionar: un hotel, una renta, una propiedad, un terreno o un yate. Te preparamos una propuesta a la medida.",
  },
};
