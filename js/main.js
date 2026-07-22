document.addEventListener('DOMContentLoaded', () => {
  const header = document.getElementById('site-header');
  const mobileCta = document.querySelector('.mobile-cta-bar');
  const hero = document.querySelector('.hero');
  const onScroll = () => {
    header.classList.toggle('is-scrolled', window.scrollY > 40);
  };
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });

  if (mobileCta && hero) {
    const heroObserver = new IntersectionObserver(
      ([entry]) => {
        mobileCta.classList.toggle('mobile-cta-bar--hidden', entry.isIntersecting);
      },
      { threshold: 0.1 }
    );
    heroObserver.observe(hero);
  }

  const navToggle = document.getElementById('nav-toggle');
  const nav = document.getElementById('site-nav');
  navToggle.addEventListener('click', () => {
    const isOpen = nav.classList.toggle('is-open');
    navToggle.setAttribute('aria-expanded', String(isOpen));
  });
  nav.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      nav.classList.remove('is-open');
      navToggle.setAttribute('aria-expanded', 'false');
    });
  });

  const heroBgWrap = document.getElementById('hero-bg-wrap');
  if (heroBgWrap) {
    const onHeroScroll = () => {
      const offset = Math.min(window.scrollY * 0.3, 160);
      heroBgWrap.style.transform = `translateY(${offset}px)`;
    };
    onHeroScroll();
    window.addEventListener('scroll', onHeroScroll, { passive: true });
  }

  const counters = document.querySelectorAll('.counter');
  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      const el = entry.target;
      const target = Number(el.dataset.target);
      const duration = 1200;
      const start = performance.now();
      function tick(now) {
        const progress = Math.min((now - start) / duration, 1);
        el.textContent = Math.floor(progress * target);
        if (progress < 1) requestAnimationFrame(tick);
        else el.textContent = String(target);
      }
      requestAnimationFrame(tick);
      counterObserver.unobserve(el);
    });
  }, { threshold: 0.5 });
  counters.forEach((el) => counterObserver.observe(el));


  const contactForm = document.getElementById('contact-form');
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const data = new FormData(contactForm);
    const name = data.get('name');
    const phone = data.get('phone');
    const email = data.get('email');
    const message = data.get('message');
    const subject = encodeURIComponent(`New project inquiry from ${name}`);
    const body = encodeURIComponent(`Name: ${name}\nPhone: ${phone}\nEmail: ${email}\n\n${message}`);
    window.location.href = `mailto:info@longhornhctx.com?subject=${subject}&body=${body}`;
  });

  // Service card lightbox
  const scLightbox = document.getElementById('scLightbox');
  if (scLightbox) {
    const lbImg     = scLightbox.querySelector('.sc-lightbox__img');
    const lbCaption = scLightbox.querySelector('.sc-lightbox__caption');
    const lbClose   = scLightbox.querySelector('.sc-lightbox__close');
    const lbBackdrop = scLightbox.querySelector('.sc-lightbox__backdrop');

    function openLightbox(src, alt, caption) {
      lbImg.style.opacity = '0';
      lbImg.alt = alt;
      lbCaption.textContent = caption;
      scLightbox.removeAttribute('hidden');
      document.body.style.overflow = 'hidden';
      const onLoaded = () => {
        lbImg.style.transition = 'opacity 0.2s ease';
        lbImg.style.opacity = '1';
        lbImg.removeEventListener('load', onLoaded);
      };
      lbImg.addEventListener('load', onLoaded);
      lbImg.src = src;
      if (lbImg.complete && lbImg.naturalWidth > 0) onLoaded();
    }

    function closeLightbox() {
      scLightbox.classList.add('sc-lightbox--closing');
      setTimeout(() => {
        scLightbox.setAttribute('hidden', '');
        scLightbox.classList.remove('sc-lightbox--closing');
        document.body.style.overflow = '';
      }, 260);
    }

    document.querySelectorAll('.service-card').forEach(card => {
      const img = card.querySelector('img');
      const title = card.querySelector('h3');
      if (!img || !title) return;
      const wrap = card.querySelector('.service-card-img');
      wrap.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        openLightbox(img.src, img.alt, title.textContent);
      });
    });

    // Gallery grid lightbox
    document.querySelectorAll('.gallery-item').forEach(item => {
      const img = item.querySelector('img');
      if (!img) return;
      item.addEventListener('click', () => openLightbox(img.src, img.alt, ''));
    });

    lbClose.addEventListener('click', closeLightbox);
    lbBackdrop.addEventListener('click', closeLightbox);
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && !scLightbox.hasAttribute('hidden')) closeLightbox();
    });
  }

  // Reveal animations handled by GSAP ScrollTrigger in assets/js/animations.js
});
