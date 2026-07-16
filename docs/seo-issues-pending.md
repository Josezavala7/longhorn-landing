# SEO Issues Pendientes — Longhorn Hardscape
_Auditoría corrida: 2026-07-15 | Score promedio: 81% (26 páginas)_

---

## CRÍTICOS — Google penaliza esto directamente

### Thin Content (contenido delgado bajo 500 palabras)
Google desvaloriza páginas con poco texto — las puede excluir del índice o bajarlas de ranking.

| Página | Palabras actuales | Meta |
|--------|------------------|------|
| `projects.html` | 86 palabras | 500+ |
| `blog.html` | 182 palabras | 500+ |
| `contact.html` | 107 palabras | 500+ |
| `about.html` | 298 palabras | 500+ |
| `custom-stonework-houston.html` | 271 palabras | 500+ |
| `landscaping-cypress.html` | 264 palabras | 500+ |
| `landscaping-fort-bend.html` | 275 palabras | 500+ |
| `landscaping-katy.html` | 289 palabras | 500+ |
| `landscaping-manvel.html` | 263 palabras | 500+ |
| `landscaping-pearland.html` | 271 palabras | 500+ |
| `landscaping-richmond.html` | 274 palabras | 500+ |
| `landscaping-rosenberg.html` | 270 palabras | 500+ |
| `landscaping-sienna.html` | 282 palabras | 500+ |

**Nota especial:** Las 8 páginas `landscaping-[ciudad]` además de ser thin content, tienen texto casi idéntico entre sí → riesgo de penalización por contenido duplicado.

---

## ALTOS — Afectan CTR y rankings locales

### 1. Sin `AggregateRating` schema (estrellas en Google)
**Afecta:** Todas las páginas de servicios  
**Impacto:** Las estrellas ⭐ en los resultados de búsqueda aumentan el CTR 15–30%.  
**Fix:** Agregar bloque `AggregateRating` dentro del JSON-LD de `LocalBusiness` en cada página:
```json
"aggregateRating": {
  "@type": "AggregateRating",
  "ratingValue": "5.0",
  "reviewCount": "47",
  "bestRating": "5",
  "worstRating": "1"
}
```

### 2. Sin `FAQPage` schema (rich snippets / featured snippets)
**Afecta:** Páginas que ya tienen sección FAQ pero sin schema:
- `fire-features-houston.html`
- `pergolas-houston.html`
- `patio-covers-houston.html`
- `painting-houston.html`
- (y las que se agreguen)

**Fix:** Agregar bloque JSON-LD tipo `FAQPage` con las preguntas/respuestas de la página.

### 3. Títulos demasiado largos (>65 caracteres, Google los corta)
| Página | Título actual | Longitud |
|--------|--------------|----------|
| `fire-features-houston.html` | Fire Features Houston TX \| Fire Pits & Fire Bowls — Longhorn Hardscape | 70 chars |
| Revisar otras con el audit | — | — |

**Fix:** Recortar a máximo 60 caracteres manteniendo keyword principal.

### 4. Meta descriptions muy largas (>165 caracteres)
- `fire-features-houston.html`: 167 chars (se trunca en Google)
- Revisar resto con audit detallado

---

## MEDIOS — Oportunidades de mejora

### 5. Imágenes sin alt text o con alt vacío
**Afecta:** Varias páginas tienen 1 imagen con `alt=""` vacío  
**Fix:** Agregar texto descriptivo con keyword local: `alt="fire pit installation Houston TX backyard"`

### 6. Imágenes sin `width` y `height` explícitos
**Afecta:** Varias páginas  
**Impacto:** Causa layout shift → CLS (Cumulative Layout Shift) alto → factor de ranking en móvil  
**Fix:** Agregar `width="800" height="600"` (o las dimensiones reales) a cada `<img>`

### 7. `index.html` con solo 427 palabras
La página principal está cerca del límite (500) pero debería tener más texto para el keyword principal "Hardscape Contractors Houston TX".

### 8. Sin FAQ en `index.html`
La homepage sin FAQ pierde oportunidad de aparecer como featured snippet para queries generales.

---

## BAJOS — Nice to have

### 9. Sin `sitemap.xml`
Crear y subir a Google Search Console para que Google descubra todas las páginas.

### 10. Sin `robots.txt`
Crear archivo básico apuntando al sitemap.

---

## Páginas en buen estado (88–96%)

Estas páginas están bien — solo les falta AggregateRating schema:
- `artificial-turf-houston.html` — 88%
- `driveway-contractor-houston.html` — 88%
- `landscaping-houston.html` — 88%
- `landscaping-missouri-city.html` — 88%
- `landscaping-sugar-land.html` — 88%
- `outdoor-kitchen-houston.html` — 88%
- `outdoor-living-spaces-houston.html` — 88%
- `patio-installation-houston.html` — 96% ⭐ (mejor página del sitio)

---

## Plan de ataque recomendado (orden de impacto)

1. **AggregateRating schema** en las 10+ páginas principales → estrellas en Google inmediatas
2. **FAQPage schema** en páginas con FAQ → featured snippets
3. **Contenido thin**: Expandir las 8 páginas `landscaping-[ciudad]` con copy único por ciudad (mencionar landmarks, colonias, distancias desde Houston)
4. **`about.html`** y **`custom-stonework-houston.html`**: Expandir a 500+ palabras
5. **Títulos largos**: Recortar los que pasan 60 chars
6. **`sitemap.xml`** y **`robots.txt`**: Crear y subir a Search Console
7. **Alt text** en imágenes vacías + agregar width/height

---

_Herramienta: `.claude/skills/claude-seo/scripts/audit.py`_  
_Re-correr con: `py .claude/skills/claude-seo/scripts/audit.py --summary`_
