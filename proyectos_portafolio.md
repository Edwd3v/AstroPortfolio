# Portafolio de Proyectos de Desarrollo de Software

Este documento contiene la descripción detallada, estructurada y optimizada de proyectos técnicos enfocados en la automatización de procesos, análisis de datos y desarrollo web de aplicaciones robustas.

---

## 1. Automatización de Indicadores SISBEN

### 📋 Descripción
Solución backend desarrollada en Python diseñada para optimizar los procesos de extracción, transformación y carga (ETL) de datos operativos de solicitudes del SISBEN. El sistema unifica flujos de información dispersos en archivos CSV (solicitudes aprobadas, rechazadas, canceladas, pendientes, sincronizadas y envíos) para consolidar una base de datos maestra unificada. A partir de esta centralización, calcula métricas e indicadores de gestión por periodos de tiempo, facilitando la toma de decisiones estratégicas y la generación expedita de informes institucionales.

### 🛠️ Tecnologías y Herramientas
* **Lenguaje:** Python 3
* **Análisis y Procesamiento de Datos:** Pandas, CSV
* **Generación de Reportes y Plantillas:** OpenPyXL, Jinja2, Excel
* **Visualización de Datos:** Matplotlib
* **Control de Versiones:** Git / GitHub

### ⏱️ Detalles del Proyecto
* **Año:** 2025 *(Repositorio inicializado en diciembre de 2025; procesa datos históricos de los periodos 2022-2026)*
* **Estado:** Funcional / En evolución activa. Genera de forma automatizada tablas maestras, indicadores históricos y reportes parametrizados por bloques temporales (mensuales, trimestrales, semestrales y anuales).
* **Repositorio:** [GitHub - AutomatitationInfoSisben](https://github.com/Edwd3v/AutomatitationInfoSisben)
* **Demo:** Ejecución local del pipeline de datos a través de consola. Procesa los insumos CSV distribuidos y exporta dinámicamente los archivos `.xlsx` estilizados en el directorio de salidas (`outputs/`).

### 🚀 Impacto y Aprendizajes Clave
* **Optimización del Tiempo:** Transformación de un flujo de trabajo manual y propenso a errores en un pipeline reproducible que garantiza la trazabilidad e integridad de los datos.
* **Ingeniería de Datos Básica:** Implementación práctica de técnicas avanzadas de limpieza de datos, normalización de esquemas, manejo complejo de tipos temporales (fechas) y combinación eficiente de múltiples fuentes de información heterogéneas.
* **Reportabilidad Profesional:** Automatización del diseño y formateo de hojas de cálculo complejas para entregar tableros listos para auditorías de gestión directiva.

---

## 2. Dashboard Portafolio Trii

### 📋 Descripción
Plataforma web integral orientada a la gestión, visualización y análisis de portafolios de inversión en el mercado accionario y de renta variable colombiano (BVC). La aplicación proporciona un ecosistema auditable para que los inversionistas administren activos, registren movimientos operativos (compras, ventas, dividendos), controlen posiciones en tiempo real, sigan la valorización histórica de sus carteras y consuman analíticas avanzadas de rendimiento financiero mediante dashboards interactivos.

### 🛠️ Tecnologías y Herramientas
* **Arquitectura y Backend:** Django (Python), Celery
* **Base de Datos y Caché:** PostgreSQL, Redis
* **Frontend y UI/UX:** Django Templates, HTMX, Tailwind CSS, Chart.js
* **Generación de Documentos:** WeasyPrint (Exportación a PDF)

### ⏱️ Detalles del Proyecto
* **Año:** 2026
* **Estado:** En desarrollo activo (Etapa Beta). Cuenta con la arquitectura base completamente funcional: módulos de autenticación segura, control de acceso basado en roles (RBAC), importación de históricos de transacciones, integración con fuentes públicas para la sincronización de precios de mercado y algoritmos preliminares de valorización.
* **Repositorio:** Local / Privado *(Pendiente de publicación en GitHub)*
* **Demo:** Entorno de desarrollo local (`http://127.0.0.1:8000/`).

### 🚀 Impacto y Aprendizajes Clave
* **Modelado de Dominio Complejo:** Diseño e implementación de un esquema de base de datos relacional estricto para asegurar la consistencia del dinero, cálculos de precios promedio de compra, comisiones y utilidades netas.
* **Arquitectura de Software Moderna:** Adopción de HTMX para construir una interfaz reactiva y dinámica sin la sobrecarga cognitiva o técnica de un framework SPA pesado en JavaScript.
* **Procesamiento Asíncrono:** Uso estratégico de Celery y Redis para gestionar tareas en segundo plano como el web scraping de precios de activos o la actualización masiva de portafolios sin bloquear el hilo principal de la aplicación.

---

## 3. M4siv3m553 (Suite de Mensajería Automatizada)

### 📋 Descripción
Suite avanzada de automatización robótica de procesos (RPA) orientada a la preparación masiva de bases de datos y la orquestación del envío de notificaciones directas a través de WhatsApp Web. Diseñada específicamente para optimizar campañas de comunicación institucional, la herramienta segmenta y procesa tres flujos críticos de atención: casos en verificación técnica, ciudadanos sin encuesta registrada en el sistema de seguridad social, y población sin afiliación activa a entidades promotoras de salud (EPS). 

### 🛠️ Tecnologías y Herramientas
* **Lenguaje y Automatización Core:** Python 3, Selenium WebDriver
* **Entorno de Ejecución:** Google Chrome / ChromeDriver
* **Procesamiento y Estructuración de Datos:** Pandas, OpenPyXL, Tabulate, CSV / XLSX, Pathlib
* **Diagnóstico y Auxiliares:** Logging, PyAutoGUI, Requests, BeautifulSoup 4, Flask

### ⏱️ Detalles del Proyecto
* **Año:** 2026 *(Estabilización del núcleo operativo registrada en el historial de Git en abril de 2026; procesa insumos históricos de 2024 y 2025)*
* **Estado:** Funcional y en fase de mantenimiento preventivo. Los tres flujos principales (`CaseVerification`, `NoSISBEN` y `UninsuredEPS`) operan de manera autónoma compartiendo una arquitectura modular. La hoja de ruta incluye la optimización del control de estados por corrida para evitar reenvíos y la actualización adaptativa de selectores DOM.
* **Repositorio:** [GitHub - M4siv3ms553](https://github.com/Edwd3v/M4siv3ms553)
* **Demo:** Aplicación de consola ejecutable localmente mediante `python main.py`. Despliega un menú interactivo interactivo enfocado en la selección de campañas y requiere la vinculación manual y segura mediante código QR en la instancia automatizada del navegador.

### 🚀 Impacto y Aprendizajes Clave
* **Robustez frente a Interfaces Volátiles:** Desarrollo de estrategias defensivas en Selenium (esperas explícitas, manejo avanzado de excepciones y verificación de elementos dinámicos) para mitigar fallos por actualizaciones inesperadas en el frontend de WhatsApp Web.
* **Mitigación de Riesgos Críticos:** Implementación de lógica estricta de control de contexto conversacional para impedir el cruce de información sensible o el envío de datos de un ciudadano a chats incorrectos.
* **Arquitectura Modular Reutilizable:** Separación efectiva de la lógica de negocio (reglas de negocio de bases de datos de salud y SISBEN) de los controladores puros de automatización del navegador.
