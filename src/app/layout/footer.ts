import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { RETREATS } from '../core/content';
import { SERVICE_PAGES } from '../core/services';
import { SITE, whatsappLink } from '../core/site.config';
import { Icon } from '../shared/icon';
import { Logo } from '../shared/logo';

@Component({
  selector: 'app-footer',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink, Icon, Logo],
  template: `
    <footer class="layer z-[55] bg-surface-muted pt-20 pb-28 sm:pb-10">
      <div class="page">
        <div class="grid gap-10 border-b border-line pb-12 md:grid-cols-2 lg:grid-cols-6">
          <div class="space-y-5 lg:col-span-2">
            <app-logo [size]="44" [tagline]="true" />
            <p class="max-w-sm text-sm leading-relaxed text-muted">
              Acompañamiento psicológico individual, talleres socioemocionales para niños y actividades recreativas para mujeres que desean socializar y priorizarse.
            </p>
            <div class="flex items-center gap-2">
              <a class="icon-btn size-10" [href]="whatsapp" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp">
                <app-icon name="message" [size]="18" />
              </a>
              <a class="icon-btn size-10" [href]="site.instagram" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                <app-icon name="instagram" [size]="18" />
              </a>
              <a class="icon-btn size-10" [href]="'mailto:' + site.email" aria-label="Correo">
                <app-icon name="mail" [size]="18" />
              </a>
            </div>
          </div>

          <nav aria-labelledby="pie-navegacion">
            <p id="pie-navegacion" class="mb-4 text-xs font-extrabold tracking-[0.14em] uppercase">Navegación</p>
            <ul class="space-y-0.5 text-sm text-muted">
              @for (link of links; track link.id) {
                <li><a routerLink="/" [fragment]="link.id" class="inline-block py-3 transition-colors hover:text-forest-700 sm:py-1">{{ link.label }}</a></li>
              }
            </ul>
          </nav>

          <nav aria-labelledby="pie-servicios">
            <p id="pie-servicios" class="mb-4 text-xs font-extrabold tracking-[0.14em] uppercase">Servicios</p>
            <ul class="space-y-0.5 text-sm text-muted">
              @for (service of services; track service.slug) {
                <li><a [routerLink]="'/' + service.slug" class="inline-block py-3 transition-colors hover:text-forest-700 sm:py-1">{{ service.navLabel }}</a></li>
              }
            </ul>
          </nav>

          <nav aria-labelledby="pie-programas">
            <p id="pie-programas" class="mb-4 text-xs font-extrabold tracking-[0.14em] uppercase">Programas</p>
            <ul class="space-y-0.5 text-sm text-muted">
              <li><a routerLink="/" fragment="espacio-kids" class="inline-block py-3 transition-colors hover:text-forest-700 sm:py-1">Vital Kids</a></li>
              <li><a routerLink="/" fragment="sobre-mi" class="inline-block py-3 transition-colors hover:text-forest-700 sm:py-1">Atención psicológica</a></li>
              @for (edition of retreats; track edition.id) {
                <li><a routerLink="/" fragment="proximas-fechas" class="inline-block py-3 transition-colors hover:text-forest-700 sm:py-1">{{ edition.name }}</a></li>
              }
            </ul>
          </nav>

          <div>
            <p class="mb-4 text-xs font-extrabold tracking-[0.14em] uppercase">Contacto</p>
            <ul class="space-y-3 text-sm text-muted">
              <li class="flex gap-2.5"><app-icon name="mapPin" [size]="18" class="mt-0.5 text-forest-700" /> Presencial en {{ site.city }} ({{ site.region }}) y en línea en todo Panamá</li>
              <li class="flex gap-2.5"><app-icon name="clock" [size]="18" class="mt-0.5 text-forest-700" /> {{ site.hours }}</li>
              <li class="flex gap-2.5"><app-icon name="lock" [size]="18" class="mt-0.5 text-forest-700" /> Confidencialidad y secreto profesional</li>
            </ul>
          </div>
        </div>

        <div class="flex flex-col items-center justify-between gap-4 pt-8 text-xs text-muted sm:flex-row">
          <p>© {{ year }} {{ site.name }} · {{ site.therapist }}. Todos los derechos reservados.</p>
          <div class="flex flex-wrap items-center justify-center gap-x-6 gap-y-0 [&_a]:py-3 sm:[&_a]:py-0">
            <a routerLink="/privacidad" class="inline-block py-3 transition-colors hover:text-forest-700 sm:py-1">Política de privacidad</a>
            <a routerLink="/terminos" class="inline-block py-3 transition-colors hover:text-forest-700 sm:py-1">Términos y condiciones</a>
            <span>Hecho por <span class="font-bold text-ink">digitalithings</span></span>
          </div>
        </div>
      </div>
    </footer>
  `,
})
export class Footer {
  protected readonly site = SITE;
  protected readonly retreats = RETREATS;
  protected readonly services = SERVICE_PAGES;
  protected readonly year = new Date().getFullYear();
  protected readonly whatsapp = whatsappLink(`Hola ${SITE.therapistShort}, me gustaría recibir información.`);
  protected readonly links = [
    { id: 'sobre-mi', label: 'Sobre mí' },
    { id: 'testimonios', label: 'Testimonios' },
    { id: 'retiro', label: 'Actividades Metamorfosis' },
    { id: 'galeria', label: 'Galería' },
    { id: 'contacto', label: 'Contacto' },
    { id: 'preguntas', label: 'Preguntas frecuentes' },
  ];
}
