import { ChangeDetectionStrategy, Component } from '@angular/core';
import { KIDS } from '../../core/content';
import { SITE, whatsappLink } from '../../core/site.config';
import { Icon } from '../../shared/icon';
import { Reveal } from '../../shared/reveal.directive';
import { TONE } from '../../shared/tones';

@Component({
  selector: 'app-kids',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [Icon, Reveal],
  template: `
    <section id="espacio-kids" class="section-y relative overflow-hidden bg-background">
      <div class="pointer-events-none absolute top-10 -left-24 size-80 rounded-full bg-lilac-100 blur-3xl" aria-hidden="true"></div>
      <div class="pointer-events-none absolute -right-24 bottom-10 size-80 rounded-full bg-honey-100 blur-3xl" aria-hidden="true"></div>

      <div class="page relative">
        <header class="mx-auto mb-14 max-w-3xl space-y-4 text-center">
          <p appReveal class="eyebrow bg-lilac-100 text-lilac-600"><app-icon name="smile" [size]="16" /> Área infantil y neurodesarrollo</p>
          <h2 appReveal="80" class="heading-lg">Espacio creativo: <em class="text-lilac-600">Metamorfosis Kids</em></h2>
          <p appReveal="120" class="lead">
            Un entorno terapéutico y lúdico para niños y preadolescentes. Estimulamos su potencial cognitivo y emocional con juego
            estructurado, bloques, tangram, origami y respiración consciente.
          </p>
          <ul appReveal="160" class="flex flex-wrap justify-center gap-2 pt-2">
            @for (badge of badges; track badge.label) {
              <li class="chip"><app-icon [name]="badge.icon" [size]="16" [class]="badge.color" /> {{ badge.label }}</li>
            }
          </ul>
        </header>

        <div class="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          @for (program of programs; track program.title; let i = $index) {
            <article [appReveal]="(i % 3) * 90" class="card group flex flex-col overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-lift">
              <div class="relative aspect-[4/3] overflow-hidden bg-surface-muted">
                <img
                  [src]="program.image"
                  [alt]="program.alt"
                  width="480"
                  height="360"
                  loading="lazy"
                  decoding="async"
                  class="size-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <span class="absolute top-4 left-4 inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-[11px] font-bold tracking-wide uppercase shadow-soft" [class]="tone[program.tone].solid">
                  <app-icon [name]="program.icon" [size]="14" /> {{ program.tag }}
                </span>
              </div>
              <div class="flex flex-1 flex-col p-6">
                <h3 class="mb-2 text-lg font-bold">{{ program.title }}</h3>
                <p class="flex-1 text-sm leading-relaxed text-muted">{{ program.text }}</p>
                <p class="mt-5 flex items-center gap-2 border-t border-line pt-4 text-xs font-bold" [class]="tone[program.tone].text">
                  <app-icon name="sparkles" [size]="14" /> {{ program.skill }}
                </p>
              </div>
            </article>
          }
        </div>

        <div appReveal class="mt-12 flex flex-col items-center justify-between gap-6 rounded-[2rem] border border-line bg-surface p-8 text-center shadow-soft md:flex-row md:text-left">
          <div class="space-y-1">
            <h3 class="text-xl font-bold">¿Quieres una evaluación o un taller para tu hijo o hija?</h3>
            <p class="text-muted">Sesiones de psicología infantil y grupos pequeños de estimulación socioemocional.</p>
          </div>
          <a class="btn-leaf shrink-0" [href]="whatsapp" target="_blank" rel="noopener noreferrer">
            <app-icon name="message" [size]="18" /> Consultar por terapia infantil
          </a>
        </div>
      </div>
    </section>
  `,
})
export class Kids {
  protected readonly programs = KIDS;
  protected readonly tone = TONE;
  protected readonly whatsapp = whatsappLink(`Hola ${SITE.therapistShort}, quisiera información sobre Metamorfosis Kids y los talleres infantiles.`);
  protected readonly badges = [
    { icon: 'wind', label: 'Regulación emocional', color: 'text-leaf-700' },
    { icon: 'target', label: 'Atención y foco', color: 'text-clay-600' },
    { icon: 'blocks', label: 'Juego guiado y psicomotricidad', color: 'text-honey-600' },
    { icon: 'palette', label: 'Creatividad y expresión', color: 'text-lilac-600' },
  ];
}
