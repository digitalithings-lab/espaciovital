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
    <section class="layer z-[54] bg-surface pt-4 pb-24 md:pb-32" aria-labelledby="cta-titulo">
      <div class="page">
        <div appReveal class="relative grid gap-10 overflow-hidden rounded-[2.5rem] rounded-tr-[7rem] bg-forest-900 px-7 py-14 text-white md:px-14 md:py-20 lg:grid-cols-12 lg:items-center">
          <div class="pointer-events-none absolute -top-12 -right-12 size-36 rounded-full bg-accent/90 lg:top-auto lg:-right-24 lg:-bottom-32 lg:size-72" aria-hidden="true"></div>
          <div class="relative lg:col-span-7">
            <h2 id="cta-titulo" class="heading-lg">¿Listo/a para dar <span class="font-semibold text-accent">el primer paso?</span></h2>
            <p class="mt-5 max-w-[52ch] text-lg leading-relaxed text-white/85">
              Elige el día y la hora que más te convenga en la agenda digital.
            </p>
          </div>
          <div class="relative flex flex-col gap-3 sm:flex-row lg:col-span-5 lg:justify-end">
            <a routerLink="/agendar" class="btn-primary h-14 px-8 text-base">
              Agendar cita <app-icon name="arrowRight" [size]="18" />
            </a>
            <a routerLink="/" fragment="proximas-fechas" class="btn-outline-light h-14 px-7 text-base">Ver fechas</a>
          </div>
        </div>
      </div>
    </section>
  `,
})
export class FinalCta {
  protected readonly site = SITE;
}
