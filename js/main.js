// ============================================
//   MATIAS VIRGA TABOADA — PORTFOLIO
//   main.js
// ============================================

// ── NAVBAR SCROLL ──
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  if (navbar) {
    navbar.classList.toggle('scrolled', window.scrollY > 40);
  }
});

// ── HAMBURGER MENU ──
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobile-menu');
if (hamburger && mobileMenu) {
  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('open');
    mobileMenu.classList.toggle('open');
  });
  mobileMenu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('open');
      mobileMenu.classList.remove('open');
    });
  });
}

// ── INTERSECTION OBSERVER (fade-in) ──
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));

// ── SMOOTH ACTIVE NAV LINK ──
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-links a[href^="#"]');

const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      navLinks.forEach(link => link.classList.remove('active'));
      const activeLink = document.querySelector(`.nav-links a[href="#${entry.target.id}"]`);
      if (activeLink) activeLink.classList.add('active');
    }
  });
}, { threshold: 0.4 });

sections.forEach(s => sectionObserver.observe(s));

// ── COUNTER ANIMATION ──
function animateCounter(el, target, suffix = '') {
  const duration = 1800;
  const start = performance.now();
  const isFloat = target % 1 !== 0;

  const tick = (now) => {
    const elapsed = now - start;
    const progress = Math.min(elapsed / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    const value = isFloat
      ? (eased * target).toFixed(1)
      : Math.floor(eased * target);
    el.textContent = value + suffix;
    if (progress < 1) requestAnimationFrame(tick);
  };
  requestAnimationFrame(tick);
}

const statsObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.querySelectorAll('[data-count]').forEach(el => {
        const target = parseFloat(el.dataset.count);
        const suffix = el.dataset.suffix || '';
        animateCounter(el, target, suffix);
      });
      statsObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.3 });

const statsEl = document.querySelector('.hero-stats');
if (statsEl) statsObserver.observe(statsEl);

// ── TYPED EFFECT (role) ──
const roleEl = document.getElementById('typed-role');
if (roleEl) {
  const roles = [
    'Tier 2/3 Support Analyst',
    'Vibe Coder',
    'AI-Augmented Builder',
    'Problem Solver',
  ];
  let roleIdx = 0, charIdx = 0, deleting = false;

  function typeRole() {
    const current = roles[roleIdx];
    if (!deleting) {
      roleEl.textContent = current.slice(0, charIdx + 1);
      charIdx++;
      if (charIdx === current.length) {
        deleting = true;
        setTimeout(typeRole, 2000);
        return;
      }
    } else {
      roleEl.textContent = current.slice(0, charIdx - 1);
      charIdx--;
      if (charIdx === 0) {
        deleting = false;
        roleIdx = (roleIdx + 1) % roles.length;
      }
    }
    setTimeout(typeRole, deleting ? 50 : 80);
  }
  typeRole();
}

// ── CURSOR GLOW ──
const cursor = document.createElement('div');
cursor.id = 'cursor-glow';
cursor.style.cssText = `
  position: fixed; pointer-events: none; z-index: 9999;
  width: 400px; height: 400px; border-radius: 50%;
  background: radial-gradient(circle, rgba(0,212,255,0.06) 0%, transparent 70%);
  transform: translate(-50%, -50%);
  transition: opacity 0.3s ease;
  will-change: transform;
`;
document.body.appendChild(cursor);

document.addEventListener('mousemove', (e) => {
  cursor.style.left = e.clientX + 'px';
  cursor.style.top  = e.clientY + 'px';
});

// ============================================
//   TOAST NOTIFICATION SYSTEM
// ============================================
const toastEl = document.getElementById('toast-notification');
let toastTimer = null;

function showToast(messageHtml, duration = 5000) {
  if (!toastEl) return;
  toastEl.innerHTML = messageHtml;
  toastEl.classList.add('show');
  
  if (toastTimer) clearTimeout(toastTimer);
  toastTimer = setTimeout(() => {
    toastEl.classList.remove('show');
  }, duration);
}

// ============================================
//   CV DOWNLOAD HANDLER (Fallback Inteligente)
// ============================================
const cvLinks = document.querySelectorAll('a[download*="CV_Matias_Virga"]');
cvLinks.forEach(link => {
  link.addEventListener('click', async (e) => {
    const href = link.getAttribute('href');
    try {
      const response = await fetch(href, { method: 'HEAD' });
      if (!response.ok) {
        e.preventDefault();
        showToast(`
          <div>
            <strong>📄 CV en proceso de actualización</strong><br>
            <span style="font-size:0.82rem; color:var(--text-secondary);">
              Escribime a <a href="mailto:matias.virga@gmail.com" style="color:var(--cyan); text-decoration:underline;">matias.virga@gmail.com</a> y te lo mando en el acto.
            </span>
          </div>
        `, 6000);
      }
    } catch {
      // Si falla la verificación (ej. protocolo local file://), dejamos proceder la descarga normalmente
    }
  });
});

// ============================================
//   CASE STUDY MODAL SYSTEM
// ============================================
const caseStudiesData = {
  'barber-fort': {
    title: '💈 Barber Fort — Web de Reservas Online',
    subtitle: 'Sistema de autogestión de turnos serverless con prevención atómica de colisiones y costo operativo $0.',
    badges: [
      { text: 'HTML5/CSS3/JS Vanilla', type: '' },
      { text: 'Google Apps Script', type: '' },
      { text: 'Google Sheets (DB)', type: 'violet' },
      { text: 'Netlify CI/CD', type: 'green' },
      { text: 'LockService Atómico', type: '' }
    ],
    problema: `
      <div class="modal-section">
        <h4>🚨 El Problema de Negocio</h4>
        <p>Barber Fort es una cadena de barberías premium con 2 sucursales y 7 barberos. Cada día, el dueño recibía entre <strong>30 y 50 mensajes de WhatsApp</strong> de clientes preguntando disponibilidad, pidiendo turnos o cancelando. Esto saturaba la comunicación, producía errores constantes de <strong>doble-booking</strong> y lo ataba al teléfono las 24 horas.</p>
      </div>
      <div class="modal-section">
        <h4>💡 La Solución Implementada</h4>
        <p>Desarrollé una <strong>Single Page Application (SPA)</strong> de autogestión de turnos donde el cliente elige sucursal, barbero, servicio y horario en <strong>menos de 60 segundos</strong>. La disponibilidad se consulta en tiempo real contra Google Sheets y la reserva se confirma con un tap en WhatsApp con mensaje pre-estructurado.</p>
        <p>Cero fricción, sin registro obligatorio y con costo de infraestructura de <strong>$0/mes</strong>.</p>
      </div>
    `,
    arquitectura: `
      <div class="modal-section">
        <h4>⚙️ Decisiones Técnicas y de Trinchera</h4>
        <p>Para lograr confiabilidad enterprise a costo cero, diseñé una arquitectura con salvaguardas avanzadas:</p>
        <div class="tech-callout-grid">
          <div class="tech-callout">
            <div class="tech-callout-title">🔒 LockService.tryLock(15000)</div>
            <div class="tech-callout-desc">Prevención atómica de race conditions. Si dos clientes intentan reservar el mismo slot simultáneamente, el backend bloquea el recurso temporalmente y rechaza el segundo intento de inmediato.</div>
          </div>
          <div class="tech-callout">
            <div class="tech-callout-title">⚡ Doble Capa de Caché</div>
            <div class="tech-callout-desc">CacheService de Google (600s TTL) para disponibilidad general + caché en memoria del navegador (30s TTL) con prefetch silencioso al abrir la web para consultas sub-segundo.</div>
          </div>
          <div class="tech-callout">
            <div class="tech-callout-title">🗓️ Ventana Deslizante de 10 Días</div>
            <div class="tech-callout-desc">Limita los cálculos a máximo 2 planillas mensuales activas de Google Sheets, protegiendo las cuotas de ejecución de Google sin degradar la experiencia de usuario.</div>
          </div>
          <div class="tech-callout">
            <div class="tech-callout-title">🧩 Calendario Multi-Slot Consecutivo</div>
            <div class="tech-callout-desc">Algoritmo propio que valida servicios largos (ej: Mechas = 4 bloques de 30 min consecutivos) bloqueando todos los slots o impidiendo la reserva si no hay bloque contiguo.</div>
          </div>
        </div>
      </div>
      <div class="modal-section" style="margin-top: 20px;">
        <h4>🌱 ¿Por qué Google Sheets como Base de Datos?</h4>
        <p>El cliente tiene un perfil no técnico. Usar Sheets le permite abrir su celular o PC, ver la grilla semanal con los nombres de sus clientes y editar o cancelar turnos directamente sin tener que aprender a usar un dashboard complejo o pagar licencias de SaaS.</p>
      </div>
    `,
    metricas: `
      <div class="modal-section">
        <h4>📈 Métricas de Impacto Comprobadas</h4>
        <div class="metrics-badge-grid">
          <div class="metric-pill">
            <div class="metric-pill-val">~50</div>
            <div class="metric-pill-lbl">Mensajes/día eliminados</div>
          </div>
          <div class="metric-pill">
            <div class="metric-pill-val">&lt;60s</div>
            <div class="metric-pill-lbl">Tiempo medio de reserva</div>
          </div>
          <div class="metric-pill">
            <div class="metric-pill-val">$0</div>
            <div class="metric-pill-lbl">Costo fijo mensual</div>
          </div>
          <div class="metric-pill">
            <div class="metric-pill-val">$750k</div>
            <div class="metric-pill-lbl">Ticket comercial ARS</div>
          </div>
        </div>
      </div>
      <div class="modal-section">
        <h4>🛠️ Stack Tecnológico Completo</h4>
        <p><strong>Frontend:</strong> HTML5, CSS3 Vanilla, JavaScript ES6 Modules (sin librerías ni bundlers externos).<br>
        <strong>Backend:</strong> Google Apps Script (V8 Runtime) como API REST Serverless.<br>
        <strong>Base de Datos:</strong> Google Sheets con mapeo dinámico de columnas por sucursal y barbero.<br>
        <strong>Deploy &amp; Hosting:</strong> Netlify con Git CI/CD continuo.<br>
        <strong>Notificaciones:</strong> WhatsApp API (wa.me) sin costo de suscripción Business API.</p>
      </div>
    `,
    liveLink: 'https://barberfort.com.ar',
    liveLabel: '🌐 Visitar barberfort.com.ar'
  },
  'citroen': {
    title: '🚗 Citroën Martín Ortiga — Plataforma de Catálogo',
    subtitle: 'Catálogo digital interactivo, checkout por WhatsApp y pipeline de procesamiento de imágenes con IA para repuestos clásicos.',
    badges: [
      { text: 'HTML5/Tailwind/Alpine.js', type: '' },
      { text: 'Supabase (PostgreSQL)', type: 'violet' },
      { text: 'Python + BiRefNet IA', type: '' },
      { text: 'Netlify CI/CD', type: 'green' },
      { text: 'Panel Admin Express', type: '' }
    ],
    problema: `
      <div class="modal-section">
        <h4>🚨 El Problema de Negocio</h4>
        <p>Martín Ortiga representa un negocio familiar argentino de repuestos para Citroën clásicos con <strong>más de 60 años de trayectoria</strong> pero <strong>cero presencia digital</strong>. Los clientes llamaban por teléfono sin saber qué piezas había en stock y los pedidos internacionales se perdían por falta de catálogo online y canales claros de cotización.</p>
      </div>
      <div class="modal-section">
        <h4>💡 La Solución Implementada</h4>
        <p>Diseñé y construí un sitio web completo con catálogo interactivo conectado a Supabase. Los usuarios pueden filtrar por modelo (2CV, 3CV, Ami 8, Mehari), categoría y condición, armar un carrito reactivo y exportar el pedido con un clic directamente a WhatsApp formateado para el vendedor.</p>
        <p>Además, cuenta con un formulario dedicado para exportaciones a Europa y Latinoamérica.</p>
      </div>
    `,
    arquitectura: `
      <div class="modal-section">
        <h4>⚙️ Decisiones Técnicas y de Trinchera</h4>
        <p>Un proyecto de e-commerce sin costos recurrentes y con tooling a medida para el dueño:</p>
        <div class="tech-callout-grid">
          <div class="tech-callout">
            <div class="tech-callout-title">🤖 Pipeline de Imágenes con IA (Python)</div>
            <div class="tech-callout-desc">Desarrollo de scripts en Python con BiRefNet y rembg para recortar automáticamente el fondo de fotos de repuestos mecánicos, aplicar watermark diagonal y normalizar a WebP &lt; 150KB.</div>
          </div>
          <div class="tech-callout">
            <div class="tech-callout-title">⚡ Alpine.js + Carrito en localStorage</div>
            <div class="tech-callout-desc">Reactividad ligera para el carrito de compras sin sobrecargar la web con frameworks pesados tipo React. Persistencia local para que el usuario no pierda su selección al navegar.</div>
          </div>
          <div class="tech-callout">
            <div class="tech-callout-title">🛠️ Herramienta QA en Python / Tkinter</div>
            <div class="tech-callout-desc">Software de escritorio para auditar el Excel de repuestos antes de impactar en producción (detecta nombres sospechosos, fotos huérfanas y SKUs duplicados).</div>
          </div>
          <div class="tech-callout">
            <div class="tech-callout-title">🗄️ Supabase Backend Serverless</div>
            <div class="tech-callout-desc">PostgreSQL para almacenamiento del catálogo, metadatos y Supabase Storage para alojar imágenes y manuales técnicos en PDF, todo dentro del tier gratuito.</div>
          </div>
        </div>
      </div>
      <div class="modal-section" style="margin-top: 20px;">
        <h4>🌓 Anti-Flash Dark Mode Nativo</h4>
        <p>Script inline en el <code>&lt;head&gt;</code> que detecta las preferencias del sistema y <code>localStorage</code> antes de que el DOM renderice, evitando el molesto parpadeo de pantalla blanca al cargar.</p>
      </div>
    `,
    metricas: `
      <div class="modal-section">
        <h4>📈 Métricas de Impacto Comprobadas</h4>
        <div class="metrics-badge-grid">
          <div class="metric-pill">
            <div class="metric-pill-val">60+</div>
            <div class="metric-pill-lbl">Años de historia digitalizados</div>
          </div>
          <div class="metric-pill">
            <div class="metric-pill-val">~60s</div>
            <div class="metric-pill-lbl">Deploy continuo a producción</div>
          </div>
          <div class="metric-pill">
            <div class="metric-pill-val">$0</div>
            <div class="metric-pill-lbl">Costo infraestructura/mes</div>
          </div>
          <div class="metric-pill">
            <div class="metric-pill-val">100%</div>
            <div class="metric-pill-lbl">SEO técnico indexado</div>
          </div>
        </div>
      </div>
      <div class="modal-section">
        <h4>🛠️ Stack Tecnológico Completo</h4>
        <p><strong>Frontend:</strong> HTML5 semántico, Tailwind CSS v3 (compilado local), JavaScript Vanilla, Alpine.js v3.<br>
        <strong>Base de Datos &amp; Storage:</strong> Supabase (PostgreSQL + CDN de imágenes).<br>
        <strong>Automatización &amp; Tooling:</strong> Python (BiRefNet, rembg, Pillow, Tkinter QA Tool), Node.js / Express local (Panel Admin).<br>
        <strong>Hosting &amp; CI/CD:</strong> Netlify con despliegue automático desde GitHub.<br>
        <strong>Ventas:</strong> WhatsApp API con serialización automática de pedidos.</p>
      </div>
    `,
    liveLink: 'https://citroenmartinortiga.ar',
    liveLabel: '🌐 Visitar citroenmartinortiga.ar'
  },
  'automatizahoy': {
    title: '⚡ AutomatizaHoy — Marca y plataforma de servicios',
    subtitle: 'Convertir tres trabajos sueltos en una oferta que un dueño de PyME entiende en 30 segundos: casos reales, demos en vivo y cero dependencias.',
    badges: [
      { text: 'HTML5/CSS3/JS Vanilla', type: '' },
      { text: 'n8n', type: 'violet' },
      { text: 'Google Apps Script', type: '' },
      { text: 'Netlify + build propio', type: 'green' },
      { text: 'WhatsApp Deep Link', type: '' }
    ],
    problema: `
      <div class="modal-section">
        <h4>🚨 El Problema de Negocio</h4>
        <p>Barber Fort y Citroën Martín Ortiga funcionaban, pero vivían como piezas aisladas: un repo privado por acá, un link suelto por allá, un Excel que nadie veía. Un dueño de PyME que los miraba no podía responder la única pregunta que importa: <strong>"¿esto qué me resuelve a mí?"</strong>.</p>
        <p>Sin una marca que los contenga, cada proyecto empezaba de cero la conversación comercial y el trabajo ya hecho no generaba el siguiente cliente.</p>
      </div>
      <div class="modal-section">
        <h4>💡 La Solución Implementada</h4>
        <p><strong>AutomatizaHoy</strong> es el paraguas: una landing de una sola página que ordena la oferta en cuatro dolores concretos — sitios que venden, procesos que se hacen solos, agentes de IA que atienden, y reseñas/presencia local — y los respalda con los casos reales, abribles y en producción.</p>
        <p>La pieza que hace el trabajo pesado es el <strong>comparador antes/después del Excel de caja de Barber Fort</strong>: en lugar de explicar que "reconstruí una planilla", el visitante arrastra un slider y ve la diferencia. El formulario no tiene backend: arma el mensaje y abre WhatsApp con todo escrito.</p>
      </div>
    `,
    arquitectura: `
      <div class="modal-section">
        <h4>⚙️ Decisiones Técnicas y de Trinchera</h4>
        <p>Sin frameworks ni build obligatorio, pero con criterio de producto:</p>
        <div class="tech-callout-grid">
          <div class="tech-callout">
            <div class="tech-callout-title">🧱 Cero dependencias por CDN</div>
            <div class="tech-callout-desc">Ni Tailwind ni Font Awesome: los íconos son un sprite SVG inline al inicio del body. Carga rápido, funciona offline y no se rompe si un CDN se cae o cambia de licencia.</div>
          </div>
          <div class="tech-callout">
            <div class="tech-callout-title">🎚️ Comparador sin librerías</div>
            <div class="tech-callout-desc">Antes/después resuelto con <code>clip-path</code> y un <code>input[type=range]</code> nativo, con dos vistas (planilla diaria y resumen semanal) y control por teclado.</div>
          </div>
          <div class="tech-callout">
            <div class="tech-callout-title">💳 Porta reseñas dibujado en CSS</div>
            <div class="tech-callout-desc">El marco de acrílico del producto físico es puro CSS: degradés, brillo y espesor. La placa impresa es un WebP 2:3 y los QR salen de un generador propio (<code>gen-qr.mjs</code>) con script de verificación aparte.</div>
          </div>
          <div class="tech-callout">
            <div class="tech-callout-title">📦 Build propio + 404 defensivo</div>
            <div class="tech-callout-desc"><code>build.mjs</code> arma <code>dist/</code> publicando solo lo necesario; el <code>netlify.toml</code> devuelve 404 para <code>/docs</code>, <code>/brand</code>, <code>/scripts</code> y <code>/Contenido</code> para no filtrar material interno.</div>
          </div>
        </div>
      </div>
      <div class="modal-section" style="margin-top: 20px;">
        <h4>♿ Accesibilidad y motion, sin descuidar la conversión</h4>
        <p>HTML semántico, skip link, <code>aria-expanded</code>, pestañas navegables con teclado y foco visible. Layout fluido con <code>clamp()</code> de 1200 a 380 px, objetivos táctiles de 44 px, zonas seguras de iPhone y respeto por <code>prefers-reduced-motion</code>.</p>
      </div>
    `,
    metricas: `
      <div class="modal-section">
        <h4>📈 Números del proyecto</h4>
        <div class="metrics-badge-grid">
          <div class="metric-pill">
            <div class="metric-pill-val">0</div>
            <div class="metric-pill-lbl">Dependencias externas</div>
          </div>
          <div class="metric-pill">
            <div class="metric-pill-val">4</div>
            <div class="metric-pill-lbl">Servicios empaquetados</div>
          </div>
          <div class="metric-pill">
            <div class="metric-pill-val">2</div>
            <div class="metric-pill-lbl">Casos con demo en vivo</div>
          </div>
          <div class="metric-pill">
            <div class="metric-pill-val">$0</div>
            <div class="metric-pill-lbl">Costo de infra/mes</div>
          </div>
        </div>
      </div>
      <div class="modal-section">
        <h4>🛠️ Stack Tecnológico Completo</h4>
        <p><strong>Frontend:</strong> HTML5 semántico, CSS3 con design system propio (variables, <code>clamp()</code>, componentes), JavaScript ES6+ sin bundler obligatorio.<br>
        <strong>Automatización:</strong> n8n, Google Apps Script y Google Sheets como motor de los flujos que se venden.<br>
        <strong>Publicación:</strong> Netlify + <code>build.mjs</code> propio, con <code>_headers</code>, <code>_redirects</code>, sitemap, robots y 404.<br>
        <strong>Contacto:</strong> deep link a WhatsApp (<code>wa.me</code>) con mensaje pre-armado, sin backend ni formularios eternos.<br>
        <strong>SEO:</strong> metadatos, Open Graph y JSON-LD <code>ProfessionalService</code>.</p>
      </div>
    `,
    liveLink: 'https://automatizahoy.com.ar',
    liveLabel: '🌐 Visitar automatizahoy.com.ar'
  }
};

const modal = document.getElementById('case-study-modal');
const modalCloseBtn = document.getElementById('modal-close-btn');
const modalBadges = document.getElementById('modal-badges');
const modalTitle = document.getElementById('modal-title');
const modalSubtitle = document.getElementById('modal-subtitle');
const paneProblema = document.getElementById('pane-problema-solucion');
const paneArquitectura = document.getElementById('pane-arquitectura');
const paneMetricas = document.getElementById('pane-metricas-stack');
const modalFooter = document.getElementById('modal-footer');
const tabButtons = document.querySelectorAll('.modal-tabs .tab-btn');

let currentOpenProject = null;

function openCaseStudy(projectId) {
  const data = caseStudiesData[projectId];
  if (!data || !modal) return;

  currentOpenProject = projectId;

  // Render header
  modalTitle.textContent = data.title;
  modalSubtitle.textContent = data.subtitle;
  modalBadges.innerHTML = data.badges.map(b => 
    `<span class="tag ${b.type}">${b.text}</span>`
  ).join('');

  // Render panes
  paneProblema.innerHTML = data.problema;
  paneArquitectura.innerHTML = data.arquitectura;
  paneMetricas.innerHTML = data.metricas;

  // Render footer
  modalFooter.innerHTML = `
    <button type="button" class="btn-secondary" id="modal-footer-close" style="padding:10px 20px; font-size:0.85rem;">
      Cerrar
    </button>
    <a href="${data.liveLink}" target="_blank" rel="noopener noreferrer" class="btn-primary" style="padding:10px 20px; font-size:0.85rem;">
      ${data.liveLabel}
    </a>
  `;
  document.getElementById('modal-footer-close')?.addEventListener('click', closeCaseStudy);

  // Reset tab to first
  switchTab('problema-solucion');

  // Open modal
  modal.classList.add('open');
  modal.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';

  // Update hash without jumping
  if (history.pushState) {
    history.pushState(null, null, `#${projectId}`);
  }
}

function closeCaseStudy() {
  if (!modal) return;
  modal.classList.remove('open');
  modal.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
  currentOpenProject = null;

  // Clean hash
  if (history.pushState && window.location.hash.replace('#', '') in caseStudiesData) {
    history.pushState(null, null, window.location.pathname + window.location.search);
  }
}

function switchTab(tabKey) {
  tabButtons.forEach(btn => {
    btn.classList.toggle('active', btn.dataset.tab === tabKey);
  });
  const panes = [
    { key: 'problema-solucion', el: paneProblema },
    { key: 'arquitectura', el: paneArquitectura },
    { key: 'metricas-stack', el: paneMetricas }
  ];
  panes.forEach(p => {
    if (p.el) p.el.classList.toggle('active', p.key === tabKey);
  });
}

// Event Listeners for Modal
tabButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    switchTab(btn.dataset.tab);
  });
});

document.querySelectorAll('.btn-case-study').forEach(btn => {
  btn.addEventListener('click', () => {
    const proj = btn.dataset.project;
    if (proj) openCaseStudy(proj);
  });
});

if (modalCloseBtn) {
  modalCloseBtn.addEventListener('click', closeCaseStudy);
}

if (modal) {
  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeCaseStudy();
  });
}

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && modal && modal.classList.contains('open')) {
    closeCaseStudy();
  }
});

// Deep link routing (Hash detection on load)
function checkRouteHash() {
  const hash = window.location.hash.replace('#', '');
  if (caseStudiesData[hash]) {
    openCaseStudy(hash);
  }
}

window.addEventListener('DOMContentLoaded', checkRouteHash);
window.addEventListener('hashchange', checkRouteHash);
