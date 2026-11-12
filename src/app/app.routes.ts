import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', loadComponent: () => import('./pages/home/home').then((m) => m.Home) },
  { path: 'en', loadComponent: () => import('./pages/english').then((m) => m.English) },
  { path: 'agendar', loadComponent: () => import('./pages/agendar').then((m) => m.Agendar) },
  { path: 'privacidad', data: { kind: 'privacidad' }, loadComponent: () => import('./pages/legal').then((m) => m.Legal) },
  { path: 'terminos', data: { kind: 'terminos' }, loadComponent: () => import('./pages/legal').then((m) => m.Legal) },
  { path: 'psicologa-en-la-chorrera', data: { slug: 'psicologa-en-la-chorrera' }, loadComponent: () => import('./pages/servicio').then((m) => m.Servicio) },
  // Dirección anterior: se redirige a la nueva
  { path: 'terapia-de-pareja-panama-oeste', redirectTo: 'atencion-de-pareja-panama-oeste', pathMatch: 'full' },
  { path: 'atencion-de-pareja-panama-oeste', data: { slug: 'atencion-de-pareja-panama-oeste' }, loadComponent: () => import('./pages/servicio').then((m) => m.Servicio) },
  { path: 'psicologia-virtual-panama', data: { slug: 'psicologia-virtual-panama' }, loadComponent: () => import('./pages/servicio').then((m) => m.Servicio) },
  { path: 'psicologia-infantil-la-chorrera', data: { slug: 'psicologia-infantil-la-chorrera' }, loadComponent: () => import('./pages/servicio').then((m) => m.Servicio) },
  { path: '**', loadComponent: () => import('./pages/not-found').then((m) => m.NotFound) },
];
