import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { SERVICE_PAGES } from '../core/services';
import { Icon } from './icon';
import { Reveal } from './reveal.directive';

// Cada servicio conserva siempre su color y su esquina, esté donde esté.
const TONES = [
  { box: 'bg-forest-100 text-forest-900', icon: 'bg-white/70 text-forest-500', arrow: 'bg-forest-900 text-white', corner: 'rounded-tr-[4rem]' },
  { box: 'bg-accent text-forest-900', icon: 'bg-white/40 text-forest-900', arrow: 'bg-forest-900 text-white', corner: 'rounded-tl-[4rem]' },
  { box: 'bg-forest-500 text-white', icon: 'bg-white/20 text-white', arrow: 'bg-white text-forest-500', corner: 'rounded-br-[4rem]' },
  { box: 'bg-forest-900 text-white', icon: 'bg-white/15 text-forest-100', arrow: 'bg-accent text-forest-900', corner: 'rounded-bl-[4rem]' },
];

// Enlaces a las páginas de servicio. En la portada muestra los cuatro; dentro de un servicio, los otros tres.
@Component({
  selector: 'app-service-links',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink, Icon, Reveal],
  template: `
    <section class="layer bg-surface-muted py-16 md:py-24" [class]="layerClass()" aria-labelledby="servicios-titulo">
      <div class="page">
        <div appReveal class="max-w-2xl">
          <h2 id="servicios-titulo" class="heading-lg text-forest-900">{{ title() }}</h2>
          @if (subtitle()) {
            <p class="lead mt-3">{{ subtitle() }}</p>
          }
        </div>

        <ul class="mt-8 grid gap-4 md:mt-10" [class]="columns()">
          @for (item of services(); track item.service.slug; let i = $index) {
            <li [appReveal]="i * 60" class="flex">
              <a
                [routerLink]="'/' + item.service.slug"
                class="group flex min-h-[10.5rem] w-full flex-col justify-between gap-6 rounded-[2rem] p-5 transition-[transform,box-shadow] duration-[180ms] ease-[cubic-bezier(0.23,1,0.32,1)] active:scale-[0.97] sm:p-6 [@media(hover:hover)]:hover:-translate-y-1 [@media(hover:hover)]:hover:shadow-lift"
                [class]="item.tone.box + ' ' + item.tone.corner"
              >
                <span class="flex items-start justify-between gap-3">
                  <span class="flex size-12 shrink-0 items-center justify-center rounded-full" [class]="item.tone.icon">
                    <app-icon [name]="item.service.icon" [size]="24" />
                  </span>
                  <span class="flex size-10 shrink-0 items-center justify-center rounded-full transition-transform duration-[180ms] ease-[cubic-bezier(0.23,1,0.32,1)] [@media(hover:hover)]:group-hover:translate-x-1" [class]="item.tone.arrow">
                    <app-icon name="arrowRight" [size]="18" />
                  </span>
                </span>
                <span>
                  <span class="block font-display text-xl leading-tight font-bold sm:text-[1.35rem]">{{ item.service.cardTitle }}</span>
                  <span class="mt-1.5 block text-sm leading-snug opacity-90">{{ item.service.blurb }}</span>
                </span>
              </a>
            </li>
          }
        </ul>

        @if (note()) {
          <p class="mt-8 max-w-2xl text-sm text-muted">Si estás en crisis o en peligro, comunícate de inmediato con los servicios de emergencia. Este sitio no es un servicio de emergencias.</p>
        }
      </div>
    </section>
  `,
})
export class ServiceLinks {
  readonly title = input('Otros servicios');
  readonly subtitle = input('');
  /** Dirección del servicio actual: no se repite en la lista. */
  readonly exclude = input<string | null>(null);
  /** Prioridad de capa (z-index) de esta sección dentro de la página. */
  readonly layerClass = input('z-[15]');
  readonly note = input(false);

  protected readonly services = computed(() =>
    SERVICE_PAGES.map((service, i) => ({ service, tone: TONES[i % TONES.length] })).filter((item) => item.service.slug !== this.exclude()),
  );
  protected readonly columns = computed(() => (this.services().length > 3 ? 'sm:grid-cols-2 lg:grid-cols-4' : 'md:grid-cols-3'));
}
