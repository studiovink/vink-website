# VINK Creative Studio — sitio web

Ideas humanas. Posibilidades extraordinarias. **Think with Vink.**

Stack: Next.js 16 (App Router) · React 19 · TypeScript · Tailwind CSS 4 · Motion.

## Desarrollo

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # build de producción
npm run lint
```

## Dónde está cada cosa

| Qué | Dónde |
|---|---|
| Plan y decisiones | `docs/PLAN-ARQUITECTURA-VINK.md` |
| Colores (versión negra), tipografía, utilidades | `src/app/globals.css`, `src/app/fonts.ts` |
| Datos globales (contacto, navegación, especialidades) | `src/content/site.ts` |
| Textos legales (con apartados pendientes) | `src/content/legal.ts` |
| Logo (versiones) | `public/brand/`, componente `src/components/brand/Logo.tsx` |

## Agregar imágenes y videos (sin tocar código)

1. Abre `docs/FORMATOS.md`: ahí está cada archivo que necesita la página, con su nombre exacto, proporción y tamaño.
2. Guarda el archivo en `public/media/...` con ese nombre (imágenes: .jpg, .png, .webp, .avif o .svg; videos: .mp4).
3. Sube el cambio a GitHub: el sitio detecta el archivo al compilar y reemplaza el espacio reservado.

`npm run media:scan` actualiza `docs/FORMATOS.md` con lo que ya está listo (✅) y lo que falta (⬜).

## NUMA Real Estate

Submarca en `/numa-real-estate`. Textos en `src/content/numa.ts`; colores provisionales en
`src/app/globals.css` (`--color-numa`, `--color-numa-deep`, `--color-numa-surface`); logo en
`public/media/numa/numa-logo-white.svg` y `numa-logo-black.svg` (o .png).

## Pendientes de datos

- Datos legales reales → `src/content/legal.ts`.
- Archivos de Satoshi → ver instrucciones en `src/app/fonts.ts` (hoy se usa Manrope).
