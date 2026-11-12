import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { map } from 'rxjs';
import { srcset } from '../core/content';
import { businessJsonLd, SeoService } from '../core/seo.service';
import { SERVICE_PAGES, serviceBySlug } from '../core/services';
import { SITE, whatsappLink } from '../core/site.config';
import { Icon } from '../shared/icon';
import { Reveal } from '../shared/reveal.directive';
import { Contact } from './home/contact';
import { FinalCta } from './home/final-cta';
import { Kids } from './home/kids';
import { Retreat } from './home/retreat';
import { ServiceLinks } from '../shared/service-links';
import { Testimonials } from './home/testimonials';

// Página de servicio (psicóloga en La Chorrera, atención de pareja, psicología en línea, psicología infantil).
// Todas comparten esta plantilla; el contenido sale de core/services.ts.
@Component({
  selector: 'app-servicio',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink, Icon, Reveal, FinalCta, Testimonials, Retreat, Kids, Contact, ServiceLinks],
  template: `
    @if (page(); as p) {
      <!-- Cabecera: burgundy, con foto en arco como el inicio -->
      <section class="relative overflow-hidden bg-forest-900 pt-12 pb-28 text-white md:pt-16 md:pb-36">
        <div class="pointer-events-none absolute -top-20 -right-20 size-64 rounded-full bg-forest-500 md:size-96" aria-hidden="true"></div>
        <div class="page relative grid items-center gap-10 lg:grid-cols-12">
          <div class="lg:col-span-7">
            <nav aria-label="Ruta" class="mb-6 text-sm text-white/70">
              <a routerLink="/" class="font-semibold underline-offset-4 hover:underline">Inicio</a>
              <span aria-hidden="true"> / </span>
              <span>{{ p.navLabel }}</span>
            </nav>
            <h1 class="font-display text-4xl leading-[1.05] font-semibold tracking-tight md:text-6xl">
              {{ p.h1 }} <span class="text-accent italic">{{ p.h1Accent }}.</span>
            </h1>
            <p class="mt-6 max-w-[56ch] text-base leading-relaxed text-white/90 sm:text-lg">{{ p.lead }}</p>
            <div class="mt-8 flex flex-col gap-3 sm:flex-row">
              <a routerLink="/agendar" class="btn-primary h-14 px-8 text-base">Agendar cita <app-icon name="arrowRight" [size]="18" /></a>
              <a class="btn-outline-light h-14 px-7 text-base" [href]="whatsapp" target="_blank" rel="noopener noreferrer"><app-icon name="message" [size]="18" /> Escribir por WhatsApp</a>
            </div>
          </div>
          <div class="relative mx-auto w-full max-w-[18rem] lg:col-span-5 lg:max-w-sm">
            <div class="pointer-events-none absolute -top-4 -left-4 size-24 rounded-full bg-accent" aria-hidden="true"></div>
            <img
              [src]="p.image"
              [attr.srcset]="srcset(p.image)"
              sizes="(min-width: 1024px) 24rem, 18rem"
              [alt]="p.imageAlt"
              width="560"
              height="700"
              fetchpriority="high"
              class="relative aspect-[4/5] w-full rounded-t-[999px] rounded-b-[2rem] object-cover object-[50%_20%] shadow-lift"
            />
          </div>
        </div>
      </section>

      <!-- Para quién -->
      <section class="layer z-10 bg-background section-y">
        <div class="page grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div class="lg:col-span-5">
            <h2 appReveal class="heading-lg text-forest-900">{{ p.forWhoTitle }}</h2>
            <p appReveal="60" class="lead mt-4">Si te identificas con alguna de estas situaciones, este espacio es para ti.</p>
          </div>
          <ul class="grid gap-3 lg:col-span-7">
            @for (item of p.forWho; track item; let i = $index) {
              <li [appReveal]="i * 50" class="flex items-start gap-3 rounded-[1.5rem] bg-surface-muted px-5 py-4 text-forest-900">
                <app-icon name="checkCircle" [size]="22" class="mt-0.5 shrink-0 text-forest-500" />
                <span class="leading-relaxed">{{ item }}</span>
              </li>
            }
          </ul>
        </div>
      </section>

      <app-testimonials />

      <!-- Cómo trabajamos + datos -->
      <section class="layer z-30 bg-background section-y">
        <div class="page">
          <h2 appReveal class="heading-lg max-w-3xl text-forest-900">Cómo es <span class="font-semibold text-forest-500 italic">el proceso.</span></h2>
          <ol class="mt-10 grid gap-4 md:grid-cols-3">
            @for (step of p.steps; track step.title; let i = $index) {
              <li [appReveal]="i * 70" class="rounded-[2rem] bg-forest-100 p-6 sm:p-7">
                <span class="flex size-10 items-center justify-center rounded-full bg-forest-500 font-display text-lg font-bold text-white" aria-hidden="true">{{ i + 1 }}</span>
                <h3 class="mt-4 font-display text-xl font-bold text-forest-900">{{ step.title }}</h3>
                <p class="mt-2 leading-relaxed text-ink">{{ step.text }}</p>
              </li>
            }
          </ol>

          <dl appReveal class="mt-8 grid gap-px overflow-hidden rounded-[2rem] bg-forest-500/20 sm:grid-cols-2">
            @for (fact of p.facts; track fact.label) {
              <div class="bg-surface px-6 py-5">
                <dt class="text-xs font-bold tracking-wide text-forest-500 uppercase">{{ fact.label }}</dt>
                <dd class="mt-1 font-semibold text-forest-900">{{ fact.value }}</dd>
              </div>
            }
          </dl>
        </div>
      </section>

      <!-- Sobre Nathalie -->
      <section class="layer z-[35] overflow-hidden bg-surface-muted py-20 sm:py-24 md:py-28">
        <div class="page grid items-center gap-12 lg:grid-cols-12 lg:gap-16">
          <div appReveal class="relative mx-auto w-full max-w-[20rem] lg:col-span-4 lg:max-w-none">
            <div class="pointer-events-none absolute -top-4 -right-4 size-24 rounded-full bg-accent" aria-hidden="true"></div>
            <img
              [src]="bioImage()"
              [attr.srcset]="srcset(bioImage())"
              sizes="(min-width: 1024px) 24rem, 20rem"
              alt="Psicóloga Nathalie Vera"
              width="560"
              height="840"
              loading="lazy"
              decoding="async"
              class="relative aspect-[3/4] w-full rounded-t-[999px] rounded-b-[2rem] object-cover object-[50%_18%] shadow-lift"
            />
          </div>
          <div class="lg:col-span-8">
            <h2 appReveal class="heading-lg text-forest-900">Soy Nathalie, <span class="font-semibold text-forest-500 italic">y te acompaño.</span></h2>
            <p appReveal="60" class="lead mt-4 max-w-[58ch]">
              Psicóloga idónea, con un enfoque integrativo de base cognitivo-conductual. Creo que el bienestar emocional también se construye a través de nuestras relaciones y del sentido de pertenencia; por eso, además de la atención psicológica, creé Metamorfosis.
            </p>
            <p appReveal="100" class="mt-5 inline-flex rounded-full bg-forest-900 px-4 py-2 text-sm font-bold text-white">"Ninguna mujer sana sola."</p>
            <ul appReveal="140" class="mt-8 grid gap-3 sm:grid-cols-3">
              <li class="rounded-[1.5rem] bg-accent px-5 py-4 text-forest-900"><span class="block font-display text-3xl leading-none font-bold">+1500</span><span class="mt-1 block text-sm font-bold">Vidas acompañadas</span></li>
              <li class="rounded-[1.5rem] bg-forest-500 px-5 py-4 text-white"><span class="block font-display text-xl leading-tight font-bold">Psicóloga general idónea</span><span class="mt-1 block text-sm font-semibold text-white/90">Individual y de pareja</span></li>
              <li class="rounded-[1.5rem] bg-forest-100 px-5 py-4 text-forest-900"><span class="block font-display text-xl leading-tight font-bold">Presencial y virtual</span><span class="mt-1 block text-sm font-semibold">La Chorrera y todo Panamá</span></li>
            </ul>
          </div>
        </div>
      </section>

      @if (p.showcase === 'kids') {
        <app-kids layerClass="z-[40]" tone="bg-surface" />
      } @else {
        <app-retreat />
      }

      <!-- Preguntas de esta página -->
      <section class="layer z-[45] bg-background section-y">
        <div class="page grid gap-12 lg:grid-cols-12 lg:gap-16">
          <h2 appReveal class="heading-lg text-forest-900 lg:col-span-4">Preguntas <span class="font-semibold text-forest-500 italic">frecuentes.</span></h2>
          <div class="grid gap-3 lg:col-span-8">
            @for (item of p.faqs; track item.question; let i = $index) {
              <details [appReveal]="i * 50" class="group rounded-[2rem] bg-surface-muted px-6 transition-colors duration-200 open:bg-forest-100 sm:px-8" [open]="i === 0">
                <summary class="flex cursor-pointer list-none items-center justify-between gap-6 py-5 text-lg font-semibold text-forest-900 [&::-webkit-details-marker]:hidden">
                  <span class="font-display">{{ item.question }}</span>
                  <app-icon name="chevronDown" [size]="20" class="shrink-0 transition-transform duration-300 group-open:rotate-180" />
                </summary>
                <p class="max-w-[65ch] pb-6 leading-relaxed text-ink">{{ item.answer }}</p>
              </details>
            }
          </div>
        </div>
      </section>

      <app-contact />

      <app-service-links title="Otros servicios" [exclude]="p.slug" layerClass="z-[53]" [note]="true" />

      <app-final-cta />
    }
  `,
})
export class Servicio {
  private readonly seo = inject(SeoService);
  /** Las fotos de estudio de Nathalie tienen versiones de 560 y 934 px; las demás, de 640 px. */
  protected srcset(src: string) {
    const studio = /^(\/img\/nathalie-vera(?:-cuerpo)?)-934\.webp$/.exec(src);
    return studio ? `${studio[1]}-560.webp 560w, ${src} 934w` : srcset(src);
  }
  protected readonly whatsapp = whatsappLink(`Hola ${SITE.therapistShort}, vi tu página y quiero información sobre una cita.`);

  private readonly slug = toSignal(inject(ActivatedRoute).data.pipe(map((d) => d['slug'] as string)), { requireSync: true });
  protected readonly page = computed(() => serviceBySlug(this.slug()));
  /** Foto de la sección «Sobre Nathalie»: distinta a la de la cabecera. */
  protected readonly bioImage = computed(() => (this.page()?.image.includes('cuerpo') ? '/img/fotos/nathalie.webp' : '/img/nathalie-vera-cuerpo-560.webp'));

  constructor() {
    const p = this.page();
    if (!p) return;
    const url = `${SITE.url}/${p.slug}`;
    this.seo.set({
      title: p.title,
      description: p.description,
      path: `/${p.slug}`,
      jsonLd: [
        businessJsonLd(p.description),
        {
          '@context': 'https://schema.org',
          '@type': 'Service',
          name: p.serviceName,
          serviceType: p.serviceName,
          url,
          description: p.description,
          provider: { '@id': `${SITE.url}/#negocio` },
          areaServed: [{ '@type': 'City', name: 'La Chorrera' }, { '@type': 'AdministrativeArea', name: 'Panamá Oeste' }, { '@type': 'Country', name: 'Panamá' }],
        },
        {
          '@context': 'https://schema.org',
          '@type': 'BreadcrumbList',
          itemListElement: [
            { '@type': 'ListItem', position: 1, name: 'Inicio', item: SITE.url },
            { '@type': 'ListItem', position: 2, name: p.navLabel, item: url },
          ],
        },
        {
          '@context': 'https://schema.org',
          '@type': 'FAQPage',
          mainEntity: p.faqs.map((f) => ({ '@type': 'Question', name: f.question, acceptedAnswer: { '@type': 'Answer', text: f.answer } })),
        },
      ],
    });
  }
}

export const SERVICE_SLUGS = SERVICE_PAGES.map((p) => p.slug);
