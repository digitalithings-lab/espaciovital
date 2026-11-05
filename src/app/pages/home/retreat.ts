import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { IMG, METAMORFOSIS_TESTIMONIALS, srcset } from '../../core/content';
import { Icon } from '../../shared/icon';
import { Reveal } from '../../shared/reveal.directive';

// Actividades Metamorfosis: sección oscura de ancho completo (contraste de ritmo con el resto de la página).
@Component({
  selector: 'app-retreat',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink, Icon, Reveal],
  template: `
    <section id="retiro" class="layer z-40 section-y bg-forest-900 text-white">
      <div class="page">
        <div class="grid items-center gap-14 lg:grid-cols-12 lg:gap-16">
          <div class="lg:col-span-6">
            <h2 appReveal class="heading-xl">Sal de la rutina: <span class="font-semibold text-accent italic">conecta, disfruta y pertenece.</span></h2>
            <p appReveal="100" class="mt-6 max-w-[56ch] text-lg leading-relaxed text-white/85">
              Una comunidad femenina donde las desconocidas se convierten en amigas. Creamos experiencias para compartir, conocer nuevas personas, descubrir lugares y construir conexiones auténticas a través de la diversión.
            </p>
            <p appReveal="120" class="mt-4 text-sm font-bold text-forest-100">Actividades Metamorfosis</p>
            <ul appReveal="140" class="mt-6 flex flex-wrap gap-2">
              @for (item of includes; track item.label) {
                <li class="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm text-white">
                  <app-icon [name]="item.icon" [size]="18" class="text-accent" /> {{ item.label }}
                </li>
              }
            </ul>
            <a appReveal="180" routerLink="/" fragment="proximas-fechas" class="btn-primary mt-10">Ver fechas</a>
          </div>

          <!-- Foto principal con esquinas orgánicas y dos recuerdos en círculo -->
          <div appReveal="120" class="relative mx-auto w-full max-w-xl pb-10 lg:col-span-6 lg:max-w-none">
            <div class="overflow-hidden rounded-[2rem] rounded-tl-[6rem] rounded-br-[6rem] shadow-lift">
              <img
                [src]="img.retreat"
                [attr.srcset]="srcset(img.retreat)"
                sizes="(min-width: 1024px) 40vw, 92vw"
                alt="Grupo de mujeres en las actividades Metamorfosis"
                width="640"
                height="480"
                loading="lazy"
                decoding="async"
                class="aspect-[5/4] w-full object-cover"
              />
            </div>
            <img
              src="/img/fotos/retiro-mirador-640.webp"
              alt="Vista desde el mirador del retiro"
              width="640"
              height="480"
              loading="lazy"
              decoding="async"
              class="absolute -top-6 -right-2 size-28 rounded-full border-4 border-forest-900 object-cover shadow-lift sm:-right-6 sm:size-36"
            />
            <img
              src="/img/fotos/retiro-abrazo-640.webp"
              alt="Abrazo en el retiro"
              width="640"
              height="480"
              loading="lazy"
              decoding="async"
              class="absolute -bottom-0 left-4 size-24 rounded-full border-4 border-forest-900 object-cover shadow-lift sm:left-8 sm:size-32"
            />
          </div>
        </div>

        <!-- Cinta de palabras -->
        <div class="my-14 overflow-hidden rounded-full bg-white/10 py-3" aria-hidden="true">
          <div class="flex items-center whitespace-nowrap" style="animation: marquee 22s linear infinite reverse">
            @for (item of ticker; track item) {
              <span class="mx-6 text-xs font-extrabold uppercase tracking-[0.18em] text-white/85">{{ item }}</span>
              <span class="size-1.5 shrink-0 rounded-full bg-accent"></span>
            }
            @for (item of ticker; track item) {
              <span class="mx-6 text-xs font-extrabold uppercase tracking-[0.18em] text-white/85">{{ item }}</span>
              <span class="size-1.5 shrink-0 rounded-full bg-accent"></span>
            }
          </div>
        </div>

        <!-- Los cuatro pilares, en bloques de color. -->
        <ol class="grid gap-3 sm:grid-cols-2 lg:grid-cols-4 lg:gap-4">
          @for (step of pillars; track step.title; let i = $index) {
            <li [appReveal]="i * 80" class="rounded-[2rem] p-6 sm:p-7" [class]="pillarTones[i]">
              <h3 class="font-display text-xl font-bold">{{ step.title }}</h3>
              <p class="mt-2 text-sm leading-relaxed">{{ step.text }}</p>
            </li>
          }
        </ol>

        <!-- Experiencias de las participantes -->
        <div class="mt-20">
          <h3 appReveal class="heading-lg">Experiencias <span class="font-semibold text-accent italic">reales</span> en Metamorfosis</h3>
          <p appReveal="60" class="mt-3 text-base font-medium text-forest-100">Lo que dicen nuestras participantes</p>
          <ul class="mt-8 grid gap-4 md:grid-cols-3">
            @for (t of testimonials; track t.name; let i = $index) {
              <li [appReveal]="i * 80" class="flex flex-col rounded-[2rem] bg-forest-100 p-6 text-forest-900 sm:p-7" [class.md:translate-y-6]="i === 1">
                <app-icon name="quote" [size]="28" class="text-forest-500" />
                <blockquote class="mt-3 flex-1 text-base leading-relaxed">{{ t.quote }}</blockquote>
                <figcaption class="mt-5 flex items-center gap-3">
                  <span class="flex size-10 items-center justify-center rounded-full bg-forest-900 font-display text-sm font-bold text-white">{{ t.name[0] }}</span>
                  <span>
                    <span class="block text-sm font-bold">{{ t.name }}</span>
                    <span class="block text-xs text-forest-900/80">{{ t.detail }}</span>
                  </span>
                </figcaption>
              </li>
            }
          </ul>
        </div>
      </div>
    </section>
  `,
})
export class Retreat {
  protected readonly img = IMG;
  protected readonly srcset = srcset;
  protected readonly testimonials = METAMORFOSIS_TESTIMONIALS;
  protected readonly ticker = [
    'Amistad',
    'Aventuras',
    'Diversión',
    'Conexión',
    'Convivencia',
    'Experiencias',
  ];
  protected readonly includes = [
    { icon: 'film', label: 'Cine y salidas recreativas' },
    { icon: 'tent', label: 'Camping y aventuras al aire libre' },
    { icon: 'palette', label: 'Talleres y actividades creativas' },
    { icon: 'trophy', label: 'Juegos, competencias y deportes' },
    { icon: 'mask', label: 'Fiestas temáticas y disfraces' },
    { icon: 'compass', label: 'Paseos turísticos y nuevas experiencias' },
  ];
  protected readonly pillarTones = [
    'bg-forest-100 text-forest-900',
    'bg-accent text-forest-900',
    'bg-forest-500 text-white',
    'bg-surface-muted text-forest-900',
  ];
  protected readonly pillars = [
    {
      title: 'Nuevas amistades',
      text: 'Amplía tu círculo social y crea conexiones auténticas a través de experiencias compartidas.',
    },
    {
      title: 'Aventuras y experiencias',
      text: 'Disfruta de paseos, cine, deportes, talleres, juegos y actividades que te invitan a salir de la rutina.',
    },
    {
      title: 'Diversión y convivencia',
      text: 'Comparte risas, participa en dinámicas grupales y disfruta de momentos especiales en un ambiente acogedor.',
    },
    {
      title: 'Premios y recuerdos',
      text: 'Participa en competencias, gana premios y colecciona recuerdos de momentos inolvidables.',
    },
  ];
}
