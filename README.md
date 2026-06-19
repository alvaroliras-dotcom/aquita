# Aquita — Sitio web (HTML estático)

Web completa de **Aplicaciones Aquita** (control de plagas, sur y oeste de Madrid).
Sitio estático, sin dependencias ni build. Listo para subir a GitHub y desplegar.

## Cómo publicarlo

**Opción A — Vercel / Netlify (recomendado):**
1. Sube TODO el contenido de esta carpeta a un repositorio de GitHub (que `index.html` quede en la raíz del repo).
2. En Vercel/Netlify: *New Project* → importa el repo → *Deploy*. Sin configuración (no hay build).
3. Apunta el dominio `aquita.es` al proyecto.

**Opción B — GitHub Pages:**
1. Sube el contenido a la raíz del repo.
2. *Settings → Pages → Deploy from branch* (`main` / `/root`).
3. Funciona directo con dominio propio `aquita.es` (las rutas son absolutas desde la raíz).

## Estructura

- Páginas como carpetas con `index.html` → URLs limpias (`/servicios/desinsectacion/`).
- `assets/css/styles.css` · `assets/js/main.js` · `assets/img/` (logos e isotipo en SVG).
- `robots.txt` y `sitemap.xml` ya incluidos (37 URLs).

## Pendientes / a revisar antes de publicar

1. **Logo**: el logo es una **recreación en SVG** a partir de la imagen de marca. Si tienes el
   logotipo original vectorial (SVG/AI) o PNG con transparencia, sustituye los archivos
   `assets/img/logo-aquita.svg`, `logo-aquita-blanco.svg` e `isotipo.svg`.
2. **Formularios**: los formularios de Contacto y Presupuesto son **demostración** (muestran un
   mensaje de éxito pero NO envían). Hay que conectarlos a un backend (Formspree, Web3Forms,
   Basin, un endpoint propio o el formulario de WordPress si migráis ahí).
3. **Reseñas**: no se han inventado testimonios. Donde el copy las pedía, se han puesto
   credenciales reales (20 años, ROESB, ANECPLA, Mapfre). Cuando el cliente facilite reseñas
   reales de Google, se añaden.
4. **Dirección postal** de la sede: solo figura el municipio (Arroyomolinos). Falta la dirección
   completa cuando el cliente la dé.
5. **Imágenes/fotos reales**: el diseño funciona con identidad de marca y SVG. Cuando haya fotos
   reales de trabajos/equipo, se integran en heros y secciones.

---
Web por El Gordo y el Flaco · Marketing Online
