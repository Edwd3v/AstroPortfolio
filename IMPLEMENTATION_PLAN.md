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

- Se actualizó `src/config/site.ts` con la identidad profesional de Edwdev.
- `siteUrl` queda temporalmente vacío porque el dominio sigue pendiente.
- LinkedIn no se publica todavía porque el enlace sigue pendiente.
- `socialLinks` conserva solo GitHub real: `https://github.com/Edwd3v`.

## Fase 3. Proyectos reales

Archivo principal: `src/data/projects.ts`

- [ ] Eliminar o reescribir proyectos que sigan siendo genéricos
- [ ] Priorizar 2 o 3 proyectos reales sólidos antes que una lista más larga
- [ ] Definir para cada proyecto un título real y claro
- [ ] Definir una descripción basada en problema, solución y contexto
- [ ] Completar `tech` con tecnologías realmente usadas
- [ ] Completar `status`
- [ ] Completar `kind`
- [ ] Completar `year`
- [ ] Completar `outcome` con un resultado real o defendible
- [ ] Agregar `href` si existe demo pública
- [ ] Agregar `repository` si conviene mostrar repositorio
- [ ] Agregar `links` adicionales si aportan contexto
- [ ] Verificar que no haya enlaces rotos o placeholders

## Fase 4. Ajuste de copy en secciones

Archivos:
- `src/components/sections/Hero.astro`
- `src/components/sections/Projects.astro`
- `src/components/sections/About.astro`
- `src/components/sections/Contact.astro`

- [ ] Verificar que la sección `Hero` refleje correctamente el perfil real
- [ ] Revisar si el texto introductorio de `Projects` sigue siendo coherente con los proyectos reales cargados
- [ ] Revisar si el heading de `About` representa bien el posicionamiento profesional
- [ ] Revisar si el texto de `Contact` mantiene un tono consistente con el resto del sitio
- [ ] Corregir desbalances entre tono técnico, claridad y sobriedad
- [ ] Eliminar cualquier frase demasiado genérica o de relleno

## Fase 5. SEO básico real

Archivos:
- `src/config/site.ts`
- `src/layouts/BaseLayout.astro`

- [ ] Confirmar que `siteUrl` sea real y usable en producción
- [ ] Confirmar que el `title` principal sea final
- [ ] Confirmar que la `description` principal sea final
- [ ] Confirmar que `canonical` se genere correctamente
- [ ] Confirmar que `og:url` dependa del dominio real correcto
- [ ] Confirmar que `seo.ogImage` apunte a un asset real o tomar una decisión temporal explícita
- [ ] Revisar consistencia entre Open Graph y Twitter metadata
- [ ] Confirmar que el idioma del documento sea correcto

## Fase 6. Consistencia visual y semántica

Archivos prioritarios:
- `src/styles/global.css`
- `src/components/ui/ProjectCard.astro`
- `src/components/layout/Header.astro`
- `src/components/layout/Sidebar.astro`

- [x] Revisar jerarquía visual entre `Hero`, `Projects`, `About` y `Contact`
- [ ] Revisar whitespace general entre bloques
- [ ] Revisar contraste de textos secundarios
- [ ] Revisar estados `hover` y `focus`
- [ ] Revisar consistencia del espaciado interno de cards y bloques
- [ ] Revisar si los headings mantienen una progresión clara
- [ ] Revisar landmarks y estructura navegable por teclado
- [ ] Revisar si hay microajustes visuales necesarios sin tocar el sistema global más de la cuenta

Avance parcial:

- Se ajustó `src/components/layout/Sidebar.astro` para alinear el bloque de identidad del sidebar con el inicio visual del `Hero` en desktop.
- Validación posterior al ajuste: `npm run build` y `npm run typecheck` ejecutados correctamente.

## Fase 7. README

Archivo principal: `README.md`

- [ ] Actualizar la descripción general del proyecto
- [ ] Ajustar la sección de estado actual para reflejar la realidad del repo
- [ ] Documentar claramente stack y estructura
- [ ] Confirmar que los comandos actuales sigan siendo correctos
- [ ] Documentar el objetivo actual del proyecto sin hablar como si todo siguiera en placeholder
- [ ] Mantener el README simple y útil, sin inflarlo innecesariamente

## Fase 8. Validación final

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
- [ ] Bloque 3: proyectos reales
- [ ] Bloque 4: copy y consistencia
- [ ] Bloque 5: SEO y README
- [ ] Bloque 6: validación final

## Sobre una skill de frontend design

- [ ] No instalarla como sustituto del trabajo de contenido y configuración
- [ ] Evaluarla solo después de cerrar identidad, proyectos y SEO
- [ ] Usarla si aporta a jerarquía visual, spacing y pulido de UI
- [ ] Evitar skills que empujen a un rediseño innecesario o a patrones visuales fuera del tono del proyecto
