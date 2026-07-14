/* ============================================================
   LONGHORN HARDSCAPE & CONSTRUCTION — MAIN JS
   ============================================================ */

(function () {
  'use strict';

  /* ----------------------------------------------------------
     1. STICKY HEADER
  ---------------------------------------------------------- */
  const header = document.querySelector('.site-header');
  if (header) {
    const onScroll = () => {
      header.classList.toggle('is-scrolled', window.scrollY > 40);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  /* ----------------------------------------------------------
     2. MOBILE NAV TOGGLE
  ---------------------------------------------------------- */
  const hamburger = document.querySelector('.hamburger');
  const mobileNav = document.querySelector('.mobile-nav');

  if (hamburger && mobileNav) {
    hamburger.addEventListener('click', () => {
      const isOpen = hamburger.classList.toggle('is-open');
      mobileNav.classList.toggle('is-open', isOpen);
      hamburger.setAttribute('aria-expanded', isOpen);
      document.body.style.overflow = isOpen ? 'hidden' : '';
    });

    // Close on link click
    mobileNav.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        hamburger.classList.remove('is-open');
        mobileNav.classList.remove('is-open');
        hamburger.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
      });
    });

    // Close on Escape
    document.addEventListener('keydown', e => {
      if (e.key === 'Escape' && mobileNav.classList.contains('is-open')) {
        hamburger.classList.remove('is-open');
        mobileNav.classList.remove('is-open');
        hamburger.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
      }
    });
  }

  /* ----------------------------------------------------------
     3. SCROLL REVEAL (IntersectionObserver)
  ---------------------------------------------------------- */
  const revealEls = document.querySelectorAll('.reveal');
  if (revealEls.length && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    const revealObserver = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          revealObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

    revealEls.forEach(el => revealObserver.observe(el));
  } else {
    revealEls.forEach(el => el.classList.add('is-visible'));
  }

  /* ----------------------------------------------------------
     4. ANIMATED TRUST COUNTERS
  ---------------------------------------------------------- */
  const counters = document.querySelectorAll('[data-target]');
  if (counters.length) {
    const counterObserver = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        const el    = entry.target;
        const target = parseFloat(el.dataset.target);
        const suffix = el.dataset.suffix || '';
        const duration = 1600;
        const start  = performance.now();

        const tick = (now) => {
          const elapsed = now - start;
          const progress = Math.min(elapsed / duration, 1);
          const ease = 1 - Math.pow(1 - progress, 3);
          const val = target * ease;
          el.textContent = (Number.isInteger(target) ? Math.round(val) : val.toFixed(1)) + suffix;
          if (progress < 1) requestAnimationFrame(tick);
        };

        requestAnimationFrame(tick);
        counterObserver.unobserve(el);
      });
    }, { threshold: 0.5 });

    counters.forEach(el => counterObserver.observe(el));
  }

  /* ----------------------------------------------------------
     5. FAQ ACCORDION
  ---------------------------------------------------------- */
  document.querySelectorAll('.faq-question').forEach(btn => {
    btn.addEventListener('click', () => {
      const item   = btn.closest('.faq-item');
      const answer = item.querySelector('.faq-answer');
      const isOpen = item.classList.contains('is-open');

      // Close all
      document.querySelectorAll('.faq-item.is-open').forEach(open => {
        open.classList.remove('is-open');
        open.querySelector('.faq-answer').style.maxHeight = null;
      });

      // Open clicked (if it wasn't already open)
      if (!isOpen) {
        item.classList.add('is-open');
        answer.style.maxHeight = answer.scrollHeight + 'px';
      }
    });
  });

  /* ----------------------------------------------------------
     6. LAZY LOAD images (native + IntersectionObserver fallback)
  ---------------------------------------------------------- */
  if ('loading' in HTMLImageElement.prototype) {
    // Browser supports native lazy loading — nothing to do,
    // HTML already has loading="lazy" on non-hero imgs
  } else {
    // Fallback for older browsers
    const lazyImgs = document.querySelectorAll('img[loading="lazy"]');
    if (lazyImgs.length) {
      const lazyObserver = new IntersectionObserver(entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const img = entry.target;
            if (img.dataset.src) img.src = img.dataset.src;
            lazyObserver.unobserve(img);
          }
        });
      });
      lazyImgs.forEach(img => lazyObserver.observe(img));
    }
  }

  /* ----------------------------------------------------------
     7. CONTACT FORM — basic validation + mailto
  ---------------------------------------------------------- */
  const contactForm = document.querySelector('.js-contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', e => {
      e.preventDefault();
      const data = new FormData(contactForm);
      const name    = data.get('name')    || '';
      const phone   = data.get('phone')   || '';
      const email   = data.get('email')   || '';
      const service = data.get('service') || '';
      const desc    = data.get('description') || '';
      const pref    = data.get('contact_pref') || '';

      // Basic required field check
      const required = ['name', 'phone', 'email'];
      let valid = true;

      required.forEach(field => {
        const input = contactForm.querySelector(`[name="${field}"]`);
        if (input && !input.value.trim()) {
          input.style.borderColor = '#e53e3e';
          valid = false;
          input.addEventListener('input', () => { input.style.borderColor = ''; }, { once: true });
        }
      });

      if (!valid) return;

      const body = encodeURIComponent(
        `Name: ${name}\nPhone: ${phone}\nEmail: ${email}\nService: ${service}\nDescription: ${desc}\nPreferred contact: ${pref}`
      );
      const subject = encodeURIComponent(`Quote Request — ${service || 'Hardscape'} — ${name}`);
      window.location.href = `mailto:[EMAIL]?subject=${subject}&body=${body}`;
    });
  }

  /* ----------------------------------------------------------
     8. SMOOTH SCROLL for anchor links
  ---------------------------------------------------------- */
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', e => {
      const target = document.querySelector(anchor.getAttribute('href'));
      if (!target) return;
      e.preventDefault();
      const offset = header ? header.offsetHeight + 16 : 80;
      window.scrollTo({
        top: target.getBoundingClientRect().top + window.scrollY - offset,
        behavior: 'smooth'
      });
    });
  });

  /* ----------------------------------------------------------
     9. ACTIVE NAV LINK highlighting (current page)
  ---------------------------------------------------------- */
  const currentPath = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-link[href], .mobile-nav-links a[href]').forEach(link => {
    const linkPath = link.getAttribute('href').split('/').pop();
    if (linkPath === currentPath) {
      link.classList.add('is-active');
    }
  });

  /* ----------------------------------------------------------
     10. SERVICE CARD LIGHTBOX
  ---------------------------------------------------------- */
  const scLightbox = document.getElementById('scLightbox');
  if (scLightbox) {
    const lbImg      = scLightbox.querySelector('.sc-lightbox__img');
    const lbCaption  = scLightbox.querySelector('.sc-lightbox__caption');
    const lbClose    = scLightbox.querySelector('.sc-lightbox__close');
    const lbBackdrop = scLightbox.querySelector('.sc-lightbox__backdrop');

    function openSCLightbox(src, alt, caption) {
      lbImg.src = src;
      lbImg.alt = alt;
      lbCaption.textContent = caption;
      scLightbox.removeAttribute('hidden');
      document.body.style.overflow = 'hidden';
    }

    function closeSCLightbox() {
      scLightbox.classList.add('sc-lightbox--closing');
      setTimeout(() => {
        scLightbox.setAttribute('hidden', '');
        scLightbox.classList.remove('sc-lightbox--closing');
        document.body.style.overflow = '';
      }, 260);
    }

    document.querySelectorAll('.service-card').forEach(card => {
      const img   = card.querySelector('img');
      const title = card.querySelector('h3');
      if (!img || !title) return;
      const wrap  = card.querySelector('.service-card-img');
      wrap.style.cursor = 'zoom-in';
      wrap.addEventListener('click', e => {
        e.preventDefault();
        e.stopPropagation();
        openSCLightbox(img.src, img.alt, title.textContent);
      });
    });

    // About teaser photo
    const aboutTeaserWrap = document.querySelector('.about-teaser-img');
    if (aboutTeaserWrap) {
      const atImg = aboutTeaserWrap.querySelector('img');
      aboutTeaserWrap.style.cursor = 'zoom-in';
      aboutTeaserWrap.addEventListener('click', e => {
        e.preventDefault();
        openSCLightbox(atImg.src, atImg.alt, 'Cesar Guilfarro — Longhorn Hardscape & Construction');
      });
    }

    // Gallery items
    document.querySelectorAll('.gallery-item').forEach(item => {
      const img = item.querySelector('img');
      if (!img) return;
      item.style.cursor = 'zoom-in';
      item.addEventListener('click', e => {
        e.preventDefault();
        openSCLightbox(img.src, img.alt, img.alt);
      });
    });

    lbClose.addEventListener('click', closeSCLightbox);
    lbBackdrop.addEventListener('click', closeSCLightbox);
    document.addEventListener('keydown', e => {
      if (e.key === 'Escape' && !scLightbox.hasAttribute('hidden')) closeSCLightbox();
    });
  }

  /* ----------------------------------------------------------
     11. ABOUT TEASER PARALLAX
  ---------------------------------------------------------- */
  const aboutTeaserImg = document.querySelector('.about-teaser-img img');
  if (aboutTeaserImg) {
    window.addEventListener('scroll', () => {
      const rect   = aboutTeaserImg.closest('.about-teaser-img').getBoundingClientRect();
      const center = rect.top + rect.height / 2 - window.innerHeight / 2;
      aboutTeaserImg.style.transform = `translateY(${center * 0.08}px)`;
    }, { passive: true });
  }

  // Projects filter
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card[data-category]');
  if (filterBtns.length && projectCards.length) {
    filterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        filterBtns.forEach(b => { b.classList.remove('is-active'); b.setAttribute('aria-selected', 'false'); });
        btn.classList.add('is-active');
        btn.setAttribute('aria-selected', 'true');
        const filter = btn.dataset.filter;
        projectCards.forEach(card => {
          card.style.display = (filter === 'all' || card.dataset.category === filter) ? '' : 'none';
        });
      });
    });
  }

})();
