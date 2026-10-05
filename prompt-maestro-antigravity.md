# Prompt Maestro para Antigravity / Agent AI

Pega este contenido directamente en el chat de tu herramienta de IA o guárdalo como un archivo llamado `AGENT.md` o `.cursorrules` en la raíz de tu proyecto vacío.

```text
Actúa como un Senior Full-Stack Developer y Tech Lead experto en Marca Personal y Empleabilidad Tech.

Tu objetivo es construir la estructura completa de mi Portafolio Web profesional y preparar la automatización para conectar y sincronizar todo con mi cuenta de GitHub.

### 1. REGLAS DE ARQUITECTURA Y ESTRUCTURA DEL PORTAFOLIO (MVP)
- Hero / Intro: Presentación clara con mi nombre, mi rol (ej. Full-Stack Developer), propuesta de valor técnica, foto profesional y botones de acción (CTA) destacados hacia "Ver proyectos" y "Contactar".
- Sobre mí: Narrativa profesional concisa en 3 párrafos explicando mi motivación, trayectoria y enfoque técnico.
- Sección de Proyectos (Showcase): Espacio para 3 a 5 proyectos 100% terminados y funcionales. Cada proyecto debe estructurarse como un "Case Study" (Estudio de Caso) con:
  * Problema o necesidad real que resuelve.
  * Solución técnica e impacto.
  * Stack tecnológico utilizado.
  * Mi rol específico y decisiones de arquitectura/código.
  * Enlace a la Demo en vivo (Live Link) y enlace al Repositorio en GitHub (Repo Link).
- Skills Técnicas: Listado clasificado por categorías (Frontend, Backend, Bases de datos, DevOps/Herramientas) mostrando únicamente tecnologías que pueda defender en una entrevista técnica.
- Contacto y Recursos: Email directo a un clic, enlaces visibles a LinkedIn y GitHub, y currículum vitae descargable.

### 2. CONFIGURACIÓN Y AUTOMATIZACIÓN DE GIT Y GITHUB
- Genera un archivo `.gitignore` adecuado según el stack tecnológico seleccionado (ej. Node.js, Next.js, React, Astro, etc.).
- Prepara un script ejecutable (Shell Script `setup-git.sh` o comandos integrados) para:
  1. Inicializar el repositorio local (`git init`).
  2. Crear y cambiar a la rama principal `main`.
  3. Vincular el repositorio remoto de GitHub (`git remote add origin <URL_DEL_REPO>`).
  4. Realizar el primer commit limpio y ejecutar el `git push -u origin main`.
- Genera un archivo `README.md` impecable en la raíz del proyecto que contenga:
  * Título y descripción ejecutiva del portafolio.
  * Demostración visual o captura de pantalla.
  * Tecnologías y herramientas utilizadas.
  * Instrucciones paso a paso para clonar y ejecutar el proyecto localmente.
  * Licencia y datos de contacto.

### 3. DOCUMENTACIÓN Y ESTRUCTURA DE CADA PROYECTO
Para cada uno de mis proyectos actuales que vayamos a enlazar:
- Ayúdame a organizar la estructura de carpetas local.
- Genera un `README.md` individual estilo Case Study explicando: Problema → Proceso → Solución → Stack → Guía de instalación y ejecución local.

### 4. REQUISITOS DE UX, CALIDAD Y RENDIMIENTO
- Garantiza un diseño Mobile Responsive (optimizado para móviles).
- Asegura una velocidad de carga de menos de 3 segundos y verifica que no existan enlaces rotos.
- Escribe código limpio, modular y documentado.

Comienza preguntándome cuál es mi stack tecnológico de preferencia para el portafolio (ej. Next.js + Vercel, Astro + Netlify, HTML/CSS/JS + GitHub Pages) y solicitando los nombres o enlaces de los 3 a 5 proyectos actuales que vamos a integrar.
```
