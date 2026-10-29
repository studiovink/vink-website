/*
 * Páginas legales (documento maestro, puntos 10.5 y 10.6).
 * Solo se incluye la introducción aprobada. Cada apartado lleva `pending`
 * con lo que debe completarse con datos reales y revisión jurídica:
 * no se inventan razones sociales, domicilios ni datos fiscales.
 */

export type LegalSection = {
  id: string;
  title: string;
  body?: string[];
  pending?: string;
};

export type LegalDocument = {
  title: string;
  eyebrow: string;
  updatedAt: string | null;
  intro: string[];
  sections: LegalSection[];
};

export const privacyPolicy: LegalDocument = {
  title: "Aviso de Privacidad",
  eyebrow: "Privacy Policy",
  updatedAt: null,
  intro: [
    "En VINK Creative Studio valoramos la privacidad de las personas que visitan nuestro sitio web y se ponen en contacto con nosotros.",
    "La información personal que nos compartas será tratada para atender tus consultas, responder solicitudes de información, elaborar cotizaciones y dar seguimiento a los proyectos que desees desarrollar con nuestro estudio.",
    "Nos comprometemos a utilizar tus datos de manera responsable, conforme a la legislación aplicable en materia de protección de datos personales.",
    "En este aviso encontrarás información sobre los datos que recopilamos, las finalidades de su tratamiento y los mecanismos disponibles para ejercer tus derechos.",
  ],
  sections: [
    {
      id: "responsable",
      title: "Responsable de los datos",
      pending: "Nombre legal del responsable, domicilio y medio de contacto.",
    },
    {
      id: "datos",
      title: "Datos recopilados",
      pending:
        "Nombre, correo, teléfono cuando se solicite, negocio e información compartida voluntariamente.",
    },
    {
      id: "finalidades",
      title: "Finalidades",
      pending:
        "Responder consultas, preparar cotizaciones y dar seguimiento a solicitudes o proyectos.",
    },
    {
      id: "proveedores",
      title: "Uso de proveedores",
      pending:
        "Herramientas externas que procesen o almacenen datos (p. ej. servicio de envío del formulario) y las condiciones aplicables.",
    },
    {
      id: "arco",
      title: "Derechos ARCO",
      pending: "Cómo solicitar acceso, rectificación, cancelación u oposición.",
    },
    {
      id: "cookies",
      title: "Cookies",
      pending: "Qué tecnologías de seguimiento utiliza el sitio y con qué finalidad.",
    },
    {
      id: "cambios",
      title: "Cambios al aviso",
      pending: "Cómo informaremos las actualizaciones del documento.",
    },
  ],
};

export const termsAndConditions: LegalDocument = {
  title: "Términos y Condiciones",
  eyebrow: "Terms & Conditions",
  updatedAt: null,
  intro: [
    "Bienvenido al sitio web de VINK Creative Studio.",
    "Este sitio tiene como finalidad presentar nuestro estudio, los servicios que ofrecemos y algunos de los proyectos que desarrollamos, así como facilitar el contacto con personas y negocios interesados en trabajar con nosotros.",
    "Al navegar por este sitio, te recomendamos consultar las condiciones de uso que se describen a continuación.",
    "Los servicios de VINK Creative Studio se desarrollan de acuerdo con las necesidades de cada cliente. Por ello, las cotizaciones, entregables, tiempos de ejecución, condiciones de pago y demás acuerdos se establecerán mediante propuestas o contratos específicos.",
    "El contenido visual, gráfico y textual publicado en este sitio está protegido por los derechos que correspondan a VINK Creative Studio o a sus respectivos titulares.",
  ],
  sections: [
    {
      id: "uso",
      title: "Uso del sitio",
      pending: "Condiciones para navegar y consultar el contenido de VINK.",
    },
    {
      id: "servicios",
      title: "Servicios",
      pending: "Información general de nuestras cuatro especialidades.",
    },
    {
      id: "cotizaciones",
      title: "Cotizaciones",
      body: ["Cada proyecto se cotiza de forma personalizada."],
    },
    {
      id: "contratacion",
      title: "Contratación",
      body: [
        "Los alcances, precios y tiempos se formalizan en una propuesta o contrato. Los Términos y Condiciones del sitio no sustituyen los contratos de prestación de servicios que acordemos con los clientes.",
      ],
    },
    {
      id: "propiedad-intelectual",
      title: "Propiedad intelectual",
      pending:
        "Protección del contenido, diseños, fotografías, videos y elementos de marca publicados.",
    },
    {
      id: "ia",
      title: "Uso de inteligencia artificial",
      pending: "Posibles condiciones y limitaciones de herramientas tecnológicas externas.",
    },
    {
      id: "enlaces",
      title: "Enlaces externos",
      pending: "Condiciones aplicables a sitios de terceros enlazados desde nuestra web.",
    },
    {
      id: "modificaciones",
      title: "Modificaciones",
      pending:
        "Posibilidad de actualizar los términos y cómo se comunicarán los cambios.",
    },
    {
      id: "contacto",
      title: "Contacto",
      body: ["Para cualquier consulta relacionada con este sitio, escríbenos a studiovink27@gmail.com."],
    },
  ],
};
