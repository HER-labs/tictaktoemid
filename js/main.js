/* ============================================================
   TTMD — Main JavaScript
   Navigation, scroll reveals, craftsmanship clock
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {

  /* --- Navigation scroll state --- */
  const nav = document.querySelector('.nav');
  if (nav) {
    window.addEventListener('scroll', () => {
      nav.classList.toggle('scrolled', window.scrollY > 40);
    }, { passive: true });
  }

  /* --- Mobile nav toggle --- */
  const toggle = document.querySelector('.nav-toggle');
  const navLinks = document.querySelector('.nav-links');
  if (toggle && navLinks) {
    toggle.addEventListener('click', () => {
      navLinks.classList.toggle('open');
      const spans = toggle.querySelectorAll('span');
      if (navLinks.classList.contains('open')) {
        spans[0].style.transform = 'rotate(45deg) translate(4px, 4px)';
        spans[1].style.opacity = '0';
        spans[2].style.transform = 'rotate(-45deg) translate(4px, -4px)';
      } else {
        spans[0].style.transform = '';
        spans[1].style.opacity = '';
        spans[2].style.transform = '';
      }
    });
  }

  /* --- Scroll reveal --- */
  const reveals = document.querySelectorAll('.reveal');
  if (reveals.length) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
    reveals.forEach(el => observer.observe(el));
  }

  /* --- Craftsmanship Clock --- */
  const clockEl = document.getElementById('craft-clock');
  if (clockEl) {
    // Base hours: ~18,400 hours as of site launch, incrementing slowly
    const baseHours = 18432;
    const launchDate = new Date('2026-04-16T00:00:00');
    const hoursPerDay = 8; // atelier works ~8 hours/day

    function updateClock() {
      const now = new Date();
      const daysSinceLaunch = (now - launchDate) / (1000 * 60 * 60 * 24);
      const currentHours = Math.floor(baseHours + (daysSinceLaunch * hoursPerDay));
      // Animate number display
      const formatted = currentHours.toLocaleString();
      clockEl.textContent = formatted;
    }

    updateClock();
    setInterval(updateClock, 60000); // update every minute

    // Animate counting up on first view
    const clockSection = clockEl.closest('.clock-section');
    if (clockSection) {
      const clockObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            animateCounter(clockEl, 0, parseInt(clockEl.textContent.replace(/,/g, '')), 2000);
            clockObserver.unobserve(entry.target);
          }
        });
      }, { threshold: 0.3 });
      clockObserver.observe(clockSection);
    }
  }

  /* --- Counter animation --- */
  function animateCounter(el, start, end, duration) {
    const startTime = performance.now();
    function tick(now) {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // Ease out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = Math.floor(start + (end - start) * eased);
      el.textContent = current.toLocaleString();
      if (progress < 1) requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
  }

  /* --- Smooth scroll for anchor links --- */
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      const target = document.querySelector(anchor.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        // Close mobile nav if open
        if (navLinks && navLinks.classList.contains('open')) {
          navLinks.classList.remove('open');
        }
      }
    });
  });

  /* --- Active nav link based on current page --- */
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a').forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPage || (currentPage === '' && href === 'index.html')) {
      link.classList.add('active');
    }
  });

});
