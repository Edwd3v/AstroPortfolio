# Design: add-minimal-footer

## Technical Approach

Agregar un footer semántico y mínimo como componente Astro puro en `src/components/layout/Footer.astro`, renderizado desde `src/layouts/BaseLayout.astro` después del grid que contiene `Sidebar` y `<main>`. El contenido saldrá de `localizedSite[locale]`: `siteConfig` para identidad/email/footer tagline y `socialLinks` para GitHub. No se agrega LinkedIn hasta tener URL real.

## Architecture Decisions

| Decisión | Elección | Alternativas consideradas | Rationale |
|---|---|---|---|
| Componente de layout | Crear `Footer.astro` en `src/components/layout/` | Markup inline en `BaseLayout` o sección en `sections/` | Sigue el patrón de `Header`/`Sidebar` y mantiene `BaseLayout` como composición global, no como contenedor de markup específico. |
| Ubicación semántica | Renderizar `<Footer />` dentro de `max-w-6xl`, después del grid y fuera de `<main>` | Dentro de `<main>` o dentro del grid | Mantiene el landmark `<footer>` separado del contenido principal y lo hace discreto en desktop respecto al sidebar sticky. |
| Datos | Usar `siteConfig`, `socialLinks` y nuevo `siteConfig.footer.tagline` localizado | Hardcodear copy en el componente | Preserva separación contenido/presentación y permite ES/EN sin duplicar componentes. |
| Links | Renderizar GitHub y email; omitir LinkedIn | Placeholder de LinkedIn | Evita inventar una URL inexistente y mantiene el slice seguro. |

## Data Flow

```text
BaseLayout locale
  └─ localizedSite[locale]
      ├─ siteConfig ─────┐
      └─ socialLinks ────┤
                          ↓
                    Footer.astro
                          ↓
       <footer> copyright + tagline + GitHub + email
```

`BaseLayout.astro` deberá cambiar de `const { labels, siteConfig } = localizedSite[locale];` a incluir `socialLinks`, y pasar `config={siteConfig}`, `links={socialLinks}`, `locale={locale}` al footer.

## File Changes

| File | Action | Description |
|------|--------|-------------|
| `src/components/layout/Footer.astro` | Create | Componente Astro puro con `<footer>`, copyright, tagline, ubicación, GitHub y email. |
| `src/layouts/BaseLayout.astro` | Modify | Importar `Footer`, extraer `socialLinks`, renderizarlo después del grid y antes de scripts. |
| `src/config/site.ts` | Modify | Agregar `footer: { tagline: string }` en `siteConfig` para `es` y `en`. |

## Interfaces / Contracts

```ts
type FooterProps = {
  config: SiteConfig;
  links: SiteContent["socialLinks"];
  locale: Locale;
};
```

`Footer.astro` calcula `currentYear` internamente. `links` debe filtrar/renderizar solo datos existentes; no debe crear LinkedIn. Los enlaces externos usan `target="_blank"` y `rel="noreferrer"`; email usa `mailto:${config.email}`. El `aria-label` del `<nav>` puede resolverse con un mapa local por `locale` para evitar ampliar config más de lo necesario.

## Styling / Semantics

Usar Tailwind existente: `mt-16 md:mt-20`, `border-t border-text/10`, `px-6 md:px-10`, `py-8 md:py-10`, `text-xs text-text/50`, layout `flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4`. Links con foco consistente: `focus:outline-none focus-visible:ring-2 focus-visible:ring-accent/70 focus-visible:ring-offset-2 focus-visible:ring-offset-bg`. Sin cambios en `global.css`, sin islands y sin dependencias.

## Testing Strategy

| Layer | What to Test | Approach |
|-------|-------------|----------|
| Static/build | Astro types, imports y config localizada | `npm run typecheck` y `npm run build` |
| Regression scripts | JS existente no afectado | `npm run test:ci` |
| Manual a11y/responsive | Footer fuera de `<main>`, visible mobile/desktop, foco visible | Inspección DOM y navegación por teclado en `/es/` y `/en/` |

## Migration / Rollout

No migration required. Rollback: revertir el nuevo componente y las dos modificaciones (`BaseLayout.astro`, `site.ts`).

## Open Questions

- [ ] URL de LinkedIn pendiente para un cambio futuro; no bloquea este diseño.
