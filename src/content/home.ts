/*
 * Textos de la página de inicio, tomados del documento maestro.
 */

export const hero = {
  statement: "Ideas humanas. Posibilidades extraordinarias.",
  sub: "Creatividad, estrategia, diseño y tecnología para marcas que quieren ir más allá.",
  title: "VINK Creative Studio",
};

export const about = {
  label: "About Us",
  /** Las primeras palabras se muestran siempre; el resto se revela con el scroll. */
  lead: "Somos Pau y Dany,",
  statement:
    "las personas detrás de VINK Creative Studio, un estudio creativo y digital donde las ideas se transforman en experiencias visuales.",
  body: [
    "Combinamos creatividad, estrategia, diseño, producción audiovisual e inteligencia artificial para ayudar a marcas y negocios a comunicar de una manera diferente.",
    "Creemos que las mejores ideas necesitan algo humano detrás: personas que escuchen, imaginen y entiendan lo que hace única a cada marca.",
  ],
  closing: "Tú imagínalo. Nosotros encontramos cómo hacerlo realidad.",
  differentiators: [
    {
      n: "01",
      title: "Creatividad con un toque humano",
      text: "Escuchamos tus ideas y te involucramos en el proceso creativo.",
    },
    {
      n: "02",
      title: "IA de alto nivel con dirección",
      text: "Tecnología dirigida con creatividad, intención y estrategia.",
    },
    {
      n: "03",
      title: "Diseño con intención estratégica",
      text: "Cada decisión visual tiene un propósito para tu negocio.",
    },
    {
      n: "04",
      title: "Ideas sin formatos preestablecidos",
      text: "Adaptamos herramientas y soluciones a cada proyecto.",
    },
  ],
};

export const founders = [
  {
    id: "together" as const,
    label: "Pau & Dany",
    image: "founders.together" as const,
    role: "Fundadoras de VINK Creative Studio",
    bio: null as string | null,
  },
  {
    id: "pau" as const,
    label: "Pau",
    image: "founders.pau" as const,
    role: null as string | null, // PENDIENTE: rol de Pau
    bio: null as string | null, // PENDIENTE: bio corta de Pau
  },
  {
    id: "dany" as const,
    label: "Dany",
    image: "founders.dany" as const,
    role: null as string | null, // PENDIENTE: rol de Dany
    bio: null as string | null, // PENDIENTE: bio corta de Dany
  },
];

export const philosophy = {
  label: "Our Philosophy",
  /** Palabras siempre visibles + resto revelado al hacer scroll. */
  lead: "La creatividad no tiene límites.",
  rest: "La tecnología abre posibilidades.",
  sub: "Para nosotros, la IA no es la creatividad. Es una herramienta que nos permite llevarla más lejos.",
  pillars: [
    {
      n: "01",
      title: "Human Creativity",
      subtitle: "Ideas que nacen de personas",
      text: "No buscamos reemplazar la creatividad humana con tecnología, sino potenciarla.",
    },
    {
      n: "02",
      title: "Creative Technology",
      subtitle: "Innovación con calidad",
      text: "Cada resultado pasa por un proceso de dirección creativa y revisión.",
    },
    {
      n: "03",
      title: "Strategic Thinking",
      subtitle: "Creatividad con propósito",
      text: "La estética atrae la atención. La estrategia le da dirección.",
    },
    {
      n: "04",
      title: "Real Connection",
      subtitle: "Marcas que conectan",
      text: "Experiencias que generan interés, confianza y conexiones reales.",
    },
  ],
};

export const transformation = {
  label: "La idea · La visión",
  title: "De una foto sencilla a una campaña.",
  text: "Una fotografía real de producto y su transformación en una producción comercial con dirección de arte e IA, manteniendo la identidad del producto.",
  before: "La idea inicial",
  after: "La visión creativa",
};

export const services = {
  label: "Services",
  title: "¿Qué podemos crear?",
  aside: "— Una idea puede convertirse en mucho más de lo que imaginas.",
};

export const work = {
  label: "Our Work",
  title: "Ideas que toman forma.",
  big: ["Wo", "rk"],
  empty:
    "Estamos preparando la selección de proyectos. Muy pronto podrás explorar nuestras producciones aquí.",
  cta: "¿Tu marca podría ser nuestro próximo proyecto?",
};

export const useCases = {
  label: "Different brands",
  title: ["Diferentes necesidades,", "diferentes soluciones"],
  note: "Ejemplos de lo que puedes crear con VINK. No es una lista cerrada ni obliga a contratar varios servicios.",
  items: [
    { who: "Una joyería", what: "Un photoshoot con IA y un comercial de producto, sin manejo de redes." },
    { who: "Un arquitecto", what: "Un sitio web y un video conceptual de sus proyectos." },
    {
      who: "Una clínica odontológica",
      what: "Contenido educativo mensual para redes y una página para recibir solicitudes de valoración.",
    },
    { who: "Una marca de skincare", what: "Branding, fotografías comerciales y campaña de lanzamiento." },
    { who: "Un restaurante", what: "Gestión mensual de redes con reels y una landing con menú y contacto." },
    { who: "Una marca personal", what: "Identidad visual, sitio web y contenido mensual." },
  ],
};

export const specialtiesSection = {
  label: "Work with us",
  title: "Elige tu especialidad",
  sub: "Puedes contratar un servicio específico, el servicio mensual de redes o desarrollar un proyecto completamente personalizado.",
  quote: "Cotización personalizada",
};

export const contact = {
  label: "Let's work together",
  title: ["Have an idea?", "Let's make it happen."],
  intro:
    "Las mejores ideas empiezan con una conversación. Ya sea que tengas un proyecto definido o apenas estés imaginando lo que tu marca podría llegar a ser, nos encantaría escucharte.",
  formTitle: "Tell us about your project.",
  direct: "¿Prefieres hablar directamente? También puedes escribirnos por WhatsApp o correo electrónico.",
  closing: "Your next big idea starts here.",
  steps: [
    { n: "01", title: "Tell us", text: "Comparte qué necesitas, qué te gustaría crear o qué buscas mejorar." },
    { n: "02", title: "Let's talk", text: "Revisamos tu solicitud y, si es necesario, conversamos para entenderla mejor." },
    { n: "03", title: "The proposal", text: "Preparamos una cotización personalizada con alcance, entregables y condiciones." },
    { n: "04", title: "Let's create", text: "Aprobada la propuesta, organizamos los siguientes pasos y empezamos." },
  ],
};
