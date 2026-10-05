// ============================================
//   MATIAS VIRGA TABOADA — PORTFOLIO
//   main.js
// ============================================

// ── NAVBAR SCROLL ──
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 40);
});

// ── HAMBURGER MENU ──
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobile-menu');
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
const navLinks = document.querySelectorAll('.nav-links a');

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
