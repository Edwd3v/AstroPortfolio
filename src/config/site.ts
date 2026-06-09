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
    "Disponible para proyectos de entrada, colaboraciones tecnológicas, aprendizaje en equipos reales y oportunidades iniciales relacionadas con desarrollo de software, Python, datos, automatización e IA aplicada.",
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
      "Soy estudiante de Ingeniería de Software. Me enfoco en convertir ideas técnicas en proyectos prácticos: aplicaciones, automatizaciones, consultas a bases de datos y flujos de trabajo reproducibles desde Linux, terminal, Git y GitHub.",
    focus: [
      "Python para desarrollo de aplicaciones, automatización y análisis de datos.",
      "Bases de datos, MySQL y organización de información para soluciones prácticas.",
      "Uso de herramientas de IA para acelerar prototipado, depuración, documentación y aprendizaje técnico.",
    ],
  },
  contact: {
    lead:
      "Me interesa participar en equipos y proyectos donde pueda aportar con Python, datos, automatización y herramientas de IA mientras aprendo de problemas técnicos reales.",
  },
} as const;
