import { DOCUMENT } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, effect, ElementRef, inject, signal, viewChild } from '@angular/core';
import { GALLERY } from '../../core/content';
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
    <section id="galeria" class="section-y border-t border-line bg-surface-muted">
      <div class="page">
        <header class="mb-12 flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div class="space-y-4">
            <p appReveal class="eyebrow bg-clay-100 text-clay-600">Galería de vivencias</p>
            <h2 appReveal="80" class="heading-lg max-w-2xl">Momentos que quedan grabados en el corazón</h2>
          </div>
          <p appReveal="120" class="max-w-md text-muted">
            Fotografías de ediciones anteriores: agua cálida, complicidad, risas profundas y la dicha de no tener que demostrar nada.
          </p>
        </header>

        <div class="grid gap-5 md:grid-cols-12">
          @for (photo of photos; track photo.image + $index; let i = $index) {
            <button
              type="button"
              [appReveal]="i * 80"
              class="group relative cursor-zoom-in overflow-hidden rounded-[2rem] text-left shadow-soft"
              [class]="layout[i]"
              (click)="open(i)"
              [attr.aria-label]="'Ver foto: ' + photo.title"
            >
              <img [src]="photo.image" [alt]="photo.alt" width="800" height="560" loading="lazy" decoding="async" class="size-full object-cover transition-transform duration-700 ease-out group-hover:scale-105" />
              <span class="absolute inset-0 bg-gradient-to-t from-leaf-900/85 via-leaf-900/5 to-transparent"></span>
              <span class="absolute top-4 right-4 flex size-10 items-center justify-center rounded-full bg-white/20 text-white opacity-0 backdrop-blur-md transition-opacity group-hover:opacity-100">
                <app-icon name="expand" [size]="18" />
              </span>
              <span class="absolute right-6 bottom-6 left-6 text-white">
                <span class="mb-2 inline-block rounded-full bg-white/20 px-3 py-1 text-[11px] font-bold tracking-wider uppercase backdrop-blur-md">{{ photo.tag }}</span>
                <span class="block font-display text-xl font-semibold md:text-2xl">{{ photo.title }}</span>
                <span class="mt-1 block text-sm text-white/80">{{ photo.text }}</span>
              </span>
            </button>
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
                <p class="font-display text-xl">{{ photo.title }}</p>
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
  // Mosaico: grande + vertical arriba, mediana + ancha abajo.
  protected readonly layout = ['h-[420px] md:col-span-8', 'h-[420px] md:col-span-4', 'h-[360px] md:col-span-5', 'h-[360px] md:col-span-7'];
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
