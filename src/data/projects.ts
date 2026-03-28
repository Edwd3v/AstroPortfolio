export type Project = {
  title: string;
  description: string;
  href?: string;
  tech: string[];
  status?: string;
  kind?: string;
  year?: string;
  featured?: boolean;
  outcome?: string;
  repository?: string;
  links?: {
    label: string;
    href: string;
  }[];
};

export const projects: Project[] = [
  {
    title: "Landing de conversión para SaaS B2B",
    description:
      "Sitio de marketing orientado a captación con arquitectura por secciones, carga inicial optimizada y una base de SEO técnico preparada para campañas y contenido comercial.",
    tech: ["Astro", "Tailwind CSS", "SEO"],
    status: "Publicado",
    kind: "Marketing site",
    year: "2025",
    featured: true,
    outcome: "Mejoró la claridad del mensaje, la velocidad de carga y la escalabilidad del contenido de venta.",
  },
  {
    title: "Portal de documentación técnica",
    description:
      "Sitio estático para documentación interna y pública con estructura reutilizable, navegación clara y componentes preparados para escalar contenido técnico.",
    tech: ["Astro", "TypeScript", "Accesibilidad"],
    status: "En mantenimiento",
    kind: "Documentación",
    year: "2024",
    featured: true,
    outcome: "Redujo fricción para onboarding y centralizó conocimiento técnico en una base navegable.",
  },
  {
    title: "Portafolio editorial para marca personal",
    description:
      "Sitio one-page con foco en posicionamiento profesional, claridad de servicios y una presencia visual sobria adaptada a desktop y mobile.",
    tech: ["Astro", "Tailwind CSS", "Contenido estructurado"],
    status: "Publicado",
    kind: "Portafolio",
    year: "2024",
    featured: false,
    outcome: "Consolidó la identidad digital del proyecto y simplificó la actualización de contenido.",
  },
];
