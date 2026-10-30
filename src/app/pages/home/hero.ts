import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { IMG } from '../../core/content';
import { SITE } from '../../core/site.config';
import { Icon } from '../../shared/icon';

@Component({
  selector: 'app-hero',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink, Icon],
  template: `
    <section id="inicio" class="bg-glow relative -mt-20 overflow-hidden pt-28 pb-20 md:pt-36 md:pb-28">
      <div class="page grid items-center gap-14 lg:grid-cols-12 lg:gap-10">
        <div class="animate-fade-up space-y-7 lg:col-span-7">
          <p class="eyebrow border border-clay-500/20 bg-clay-100 text-clay-600 normal-case tracking-normal">
            <span class="relative flex size-2.5">
              <span class="absolute inline-flex size-full animate-ping rounded-full bg-clay-500 opacity-60"></span>
              <span class="relative inline-flex size-2.5 rounded-full bg-clay-500"></span>
            </span>
            Hola, soy {{ site.therapistShort }} Vera · {{ site.role }}
          </p>

          <h1 class="heading-xl text-ink">
            Sana tus raíces, <em class="text-clay-600">reconecta</em> con tu poder y transforma tu historia.
          </h1>

          <p class="lead max-w-2xl">
            Te acompaño a soltar la sobrecarga emocional y sanar heridas profundas con psicoterapia basada en evidencia,
            regulación somática y círculos vivenciales femeninos en la naturaleza.
          </p>

          <ul class="flex flex-wrap gap-2" aria-label="Especialidades">
            @for (chip of chips; track chip.label) {
              <li class="chip"><app-icon [name]="chip.icon" [size]="16" [class]="chip.color" /> {{ chip.label }}</li>
            }
          </ul>

          <dl class="grid max-w-xl grid-cols-3 gap-2 sm:gap-3">
            @for (stat of stats; track stat.label) {
              <div class="card min-w-0 px-2 py-4 text-center sm:p-4 sm:text-left">
                <dt class="sr-only">{{ stat.label }}</dt>
                <dd class="font-display text-xl font-bold sm:text-2xl md:text-3xl" [class]="stat.color">{{ stat.value }}</dd>
                <dd class="mt-1 text-[11px] leading-snug font-semibold text-muted sm:text-xs">{{ stat.label }}</dd>
              </div>
            }
          </dl>

          <div class="flex flex-col gap-3 sm:flex-row">
            <a routerLink="/" fragment="proximas-fechas" class="btn-sunset h-14 px-8 text-base">
              Ver próximos retiros <app-icon name="arrowRight" />
            </a>
            <a routerLink="/agendar" class="btn-outline h-14 px-7 text-base">
              <app-icon name="calendar" /> Agendar cita
            </a>
          </div>
        </div>

        <div class="relative mx-auto w-full max-w-md lg:col-span-5">
          <div class="absolute -top-10 -right-8 -z-0 size-72 rounded-full bg-clay-100 blur-3xl" aria-hidden="true"></div>
          <div class="absolute -bottom-10 -left-8 -z-0 size-72 rounded-full bg-leaf-100 blur-3xl" aria-hidden="true"></div>

          <!-- La foto va dentro de un arco, como el logo: el espacio seguro. -->
          <figure class="relative overflow-hidden rounded-t-[999px] rounded-b-[2.5rem] border-[6px] border-surface bg-surface-muted shadow-lift">
            <img
              [src]="img.hero"
              alt="Psicóloga Nathalie Vera, fundadora de EspacioVital"
              width="560"
              height="700"
              fetchpriority="high"
              class="aspect-[4/5] w-full object-cover object-top"
            />
            <div class="absolute inset-0 bg-gradient-to-t from-leaf-900/80 via-leaf-900/10 to-transparent"></div>
            <figcaption class="absolute right-6 bottom-6 left-6 text-white">
              <span class="mb-2 inline-block rounded-full border border-white/25 bg-white/15 px-3 py-1 text-[11px] font-bold tracking-wide uppercase backdrop-blur-md">
                Fundadora de EspacioVital
              </span>
              <p class="font-display text-2xl font-semibold">{{ site.therapist }}</p>
              <p class="text-sm text-white/85">Psicología clínica · Terapia somática · Retiros</p>
            </figcaption>
          </figure>

          <!-- En celular y tableta van debajo de la foto (flotando le tapaban la cara); en escritorio flotan a los lados. -->
          <div class="relative mt-5 grid grid-cols-2 gap-3 lg:static lg:mt-0 lg:block">
            <div class="card flex flex-col items-start gap-2 px-4 py-3 sm:flex-row sm:items-center sm:gap-3 lg:animate-float lg:absolute lg:top-16 lg:-left-12">
              <span class="flex size-10 shrink-0 items-center justify-center rounded-xl bg-leaf-100 text-leaf-700"><app-icon name="brain" /></span>
              <span>
                <span class="block text-sm font-bold">Psicóloga colegiada</span>
                <span class="block text-xs text-muted">Práctica ética y compasiva</span>
              </span>
            </div>
            <div class="card flex flex-col items-start gap-2 px-4 py-3 [animation-delay:-3s] sm:flex-row sm:items-center sm:gap-3 lg:animate-float lg:absolute lg:-right-8 lg:-bottom-6">
              <span class="flex size-10 shrink-0 items-center justify-center rounded-full bg-clay-100 text-clay-600"><app-icon name="users" /></span>
              <span>
                <span class="block text-sm font-bold">Círculos vivenciales</span>
                <span class="block text-xs font-semibold text-clay-600">Retiro Metamorfosis</span>
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  `,
})
export class Hero {
  protected readonly site = SITE;
  protected readonly img = IMG;
  protected readonly chips = [
    { icon: 'badgeCheck', label: 'Psicóloga clínica colegiada', color: 'text-leaf-700' },
    { icon: 'leaf', label: 'Terapia femenina y somática', color: 'text-clay-600' },
    { icon: 'sparkles', label: 'Facilitadora de Metamorfosis', color: 'text-honey-600' },
    { icon: 'smile', label: 'Atención infanto-juvenil', color: 'text-lilac-600' },
  ];
  protected readonly stats = [
    { value: '+150', label: 'Mujeres acompañadas', color: 'text-leaf-700' },
    { value: '100 %', label: 'Confidencial y seguro', color: 'text-clay-600' },
    { value: 'Clínico', label: 'Enfoque compasivo', color: 'text-lilac-600' },
  ];
}
