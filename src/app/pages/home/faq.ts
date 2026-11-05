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
    <section id="preguntas" class="layer z-[53] section-y bg-background">
      <div class="page grid gap-12 lg:grid-cols-12 lg:gap-16">
        <header class="lg:sticky lg:top-28 lg:col-span-4 lg:self-start">
          <h2 appReveal class="heading-xl text-forest-900">Resolvamos <span class="font-semibold text-forest-500 italic">tus dudas.</span></h2>
          <p appReveal="40" class="mt-4 text-sm font-bold text-forest-500">Preguntas frecuentes</p>
          <p appReveal="100" class="lead mt-5">Si no encuentras tu respuesta, escríbeme: respondo personalmente cada mensaje.</p>
        </header>

        <div class="grid gap-3 lg:col-span-8">
          @for (item of faqs; track item.question; let i = $index) {
            <details [appReveal]="i * 50" class="group rounded-[2rem] bg-surface-muted px-6 transition-colors duration-200 open:bg-forest-100 sm:px-8" [open]="i === 0">
              <summary class="flex cursor-pointer list-none items-center justify-between gap-6 py-5 text-lg font-semibold text-forest-900 transition-colors hover:text-forest-500 sm:py-6 [&::-webkit-details-marker]:hidden">
                <span class="font-display">{{ item.question }}</span>
                <app-icon name="chevronDown" [size]="20" class="shrink-0 text-forest-900 transition-transform duration-300 group-open:rotate-180" />
              </summary>
              <p class="max-w-[65ch] whitespace-pre-line pb-6 leading-relaxed text-ink">{{ item.answer }}</p>
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
