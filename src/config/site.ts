export const navItems = [
  { href: "#projects", label: "Proyectos" },
  { href: "#about", label: "Sobre mí" },
  { href: "#contact", label: "Contacto" },
] as const;

export const socialLinks = [
  { label: "GitHub", href: "https://github.com/tuusuario" },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/tuusuario/" },
] as const;

export const siteConfig = {
  name: "Nombre Apellido",
  role: "Desarrollador Frontend",
  title: "Nombre Apellido | Desarrollador Frontend",
  description:
    "Portafolio frontend enfocado en interfaces rápidas, accesibles y mantenibles construidas con Astro y una base técnica clara.",
  locale: "es_CO",
  siteUrl: "https://tudominio.com",
  email: "contacto@tudominio.com",
  availability: "Disponible para proyectos freelance, colaboraciones remotas y trabajo por objetivos.",
  identity: {
    shortName: "Nombre",
    fullName: "Nombre Apellido",
    role: "Desarrollador Frontend",
    location: "Colombia",
    focus: [
      "Astro y sitios estáticos de alto rendimiento",
      "Sistemas de diseño ligeros",
      "Accesibilidad, performance y SEO técnico",
    ],
  },
  seo: {
    defaultTitle: "Nombre Apellido | Desarrollador Frontend",
    titleTemplate: "%s | Nombre Apellido",
    ogImage: "/og-cover.jpg",
  },
  cta: {
    primary: {
      label: "Ver proyectos",
      href: "#projects",
    },
    secondary: {
      label: "Sobre mí",
      href: "#about",
    },
  },
  hero: {
    eyebrow: "Desarrollo Frontend",
    headline:
      "Diseño y construyo interfaces rápidas, accesibles y listas para producción.",
    summary:
      "Trabajo en sitios y productos web donde importan la claridad visual, el rendimiento, la mantenibilidad y una implementación sólida desde la primera versión.",
  },
  about: {
    intro:
      "Trabajo en la intersección entre diseño y desarrollo para convertir objetivos de negocio en interfaces claras, veloces y confiables.",
    focus: [
      "Arquitectura de componentes y sistemas de diseño ligeros.",
      "Mejoras de performance, accesibilidad y SEO técnico.",
      "Implementación de experiencias estáticas y escalables con Astro.",
    ],
  },
  contact: {
    lead:
      "Si tienes una landing, portafolio o producto web que necesita una capa frontend más sólida, podemos hablar.",
  },
} as const;
