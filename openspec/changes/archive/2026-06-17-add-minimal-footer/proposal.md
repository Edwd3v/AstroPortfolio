# Propuesta: add-minimal-footer

## Intencion

El portafolio no tiene elemento `<footer>` semantico. Las paginas terminan abruptamente despues de la seccion Contact. En mobile no existe ningun elemento de cierre (el copyright del Sidebar esta dentro de `hidden md:block`). El sitio necesita un footer minimalista que:

- Cierre la pagina con HTML semantico correcto (`<footer>` como landmark).
- Refuerce sutilmente el posicionamiento como developer con enfoque AI First.
- Exponga enlaces a GitHub y email sin duplicar la navegacion existente.
- Funcione en mobile y desktop sin competir con el sidebar.

## Alcance

### Dentro del alcance

- Crear `src/components/layout/Footer.astro` siguiendo el patron de Header y Sidebar.
- Insertar `<Footer />` en `BaseLayout.astro` despues del grid div, dentro del contenedor `max-w-6xl`.
- Mostrar copyright, ubicacion (Colombia), y un tagline corto de posicionamiento AI First.
- Renderizar enlace a GitHub desde `sharedSocialLinks` y enlace mailto desde `siteConfig.email`.
- Diseno responsive: columna en mobile, fila en `sm:`.
- Sin JavaScript de cliente, sin dependencias nuevas, sin CSS fuera de Tailwind.

### Fuera del alcance

- LinkedIn (URL pendiente — se agrega despues como cambio incremental).
- Paginas legales, resume, analytics, newsletter, iconos SVG.
- Nuevas rutas o cambios en `src/pages/`, `src/data/`, `src/components/sections/`.
- Modificaciones a `tailwind.config.mjs`, `package.json`, o `global.css`.

## Capacidades

> Esta seccion es el CONTRATO entre proposal y specs.
> El agente sdd-spec lee esto para saber que specs crear o actualizar.

### Nuevas capacidades

- `site-footer`: Footer semantico minimalista con copyright, posicionamiento AI First, y enlaces sociales/email. Componente de layout reutilizable.

### Capacidades modificadas

- Ninguna.

## Enfoque

**Componente en `src/components/layout/Footer.astro`** — mismo patron que Header y Sidebar: recibe props tipados (`SiteConfig`, `socialLinks`, `Locale`), renderiza HTML semantico con Tailwind.

**Ubicacion en BaseLayout**: despues del cierre del grid div, dentro del contenedor `max-w-6xl`. El footer es hermano del grid (no hijo de `<main>`), semanticamente correcto y visualmente discreto en desktop.

**Contenido del footer**:

- Copyright: `© {year} {name} — {location}`
- Tagline AI First: texto corto y creible derivado de `identity.role` o un nuevo campo `footer.tagline` en la config.
- Enlaces: GitHub (de `sharedSocialLinks`) + email (mailto de `siteConfig.email`).
- LinkedIn: omitido inicialmente, se agrega cuando el usuario proporcione la URL.

**Principios visuales**:

- `border-t border-text/10` como separador sutil.
- `text-xs text-text/50` — tipografia discreta.
- `mt-16 md:mt-20` — espaciado generoso.
- Links con `hover:text-text` y `focus-visible:ring-2 focus-visible:ring-accent/70` (patron existente).
- Sin animaciones, sin JS.

## Areas afectadas

| Area | Impacto | Descripcion |
|------|---------|-------------|
| `src/components/layout/Footer.astro` | Nuevo | Componente footer con props tipados |
| `src/layouts/BaseLayout.astro` | Modificado | Importar y renderizar Footer despues del grid |
| `src/config/site.ts` | Modificado | Agregar campo `footer.tagline` localizado (es/en) |

## Riesgos

| Riesgo | Probabilidad | Mitigacion |
|--------|-------------|------------|
| Dual copyright (Sidebar + Footer) en desktop | Baja | Son complementarios: Sidebar muestra nombre estilizado, Footer agrega ubicacion + rol + tagline |
| Tagline AI First suena promocional | Media | Mantenerlo factual y corto, derivado del rol existente. Evitar buzzwords |
| LinkedIn ausente en el primer slice | Baja | Disenado como incremento trivial: agregar URL a `sharedSocialLinks` y el footer lo renderiza automaticamente |

## Plan de rollback

Revertir el commit que introduce el cambio. Solo afecta 3 archivos (1 nuevo, 2 modificados). No hay migraciones, datos, ni dependencias que deshacer.

## Dependencias

- URL de LinkedIn del usuario (pendiente — no bloquea este slice).

## Criterios de exito

- [ ] `<footer>` semantico visible en mobile y desktop.
- [ ] En desktop, el footer no compite visualmente con el sidebar.
- [ ] Tagline AI First presente, sutil y creible.
- [ ] GitHub y email renderizados correctamente desde config.
- [ ] `npm run build` pasa sin errores.
- [ ] Cero JavaScript de cliente anadido.
- [ ] Accesibilidad: landmark `<footer>`, `<nav aria-label>`, focus visible en links.

## Decisiones pendientes

1. **URL de LinkedIn**: se agrega en un slice posterior cuando el usuario la proporcione.
2. **Texto exacto del tagline AI First**: se define en la fase de specs. Debe ser bilingue (es/en) y derivado del posicionamiento existente.
