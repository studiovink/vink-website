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
| Colores, tipografía, utilidades | `src/app/globals.css`, `src/app/fonts.ts` |
| Datos globales (contacto, navegación, especialidades) | `src/content/site.ts` |
| Textos legales (con apartados pendientes) | `src/content/legal.ts` |
| Logo (versiones) | `public/brand/`, componente `src/components/brand/Logo.tsx` |

## Pendientes de datos

- WhatsApp e Instagram oficiales → `src/content/site.ts` (los enlaces aparecen solos al completarlos).
- Datos legales reales → `src/content/legal.ts`.
- Archivos de Satoshi → ver instrucciones en `src/app/fonts.ts` (hoy se usa Manrope).
