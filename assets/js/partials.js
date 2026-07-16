/* ============================================================
   LONGHORN — HTML PARTIALS LOADER
   Injects shared header/footer and re-initializes nav behaviors.
   Loaded with defer so DOM is ready when it runs.
   ============================================================ */
(function () {
  'use strict';

  /* Derive the site root from this script's src attribute */
  const scriptEl = document.querySelector('script[src*="partials.js"]');
  const base = scriptEl
    ? scriptEl.src.replace(/assets\/js\/partials\.js.*$/, '')
    : '/';

  /* Read optional variant flag from the placeholder element */
  const headerPlaceholder = document.getElementById('site-header-placeholder');
  const isTransparent = headerPlaceholder
    ? headerPlaceholder.dataset.variant === 'transparent'
    : false;

  function initHeader() {
    /* Sticky header scroll state */
    const header = document.querySelector('.site-header');
    if (header) {
      if (isTransparent) header.classList.remove('site-header--solid');
      const onScroll = () => header.classList.toggle('is-scrolled', window.scrollY > 40);
      window.addEventListener('scroll', onScroll, { passive: true });
      onScroll();
    }

    /* Mobile nav accordions */
    document.querySelectorAll('.mobile-nav-accordion').forEach(btn => {
      btn.addEventListener('click', () => {
        const isOpen = btn.getAttribute('aria-expanded') === 'true';
        document.querySelectorAll('.mobile-nav-accordion').forEach(b => {
          b.setAttribute('aria-expanded', 'false');
          b.nextElementSibling.classList.remove('is-open');
        });
        if (!isOpen) {
          btn.setAttribute('aria-expanded', 'true');
          btn.nextElementSibling.classList.add('is-open');
        }
      });
    });

    /* Mobile nav toggle */
    const hamburger = document.querySelector('.hamburger');
    const mobileNav = document.querySelector('.mobile-nav');
    if (hamburger && mobileNav) {
      hamburger.addEventListener('click', () => {
        const isOpen = hamburger.classList.toggle('is-open');
        mobileNav.classList.toggle('is-open', isOpen);
        hamburger.setAttribute('aria-expanded', isOpen);
        document.body.style.overflow = isOpen ? 'hidden' : '';
      });
      mobileNav.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
          hamburger.classList.remove('is-open');
          mobileNav.classList.remove('is-open');
          hamburger.setAttribute('aria-expanded', 'false');
          document.body.style.overflow = '';
        });
      });
      document.addEventListener('keydown', e => {
        if (e.key === 'Escape' && mobileNav.classList.contains('is-open')) {
          hamburger.classList.remove('is-open');
          mobileNav.classList.remove('is-open');
          hamburger.setAttribute('aria-expanded', 'false');
          document.body.style.overflow = '';
        }
      });
    }

    /* Active nav link highlighting */
    const currentPath = window.location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('.nav-link[href], .mobile-nav-links a[href]').forEach(link => {
      const linkPath = link.getAttribute('href').split('/').pop();
      if (linkPath === currentPath) link.classList.add('is-active');
    });
  }

  Promise.all([
    fetch(base + 'partials/header.html').then(r => r.text()),
    fetch(base + 'partials/footer.html').then(r => r.text()),
  ]).then(function (results) {
    var headerHTML = results[0];
    var footerHTML = results[1];

    var hEl = document.getElementById('site-header-placeholder');
    if (hEl) hEl.outerHTML = headerHTML;

    var fEl = document.getElementById('site-footer-placeholder');
    if (fEl) fEl.outerHTML = footerHTML;

    /* Inject lightbox if not already present */
    if (!document.getElementById('scLightbox')) {
      var lb = document.createElement('div');
      lb.innerHTML = '<div class="sc-lightbox" id="scLightbox" role="dialog" aria-modal="true" aria-label="Photo viewer" hidden><div class="sc-lightbox__backdrop"></div><div class="sc-lightbox__panel"><button class="sc-lightbox__close" aria-label="Close">&times;</button><img class="sc-lightbox__img" src="" alt=""><p class="sc-lightbox__caption"></p></div></div>';
      document.body.appendChild(lb.firstElementChild);
    }

    initHeader();
  }).catch(function (err) {
    console.warn('Partials failed to load:', err);
  });

}());
