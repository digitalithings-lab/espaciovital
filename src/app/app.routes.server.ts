import { RenderMode, ServerRoute } from '@angular/ssr';

// Cada página pública se genera como HTML al compilar: rápida y legible para Google.
export const serverRoutes: ServerRoute[] = [
  { path: '', renderMode: RenderMode.Prerender },
  { path: 'en', renderMode: RenderMode.Prerender },
  { path: 'agendar', renderMode: RenderMode.Prerender },
  { path: 'privacidad', renderMode: RenderMode.Prerender },
  { path: 'terminos', renderMode: RenderMode.Prerender },
  { path: 'psicologa-en-la-chorrera', renderMode: RenderMode.Prerender },
  { path: 'atencion-de-pareja-panama-oeste', renderMode: RenderMode.Prerender },
  { path: 'psicologia-virtual-panama', renderMode: RenderMode.Prerender },
  { path: 'psicologia-infantil-la-chorrera', renderMode: RenderMode.Prerender },
  { path: '**', renderMode: RenderMode.Client },
];
