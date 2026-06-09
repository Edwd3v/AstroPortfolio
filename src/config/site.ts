export const navItems = [
  { href: "#projects", label: "Proyectos" },
  { href: "#about", label: "Sobre mí" },
  { href: "#contact", label: "Contacto" },
] as const;

export const socialLinks = [
  { label: "GitHub", href: "https://github.com/Edwd3v" },
] as const;

export const siteConfig = {
  name: "Edwd3v",
  role: "Software Engineering Student",
  title: "Edwd3v | Software Engineering Student",
  description:
    "Portafolio de Edwd3v, estudiante de Ingeniería de Software enfocado en Python, datos, automatización y desarrollo asistido por IA.",
  locale: "es_CO",
  siteUrl: "" as string,
  email: "edwd3v@gmail.com",
  availability:
    "Disponible para prácticas, proyectos junior, colaboraciones tecnológicas y oportunidades de entrada relacionadas con desarrollo de software, Python, datos, automatización e inteligencia artificial aplicada.",
  identity: {
    shortName: "Edwd3v",
    fullName: "Edwd3v",
    role: "Software Engineering Student | Python, Data & AI-Assisted Development",
    location: "Colombia",
    focus: [
      "Python aplicado a software, datos y automatización",
      "Desarrollo asistido por inteligencia artificial",
      "Bases de datos, Linux, terminal y flujos con Git/GitHub",
    ],
  },
  seo: {
    defaultTitle: "Edwd3v | Software Engineering Student",
    titleTemplate: "%s | Edwd3v",
    ogImage: "/og-cover.jpg",
  },
  cta: {
    primary: {
      label: "Ver enfoque",
      href: "#about",
    },
    secondary: {
      label: "Contacto",
      href: "#contact",
    },
  },
  hero: {
    eyebrow: "Python, datos e IA aplicada",
    headline:
      "Desarrollo proyectos de software con Python, datos, automatización e IA aplicada.",
    summary:
      "Soy estudiante de Ingeniería de Software enfocado en crear aplicaciones, automatizaciones y flujos técnicos reproducibles desde entornos Linux, terminal, Git y herramientas de desarrollo asistido por IA.",
  },
  about: {
    intro:
      "Trabajo principalmente desde entornos Linux y terminal, usando Git, GitHub y Codex para prototipar, depurar, documentar y mejorar proyectos de software. También exploro Astro para construir interfaces y sitios modernos cuando el proyecto lo requiere.",
    focus: [
      "Python aplicado a desarrollo de software, automatización y análisis de datos.",
      "Bases de datos, MySQL, terminal, Linux y flujos técnicos reproducibles.",
      "Integración de herramientas de IA en procesos de desarrollo y aprendizaje.",
    ],
  },
  contact: {
    lead:
      "Busco prácticas, roles junior y proyectos de entrada donde pueda aportar en la construcción de soluciones útiles mientras fortalezco mi criterio técnico en proyectos reales.",
  },
} as const;
