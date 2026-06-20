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
      role: "Ingeniero de Software",
      title: "Edwd3v | Software Engineering",
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
        defaultTitle: "Edwd3v | Software Engineering",
        titleTemplate: "%s | Edwd3v",
        ogImage: "",
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
        eyebrow: "Software para problemas reales",
        headline:
          "No construyo demos: construyo herramientas para reducir trabajo manual, ordenar datos y tomar mejores decisiones.",
        summary:
          "Mis proyectos nacen de necesidades concretas: contactar cientos de personas, medir indicadores que una plataforma no muestra o reemplazar controles manuales en Excel por sistemas más claros.",
      },
      projects: {
        title: "Proyectos",
        intro:
          "Una selección de proyectos reales enfocados en software, Python, datos, automatización e IA aplicada.",
        emptyStatus: "En preparación",
        emptyText:
          "Estoy seleccionando proyectos reales que representen mejor mi enfoque técnico. Esta sección quedará lista para publicarlos sin cambiar la estructura del sitio.",
      },
      about: {
        title: "Sobre mí",
        heading:
          "Construir criterio antes que acumular herramientas.",
        intro:
          "No me interesa acumular herramientas por moda. Me interesa construir criterio: entender qué problema vale la pena resolver, diseñar una solución clara y poder defender cada decisión técnica con evidencia.",
        focus: [
          "Pienso primero en el problema, el usuario y el resultado esperado antes de elegir herramientas.",
          "Busco que cada proyecto tenga estructura, documentación y una forma clara de validarse.",
          "Uso IA como apoyo para aprender, revisar y acelerar, manteniendo criterio propio sobre las decisiones técnicas.",
        ],
      },
      contact: {
        title: "Contacto",
        heading:
          "Abierto a proyectos de entrada, aprendizaje y colaboración técnica.",
        lead:
          "Me interesa participar en equipos y proyectos donde pueda aportar con Python, datos, automatización y herramientas de IA mientras aprendo de problemas técnicos reales.",
      },
      footer: {
        tagline: "Construyo con Python, datos e IA.",
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
      role: "Software Engineer",
      title: "Edwd3v | Software Engineering",
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
        defaultTitle: "Edwd3v | Software Engineering",
        titleTemplate: "%s | Edwd3v",
        ogImage: "",
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
        eyebrow: "Software for real problems",
        headline:
          "I do not build demos: I build tools to reduce manual work, organize data, and support better decisions.",
        summary:
          "My projects come from concrete needs: contacting hundreds of people, measuring indicators a platform does not show, or replacing manual Excel tracking with clearer systems.",
      },
      projects: {
        title: "Projects",
        intro:
          "A selection of real projects focused on software, Python, data, automation, and applied AI.",
        emptyStatus: "In progress",
        emptyText:
          "I am selecting real projects that best represent my technical focus. This section is ready to publish them without changing the site structure.",
      },
      about: {
        title: "About",
        heading:
          "Build judgment before collecting tools.",
        intro:
          "I am not interested in collecting tools because they are trending. I care about building technical judgment: understanding which problems are worth solving, designing clear solutions, and defending each technical decision with evidence.",
        focus: [
          "I think first about the problem, the user, and the expected outcome before choosing tools.",
          "I want each project to have structure, documentation, and a clear way to validate it.",
          "I use AI as support for learning, reviewing, and accelerating work while keeping ownership of technical decisions.",
        ],
      },
      contact: {
        title: "Contact",
        heading:
          "Open to entry-level projects, learning, and technical collaboration.",
        lead:
          "I am interested in joining teams and projects where I can contribute with Python, data, automation, and AI tools while learning from real technical problems.",
      },
      footer: {
        tagline: "Built with Python, data, and AI.",
      },
    },
  },
} as const;

export type SiteContent = (typeof localizedSite)[Locale];
export type SiteConfig = SiteContent["siteConfig"];

export const navItems = localizedSite[defaultLocale].navItems;
export const socialLinks = localizedSite[defaultLocale].socialLinks;
export const siteConfig = localizedSite[defaultLocale].siteConfig;
