/* ============================================================
   TTMD — Main JavaScript
   Navigation, scroll reveals, craftsmanship clock
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {

  /* --- Navigation scroll state --- */
  const nav = document.querySelector('.nav');
  if (nav) {
    window.addEventListener('scroll', () => {
      nav.classList.toggle('scrolled', window.scrollY > 50);
    }, { passive: true });
  }

  /* --- Mobile nav toggle --- */
  const toggle = document.querySelector('.nav-toggle');
  const navLinks = document.querySelector('.nav-links');

  // Declared at DOMContentLoaded scope so smooth scroll handler can access it
  let closeOverlay = null;

  if (toggle && navLinks) {
    const spans = toggle.querySelectorAll('span');

    closeOverlay = function() {
      navLinks.classList.remove('open');
      toggle.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
      spans[0].style.transform = '';
      spans[1].style.opacity = '';
      spans[2].style.transform = '';
    };

    toggle.addEventListener('click', () => {
      const isOpen = navLinks.classList.contains('open');
      if (isOpen) {
        closeOverlay();
      } else {
        navLinks.classList.add('open');
        toggle.setAttribute('aria-expanded', 'true');
        document.body.style.overflow = 'hidden';
        spans[0].style.transform = 'rotate(45deg) translate(4px, 4px)';
        spans[1].style.opacity = '0';
        spans[2].style.transform = 'rotate(-45deg) translate(4px, -4px)';
      }
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && navLinks.classList.contains('open')) {
        closeOverlay();
        toggle.focus();
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
    // Hours accumulating since atelier founding in 2010 (6 days/week, 12 hrs/day)
    const baseHours = 0;
    const launchDate = new Date('2010-01-01T00:00:00');
    const hoursPerDay = (12 * 6) / 7; // ~10.29 hrs/day averaged over 7 days

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
        if (navLinks && navLinks.classList.contains('open') && closeOverlay) {
          closeOverlay();
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

  /* --- GSAP Progressive Enhancement --- */
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined' && !prefersReduced) {
    gsap.registerPlugin(ScrollTrigger);

    // Process step stagger (homepage only)
    const processSteps = document.querySelectorAll('.process-step');
    if (processSteps.length) {
      // Remove CSS reveal classes since GSAP handles the animation
      processSteps.forEach(step => {
        step.classList.remove('reveal', 'reveal-delay-1', 'reveal-delay-2', 'reveal-delay-3', 'reveal-delay-4');
        step.style.opacity = '0';
        step.style.transform = 'translateY(30px)';
      });

      gsap.to('.process-step', {
        scrollTrigger: {
          trigger: '.process-grid',
          start: 'top 80%',
          once: true
        },
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.12,
        ease: 'power2.out'
      });
    }

    // Chapter entrance (bespoke page only)
    const chapters = document.querySelectorAll('.chapter');
    if (chapters.length) {
      chapters.forEach(chapter => {
        const content = chapter.querySelector('.chapter-content');
        const image = chapter.querySelector('.chapter-image');

        if (content) {
          gsap.from(content, {
            scrollTrigger: {
              trigger: chapter,
              start: 'top 75%',
              once: true
            },
            opacity: 0,
            x: chapter.classList.contains('reversed') ? -40 : 40,
            duration: 1,
            ease: 'power2.out'
          });
        }

        if (image) {
          gsap.from(image, {
            scrollTrigger: {
              trigger: chapter,
              start: 'top 75%',
              once: true
            },
            opacity: 0,
            duration: 1.2,
            ease: 'power2.out'
          });
        }
      });
    }
  }
  // Fallback: CSS .reveal classes handle basic fade-up if GSAP is absent

});
