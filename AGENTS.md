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
<<<<<<< HEAD
- `IMPLEMENTATION_PLAN.md`
=======

## Criterios de decisión
Si una mejora puede resolverse modificando contenido, copy, config o pequeños componentes:
- preferir esa solución

Si una mejora requiere un refactor mayor:
- explicar primero por qué el costo está justificado
- describir impacto en estructura y mantenimiento
- evitar hacerlo sin necesidad clara

## Reglas de UI
- Mucho whitespace
- Jerarquía visual clara
- Tipografía sobria y técnica
- Hover y focus sutiles pero visibles
- Animaciones discretas
- No recargar la interfaz
- Mantener coherencia entre secciones

## Accesibilidad y semántica
- Revisar landmarks y headings
- Usar enlaces y botones correctamente
- Mantener foco visible
- No abusar de aria
- Preservar contraste adecuado
- Mantener estructura navegable por teclado

## Performance
- Evitar islands si no hay interactividad real
- Evitar JS en cliente cuando HTML y CSS basten
- Mantener DOM razonablemente limpio
- No introducir librerías pesadas sin una justificación clara

### Excepción documentada: neural background visual

Se declara como excepción consciente, acotada y revisable:

- Archivo único: `src/scripts/neural-network.js`.
- Propósito: capa visual decorativa de fondo, parte de la identidad del portafolio.
- Carga: script plano importado por `BaseLayout.astro`, sin `client:*`, sin islas Astro.
- Sin dependencias externas nuevas.
- Sin interacción de usuario: solo render en canvas.
- Accesibilidad: respetar `prefers-reduced-motion` y pausar cuando `document.hidden`.
- Estricciones duras:
  - no agregar nuevos scripts decorativos;
  - no expandir este archivo con lógica de negocio;
  - no usar como atajo para evitar HTML/CSS donde sí sea posible;
  - cualquier cambio debe mantener o reducir el JS, nunca crecerlo;
  - ante refactor futuro, preferir migrar a SVG/CSS si fuera viable.
- Esta excepción no es un permiso general: aplicar `Evitar JS en cliente cuando HTML y CSS basten` en todo el resto del proyecto.

## Modo de intervención
Para cambios medianos o grandes:
1. analizar primero el estado actual
2. explicar enfoque y archivos a tocar
3. aplicar el cambio mínimo necesario
4. validar build y consistencia
5. proponer mejoras opcionales por separado

Evitar cambios masivos sin explicación previa.

## Límites de cambio
Los siguientes elementos no deben modificarse sin justificación explícita:

- Estructura general de carpetas en `src/`
- Separación entre `sections`, `ui`, `config` y `data`
- `BaseLayout` como layout principal
- Configuración base de Astro cuando el cambio:
  - afecte la arquitectura del proyecto
  - modifique el comportamiento del build o renderizado
  - introduzca nuevas integraciones o complejidad global
- Configuración de Tailwind cuando el cambio:
  - altere tokens de diseño como colores, spacing o tipografía
  - modifique el sistema visual global
  - afecte estilos compartidos entre múltiples componentes

Si una tarea requiere modificar alguno de estos puntos:
1. explicar por qué es necesario
2. describir impacto en el proyecto
3. proponer una alternativa más simple si existe

Evitar cambios estructurales o de configuración global sin necesidad clara.

## Reglas específicas de Astro

### Uso de Islands
- No usar `client:*` por defecto
- Solo usar islands cuando haya:
  - interactividad real del usuario que no pueda resolverse bien con HTML y CSS nativos
  - comportamiento dinámico que requiera ejecución en cliente de forma justificada
- Si un componente es estático, debe permanecer como Astro puro

### Composición de componentes
- `sections/`:
  - representan bloques grandes de la página
  - no deben contener lógica compleja reutilizable

- `ui/`:
  - componentes pequeños y reutilizables
  - deben ser independientes de contexto siempre que sea posible

### Props vs Config/Data
- Si el contenido es global o editable → usar `config/` o `data/`
- Si es específico del componente → usar props
- Si un texto o bloque es estrictamente local y extraerlo no mejora claridad ni mantenimiento, puede quedarse en el componente
- Evitar hardcodear contenido directamente en los componentes

### Layout
- `BaseLayout` es responsable de:
  - estructura HTML global
  - metadatos SEO base
  - recursos compartidos globales como fuentes, favicon o configuración común del documento
  - no debe contener lógica de negocio

### HTML sobre JavaScript
- Preferir soluciones con:
  - HTML + CSS
  - atributos nativos
  - pseudo-clases
- Evitar JS si no hay una necesidad clara de interactividad

## Definition of done
Una tarea no está terminada si:
- rompe build
- empeora accesibilidad
- introduce JS innecesario
- complica la arquitectura sin ganancia real
- deja inconsistencias visuales o textuales
- no explica cómo validar el cambio
>>>>>>> 2429b85d136f395986c440b55170d1a60cf3f9ca

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
