# Technological Trappist

Portafolio personal de Edwd3v construido con Astro, Tailwind CSS y TypeScript.

El proyecto funciona como una base estática, bilingüe y mantenible para presentar perfil técnico, proyectos y contacto. La prioridad actual es conservar una arquitectura simple, buen rendimiento, accesibilidad razonable y contenido fácil de actualizar.

## Estado actual

- Portafolio consolidado para trabajo local.
- Versiones por idioma:
  - `/es/`: español
  - `/en/`: inglés
  - `/`: redirección por idioma del navegador con fallback a `/es/`
- Home compuesta por:
  - `Hero`
  - `Projects`
  - `About`
  - `Contact`
- Identidad y copy principal alineados con el perfil de Edwd3v.
- Contenido centralizado por idioma en `src/config/site.ts`.
- Proyectos reales cargados en `src/data/projects.ts` con contenido localizado.
- Layout base con metadatos SEO locales, Open Graph/Twitter base y soporte preparado para canonical/hreflang cuando exista `siteUrl`.
- Selector ES/EN implementado sin JavaScript de cliente.
- Pendientes de despliegue: `siteUrl`, canonical definitivo, `og:url`, imagen OG final y revisión pública de enlaces de proyectos.

## Stack

- Astro 5
- Tailwind CSS 4
- TypeScript

## Estructura del proyecto

```text
/
├── public/
├── src/
│   ├── components/
│   │   ├── layout/
│   │   ├── sections/
│   │   └── ui/
│   ├── config/
│   ├── data/
│   ├── layouts/
│   ├── pages/
│   │   ├── en/
│   │   ├── es/
│   │   └── index.astro
│   └── styles/
├── AGENTS.md
├── IMPLEMENTATION_PLAN.md
├── astro.config.mjs
├── tailwind.config.mjs
└── package.json
```

## Archivos clave

- `src/pages/index.astro`: redirección por idioma.
- `src/pages/es/index.astro`: versión en español.
- `src/pages/en/index.astro`: versión en inglés.
- `src/layouts/BaseLayout.astro`: estructura HTML global, metadatos y marco general.
- `src/config/site.ts`: navegación, SEO local, copy por idioma, contacto y enlaces sociales.
- `src/data/projects.ts`: datos estructurados de proyectos por idioma.
- `src/components/sections/*`: secciones principales de la home.
- `src/components/ui/LanguageSwitch.astro`: selector ES/EN.
- `src/components/ui/ProjectCard.astro`: presentación reutilizable de proyectos.
- `src/styles/global.css`: estilos globales mínimos.
- `IMPLEMENTATION_PLAN.md`: checklist de consolidación y fases pendientes.
- `AGENTS.md`: reglas de trabajo y límites de cambio para Codex.

## Comandos

Todos los comandos se ejecutan desde la raíz del proyecto.

```sh
npm install
npm run dev
npm run build
npm run typecheck
npm run preview
```

## Flujo local

Iniciar servidor de desarrollo:

```sh
npm run dev
```

Rutas principales:

```text
http://localhost:4321/
http://localhost:4321/es/
http://localhost:4321/en/
```

## Pendientes antes de despliegue

- Definir plataforma de despliegue y URL final o temporal.
- Completar `siteUrl` en `src/config/site.ts`.
- Activar canonical, `og:url` y `hreflang` con URLs absolutas reales.
- Crear o agregar imagen OG final en `public/`.
- Revisar preview social de la URL publicada.
- Decidir qué demos, repositorios o enlaces externos de proyectos se harán públicos.
- Verificar que no se expongan datos sensibles en proyectos, enlaces o assets.

## Criterios del proyecto

- Mantener arquitectura simple.
- Evitar JavaScript de cliente innecesario.
- Preservar performance y accesibilidad.
- Favorecer cambios incrementales.
- Mantener una estética sobria, técnica y minimalista.
- No introducir dependencias sin una justificación clara.

## Validación

Antes de cerrar cambios importantes:

```sh
npm run build
npm run typecheck
```

Si en el futuro se agrega `lint`, también debe ejecutarse como parte de la validación.
