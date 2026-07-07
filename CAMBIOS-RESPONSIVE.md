# Aquita — Auditoría y arreglo responsive

Fecha: 6 julio 2026
Alcance: revisión completa del comportamiento responsive del sitio (40 páginas)
con foco en el menú móvil, que no se desplegaba.

---

## 1. El problema del menú (causa raíz)

El menú móvil "no se desplegaba como debía": al pulsar la hamburguesa el panel
apenas asomaba, aplastado a la altura de la cabecera.

**Causa:** la cabecera tenía `backdrop-filter: blur(12px)`. En CSS, cualquier
`filter` o `backdrop-filter` convierte al elemento en **bloque contenedor de sus
descendientes `position:fixed`**. El panel del menú (`.nav-links`, que es `fixed`)
dejaba de anclarse al viewport y pasaba a anclarse a la cabecera (~80 px de alto),
así que `inset:0 0 0 auto` lo dejaba con la altura de la cabecera en vez de la de
la pantalla. De ahí que "no se desplegara".

No era un problema del JavaScript ni de la hamburguesa: era este atrapamiento.

---

## 2. Qué se ha cambiado (solo 2 archivos + limpieza)

### `assets/css/styles.css` — dentro de `@media (max-width:1024px)`
- `.site-header { backdrop-filter:none; background:#fff }` → se quita el filtro en
  móvil/tablet (donde se usa el drawer). El panel vuelve a resolverse contra el
  viewport y ocupa toda la altura. **Este es el arreglo de fondo.**
- `body.menu-open { overflow:hidden }` → bloquea el scroll del fondo con el menú
  abierto.
- `body.menu-open .site-header { z-index:100 }` → sube el header por encima del
  overlay (90) al abrir, para que el menú y la hamburguesa queden sobre el fondo
  oscuro y la barra inferior (`.mobile-cta`, z-index 70).
- `.nav-links { z-index:2 }` y `.burger { z-index:3 }` → orden interno para que la
  "X" siga pulsable sobre el panel.
- El overlay pasa a `z-index:90`.

### `assets/js/main.js` — bloque del menú
- `aria-expanded` en la hamburguesa (accesibilidad): pasa a `true/false` al
  abrir/cerrar.
- Cierre con la tecla **Escape**.
- Cierre al tocar el **fondo oscuro** (overlay).
- Se conserva: tocar un enlace normal cierra el menú; tocar un apartado con
  submenú NO lo cierra (deja ver el submenú, que en móvil va desplegado).
- Red de seguridad: si alguna página no trajera el overlay, se crea solo.

### Limpieza
- Eliminados `assets/js/rubenz.js` y `assets/css/rubenz.css`: ficheros muertos que
  no cargaba ninguna página (duplicaban el menú y podían confundir en el futuro).

---

## 3. Resto de la auditoría responsive (revisado, sin cambios necesarios)

- **Meta viewport**: presente y correcto en las 40 páginas.
- **Imágenes**: regla base `img,svg { max-width:100% }` → no desbordan.
- **Desbordamiento horizontal**: sin `100vw`, sin anchos fijos en contenido, sin
  tablas. Los adornos decorativos grandes (`.bg-crema::before`, `.faldon::before`)
  ya van con `overflow:hidden` en su contenedor → no producen scroll lateral.
- **Mapa**: `iframe.map-frame` es `width:100%` con alto reducido en móvil.
- **Rejillas**: colapsan a 1 columna en `<=680px` (grids, formularios, footer, steps).
- **Barra CTA inferior** (llamar / WhatsApp) en `<=680px`: presente en las 40 páginas.
- **Submenús en móvil**: se muestran desplegados (estáticos), no dependen de hover.

---

## 4. Cómo se ha verificado

- **Lógica del menú (jsdom, navegador simulado sobre el HTML real):** 11/11
  comprobaciones OK — abre con la hamburguesa, `aria-expanded` correcto, cierra con
  overlay, cierra con Escape, cierra con enlace normal, no cierra con apartado de
  submenú.
- **Orden de apilado (z-index) verificado sobre el CSS real:**
  con el menú abierto → header(100) > overlay(90) > barra inferior(70) > página.
- **Cadena de ancestros del panel:** limpia tras quitar el `backdrop-filter`
  (ningún `transform`/`filter`/`will-change` la vuelve a atrapar).
- **Sintaxis JS**: `node --check` OK.

### Lo que NO se ha podido probar aquí (dilo claro)
No había navegador real disponible en el entorno, así que **no hay capturas de un
render real**. La causa y el arreglo son deterministas y están verificados por
lógica y por el modelo del navegador, pero conviene una **comprobación final en tu
móvil** (o en el navegador con las herramientas de desarrollador, vista móvil):
abrir la hamburguesa en la home y en una interior, comprobar que el panel ocupa
toda la pantalla, que el fondo se oscurece, y que se cierra al tocar fuera / con la X.
