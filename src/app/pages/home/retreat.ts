import { ChangeDetectionStrategy, Component } from '@angular/core';
import { IMG } from '../../core/content';
import { Icon } from '../../shared/icon';
import { Reveal } from '../../shared/reveal.directive';
import { TONE } from '../../shared/tones';

@Component({
  selector: 'app-retreat',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [Icon, Reveal],
  template: `
    <section id="retiro" class="section-y border-y border-line bg-surface-muted">
      <div class="page">
        <header class="mx-auto mb-14 max-w-3xl space-y-4 text-center">
          <p appReveal class="eyebrow bg-clay-100 text-clay-600">Experiencia vivencial inmersiva</p>
          <h2 appReveal="80" class="heading-lg">Retiro Metamorfosis: <em class="text-clay-600">un viaje hacia ti</em></h2>
          <p appReveal="120" class="lead">
            Un fin de semana para desacelerar, soltar expectativas ajenas y reconectar con la mujer que vive debajo de tus múltiples roles.
          </p>
        </header>

        <div appReveal class="bg-retreat relative mb-14 overflow-hidden rounded-[2.5rem] p-8 text-white shadow-lift md:p-12">
          <div class="grid items-center gap-10 lg:grid-cols-12">
            <div class="space-y-5 lg:col-span-7">
              <span class="inline-block rounded-full bg-white/15 px-3.5 py-1 text-[11px] font-bold tracking-[0.12em] uppercase backdrop-blur">
                Cupos limitados a 20 mujeres
              </span>
              <h3 class="font-display text-3xl leading-tight font-semibold md:text-4xl">Despierta en la playa. Respira la brisa. Vuelve a pertenecerte.</h3>
              <p class="max-w-xl leading-relaxed text-white/85">
                En Metamorfosis no venimos a escapar de la realidad: construimos la claridad interna que necesitas para volver a tu vida con
                paz, límites sanos y propósito renovado.
              </p>
              <ul class="flex flex-wrap gap-2.5 pt-1">
                @for (item of includes; track item.label) {
                  <li class="inline-flex items-center gap-1.5 rounded-full border border-white/20 bg-white/10 px-3.5 py-1.5 text-xs font-semibold backdrop-blur">
                    <app-icon [name]="item.icon" [size]="15" /> {{ item.label }}
                  </li>
                }
              </ul>
            </div>
            <div class="lg:col-span-5">
              <img
                [src]="img.retreat"
                alt="Grupo de mujeres en el Retiro Metamorfosis"
                width="520"
                height="420"
                loading="lazy"
                decoding="async"
                class="mx-auto w-full max-w-sm rotate-2 rounded-3xl border-4 border-white/25 object-cover shadow-2xl transition-transform duration-500 hover:rotate-0"
              />
            </div>
          </div>
        </div>

        <ol class="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          @for (step of pillars; track step.title; let i = $index) {
            <li [appReveal]="i * 80" class="card relative overflow-hidden p-7">
              <span class="absolute inset-x-0 top-0 h-1.5" [class]="tone[step.tone].solid"></span>
              <span class="font-display text-4xl font-bold opacity-80" [class]="tone[step.tone].text">0{{ i + 1 }}</span>
              <h3 class="mt-3 mb-2 font-display text-xl font-semibold">{{ step.title }}</h3>
              <p class="text-sm leading-relaxed text-muted">{{ step.text }}</p>
            </li>
          }
        </ol>
      </div>
    </section>
  `,
})
export class Retreat {
  protected readonly img = IMG;
  protected readonly tone = TONE;
  protected readonly includes = [
    { icon: 'leaf', label: 'Terapia somática' },
    { icon: 'waves', label: 'Ritual marino' },
    { icon: 'utensils', label: 'Alimentación nutritiva' },
    { icon: 'notebook', label: 'Cuaderno clínico guiado' },
  ];
  protected readonly pillars = [
    {
      tone: 'clay' as const,
      title: 'Liberación emocional',
      text: 'Desahogo guiado para procesar duelos, soltar cargas invisibles y sanar heridas con contención terapéutica.',
    },
    {
      tone: 'leaf' as const,
      title: 'Red de sororidad real',
      text: 'Conectar sin juicio ni comparación. El alivio de ser escuchada y sostenida por mujeres en tu misma frecuencia.',
    },
    {
      tone: 'honey' as const,
      title: 'Terapia en la naturaleza',
      text: 'Ejercicios somáticos y meditación entre el oleaje y el bosque para reiniciar tu sistema nervioso.',
    },
    {
      tone: 'lilac' as const,
      title: 'Caja de herramientas',
      text: 'Recursos clínicos, guía de autorregulación y ejercicios de asertividad para aplicar al volver a casa.',
    },
  ];
}
