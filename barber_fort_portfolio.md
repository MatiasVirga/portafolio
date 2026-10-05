# 💈 Barber Fort — Documentación de Portafolio

---

## 1. Nombre del Proyecto

**Barber Fort — Web de Reservas Online**

---

## 2. Problema que Resuelve

Barber Fort es una cadena de barberías premium con 2 sucursales y 7 barberos. Cada día, el dueño recibía entre **30 y 50 mensajes de WhatsApp** de clientes preguntando disponibilidad, agendando turnos o cancelando. Esto saturaba la comunicación, generaba errores de doble-booking y lo obligaba a estar pendiente del teléfono en todo momento.

---

## 3. Solución e Impacto

Se construyó una **web de autogestión de turnos** donde los clientes eligen sucursal, barbero, servicio y horario — sin intermediarios. La disponibilidad se consulta en tiempo real contra Google Sheets, y la reserva se confirma por WhatsApp con un mensaje prearmado en un solo tap.

**Impactos concretos:**
- 🔇 Elimina ~30–50 mensajes diarios de WhatsApp sobre disponibilidad
- 🕐 Reduce el tiempo de reserva para el cliente de varios minutos de chat a **menos de 60 segundos**
- 🛡️ Previene doble-booking con validación atómica: dos clientes no pueden reservar el mismo turno aunque entren al mismo tiempo
- 💸 **Costo fijo mensual: $0** — todo corre en tiers gratuitos (Netlify + Google Apps Script)
- 📅 Capta reservas **24/7**, incluso cuando los barberos están trabajando o durmiendo

---

## 4. Stack Tecnológico

| Capa | Tecnología |
|---|---|
| **Frontend** | HTML5, CSS3 vanilla, JavaScript ES6 Modules |
| **Backend / Serverless** | Google Apps Script (V8 runtime) |
| **Base de datos** | Google Sheets (una planilla por mes, por sucursal) |
| **Hosting** | Netlify (deploy continuo desde Git) |
| **Caché** | CacheService de Google + cache en memoria RAM (30s TTL) |
| **Anti-colisiones** | LockService de Google (escritura atómica con tryLock 15s) |
| **Notificaciones** | WhatsApp API (wa.me) — sin costo, sin cuenta business |
| **Dev tooling** | Node.js (server local), Antigravity IDE |

**Sin frameworks de terceros.** El frontend es vanilla puro, lo que garantiza carga rápida y sin dependencias que roten.

---

## 5. Mi Rol — Qué Hice y Qué Decidí

Soy el único desarrollador del proyecto. Diseñé y construí todo de cero, incluyendo decisiones de arquitectura no triviales:

**Desarrollo:**
- Arquitectura completa de la SPA: flujo de 5 pasos (Sucursal → Barbero → Servicio → Calendario → Confirmación)
- Motor de calendario con validación **multi-slot consecutivo** — servicios largos (ej: Mechas = 4 bloques de 30 min) bloquean todos los bloques o no se ofrecen si no hay espacio
- Backend serverless en Apps Script con **escritura atómica** usando `LockService.getDocumentLock()` para prevenir race conditions en reservas simultáneas
- Sistema de **ventana deslizante de 10 días útiles** (Lunes–Sábado) que limita los fetches a máximo 2 Sheets mensuales, manteniendo la performance sin sobrecargar la API de Google
- **Doble capa de caché**: CacheService nativo de Google (600s) + cache en memoria del browser (30s) + prefetch silencioso al iniciar el flujo
- Lógica de **precios con promoción automática**: corte a $14.000 los lunes y martes-jueves de 13:30 a 15:30, calculado dinámicamente según fecha y hora seleccionada
- Mapeo independiente de columnas por sucursal — cada barbero tiene su columna en el Sheet y el backend sabe cuál escribir según la sucursal

**Decisiones clave que tomé:**
- Usar Google Sheets como DB para que el cliente (perfil técnico bajo) pueda ver y gestionar los turnos sin aprender ningún sistema nuevo
- No usar frameworks frontend para mantener la web sin dependencias y con carga sub-segundo
- Usar Apps Script serverless en lugar de un backend propio para mantener costo = $0
- Confirmar reservas por WhatsApp (no por email) porque es el canal nativo del cliente

---

## 6. Link a Demo en Vivo

> ⚠️ El sitio no está en un dominio público aún (el cliente está en proceso de cierre comercial). Sin embargo, **el backend está desplegado y funcional** en producción con usuarios reales.

**Backend España (Sep 2026):**
`https://script.google.com/macros/s/AKfycbwgJaYF5DA8hDP38XZIL1T-RLVB7Sxlg0btZUeUGcijsDjppgHEcyDVYOxgjrAVyIWZ2A/exec`

**Demo en video:** Ver carpeta `media/demos/` — contiene 2 grabaciones del flujo completo de reserva.

---

## 7. Link al Repositorio en GitHub

**No tiene repo público** — el código es propiedad del cliente y está en un repositorio privado.

---

## 8. Capturas de Pantalla / Recursos Visuales

**✅ Sí hay recursos disponibles localmente:**

| Recurso | Tipo | Ruta |
|---|---|---|
| Sucursal España | Foto del local | `images/sucursal_españa.png` |
| Sucursal Blanco Encalada | Foto del local | `images/sucursal_blancoencalada.png` |
| Logo Barber Fort | Logo | `images/logo_barberFort.jpg` |
| Fotos de trabajos (cortes) | Portfolio del barbero | `images/fotocorte_1.png` … `fotocorte_8.png` |
| Demo de reserva (video) | Grabación de pantalla | `media/demos/Barber Fort - DEMO.mp4` (45 MB) |
| Demo alternativa (video) | Grabación de pantalla | `media/demos/Demo - Barber Fort.mp4` (31 MB) |

> 💡 Para el portafolio web, los videos de demo son el activo más fuerte — muestran el flujo completo en menos de 2 minutos.

---

## Extras para el Portafolio (Datos que impresionan)

- **Versión actual:** v2.1 — Multi-Servicio + Multi-Slot Consecutivo + Mapeo Independiente por Sucursal
- **Sucursales activas:** 2 (España y Blanco Encalada)
- **Barberos gestionados:** 7 (Lauti, Juampi, Leo, Tito, Mara, Jasiel, Mirko)
- **Servicios con duración variable:** desde 30 min (Corte) hasta 4 horas (Global de Mara)
- **Ticket del proyecto:** $450.000 ARS (web) + $300.000 ARS (sistema Sheets base) = **$750.000 ARS total**
- **Tiempo de carga del sitio:** sub-segundo (sin frameworks, sin bundler)
- **Costo operativo para el cliente:** $0/mes (solo dominio ~$9.000/año)
