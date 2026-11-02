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
            <p appReveal class="eyebrow">Vital Kids · Atencion a niños grupal e individual</p>
            <h2 appReveal="60" class="heading-lg mt-4">Aprender a sentir, <span class="em-brand">jugando.</span></h2>
          </div>
          <p appReveal="100" class="lead lg:col-span-5 lg:col-start-8">
            a traves del juego terapeutico, promovemos el aprendizaje, 
            la expresion y regulacion emocional y el desarrollo de habilidades sociales trabajamos conjunto con el equipo de psicopedagogia 
            para favorecer el desarrollo integral de cada niño
          </p>
        </header>

        <!-- Bento editorial: fotos grandes con franja de color sólido + fotos pequeñas rotadas -->
        <div class="mt-14 grid auto-rows-[15rem] grid-cols-1 gap-4 md:grid-cols-6">
          @for (program of programs; track program.title; let i = $index) {

            @if (i < 3) {
              <!-- Tarjetas grandes: franja fúcsia sólida abajo, número editorial, sin gradiente genérico -->
              <article
                [appReveal]="i * 60"
                class="group relative overflow-hidden bg-surface-muted"
                [class]="largeLayout[i]"
                [style]="i === 0 ? 'border-radius: 2rem 2rem 1rem 2rem' : i === 1 ? 'border-radius: 1rem 2rem 2rem 1rem' : 'border-radius: 2rem 1rem 2rem 2rem'"
              >
                <!-- Sticker en la primera tarjeta -->
                @if (i === 0) {
                  <div class="absolute top-4 right-4 z-20 rotate-[5deg] rounded-full bg-accent px-3 py-1.5 text-[10px] font-extrabold uppercase tracking-widest text-forest-900 shadow-soft">
                    6 actividades ✦
                  </div>
                }

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

                <!-- Número editorial grande y semitransparente -->
                <span class="pointer-events-none absolute top-3 left-4 z-10 font-display text-[6rem] font-black leading-none text-white/15 select-none">0{{ i + 1 }}</span>

                <!-- Franja de color sólida abajo (no gradiente negro genérico) -->
                <div class="absolute inset-x-0 bottom-0 z-10" [class]="i === 0 ? 'bg-forest-900/90 px-5 py-4' : 'bg-forest-500/90 px-5 py-4'">
                  <p class="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-[0.15em]" [class]="i === 0 ? 'text-accent' : 'text-white/70'">
                    <app-icon [name]="program.icon" [size]="14" /> {{ program.tag }}
                  </p>
                  <h3 class="mt-1 font-semibold text-white" [class]="i === 0 ? 'text-xl md:text-2xl' : 'text-lg'">{{ program.title }}</h3>
                  @if (i === 0) {
                    <p class="mt-1 max-w-[44ch] text-sm leading-relaxed text-white/80">{{ program.text }}</p>
                  }
                </div>
              </article>
            } @else {
              <!-- Tarjetas pequeñas: polaroid rotado, sale del flujo, efecto "fotos regadas" -->
              <article
                [appReveal]="(i - 3) * 80"
                class="group relative overflow-hidden rounded-2xl bg-white p-2 shadow-lift transition-all duration-300 hover:shadow-2xl"
                [class]="smallLayout[i - 3]"
                [style]="smallRotate[i - 3]"
              >
                <img
                  [src]="program.image"
                  [attr.srcset]="srcset(program.image)"
                  sizes="(min-width: 640px) 33vw, 92vw"
                  [alt]="program.alt"
                  width="640"
                  height="480"
                  loading="lazy"
                  decoding="async"
                  class="aspect-[4/3] w-full rounded-xl object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                />
                <!-- Pie de foto estilo galería -->
                <div class="px-1 pt-2 pb-0.5">
                  <p class="flex items-center gap-1 text-[10px] font-bold uppercase tracking-[0.14em] text-forest-500">
                    <app-icon [name]="program.icon" [size]="12" /> {{ program.tag }}
                  </p>
                  <p class="mt-0.5 text-sm font-semibold text-ink leading-tight">{{ program.title }}</p>
                </div>
              </article>
            }
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
  // Tarjetas grandes (3 primeras): bento asimétrico
  protected readonly largeLayout = [
    'md:col-span-3 md:row-span-2',
    'md:col-span-3',
    'md:col-span-3',
  ];
  // Tarjetas pequeñas (3 últimas): polaroid rotado, distintas anchos
  protected readonly smallLayout = [
    'md:col-span-2',
    'md:col-span-2',
    'md:col-span-2',
  ];
  // Rotación alternada para las fotos pequeñas tipo "fotos regadas"
  protected readonly smallRotate = [
    'transform: rotate(-2.5deg); margin-top: -0.5rem;',
    'transform: rotate(1.8deg); margin-top: 0.5rem;',
    'transform: rotate(-1.2deg); margin-top: -0.25rem;',
  ];
}
