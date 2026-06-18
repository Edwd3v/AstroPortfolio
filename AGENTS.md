# AGENTS.md

## Alcance

Este archivo aplica exclusivamente al proyecto `technological-trappist/`. No describe el workspace superior.

## Proyecto

Portafolio personal de Edwd3v construido con:

- Astro 5
- Tailwind CSS 4
- TypeScript para configuración, data y contratos simples entre componentes

El proyecto ya tiene una base funcional y no debe tratarse como una exploración desde cero. Está en fase de cierre de v1: pulido visual, preparación de despliegue y validación final.

## Estado actual

- Sitio estático bilingüe:
  - `/es/`: español
  - `/en/`: inglés
  - `/`: redirección por idioma del navegador con fallback a `/es/`
- Home compuesta por `Hero`, `Projects`, `About` y `Contact`.
- Layout base en `src/layouts/BaseLayout.astro`.
- Navegación móvil y sidebar de escritorio.
- Contenido principal centralizado en `src/config/site.ts`.
- Proyectos reales localizados en `src/data/projects.ts`.
- SEO base implementado sin publicar URLs falsas cuando `siteUrl` está vacío.
- Selector ES/EN implementado sin JavaScript de cliente.
- Background visual con spotlight, canvas neural y watermark de marca.
- `README.md` actualizado.
- `npm run build` y `npm run typecheck` pasan correctamente.

## Próximo foco

1. Validar visualmente el background/spotlight en desktop y mobile.
2. Ajustar jerarquía visual si algún efecto compite con el contenido.
3. Definir plataforma de despliegue y URL final o temporal.
4. Completar `siteUrl`, canonical absoluto, `og:url`, `hreflang` absoluto e imagen OG final.
5. Decidir qué demos, repositorios o enlaces externos de proyectos serán públicos.
6. Ejecutar validación final antes de publicar.

## Estructura a preservar

| Ruta | Responsabilidad |
| --- | --- |
| `src/layouts/` | Layout global, estructura HTML y metadatos base. |
| `src/components/layout/` | Header, sidebar y piezas estructurales. |
| `src/components/sections/` | Bloques principales de la home. |
| `src/components/ui/` | Componentes pequeños y reutilizables. |
| `src/config/` | Configuración editable del sitio, navegación, copy y enlaces. |
| `src/data/` | Datos estructurados como proyectos. |
| `src/scripts/` | Comportamientos de cliente aislados y testeables. |
| `src/styles/` | Estilos globales mínimos y efectos compartidos. |

## Reglas duras

- No romper la separación entre `layouts`, `layout`, `sections`, `ui`, `config`, `data`, `scripts` y `styles` sin justificación fuerte.
- No introducir dependencias nuevas sin explicar beneficio, costo y alternativa simple.
- No usar `client:*` por defecto. Un componente estático debe seguir siendo Astro puro.
- No agregar JavaScript de cliente si HTML/CSS o atributos nativos resuelven bien el problema.
- No publicar metadata falsa: si no hay `siteUrl`, imagen OG o URL pública real, dejar esos campos vacíos o condicionales.
- No exponer enlaces, repositorios, demos, assets o datos sensibles sin revisión explícita.
- No hacer refactors grandes para resolver problemas de contenido, copy, spacing o configuración.

## Criterios de diseño

- Estética sobria, técnica y minimalista.
- Mucho whitespace y jerarquía visual clara.
- El contenido debe mandar; los efectos visuales no deben competir con lectura, contraste ni navegación.
- Hover y focus deben ser sutiles pero visibles.
- Animaciones discretas, con respeto por `prefers-reduced-motion`.
- Evitar exceso de uppercase/tracking cuando afecte legibilidad de contenido real.
- Mantener consistencia entre versión ES y EN sin traducciones contradictorias.

## Criterios de arquitectura

- Preferir cambios incrementales y fáciles de revisar.
- Resolver primero con contenido, data, config o pequeños componentes.
- Reutilizar patrones existentes antes de crear nuevos.
- Mantener componentes pequeños, semánticos y claros.
- `BaseLayout` controla documento, metadatos y recursos globales; no debe contener lógica de negocio.
- `sections/` representa bloques de página; no debe acumular lógica reutilizable compleja.
- `ui/` contiene piezas reutilizables e independientes del contexto cuando sea razonable.

## Accesibilidad y semántica

- Revisar landmarks, headings y orden de lectura.
- Usar enlaces y botones según su comportamiento real.
- Mantener foco visible y navegabilidad por teclado.
- No abusar de `aria`; usar semántica HTML primero.
- Preservar contraste suficiente en texto secundario, cards, botones y fondos animados.
- Validar que efectos de fondo no reduzcan legibilidad.

## Performance

- Mantener el sitio estático y liviano.
- Evitar islands si no hay interactividad real.
- Mantener scripts de cliente pequeños, aislados y testeables.
- Evitar librerías pesadas para efectos visuales que CSS/canvas simple pueda resolver.
- Revisar efectos `fixed`, canvas y animaciones en mobile o dispositivos de bajo rendimiento.

## Modo de intervención

Para cambios medianos o grandes:

1. Analizar el estado actual.
2. Explicar enfoque y archivos a tocar.
3. Aplicar el cambio mínimo necesario.
4. Validar build, typecheck y consistencia visual/semántica.
5. Dejar mejoras opcionales separadas del cambio principal.

Para cambios pequeños:

- Mantener el diff acotado.
- No mezclar refactor, copy, diseño y despliegue en una sola intervención si no hace falta.

## Límites de cambio

No modificar sin justificación explícita:

- Estructura general de carpetas en `src/`.
- Separación entre `sections`, `ui`, `config`, `data`, `scripts` y `styles`.
- `BaseLayout` como layout principal.
- Configuración base de Astro si afecta build, renderizado, transiciones o integraciones globales.
- Configuración de Tailwind si altera tokens compartidos de color, spacing, tipografía o sistema visual.
- Scripts visuales existentes (`spotlight`, `neural-network`, `logo-decode`, `section-nav`) si el cambio no está relacionado con ellos.

Si una tarea requiere tocar alguno de estos puntos:

1. Explicar por qué es necesario.
2. Describir impacto en mantenimiento, accesibilidad y performance.
3. Proponer una alternativa más simple si existe.

## Prioridad de archivos

Priorizar intervenciones sobre:

- `src/config/site.ts`
- `src/data/projects.ts`
- `src/components/sections/*`
- `src/components/ui/*`
- `src/components/layout/*`
- `src/layouts/BaseLayout.astro`
- `src/styles/global.css`
- `README.md`
- `IMPLEMENTATION_PLAN.md`

## Validación

Antes de cerrar cambios importantes:

- Ejecutar `npm run build`.
- Ejecutar `npm run typecheck`.
- Ejecutar `npm run test:ci` cuando el cambio toque scripts, navegación, efectos visuales o comportamiento testeado.
- Ejecutar `npm run lint` si el script existe en el futuro.
- Reportar validaciones no ejecutadas, tradeoffs y límites del cambio.

## Definition of done

Una tarea no está terminada si:

- Rompe build o typecheck.
- Empeora accesibilidad, contraste o navegación por teclado.
- Introduce JS innecesario.
- Complica la arquitectura sin ganancia real.
- Deja inconsistencias visuales o textuales entre ES y EN.
- Publica URLs, metadata o enlaces no confirmados.
- No explica cómo validar el cambio.
