/* ============================================================
   LONGHORN — GSAP ANIMATIONS
   Loaded after GSAP + ScrollTrigger via partials.js
   ============================================================ */
(function () {
  'use strict';

  if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') return;

  gsap.registerPlugin(ScrollTrigger);

  /* Respect prefers-reduced-motion */
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReduced) {
    /* Just make everything visible instantly — no animation */
    document.querySelectorAll('.reveal').forEach(function (el) {
      el.classList.add('is-visible');
    });
    return;
  }

  /* ── 1. Section headers — title then subtitle in sequence ── */
  gsap.utils.toArray('.section-header').forEach(function (header) {
    var h = header.querySelector('h2, h3');
    var p = header.querySelector('p');
    var tl = gsap.timeline({
      scrollTrigger: { trigger: header, start: 'top 87%', once: true }
    });
    if (h) tl.fromTo(h,
      { opacity: 0, y: 28 },
      { opacity: 1, y: 0, duration: 0.65, ease: 'power3.out', clearProps: 'transform' }
    );
    if (p) tl.fromTo(p,
      { opacity: 0, y: 18 },
      { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out', clearProps: 'transform' },
      '-=0.38'
    );
  });

  /* ── 2a. Mobile service cards — zigzag left/right entrance ── */
  var hTrackMobile = document.querySelector('.services-hscroll-track');
  if (hTrackMobile && window.innerWidth <= 768) {
    hTrackMobile.querySelectorAll('.service-card').forEach(function (card, i) {
      gsap.fromTo(card,
        { opacity: 0, x: i % 2 === 0 ? -42 : 42 },
        {
          opacity: 1, x: 0,
          duration: 1.0,
          ease: 'power2.out',
          clearProps: 'transform',
          scrollTrigger: { trigger: card, start: 'top 93%', once: true }
        }
      );
    });
  }

  /* ── 2b. Horizontal scroll — services section (desktop only) ── */
  var hTrack = document.querySelector('.services-hscroll-track');
  if (hTrack && window.innerWidth > 768) {
    /* Create the horizontal tween — .scrollTrigger gives us the ST instance */
    var hTween = gsap.to(hTrack, {
      x: function () { return -(hTrack.scrollWidth - window.innerWidth + 80); },
      ease: 'none',
      scrollTrigger: {
        trigger: '#services',
        start: 'top 80px',
        end: function () { return '+=' + (hTrack.scrollWidth - window.innerWidth + 80); },
        pin: true,
        pinSpacing: true,
        scrub: 1.2,
        anticipatePin: 1,
        invalidateOnRefresh: true,
      }
    });

    /* Zoom each card image as it crosses the viewport during horizontal scroll */
    var hST = hTween.scrollTrigger;
    hTrack.querySelectorAll('.service-card-img img').forEach(function (img) {
      gsap.fromTo(img,
        { scale: 1.15 },
        {
          scale: 1,
          ease: 'none',
          scrollTrigger: {
            trigger: img.closest('.service-card'),
            containerAnimation: hST,
            start: 'left right',
            end: 'right left',
            scrub: true,
          }
        }
      );
    });
  }

  /* ── 3. Cards — staggered batch entrance ─────────────────── */
  var batchSelectors = [
    '.gallery-grid .gallery-item',
    '.why-grid .why-card',
    '.trust-grid .trust-item',
    '.areas-grid .area-chip',
  ];

  batchSelectors.forEach(function (sel) {
    var els = document.querySelectorAll(sel);
    if (!els.length) return;

    ScrollTrigger.batch(sel, {
      onEnter: function (batch) {
        gsap.fromTo(batch,
          { opacity: 0, y: 36 },
          {
            opacity: 1, y: 0,
            stagger: 0.07,
            duration: 0.55,
            ease: 'power2.out',
            clearProps: 'transform'
          }
        );
      },
      once: true,
      start: 'top 91%'
    });
  });

  /* ── 3. Standalone .reveal elements (CTA banners, text blocks, etc.) ── */
  gsap.utils.toArray('.reveal').forEach(function (el) {
    /* Skip elements already handled by section-header or batch selectors */
    var skip = el.closest('.section-header') ||
               el.matches('.service-card, .gallery-item, .why-card, .trust-item, .area-chip');
    if (skip) return;

    gsap.fromTo(el,
      { opacity: 0, y: 28 },
      {
        opacity: 1, y: 0,
        duration: 0.65,
        ease: 'power2.out',
        clearProps: 'transform',
        scrollTrigger: {
          trigger: el,
          start: 'top 88%',
          once: true
        }
      }
    );
  });

  /* ── 4. Trust counters — smooth GSAP number animation ────── */
  ScrollTrigger.batch('[data-target]', {
    onEnter: function (batch) {
      batch.forEach(function (el) {
        var target = Number(el.dataset.target);
        gsap.fromTo({ val: 0 }, { val: target,
          duration: 1.6,
          ease: 'power2.out',
          onUpdate: function () {
            el.textContent = Math.floor(this.targets()[0].val);
          },
          onComplete: function () {
            el.textContent = target;
          }
        });
      });
    },
    once: true,
    start: 'top 85%'
  });

  /* ── 5. FAQ items — staggered entrance from bottom ─────── */
  gsap.utils.toArray('.faq-list').forEach(function (list) {
    var items = list.querySelectorAll('.faq-item');
    if (!items.length) return;
    gsap.fromTo(items,
      { opacity: 0, y: 24 },
      {
        opacity: 1, y: 0,
        stagger: 0.06,
        duration: 0.55,
        ease: 'power3.out',
        clearProps: 'transform',
        scrollTrigger: { trigger: list, start: 'top 88%', once: true }
      }
    );
  });

  /* ── 6. CTA banner — slight scale-up entrance ────────────── */
  gsap.utils.toArray('.cta-banner').forEach(function (el) {
    gsap.fromTo(el,
      { opacity: 0, scale: 0.97 },
      {
        opacity: 1, scale: 1,
        duration: 0.7,
        ease: 'power2.out',
        clearProps: 'transform',
        scrollTrigger: { trigger: el, start: 'top 88%', once: true }
      }
    );
  });

}());
