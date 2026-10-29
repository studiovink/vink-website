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

export const meetFounders = {
  label: "Meet the Founders",
  title: "Dos mentes. Una misma visión.",
  intro:
    "Somos Pau y Dany, las personas detrás de VINK Creative Studio. Combinamos creatividad, estrategia y tecnología para transformar ideas en proyectos con personalidad, intención y una identidad propia.",
  together: "founders.together" as const,
  people: [
    {
      name: "Pau",
      role: "Co-Founder & Creative Director",
      image: "founders.pau" as const,
      bio: [
        "Pau es la mente creativa detrás de VINK. Le apasiona transformar ideas en conceptos visuales, explorar nuevas tendencias y encontrar formas diferentes de contar la historia de cada marca.",
        "Desde la dirección creativa hasta la producción de contenido, busca que cada proyecto tenga una identidad auténtica, cuidando tanto la estética como los pequeños detalles que hacen la diferencia.",
      ],
    },
    {
      name: "Dany",
      role: "Co-Founder & Digital Strategist",
      image: "founders.dany" as const,
      bio: [
        "Dany aporta la visión estratégica que conecta las ideas con los objetivos de cada marca. Le gusta entender los negocios, identificar oportunidades y desarrollar soluciones digitales que tengan sentido para cada proyecto.",
        "En VINK se enfoca en la estrategia, la planificación y el desarrollo de experiencias digitales, buscando que la creatividad también genere valor.",
      ],
    },
  ],
  closingTitle: "Different minds. Shared vision.",
  closing:
    "Tenemos formas diferentes de pensar, pero compartimos una misma idea: crear proyectos que combinen creatividad, estrategia y tecnología sin perder el lado humano.",
};

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
  process: {
    label: "How we work",
    title: "Cómo llevamos una idea a la realidad",
    note: "No todos los proyectos necesitan un proceso tan extenso: la metodología se adapta a cada servicio.",
    steps: [
      { title: "Discover", subtitle: "Conocemos tu marca", text: "Escuchamos tus ideas, conocemos tu negocio y entendemos qué necesitas lograr." },
      { title: "Imagine", subtitle: "Desarrollamos el concepto", text: "Propuesta creativa, referencias visuales, mensajes, estilo y dirección estratégica." },
      { title: "Create", subtitle: "Hacemos que suceda", text: "Elegimos las herramientas: producción tradicional, IA, diseño o desarrollo digital." },
      { title: "Refine", subtitle: "Cuidamos cada detalle", text: "Revisamos, ajustamos y verificamos la coherencia con la identidad de la marca." },
      { title: "Launch", subtitle: "Llevamos la idea al mundo", text: "Entregamos o implementamos la solución, lista para los canales definidos." },
    ],
  },
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
