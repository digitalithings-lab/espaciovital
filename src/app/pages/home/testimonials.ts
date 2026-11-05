import { ChangeDetectionStrategy, Component } from '@angular/core';
import { TESTIMONIALS } from '../../core/content';
import { Icon } from '../../shared/icon';
import { Reveal } from '../../shared/reveal.directive';

// Reseñas reales de Google: una destacada grande + el resto en grid de tarjetas.
@Component({
  selector: 'app-testimonials',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [Icon, Reveal],
  template: `
    <section id="testimonios" class="section-y border-t border-line bg-forest-50">
      <div class="page">
        <!-- Encabezado con badge de Google -->
        <div appReveal class="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
          <div>
            <p class="eyebrow">Lo que dicen nuestras pacientes</p>
            <h2 class="heading-lg mt-3">Reseñas <span class="em-brand">reales</span> de Google</h2>
          </div>
          <div class="flex items-center gap-2 text-sm text-muted">
            <!-- Google "G" inline SVG -->
            <svg viewBox="0 0 24 24" class="size-5 shrink-0" aria-hidden="true">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z"/>
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18A10.96 10.96 0 0 0 1 12c0 1.77.42 3.45 1.18 4.93l3.66-2.84z"/>
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
            </svg>
            <span class="font-semibold">5.0</span>
            <span class="flex gap-0.5 text-amber-400">
              @for (s of stars; track s) {
                <app-icon name="star" [size]="14" />
              }
            </span>
            <span class="text-muted">· 6 reseñas</span>
          </div>
        </div>

        <!-- Testimonio destacado -->
        @if (featured; as t) {
          <figure appReveal="60" class="mt-10 sm:mt-12 rounded-3xl border border-line bg-surface p-6 sm:p-10 shadow-soft">
            <div class="flex items-center gap-3 mb-6">
              <span class="flex gap-0.5 text-amber-400" role="img" aria-label="5 de 5 estrellas">
                @for (s of stars; track s) {
                  <app-icon name="star" [size]="18" />
                }
              </span>
              <span class="rounded-full bg-forest-50 px-3 py-1 text-[11px] font-bold text-forest-500 uppercase tracking-wider">Destacado</span>
            </div>
            <app-icon name="quote" [size]="36" class="text-forest-100" />
            <blockquote class="mt-4 font-display text-xl sm:text-2xl md:text-[1.75rem] leading-snug font-medium text-ink">
              {{ t.quote }}
            </blockquote>
            <figcaption class="mt-8 flex items-center gap-4">
              <span class="flex size-11 sm:size-12 items-center justify-center rounded-full bg-forest-700 font-display text-base sm:text-lg font-semibold text-white dark:text-ink">
                {{ t.name[0] }}
              </span>
              <span>
                <span class="block font-bold text-ink">{{ t.name }}</span>
                <span class="block text-sm text-muted">{{ t.detail }}</span>
              </span>
            </figcaption>
          </figure>
        }

        <!-- Grid de tarjetas restantes -->
        <ul class="mt-8 grid gap-5 sm:grid-cols-2">
          @for (t of others; track t.name; let i = $index) {
            <li [appReveal]="120 + i * 80" class="rounded-2xl border border-line bg-surface p-5 sm:p-6 shadow-soft flex flex-col">
              <span class="flex gap-0.5 text-amber-400 mb-3" role="img" aria-label="5 de 5 estrellas">
                @for (s of stars; track s) {
                  <app-icon name="star" [size]="15" />
                }
              </span>
              <blockquote class="flex-1 text-sm sm:text-[0.938rem] leading-relaxed text-ink/90">"{{ t.quote }}"</blockquote>
              <figcaption class="mt-5 flex items-center gap-3 border-t border-line pt-4">
                <span class="flex size-9 items-center justify-center rounded-full bg-forest-100 font-display text-sm font-bold text-forest-700">
                  {{ t.name[0] }}
                </span>
                <span>
                  <span class="block text-sm font-bold text-ink">{{ t.name }}</span>
                  <span class="block text-xs text-muted">{{ t.detail }}</span>
                </span>
              </figcaption>
            </li>
          }
        </ul>

      </div>
    </section>
  `,
})
export class Testimonials {
  protected readonly featured = TESTIMONIALS[0];
  protected readonly others = TESTIMONIALS.slice(1);
  protected readonly stars = [1, 2, 3, 4, 5];
}
