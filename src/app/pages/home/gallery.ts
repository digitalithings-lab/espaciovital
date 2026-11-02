import { DOCUMENT } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, effect, ElementRef, inject, signal, viewChild } from '@angular/core';
import { GALLERY, srcset } from '../../core/content';
import { Icon } from '../../shared/icon';
import { Reveal } from '../../shared/reveal.directive';

// Mosaico de fotos con visor a pantalla completa (teclado: ← → para moverse, Esc para cerrar).
@Component({
  selector: 'app-gallery',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [Icon, Reveal],
  host: {
    '(document:keydown.escape)': 'close()',
    '(document:keydown.arrowright)': 'step(1)',
    '(document:keydown.arrowleft)': 'step(-1)',
  },
  template: `
    <section id="galeria" class="section-y border-t border-line bg-surface">
      <div class="page">
        <header class="mb-12 flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div class="space-y-4">
            <p appReveal class="eyebrow">Galería de vivencias</p>
            <h2 appReveal="80" class="heading-lg max-w-2xl">Momentos que se quedan <span class="em-brand">contigo.</span></h2>
          </div>
          <p appReveal="120" class="lead max-w-md">
            Fotografías de ediciones anteriores: agua cálida, complicidad, risas profundas y la dicha de no tener que demostrar nada.
          </p>
        </header>

        <div class="grid gap-4 md:grid-cols-12 md:grid-rows-[auto]">

          <!-- Fila 1: foto grande izquierda + foto vertical derecha -->
          <button type="button" [appReveal]="0" class="group relative cursor-zoom-in overflow-hidden text-left md:col-span-7 md:row-span-2" style="height:480px; border-radius: 2rem 1rem 2rem 2rem;" (click)="open(0)" [attr.aria-label]="'Ver foto: ' + photos[0].title">
            <img [src]="photos[0].image" [attr.srcset]="srcset(photos[0].image)" sizes="(min-width: 768px) 58vw, 92vw" [style.object-position]="photos[0].focus" [alt]="photos[0].alt" width="800" height="560" loading="lazy" decoding="async" class="size-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]" />
            <span class="absolute inset-x-0 bottom-0 h-2/5 bg-gradient-to-t from-forest-900/90 to-transparent"></span>
            <span class="absolute right-5 bottom-5 left-5 text-white">
              <span class="block text-[10px] font-bold uppercase tracking-[0.18em] text-accent">{{ photos[0].tag }}</span>
              <span class="mt-1 block font-display text-2xl font-semibold">{{ photos[0].title }}</span>
            </span>
            <span class="absolute top-4 right-4 flex size-9 items-center justify-center rounded-full bg-white/20 text-white opacity-0 backdrop-blur-md transition-opacity group-hover:opacity-100">
              <app-icon name="expand" [size]="16" />
            </span>
          </button>

          <!-- Cuadro editorial: quote de impacto, color sólido fúcsia -->
          <div appReveal="60" class="hidden md:flex flex-col justify-between rounded-3xl bg-forest-500 p-7 text-white md:col-span-5" style="height:224px;">
            <p class="font-display text-3xl font-bold leading-snug">+150 mujeres <span class="text-accent italic">transformadas.</span></p>
            <p class="text-sm text-white/70 max-w-[28ch]">Actividades, terapia y círculos de palabra desde 2020.</p>
          </div>

          <!-- Foto derecha 2 -->
          <button type="button" [appReveal]="80" class="group relative cursor-zoom-in overflow-hidden rounded-3xl text-left md:col-span-5" style="height:224px;" (click)="open(1)" [attr.aria-label]="'Ver foto: ' + photos[1].title">
            <img [src]="photos[1].image" [attr.srcset]="srcset(photos[1].image)" sizes="(min-width: 768px) 42vw, 92vw" [style.object-position]="photos[1].focus" [alt]="photos[1].alt" width="800" height="560" loading="lazy" decoding="async" class="size-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]" />
            <span class="absolute inset-x-0 bottom-0 h-2/5 bg-gradient-to-t from-forest-900/85 to-transparent"></span>
            <span class="absolute right-4 bottom-4 left-4 text-white">
              <span class="block text-[10px] font-bold uppercase tracking-[0.18em] text-accent">{{ photos[1].tag }}</span>
              <span class="mt-0.5 block font-display text-lg font-semibold">{{ photos[1].title }}</span>
            </span>
            <span class="absolute top-3 right-3 flex size-9 items-center justify-center rounded-full bg-white/20 text-white opacity-0 backdrop-blur-md transition-opacity group-hover:opacity-100">
              <app-icon name="expand" [size]="16" />
            </span>
          </button>

          <!-- Fila 2: 4 fotos en polaroid rotado (md:col-span-3 cada una) -->
          @for (photo of photos.slice(2); track photo.image; let j = $index) {
            <div class="md:col-span-3" [appReveal]="(j + 2) * 70" [style]="polaroidRotate[j % polaroidRotate.length]">
              <button
                type="button"
                class="group w-full cursor-zoom-in overflow-hidden rounded-2xl bg-white p-2 shadow-lift transition-all duration-300 hover:shadow-2xl hover:rotate-0 text-left"
                (click)="open(j + 2)"
                [attr.aria-label]="'Ver foto: ' + photo.title"
              >
                <img [src]="photo.image" [attr.srcset]="srcset(photo.image)" sizes="(min-width: 768px) 25vw, 92vw" [style.object-position]="photo.focus" [alt]="photo.alt" width="800" height="560" loading="lazy" decoding="async" class="aspect-[4/3] w-full rounded-xl object-cover transition-transform duration-500 group-hover:scale-[1.04]" />
                <div class="px-1 pt-2 pb-0.5">
                  <p class="text-[10px] font-bold uppercase tracking-[0.15em] text-forest-500">{{ photo.tag }}</p>
                  <p class="mt-0.5 text-sm font-semibold text-ink leading-tight">{{ photo.title }}</p>
                </div>
              </button>
            </div>
          }
        </div>
      </div>

      @if (current(); as photo) {
        <div class="fixed inset-0 z-[60] flex animate-fade-in items-center justify-center bg-black/85 p-4 backdrop-blur-sm" (click)="close()">
          <div
            #dialog
            class="relative w-full max-w-5xl outline-none"
            role="dialog"
            aria-modal="true"
            [attr.aria-label]="photo.title"
            tabindex="-1"
            (click)="$event.stopPropagation()"
          >
            <img [src]="photo.image" [alt]="photo.alt" class="max-h-[78dvh] w-full rounded-3xl object-contain" />
            <div class="mt-4 flex items-center justify-between gap-4 text-white">
              <div>
                <p class="font-display text-xl font-medium">{{ photo.title }}</p>
                <p class="text-sm text-white/70">{{ index()! + 1 }} de {{ photos.length }}</p>
              </div>
              <div class="flex gap-2">
                <button type="button" class="flex size-11 cursor-pointer items-center justify-center rounded-full bg-white/15 hover:bg-white/25" (click)="step(-1)" aria-label="Foto anterior">
                  <app-icon name="chevronLeft" />
                </button>
                <button type="button" class="flex size-11 cursor-pointer items-center justify-center rounded-full bg-white/15 hover:bg-white/25" (click)="step(1)" aria-label="Foto siguiente">
                  <app-icon name="chevronRight" />
                </button>
              </div>
            </div>
            <button type="button" class="absolute -top-3 -right-3 flex size-11 cursor-pointer items-center justify-center rounded-full bg-white text-ink shadow-lift" (click)="close()" aria-label="Cerrar">
              <app-icon name="x" />
            </button>
          </div>
        </div>
      }
    </section>
  `,
})
export class Gallery {
  protected readonly photos = GALLERY;
  protected readonly srcset = srcset;
  // Rotación alternada para las fotos polaroid de la fila 2
  protected readonly polaroidRotate = [
    'transform: rotate(-2deg);',
    'transform: rotate(1.5deg); margin-top: 0.75rem;',
    'transform: rotate(-1deg); margin-top: -0.25rem;',
    'transform: rotate(2.2deg); margin-top: 0.5rem;',
  ];
  protected readonly index = signal<number | null>(null);
  protected readonly current = computed(() => (this.index() === null ? null : this.photos[this.index()!]));
  private readonly dialog = viewChild<ElementRef<HTMLElement>>('dialog');

  constructor() {
    // Al abrir el visor, el foco entra en él y la página no se desplaza. (DOCUMENT funciona también al pre-renderizar.)
    const body = inject(DOCUMENT).body;
    effect(() => {
      const el = this.dialog()?.nativeElement;
      body.style.overflow = el ? 'hidden' : '';
      el?.focus();
    });
  }

  protected open(i: number) {
    this.index.set(i);
  }
  protected close() {
    this.index.set(null);
  }
  protected step(delta: number) {
    const i = this.index();
    if (i === null) return;
    this.index.set((i + delta + this.photos.length) % this.photos.length);
  }
}
