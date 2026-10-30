import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', loadComponent: () => import('./pages/home/home').then((m) => m.Home) },
  { path: 'privacidad', data: { kind: 'privacidad' }, loadComponent: () => import('./pages/legal').then((m) => m.Legal) },
  { path: 'terminos', data: { kind: 'terminos' }, loadComponent: () => import('./pages/legal').then((m) => m.Legal) },
  { path: '**', loadComponent: () => import('./pages/not-found').then((m) => m.NotFound) },
];
