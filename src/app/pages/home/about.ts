import { ChangeDetectionStrategy, Component } from '@angular/core';
import { IMG } from '../../core/content';
import { Icon } from '../../shared/icon';
import { Reveal } from '../../shared/reveal.directive';
import { TONE } from '../../shared/tones';

@Component({
  selector: 'app-about',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [Icon, Reveal],
  template: `
    <section id="sobre-mi" class="section-y bg-surface">
      <div class="page grid items-center gap-12 lg:grid-cols-12">
        <figure appReveal class="relative overflow-hidden rounded-[2rem] shadow-lift lg:col-span-5">
          <img [src]="img.about" alt="Mujeres acompañándose en un círculo de EspacioVital" width="600" height="720" loading="lazy" decoding="async" class="aspect-[5/6] w-full object-cover" />
          <div class="absolute inset-0 bg-gradient-to-t from-leaf-900/80 via-transparent to-transparent"></div>
          <blockquote class="absolute right-6 bottom-6 left-6 text-white">
            <app-icon name="quote" [size]="28" class="mb-2 text-white/60" />
            <p class="font-display text-xl leading-snug italic md:text-2xl">Ninguna mujer sana sola; sanamos cuando nos reflejamos con verdad y ternura.</p>
          </blockquote>
        </figure>

        <div class="space-y-6 lg:col-span-7">
          <p appReveal class="eyebrow bg-leaf-100 text-leaf-700"><app-icon name="badgeCheck" [size]="16" /> Sobre la terapeuta</p>
          <h2 appReveal="80" class="heading-lg">Hola, soy Nathalie. Mi propósito es sostenerte en el regreso a ti misma.</h2>
          <p appReveal="120" class="lead">
            Como psicóloga clínica y fundadora de <strong class="text-ink">EspacioVital</strong>, sé que el ritmo de vida actual sobrecarga
            nuestras emociones y silencia nuestras necesidades. Mi trabajo une la psicología científica con los círculos de palabra, la
            sanación somática y el juego terapéutico para niños y familias.
          </p>

          <div id="terapia" class="grid gap-4 pt-2 md:grid-cols-3">
            @for (pillar of pillars; track pillar.title; let i = $index) {
              <article [appReveal]="160 + i * 80" class="group rounded-3xl border border-line bg-background p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-lift">
                <span class="mb-4 flex size-11 items-center justify-center rounded-2xl" [class]="tone[pillar.tone].soft + ' ' + tone[pillar.tone].text">
                  <app-icon [name]="pillar.icon" />
                </span>
                <h3 class="mb-1.5 text-base font-bold">{{ pillar.title }}</h3>
                <p class="text-sm leading-relaxed text-muted">{{ pillar.text }}</p>
              </article>
            }
          </div>
        </div>
      </div>
    </section>
  `,
})
export class About {
  protected readonly img = IMG;
  protected readonly tone = TONE;
  protected readonly pillars = [
    {
      icon: 'brain',
      tone: 'leaf' as const,
      title: 'Acompañamiento clínico',
      text: 'Validación profesional, técnicas cognitivo-conductuales y regulación del sistema nervioso.',
    },
    {
      icon: 'heart',
      tone: 'clay' as const,
      title: 'Terapia compasiva',
      text: 'Desarmar la autoexigencia para cultivar una relación amorosa con tu propia historia.',
    },
    {
      icon: 'users',
      tone: 'lilac' as const,
      title: 'Tribu consciente',
      text: 'Espacios grupales para quitarse las máscaras y abrazar una sororidad auténtica, sin comparación.',
    },
  ];
}
