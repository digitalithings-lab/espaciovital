import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FAQS } from '../../core/content';
import { Icon } from '../../shared/icon';
import { Reveal } from '../../shared/reveal.directive';

// Preguntas frecuentes con <details>: accesibles sin JavaScript y con datos estructurados FAQPage (ver home.ts).
@Component({
  selector: 'app-faq',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [Icon, Reveal],
  template: `
    <section id="preguntas" class="section-y border-t border-line bg-surface">
      <div class="page grid gap-12 lg:grid-cols-12 lg:gap-16">
        <header class="lg:sticky lg:top-28 lg:col-span-4 lg:self-start">
          <p appReveal class="eyebrow">Preguntas frecuentes</p>
          <h2 appReveal="60" class="heading-lg mt-4">Resolvamos <span class="em-brand">tus dudas.</span></h2>
          <p appReveal="100" class="lead mt-5">Si no encuentras tu respuesta, escríbeme: respondo personalmente cada mensaje.</p>
        </header>

        <div class="divide-y divide-line border-y border-line lg:col-span-8">
          @for (item of faqs; track item.question; let i = $index) {
            <details [appReveal]="i * 50" class="group" [open]="i === 0">
              <summary class="flex cursor-pointer list-none items-center justify-between gap-6 py-6 text-lg font-medium transition-colors hover:text-forest-500 [&::-webkit-details-marker]:hidden">
                <span class="font-display">{{ item.question }}</span>
                <app-icon name="chevronDown" [size]="20" class="shrink-0 text-muted transition-transform duration-300 group-open:rotate-180" />
              </summary>
              <p class="max-w-[65ch] pb-6 leading-relaxed text-muted">{{ item.answer }}</p>
            </details>
          }
        </div>
      </div>
    </section>
  `,
})
export class FaqSection {
  protected readonly faqs = FAQS;
}
