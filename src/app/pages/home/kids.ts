import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { KIDS, srcset } from '../../core/content';
import { Icon } from '../../shared/icon';
import { Reveal } from '../../shared/reveal.directive';

// Metamorfosis Kids: bento con ritmo (una pieza grande, dos medianas, tres pequeñas), no seis tarjetas iguales.
@Component({
  selector: 'app-kids',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink, Icon, Reveal],
  template: `
    <section id="espacio-kids" class="section-y">
      <div class="page">
        <header class="grid gap-6 lg:grid-cols-12 lg:items-end">
          <div class="lg:col-span-6">
            <p appReveal class="eyebrow">Metamorfosis Kids · Niños y preadolescentes</p>
            <h2 appReveal="60" class="heading-lg mt-4">Aprender a sentir, <span class="em-brand">jugando.</span></h2>
          </div>
          <p appReveal="100" class="lead lg:col-span-5 lg:col-start-8">
            Un entorno terapéutico y lúdico que estimula su potencial cognitivo y emocional con juego estructurado, bloques, tangram, origami y
            respiración consciente.
          </p>
        </header>

        <div class="mt-14 grid auto-rows-[15rem] grid-cols-1 gap-4 md:grid-cols-6">
          @for (program of programs; track program.title; let i = $index) {
            <article
              [appReveal]="(i % 3) * 80"
              class="group relative overflow-hidden rounded-3xl bg-surface-muted"
              [class]="layout[i]"
            >
              <img
                [src]="program.image"
                [attr.srcset]="srcset(program.image)"
                sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 92vw"
                [alt]="program.alt"
                width="640"
                height="480"
                loading="lazy"
                decoding="async"
                class="absolute inset-0 size-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
              />
              <div class="absolute inset-0 bg-gradient-to-t from-forest-900/90 via-forest-900/30 to-transparent"></div>
              <div class="absolute right-5 bottom-5 left-5 text-white">
                <p class="flex items-center gap-1.5 text-xs font-semibold text-accent">
                  <app-icon [name]="program.icon" [size]="16" /> {{ program.tag }}
                </p>
                <h3 class="mt-1.5 font-medium" [class]="i === 0 ? 'text-2xl md:text-3xl' : 'text-lg'">{{ program.title }}</h3>
                @if (i < 3) {
                  <p class="mt-1.5 max-w-[46ch] text-sm leading-relaxed text-white/80">{{ program.text }}</p>
                }
              </div>
            </article>
          }
        </div>

        <div appReveal class="mt-10 flex flex-col items-start justify-between gap-5 border-t border-line pt-8 sm:flex-row sm:items-center">
          <p class="max-w-[52ch] text-muted">
            <span class="font-semibold text-ink">¿Una evaluación o un taller para tu hijo o hija?</span>
            Sesiones individuales y grupos pequeños de estimulación socioemocional.
          </p>
          <a routerLink="/agendar" class="btn-dark">Agendar cita</a>
        </div>
      </div>
    </section>
  `,
})
export class Kids {
  protected readonly programs = KIDS;
  protected readonly srcset = srcset;
  // Ritmo del bento: grande (2 filas) + dos medianas apiladas; luego tres pequeñas.
  protected readonly layout = [
    'md:col-span-3 md:row-span-2',
    'md:col-span-3',
    'md:col-span-3',
    'md:col-span-2',
    'md:col-span-2',
    'md:col-span-2',
  ];
}
