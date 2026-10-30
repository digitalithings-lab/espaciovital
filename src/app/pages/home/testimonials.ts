import { ChangeDetectionStrategy, Component } from '@angular/core';
import { TESTIMONIALS } from '../../core/content';
import { Icon } from '../../shared/icon';
import { Reveal } from '../../shared/reveal.directive';
import { TONE } from '../../shared/tones';

@Component({
  selector: 'app-testimonials',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [Icon, Reveal],
  template: `
    <section id="testimonios" class="section-y border-t border-line bg-surface">
      <div class="page">
        <header class="mx-auto mb-14 max-w-2xl space-y-4 text-center">
          <p appReveal class="eyebrow bg-honey-100 text-honey-600">Testimonios reales</p>
          <h2 appReveal="80" class="heading-lg">Voces de transformación</h2>
          <p appReveal="120" class="lead">Lo que vivieron las mujeres que se atrevieron a regalarse este viaje.</p>
        </header>

        <!-- En celular se desliza de lado; en pantallas grandes, tres columnas. -->
        <ul class="-mx-5 flex snap-x snap-mandatory gap-5 overflow-x-auto px-5 pb-4 md:mx-0 md:grid md:grid-cols-3 md:overflow-visible md:px-0 md:pb-0">
          @for (t of testimonials; track t.name; let i = $index) {
            <li [appReveal]="i * 90" class="card flex w-[85%] shrink-0 snap-center flex-col justify-between p-8 md:w-auto">
              <figure class="space-y-5">
                <div class="flex items-center justify-between">
                  <span class="flex gap-0.5 text-honey-600" role="img" aria-label="5 de 5 estrellas">
                    @for (s of [1, 2, 3, 4, 5]; track s) {
                      <app-icon name="star" [size]="18" [filled]="true" />
                    }
                  </span>
                  <app-icon name="quote" [size]="32" class="text-line" />
                </div>
                <blockquote class="font-display text-lg leading-relaxed text-ink/90 italic">“{{ t.quote }}”</blockquote>
                <figcaption class="flex items-center gap-3 border-t border-line pt-5">
                  <span class="flex size-11 items-center justify-center rounded-full font-display text-lg font-bold" [class]="tone[t.tone].soft + ' ' + tone[t.tone].text">
                    {{ t.name[0] }}
                  </span>
                  <span>
                    <span class="block font-bold">{{ t.name }}</span>
                    <span class="block text-xs text-muted">{{ t.detail }}</span>
                  </span>
                </figcaption>
              </figure>
            </li>
          }
        </ul>
      </div>
    </section>
  `,
})
export class Testimonials {
  protected readonly testimonials = TESTIMONIALS;
  protected readonly tone = TONE;
}
