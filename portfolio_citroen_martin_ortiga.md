# 🚗 Ficha de Proyecto — Portafolio Profesional

---

## 1. Nombre del proyecto

**Citroën Martin Ortiga — Sitio Web & Plataforma de Catálogo**

> Rediseño completo del sitio web de un negocio familiar argentino dedicado a repuestos de Citroën clásicos, con 60+ años de historia.

---

## 2. Problema que resuelve

Martín Ortiga tenía un negocio familiar de repuestos para Citroën clásicos con más de 60 años de historia pero **sin presencia digital profesional**. Los clientes no podían ver el catálogo, no había forma de consultar stock, y los pedidos llegaban por teléfono sin ningún sistema de seguimiento. El negocio perdía ventas — incluso internacionales — por no tener un canal digital a la altura del producto.

---

## 3. Solución e impacto

Se diseñó y desarrolló **de cero** un sitio web completo con catálogo interactivo conectado a una base de datos real. Los clientes pueden:
- Explorar todos los repuestos con filtros por modelo, categoría y condición
- Ver fotos con fondo removido y marca de agua profesional
- Armar un carrito y enviar la consulta directo por WhatsApp con el detalle del pedido

**Impacto concreto:**
- Pasó de **cero presencia digital** a un sitio con SEO técnico completo indexado en Google
- Los pedidos internacionales ahora tienen un formulario dedicado (exportación a varios países de Latinoamérica y Europa)
- Martín recibe las consultas formateadas automáticamente por WhatsApp, sin tener que repreguntar qué producto quiere el cliente
- El pipeline de subida de productos (foto → remoción de fondo → watermark → BD) pasó de ser **manual y caótico** a un sistema semi-automático con panel web interno

---

## 4. Stack tecnológico

| Capa | Tecnología |
|---|---|
| Frontend | HTML5 + CSS3 + JavaScript Vanilla (ES6+) |
| Framework CSS | Tailwind CSS v3 (compilado localmente) |
| Reactividad | Alpine.js v3 (menú móvil, carrito reactivo) |
| Base de datos | Supabase (PostgreSQL) — catálogo + storage de imágenes y manuales |
| Animaciones | GSAP + ScrollTrigger |
| Checkout | WhatsApp API (formato automático del carrito) |
| Registro de pedidos | Google Apps Script → Google Sheets |
| Hosting / CI-CD | Netlify (deploy automático en cada `git push`) |
| Pipeline de imágenes | Python (rembg / BiRefNet), Sharp (Node.js), watermark SVG, WebP |
| Panel admin | Express.js (servidor local) + Node.js |
| QA de productos | Python / Tkinter (comparador de Excel antes del upload) |
| SEO | Meta tags, Open Graph, Twitter Card, sitemap.xml, robots.txt |

---

## 5. Mi rol

**Desarrollador full-stack + Arquitecto de solución.** Tomé todas las decisiones técnicas y de diseño del proyecto:

- Definí la arquitectura del sitio: HTML multi-página estático (sin framework SPA) + Supabase como backend serverless, para mantener el costo de infraestructura en **$0**
- Diseñé la paleta de colores, tipografías y la identidad visual digital basada en el rojo Citroën
- Implementé el sistema de **dark/light mode** con anti-flash nativo (sin librerías externas)
- Desarrollé el carrito de compras con persistencia en `localStorage` y el checkout por WhatsApp con mensaje formateado automáticamente
- Armé el **pipeline completo de imágenes**: remoción de fondo con IA (BiRefNet), normalización a WebP < 150KB, marca de agua diagonal y subida batch a Supabase Storage
- Construí el **panel admin interno** (servidor Express local + UI web) para que yo o el cliente pueda subir nuevas tandas de productos sin tocar código
- Implementé la **herramienta QA en Python** para validar el Excel de productos antes de subirlo a producción (detección de nombres sospechosos, fotos huérfanas, SKU duplicados, etc.)
- Configuré el CI/CD completo (GitHub → Netlify) con deploy automático en ~60 segundos
- Implementé el SEO técnico completo: sitemap, robots.txt, canonical, Open Graph, Twitter Card

---

## 6. Link a demo en vivo

🌐 **[citroenmartinortiga.ar](https://citroenmartinortiga.ar)**

---

## 7. Link al repositorio en GitHub

🔒 Repositorio **privado** (cliente): `MatiasVirga/citroen-martin-ortiga`

> No tiene repo público por ser un proyecto de cliente con datos sensibles.

---

## 8. Capturas de pantalla

> ⚠️ **Pendiente** — No hay capturas adjuntas en este momento.
> 
> **Recomendación para el portafolio**: capturar al menos estas 4 vistas:
> - Home (hero + categorías)
> - Catálogo con filtros activos
> - Ficha de producto individual
> - Carrito abierto con mensaje WhatsApp generado

---

## 🏷️ Tags sugeridos para el portafolio

`HTML/CSS/JS` · `Tailwind CSS` · `Supabase` · `Alpine.js` · `Netlify` · `WhatsApp API` · `Python` · `Node.js` · `E-commerce` · `CI/CD` · `SEO` · `Dark Mode` · `Panel Admin`

---

*Proyecto desarrollado por [MatiasVirga](https://github.com/MatiasVirga) — 2024/2026*
