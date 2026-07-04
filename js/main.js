document.addEventListener('DOMContentLoaded', () => {
  const header = document.getElementById('site-header');
  const onScroll = () => header.classList.toggle('is-scrolled', window.scrollY > 40);
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });

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

  const heroBg = document.querySelector('.hero__bg');
  if (heroBg) {
    const onHeroScroll = () => {
      const offset = Math.min(window.scrollY * 0.3, 160);
      heroBg.style.transform = `translateY(${offset}px)`;
    };
    onHeroScroll();
    window.addEventListener('scroll', onHeroScroll, { passive: true });
  }
});
