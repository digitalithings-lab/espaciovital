import { RenderMode, ServerRoute } from '@angular/ssr';

// Cada página pública se genera como HTML al compilar: rápida y legible para Google.
export const serverRoutes: ServerRoute[] = [
  { path: '', renderMode: RenderMode.Prerender },
  { path: 'privacidad', renderMode: RenderMode.Prerender },
  { path: 'terminos', renderMode: RenderMode.Prerender },
  { path: '**', renderMode: RenderMode.Client },
];
