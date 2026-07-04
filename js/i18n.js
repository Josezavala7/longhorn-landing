(function () {
  const translations = {
    en: {
      nav: { home: 'Home', services: 'Services', gallery: 'Gallery', about: 'About', areas: 'Areas', contact: 'Contact' },
      header: { call: 'Call (346) 551-8340' },
      hero: {
        title: 'Elevating Your Outdoor Living Space',
        subtitle: 'Premium hardscaping & construction for Greater Houston homeowners and businesses — where entertaining takes center stage.',
        ctaCall: 'Call or Text (346) 551-8340',
        ctaGallery: 'View Our Work',
      },
    },
    es: {
      nav: { home: 'Inicio', services: 'Servicios', gallery: 'Galería', about: 'Nosotros', areas: 'Zonas', contact: 'Contacto' },
      header: { call: 'Llama (346) 551-8340' },
      hero: {
        title: 'Elevando Tu Espacio de Vida Exterior',
        subtitle: 'Hardscaping y construcción premium para propietarios y negocios del área de Houston — donde el entretenimiento es protagonista.',
        ctaCall: 'Llama o Textea (346) 551-8340',
        ctaGallery: 'Ver Nuestro Trabajo',
      },
    },
  };

  function getNested(obj, path) {
    return path.split('.').reduce((acc, key) => (acc && acc[key] !== undefined ? acc[key] : undefined), obj);
  }

  function applyLanguage(lang) {
    document.documentElement.lang = lang;
    document.body.classList.add('lang-switching');
    document.querySelectorAll('[data-i18n]').forEach((el) => {
      const value = getNested(translations[lang], el.getAttribute('data-i18n'));
      if (value !== undefined) el.textContent = value;
    });
    document.querySelectorAll('[data-i18n-placeholder]').forEach((el) => {
      const value = getNested(translations[lang], el.getAttribute('data-i18n-placeholder'));
      if (value !== undefined) el.setAttribute('placeholder', value);
    });
    localStorage.setItem('longhorn-lang', lang);
    document.querySelectorAll('.lang-toggle__option').forEach((btn) => {
      btn.classList.toggle('is-active', btn.dataset.lang === lang);
    });
    requestAnimationFrame(() => document.body.classList.remove('lang-switching'));
  }

  function initI18n() {
    const saved = localStorage.getItem('longhorn-lang');
    applyLanguage(saved === 'es' ? 'es' : 'en');
    document.querySelectorAll('.lang-toggle__option').forEach((btn) => {
      btn.addEventListener('click', () => applyLanguage(btn.dataset.lang));
    });
  }

  window.LonghornI18N = { translations, applyLanguage, initI18n, getNested };
  document.addEventListener('DOMContentLoaded', initI18n);
})();
