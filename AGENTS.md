# AGENTS.md

## Alcance
Este archivo aplica al proyecto ubicado en este directorio:
- `technological-trappist/`

No describe todo el workspace superior. Describe exclusivamente este portafolio.

## Proyecto
Este repositorio contiene un portafolio personal construido con:
- Astro 5
- Tailwind CSS 4
- TypeScript para tipado de config/data y contratos simples entre componentes

La base estructural ya existe y compila correctamente. El proyecto actual no está en fase de exploración inicial: está en fase de consolidación de una v1 real.

## Estado actual del proyecto
- Existe una home de una sola página en `src/pages/index.astro`
- La home compone cuatro secciones:
  - `Hero`
  - `Projects`
  - `About`
  - `Contact`
- Existe un layout base reutilizable en `src/layouts/BaseLayout.astro`
- Existe navegación móvil y sidebar para escritorio
- Existe separación entre contenido/configuración y presentación
- El build funciona correctamente con `npm run build`
- Aún hay contenido placeholder
- Aún faltan datos reales, SEO básico completo y documentación del proyecto

## Estructura actual a preservar
- `src/layouts/`
  - layout base del documento y metadatos globales
- `src/components/layout/`
  - piezas estructurales de navegación y marco general
- `src/components/sections/`
  - secciones principales de la home
- `src/components/ui/`
  - componentes pequeños y reutilizables
- `src/config/`
  - configuración general del sitio, navegación, copy principal y enlaces
- `src/data/`
  - datos estructurados como proyectos
- `src/styles/`
  - estilos globales mínimos

## Objetivo inmediato
Llevar esta base a una v1 real del portafolio:
1. reemplazar contenido ficticio por información real
2. cargar proyectos reales y enlaces reales
3. completar SEO básico y `siteUrl`
4. mejorar consistencia visual y textual
5. actualizar `README.md`
6. consolidar una base limpia antes de escalar

## Prioridades
1. No romper la arquitectura existente sin una razón fuerte
2. No introducir complejidad innecesaria
3. Preservar performance y accesibilidad
4. Mantener una estética sobria, técnica y minimalista
5. Favorecer cambios incrementales y fáciles de revisar

## Reglas de trabajo
- Antes de proponer refactors grandes, evaluar si el problema real es de contenido, copy o configuración
- Preferir mejoras incrementales sobre reescrituras completas
- Preservar la separación entre layout, sections, ui, config y data
- Evitar JavaScript de cliente innecesario
- Usar HTML semántico
- Mantener componentes pequeños y claros
- Reutilizar patrones ya existentes antes de crear nuevos
- No añadir dependencias sin justificar claramente su beneficio

## Enfoque esperado para Codex
Codex debe actuar principalmente como:
- implementador incremental
- revisor de calidad
- editor de contenido estructurado
- optimizador de semántica, legibilidad y consistencia visual

Codex no debe asumir automáticamente que hace falta rehacer la arquitectura.

## Áreas prioritarias de intervención
Priorizar trabajo sobre:
- `src/config/site.ts`
- `src/data/projects.ts`
- `src/components/sections/*`
- `src/components/ui/*`
- `src/layouts/*`
- `src/styles/global.css`
- `README.md`

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

## Validación
Antes de cerrar una tarea:
- ejecutar `npm run build`
- ejecutar `npm run lint` si el script existe
- ejecutar `npm run typecheck` si el script existe
- reportar tradeoffs, limitaciones o validaciones no ejecutadas
