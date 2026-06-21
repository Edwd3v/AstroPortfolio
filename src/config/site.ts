export type Locale = "es" | "en";

export type SocialLink = {
  label: "GitHub" | "LinkedIn";
  href: string;
};

export const defaultLocale: Locale = "es";

const linkedInUrl = "https://www.linkedin.com/in/edward-torres-b12b5b417/";

const sharedSocialLinks: ReadonlyArray<SocialLink> = (() => {
  const links: SocialLink[] = [{ label: "GitHub", href: "https://github.com/Edwd3v" }];

  if (linkedInUrl) {
    links.push({ label: "LinkedIn", href: linkedInUrl });
  }

  return links;
})();

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
          "Transformo procesos manuales en herramientas claras, útiles y medibles.",
        summary:
          "Trabajo sobre necesidades concretas: automatizar tareas, ordenar datos y convertir operación manual en software que se pueda usar y medir.",
      },
      projects: {
        title: "Proyectos",
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
        principles: [
          {
            icon: "target",
            label: "Problema primero",
            text: "Defino necesidad, usuario y resultado esperado antes de elegir herramientas.",
          },
          {
            icon: "checklist",
            label: "Estructura verificable",
            text: "Busco sistemas con documentación, criterios claros y una forma concreta de validarlos.",
          },
          {
            icon: "spark",
            label: "IA con criterio",
            text: "Uso IA para acelerar y revisar, sin soltar el criterio sobre decisiones técnicas.",
          },
        ],
      },
      contact: {
        title: "Contacto",
        cta:
          "Si necesitás automatizar tareas, ordenar datos o convertir un proceso manual en software útil, escribime.",
        copyEmailLabel: "Copiar correo",
        copiedEmailLabel: "Copiado",
        githubLabel: "Abrir GitHub",
        linkedInLabel: "Abrir LinkedIn",
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
          "I turn manual processes into clear, useful, measurable tools.",
        summary:
          "I work on concrete needs: automate tasks, organize data, and turn manual operations into software people can use and measure.",
      },
      projects: {
        title: "Projects",
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
        principles: [
          {
            icon: "target",
            label: "Problem first",
            text: "I define the need, user, and expected outcome before choosing tools.",
          },
          {
            icon: "checklist",
            label: "Verifiable structure",
            text: "I aim for systems with documentation, clear criteria, and a concrete way to validate them.",
          },
          {
            icon: "spark",
            label: "AI with judgment",
            text: "I use AI to accelerate and review without giving up ownership of technical decisions.",
          },
        ],
      },
      contact: {
        title: "Contact",
        cta:
          "If you need to automate tasks, organize data, or turn a manual process into useful software, write to me.",
        copyEmailLabel: "Copy email",
        copiedEmailLabel: "Copied",
        githubLabel: "Open GitHub",
        linkedInLabel: "Open LinkedIn",
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
