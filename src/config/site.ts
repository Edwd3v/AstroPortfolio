export type Locale = "es" | "en";

export const defaultLocale: Locale = "es";

const sharedSocialLinks = [
  { label: "GitHub", href: "https://github.com/Edwd3v" },
] as const;

export const localizedSite = {
  es: {
    navItems: [
      { href: "#projects", label: "Proyectos" },
      { href: "#about", label: "Sobre mí" },
      { href: "#contact", label: "Contacto" },
    ],
    socialLinks: sharedSocialLinks,
    labels: {
      skipToContent: "Saltar al contenido",
      goHome: "Ir al inicio de Edwd3v",
      mainNavigation: "Navegación principal",
      sectionsNavigation: "Secciones",
      currentLanguage: "Español",
      alternateLanguage: "English",
      alternateLanguagePending: "Inglés pendiente de implementación",
    },
    siteConfig: {
      name: "Edwd3v",
      role: "Software Engineering",
      title: "Edwd3v | Software Engineering Student",
      description:
        "Portafolio de Edwd3v, estudiante de Ingeniería de Software enfocado en Python, datos, automatización y desarrollo asistido por IA.",
      locale: "es_CO",
      htmlLang: "es",
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
      projects: {
        title: "Proyectos",
        intro:
          "Una selección en construcción de proyectos que reflejen trabajo real con software, Python, datos, automatización e IA aplicada.",
        emptyStatus: "En preparación",
        emptyText:
          "Estoy seleccionando proyectos reales que representen mejor mi enfoque técnico. Esta sección quedará lista para publicarlos sin cambiar la estructura del sitio.",
      },
      about: {
        title: "Sobre mí",
        heading:
          "Aprendo construyendo software con Python, datos y herramientas de IA.",
        intro:
          "Soy estudiante de Ingeniería de Software. Me enfoco en convertir ideas técnicas en proyectos prácticos: aplicaciones, automatizaciones, consultas a bases de datos y flujos de trabajo reproducibles desde Linux, terminal, Git y GitHub.",
        focus: [
          "Python para desarrollo de aplicaciones, automatización y análisis de datos.",
          "Bases de datos, MySQL y organización de información para soluciones prácticas.",
          "Uso de herramientas de IA para acelerar prototipado, depuración, documentación y aprendizaje técnico.",
        ],
      },
      contact: {
        title: "Contacto",
        heading:
          "Abierto a proyectos de entrada, aprendizaje y colaboración técnica.",
        lead:
          "Me interesa participar en equipos y proyectos donde pueda aportar con Python, datos, automatización y herramientas de IA mientras aprendo de problemas técnicos reales.",
      },
    },
  },
  en: {
    navItems: [
      { href: "#projects", label: "Projects" },
      { href: "#about", label: "About" },
      { href: "#contact", label: "Contact" },
    ],
    socialLinks: sharedSocialLinks,
    labels: {
      skipToContent: "Skip to content",
      goHome: "Go to Edwd3v home",
      mainNavigation: "Main navigation",
      sectionsNavigation: "Sections",
      currentLanguage: "English",
      alternateLanguage: "Español",
      alternateLanguagePending: "Spanish version",
    },
    siteConfig: {
      name: "Edwd3v",
      role: "Software Engineering",
      title: "Edwd3v | Software Engineering Student",
      description:
        "Portfolio of Edwd3v, a Software Engineering student focused on Python, data, automation, and AI-assisted development.",
      locale: "en_US",
      htmlLang: "en",
      siteUrl: "" as string,
      email: "edwd3v@gmail.com",
      availability:
        "Available for entry-level projects, technical collaboration, learning in real teams, and early opportunities related to software development, Python, data, automation, and applied AI.",
      identity: {
        shortName: "Edwd3v",
        fullName: "Edwd3v",
        role: "Software Engineering Student | Python, Data & AI-Assisted Development",
        location: "Colombia",
        focus: [
          "Python applied to software, data, and automation",
          "AI-assisted development",
          "Databases, Linux, terminal workflows, and Git/GitHub",
        ],
      },
      seo: {
        defaultTitle: "Edwd3v | Software Engineering Student",
        titleTemplate: "%s | Edwd3v",
        ogImage: "/og-cover.jpg",
      },
      cta: {
        primary: {
          label: "View focus",
          href: "#about",
        },
        secondary: {
          label: "Contact",
          href: "#contact",
        },
      },
      hero: {
        eyebrow: "Python, data, and applied AI",
        headline:
          "I build software projects with Python, data, automation, and applied AI.",
        summary:
          "I am a Software Engineering student focused on building applications, automations, and reproducible technical workflows using Linux, the terminal, Git, and AI-assisted development tools.",
      },
      projects: {
        title: "Projects",
        intro:
          "A work-in-progress selection of projects that reflect hands-on work with software, Python, data, automation, and applied AI.",
        emptyStatus: "In progress",
        emptyText:
          "I am selecting real projects that best represent my technical focus. This section is ready to publish them without changing the site structure.",
      },
      about: {
        title: "About",
        heading:
          "I learn by building software with Python, data, and AI tools.",
        intro:
          "I am a Software Engineering student. I focus on turning technical ideas into practical projects: applications, automations, database queries, and reproducible workflows using Linux, the terminal, Git, and GitHub.",
        focus: [
          "Python for application development, automation, and data analysis.",
          "Databases, MySQL, and information organization for practical solutions.",
          "AI tools for faster prototyping, debugging, documentation, and technical learning.",
        ],
      },
      contact: {
        title: "Contact",
        heading:
          "Open to entry-level projects, learning, and technical collaboration.",
        lead:
          "I am interested in joining teams and projects where I can contribute with Python, data, automation, and AI tools while learning from real technical problems.",
      },
    },
  },
} as const;

export type SiteContent = (typeof localizedSite)[Locale];
export type SiteConfig = SiteContent["siteConfig"];

export const navItems = localizedSite[defaultLocale].navItems;
export const socialLinks = localizedSite[defaultLocale].socialLinks;
export const siteConfig = localizedSite[defaultLocale].siteConfig;
