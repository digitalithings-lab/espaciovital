import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { SeoService } from '../core/seo.service';
import { SITE } from '../core/site.config';
import { Logo } from '../shared/logo';

@Component({
  selector: 'app-not-found',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink, Logo],
  template: `
    <section class="page flex min-h-[70dvh] flex-col items-center justify-center py-20 text-center">
      <app-logo [size]="72" [withName]="false" />
      <h1 class="heading-lg mt-6">Esta página no existe</h1>
      <p class="lead mt-3 max-w-md">Puede que el enlace haya cambiado. Volvamos a un lugar seguro.</p>
      <a routerLink="/" class="btn-dark mt-8">Ir al inicio</a>
    </section>
  `,
})
export class NotFound {
  constructor() {
    inject(SeoService).set({ title: `Página no encontrada | ${SITE.name}`, description: SITE.description, path: '/404', noindex: true });
  }
}
