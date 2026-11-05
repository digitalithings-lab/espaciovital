import { ChangeDetectionStrategy, Component } from '@angular/core';
import { IMG } from '../../core/content';
import { Reveal } from '../../shared/reveal.directive';

@Component({
  selector: 'app-about',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [Reveal],
  template: `
    <!-- Sección manifiesto: fúcsia sólido, tipografía grande, sin degradados. -->
    <section id="sobre-mi" class="relative bg-forest-500 py-16 sm:py-20 md:py-28 text-white overflow-hidden">
      <div class="page grid items-center gap-10 sm:gap-12 lg:grid-cols-12 lg:gap-16">

        <!-- Collage fotográfico izquierda: stack de polaroids rotados -->
        <div
          appReveal
          class="relative mx-auto w-full max-w-[320px] sm:max-w-[380px] lg:max-w-none lg:col-span-4 lg:sticky lg:top-28 lg:self-start h-[370px] sm:h-[430px] lg:h-[480px] mb-4 lg:mb-0"
        >

          <!-- Foto de fondo: bote con Nathalie, rotada positivo, offset -->
          <div class="absolute bottom-2 right-1 sm:right-3 w-[66%] sm:w-[68%] rotate-[4deg] overflow-hidden rounded-2xl bg-white p-2 shadow-lift">
            <img
              src="/img/fotos/nathalie.webp"
              alt="Nathalie Vera en el retiro, rumbo a la isla"
              width="960"
              height="720"
              loading="lazy"
              decoding="async"
              class="aspect-[4/3] w-full rounded-xl object-cover object-[50%_35%]"
            />
          </div>

          <!-- Foto principal: Nathalie, polaroid con quote, rotada negativo, encima -->
          <div class="absolute top-0 left-0 w-[74%] sm:w-[78%] rotate-[-3deg] overflow-hidden rounded-2xl bg-white p-2 shadow-lift z-[2]">
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
            <p class="px-1 pt-2 pb-1 text-center text-[11px] sm:text-xs font-bold text-forest-700 italic">"Ninguna mujer sana sola."</p>
          </div>

          <!-- Chip de año flotante -->
          <div class="absolute -bottom-3 left-1/2 -translate-x-1/2 rotate-[-1deg] rounded-full bg-accent px-3.5 sm:px-4 py-1.5 text-[11px] sm:text-[11px] font-extrabold uppercase tracking-widest text-forest-900 shadow-soft whitespace-nowrap z-[3]">
           Actividades para Mujeres
          </div>
        </div>

        <!-- Copy grande derecha -->
        <div class="lg:col-span-8">
          <p appReveal class="text-xs font-bold tracking-[0.18em] uppercase text-white/70">Sobre la psicóloga</p>
          <h2 appReveal="60" class="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl leading-[1.12] sm:leading-[1.05] font-bold tracking-tight mt-3 sm:mt-4">
            No se trata solo <br class="hidden sm:inline">de sentirte mejor.<br>
            <span class="text-accent italic">Se trata de aprender a vivir mejor.</span>
          </h2>
          <p appReveal="100" class="mt-6 sm:mt-8 max-w-[56ch] text-base sm:text-lg leading-relaxed text-white/85">
            Soy Nathalie Vera, psicóloga idónea, con un enfoque integrativo de base cognitivo-conductual. Brindo atención
            psicológica individual y de pareja en modalidad presencial en La Chorrera (Panamá Oeste) y virtual para todo Panamá, adaptada a las necesidades de cada persona. Creo firmemente que el bienestar emocional también se construye a través de nuestras relaciones, convivencias y el sentido de pertenencia; por esto, además del acompañamiento psicoterapéutico, he creado Metamorfosis.
          </p>

          <!-- Badge flotante decorativo -->
          <div class="hidden lg:block absolute top-16 right-4 rotate-[5deg] bg-white rounded-2xl px-5 py-4 shadow-lift max-w-[180px] z-10">
            <p class="text-[11px] font-extrabold uppercase tracking-[0.15em] text-muted">Fundadora</p>
            <p class="font-display text-base font-bold text-forest-700 leading-tight">EspacioVital</p>
            <p class="mt-1 text-xs text-muted">Psic. Nathalie Vera</p>
          </div>

          <!-- Enfoque sin tarjetas: divisores blancos semitransparentes -->
          <ol id="terapia" class="mt-10 sm:mt-12 divide-y divide-white/20 border-y border-white/20">
            @for (pillar of pillars; track pillar.title; let i = $index) {
              <li [appReveal]="i * 80" class="grid gap-2 py-5 sm:py-6 sm:grid-cols-[4rem_1fr] sm:gap-6">
                <span class="font-display text-xs sm:text-sm font-bold tabular-nums text-accent">0{{ i + 1 }}</span>
                <div>
                  <h3 class="text-base sm:text-lg font-semibold text-white">{{ pillar.title }}</h3>
                  <p class="mt-1 sm:mt-1.5 max-w-[52ch] text-sm leading-relaxed text-white/75">{{ pillar.text }}</p>
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
      title: 'Atención psicológica individual',
      text: 'Un espacio seguro para comprender tus emociones, afrontar dificultades y fortalecer tu bienestar.',
    },
    {
      title: 'Atención psicológica de pareja',
      text: 'Fortalece la comunicación, gestiona conflictos y construye vínculos más saludables.',
    },
    {
      title: 'Metamorfosis · Comunidad femenina',
      text: 'Espacio de convivencia y socialización para conocer nuevas amigas, compartir experiencias, disfrutar actividades recreativas y crear conexiones significativas.',
    },
  ];
}
