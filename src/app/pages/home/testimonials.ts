import { ChangeDetectionStrategy, Component } from '@angular/core';
import { TESTIMONIALS } from '../../core/content';
import { Icon } from '../../shared/icon';
import { Reveal } from '../../shared/reveal.directive';

// Testimonios: uno destacado en grande y dos de apoyo, sin tarjetas iguales.
@Component({
  selector: 'app-testimonials',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [Icon, Reveal],
  template: `
    <section id="testimonios" class="section-y border-t border-line bg-forest-50">
      <div class="page">
        <p appReveal class="eyebrow">Testimonios reales</p>

        <div class="mt-8 grid gap-12 lg:grid-cols-12 lg:gap-16">
          @if (featured; as t) {
            <figure appReveal="60" class="lg:col-span-7">
              <app-icon name="quote" [size]="44" class="text-accent" />
              <blockquote class="mt-6 font-display text-2xl leading-snug font-medium text-ink md:text-[2rem] md:leading-[1.3]">
                {{ t.quote }}
              </blockquote>
              <figcaption class="mt-8 flex items-center gap-4">
                <span class="flex size-12 items-center justify-center rounded-full bg-forest-700 font-display text-lg font-semibold text-white dark:text-ink">
                  {{ t.name[0] }}
                </span>
                <span>
                  <span class="block font-bold">{{ t.name }}</span>
                  <span class="block text-sm text-muted">{{ t.detail }}</span>
                </span>
              </figcaption>
            </figure>
          }

          <ul class="divide-y divide-line border-y border-line lg:col-span-5 lg:self-center">
            @for (t of others; track t.name; let i = $index) {
              <li [appReveal]="120 + i * 80" class="py-8">
                <span class="flex gap-0.5 text-accent" role="img" aria-label="5 de 5 estrellas">
                  @for (s of stars; track s) {
                    <app-icon name="star" [size]="16" />
                  }
                </span>
                <blockquote class="mt-3 leading-relaxed text-ink/90">“{{ t.quote }}”</blockquote>
                <p class="mt-4 text-sm"><span class="font-bold">{{ t.name }}</span> <span class="text-muted">· {{ t.detail }}</span></p>
              </li>
            }
          </ul>
        </div>
      </div>
    </section>
  `,
})
export class Testimonials {
  protected readonly featured = TESTIMONIALS[0];
  protected readonly others = TESTIMONIALS.slice(1);
  protected readonly stars = [1, 2, 3, 4, 5];
}
