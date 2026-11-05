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
    <section class="pb-20 md:pb-28" aria-labelledby="cta-titulo">
      <div class="page">
        <div appReveal class="grid gap-10 rounded-3xl bg-forest-900 px-7 py-12 text-white md:px-14 md:py-16 lg:grid-cols-12 lg:items-center">
          <div class="lg:col-span-7">
            <h2 id="cta-titulo" class="heading-lg">¿Listo/a para dar <span class="font-semibold text-accent">el primer paso?</span></h2>
            <p class="mt-5 max-w-[52ch] text-lg leading-relaxed text-white/75">
              Elige el día y la hora que más te convenga en la agenda digital.
            </p>
          </div>
          <div class="flex flex-col gap-3 sm:flex-row lg:col-span-5 lg:justify-end">
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
