# Portafolio personal

> **English summary.** Personal portfolio built with Next.js 16, React 19, TypeScript and Tailwind CSS. It is a single static page in Spanish with an optional English view, two themes (light “Alba” and dark “Ocaso”) and an illustrated naturalist-archive style. The site currently shows sample content and is marked `noindex` until the real content is published. The source code is MIT-licensed; personal content, photos and the CV are not, and the illustrations are subject to their provider’s terms. See [`NOTICE`](NOTICE) and the “Licencia” section for details.

## Descripción

Portafolio de una sola página con estética de archivo naturalista: el juramento del desarrollador como presentación, un cuaderno de campo, el scriptorium de proyectos, el concilio de mentores en pergaminos, el mapa de trayectoria, una carta sellada para el contacto y un herbario de herramientas en forma de archivador. Tiene dos temas, Alba (claro) y Ocaso (oscuro), y dos idiomas, español e inglés, que el visitante elige desde la cabecera.

## Estado

- Contenido de ejemplo: los textos, la foto, los proyectos y los enlaces son provisionales hasta la entrega final.
- Mientras tanto, el sitio se sirve con `noindex, nofollow` (`isIndexable: false` en `data/site.ts`).
- El archivo `public/cv.pdf` todavía no existe.

## Stack

| Pieza | Versión |
|---|---|
| Next.js (App Router) | 16.4.3 |
| React y React DOM | 19.3.1 |
| TypeScript (modo estricto) | 5.9.3 |
| Tailwind CSS | 3.4.19 |
| framer-motion | 14.8.0 |
| lucide-react | 1.64.0 |
| ESLint con `eslint-config-next` | 9.39.5 / 16.4.3 |

## Requisitos

- Node.js 24 (`engines` en `package.json` y `.nvmrc`).
- npm.
- Variables de entorno, todas opcionales:
  - `NEXT_PUBLIC_SITE_URL`: URL pública del sitio. Si existe, tiene prioridad.
  - `VERCEL_PROJECT_PRODUCTION_URL` y `VERCEL_ENV`: las define Vercel. Sirven para la URL canónica y para permitir la indexación solo en producción.
  - Sin ninguna de ellas, la URL base es `http://localhost:3000`.

## Scripts

| Comando | Qué hace |
|---|---|
| `npm run dev` | Servidor de desarrollo |
| `npm run build` | Build de producción (página estática) |
| `npm run start` | Sirve el build de producción |
| `npm run lint` | ESLint |
| `npm run typecheck` | Comprobación de tipos con `tsc --noEmit` |
| `npm run check:comments` | Verifica que el código no tenga comentarios |

## Estructura de carpetas

```
app/          Layout, página, metadatos, robots, sitemap, manifest e iconos
components/   Secciones de la página (Hero, About, Projects, Contact…)
components/ui Piezas reutilizables (sobre, archivador, pergamino, marco…)
data/         Todo el contenido y los textos, en español e inglés
types/        Tipos de los datos
lib/          Funciones puras (i18n, validación, geometría, URL del sitio…)
hooks/        Hooks de React
providers/    Tema, idioma y movimiento
public/       Imágenes, logos y texturas
scripts/      Comprobaciones del proyecto
```

## Decisiones de diseño y accesibilidad

- **Sin texto en el JSX:** todos los textos, enlaces y datos viven en `data/` y se traducen con `useLocalized`.
- **Temas e idioma:** se aplican antes de pintar la página para evitar parpadeos; la elección se guarda en el navegador.
- **Movimiento reducido:** con `prefers-reduced-motion` se detienen las animaciones, el sobre se abre al instante y las carpetas cambian sin transición.
- **Sin JavaScript:** la carta de contacto y las carpetas del archivador se muestran abiertas y legibles.
- **Teclado:** enlace «Saltar al contenido», foco visible en todos los controles, menú móvil que se cierra con Escape y sobre que se abre con Intro.
- **Lectores de pantalla:** decoración oculta con `aria-hidden`; carpetas con `aria-expanded` y `aria-controls`; formulario con etiquetas, errores asociados y estado anunciado.
- **Contraste AA** en los dos temas, medido sobre los fondos reales.
- **Puntos de corte en `em`**, para que el diseño se adapte cuando se aumenta el tamaño de letra del navegador.
- **El sello del monograma** es un trazado SVG, no una fuente web.

## Rendimiento

Medido en un build local el 5 de noviembre de 2026, con Lighthouse (5 pasadas, mediana):

| Categoría | Móvil | Escritorio |
|---|---|---|
| Rendimiento | 87 | 99–100 |
| Accesibilidad | 100 | 100 |
| Buenas prácticas | 100 | 100 |
| SEO | 69* | 69* |

\* El SEO baja únicamente por el `noindex` intencionado mientras el contenido sea de ejemplo; sin él, la puntuación es 100.

La página se genera como HTML estático. Las fuentes se cargan con `next/font` y las imágenes con `next/image`. El CLS es 0.

## Créditos y licencias de terceros

**Tipografías**
- UnifrakturCook, de j. «mach» wust y Peter Wiegel, bajo SIL Open Font License 1.1. Los contornos de la «A» y la «M» del sello se convirtieron a trazados SVG.
- Grenze Gotisch (The Grenze Gotisch Project Authors) y Newsreader (The Newsreader Project Authors), de Google Fonts, bajo SIL Open Font License 1.1, cargadas con `next/font`.

**Iconos**
- Simple Icons, bajo CC0 1.0: [`public/logos/tech/LICENSE.md`](public/logos/tech/LICENSE.md) y [`public/logos/social/LICENSE-simple-icons.md`](public/logos/social/LICENSE-simple-icons.md).
- Devicon, bajo MIT: [`public/logos/tech/LICENSE-devicon.txt`](public/logos/tech/LICENSE-devicon.txt) y [`public/logos/social/LICENSE-devicon.txt`](public/logos/social/LICENSE-devicon.txt).

**Ilustraciones**
- Las ilustraciones (la lechuza, los grabados y estampillas de especímenes y los fondos del Hero) fueron generadas con Gemini, de Google. Su uso se rige por los términos de uso del proveedor, que pueden consultarse en el sitio de Google, y no por la licencia MIT del código.

## Limitaciones conocidas

- Con 320 px de ancho y la letra del navegador al doble, la cabecera y el Hero no caben en la pantalla.
- Para buscadores y vistas previas en redes sociales, el idioma es solo español; el inglés es una preferencia del visitante, sin una URL propia.

## Licencia

| Qué | Licencia |
|---|---|
| El código (`app/`, `components/`, `hooks/`, `lib/`, `providers/`, `types/`, `scripts/` y los archivos de configuración) | MIT, ver [`LICENSE`](LICENSE) |
| El contenido y los datos personales (`data/`), y las fotos y el CV (`public/images`, salvo las ilustraciones y los fondos del Hero) | Todos los derechos reservados. No se concede permiso para usar el nombre, la imagen ni el CV de la autora |
| Los logos de `public/logos` y las tipografías | Sus licencias originales, indicadas arriba |
| La lechuza, los grabados y estampillas de especímenes (`public/images/illustrations`) y los fondos del Hero (`public/images/hero`) | Los términos de uso de su proveedor |

El detalle está en [`NOTICE`](NOTICE).
