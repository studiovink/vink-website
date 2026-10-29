import type { AssetId } from "./assets";
import type { ServiceSlug } from "./site";

/*
 * Contenido de las páginas de especialidad (/services/<slug>),
 * tomado de los puntos 5–8 del documento maestro.
 */

export type Offering = {
  title: string;
  subtitle: string;
  text: string;
  includes?: string[];
  note?: string;
};

export type ServicePage = {
  slug: ServiceSlug;
  name: string;
  short: string;
  eyebrow: string;
  headline: string;
  intro: string[];
  heroMedia: AssetId;
  whatIs: { title: string; statement: string; text: string[] };
  offeringsTitle: string;
  offerings: Offering[];
  demo: "creative" | "branding" | "web" | "social";
  needs?: { title: string; rows: { need: string; solution: string }[] };
  process?: { title: string; steps: { title: string; text: string }[]; note?: string };
  approach?: {
    eyebrow: string;
    title: string;
    text: string[];
    aspects: { title: string; text: string }[];
    note: string;
  };
  addOn?: { eyebrow: string; title: string; text: string[]; tags: string[] };
  notes?: string[];
  closing: { title: string; text: string; tagline: string };
  primaryCta: string;
  secondaryCta?: { label: string; href: string };
  metaDescription: string;
};

export const servicePages: ServicePage[] = [
  {
    slug: "creative-studio",
    name: "VINK Creative Studio",
    short: "Creative Studio",
    eyebrow: "Creative Production · AI Visuals · Commercial Content",
    headline: "Imagina algo extraordinario. Nosotros encontramos cómo crearlo.",
    intro: [
      "Transformamos ideas en producciones visuales que van más allá de lo convencional.",
      "Combinamos dirección creativa, producción audiovisual e inteligencia artificial avanzada para desarrollar fotografías comerciales, videos cinematográficos y campañas visuales que reflejen la esencia de cada marca.",
    ],
    heroMedia: "service-hero.creative-studio",
    whatIs: {
      title: "¿Qué es VINK Creative Studio?",
      statement:
        "No se trata solamente de generar imágenes o videos. Cada proyecto parte de un concepto, una estrategia y una visión creativa.",
      text: [
        "Es nuestra especialidad dedicada a la creación de contenido visual y audiovisual para marcas, negocios, productos y campañas publicitarias.",
        "Podemos partir de una fotografía real de un producto, una idea escrita, un concepto de campaña o material audiovisual existente para desarrollar nuevas propuestas visuales. Nuestro enfoque no consiste en producir contenido automáticamente, sino en construir una visión creativa y seleccionar las técnicas adecuadas para llevarla a cabo.",
      ],
    },
    offeringsTitle: "Lo que podemos crear",
    offerings: [
      {
        title: "AI Product Photography",
        subtitle: "Photoshoots virtuales",
        text: "Fotografías comerciales de producto con inteligencia artificial, cuidando la iluminación, composición, ambientación y estética de cada marca. Podemos trabajar a partir de fotografías reales de tus productos para crear diferentes escenarios, fondos y conceptos visuales.",
        includes: [
          "Desarrollo del concepto creativo y referencias visuales",
          "Creación de escenarios y composiciones digitales",
          "Fotografía comercial asistida por IA",
          "Ajustes de iluminación, color y dirección de arte",
          "Retoque y edición final",
          "Adaptación a formatos para redes, publicidad o sitios web",
        ],
        note: "Cuidamos que las características, etiquetas, colores y detalles de tus productos no se alteren: la fidelidad del producto es parte de nuestros criterios de calidad.",
      },
      {
        title: "AI Commercial Films",
        subtitle: "Comerciales cinematográficos",
        text: "Videos publicitarios con dirección cinematográfica y herramientas de IA. No nos limitamos a videos donde una imagen simplemente se mueve: construimos secuencias con intención, ritmo y coherencia entre escenas.",
        includes: [
          "Concepto creativo y objetivo del comercial",
          "Guion visual o storyboard",
          "Dirección de arte y referencias cinematográficas",
          "Generación y producción de escenas mediante IA",
          "Edición, montaje y transiciones",
          "Diseño sonoro, música y efectos según el alcance",
          "Corrección de color y entrega en formatos acordados",
        ],
        note: "La duración, complejidad, número de escenas y nivel de postproducción se definen según cada proyecto.",
      },
      {
        title: "Hybrid Production",
        subtitle: "Producción híbrida",
        text: "Contenido que combina grabaciones reales con inteligencia artificial y efectos digitales: la autenticidad del contenido real y las posibilidades visuales de la tecnología.",
        includes: [
          "Videos reales con efectos y escenarios generados digitalmente",
          "Transiciones creativas entre escenas",
          "Extensiones de ambientes y fondos",
          "Elementos visuales animados",
          "Campañas que integran talento humano, productos reales e IA",
        ],
        note: "El alcance depende de la calidad del material original y de la viabilidad técnica de cada efecto. Cuando se utiliza la imagen de una persona, se requieren las autorizaciones correspondientes.",
      },
      {
        title: "Creative Campaigns",
        subtitle: "Campañas visuales",
        text: "Conceptos visuales para lanzamientos, publicidad y comunicación de marca. Construimos un concepto que se aplica a distintos materiales y canales, con una identidad visual consistente.",
        includes: [
          "Concepto y dirección creativa",
          "Moodboard y línea visual",
          "Producción de imágenes y videos",
          "Adaptaciones a distintos formatos",
          "Piezas para campañas publicitarias",
          "Coherencia visual entre todos los materiales",
        ],
        note: "La cantidad de piezas y los medios de uso se establecen en la propuesta.",
      },
      {
        title: "On-Location Photo & Video",
        subtitle: "Producción audiovisual presencial",
        text: "Fotografía, video y tomas aéreas con dron en tus instalaciones o en locaciones acordadas, para mostrar tus espacios, productos, procesos y experiencias de manera auténtica.",
        includes: [
          "Fotografía de negocios, instalaciones, productos y espacios",
          "Videos promocionales y corporativos",
          "Reels y contenido audiovisual para marcas",
          "Grabación de procesos, servicios y experiencias",
          "Tomas aéreas con dron",
          "Edición y postproducción de fotografías y videos",
        ],
        note: "No realizamos sesiones en un estudio fotográfico físico. Las tomas con dron están sujetas a condiciones climáticas, seguridad y permisos aplicables.",
      },
    ],
    demo: "creative",
    needs: {
      title: "¿Para qué puede contratarse?",
      rows: [
        { need: "Quiero imágenes más profesionales de mis productos.", solution: "Photoshoot comercial con IA o fotografía en locación." },
        { need: "Voy a lanzar un producto o una colección.", solution: "Campaña visual con fotografías y video publicitario." },
        { need: "Quiero un comercial diferente para mi marca.", solution: "Producción cinematográfica con IA." },
        { need: "Ya tengo videos, pero quiero hacerlos más creativos.", solution: "Edición avanzada y producción híbrida." },
        { need: "Necesito mostrar mi negocio o mis instalaciones.", solution: "Fotografía y video presencial, con opción de tomas con dron." },
        { need: "Quiero tomas aéreas de mi negocio, propiedad o proyecto.", solution: "Grabación con dron, según las condiciones y permisos aplicables." },
        { need: "Tengo una idea visual, pero no sé cómo producirla.", solution: "Desarrollo de concepto y propuesta creativa personalizada." },
      ],
    },
    process: {
      title: "Nuestro proceso de producción",
      steps: [
        { title: "Brief creativo", text: "Conocemos el producto, la marca, el objetivo de la producción y tus referencias." },
        { title: "Concepto y dirección de arte", text: "Definimos el estilo visual, la narrativa, las escenas y los recursos necesarios." },
        { title: "Producción", text: "Desarrollamos el material con IA, grabaciones en locación o una combinación de técnicas." },
        { title: "Postproducción", text: "Edición, composición, color, sonido y los ajustes necesarios según el proyecto." },
        { title: "Entrega final", text: "Materiales en los formatos y especificaciones acordados para su uso." },
      ],
    },
    notes: [
      "Producción con IA: photoshoots virtuales, comerciales cinematográficos y escenarios conceptuales.",
      "Producción presencial: fotografía, video y dron en locaciones reales, sin sesiones en estudio.",
      "Producción híbrida: material real combinado con IA y efectos digitales.",
    ],
    closing: {
      title: "Cada idea merece su propia producción.",
      text: "Puedes contratar una producción específica o desarrollar una campaña completamente personalizada. Seleccionamos las herramientas y técnicas adecuadas para transformar tu visión en una propuesta visual de calidad.",
      tagline: "Tú imagínalo. Nosotros encontramos cómo hacerlo realidad.",
    },
    primaryCta: "Cotizar una producción",
    secondaryCta: { label: "Ver nuestros proyectos", href: "/work?category=creative-studio" },
    metaDescription:
      "Fotografía comercial con IA, comerciales cinematográficos, producción híbrida, campañas visuales y producción en locación con dron.",
  },
  {
    slug: "branding",
    name: "VINK Branding",
    short: "Branding",
    eyebrow: "Brand Identity · Brand Applications",
    headline: "Tu marca es mucho más que un logotipo.",
    intro: [
      "Creamos identidades visuales que reflejan la personalidad de cada negocio y lo ayudan a destacar.",
      "Desde el diseño de tu identidad hasta sus aplicaciones en diferentes formatos, cuidamos que cada elemento mantenga una imagen profesional y coherente.",
    ],
    heroMedia: "service-hero.branding",
    whatIs: {
      title: "¿Qué es VINK Branding?",
      statement: "Creamos la identidad visual de tu marca y la llevamos a los formatos donde la necesitas.",
      text: [
        "Es nuestra especialidad enfocada en crear y desarrollar identidades visuales para negocios, emprendimientos y marcas personales.",
        "Combinamos creatividad, diseño y una comprensión de la personalidad de cada marca para construir una identidad que pueda reconocerse y aplicarse de manera consistente.",
      ],
    },
    offeringsTitle: "Nuestros servicios",
    offerings: [
      {
        title: "Brand Identity",
        subtitle: "Identidad visual",
        text: "Creamos la identidad que representa a tu marca. Diseñamos los elementos visuales que le dan personalidad y coherencia a un negocio, desde su logotipo hasta los colores, tipografías y recursos gráficos que lo identifican.",
        includes: [
          "Logotipo",
          "Versiones secundarias",
          "Paleta de colores",
          "Tipografías",
          "Moodboard",
          "Manual de identidad visual",
        ],
      },
      {
        title: "Brand Applications",
        subtitle: "Aplicaciones de marca",
        text: "Llevamos tu identidad a diferentes formatos. Adaptamos la imagen de tu marca a materiales físicos y digitales para que mantenga una presentación profesional y consistente en todos sus puntos de contacto.",
        includes: [
          "Tarjetas de presentación",
          "Etiquetas",
          "Empaques",
          "Menús",
          "Catálogos",
          "Papelería",
          "Plantillas para redes sociales",
        ],
        note: "Las aplicaciones se cotizan de acuerdo con las necesidades de cada negocio.",
      },
    ],
    demo: "branding",
    closing: {
      title: "Hagamos que tu marca tenga una identidad propia.",
      text: "Construimos la identidad visual de tu negocio y la aplicamos a los materiales que realmente necesitas.",
      tagline: "Think with Vink.",
    },
    primaryCta: "Crear mi marca",
    metaDescription:
      "Identidad visual (logotipo, colores, tipografías, manual) y aplicaciones de marca para negocios, emprendimientos y marcas personales.",
  },
  {
    slug: "web-studio",
    name: "VINK Web Studio",
    short: "Web Studio",
    eyebrow: "Landing Pages · Websites · Digital Catalogs",
    headline: "Tu marca merece un espacio digital a su altura.",
    intro: [
      "Diseñamos y desarrollamos páginas web que combinan creatividad, diseño y funcionalidad para que tu negocio tenga una presencia digital profesional.",
      "Cada proyecto está pensado para reflejar la identidad de tu marca, facilitar la navegación y ayudar a tus visitantes a encontrar lo que necesitan.",
    ],
    heroMedia: "service-hero.web-studio",
    whatIs: {
      title: "¿Qué es VINK Web Studio?",
      statement: "Una página web es mucho más que un espacio en internet: es una herramienta para presentar, comunicar y conectar.",
      text: [
        "Es nuestra especialidad enfocada en diseñar y desarrollar páginas web personalizadas para marcas, empresas y emprendedores, adaptables a diferentes dispositivos.",
        "No usamos diseños genéricos. Cada proyecto parte de entender qué necesita comunicar la marca y qué queremos que hagan los visitantes al entrar a su página.",
      ],
    },
    offeringsTitle: "Lo que podemos crear",
    offerings: [
      {
        title: "Landing Pages",
        subtitle: "Páginas de aterrizaje",
        text: "Una página diseñada para comunicar un objetivo específico: presentar un producto, servicio, promoción o campaña y facilitar que los visitantes realicen una acción concreta. Por ejemplo, una clínica que presenta un tratamiento y recibe solicitudes por WhatsApp.",
        includes: [
          "Diseño personalizado",
          "Presentación del producto o servicio",
          "Secciones informativas",
          "Botones de contacto",
          "Formulario de contacto",
          "Diseño adaptable a celulares y computadoras",
        ],
      },
      {
        title: "Business Websites",
        subtitle: "Páginas web empresariales",
        text: "Un espacio digital completo para presentar tu negocio, con diferentes secciones donde los visitantes conocen la marca, exploran sus servicios y encuentran cómo contactarte. Ideales para empresas, clínicas, restaurantes y estudios creativos.",
        includes: [
          "Página de inicio",
          "Quiénes somos",
          "Servicios",
          "Galerías de imágenes o proyectos",
          "Preguntas frecuentes",
          "Información de contacto",
          "Integración con WhatsApp y redes sociales",
          "Diseño adaptable a diferentes dispositivos",
        ],
      },
      {
        title: "Digital Catalogs",
        subtitle: "Catálogos digitales",
        text: "Tus productos organizados en un catálogo digital atractivo y fácil de explorar, sin requerir una tienda en línea con pagos. Por ejemplo, una joyería que presenta sus colecciones y recibe consultas por WhatsApp.",
        includes: [
          "Categorías de productos",
          "Fotografías y descripciones",
          "Precios, cuando se requieran",
          "Fichas de producto",
          "Botones de consulta por WhatsApp",
          "Diseño adaptable a celulares",
        ],
        note: "Los sistemas de pago, inventario automatizado y funciones de comercio electrónico no están incluidos por defecto.",
      },
    ],
    demo: "web",
    needs: {
      title: "¿Qué necesita tu negocio?",
      rows: [
        { need: "Quiero promocionar un servicio o producto específico.", solution: "Landing Page" },
        { need: "Mi negocio necesita una página web profesional.", solution: "Business Website" },
        { need: "Quiero mostrar mis productos sin montar una tienda en línea.", solution: "Digital Catalog" },
        { need: "Mi página actual necesita una renovación.", solution: "Rediseño dentro del servicio web correspondiente" },
      ],
    },
    process: {
      title: "Nuestro proceso de desarrollo web",
      steps: [
        { title: "Discover", text: "Entendemos tu negocio, objetivos y las necesidades de tu página." },
        { title: "Structure", text: "Definimos las secciones, la navegación y la información que presentaremos." },
        { title: "Design", text: "Creamos una propuesta visual alineada con la identidad de tu marca." },
        { title: "Develop", text: "Desarrollamos una página funcional y adaptable a diferentes dispositivos." },
        { title: "Launch", text: "Revisamos el funcionamiento y preparamos el sitio para su lanzamiento." },
      ],
      note: "Los costos de dominio, hosting, mantenimiento y servicios externos se aclaran en cada propuesta.",
    },
    notes: [
      "Se complementa con VINK Branding y VINK Creative Studio cuando tu sitio necesita identidad visual, fotografías o videos.",
    ],
    closing: {
      title: "Diseño que se ve bien y funciona mejor.",
      text: "No creemos en páginas genéricas. Desde una landing page hasta un sitio web completo o un catálogo digital, encontramos la mejor manera de llevar tu negocio al mundo digital.",
      tagline: "Hagamos que tu marca destaque también en internet.",
    },
    primaryCta: "Crear mi página web",
    secondaryCta: { label: "Explorar sitios web", href: "/work?category=web-studio" },
    metaDescription:
      "Landing pages, páginas web empresariales y catálogos digitales con diseño personalizado y adaptable a cualquier dispositivo.",
  },
  {
    slug: "social-content",
    name: "VINK Social & Content",
    short: "Social & Content",
    eyebrow: "Social Media Management · Content Creation · Digital Presence",
    headline: "No se trata de publicar más. Se trata de comunicar mejor.",
    intro: [
      "Creamos y gestionamos contenido para redes sociales que combina creatividad, estrategia y una identidad visual coherente.",
      "No trabajamos con paquetes de publicaciones predeterminados, sino con propuestas mensuales diseñadas alrededor de las necesidades y objetivos de cada negocio.",
    ],
    heroMedia: "service-hero.social-content",
    whatIs: {
      title: "¿Qué es VINK Social & Content?",
      statement: "Lo importante no es cuánto publicamos, sino qué estamos comunicando y por qué.",
      text: [
        "Es nuestra especialidad enfocada en la estrategia, creación de contenido y gestión mensual de redes sociales para marcas, negocios y profesionales.",
        "Combinamos planeación estratégica, dirección creativa, diseño gráfico, producción audiovisual y herramientas tecnológicas para desarrollar contenido que conecte con las personas.",
      ],
    },
    offeringsTitle: "Lo que hacemos por tu marca",
    offerings: [
      {
        title: "Content Strategy",
        subtitle: "Estrategia de contenido",
        text: "Analizamos tu marca, público y objetivos para definir qué comunicar, cómo hacerlo y qué formatos utilizar, con una planificación mensual que dé dirección a cada publicación.",
      },
      {
        title: "Content Creation",
        subtitle: "Creación de contenido",
        text: "Diseñamos publicaciones, carruseles, reels y otros formatos que reflejen la personalidad de tu marca, cuidando tanto la estética como el mensaje.",
      },
      {
        title: "Photo & Video Content",
        subtitle: "Producción audiovisual",
        text: "Fotografías y grabaciones en tu negocio o en locaciones acordadas. También incorporamos recursos visuales creados con IA cuando aportan valor al contenido.",
      },
      {
        title: "Copywriting & Publishing",
        subtitle: "Redacción y publicación",
        text: "Creamos los textos que acompañan cada contenido y nos encargamos de organizar, programar y publicar las piezas aprobadas en las redes acordadas.",
      },
      {
        title: "Performance & Optimization",
        subtitle: "Análisis y mejora",
        text: "Revisamos el desempeño del contenido para entender qué conecta mejor con tu audiencia y orientar la estrategia de los siguientes meses.",
      },
    ],
    demo: "social",
    approach: {
      eyebrow: "Our approach",
      title: "Your brand. Your story. Your strategy.",
      text: [
        "No creemos en fórmulas iguales para todos. Algunas marcas necesitan contar historias, otras educar a su audiencia y otras mostrar sus productos de una manera más creativa.",
        "Por eso diseñamos una estrategia mensual a partir de lo que realmente necesita cada negocio, priorizando la calidad, la creatividad y la intención detrás de cada contenido.",
      ],
      aspects: [
        { title: "Tu marca", text: "Qué haces, qué te diferencia y cómo quieres comunicarte." },
        { title: "Tus objetivos", text: "Qué quieres lograr con tu presencia en redes sociales." },
        { title: "Tu audiencia", text: "A quién quieres llegar y qué contenido le resulta relevante." },
        { title: "Tus necesidades", text: "Qué formatos, producción y acompañamiento requiere tu negocio." },
      ],
      note: "Aunque no publicamos cantidades fijas, cada propuesta establece claramente el trabajo, las entregas y el alcance del servicio.",
    },
    needs: {
      title: "¿Para quién es?",
      rows: [
        { need: "Tener una presencia digital más profesional.", solution: "Crear una línea visual y de comunicación coherente." },
        { need: "Dejar de improvisar publicaciones.", solution: "Planear contenido con objetivos definidos." },
        { need: "Mostrar productos o servicios de manera atractiva.", solution: "Desarrollar contenido visual y audiovisual creativo." },
        { need: "Mantener las redes activas sin encargarse de todo.", solution: "Gestionar la creación y publicación mensual." },
        { need: "Conectar mejor con su audiencia.", solution: "Crear mensajes y formatos relevantes para su público." },
        { need: "Mejorar su comunicación con el tiempo.", solution: "Revisar resultados y ajustar la estrategia." },
      ],
    },
    process: {
      title: "¿Cómo trabajamos cada mes?",
      steps: [
        { title: "Discover", text: "Entendemos tu negocio, objetivos, audiencia y necesidades de comunicación." },
        { title: "Strategize", text: "Definimos los temas, formatos y enfoque creativo del mes." },
        { title: "Create", text: "Diseñamos, grabamos y editamos las piezas acordadas, cada una con un propósito." },
        { title: "Review", text: "Presentamos el contenido para aprobación y realizamos los ajustes contemplados." },
        { title: "Publish", text: "Organizamos y publicamos el contenido según el calendario aprobado." },
        { title: "Analyze", text: "Revisamos los resultados para orientar las decisiones del siguiente mes." },
      ],
    },
    addOn: {
      eyebrow: "Servicio adicional",
      title: "Meta Ads Management",
      text: [
        "¿Quieres impulsar tu marca con publicidad? Complementa tu estrategia de contenido con campañas publicitarias en Facebook e Instagram.",
        "Nos encargamos de planear, configurar y administrar las campañas según tus objetivos y presupuesto: objetivos, segmentación de audiencias, configuración, preparación de anuncios, seguimiento y optimización.",
      ],
      tags: ["Servicio adicional", "Cotización personalizada", "Presupuesto publicitario independiente"],
    },
    closing: {
      title: "Menos contenido por compromiso. Más contenido con propósito.",
      text: "Hagamos que tu marca tenga algo que decir y una forma increíble de contarlo. Cuéntanos sobre tu negocio y creemos una propuesta para ti.",
      tagline: "Think with Vink.",
    },
    primaryCta: "Hablemos de tu marca",
    metaDescription:
      "Estrategia, creación de contenido y gestión mensual de redes sociales con propuestas personalizadas. Meta Ads como servicio adicional.",
  },
];

export function getServicePage(slug: string) {
  return servicePages.find((s) => s.slug === slug);
}
