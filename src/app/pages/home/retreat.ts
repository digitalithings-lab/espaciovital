import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { IMG, srcset } from '../../core/content';
import { Icon } from '../../shared/icon';
import { Reveal } from '../../shared/reveal.directive';

// Retiro Metamorfosis: sección oscura de ancho completo (contraste de ritmo con el resto de la página).
@Component({
  selector: 'app-retreat',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink, Icon, Reveal],
  template: `
    <section id="retiro" class="section-y bg-forest-900 text-white">
      <div class="page">
        <div class="grid items-center gap-12 lg:grid-cols-12 lg:gap-16">
          <div class="lg:col-span-6">
            <p appReveal class="eyebrow text-accent">Retiro Metamorfosis · Cupo de 20 mujeres</p>
            <h2 appReveal="60" class="heading-lg mt-4">Despierta en la playa. Respira. <span class="font-semibold text-accent">Vuelve a pertenecerte.</span></h2>
            <p appReveal="100" class="mt-6 max-w-[56ch] text-lg leading-relaxed text-white/75">
              Un fin de semana para desacelerar, soltar expectativas ajenas y volver a tu vida con paz, límites sanos y propósito renovado.
            </p>
            <ul appReveal="140" class="mt-8 grid max-w-lg grid-cols-2 gap-x-6 gap-y-3 text-sm text-white/85">
              @for (item of includes; track item.label) {
                <li class="flex items-center gap-2.5"><app-icon [name]="item.icon" [size]="20" class="text-accent" /> {{ item.label }}</li>
              }
            </ul>
            <a appReveal="180" routerLink="/" fragment="proximas-fechas" class="btn-primary mt-10">Ver fechas</a>
          </div>
          <figure appReveal="120" class="lg:col-span-6">
            <img
              [src]="img.retreat"
              [attr.srcset]="srcset(img.retreat)"
              sizes="(min-width: 1024px) 45vw, 92vw"
              alt="Grupo de mujeres saludando dentro del agua en el Retiro Metamorfosis"
              width="640"
              height="520"
              loading="lazy"
              decoding="async"
              class="aspect-[5/4] w-full rounded-3xl object-cover"
            />
          </figure>
        </div>

        <!-- Los cuatro pilares del retiro, en columnas separadas por una línea (sin tarjetas). -->
        <ol class="mt-20 grid gap-10 border-t border-white/15 pt-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
          @for (step of pillars; track step.title; let i = $index) {
            <li [appReveal]="i * 80">
              <span class="font-display text-sm font-semibold text-accent tabular-nums">0{{ i + 1 }}</span>
              <h3 class="mt-3 text-xl font-medium">{{ step.title }}</h3>
              <p class="mt-2 text-sm leading-relaxed text-white/70">{{ step.text }}</p>
            </li>
          }
        </ol>
      </div>
    </section>
  `,
})
export class Retreat {
  protected readonly img = IMG;
  protected readonly srcset = srcset;
  protected readonly includes = [
    { icon: 'leaf', label: 'Terapia somática' },
    { icon: 'waves', label: 'Ritual marino' },
    { icon: 'utensils', label: 'Alimentación nutritiva' },
    { icon: 'notebook', label: 'Cuaderno clínico guiado' },
  ];
  protected readonly pillars = [
    {
      title: 'Liberación emocional',
      text: 'Desahogo guiado para procesar duelos, soltar cargas invisibles y sanar heridas con contención terapéutica.',
    },
    {
      title: 'Red de sororidad',
      text: 'Conectar sin juicio ni comparación: el alivio de ser escuchada y sostenida por otras mujeres.',
    },
    {
      title: 'Naturaleza',
      text: 'Ejercicios somáticos y meditación entre el mar y el bosque para reiniciar tu sistema nervioso.',
    },
    {
      title: 'Herramientas',
      text: 'Recursos clínicos, autorregulación y asertividad para aplicar al volver a casa.',
    },
  ];
}
