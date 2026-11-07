import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { IMG } from '../../core/content';
import { SITE } from '../../core/site.config';
import { Icon } from '../../shared/icon';

// Portada «Metamorfosis»: burgundy a pantalla completa, el arco del logo como puerta,
// y tres caminos de igual peso (terapia, actividades, niños) en bloques de color.
@Component({
  selector: 'app-hero',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink, Icon],
  template: `
    <section id="inicio" class="relative -mt-[72px] overflow-hidden bg-forest-900 pt-[72px] text-white">
      <!-- Formas orgánicas de la paleta. -->
      <div class="pointer-events-none absolute -top-24 -left-24 size-72 rounded-full bg-forest-500/40 blur-3xl" aria-hidden="true"></div>
      <div class="pointer-events-none absolute top-0 right-0 hidden h-[78%] w-[42%] rounded-bl-[12rem] bg-forest-500 lg:block" aria-hidden="true"></div>

      <div class="page relative grid items-end gap-10 pt-10 pb-14 sm:pt-14 lg:grid-cols-12 lg:gap-8 lg:pt-16 lg:pb-20">
        <div class="animate-fade-up lg:col-span-7 lg:pb-6">
          <h1 class="font-display text-[2.75rem] leading-[1.02] font-bold tracking-tight min-[400px]:text-[3.25rem] md:text-7xl lg:text-[5.5rem]">
            Bienvenido/a a tu espacio de
            <span class="mt-1 block font-semibold text-forest-100 italic">Bienestar y Sanación.</span>
          </h1>
          <p class="mt-7 max-w-[46ch] text-base leading-relaxed text-white/80 md:text-lg">
            Atención psicológica individual y de pareja, presencial en Panamá Oeste (La Chorrera) y virtual para todo Panamá. Dar el primer paso también es una forma de priorizarte.
          </p>
          <div class="mt-8 flex flex-col gap-3 sm:flex-row">
            <a routerLink="/agendar" class="btn-primary min-h-14 px-8 text-base">
              Agendar cita <app-icon name="arrowRight" [size]="18" />
            </a>
            <a routerLink="/" fragment="retiro" class="btn-outline-light min-h-14 px-7 py-3 text-base">Conocer actividades Metamorfosis</a>
          </div>
          <p class="mt-6 flex items-center gap-2 text-sm text-white/65">
            <app-icon name="mapPin" [size]="16" class="shrink-0 text-accent" />
            Psicología presencial en La Chorrera y en línea para todo Panamá
          </p>
        </div>

        <div class="relative mx-auto w-full max-w-[20rem] sm:max-w-[24rem] lg:col-span-5 lg:max-w-none">
          <div class="pointer-events-none absolute -top-6 -right-4 z-0 size-28 rounded-full bg-accent sm:size-36" aria-hidden="true"></div>

          <figure class="relative z-10">
            <div class="relative overflow-hidden rounded-t-[999px] rounded-b-[2rem] shadow-lift">
              <img
                [src]="img.hero"
                srcset="/img/nathalie-vera-560.webp 560w, /img/nathalie-vera-934.webp 934w"
                sizes="(min-width: 1024px) 34vw, (min-width: 640px) 24rem, 20rem"
                alt="Psicóloga Nathalie Vera, fundadora de EspacioVital"
                width="934"
                height="1400"
                fetchpriority="high"
                class="aspect-[4/5] w-full object-cover object-[50%_12%]"
              />
              <div class="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-forest-900/90 to-transparent"></div>
              <figcaption class="absolute right-5 bottom-5 left-5">
                <p class="font-display text-xl font-semibold">{{ site.therapist }}</p>
                <p class="text-sm text-white/80">Fundadora de EspacioVital y Metamorfosis</p>
              </figcaption>
            </div>

            <div class="mt-4 flex flex-wrap items-center gap-3 sm:contents">
              <div class="flex w-fit items-center gap-2 rounded-full bg-white py-2 pr-4 pl-3 text-forest-900 shadow-lift sm:absolute sm:top-16 sm:-left-6 sm:z-20">
                <app-icon name="badgeCheck" [size]="20" class="text-forest-500" />
                <span class="text-sm font-bold">Psicóloga general idónea</span>
              </div>
              <div class="w-fit rounded-2xl bg-accent px-4 py-2.5 text-forest-900 shadow-lift sm:absolute sm:-right-5 sm:bottom-24 sm:z-20">
                <p class="font-display text-2xl leading-none font-bold">+1500</p>
                <p class="mt-1 text-xs font-bold">Vidas acompañadas</p>
              </div>
            </div>
          </figure>
        </div>
      </div>

      <!-- Tres caminos, el mismo peso. -->
      <nav class="page relative pb-14 lg:pb-20" aria-label="Elige tu camino">
        <ul class="grid gap-3 md:grid-cols-3 md:gap-4">
          @for (path of paths; track path.title) {
            <li>
              <a
                [routerLink]="path.link"
                [fragment]="path.fragment"
                class="group flex min-h-32 items-end justify-between gap-4 rounded-[2rem] p-6 transition-[transform,box-shadow] duration-200 ease-[cubic-bezier(0.23,1,0.32,1)] hover:-translate-y-1 hover:shadow-lift active:scale-[0.98] md:min-h-48 md:flex-col md:items-start md:justify-between"
                [class]="path.tone"
              >
                <span>
                  <span class="block text-sm font-semibold opacity-80">{{ path.hint }}</span>
                  <span class="mt-1 block font-display text-2xl leading-tight font-bold md:text-3xl">{{ path.title }}</span>
                </span>
                <span class="flex size-12 shrink-0 items-center justify-center rounded-full bg-forest-900 text-white transition-transform duration-200 ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:translate-x-1 md:self-end">
                  <app-icon name="arrowRight" [size]="20" />
                </span>
              </a>
            </li>
          }
        </ul>
      </nav>
    </section>

    <!-- Ritmo visual entre portada y sobre-mí. -->
    <div class="overflow-hidden bg-accent py-4" aria-hidden="true">
      <div class="flex items-center whitespace-nowrap" style="animation: marquee 28s linear infinite">
        @for (item of ticker; track item) {
          <span class="mx-8 text-xs font-extrabold uppercase tracking-[0.18em] text-forest-900">{{ item }}</span>
          <span class="size-1.5 shrink-0 rounded-full bg-forest-900/40"></span>
        }
        @for (item of ticker; track item) {
          <span class="mx-8 text-xs font-extrabold uppercase tracking-[0.18em] text-forest-900">{{ item }}</span>
          <span class="size-1.5 shrink-0 rounded-full bg-forest-900/40"></span>
        }
      </div>
    </div>

    <!-- Franja de confianza. -->
    <section aria-label="Credenciales" class="bg-background pb-10">
      <dl class="page grid grid-cols-2 gap-x-4 lg:grid-cols-4 lg:divide-x lg:divide-line">
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
  protected readonly paths = [
    { hint: 'Individual y de pareja', title: 'Atención psicológica', link: '/agendar', fragment: undefined, tone: 'bg-forest-100 text-forest-900' },
    { hint: 'Actividades para chicas', title: 'Metamorfosis', link: '/', fragment: 'retiro', tone: 'bg-accent text-forest-900' },
    { hint: 'Talleres socioemocionales', title: 'Vital Kids', link: '/', fragment: 'espacio-kids', tone: 'bg-forest-500 text-white' },
  ];
  protected readonly trust = [
    { icon: 'badgeCheck', value: 'Idonea', label: 'Psicóloga general' },
    { icon: 'users', value: '+1500', label: 'Vidas acompañadas' },
    { icon: 'lock', value: '100 %', label: 'Confidencial' },
    { icon: 'video', value: 'Presencial', label: 'y Virtual' },
  ];
  protected readonly ticker = [
    'Psicología General',
    'Atención individual',
    'Actividades para Chicas',
    'Vital Kids',
    'Bienestar emocional',
    'Presencial en La Chorrera',
    'En línea en todo Panamá',
    'Acompañamiento terapéutico',
    'Círculos de palabra',
  ];
}
