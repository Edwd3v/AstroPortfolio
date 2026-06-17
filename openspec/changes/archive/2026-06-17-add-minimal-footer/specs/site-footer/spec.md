# Especificacion: site-footer

## Proposito

Define el comportamiento del footer semantico minimalista del portafolio: un componente de layout reutilizable que cierra la pagina con HTML semantico correcto, refuerza el posicionamiento AI First del autor, y expone enlaces sociales y de contacto sin duplicar la navegacion existente.

## Requisitos

### Requisito: Footer como landmark semantico

El sistema DEBE renderizar un elemento `<footer>` como landmark HTML separado del contenido principal. El `<footer>` NO DEBE estar dentro de `<main>`.

#### Escenario: Landmark presente en el DOM

- GIVEN una pagina renderizada del portafolio
- WHEN se inspecciona el DOM
- THEN existe un elemento `<footer>` fuera de `<main>`
- AND el `<footer>` es hermano del contenedor grid, ambos hijos del contenedor `max-w-6xl`

#### Escenario: Landmark detectable por lectores de pantalla

- GIVEN un usuario con lector de pantalla
- WHEN navega por landmarks
- THEN el `<footer>` aparece como landmark de contenido informativo

### Requisito: Contenido del footer

El sistema DEBE mostrar: copyright con ano dinamico, nombre del autor, ubicacion, un tagline de posicionamiento AI First, y enlaces a GitHub y email. Todo el contenido DEBE provenir de `siteConfig` o `sharedSocialLinks`.

#### Escenario: Copyright y ubicacion renderizados

- GIVEN `siteConfig.name = "Edwd3v"` y `siteConfig.identity.location = "Colombia"`
- WHEN se renderiza el footer
- THEN se muestra `© {anoActual} Edwd3v — Colombia`

#### Escenario: Tagline AI First localizado

- GIVEN un locale `es` con `footer.tagline = "Construyo con Python, datos e IA."`
- WHEN se renderiza el footer en espanol
- THEN se muestra el tagline en espanol
- AND el tagline es factual y corto, sin buzzwords promocionales

#### Escenario: Enlaces sociales desde config

- GIVEN `sharedSocialLinks` contiene `{ label: "GitHub", href: "https://github.com/Edwd3v" }`
- WHEN se renderiza el footer
- THEN se muestra un enlace a GitHub con `href` correcto
- AND se muestra un enlace mailto usando `siteConfig.email`

#### Escenario: LinkedIn ausente no bloquea

- GIVEN `sharedSocialLinks` no contiene entrada de LinkedIn
- WHEN se renderiza el footer
- THEN el footer se renderiza correctamente sin enlace de LinkedIn
- AND no se muestra placeholder ni enlace roto

### Requisito: Integracion en BaseLayout

El sistema DEBE insertar `<Footer />` en `BaseLayout.astro` despues del cierre del grid div, dentro del contenedor `max-w-6xl`.

#### Escenario: Posicion correcta en desktop

- GIVEN viewport desktop (>=768px)
- WHEN se renderiza la pagina
- THEN el footer aparece debajo del area del sidebar sticky
- AND el footer no compite visualmente con el sidebar

#### Escenario: Posicion correcta en mobile

- GIVEN viewport mobile (<768px) donde el sidebar esta oculto
- WHEN se renderiza la pagina
- THEN el footer es el unico elemento de cierre visible despues de la ultima seccion

### Requisito: Configuracion del footer

`site.ts` DEBE incluir un campo `footer.tagline` localizado (es/en) dentro de cada `siteConfig`. El tagline DEBE ser bilingue y derivado del posicionamiento existente.

#### Escenario: Tagline disponible en ambos locales

- GIVEN `localizedSite.es.siteConfig.footer.tagline` y `localizedSite.en.siteConfig.footer.tagline`
- WHEN se accede al campo footer
- THEN ambos locales tienen un valor string no vacio

### Requisito: Accesibilidad del footer

El bloque de enlaces sociales DEBE estar dentro de `<nav aria-label="...">` con label localizado. Todos los enlaces DEBEN tener focus visible consistente con el patron existente (`focus-visible:ring-2 focus-visible:ring-accent/70`).

#### Escenario: Nav con aria-label

- GIVEN el footer renderizado
- WHEN se inspecciona el DOM
- THEN los enlaces estan dentro de `<nav aria-label="Footer links">` (o equivalente localizado)

#### Escenario: Focus visible en enlaces

- GIVEN un usuario navegando con teclado
- WHEN el foco llega a un enlace del footer
- THEN se muestra ring de focus con color accent

### Requisito: Comportamiento responsive

El layout del footer DEBE ser columna en mobile y fila en `sm:` (>=640px), usando solo clases de Tailwind.

#### Escenario: Layout mobile

- GIVEN viewport < 640px
- WHEN se renderiza el footer
- THEN copyright/tagline y enlaces se apilan verticalmente

#### Escenario: Layout desktop

- GIVEN viewport >= 640px
- WHEN se renderiza el footer
- THEN copyright/tagline y enlaces estan en fila con `justify-between`

### Requisito: Sin JavaScript de cliente

El footer DEBE renderizarse como HTML puro sin directivas `client:*`, sin dependencias nuevas y sin CSS fuera de Tailwind.

#### Escenario: Cero JS anadido

- GIVEN el footer implementado
- WHEN se auditan scripts de cliente
- THEN no hay JavaScript de cliente nuevo atribuible al footer
