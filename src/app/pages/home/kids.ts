import { ChangeDetectionStrategy, Component, input } from '@angular/core';
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
    <section id="espacio-kids" class="layer section-y" [class]="layerClass() + ' ' + tone()">
      <div class="page">
        <header class="grid gap-6 lg:grid-cols-12 lg:items-end">
          <div class="lg:col-span-7">
            <h2 appReveal class="heading-xl text-forest-900">Aprender a sentir, <span class="font-semibold text-forest-500 italic">jugando.</span></h2>
            <p appReveal="60" class="mt-4 inline-flex rounded-full bg-accent px-4 py-1.5 text-sm font-bold text-forest-900">Vital Kids · Atención a niños grupal e individual</p>
          </div>
          <p appReveal="100" class="lead lg:col-span-5">
            A través del juego terapéutico promovemos el aprendizaje, la expresión , la regulación emocional, y el desarrollo de habilidades sociales. Trabajamos en conjunto con el equipo de psicopedagogía para favorecer el desarrollo integral de cada niño.
          </p>
        </header>

        <!-- Bento: una pieza grande en arco y cinco con esquinas orgánicas, cada una con su color. -->
        <div class="mt-14 grid auto-rows-[16rem] grid-cols-1 gap-4 md:grid-cols-6">
          @for (program of programs; track program.title; let i = $index) {
            <article
              [appReveal]="i * 60"
              class="group relative overflow-hidden bg-surface-muted"
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
                class="absolute inset-0 size-full object-cover transition-transform duration-500 ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:scale-[1.04]"
              />
              @if (i === 0) {
                <div class="absolute top-5 right-5 z-20 rounded-full bg-accent px-3.5 py-1.5 text-sm font-bold text-forest-900 shadow-soft">6 actividades</div>
              }
              <div class="absolute inset-x-3 bottom-3 z-10 rounded-[1.5rem] px-5 py-4" [class]="tones[i]">
                <p class="flex items-center gap-1.5 text-xs font-bold opacity-80">
                  <app-icon [name]="program.icon" [size]="14" /> {{ program.tag }}
                </p>
                <h3 class="mt-1 font-display font-bold" [class]="i === 0 ? 'text-xl md:text-2xl' : 'text-lg'">{{ program.title }}</h3>
                @if (i === 0) {
                  <p class="mt-1 max-w-[44ch] text-sm leading-relaxed opacity-90">{{ program.text }}</p>
                }
              </div>
            </article>
          }
        </div>

        <div appReveal class="mt-10 flex flex-col items-start justify-between gap-5 rounded-[2rem] bg-forest-100 p-6 sm:flex-row sm:items-center sm:p-8">
          <p class="max-w-[52ch] text-forest-900">
            <span class="font-display text-lg font-bold">¿Una evaluación o un taller para tu hijo o hija?</span>
            Sesiones individuales y grupos pequeños de estimulación socioemocional.
          </p>
          <a routerLink="/agendar" class="btn-dark">Agendar cita</a>
        </div>
      </div>
    </section>
  `,
})
export class Kids {
  /** Prioridad de capa y fondo: la portada usa los de siempre; otras páginas los cambian para encajar. */
  readonly layerClass = input('z-30');
  readonly tone = input('bg-background');
  protected readonly programs = KIDS;
  protected readonly srcset = srcset;
  // Bento asimétrico: la primera pieza es el arco del logo; el resto, esquinas orgánicas alternadas.
  protected readonly layout = [
    'md:col-span-3 md:row-span-2 rounded-[2rem] md:rounded-t-[999px]',
    'md:col-span-3 rounded-[2rem] rounded-tl-[5rem]',
    'md:col-span-3 rounded-[2rem] rounded-br-[5rem]',
    'md:col-span-2 rounded-[2rem] rounded-tr-[4rem]',
    'md:col-span-2 rounded-[2rem]',
    'md:col-span-2 rounded-[2rem] rounded-bl-[4rem]',
  ];
  protected readonly tones = [
    'bg-forest-900 text-white',
    'bg-forest-100 text-forest-900',
    'bg-accent text-forest-900',
    'bg-forest-500 text-white',
    'bg-surface text-forest-900',
    'bg-forest-100 text-forest-900',
  ];
}
