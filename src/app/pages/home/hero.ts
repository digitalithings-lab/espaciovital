import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { IMG } from '../../core/content';
import { SITE } from '../../core/site.config';
import { Icon } from '../../shared/icon';

// Portada: una sola idea (máx. 4 elementos de texto) y la foto en el arco del logo.
// Credenciales y cifras van en la franja de abajo, no aquí.
@Component({
  selector: 'app-hero',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink, Icon],
  template: `
    <section id="inicio" class="relative -mt-[72px] overflow-hidden pt-[72px]">
      <!-- Plano de color de marca detrás de la foto (sin degradados de colores). -->
      <div class="pointer-events-none absolute inset-y-0 right-0 hidden w-[44%] bg-forest-50 lg:block" aria-hidden="true"></div>

      <div class="page relative grid items-center gap-12 pt-10 pb-16 lg:min-h-[calc(100dvh-72px)] lg:grid-cols-12 lg:gap-8 lg:pt-6 lg:pb-12">
        <div class="animate-fade-up lg:col-span-6">
          <p class="eyebrow mb-6">Psicología clínica · Panamá y en línea</p>
          <h1 class="heading-xl text-ink">Un espacio seguro para <span class="em-brand">volver a ti.</span></h1>
          <p class="lead mt-6 max-w-[46ch]">
            Terapia individual, retiros para mujeres y acompañamiento infantil con la {{ site.therapist }}.
          </p>
          <div class="mt-9 flex flex-col gap-3 sm:flex-row">
            <a routerLink="/agendar" class="btn-primary h-14 px-8 text-base">
              Agendar cita <app-icon name="arrowRight" [size]="18" />
            </a>
            <a routerLink="/" fragment="retiro" class="btn-outline h-14 px-7 text-base">Conocer el retiro</a>
          </div>
        </div>

        <div class="relative mx-auto w-full max-w-[26rem] lg:col-span-5 lg:col-start-8 lg:max-w-none">
          <!-- La foto va dentro de un arco, como el logo: el espacio seguro. -->
          <figure class="relative overflow-hidden rounded-t-[999px] rounded-b-3xl bg-surface-muted shadow-lift">
            <img
              [src]="img.hero"
              alt="Psicóloga Nathalie Vera, fundadora de EspacioVital"
              width="560"
              height="700"
              fetchpriority="high"
              class="aspect-[4/5] w-full object-cover object-top"
            />
            <div class="absolute inset-x-0 bottom-0 h-2/5 bg-gradient-to-t from-forest-900/85 to-transparent"></div>
            <figcaption class="absolute right-6 bottom-6 left-6 text-white">
              <p class="font-display text-xl font-medium">{{ site.therapist }}</p>
              <p class="text-sm text-white/80">Fundadora de EspacioVital</p>
            </figcaption>
          </figure>
        </div>
      </div>
    </section>

    <!-- Franja de confianza, debajo de la portada (no dentro). -->
    <section aria-label="Credenciales" class="border-y border-line bg-surface">
      <dl class="page grid grid-cols-2 lg:grid-cols-4 lg:divide-x lg:divide-line">
        @for (item of trust; track item.label; let i = $index) {
          <div class="flex items-center gap-3 py-6 lg:px-6" [class.lg:pl-0]="i === 0">
            <app-icon [name]="item.icon" [size]="24" class="text-forest-500" />
            <div>
              <dt class="font-display text-lg leading-tight font-semibold">{{ item.value }}</dt>
              <dd class="text-sm text-muted">{{ item.label }}</dd>
            </div>
          </div>
        }
      </dl>
    </section>
  `,
})
export class Hero {
  protected readonly site = SITE;
  protected readonly img = IMG;
  protected readonly trust = [
    { icon: 'badgeCheck', value: 'Colegiada', label: 'Psicóloga clínica' },
    { icon: 'users', value: '+150', label: 'Mujeres acompañadas' },
    { icon: 'lock', value: '100 %', label: 'Confidencial' },
    { icon: 'video', value: 'Presencial', label: 'y por videollamada' },
  ];
}
