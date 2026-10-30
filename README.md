# EspacioVital · Frontend

Sitio de la Psic. Nathalie Vera (psicología clínica, Retiro Metamorfosis y Metamorfosis Kids).
Angular 22 + Tailwind CSS 4, **pre-renderizado** (cada página sale como HTML listo para Google).

## Comandos

```bash
npm install
npm start          # desarrollo en http://localhost:4200
npm run build      # genera dist/espaciovital/browser (HTML estático + JS)
```

## Dónde cambiar las cosas

| Qué | Archivo |
|---|---|
| WhatsApp, correo, Instagram, horario, dominio, URL del backend | `src/app/core/site.config.ts` |
| Retiros (fechas, cupos), programas Kids, galería, testimonios, preguntas | `src/app/core/content.ts` |
| Fotos (hoy son las de la referencia) | `IMG` en `src/app/core/content.ts` → mejor en `public/img/` en WebP |
| Colores, tipografías y regla de bordes | `src/styles.css` (paleta bosque + un solo acento naranja, claro y oscuro) |
| Título, descripción y datos estructurados de Google | `src/app/pages/home/home.ts` y `core/seo.service.ts` |
| Sitemap y robots | `public/sitemap.xml`, `public/robots.txt` (cambia el dominio) |

## Conectar el backend

- **Formulario de contacto:** pon la URL en `SITE.apiUrl`. El sitio hará `POST {apiUrl}/contact` con este cuerpo
  (`ContactRequest` en `core/models.ts`):

  ```json
  { "name": "", "email": "", "phone": "", "interest": "terapia | retiro | kids | otro", "message": "", "consent": true }
  ```

  Responde `2xx` si se guardó. Sin `apiUrl`, el formulario abre WhatsApp con el mensaje armado.
- **Retiros y demás contenido:** los tipos de `core/models.ts` son el contrato; tu API puede devolver esas mismas formas.
- Las ediciones de retiro ya pasadas se ocultan solas (`endDate`).

## Publicar en Vercel

`vercel.json` ya está listo: comando `npm run build` y carpeta `dist/espaciovital/browser`.

## Antes de lanzar

- [ ] Número de WhatsApp, correo e Instagram reales en `site.config.ts`.
- [ ] Dominio final en `site.config.ts`, `sitemap.xml` y `robots.txt`.
- [ ] Fotos propias (las de la referencia son temporales).
- [ ] Revisar los textos legales (`src/app/pages/legal.ts`) con un profesional.
- [ ] Dar de alta el sitio en Google Search Console y enviar el sitemap.
