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
      trust: { years: 'Years Experience', cities: 'Cities Served', local: 'Locally Owned', estimates: 'Estimates' },
      services: {
        sectionTitle: 'Our Services',
        items: {
          turf: { title: 'Artificial Turf', desc: 'Lush, low-maintenance synthetic grass that stays green year-round — perfect for yards, pet areas, and putting greens.' },
          hardscaping: { title: 'Hardscaping & Pavers', desc: 'Custom paver patios, walkways, and driveways built to handle Texas heat and last for decades.' },
          concrete: { title: 'Concrete Work', desc: 'Durable stamped and broom-finish concrete for patios, slabs, and driveways, poured and finished with precision.' },
          drainage: { title: 'Drainage Solutions', desc: 'French drains, grading, and channel systems that keep water moving away from your home and foundation.' },
          fence: { title: 'Fence Replacement', desc: 'Wood, iron, and privacy fencing installed or replaced to secure your property and boost curb appeal.' },
          firepits: { title: 'Fire Pits', desc: 'Custom stone and paver fire pits that turn any backyard into a gathering place after dark.' },
          lighting: { title: 'Landscape Lighting', desc: 'Low-voltage lighting design that highlights your hardscape and keeps your outdoor space usable after sunset.' },
          kitchens: { title: 'Outdoor Kitchens', desc: 'Built-in grills, counters, and storage designed for real Texas entertaining, rain or shine.' },
          painting: { title: 'Painting', desc: 'Interior and exterior painting for homes and commercial properties, finished clean and on schedule.' },
          pooldecking: { title: 'Pool Decking', desc: 'Slip-resistant travertine and paver decking that keeps pool areas cool, safe, and stunning.' },
          rock: { title: 'Rock Installation', desc: 'Decorative rock and gravel beds for low-maintenance landscaping that still looks sharp year-round.' },
          spraydeck: { title: 'Spray Decks', desc: 'Textured spray deck coatings that resurface tired concrete with a cool-touch, non-slip finish.' },
          steppingstones: { title: 'Stepping Stones', desc: 'Natural stone and paver stepping paths that guide guests through your landscape in style.' },
          travertine: { title: 'Travertine', desc: 'Elegant travertine patios and pool surrounds that bring a natural, upscale finish to any outdoor space.' },
          xeriscaping: { title: 'Xeriscaping', desc: 'Drought-tolerant landscape design that saves water without sacrificing curb appeal.' },
        },
      },
      gallery: { sectionTitle: 'Our Work', sectionSubtitle: 'Real projects, real Houston backyards.' },
      about: {
        heading: 'Our Commitment to Excellence Is Set in Stone',
        body: 'Longhorn Hardscape & Construction is a locally owned and operated company serving homeowners and businesses across Greater Houston. Co-founded by Cesar Guifarro, our team brings over 5 years of hands-on experience in construction and hardscaping to every project. We build on five core values — compassion, consistency, hard work, honesty, and respect — and we back every job with high-quality workmanship, on-time completion, and a budget you can count on.',
        founder: 'Cesar Guifarro — Co-Founder',
      },
      areas: {
        sectionTitle: 'Proudly Serving Greater Houston',
        sectionSubtitle: 'From Katy to Pearland, we bring the same quality and care to every job site.',
      },
      contact: {
        heading: "Let's Build Something Solid",
        subtitle: 'Call or text us today for a free consultation — we usually respond within the hour.',
        emailLabel: 'Email:', addressLabel: 'Address:', hoursLabel: 'Hours:',
        hoursValue: 'Mon–Fri, 9:00 AM – 5:00 PM',
        financingNote: 'Ask us about flexible payment options for your project.',
        form: { name: 'Name', phone: 'Phone', email: 'Email', message: 'Message', submit: 'Send Message', hint: 'Opens your email app to send us the details.' },
      },
      footer: {
        tagline: 'Our Commitment to Excellence Is Set in Stone!',
        copyright: '© 2026 Longhorn Hardscape & Construction. All rights reserved.',
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
      trust: { years: 'Años de Experiencia', cities: 'Ciudades Atendidas', local: 'De Propiedad Local', estimates: 'Estimaciones Gratis' },
      services: {
        sectionTitle: 'Nuestros Servicios',
        items: {
          turf: { title: 'Césped Sintético', desc: 'Césped sintético exuberante y de bajo mantenimiento que se mantiene verde todo el año — ideal para patios, mascotas y greens de golf.' },
          hardscaping: { title: 'Hardscaping y Pavers', desc: 'Patios, andadores y entradas de pavers a la medida, construidos para resistir el calor de Texas y durar décadas.' },
          concrete: { title: 'Trabajo en Concreto', desc: 'Concreto estampado y de acabado escobillado, duradero para patios, losas y entradas, vaciado y terminado con precisión.' },
          drainage: { title: 'Soluciones de Drenaje', desc: 'Drenajes franceses, nivelación y sistemas de canales que mantienen el agua alejada de tu casa y cimientos.' },
          fence: { title: 'Reemplazo de Cercas', desc: 'Cercas de madera, hierro y privacidad instaladas o reemplazadas para asegurar tu propiedad y mejorar su apariencia.' },
          firepits: { title: 'Fogatas', desc: 'Fogatas de piedra y pavers a la medida que convierten cualquier patio en un lugar de reunión al anochecer.' },
          lighting: { title: 'Iluminación de Paisaje', desc: 'Diseño de iluminación de bajo voltaje que resalta tu hardscape y mantiene tu espacio exterior utilizable después del atardecer.' },
          kitchens: { title: 'Cocinas Exteriores', desc: 'Parrillas empotradas, mostradores y almacenamiento diseñados para el verdadero entretenimiento texano, llueva o truene.' },
          painting: { title: 'Pintura', desc: 'Pintura interior y exterior para casas y propiedades comerciales, con acabado limpio y a tiempo.' },
          pooldecking: { title: 'Terrazas de Piscina', desc: 'Decks de travertino y pavers antideslizantes que mantienen las áreas de piscina frescas, seguras y espectaculares.' },
          rock: { title: 'Instalación de Roca', desc: 'Camas de roca decorativa y grava para un paisajismo de bajo mantenimiento que se ve impecable todo el año.' },
          spraydeck: { title: 'Spray Decks', desc: 'Recubrimientos texturizados de spray deck que renuevan concreto desgastado con un acabado antideslizante y fresco al tacto.' },
          steppingstones: { title: 'Piedras de Paso', desc: 'Caminos de piedra natural y pavers que guían a tus invitados a través del paisaje con estilo.' },
          travertine: { title: 'Travertino', desc: 'Elegantes patios de travertino y contornos de piscina que aportan un acabado natural y de lujo a cualquier espacio exterior.' },
          xeriscaping: { title: 'Xeriscaping', desc: 'Diseño de paisajismo tolerante a la sequía que ahorra agua sin sacrificar la belleza de tu propiedad.' },
        },
      },
      gallery: { sectionTitle: 'Nuestro Trabajo', sectionSubtitle: 'Proyectos reales, patios reales de Houston.' },
      about: {
        heading: 'Nuestro Compromiso con la Excelencia Está Grabado en Piedra',
        body: 'Longhorn Hardscape & Construction es una empresa de propiedad y operación local que atiende a propietarios y negocios en toda el área de Houston. Cofundada por Cesar Guifarro, nuestro equipo aporta más de 5 años de experiencia práctica en construcción y hardscaping a cada proyecto. Construimos sobre cinco valores fundamentales — compasión, consistencia, trabajo duro, honestidad y respeto — y respaldamos cada trabajo con mano de obra de calidad, cumplimiento de plazos y un presupuesto en el que puedes confiar.',
        founder: 'Cesar Guifarro — Cofundador',
      },
      areas: {
        sectionTitle: 'Sirviendo con Orgullo al Área de Houston',
        sectionSubtitle: 'Desde Katy hasta Pearland, llevamos la misma calidad y cuidado a cada obra.',
      },
      contact: {
        heading: 'Construyamos Algo Sólido',
        subtitle: 'Llámanos o textéanos hoy para una consulta gratis — normalmente respondemos en menos de una hora.',
        emailLabel: 'Correo:', addressLabel: 'Dirección:', hoursLabel: 'Horario:',
        hoursValue: 'Lun–Vie, 9:00 AM – 5:00 PM',
        financingNote: 'Pregúntanos por opciones de pago flexibles para tu proyecto.',
        form: { name: 'Nombre', phone: 'Teléfono', email: 'Correo', message: 'Mensaje', submit: 'Enviar Mensaje', hint: 'Abre tu app de correo para enviarnos los detalles.' },
      },
      footer: {
        tagline: '¡Nuestro Compromiso con la Excelencia Está Grabado en Piedra!',
        copyright: '© 2026 Longhorn Hardscape & Construction. Todos los derechos reservados.',
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
