import { ChangeDetectionStrategy, Component } from '@angular/core';
import { IMG } from '../../core/content';
import { Icon } from '../../shared/icon';
import { Reveal } from '../../shared/reveal.directive';

@Component({
  selector: 'app-about',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [Icon, Reveal],
  template: `
    <section id="sobre-mi" class="section-y">
      <div class="page grid items-start gap-12 lg:grid-cols-12 lg:gap-16">
        <figure appReveal class="relative overflow-hidden rounded-3xl shadow-lift lg:sticky lg:top-28 lg:col-span-5">
          <img
            [src]="img.about"
            srcset="/img/nathalie-vera-cuerpo-560.webp 560w, /img/nathalie-vera-cuerpo-934.webp 934w"
            sizes="(min-width: 1024px) 40vw, 92vw"
            alt="Psicóloga Nathalie Vera en el estudio, de cuerpo completo"
            width="934"
            height="1400"
            loading="lazy"
            decoding="async"
            class="aspect-[3/4] w-full object-cover object-[50%_18%]"
          />
          <div class="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-forest-900/85 to-transparent"></div>
          <blockquote class="absolute right-6 bottom-6 left-6 text-white">
            <app-icon name="quote" [size]="26" class="mb-2 text-accent" />
            <p class="font-display text-xl leading-snug font-medium md:text-2xl">Ninguna mujer sana sola; sanamos cuando nos reflejamos con verdad y ternura.</p>
          </blockquote>
        </figure>

        <div class="lg:col-span-7">
          <p appReveal class="eyebrow">Sobre la terapeuta</p>
          <h2 appReveal="60" class="heading-lg mt-4">Hola, soy Nathalie. Te acompaño en el regreso <span class="em-brand">a ti misma.</span></h2>
          <p appReveal="100" class="lead mt-6">
            Como psicóloga clínica y fundadora de EspacioVital, sé que el ritmo de vida actual sobrecarga nuestras emociones y silencia
            nuestras necesidades. Mi trabajo une la psicología basada en evidencia con los círculos de palabra, la regulación somática y el
            juego terapéutico para niños y familias.
          </p>

          <!-- Enfoque: lista numerada, sin tarjetas. -->
          <ol id="terapia" class="mt-12 divide-y divide-line border-y border-line">
            @for (pillar of pillars; track pillar.title; let i = $index) {
              <li [appReveal]="i * 80" class="grid gap-2 py-7 sm:grid-cols-[4rem_1fr] sm:gap-6">
                <span class="font-display text-sm font-semibold text-accent-ink tabular-nums">0{{ i + 1 }}</span>
                <div>
                  <h3 class="text-xl font-medium">{{ pillar.title }}</h3>
                  <p class="mt-2 max-w-[56ch] leading-relaxed text-muted">{{ pillar.text }}</p>
                </div>
              </li>
            }
          </ol>
        </div>
      </div>
    </section>
  `,
})
export class About {
  protected readonly img = IMG;
  protected readonly pillars = [
    {
      title: 'Acompañamiento clínico',
      text: 'Validación profesional, técnicas cognitivo-conductuales y regulación del sistema nervioso para entender lo que sientes.',
    },
    {
      title: 'Terapia compasiva',
      text: 'Desarmar la autoexigencia para construir una relación más amable y leal con tu propia historia.',
    },
    {
      title: 'Tribu consciente',
      text: 'Espacios grupales para quitarse las máscaras y encontrar una sororidad auténtica, sin comparación.',
    },
  ];
}
