import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { SITE } from '../../core/site.config';
import { Icon } from '../../shared/icon';
import { Reveal } from '../../shared/reveal.directive';

@Component({
  selector: 'app-final-cta',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink, Icon, Reveal],
  template: `
    <section class="section-y bg-background" aria-labelledby="cta-titulo">
      <div class="page max-w-5xl">
        <div appReveal class="bg-retreat relative overflow-hidden rounded-[2.5rem] px-6 py-14 text-center text-white shadow-lift md:px-14 md:py-20">
          <!-- El arco del logo, grande y sutil, de fondo. -->
          <svg viewBox="0 0 120 120" class="pointer-events-none absolute -bottom-16 left-1/2 w-[34rem] -translate-x-1/2 opacity-[0.07]" aria-hidden="true">
            <path d="M26 102 V58 A34 34 0 0 1 94 58 V102" fill="none" stroke="white" stroke-width="6" stroke-linecap="round" />
          </svg>
          <div class="relative mx-auto max-w-2xl space-y-6">
            <span class="inline-block rounded-full bg-white/15 px-4 py-1.5 text-xs font-bold tracking-[0.12em] uppercase backdrop-blur">Reserva tu espacio</span>
            <h2 id="cta-titulo" class="font-display text-4xl leading-tight font-semibold md:text-5xl">¿Lista para iniciar tu propia metamorfosis?</h2>
            <p class="text-lg leading-relaxed text-white/85">
              Elige el día y la hora que te queden mejor en la agenda de {{ site.therapistShort }} y da el primer paso hacia tu bienestar.
            </p>
            <div class="flex flex-col items-center justify-center gap-3 pt-2 sm:flex-row">
              <a routerLink="/agendar" class="btn h-14 w-full bg-white px-9 text-base text-leaf-900 shadow-lift hover:-translate-y-0.5 sm:w-auto">
                <app-icon name="calendar" /> Agendar cita con {{ site.therapistShort }}
              </a>
              <a routerLink="/" fragment="proximas-fechas" class="btn-ghost-light h-14 w-full px-8 text-base sm:w-auto">
                Ver todas las fechas <app-icon name="calendar" />
              </a>
            </div>
            <p class="text-xs font-semibold text-white/70">Atención personalizada · Evaluación previa · Ambiente libre de juicio</p>
          </div>
        </div>
      </div>
    </section>
  `,
})
export class FinalCta {
  protected readonly site = SITE;
}
