# Checklist de abordaje para consolidar la v1

Este archivo convierte el plan general en una lista de trabajo concreta para cerrar la v1 del portafolio sin tocar la arquitectura más de lo necesario.

## Enfoque general

- [x] Mantener el enfoque incremental definido en `AGENTS.md`
- [x] Evitar refactors grandes si el problema real se resuelve con contenido, copy o config
- [x] Preservar separación entre `layout`, `sections`, `ui`, `config` y `data`
- [x] No introducir JavaScript de cliente si no hay interactividad real
- [x] Validar build y typecheck al cerrar cada bloque importante

## Fase 1. Auditoría de placeholders

- [x] Revisar `src/config/site.ts` y marcar todos los textos provisionales
- [x] Revisar `src/data/projects.ts` y marcar proyectos todavía genéricos
- [x] Revisar `README.md` y detectar descripciones que aún hablan de estado provisional
- [x] Revisar `src/layouts/BaseLayout.astro` y confirmar qué metadatos siguen pendientes para producción
- [x] Definir qué información real ya está disponible y qué todavía falta recopilar

Estado de la auditoría:

- `src/config/site.ts` conserva placeholders de identidad: `Nombre Apellido`, `Nombre`, `tuusuario`, `tudominio.com` y `contacto@tudominio.com`.
- `src/data/projects.ts` conserva proyectos genéricos sin enlaces reales.
- `README.md` ya describe correctamente la arquitectura, pero todavía indica que faltan identidad y enlaces reales.
- `src/layouts/BaseLayout.astro` tiene SEO base implementado; depende de completar `siteUrl`, títulos, descripción e imagen OG reales desde config/assets.
- La información real pendiente para continuar es: nombre o marca personal, rol exacto, ubicación, email, GitHub, LinkedIn, dominio, enfoque profesional y proyectos reales.

## Fase 2. Identidad y contenido base

Archivo principal: `src/config/site.ts`

- [x] Reemplazar `name` por el nombre real
- [x] Reemplazar `role` por el rol profesional real
- [x] Ajustar `title` y `seo.defaultTitle`
- [x] Ajustar `description` para reflejar el perfil real
- [x] Reemplazar `siteUrl` por el dominio real o dejar una decisión explícita pendiente
- [x] Reemplazar `email` por el correo real de contacto
- [x] Reemplazar `availability` por una disponibilidad realista
- [x] Completar `identity.shortName`
- [x] Completar `identity.fullName`
- [x] Completar `identity.role`
- [x] Completar `identity.location`
- [x] Ajustar `identity.focus` con fortalezas reales
- [x] Revisar `cta.primary`
- [x] Revisar `cta.secondary`
- [x] Reescribir `hero.eyebrow`
- [x] Reescribir `hero.headline`
- [x] Reescribir `hero.summary`
- [x] Reescribir `about.intro`
- [x] Reescribir `about.focus`
- [x] Reescribir `contact.lead`
- [x] Reemplazar enlaces de `socialLinks` por perfiles reales

Estado:

- Se actualizó `src/config/site.ts` con la identidad profesional de Edwd3v.
- `siteUrl` queda temporalmente vacío porque el dominio sigue pendiente.
- LinkedIn no se publica todavía porque el enlace sigue pendiente.
- `socialLinks` conserva solo GitHub real: `https://github.com/Edwd3v`.

## Fase 3. Plantilla de proyectos preparada

Archivo principal: `src/data/projects.ts`

- [x] Eliminar o reescribir proyectos que sigan siendo genéricos
- [x] Priorizar 2 o 3 proyectos reales sólidos antes que una lista más larga
- [x] Dejar `src/data/projects.ts` sin proyectos ficticios
- [x] Mostrar un estado vacío honesto cuando no hay proyectos cargados
- [x] Mantener la estructura lista para cargar proyectos reales después

Estado:

- Se decidió no publicar proyectos genéricos mientras se evalúa qué casos reales refuerzan mejor el perfil.
- `src/data/projects.ts` queda temporalmente vacío.
- `src/components/sections/Projects.astro` muestra un estado "En preparación" cuando no hay proyectos cargados.
- La sección queda lista para publicar proyectos reales más adelante sin cambiar la estructura.

## Fase 4. Ajuste de copy en secciones

Archivos:
- `src/components/sections/Hero.astro`
- `src/components/sections/Projects.astro`
- `src/components/sections/About.astro`
- `src/components/sections/Contact.astro`

- [x] Verificar que la sección `Hero` refleje correctamente el perfil real
- [x] Posponer la revisión final de `Projects` hasta cargar proyectos reales
- [x] Revisar si el heading de `About` representa bien el posicionamiento profesional
- [x] Revisar si el texto de `Contact` mantiene un tono consistente con el resto del sitio
- [x] Corregir desbalances entre tono técnico, claridad y sobriedad
- [x] Eliminar cualquier frase demasiado genérica o de relleno

## Fase 5. SEO e internacionalización local

Archivos:
- `src/config/site.ts`
- `src/layouts/BaseLayout.astro`
- `src/components/ui/LanguageSwitch.astro`
- `src/components/layout/Header.astro`
- `src/components/layout/Sidebar.astro`

- [x] Confirmar que el `title` principal sea final
- [x] Confirmar que la `description` principal sea final
- [x] Confirmar que `canonical` no se publique sin `siteUrl`
- [x] Confirmar que `og:url` no se publique sin `siteUrl`
- [x] Confirmar que `seo.ogImage` no apunte a un asset inexistente
- [x] Revisar consistencia entre Open Graph y Twitter metadata
- [x] Confirmar que el idioma del documento sea correcto
- [x] Implementar un selector visual de idioma sin enlazar rutas inexistentes
- [x] Definir estructura final de idiomas: `/es/` para español y `/en/` para inglés
- [x] Preparar contenido estructurado para español e inglés
- [x] Agregar `hreflang` cuando existan rutas por idioma
- [x] Decidir si `/` redirige por idioma del navegador o a un idioma por defecto

Estado:

- Se agregó `LanguageSwitch` como selector ES/EN.
- `/es/` queda como versión en español.
- `/en/` queda como versión en inglés.
- `/` queda como entrada de redirección: usa idioma del navegador y cae a `/es/` por defecto.
- El selector se movió a una franja propia en móvil y al bloque inferior del sidebar en escritorio para evaluar una posición menos saturada.
- Se confirmó el título final como `Edwd3v | Software Engineering`.
- Se mantiene la descripción SEO actual porque refleja el enfoque técnico definido.
- `siteUrl` queda vacío intencionalmente en entorno local.
- `canonical`, `og:url`, `hreflang` y `ogImage` no se publican con datos falsos.
- La parte local de SEO e internacionalización queda cerrada.

## Fase 6. Consistencia visual y semántica

Archivos prioritarios:
- `src/styles/global.css`
- `src/components/ui/ProjectCard.astro`
- `src/components/layout/Header.astro`
- `src/components/layout/Sidebar.astro`

- [x] Revisar jerarquía visual entre `Hero`, `Projects`, `About` y `Contact`
- [x] Revisar whitespace general entre bloques
- [x] Revisar contraste de textos secundarios
- [x] Revisar estados `hover` y `focus`
- [x] Revisar consistencia del espaciado interno de cards y bloques
- [x] Revisar si los headings mantienen una progresión clara
- [x] Revisar landmarks y estructura navegable por teclado
- [x] Revisar si hay microajustes visuales necesarios sin tocar el sistema global más de la cuenta

Avance parcial:

- Se ajustó `src/components/layout/Sidebar.astro` para alinear el bloque de identidad del sidebar con el inicio visual del `Hero` en desktop.
- Validación posterior al ajuste: `npm run build` y `npm run typecheck` ejecutados correctamente.
- Se aumentó la presencia tipográfica del nombre y rol en el sidebar.
- Se agregaron divisiones sutiles entre `Projects`, `About` y `Contact` para que la separación no dependa solo del whitespace.
- Se ajustaron headings de `About` y `Contact` para alinearlos con el perfil actual de software, Python, datos e IA aplicada.
- Validación posterior al ajuste visual: `npm run build` y `npm run typecheck` ejecutados correctamente.
- Se revisó la Fase 6 por pasos: contraste de textos secundarios, estados `hover`/`focus`, espaciado interno de cards y bloques, landmarks y navegación por teclado.
- Se aumentó el contraste de textos secundarios y etiquetas de sección sin cambiar tokens globales.
- Se reforzaron los estados de foco con `ring-offset` y se unificaron estados interactivos en navegación, selector de idioma, CTAs y cards.
- Se ajustó ligeramente el padding de cards y estados vacíos para mejorar respiración visual.
- Validación posterior a Fase 6: `npm run build` y `npm run typecheck` ejecutados correctamente.

## Fase 7. Inclusión de proyectos reales

Archivo principal: `src/data/projects.ts`

- [x] Definir 2 o 3 proyectos reales que refuercen el perfil de Edwd3v
- [x] Definir para cada proyecto un título real y claro en español e inglés
- [x] Definir una descripción basada en problema, solución y contexto en español e inglés
- [x] Completar `tech` con tecnologías realmente usadas
- [x] Completar `status`
- [x] Completar `kind`
- [x] Completar `year`
- [x] Completar `outcome` con un resultado real o aprendizaje defendible en español e inglés
- [x] Posponer `href`, `repository` y `links` públicos hasta definir exposición de proyectos
- [x] Verificar que no haya enlaces rotos o placeholders
- [x] Validar que `Projects.astro` muestre correctamente la lista al dejar de estar vacía
- [x] Revisar si el texto introductorio de `Projects` sigue siendo coherente con los proyectos reales cargados
- [x] Confirmar que la versión ES y la versión EN mantengan el mismo contenido técnico sin traducciones contradictorias

Estado:

- Se cargaron tres proyectos reales: Automatización de Indicadores SISBEN, Dashboard Portafolio Trii y M4siv3m553.
- `src/data/projects.ts` soporta contenido localizado para español e inglés.
- Los repositorios y demos públicas quedan pendientes de publicación porque actualmente los proyectos se mantienen privados para revisar exposición de datos.
- `ProjectCard.astro` muestra metadatos compactos: tipo, año, estado, descripción, resultado y tecnologías, sin saturar visualmente las cards.
- `Projects.astro` selecciona la lista por idioma y conserva el estado vacío como fallback.
- Validación posterior a la carga de proyectos: `npm run build` y `npm run typecheck` ejecutados correctamente.
- La inclusión local de proyectos queda cerrada. La publicación de demos, repositorios o enlaces externos se mueve a la fase de despliegue.

Avance de Fase 4:

- Se ajustó el copy del `Hero` para presentar a Edwd3v como estudiante de Ingeniería de Software enfocado en Python, datos, automatización e IA aplicada.
- Se cambiaron los CTA del `Hero` a `Ver enfoque` y `Contacto` para evitar dirigir primero a una sección de proyectos que todavía está en preparación.
- Se ajustó `About` para presentar una narrativa más honesta de estudiante que aprende construyendo software con Python, datos y herramientas de IA.
- Se ajustó `Contact` para comunicar disponibilidad de forma más directa y con menos repetición.
- Se reemplazó la frase genérica "contextos reales" por "problemas técnicos reales" para cerrar el tono de `Contact`.

## Fase 8. README

Archivo principal: `README.md`

- [x] Actualizar la descripción general del proyecto
- [x] Ajustar la sección de estado actual para reflejar la realidad del repo
- [x] Documentar claramente stack y estructura
- [x] Confirmar que los comandos actuales sigan siendo correctos
- [x] Documentar el objetivo actual del proyecto sin hablar como si todo siguiera en placeholder
- [x] Mantener el README simple y útil, sin inflarlo innecesariamente

Estado:

- `README.md` refleja el portafolio bilingüe actual, rutas `/es/` y `/en/`, SEO local, proyectos cargados y pendientes de despliegue.

## Fase 9. Exploración visual del background

Objetivo:

Explorar una mejora visual incremental sobre la plantilla actual sin romper la arquitectura, el contraste ni el rendimiento.

Archivos probables:
- `src/layouts/BaseLayout.astro`
- `src/styles/global.css`
- `src/components/ui/*`
- `public/visuals/`

- [x] Diseñar una luz de fondo semi-interactiva como primera intervención visual
- [x] Mantener un fallback estático si JavaScript no está disponible
- [x] Evitar dependencias nuevas
- [x] Evitar islands o JS pesado si el efecto puede resolverse con CSS y un script mínimo
- [ ] Validar que la luz no afecte la legibilidad del contenido
- [ ] Validar que el efecto sea discreto en desktop y no moleste en mobile
- [x] Respetar `prefers-reduced-motion`
- [x] Agregar prueba automatizada para validar que el cursor actualiza la luz
- [x] Ejecutar `npm run test:ci`
- [x] Ejecutar `npm run build`
- [x] Ejecutar `npm run typecheck`
- [ ] Evaluar visualmente si el efecto se mantiene, se ajusta o se descarta

Estado:

- Esta fase empieza por el background, no por las imágenes.
- La primera mejora visual será una luz semi-interactiva de fondo.
- Se implementó una capa fija de ambiente con fallback estático y seguimiento de cursor mediante `pointermove` y `mousemove`.
- Se ajustó la luz a una capa DOM real (`.cursor-spotlight`) movida directamente con `transform` para evitar que el efecto dependa solo de variables heredadas en pseudo-elementos.
- Se mantiene `src/scripts/spotlight.js` como lógica testeable y el layout usa un script inline autocontenido para garantizar ejecución directa en el navegador.
- Se agregó depuración controlada con `?spotlight-debug` o `localStorage.setItem("spotlight-debug", "true")`.
- La interacción ya no se desactiva por `prefers-reduced-motion` ni por `pointer: coarse`; esas condiciones solo reducen intensidad visual para evitar falsos negativos en equipos híbridos o navegadores con configuración especial.
- Validación técnica del background: `npm run test:ci`, `npm run build` y `npm run typecheck` ejecutados correctamente.
- La integración de imágenes propias de Illustrator queda para un paso posterior dentro de esta fase, después de validar el background.

## Fase 10. Preparación de despliegue

Archivos probables:
- `src/config/site.ts`
- `src/layouts/BaseLayout.astro`
- `public/`
- `src/data/projects.ts`

- [ ] Definir plataforma de despliegue y URL final o temporal
- [ ] Completar `siteUrl` con una URL real
- [ ] Confirmar que `canonical` se genere con la URL final
- [ ] Confirmar que `og:url` dependa del dominio real correcto
- [ ] Publicar `hreflang` con URLs absolutas reales para `/es/` y `/en/`
- [ ] Crear o agregar imagen OG final en `public/`
- [ ] Conectar `seo.ogImage` con el asset real
- [ ] Revisar preview social de la URL publicada
- [ ] Decidir si los proyectos tendrán demo pública, repositorio o enlaces externos
- [ ] Agregar `href`, `repository` o `links` a proyectos si aplica
- [ ] Verificar que no se expongan datos sensibles en proyectos, enlaces o assets

Estado:

- Esta fase se crea para no dejar la Fase 5 incompleta.
- Depende de decisiones de publicación: hosting, dominio o URL temporal, asset OG final y exposición pública de proyectos.

## Fase 11. Validación final

- [ ] Ejecutar `npm run build`
- [ ] Ejecutar `npm run typecheck`
- [ ] Ejecutar `npm run lint` si ese script existe en el futuro
- [ ] Revisar que no se haya introducido JS de cliente innecesario
- [ ] Revisar que no se haya roto accesibilidad o semántica
- [ ] Revisar que no haya incoherencias textuales entre config, data y secciones

## Cuándo usar Plan mode en Codex

Plan mode sí tiene sentido si se quiere ejecutar esta lista por bloques y mantener control sobre el alcance.

Secuencia sugerida dentro de Codex:

- [x] Bloque 1: auditoría de placeholders
- [x] Bloque 2: identidad y config
- [x] Bloque 3: plantilla de proyectos
- [x] Bloque 4: copy y consistencia
- [x] Bloque 5: SEO local, proyectos reales y README
- [ ] Bloque 6: exploración visual
- [ ] Bloque 7: despliegue y validación final

## Sobre una skill de frontend design

- [ ] No instalarla como sustituto del trabajo de contenido y configuración
- [ ] Evaluarla solo después de cerrar identidad, proyectos y SEO
- [ ] Usarla si aporta a jerarquía visual, spacing y pulido de UI
- [ ] Evitar skills que empujen a un rediseño innecesario o a patrones visuales fuera del tono del proyecto
