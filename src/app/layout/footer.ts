import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { RETREATS } from '../core/content';
import { SITE, whatsappLink } from '../core/site.config';
import { Icon } from '../shared/icon';
import { Logo } from '../shared/logo';

@Component({
  selector: 'app-footer',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink, Icon, Logo],
  template: `
    <footer class="border-t border-line bg-surface-muted pt-16 pb-28 sm:pb-10">
      <div class="page">
        <div class="grid gap-10 border-b border-line pb-12 md:grid-cols-2 lg:grid-cols-5">
          <div class="space-y-5 lg:col-span-2">
            <app-logo [size]="44" [tagline]="true" />
            <p class="max-w-sm text-sm leading-relaxed text-muted">
              Acompañamiento psicoterapéutico individual, talleres socioemocionales para niños y retiros vivenciales para mujeres
              que eligen priorizarse, sanar y renacer.
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
            <ul class="space-y-2.5 text-sm text-muted">
              @for (link of links; track link.id) {
                <li><a routerLink="/" [fragment]="link.id" class="transition-colors hover:text-leaf-700">{{ link.label }}</a></li>
              }
            </ul>
          </nav>

          <nav aria-labelledby="pie-programas">
            <p id="pie-programas" class="mb-4 text-xs font-extrabold tracking-[0.14em] uppercase">Programas</p>
            <ul class="space-y-2.5 text-sm text-muted">
              <li><a routerLink="/" fragment="espacio-kids" class="transition-colors hover:text-leaf-700">Metamorfosis Kids</a></li>
              <li><a routerLink="/" fragment="sobre-mi" class="transition-colors hover:text-leaf-700">Terapia individual</a></li>
              @for (edition of retreats; track edition.id) {
                <li><a routerLink="/" fragment="proximas-fechas" class="transition-colors hover:text-leaf-700">{{ edition.name }}</a></li>
              }
            </ul>
          </nav>

          <div>
            <p class="mb-4 text-xs font-extrabold tracking-[0.14em] uppercase">Contacto</p>
            <ul class="space-y-3 text-sm text-muted">
              <li class="flex gap-2.5"><app-icon name="mapPin" [size]="18" class="mt-0.5 text-leaf-700" /> Consultas presenciales en {{ site.country }} y en línea</li>
              <li class="flex gap-2.5"><app-icon name="clock" [size]="18" class="mt-0.5 text-leaf-700" /> {{ site.hours }}</li>
              <li class="flex gap-2.5"><app-icon name="lock" [size]="18" class="mt-0.5 text-leaf-700" /> Confidencialidad clínica garantizada</li>
            </ul>
          </div>
        </div>

        <div class="flex flex-col items-center justify-between gap-4 pt-8 text-xs text-muted sm:flex-row">
          <p>© {{ year }} {{ site.name }} · {{ site.therapist }}. Todos los derechos reservados.</p>
          <div class="flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
            <a routerLink="/privacidad" class="transition-colors hover:text-leaf-700">Política de privacidad</a>
            <a routerLink="/terminos" class="transition-colors hover:text-leaf-700">Términos y condiciones</a>
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
  protected readonly year = new Date().getFullYear();
  protected readonly whatsapp = whatsappLink(`Hola ${SITE.therapistShort}, me gustaría recibir información.`);
  protected readonly links = [
    { id: 'sobre-mi', label: 'Sobre mí' },
    { id: 'retiro', label: 'Retiro Metamorfosis' },
    { id: 'galeria', label: 'Galería' },
    { id: 'testimonios', label: 'Testimonios' },
    { id: 'preguntas', label: 'Preguntas frecuentes' },
    { id: 'contacto', label: 'Contacto' },
  ];
}
