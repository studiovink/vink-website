# VINK Creative Studio — Arquitectura y plan de implementación

> Estado: **propuesta para revisión**. No se ha escrito código.
> Fuente: `contenido pagina web vink.pdf` (puntos 1–13, 151 págs.).
> Stack: Next.js (App Router) · React · TypeScript · Tailwind CSS · Motion para React · Vercel.

---

## 1. Análisis del documento

### 1.1 Lo esencial de la marca

| Elemento | Definición en el documento |
|---|---|
| Posicionamiento | Estudio creativo y digital (no agencia de redes, no "fábrica de contenido IA"). Creatividad humana + estrategia + diseño + tecnología. |
| Fundadoras | Pau y Dany. Fotos **reales** (editadas después con Higgsfield conservando rasgos). Nunca rostros generados. |
| Lema | **Think with Vink.** (se conserva) |
| Concepto de etapa | **Ideas humanas. Posibilidades extraordinarias.** |
| Filosofía | "La tecnología amplía las posibilidades. Las personas les dan sentido." / "La IA no es la creatividad. Es una herramienta que nos permite llevarla más lejos." |
| Tono | Cercano, seguro, editorial. Español con etiquetas en inglés (OUR WORK, LET'S WORK TOGETHER, OUR PHILOSOPHY…). |
| Estética | Editorial, premium, minimalista, espacios amplios, títulos grandes, imágenes y video protagonistas, animación sutil. |
| Referencias UI | andreabadillo.com (editorial/personal) y getsilvia.com/welcome (transiciones/interactividad). Inspiración, no copia. |

### 1.2 Paleta (punto 11.1)

| Token | Hex | Uso |
|---|---|---|
| `burgundy` | `#3F1521` | Color principal, footer, sección contacto |
| `cream` | `#F5F0EA` | Fondos |
| `rose` | `#D8B7AF` | Acentos sutiles |
| `charcoal` | `#171416` | Texto |

Tipografía: sans moderna con peso para títulos (Neue Montreal / Satoshi / Manrope) + serif editorial para frases destacadas (Instrument Serif / Cormorant Garamond) + sans legible para cuerpo.

### 1.3 Decisiones que el documento ya cerró (versiones finales)

El documento evoluciona; en varios puntos una versión posterior reemplaza a una anterior. Tomo como definitivas las **últimas**:

| Tema | Versión anterior (descartada) | Versión final (la que uso) |
|---|---|---|
| Especialidades | 5, incluida VINK Strategy (punto 4) | **4**: Creative Studio, Branding, Web Studio, Social & Content. Sin Strategy (11.3, 12.2, 12.14) |
| Social & Content | Paquetes START / LITE / PRO | **Servicio mensual personalizado**, sin paquetes ni cantidades. Meta Ads como adicional opcional (punto 8) |
| Branding | Identidad, rebranding, dirección de arte, storytelling… | Solo **Brand Identity** y **Brand Applications** (punto 6) |
| Web Studio | Incluía portafolios | Solo **Landing Pages, Business Websites, Digital Catalogs** (punto 7) |
| Precios | — | **Ningún precio público** (11.9, 12.8, 12.14) |

### 1.4 Contradicciones o huecos que necesitan tu decisión

Ver **sección 9**. En resumen: paquetes con nombre (AURA, VINK SHOT…), páginas de servicio separadas o todo en Home, tipografías definitivas, proveedor del formulario y contenido de las presentaciones de las fundadoras.

---

## 2. Mapa del sitio

```
/                              Home (recorrido completo, punto 11.8)
/services/creative-studio      VINK Creative Studio      ┐
/services/branding             VINK Branding             │ propuesta: páginas propias
/services/web-studio           VINK Web Studio           │ (ver decisión D1)
/services/social-content       VINK Social & Content     ┘
/work                          Our Work — portafolio completo con filtros
/work/[slug]                   Detalle de proyecto
/contact                       Let's Work Together (también como sección en Home)
/aviso-de-privacidad           Página legal
/terminos-y-condiciones        Página legal
/404                           Página no encontrada con estilo VINK
```

Navegación (11.3): **Home · About Us · Services ▾ · Our Work · Contact**.
Menú desplegable de Services con únicamente las 4 especialidades. CTA en el header: *Let's talk*.

`About Us` es un ancla a la sección de Home (`/#about`). No es necesaria una página aparte salvo que lo quieran.

---

## 3. Estructura de cada página → secciones → componentes

### 3.1 Home `/`

| # | Sección | Contenido (copy del PDF) | Componentes |
|---|---|---|---|
| 1 | **Hero** | VINK CREATIVE STUDIO · *Ideas humanas. Posibilidades extraordinarias.* · subtítulo · CTAs *Explore our work* / *Let's talk* | `HeroVideo`, `RevealText`, `Button` |
| 2 | **About Us** | ¿QUIÉNES SOMOS? Somos Pau y Dany… · *Tú imagínalo. Nosotros encontramos cómo hacerlo realidad.* | `FounderSpotlight`, `FounderCard` ×2, `MediaSlot` |
| 3 | **Our Philosophy** | *La creatividad no tiene límites. La tecnología abre posibilidades.* + 4 pilares (Human Creativity, Creative Technology, Strategic Thinking, Real Connection) | `EditorialQuote`, `PillarList`, `ParallaxMedia` |
| 4 | **Our Services** | ¿QUÉ PODEMOS CREAR PARA TU MARCA? + 4 tarjetas + *Cada marca es diferente…* | `ServiceCardGrid`, `ServiceCard` (hover y toque) |
| 5 | **Creative Studio (resumen)** | *Imagina algo extraordinario…* + Before/After | `BeforeAfterSlider`, `Button` → página de servicio |
| 6 | **Featured Work** | OUR WORK · *Ideas que toman forma.* · 3–5 proyectos destacados | `WorkGrid` (modo destacado), `WorkCard` |
| 7 | **Let's Work Together** | *Have an idea? Let's make it happen.* + formulario + WhatsApp/correo | `ContactSection`, `ContactForm`, `DirectContact` |
| — | **Footer** | VINK. · THINK WITH VINK. · Explore / Connect / Legal · © 2026 | `Footer` |

> Las secciones 5–8 del recorrido del PDF (Creative Studio, Branding, Web Studio, Social & Content) se muestran completas en sus páginas propias y en Home aparecen resumidas, para que Home no sea excesivamente larga. Depende de la decisión **D1**.

### 3.2 Páginas de servicio `/services/[slug]`

Una sola plantilla (`ServicePageTemplate`) alimentada por datos, con bloques opcionales:

| Bloque | Creative Studio | Branding | Web Studio | Social & Content |
|---|---|---|---|---|
| `ServiceHero` (título, frase, intro) | video de fondo | imagen | mockup dispositivos | collage de contenido |
| `ServiceOfferings` (lista de servicios) | 5: AI Product Photography, AI Commercial Films, Hybrid Production, Creative Campaigns, On-Location Photo & Video | 2: Brand Identity, Brand Applications | 3: Landing Pages, Business Websites, Digital Catalogs | 5: Content Strategy, Content Creation, Photo & Video, Copywriting & Publishing, Performance & Optimization |
| `NeedSolutionTable` ("¿Para qué puede contratarse?") | ✓ | — | ✓ | ✓ ("¿Para quién es?") |
| Demostración especial | `BeforeAfterSlider` + `FilterableGallery` + bloque "en locación / dron" | `BrandApplicationSwitcher` | `DeviceToggleDemo` | `SocialContentGallery` + `ApproachStatement` ("Your brand. Your story. Your strategy.") |
| `ProcessSteps` | Brief → Concepto → Producción → Postproducción → Entrega | — | Discover → Structure → Design → Develop → Launch | Discover → Strategize → Create → Review → Publish → Analyze |
| `AddOnCard` | — | — | — | Meta Ads Management (adicional, cotización y presupuesto aparte) |
| `RelatedWork` (proyectos filtrados por categoría) | ✓ | ✓ | ✓ | ✓ |
| `ServiceCTA` | *Ver nuestros proyectos* / *Cotizar una producción* | *Crear mi marca* | *Explorar sitios web* / *Crear mi página web* | *Hablemos de tu marca* |

Los CTA de cotización abren `/contact?service=<slug>`, con el servicio ya seleccionado en el formulario.

### 3.3 Our Work `/work` y `/work/[slug]`

- `/work`: encabezado (*Ideas que toman forma.*), `WorkFilters` (Todos · Creative Studio · Branding · Web Studio · Social & Content), grid editorial con tamaños mixtos (`WorkGrid`), cierre *¿Tu marca podría ser nuestro próximo proyecto?*
- Sub-filtros de Creative Studio (del punto 5): Fotografía IA · Comerciales · Híbrido · Campañas · Foto, video y dron.
- `/work/[slug]`: `ProjectHero` (nombre, categorías, etiqueta de producción como "AI Product Photography" y badge **Proyecto conceptual** si aplica), "Qué hicimos", "El concepto", `ProjectGallery` (imágenes, video, before/after opcional, capturas de web, enlace al sitio publicado), navegación anterior/siguiente, CTA.
- **Estado vacío:** si no hay proyectos publicados, la sección muestra un mensaje "Próximamente" y la sección Featured Work de Home se oculta. Nunca se rellena con proyectos inventados.

### 3.4 Contact `/contact`

LET'S WORK TOGETHER → `ContactForm` → `DirectContact` (WhatsApp, correo) → `NextSteps` (Tell us → Let's Talk → The Proposal → Let's Create).

### 3.5 Legales

`LegalPageLayout` con tipografía de lectura, índice lateral y fecha de actualización. El contenido vive en MDX, con la introducción propuesta en el PDF y **campos marcados `[PENDIENTE: …]`** para la razón social, el domicilio, los proveedores, etc. No se inventa ningún dato legal.

---

## 4. Arquitectura del proyecto

```
vink-website/
├── docs/
│   ├── PLAN-ARQUITECTURA-VINK.md      ← este documento
│   ├── ASSETS.md                      ← hoja de especificaciones para producir con Higgsfield / ChatGPT (autogenerada)
│   └── CONTENT-TODO.md                ← datos pendientes (contacto, legales, bios)
├── public/
│   └── media/                         ← recursos finales (ver §7)
├── src/
│   ├── app/
│   │   ├── layout.tsx                 fuentes, metadata base, Header, Footer, MotionConfig
│   │   ├── page.tsx                   Home
│   │   ├── services/[slug]/page.tsx   plantilla de servicio (generateStaticParams)
│   │   ├── work/page.tsx
│   │   ├── work/[slug]/page.tsx
│   │   ├── contact/page.tsx
│   │   ├── contact/actions.ts         Server Action del formulario
│   │   ├── aviso-de-privacidad/page.tsx
│   │   ├── terminos-y-condiciones/page.tsx
│   │   ├── not-found.tsx
│   │   ├── sitemap.ts · robots.ts · opengraph-image.tsx
│   │   └── globals.css                Tailwind + tokens @theme
│   ├── components/
│   │   ├── layout/      Header, NavDropdown, MobileMenu, Footer, SkipLink
│   │   ├── ui/          Button, Container, Section, Eyebrow, Heading, SerifAccent, Tag, Badge, Chip
│   │   ├── media/       MediaSlot, SmartImage, VideoPlayer, HeroVideo, AssetPlaceholder, DeviceFrame
│   │   ├── motion/      Reveal, RevealText, Stagger, Parallax (respetan reduced-motion)
│   │   ├── interactive/ BeforeAfterSlider, ServiceCard, FilterChips, DeviceToggleDemo,
│   │   │                BrandApplicationSwitcher, FounderSpotlight, Lightbox
│   │   ├── sections/    Hero, About, Philosophy, Pillars, ServicesOverview, FeaturedWork,
│   │   │                ProcessSteps, NeedSolutionTable, AddOnCard, ContactSection…
│   │   ├── work/        WorkGrid, WorkCard, WorkFilters, ProjectHero, ProjectGallery
│   │   └── contact/     ContactForm, DirectContact, NextSteps
│   ├── content/
│   │   ├── site.ts            nombre, nav, redes, WhatsApp, correo (con TODO hasta tener datos)
│   │   ├── copy/              home.ts, contact.ts — textos del PDF tal cual
│   │   ├── services/          creative-studio.ts, branding.ts, web-studio.ts, social-content.ts
│   │   ├── projects/          un archivo .mdx por proyecto (frontmatter validado)
│   │   ├── founders.ts        Pau y Dany: nombre, rol [PENDIENTE], bio [PENDIENTE], assetIds
│   │   ├── assets.ts          REGISTRO CENTRAL DE RECURSOS (ver §7)
│   │   └── legal/             aviso-de-privacidad.mdx, terminos-y-condiciones.mdx
│   ├── lib/
│   │   ├── schemas.ts         Zod: Project, Service, Asset, ContactForm
│   │   ├── projects.ts        carga, filtra por estado/categoría, ordena
│   │   ├── assets.ts          getAsset(id), validación de proporciones
│   │   ├── email.ts           envío del formulario (proveedor en D5)
│   │   ├── seo.ts             helpers de metadata + JSON-LD
│   │   └── cn.ts
│   └── hooks/   useReducedMotion, useIsTouch, useMediaQuery
├── scripts/
│   ├── generate-asset-specs.ts   genera docs/ASSETS.md a partir de assets.ts
│   └── optimize-media.sh         ffmpeg/sharp: webm+mp4, posters, avif/webp
└── (config) next.config.ts · tsconfig.json · eslint · prettier · .env.example
```

**Principios:**
- **Contenido separado del diseño.** Todo el texto vive en `src/content/`. Para cambiar un texto o un proyecto no hace falta tocar componentes.
- **Server Components por defecto.** Solo los componentes interactivos son `"use client"`.
- **Tipado estricto con Zod.** Si a un proyecto le falta un campo o un recurso tiene una proporción equivocada, el build falla con un mensaje claro.
- **Generación estática (SSG)** de todas las páginas. La única parte dinámica es el envío del formulario.

### 4.1 Design tokens (Tailwind v4, `@theme`)

```
--color-burgundy #3F1521   --color-cream #F5F0EA   --color-rose #D8B7AF   --color-charcoal #171416
+ variaciones derivadas (burgundy-90, cream-dark para bordes) solo si hacen falta
--font-display (sans títulos) · --font-serif (acentos) · --font-body
Escala tipográfica fluida (clamp) · espaciado de sección generoso · radios mínimos
Easing de marca: cubic-bezier(.22,1,.36,1) · duraciones 0.4–0.9s
```

Se verificará el contraste AA: crema sobre burgundy cumple; rosa sobre crema **no** cumple para texto, así que el rosa se usará solo como acento, nunca para texto pequeño.

### 4.2 Modelo de datos

**Project** (punto 12.7 + transparencia IA):
```ts
{
  slug, title, client?: string,           // nombre real o "Proyecto conceptual"
  categories: ("creative-studio"|"branding"|"web-studio"|"social-content")[],
  productionTypes?: ("ai-product-photography"|"ai-commercial-film"|"hybrid"|"campaign"|"on-location")[],
  isConcept: boolean,                     // badge visible "Proyecto conceptual"
  summary, whatWeDid: string[], concept,
  cover: AssetId, previewVideo?: AssetId,
  gallery: AssetId[], beforeAfter?: { before: AssetId, after: AssetId },
  links?: { label, url }[],
  featured: boolean, order: number,
  status: "draft" | "published",          // draft nunca se publica
  publishAuthorized: boolean              // obligatorio true para publicar proyectos de clientes
}
```
Empezamos con MDX en el repositorio. Más adelante se puede migrar a un CMS (Sanity, Payload o Keystatic) sin tocar los componentes, porque solo cambiaría `lib/projects.ts`.

**Service:** slug, nombre, subtítulo en inglés, frase principal, intro, offerings[], tabla de necesidades, proceso, addOn?, CTAs, assetIds.

---

## 5. Elementos interactivos

| # | Componente | Dónde | Comportamiento | Móvil / teclado / reduced-motion |
|---|---|---|---|---|
| 1 | `HeroVideo` | Hero, hero de Creative Studio | Autoplay, sin sonido, en bucle, `playsInline`, con poster mientras carga. Overlay para mantener el texto legible. Se pausa fuera de pantalla | Con reduced-motion o ahorro de datos muestra solo el poster. Botón visible de pausa |
| 2 | `RevealText` / `Reveal` | Títulos y bloques | Entrada suave al hacer scroll | Sin animación si el dispositivo pide reduced-motion |
| 3 | `Header` | Global | Sticky discreto: se oculta al bajar y aparece al subir. Dropdown de Services | Menú móvil a pantalla completa, con foco atrapado y cierre con Esc |
| 4 | `ServiceCard` | Home, Our Services | Hover: cambia la imagen o reproduce un clip, y revela el nombre y la descripción | En táctil: primer toque revela, segundo navega (o la info siempre visible). Foco con teclado igual que el hover |
| 5 | `BeforeAfterSlider` | Creative Studio, proyectos | Comparador arrastrable | Accesible como `role="slider"` con flechas; arrastre táctil |
| 6 | `WorkFilters` + `WorkGrid` | /work, servicios | Filtros por especialidad (y sub-filtros de Creative), con animación de reordenamiento y estado en la URL (`?category=`) | Chips con desplazamiento horizontal en móvil |
| 7 | `WorkCard` | Portafolio | Hover: nombre, servicio y vista previa del video en silencio | En táctil, sin autoplay al hacer hover. Título visible |
| 8 | `FounderSpotlight` | About Us | Presentación de Pau y Dany: alterna entre foto juntas y retratos individuales con su bio | Tabs accesibles |
| 9 | `Parallax` | Filosofía, imágenes grandes | Profundidad discreta | Se desactiva con reduced-motion |
| 10 | `BrandApplicationSwitcher` | Branding | Al elegir una aplicación (tarjeta, empaque, menú…) cambia el mockup | Tabs |
| 11 | `DeviceToggleDemo` | Web Studio | Alterna entre Desktop y Mobile. Muestra capturas reales dentro de marcos de dispositivo | Botones de toggle |
| 12 | `SocialContentGallery` | Social & Content | Reels y carruseles que se abren en un lightbox y se reproducen | Swipe, cierre con Esc y gestión de foco |
| 13 | `ContactForm` | Contact | Validación en cliente y servidor (Zod), honeypot + Turnstile, estados de carga, éxito y error. Servicio preseleccionado desde la URL | Mensajes de error asociados a cada campo (`aria-describedby`) |
| 14 | `Button` | Global | Transición de color y movimiento ligero | Foco visible |
| 15 | Scroll suave a anclas | Global | `scroll-behavior` con offset del header | Se desactiva con reduced-motion |

---

## 6. Inventario de imágenes y video

Estado: ⏳ pendiente · 🎬 se produce con Higgsfield · 💬 ChatGPT · 📷 foto real · 🗂 material real de VINK o de clientes.

| ID | Sección | Tipo | Proporción / tamaño | Origen | Notas |
|---|---|---|---|---|---|
| `hero.video` | Hero | Video MP4 + WebM, 8–12 s, en bucle | 16:9 · 1920×1080 | 🎬 | Sin texto quemado. Se debe preparar un loop limpio |
| `hero.video-mobile` | Hero (móvil) | Video | 9:16 · 1080×1920 | 🎬 | Recomendado. Si no existe, se recorta el 16:9 |
| `hero.poster` | Hero | Imagen | 16:9 (y 9:16) | 🎬 | Primer fotograma o fotograma clave |
| `founders.together` | About | Foto | 4:5 · 1600×2000 | 📷→🎬 edición | Real. Se edita sin alterar rasgos |
| `founders.pau` | About | Retrato | 4:5 | 📷 | Real |
| `founders.dany` | About | Retrato | 4:5 | 📷 | Real |
| `founders.working` | About / otras | Foto | 3:2 · 2400×1600 | 📷 | Real |
| `founders.creative` | Uso libre | Foto | 16:9 o 4:5 | 📷→🎬 | Real (composición creativa) |
| `philosophy.art` | Filosofía | Imagen o video corto | 4:5 o 16:9 | 🎬 | Abstracta: creatividad humana + tecnología |
| `services.creative` | Tarjeta | Imagen + clip opcional | 4:5 | 🎬 | Sale de la campaña conceptual (Pieza 01) |
| `services.branding` | Tarjeta | Imagen | 4:5 | 🗂 | Proyecto real de branding |
| `services.web` | Tarjeta | Imagen | 4:5 | 🗂 | Captura real en un marco de dispositivo |
| `services.social` | Tarjeta | Imagen o clip | 4:5 | 🗂 | Contenido real autorizado |
| `creative.before` | Before/After | Foto de producto original | 4:5 · **misma resolución que after** | 📷 | Producto real |
| `creative.after` | Before/After | Imagen final | 4:5 · igual que before | 🎬 | Fidelidad del producto (etiquetas, colores) |
| `creative.campaign-video` | Creative Studio | Video comercial | 16:9 (+ 9:16 opcional) | 🎬 | |
| `creative.on-location[]` | Creative Studio | Foto/video en locación y dron | 3:2 / 16:9 | 🗂 | Material real. Sin estudio fotográfico |
| `branding.identity` | Branding | Logo, paleta y tipografías | 16:9 | 🗂 | |
| `branding.applications[]` | Branding | Mockups (tarjeta, empaque, etiqueta, menú…) | 4:3 | 🗂 + 🎬 escenarios | Escenarios generados solo como presentación |
| `web.screens[]` | Web Studio | Capturas desktop + móvil | 1440×900 y 390×844 | 🗂 | Sitios reales publicados |
| `social.items[]` | Social & Content | Reels / carruseles / posts | 9:16 y 4:5 | 🗂 | Solo material autorizado |
| `project.<slug>.*` | Portafolio | Portada, galería, preview | Portada: 4:5, 16:9 o 1:1 (grid mixto) | 🗂 / 🎬 | Preview de video: 5–8 s sin audio |
| `contact.bg` | Contact | Ninguno, composición tipográfica | — | — | Fondo burgundy |
| `og.default` | SEO | Imagen para compartir | 1200×630 | Generada por código con tipografía | No necesita producción |
| `brand.logo` | Global | SVG | — | 🗂 | **Imprescindible antes de empezar a maquetar** |

Video solo en: hero, Creative Studio, vistas previas del portafolio y Social. El resto es imagen fija (13.1).

---

## 7. Sistema para integrar recursos de ChatGPT y Higgsfield

### 7.1 Carpetas

```
public/media/
├── brand/        logo-vink.svg, logo-vink-cream.svg, favicon…
├── hero/         hero-vink-16x9.mp4/.webm, hero-vink-9x16.mp4, hero-poster-16x9.avif
├── founders/     founders-together-4x5.avif, founder-pau-4x5.avif, founder-dany-4x5.avif, founders-working-3x2.avif
├── philosophy/   philosophy-art-4x5.avif
├── services/     service-creative-4x5.avif, …
├── creative/     creative-before-4x5.avif, creative-after-4x5.avif, creative-campaign-16x9.mp4
├── branding/     …
├── web/          …
├── social/       …
└── work/<slug>/  cover-4x5.avif, 01.avif, preview.mp4, …
```

**Convención de nombres:** `<sección>-<descripción>-<proporción>.<ext>`, en minúsculas y con guiones.
Los archivos fuente de alta resolución (los exportados de Higgsfield) **no se suben al repo**. Se guardan en Drive (`VINK STUDIO/WEB/RAW`) y al repo solo llegan las versiones optimizadas.

### 7.2 Registro central `src/content/assets.ts`

Cada espacio visual del sitio se identifica por un **ID** y se registra una sola vez:

```ts
"creative.after": {
  kind: "image",
  ratio: "4:5",
  minWidth: 1600,
  src: null,                       // null = todavía no existe → se muestra placeholder
  alt: "…",
  source: "higgsfield",            // higgsfield | chatgpt | real-photo | client | code
  status: "pending",               // pending | draft | final
  isConcept: true,                 // marca visible de "campaña conceptual"
  brief: "Campaña de producto sobre agua y texturas naturales…",
  usedIn: ["home/creative", "services/creative-studio"],
}
```

- Los componentes nunca reciben rutas directas: usan `<MediaSlot id="creative.after" />`.
- Si `src` es `null`, `MediaSlot` muestra un **`AssetPlaceholder`**: un bloque neutro en tonos crema o burgundy con la proporción exacta, para que el diseño no salte. En desarrollo muestra además una etiqueta ("hero.video · 16:9 · pendiente"). En producción no aparece ninguna etiqueta y **nunca se muestra una foto de stock ni una persona ficticia**.
- **Integrar un recurso nuevo:** se exporta el archivo con la proporción indicada, se coloca en `public/media/...` y se cambian dos campos en `assets.ts` (`src`, `status: "final"`). No hay que tocar el diseño.
- `npm run assets:specs` genera `docs/ASSETS.md`: una tabla con todos los IDs pendientes, su proporción, resolución mínima, duración y brief. Sirve como **hoja de producción** para generar en Higgsfield o ChatGPT exactamente lo que hace falta y no desperdiciar créditos.
- `npm run media:optimize` convierte videos a MP4 (H.264) + WebM con poster, y las imágenes a AVIF/WebP con tamaños responsive.
- Una verificación en el build avisa si un recurso marcado como `final` tiene una proporción distinta de la registrada.

### 7.3 Roles de cada herramienta

- **Higgsfield:** hero, campaña conceptual (before/after y video), arte de la filosofía, edición de las fotos reales de las fundadoras y escenarios para los mockups de branding.
- **ChatGPT:** apoyo con copys secundarios, textos alternativos, descripciones de proyectos y briefs. Imágenes solo de apoyo (texturas o fondos), nunca como trabajo de VINK ni personas.
- **Código (Claude Code):** marcos de dispositivo, demos interactivas, imagen OG y composición tipográfica de Contact.

Orden de producción recomendado (punto 12): 1) campaña conceptual de producto → 2) video del hero → 3) fotos de las fundadoras → 4) arte de la filosofía → 5) material adicional solo donde haga falta.

---

## 8. Plan de implementación por fases

| Fase | Entregable | Depende de |
|---|---|---|
| **0. Base** | Proyecto Next.js + TS + Tailwind v4 + Motion, ESLint/Prettier, tokens, fuentes, `MotionConfig` con reduced-motion, repositorio Git | D3 fuentes (se puede empezar con fuentes provisionales) |
| **1. Layout global** | Header + dropdown + menú móvil, Footer con enlaces reales, `not-found`, páginas legales con contenido `[PENDIENTE]` | Logo (si no está, wordmark tipográfico provisional "VINK.") |
| **2. Sistema de medios** | `assets.ts`, `MediaSlot`, `AssetPlaceholder`, `HeroVideo`, `VideoPlayer`, scripts de specs y optimización | — |
| **3. Home** | Hero, About, Philosophy + pilares, Services (tarjetas), resumen Creative + Before/After, Featured Work, Contact | Fases 0–2 |
| **4. Servicios** | `ServicePageTemplate` + datos de las 4 especialidades + demos (Before/After, galería filtrable, BrandApplicationSwitcher, DeviceToggleDemo, SocialContentGallery, Meta Ads add-on) | D1, D2 |
| **5. Portafolio** | Esquema de proyectos, `/work` con filtros, `/work/[slug]`, estados vacíos, badge conceptual | — (arranca vacío) |
| **6. Formulario** | Server Action, validación con Zod, honeypot + Turnstile, envío de correo, confirmación, preselección de servicio, enlaces a WhatsApp y correo | D5, datos de contacto |
| **7. Calidad** | SEO (metadata, sitemap, robots, OG, JSON-LD `Organization`/`CreativeWork`), accesibilidad (teclado, contraste, alt), rendimiento (LCP del hero, CLS 0, lazy loading), pruebas en móvil, tablet y desktop | — |
| **8. Integración de recursos** | Rondas de sustitución de placeholders a medida que lleguen las piezas | Producción Higgsfield y fotos |
| **9. Lanzamiento** | Vercel + dominio, variables de entorno, checklist 12.13, revisión legal | Datos legales reales |

En cada fase te muestro una vista previa antes de avanzar a la siguiente.

---

## 9. Decisiones — RESUELTAS (29-oct-2026)

| # | Decisión final |
|---|---|
| D1 | Páginas propias `/services/<slug>` + resumen en Home |
| D2 | **Sin paquetes con nombre** (ni AURA, ni VINK SHOT/MOTION/CUSTOM, ni VINK LANDING/WEB/CATALOG). Solo se presentan las 4 especialidades y sus servicios |
| D3 | Satoshi + Instrument Serif |
| D4 | Español con etiquetas editoriales en inglés; sin versión EN |
| D5 | Resend + Turnstile; las solicitudes llegan a **studiovink27@gmail.com** |
| D6 | 5 espacios reservados para fotos reales; roles y bios quedan `[PENDIENTE]` |
| D7 | Sí habrá video vertical 9:16 del hero para móvil |
| Logo | Recibido: `VINK_logo.svg` (wordmark blanco sobre burgundy). Se derivan versiones transparentes (crema/burgundy) |

### Texto original de las decisiones (histórico)

**D1 — ¿Páginas propias por servicio?**
El PDF (12.2) pone los servicios en Home, pero también pide que al elegir una especialidad se puedan explorar sus servicios, ejemplos y cotización, y que los CTA lleven a las "páginas de servicios".
→ **Recomiendo** `/services/<slug>` (una plantilla, cuatro páginas) y en Home una versión resumida. Así la Home no queda kilométrica y cada servicio tiene su propia URL para SEO.

**D2 — Paquetes con nombre (AURA, VINK SHOT / MOTION / CUSTOM, VINK LANDING / WEB / CATALOG)**
Aparecen en los puntos 5–7, pero el brief final dice "no mostrar paquetes predeterminados ni precios públicos".
→ **Recomiendo** no mostrarlos en el lanzamiento y dejarlos preparados en los datos (ocultos) por si los activan después. Alternativa: mostrar los nombres como "formas de trabajar", sin precio.

**D3 — Tipografías definitivas**
¿El Brand Book 2026 que tienen en Drive define tipografías oficiales? Si no:
→ **Recomiendo** **Satoshi** (títulos y cuerpo, gratuita con licencia comercial vía Fontshare) + **Instrument Serif** (acentos, Google Fonts). Neue Montreal requiere licencia comercial de pago.

**D4 — Idioma**
→ Asumo sitio **en español**, con etiquetas editoriales en inglés como en el PDF (OUR WORK, LET'S WORK TOGETHER…) y sin versión en inglés por ahora. Las rutas `/services` y `/work` en inglés, y las legales en español, como dice el documento. ¿Correcto?

**D5 — Formulario**
→ **Recomiendo** Resend (envío de correo) + Cloudflare Turnstile (antispam), sin base de datos. Necesito el correo que recibirá las solicitudes y, para enviar desde @dominio, acceso al DNS del dominio.

**D6 — Fundadoras**
Tengo sus nombres (Pau y Dany), pero no sus roles ni bios individuales. Dejo los campos `[PENDIENTE]`. El PDF habla de "cinco imágenes" pero solo enumera cuatro; propongo cinco espacios (juntas, Pau, Dany, trabajando, composición creativa).

**D7 — Video vertical del hero**
¿Producirán una versión 9:16 para móvil? Recomendado: se ve mucho mejor que recortar el 16:9.

---

## 10. Lo que no voy a hacer

- Inventar proyectos, clientes, resultados, testimonios ni datos legales.
- Generar o usar rostros que representen a Pau y Dany.
- Publicar imágenes de referencia como trabajo de VINK. Las campañas conceptuales llevan la etiqueta correspondiente.
- Nombrar herramientas específicas (Higgsfield, Claude…) como diferenciador en el copy (punto 2).

## 11. Materiales que necesito para empezar (mínimo)

1. Logo de VINK (SVG). Si no está, uso un wordmark provisional.
2. Respuestas a D1–D7.
3. (Puede esperar) correo, WhatsApp e Instagram oficiales; datos legales; proyectos reales autorizados; fotos; piezas de Higgsfield.
