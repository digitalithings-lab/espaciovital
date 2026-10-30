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
    <section id="preguntas" class="section-y bg-background">
      <div class="page grid gap-12 lg:grid-cols-12">
        <header class="space-y-4 lg:col-span-4">
          <p appReveal class="eyebrow bg-leaf-100 text-leaf-700">Preguntas frecuentes</p>
          <h2 appReveal="80" class="heading-lg">Resolvamos tus dudas</h2>
          <p appReveal="120" class="lead">Si no encuentras tu respuesta, escríbeme: respondo personalmente cada mensaje.</p>
        </header>

        <div class="space-y-3 lg:col-span-8">
          @for (item of faqs; track item.question; let i = $index) {
            <details [appReveal]="i * 60" class="group card overflow-hidden" [open]="i === 0">
              <summary class="flex cursor-pointer list-none items-center justify-between gap-4 px-6 py-5 font-bold transition-colors hover:text-leaf-700 [&::-webkit-details-marker]:hidden">
                {{ item.question }}
                <span class="flex size-8 shrink-0 items-center justify-center rounded-full bg-surface-muted transition-transform duration-300 group-open:rotate-180">
                  <app-icon name="chevronDown" [size]="18" />
                </span>
              </summary>
              <p class="px-6 pb-6 leading-relaxed text-muted">{{ item.answer }}</p>
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
