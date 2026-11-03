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
      <!-- Panel fúcsia sólido detrás de la foto. -->
      <div class="pointer-events-none absolute inset-y-0 right-0 hidden w-[46%] bg-forest-500 lg:block" aria-hidden="true"></div>

      <div class="page relative grid items-center gap-12 pt-12 pb-16 lg:min-h-[calc(100dvh-72px)] lg:grid-cols-12 lg:gap-8 lg:pt-8 lg:pb-12">
        <div class="animate-fade-up lg:col-span-6">
          <p class="eyebrow mb-6">Psicología en La Chorrera · Presencial y en línea para todo Panamá</p>
          <h1 class="font-display text-5xl leading-[1.02] font-bold tracking-tight text-ink md:text-6xl lg:text-7xl">
            Bienvenido/a a tu espacio de<br>
            <span class="text-forest-500 italic">Bienestar y Sanación.</span>
          </h1>
          <p class="lead mt-7 max-w-[48ch]">
            Atención psicológica, terapia individual y de pareja presencial en La Chorrera (Panamá Oeste) y virtual en todo Panamá. Dar el primer paso también es una forma de priorizarte.
          </p>
          <div class="mt-10 flex flex-col gap-3 sm:flex-row">
            <a routerLink="/agendar" class="btn-primary h-14 px-8 text-base">
              Agendar cita <app-icon name="arrowRight" [size]="18" />
            </a>
            <a routerLink="/" fragment="retiro" class="btn-outline h-14 px-7 text-base">Conocer el retiro</a>
          </div>
        </div>

        <div class="relative mx-auto w-full max-w-[26rem] lg:col-span-5 lg:col-start-8 lg:max-w-none">
          <!-- Mini foto flotante del retiro, fuera del arco, en el panel fúcsia -->
          <div class="absolute -top-8 right-4 z-10 hidden rotate-[3deg] overflow-hidden rounded-2xl bg-white p-1.5 shadow-lift lg:block" style="width: 120px;">
            <img
              src="/img/fotos/retiro-playa-ronda-640.webp"
              alt="Retiro Metamorfosis en la playa"
              width="640"
              height="480"
              loading="lazy"
              decoding="async"
              class="aspect-[4/3] w-full rounded-xl object-cover"
            />
            <p class="pt-1 pb-0.5 text-center text-[9px] font-bold uppercase tracking-widest text-forest-700">Metamorfosis</p>
          </div>

          <!-- Foto sobre el panel fúcsia: arco del logo. -->
          <figure class="relative overflow-visible">
            <!-- Badge flotante superior izquierdo, rotado -->
            <div class="absolute -top-5 -left-6 z-20 hidden rotate-[-6deg] rounded-2xl bg-white px-4 py-3 shadow-lift lg:block">
              <p class="text-[10px] font-extrabold uppercase tracking-[0.15em] text-muted">Psicóloga general</p>
              <p class="font-display text-lg font-bold text-forest-700">Idónea ✓</p>
            </div>

            <div class="relative overflow-hidden rounded-t-[999px] rounded-b-3xl shadow-lift">
              <img
                [src]="img.hero"
                srcset="/img/nathalie-vera-560.webp 560w, /img/nathalie-vera-934.webp 934w"
                sizes="(min-width: 1024px) 34vw, (min-width: 640px) 26rem, 92vw"
                alt="Psicóloga Nathalie Vera, fundadora de EspacioVital"
                width="934"
                height="1400"
                fetchpriority="high"
                class="aspect-[4/5] w-full object-cover object-[50%_12%]"
              />
              <div class="absolute inset-x-0 bottom-0 h-1/3 bg-forest-900/80"></div>
              <figcaption class="absolute right-6 bottom-6 left-6 text-white">
                <p class="font-display text-xl font-semibold">{{ site.therapist }}</p>
                <p class="text-sm text-white/80">Fundadora de EspacioVital y Metamorfosis</p>
              </figcaption>
            </div>

            <!-- Badge flotante inferior derecho, rotado -->
            <div class="absolute -right-6 -bottom-5 z-20 hidden rotate-[4deg] rounded-2xl bg-accent px-4 py-3 shadow-lift lg:block">
              <p class="text-[10px] font-extrabold uppercase tracking-[0.15em] text-forest-900/70">Vidas acompañadas</p>
              <p class="font-display text-3xl font-bold text-forest-900">+1500</p>
            </div>
          </figure>
        </div>
      </div>
    </section>

    <!-- Franja de confianza. -->
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

    <!-- Marquee ticker: ritmo visual entre hero y sobre-mí -->
    <div class="overflow-hidden bg-accent py-4" aria-hidden="true">
      <div class="flex whitespace-nowrap" style="animation: marquee 28s linear infinite">
        @for (item of ticker; track item) {
          <span class="mx-8 text-xs font-extrabold uppercase tracking-[0.18em] text-forest-900">{{ item }}</span>
          <span class="mr-8 text-forest-900/40 font-bold">✦</span>
        }
        @for (item of ticker; track item) {
          <span class="mx-8 text-xs font-extrabold uppercase tracking-[0.18em] text-forest-900">{{ item }}</span>
          <span class="mr-8 text-forest-900/40 font-bold">✦</span>
        }
      </div>
    </div>
  `,
})
export class Hero {
  protected readonly site = SITE;
  protected readonly img = IMG;
  protected readonly trust = [
    { icon: 'badgeCheck', value: 'Colegiada', label: 'Psicóloga general' },
    { icon: 'users', value: '+1500', label: 'Vidas acompañadas' },
    { icon: 'lock', value: '100 %', label: 'Confidencial' },
    { icon: 'video', value: 'Presencial', label: 'y por videollamada' },
  ];
  protected readonly ticker = [
    'Psicología General',
    'Atención individual',
    'Retiro Metamorfosis',
    'Vital Kids',
    'Bienestar emocional',
    'Presencial en La Chorrera',
    'En línea en todo Panamá',
    'Acompañamiento terapéutico',
    'Círculos de palabra',
  ];
}
