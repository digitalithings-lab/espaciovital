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
            <p appReveal class="eyebrow text-accent">Actividades Metamorfosis </p>
            <h2 appReveal="60" class="heading-lg mt-4">Sal de la rutina <span class="font-semibold text-accent">conecta ,disfruta y pertenece.</span></h2>
            <p appReveal="100" class="mt-6 max-w-[56ch] text-lg leading-relaxed text-white/75">
           una comunidad femenina , donde las desconocidas , se convierten en amigas.creamos experiencias para compartir, conocer nuevas personas, descubrir lugares y construir conexiones autenticas a travez de la diversion
          </p>
            <ul appReveal="140" class="mt-8 grid max-w-lg grid-cols-2 gap-x-6 gap-y-3 text-sm text-white/85">
              @for (item of includes; track item.label) {
                <li class="flex items-center gap-2.5"><app-icon [name]="item.icon" [size]="20" class="text-accent" /> {{ item.label }}</li>
              }
            </ul>
            <a appReveal="180" routerLink="/" fragment="proximas-fechas" class="btn-primary mt-10">Ver fechas</a>
          </div>
          <!-- Collage de 3 fotos apiladas, efecto "fotos sobre mesa" -->
          <div appReveal="120" class="relative lg:col-span-6" style="height: 420px;">

            <!-- Foto trasera: abrazo, rotada positivo, esquina inferior-derecha -->
            <div class="absolute bottom-0 right-0 w-[55%] rotate-[6deg] overflow-hidden rounded-2xl bg-white/10 p-1.5 shadow-lift">
              <img
                src="/img/fotos/retiro-abrazo-640.webp"
                alt="Abrazo en el retiro"
                width="640"
                height="480"
                loading="lazy"
                decoding="async"
                class="aspect-[4/3] w-full rounded-xl object-cover"
              />
            </div>

            <!-- Foto media: mirador, rotada negativo, arriba-izquierda -->
            <div class="absolute top-0 left-0 w-[52%] rotate-[-5deg] overflow-hidden rounded-2xl bg-white/10 p-1.5 shadow-lift">
              <img
                src="/img/fotos/retiro-mirador-640.webp"
                alt="Vista desde el mirador del retiro"
                width="640"
                height="480"
                loading="lazy"
                decoding="async"
                class="aspect-[4/3] w-full rounded-xl object-cover"
              />
            </div>

            <!-- Foto principal: manglar (la mayor), centrada y encima -->
            <div class="absolute top-1/2 left-1/2 w-[68%] -translate-x-1/2 -translate-y-1/2 rotate-[-1deg] overflow-hidden rounded-2xl bg-white/10 p-1.5 shadow-lift">
              <img
                [src]="img.retreat"
                [attr.srcset]="srcset(img.retreat)"
                sizes="(min-width: 1024px) 30vw, 60vw"
                alt="Grupo de mujeres en el Retiro Metamorfosis"
                width="640"
                height="480"
                loading="lazy"
                decoding="async"
                class="aspect-[4/3] w-full rounded-xl object-cover"
              />
            </div>
          </div>
        </div>

        <!-- Ticker inverso dentro de la sección oscura -->
        <div class="my-12 overflow-hidden rounded-2xl bg-white/10 py-3" aria-hidden="true">
          <div class="flex whitespace-nowrap" style="animation: marquee 22s linear infinite reverse">
            @for (item of ticker; track item) {
              <span class="mx-6 text-xs font-extrabold uppercase tracking-[0.18em] text-white/80">{{ item }}</span>
              <span class="mr-6 text-accent font-bold">✦</span>
            }
            @for (item of ticker; track item) {
              <span class="mx-6 text-xs font-extrabold uppercase tracking-[0.18em] text-white/80">{{ item }}</span>
              <span class="mr-6 text-accent font-bold">✦</span>
            }
          </div>
        </div>

        <!-- Los cuatro pilares del retiro, en columnas separadas por una línea (sin tarjetas). -->
        <ol class="grid gap-10 border-t border-white/15 pt-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
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
  protected readonly ticker = [
    'amistad ',
    'aventuras',
    'diversion',
    'conexion',
    'convivencia',
    'experiencias',
  ];
  protected readonly includes = [
    { icon: 'leaf', label: 'Cine y salidas recreativas' },
    { icon: 'waves', label: 'camping y aventuras al aire libre' },
    { icon: 'utensils', label: 'talleres y actividades creativas' },
    { icon: 'notebook', label: 'juegos competencias y deportes' },
    { icon: 'notebook', label: 'fiestas tematicas y disfraces' },

    { icon: 'notebook', label: 'paseos turisticos y nuevas experiencias' },

  ];
  protected readonly pillars = [
    {
      title: 'nuevas amistades',
      text: 'amplia tu circulo social y crea conexiones autenticas a travez de experiencias compartidas',
    },
    {
      title: 'Aventuras y experiencias',
      text: 'disfruta de paseos, cine, deportes, talleres, juegos y actividades que te invitan a salir de la rutina',
    },
    {
      title: 'Diversion y convivencia',
      text: 'comparte risas,participa en dinamicas grupales y disfruta de momentos especiales en un ambiente acogedor',
    },
    {
      title: 'Premios y recuerdos',
      text: 'participa en competencias, gana premios y colecciona recuerdos de momentos inolvidables.',
    },
  ];
}
