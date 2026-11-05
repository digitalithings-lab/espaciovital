import { ChangeDetectionStrategy, Component } from '@angular/core';
import { IMG } from '../../core/content';
import { Reveal } from '../../shared/reveal.directive';

@Component({
  selector: 'app-about',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [Reveal],
  template: `
    <!-- Manifiesto: fondo crema, foto en arco y tres caminos en bloques de color. -->
    <section id="sobre-mi" class="layer z-10 overflow-hidden bg-background py-20 sm:py-24 md:py-32">
      <div class="page grid items-start gap-14 lg:grid-cols-12 lg:gap-16">
        <!-- Foto en el arco del logo, con sol naranja y círculo de la actividad -->
        <div appReveal class="relative mx-auto w-full max-w-[22rem] lg:sticky lg:top-28 lg:col-span-5 lg:max-w-none">
          <div class="pointer-events-none absolute -top-5 -left-5 size-28 rounded-full bg-accent sm:size-36" aria-hidden="true"></div>
          <div class="relative overflow-hidden rounded-t-[999px] rounded-b-[2rem] bg-forest-100 shadow-lift">
            <img
              src="/img/nathalie-vera-cuerpo-560.webp"
              alt="Psicóloga Nathalie Vera en el estudio"
              width="560"
              height="840"
              loading="lazy"
              decoding="async"
              class="aspect-[3/4] w-full object-cover object-[50%_18%]"
            />
          </div>
          <div class="absolute -right-3 -bottom-8 z-10 w-[46%] rotate-[4deg] overflow-hidden rounded-[1.5rem] bg-white p-1.5 shadow-lift sm:-right-8">
            <img
              src="/img/fotos/nathalie.webp"
              alt="Nathalie Vera en el retiro, rumbo a la isla"
              width="960"
              height="720"
              loading="lazy"
              decoding="async"
              class="aspect-[4/3] w-full rounded-[1.1rem] object-cover object-[50%_35%]"
            />
          </div>
          <p class="absolute top-1/3 -left-3 z-10 -rotate-3 rounded-full bg-forest-900 px-4 py-2 text-sm font-bold text-white shadow-lift sm:-left-6">"Ninguna mujer sana sola."</p>
        </div>

        <div class="lg:col-span-7">
          <p appReveal class="text-sm font-bold text-forest-500">Sobre la psicóloga</p>
          <h2 appReveal="60" class="mt-3 font-display text-4xl leading-[1.05] font-bold tracking-tight text-forest-900 md:text-6xl">
            No se trata solo <br class="hidden sm:inline">de sentirte mejor.<br>
            <span class="text-forest-500 italic">Se trata de aprender a vivir mejor.</span>
          </h2>
          <p appReveal="100" class="mt-7 max-w-[56ch] text-base leading-relaxed text-ink sm:text-lg">
            Soy Nathalie Vera, psicóloga idónea, con un enfoque integrativo de base cognitivo-conductual. Brindo atención
            psicológica individual y de pareja en modalidad presencial en La Chorrera (Panamá Oeste) y virtual para todo Panamá, adaptada a las necesidades de cada persona. Creo firmemente que el bienestar emocional también se construye a través de nuestras relaciones, convivencias y el sentido de pertenencia; por esto, además del acompañamiento psicoterapéutico, he creado Metamorfosis.
          </p>

          <ol id="terapia" class="mt-12 grid gap-3">
            @for (pillar of pillars; track pillar.title; let i = $index) {
              <li [appReveal]="i * 80" class="rounded-[2rem] p-6 sm:p-7" [class]="pillar.tone">
                <h3 class="font-display text-xl font-bold sm:text-2xl">{{ pillar.title }}</h3>
                <p class="mt-2 max-w-[52ch] text-sm leading-relaxed sm:text-base">{{ pillar.text }}</p>
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
      tone: 'bg-forest-100 text-forest-900',
      text: 'Un espacio seguro para comprender tus emociones, afrontar dificultades y fortalecer tu bienestar.',
    },
    {
      title: 'Atención psicológica de pareja',
      tone: 'bg-surface-muted text-forest-900',
      text: 'Fortalece la comunicación, gestiona conflictos y construye vínculos más saludables.',
    },
    {
      title: 'Metamorfosis · Comunidad femenina',
      tone: 'bg-forest-500 text-white',
      text: 'Espacio de convivencia y socialización para conocer nuevas amigas, compartir experiencias, disfrutar actividades recreativas y crear conexiones significativas.',
    },
  ];
}
