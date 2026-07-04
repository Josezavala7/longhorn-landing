# Longhorn Hardscape & Construction — Landing Page Design

## Contexto

Landing page nueva para Longhorn Hardscape & Construction (Missouri City, TX / Greater Houston), negocio de un amigo del cliente. El sitio actual (longhornhctexas.com, hecho en GoDaddy Website Builder) se ve genérico y el dueño no está satisfecho. Se construye desde cero, sin copiar el diseño viejo, pero reutilizando el logo, la información real del negocio y las fotos reales de proyectos ya existentes.

## Objetivo

Landing page de una sola página (scroll + nav ancla), moderna, fluida, premium — que el dueño perciba como un salto de calidad real frente a la versión anterior. Bilingüe (inglés por defecto, con toggle a español).

## Stack técnico

HTML/CSS/JS estático puro. Sin frameworks, sin build step, sin dependencias externas (sin CDN de fuentes/iconos de terceros — todo self-hosted o inline SVG). Elegido porque es un sitio de un solo negocio sin necesidad de backend; prioriza velocidad de carga y hosting simple (Netlify, Vercel, cPanel, etc.).

```
longhorn-landing/
├── index.html
├── css/style.css
├── js/main.js          — nav, smooth scroll, scroll-reveal, contador animado
├── js/i18n.js           — diccionario ES/EN + función de traducción por data-i18n
└── assets/
    ├── logo.png
    └── gallery/          — fotos reales curadas y optimizadas (WebP + fallback JPG)
```

## Identidad visual

**Paleta** (extraída del logo original — cráneo de longhorn en gradiente cobre/bronce sobre negro):

| Uso | Color |
|---|---|
| Fondo principal | `#0a0a0a` → `#141210` (negro cálido, no plano) |
| Acento primario (bronce/cobre) | Gradiente `#B8763E → #D9B68C` |
| Acento secundario (cobre oscuro, hovers/bordes) | `#8B5A2B` |
| Texto principal | `#F5F0E8` (blanco cálido) |
| Texto secundario | `#A8A199` (gris piedra cálido) |
| Superficie de cards | `#1C1916`, borde `#2A251F` |

Los valores exactos se afinan durante la implementación contra el logo original (`assets/logo.png`).

**Tipografía:** serif elegante para títulos (línea Playfair Display o similar, self-hosted, coherente con la tipografía del logo) + sans-serif limpia para cuerpo (Inter o system-ui stack).

**Mood:** fotos a pantalla completa con overlay oscuro sutil, espacio negativo generoso, líneas doradas finas como acentos decorativos, transiciones suaves. Objetivo: sensación de "constructora boutique de alto nivel en Texas", no plantilla genérica.

## Contenido real a reutilizar

Extraído del sitio actual (páginas Home, About, Areas We Serve, Gallery):

- **Negocio:** Longhorn Hardscape & Construction — construcción y hardscaping residencial/comercial, Missouri City TX, área de Houston.
- **Fundador:** Cesar Guifarro (co-fundador), 5+ años de experiencia.
- **Valores:** compasión, consistencia, trabajo duro, honestidad, respeto. Tagline: "Our Commitment To Excellence Is Set In Stone!"
- **Servicios:** césped artificial, concreto, drenajes, cercas, fogatas, hardscaping, iluminación de paisaje, cocinas exteriores, pintura, pavers, terrazas de piscina, instalación de roca, spray decks, stepping stones, travertino, xeriscaping.
- **Zonas servidas (10 ciudades reales):** Alvin, Cypress, Fulshear, Katy, Manvel, Missouri City, Pearland, Richmond, Rosenberg, Sugar Land — "Greater Houston" en general.
- **Contacto:** 346-551-8340 (llamar/texto), info@longhornhctx.com, 6140 Highway 6, Suite 3116, Missouri City, TX 77459, horario 9am–5pm.
- **Financiamiento:** la página actual solo dice "coming soon" sin socio real → se omite por completo en la nueva landing (decisión del cliente, para no prometer algo sin contenido real). Se puede retomar cuando exista un socio financiero concreto.

## Banco de fotos reales (22 imágenes extraídas de la galería del sitio actual)

Curadas por calidad y relevancia temática:

**Destacadas (hero / portafolio principal):**
- Backyard con piscina + putting green + pérgola + travertino, atardecer — candidata a **hero**
- Muro de fogata de piedra con llamas encendidas, atardecer
- Patio circular de fogata con pavers en espiga
- Patrón geométrico de césped sintético + pavers (diseño moderno)
- Patio de travertino en diamante
- Patio herringbone con césped sintético, cielo despejado
- Putting greens con banderas rojas junto a alberca (2 variantes)

**De apoyo (galería secundaria / proceso):**
- Instalaciones de césped sintético en proceso (varias)
- Pasarela de pavers/stepping stones
- Trabajo de pintura comercial (fachada blanco/negro con arcos) — sirve para mostrar el servicio de pintura
- Dos proyectos comerciales grandes (edificio de apartamentos con elevador, clínica médica) — prueba de capacidad en proyectos comerciales de escala

**Descartadas:** fotos repetidas del mismo edificio médico desde ángulos similares, y la foto simple de stepping stones sobre grava (no aporta valor visual).

## Mapa de secciones (una sola página, nav ancla)

1. **Header fijo** — logo, nav (Inicio, Servicios, Galería, Nosotros, Zonas, Contacto), botón de llamar, toggle idioma EN/ES. Se vuelve sólido/blur al hacer scroll.
2. **Hero** — foto de fondo (backyard piscina+putting green+pérgola), overlay oscuro, titular + subtítulo, CTAs "Llamar/Texear" y "Ver Portafolio".
3. **Franja de confianza** — 3-4 stats/valores rápidos (años de experiencia, área servida, proyectos, etc.) con contador animado.
4. **Servicios** — grid de tarjetas con ícono + foto de fondo real cuando aplique, cubriendo todos los servicios listados arriba.
5. **Galería/Portafolio** — grid o carrusel con las fotos destacadas curadas.
6. **Nosotros** — foto + texto sobre Cesar Guifarro y los valores del negocio.
7. **Zonas que servimos** — las 10 ciudades reales en layout visual (lista con iconos o mapa simple).
8. **CTA final + Contacto** — teléfono grande y clickeable, dirección, horario, nota breve de financiamiento disponible a solicitud (sin sección dedicada), formulario simple (nombre/teléfono/email/mensaje).
9. **Footer** — logo, redes sociales, copyright, enlaces ancla.

**CTA principal en todo el sitio:** llamar/texear al 346-551-8340 (botón con peso visual dominante en header, hero y contacto).

## Bilingüe (EN por defecto, toggle a ES)

Todo el texto vive en un diccionario JS (`js/i18n.js`), cada elemento marcado con `data-i18n="clave"`. El toggle cambia `textContent`/atributos vía JS sin recargar la página, con transición suave de opacidad. Inglés es el idioma que carga por defecto; la preferencia del usuario se recuerda en `localStorage`.

## Interacciones y animaciones

- Scroll-reveal (fade + slide sutil) por sección/card vía Intersection Observer.
- Nav sólido/blur al hacer scroll, resalta sección activa, smooth scroll al navegar.
- Hero con parallax sutil en la imagen de fondo + entrada de texto escalonada.
- Cards de servicios/galería: hover con zoom sutil de imagen + elevación.
- Botón de llamar con pulso/glow sutil (constante pero no molesto).
- Contador animado en la franja de confianza.
- Todo con CSS transitions/keyframes + JS vanilla — sin librerías de animación externas.

## Testing / verificación

- Revisión visual en navegador (desktop y mobile) de cada sección.
- Verificar toggle de idioma en todas las secciones (sin textos huérfanos sin traducir).
- Verificar que el botón de llamar funcione como `tel:` link en mobile.
- Verificar formulario de contacto (validación básica de campos, sin backend — puede usar `mailto:` o servicio de formularios estático como Formspree si el cliente lo desea más adelante).
- Lighthouse/PageSpeed rápido para confirmar performance (imágenes optimizadas, sin bloqueos de render).
