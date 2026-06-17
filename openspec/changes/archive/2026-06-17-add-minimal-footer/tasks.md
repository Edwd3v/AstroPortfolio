# Tasks: add-minimal-footer

## Review Workload Forecast

| Field | Value |
|-------|-------|
| Estimated changed lines | 80-140 |
| 400-line budget risk | Low |
| Chained PRs recommended | No |
| Suggested split | single PR |
| Delivery strategy | ask-always |
| Chain strategy | pending |

Decision needed before apply: Yes
Chained PRs recommended: No
Chain strategy: pending
400-line budget risk: Low

### Suggested Work Units

| Unit | Goal | Likely PR | Notes |
|------|------|-----------|-------|
| 1 | Footer mínimo completo + validación | PR 1 | Incluye config, layout, accesibilidad y checks |

## Phase 1: Configuración base

- [x] 1.1 En `src/config/site.ts`, agregar `siteConfig.footer.tagline` para `es` y `en` con copy breve, factual y bilingüe.
- [x] 1.2 Reutilizar `siteConfig.email`, `siteConfig.identity.location` y `sharedSocialLinks`; no agregar LinkedIn ni placeholders.

## Phase 2: Componente Footer

- [x] 2.1 Crear `src/components/layout/Footer.astro` con props tipadas `config`, `links` y `locale`, y calcular `currentYear` dentro del componente.
- [x] 2.2 Renderizar `<footer>` con `© {year} {name} — {location}`, tagline AI First, y `nav` con `aria-label` localizado.
- [x] 2.3 Mostrar enlace GitHub desde `links` y enlace `mailto:${config.email}`; omitir cualquier red sin `href` real.
- [x] 2.4 Aplicar solo Tailwind para layout `flex-col` → `sm:flex-row`, separador sutil y focus visible consistente.

## Phase 3: Integración en layout

- [x] 3.1 Modificar `src/layouts/BaseLayout.astro` para extraer `socialLinks`, importar `Footer` y pasarlo después del grid.
- [x] 3.2 Verificar que `Footer` quede fuera de `<main>` y como hermano del grid dentro de `div.mx-auto.max-w-6xl`.

## Phase 4: Validación

- [x] 4.1 Revisar manualmente `/es/` y `/en/`: footer visible al final, discreto en desktop y único cierre visible en mobile.
- [x] 4.2 Verificar teclado/DOM: `nav aria-label` localizado y ring de foco visible en los links del footer.
- [x] 4.3 Ejecutar `npm run build`.
- [x] 4.4 Ejecutar `npm run typecheck` y `npm run test:ci` para detectar regresiones del layout existente.
