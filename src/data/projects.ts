export type Project = {
  title: string;
  description: string;
  problem?: string;
  solution?: string;
  result?: string;
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
      title: "Mensajes Masivos por WhatsApp",
      description:
        "Automatización en Python para enviar mensajes por WhatsApp Web y filtrar contactos según la necesidad operativa.",
      problem:
        "Había que contactar cerca de 400 personas para depurar errores del SISBÉN sin presupuesto para una plataforma paga ni tiempo para llamadas individuales.",
      solution:
        "Construí una automatización sobre WhatsApp Web que envía a números específicos, incluso sin guardar contacto, y filtra por tipo de verificación, vereda o grupo SISBÉN.",
      result:
        "Ahorra trabajo manual y sigue ayudando casi cada semana a mover la depuración de datos, aunque requiere mantenimiento cuando cambia WhatsApp Web.",
      tech: ["Python", "Selenium", "PyAutoGUI", "Pandas", "OpenPyXL", "Flask", "BeautifulSoup"],
      status: "Funcional / Mantenimiento",
      kind: "RPA y automatización operativa",
      year: "2026",
      featured: true,
      outcome:
        "Centraliza la preparación de datos y la ejecución asistida de campañas.",
    },
    {
      title: "Automatización de Indicadores SISBEN",
      description:
        "Scripts en Python para convertir históricos de solicitudes en indicadores útiles para seguimiento mensual.",
      problem:
        "La aplicación oficial del DNP administraba solicitudes, pero no mostraba tiempos de respuesta, pendientes, rechazos ni evolución de gestión.",
      solution:
        "Procesé los datos históricos con scripts en Python para medir tiempos por etapa, detectar causas de rechazo y ordenar el seguimiento operativo.",
      result:
        "Ayudó a monitorear mejor los pendientes mensuales y a sostener un control más claro y preciso del proceso sin depender solo de revisión manual.",
      tech: ["Python", "Pandas", "OpenPyXL", "Jinja2", "Matplotlib", "Excel"],
      status: "Funcional / En evolución",
      kind: "ETL y reportabilidad",
      year: "2025",
      featured: true,
      outcome:
        "Reduce trabajo manual y deja el proceso más trazable.",
    },
    {
      title: "Dashboard Portafolio Inversion",
      description:
        "Dashboard en Django para reemplazar control manual en Excel por una vista segmentada del portafolio compartido.",
      problem:
        "La app del bróker no segmentaba la información como se necesitaba y llevar movimientos, precios, dividendos y participaciones en Excel ya era ineficiente.",
      solution:
        "Estoy construyendo un dashboard en Django donde cada participante ve solo su parte, mientras el sistema organiza movimientos, usuarios y lectura de extractos PDF.",
      result:
        "Sigue en construcción, pero ya orienta el paso desde control manual disperso hacia una plataforma más clara para revisar información y validar cuentas.",
      tech: ["Django", "PostgreSQL", "HTMX", "Tailwind CSS", "Celery", "Redis", "Chart.js"],
      status: "Beta / Desarrollo activo",
      kind: "Aplicación web financiera",
      year: "2026",
      featured: true,
      outcome:
        "Organiza la información financiera para análisis interno.",
    },
  ],
  en: [
    {
      title: "Mensajes Masivos por WhatsApp",
      description:
        "Python automation for sending WhatsApp Web messages and filtering contacts by the operational need.",
      problem:
        "I needed to contact around 400 people to clean SISBÉN data errors without budget for a paid platform or time for one-by-one calls.",
      solution:
        "I built a WhatsApp Web automation that sends to specific numbers, even unsaved ones, and filters lists by verification type, rural area, or SISBÉN group.",
      result:
        "It saves manual work and still helps almost every week to move data cleanup forward, although it needs maintenance when WhatsApp Web changes.",
      tech: ["Python", "Selenium", "PyAutoGUI", "Pandas", "OpenPyXL", "Flask", "BeautifulSoup"],
      status: "Functional / Maintenance",
      kind: "RPA and workflow automation",
      year: "2026",
      featured: true,
      outcome:
        "Centralizes data preparation and assisted campaign execution.",
    },
    {
      title: "SISBEN Indicators Automation",
      description:
        "Python scripts that turn request history into useful indicators for monthly operational follow-up.",
      problem:
        "The official DNP application managed requests, but it did not show response times, pending work, rejections, or process evolution.",
      solution:
        "I processed historical request data with Python scripts to measure stage-by-stage times, surface rejection causes, and organize operational follow-up.",
      result:
        "It helped monitor monthly pending work more clearly and sustain tighter control without relying only on manual review.",
      tech: ["Python", "Pandas", "OpenPyXL", "Jinja2", "Matplotlib", "Excel"],
      status: "Functional / Evolving",
      kind: "ETL and reporting",
      year: "2025",
      featured: true,
      outcome:
        "Reduces manual work and makes the process easier to trace.",
    },
    {
      title: "Dashboard Portafolio Inversion",
      description:
        "Django dashboard to replace manual Excel tracking with a segmented view of a shared investment portfolio.",
      problem:
        "The broker app did not segment information the needed way, and tracking prices, movements, dividends, and ownership in Excel had become inefficient.",
      solution:
        "I am building a Django dashboard where each participant logs in to see only their own data while the system organizes movements, users, and PDF statement parsing.",
      result:
        "It is still under construction, but it is already shaping the move from scattered manual control to a clearer platform for reviewing information and validating accounts.",
      tech: ["Django", "PostgreSQL", "HTMX", "Tailwind CSS", "Celery", "Redis", "Chart.js"],
      status: "Beta / Active development",
      kind: "Financial web application",
      year: "2026",
      featured: true,
      outcome:
        "Organizes financial information for internal analysis.",
    },
  ],
};

export const projects = localizedProjects.es;
