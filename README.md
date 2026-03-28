# Technological Trappist

Portafolio personal construido con Astro y Tailwind CSS.

El proyecto está planteado como una home estática de una sola página, con una arquitectura simple y mantenible, enfocada en rendimiento, accesibilidad y claridad visual.

## Estado actual
- La base del portafolio ya existe y compila correctamente
- La home actual está compuesta por:
  - `Hero`
  - `Projects`
  - `About`
  - `Contact`
- Existe separación entre layout, secciones, componentes reutilizables y datos
- Existe un `BaseLayout` con metadatos SEO base
- El contenido principal vive en `src/config/site.ts` y `src/data/projects.ts`
- Ya se corrigieron varias bases de semántica y accesibilidad
- Aún hay identidad y enlaces reales por completar antes de considerar cerrada la v1

## Stack
- Astro 5
- Tailwind CSS 4
- TypeScript para tipado de config/data y contratos simples entre componentes

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
│   └── styles/
├── AGENTS.md
├── astro.config.mjs
├── tailwind.config.mjs
└── package.json
```

## Archivos clave
- `src/pages/index.astro`: compone la página principal
- `src/layouts/BaseLayout.astro`: layout base y metadatos globales
- `src/config/site.ts`: navegación, copy principal, enlaces y configuración del sitio
- `src/data/projects.ts`: datos estructurados de proyectos
- `src/styles/global.css`: estilos globales mínimos
- `AGENTS.md`: criterios de trabajo, límites de cambio y validación

## Comandos
Todos los comandos se ejecutan desde la raíz del proyecto.

```sh
npm install
npm run dev
npm run build
npm run typecheck
npm run preview
```

## Objetivo inmediato
La prioridad actual no es rehacer la arquitectura, sino consolidar una primera versión real del portafolio:

1. Reemplazar identidad provisional por información real
2. Cargar enlaces reales de proyectos y perfiles
3. Completar assets sociales finales como imagen OG si aplica
4. Mantener consistencia visual, semántica y textual
5. Dejar una base limpia para futuras iteraciones sin rehacer la arquitectura

## Criterios del proyecto
- Mantener una arquitectura simple
- Evitar JavaScript innecesario en cliente
- Preservar performance y accesibilidad
- Favorecer cambios incrementales
- Mantener una estética sobria, técnica y minimalista

## Validación
Antes de cerrar cambios importantes:

```sh
npm run build
npm run typecheck
```

Si en el futuro se agrega `lint`, también debería ejecutarse como parte de la validación habitual.
