import { ChangeDetectionStrategy, Component } from '@angular/core';
import { IMG } from '../../core/content';
import { Reveal } from '../../shared/reveal.directive';

@Component({
  selector: 'app-about',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [Reveal],
  template: `
    <!-- Sección manifiesto: fúcsia sólido, tipografía grande, sin degradados. -->
    <section id="sobre-mi" class="relative bg-forest-500 py-20 md:py-28 text-white">
      <div class="page grid items-center gap-12 lg:grid-cols-12 lg:gap-16">

        <!-- Collage fotográfico izquierda: stack de polaroids rotados -->
        <div appReveal class="relative lg:col-span-4 lg:sticky lg:top-28 lg:self-start" style="height: 480px;">

          <!-- Foto de fondo: bote con Nathalie, rotada positivo, offset -->
          <div class="absolute bottom-0 right-4 w-[68%] rotate-[4deg] overflow-hidden rounded-2xl bg-white p-2 shadow-lift">
            <img
              src="/img/fotos/retiro-nathalie-bote-960.webp"
              alt="Nathalie Vera en el retiro, rumbo a la isla"
              width="960"
              height="720"
              loading="lazy"
              decoding="async"
              class="aspect-[4/3] w-full rounded-xl object-cover object-[50%_35%]"
            />
          </div>

          <!-- Foto principal: Nathalie, polaroid con quote, rotada negativo, encima -->
          <div class="absolute top-0 left-0 w-[78%] rotate-[-3deg] overflow-hidden rounded-2xl bg-white p-2 shadow-lift">
            <img
              src="/img/nathalie-vera-cuerpo-560.webp"
              alt="Psicóloga Nathalie Vera en el estudio"
              width="560"
              height="840"
              loading="lazy"
              decoding="async"
              class="aspect-[3/4] w-full rounded-xl object-cover object-[50%_18%]"
            />
            <!-- Quote dentro del polaroid -->
            <p class="px-1 pt-2 pb-1 text-center text-xs font-bold text-forest-700 italic">"Ninguna mujer sana sola."</p>
          </div>

          <!-- Chip de año flotante -->
          <div class="absolute -bottom-3 left-1/2 -translate-x-1/2 rotate-[-1deg] rounded-full bg-accent px-4 py-1.5 text-[10px] font-extrabold uppercase tracking-widest text-forest-900 shadow-soft whitespace-nowrap">
           Convivencia femenina
          </div>
        </div>

        <!-- Copy grande derecha -->
        <div class="lg:col-span-8">
          <p appReveal class="text-xs font-bold tracking-[0.18em] uppercase text-white/60">Sobre la psicóloga</p>
          <h2 appReveal="60" class="font-display text-4xl leading-[1.05] font-bold tracking-tight mt-4 md:text-5xl lg:text-6xl">
            No se trata solo<br>de sentirte mejor.<br>
            <span class="text-accent italic">Se trata de aprender a vivir mejor.</span>
          </h2>
          <p appReveal="100" class="mt-8 max-w-[56ch] text-lg leading-relaxed text-white/80">
            Soy Nathalie Vera, psicóloga idónea, con un enfoque integrativo de base cognitivo-conductual. Brindo atención
            psicológica individual y de pareja en modalidad presencial en La Chorrera (Panamá Oeste) y virtual para todo Panamá, adaptada a las necesidades de cada persona. Creo firmemente que el bienestar emocional también se construye a través de nuestras relaciones, convivencias y el sentido de pertenencia; por esto, además del acompañamiento psicoterapéutico, he creado Metamorfosis.
          </p>

          <!-- Badge flotante decorativo -->
          <div class="hidden lg:block absolute top-16 right-4 rotate-[5deg] bg-white rounded-2xl px-5 py-4 shadow-lift max-w-[180px] z-10">
            <p class="text-[10px] font-extrabold uppercase tracking-[0.15em] text-muted">Fundadora</p>
            <p class="font-display text-base font-bold text-forest-700 leading-tight">EspacioVital</p>
            <p class="mt-1 text-xs text-muted">Psic. Nathalie Vera</p>
          </div>

          <!-- Enfoque sin tarjetas: divisores blancos semitransparentes -->
          <ol id="terapia" class="mt-12 divide-y divide-white/20 border-y border-white/20">
            @for (pillar of pillars; track pillar.title; let i = $index) {
              <li [appReveal]="i * 80" class="grid gap-2 py-6 sm:grid-cols-[4rem_1fr] sm:gap-6">
                <span class="font-display text-sm font-bold tabular-nums text-accent">0{{ i + 1 }}</span>
                <div>
                  <h3 class="text-lg font-semibold text-white">{{ pillar.title }}</h3>
                  <p class="mt-1.5 max-w-[52ch] text-sm leading-relaxed text-white/70">{{ pillar.text }}</p>
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
      title: 'Atencion psicologica individual',
      text: 'un espacio seguro para comprender tus emociones, afrontar dificultades y fortalecer tu bienenstar',
    },
    {
      title: 'Atencion psicologica de parejas',
      text: 'fortalece la comunicacion, gestiona conflictos y construye vinculos mas saludables',
    },
    {
      title: 'Metamorfosis - Comunidad femenina',
      text: 'Espacio de convivencia y socializacion para conocer nuevas amigas compartir experiencias, disfrutar actividades recreativas y crear conexiones significativas',
    },
  ];
}
