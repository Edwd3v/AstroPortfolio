export type Project = {
  title: string;
  description: string;
  tech: string[];
  status?: string;
  kind?: string;
  year?: string;
  featured?: boolean;
  outcome?: string;
  href?: string;
  repository?: string;
  links?: {
    label: string;
    href: string;
  }[];
};

export type ProjectLocale = "es" | "en";

export const localizedProjects: Record<ProjectLocale, Project[]> = {
  es: [
    {
      title: "Automatización de Indicadores SISBEN",
      description:
        "Pipeline backend en Python para consolidar archivos CSV operativos, normalizar datos históricos y generar indicadores de gestión en reportes Excel listos para revisión institucional.",
      tech: ["Python", "Pandas", "OpenPyXL", "Jinja2", "Matplotlib", "Excel"],
      status: "Funcional / En evolución",
      kind: "ETL y reportabilidad",
      year: "2025",
      featured: true,
      outcome:
        "Transformó un flujo manual de consolidación en un proceso reproducible con trazabilidad, limpieza de datos y generación parametrizada de reportes.",
    },
    {
      title: "Dashboard Portafolio Trii",
      description:
        "Aplicación web en Django para administrar portafolios de inversión, registrar movimientos, controlar posiciones y visualizar analíticas de rendimiento financiero.",
      tech: ["Django", "PostgreSQL", "Redis", "Celery", "HTMX", "Tailwind CSS", "Chart.js"],
      status: "Beta / Desarrollo activo",
      kind: "Aplicación web financiera",
      year: "2026",
      featured: true,
      outcome:
        "Permitió modelar un dominio financiero con transacciones, valorización, roles de acceso y tareas asíncronas para sincronización de información.",
    },
    {
      title: "M4siv3m553",
      description:
        "Suite RPA en Python para preparar bases de datos y automatizar flujos de comunicación institucional mediante campañas controladas desde consola.",
      tech: ["Python", "Selenium", "Pandas", "OpenPyXL", "PyAutoGUI", "Flask", "BeautifulSoup"],
      status: "Funcional / Mantenimiento",
      kind: "RPA y automatización operativa",
      year: "2026",
      featured: true,
      outcome:
        "Separó reglas de negocio, procesamiento de datos y automatización del navegador para operar flujos repetitivos con mayor control y menor riesgo operativo.",
    },
  ],
  en: [
    {
      title: "SISBEN Indicators Automation",
      description:
        "Python backend pipeline that consolidates operational CSV files, normalizes historical data, and generates management indicators in Excel reports ready for institutional review.",
      tech: ["Python", "Pandas", "OpenPyXL", "Jinja2", "Matplotlib", "Excel"],
      status: "Functional / Evolving",
      kind: "ETL and reporting",
      year: "2025",
      featured: true,
      outcome:
        "Turned a manual consolidation workflow into a reproducible process with traceability, data cleaning, and parameterized report generation.",
    },
    {
      title: "Trii Portfolio Dashboard",
      description:
        "Django web application for managing investment portfolios, recording transactions, tracking positions, and visualizing financial performance analytics.",
      tech: ["Django", "PostgreSQL", "Redis", "Celery", "HTMX", "Tailwind CSS", "Chart.js"],
      status: "Beta / Active development",
      kind: "Financial web application",
      year: "2026",
      featured: true,
      outcome:
        "Helped model a financial domain with transactions, valuation, access roles, and asynchronous tasks for information synchronization.",
    },
    {
      title: "M4siv3m553",
      description:
        "Python RPA suite for preparing datasets and automating institutional communication workflows through controlled console-based campaigns.",
      tech: ["Python", "Selenium", "Pandas", "OpenPyXL", "PyAutoGUI", "Flask", "BeautifulSoup"],
      status: "Functional / Maintenance",
      kind: "RPA and workflow automation",
      year: "2026",
      featured: true,
      outcome:
        "Separated business rules, data processing, and browser automation to run repetitive workflows with stronger control and lower operational risk.",
    },
  ],
};

export const projects = localizedProjects.es;
