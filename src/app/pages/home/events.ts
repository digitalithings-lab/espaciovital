import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  inject,
  OnInit,
  signal,
  viewChild,
} from '@angular/core';
import { RETREATS } from '../../core/content';
import { RetreatEdition } from '../../core/models';
import { RetreatService } from '../../core/retreat.service';
import { SITE, whatsappLink } from '../../core/site.config';
import { Icon } from '../../shared/icon';
import { Reveal } from '../../shared/reveal.directive';

const DAY = new Intl.DateTimeFormat('es', { day: 'numeric', timeZone: 'UTC' });
const DAY_MONTH = new Intl.DateTimeFormat('es', { day: 'numeric', month: 'long', timeZone: 'UTC' });
const MONTH_YEAR = new Intl.DateTimeFormat('es', { month: 'long', year: 'numeric', timeZone: 'UTC' });

function dateRange(start: string, end: string): string {
  const a = new Date(`${start}T00:00:00Z`);
  const b = new Date(`${end}T00:00:00Z`);
  if (start === end) {
    return `${DAY_MONTH.format(b)} de ${b.getUTCFullYear()}`;
  }
  return a.getUTCMonth() === b.getUTCMonth()
    ? `${DAY.format(a)} al ${DAY.format(b)} de ${MONTH_YEAR.format(b)}`
    : `${DAY_MONTH.format(a)} al ${DAY_MONTH.format(b)} de ${b.getUTCFullYear()}`;
}

@Component({
  selector: 'app-events',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [Icon, Reveal],
  template: `
    <section id="proximas-fechas" class="section-y border-t border-line overflow-hidden">
      <div class="page">
        <!-- Encabezado con título y controles responsivos -->
        <header class="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div class="max-w-2xl">
            <p appReveal class="eyebrow">Tour de Chicas · Calendario 2027</p>
            <h2 appReveal="60" class="heading-lg mt-2 sm:mt-3">
              Próximos <span class="em-brand">viajes y experiencias.</span>
            </h2>
            <p appReveal="90" class="lead mt-2.5 sm:mt-3 text-muted">
              Descubre Panamá, reconecta con la naturaleza y vive momentos inolvidables en grupo. Acompañamiento, actividades y dinámicas con la Psic. Nathalie Vera.
            </p>
          </div>

          <!-- Botones de flecha para escritorio y tablet -->
          @if (editions().length > 1) {
            <div class="hidden sm:flex items-center gap-3">
              <button
                type="button"
                (click)="scrollPrev()"
                class="flex size-11 items-center justify-center rounded-full border border-line bg-surface text-foreground shadow-soft transition-all hover:border-forest-500 hover:text-forest-600 hover:scale-105 active:scale-95"
                aria-label="Viaje anterior"
              >
                <app-icon name="chevronLeft" [size]="20" />
              </button>
              <button
                type="button"
                (click)="scrollNext()"
                class="flex size-11 items-center justify-center rounded-full border border-line bg-surface text-foreground shadow-soft transition-all hover:border-forest-500 hover:text-forest-600 hover:scale-105 active:scale-95"
                aria-label="Siguiente viaje"
              >
                <app-icon name="chevronRight" [size]="20" />
              </button>
            </div>
          }
        </header>

        @if (editions().length === 0) {
          <div class="mt-12 border-t border-line pt-10">
            <p class="font-display text-2xl font-medium">Muy pronto, nuevas fechas.</p>
            <p class="mt-2 text-muted">Escríbeme y te aviso en cuanto abramos la próxima edición.</p>
            <a class="btn-outline mt-6" [href]="waGeneral" target="_blank" rel="noopener noreferrer">
              <app-icon name="whatsapp" [size]="18" /> Escribir por WhatsApp
            </a>
          </div>
        } @else {
          <!-- Carrusel responsivo con scroll snap -->
          <div class="relative mt-8 sm:mt-10">
            <div
              #carousel
              (scroll)="onScroll($event)"
              class="flex gap-4 sm:gap-6 overflow-x-auto pb-6 pt-3 -mx-4 px-4 sm:-mx-6 sm:px-6 lg:mx-0 lg:px-0 snap-x snap-mandatory scroll-smooth no-scrollbar"
              tabindex="0"
              role="region"
              aria-label="Carrusel de viajes 2027"
            >
              @for (e of editions(); track e.id; let i = $index) {
                <article
                  [appReveal]="i * 50"
                  class="relative flex flex-col justify-between w-[84vw] max-w-[340px] sm:w-[360px] sm:max-w-none md:w-[380px] shrink-0 snap-center rounded-3xl p-5 sm:p-6 md:p-7 transition-all duration-300 hover:-translate-y-1.5"
                  [class]="e.featured ? 'bg-forest-900 text-white shadow-lift ring-1 ring-white/10' : 'border border-line bg-surface shadow-soft hover:shadow-lift'"
                >
                  <!-- Badge flotante para la tarjeta destacada -->
                  @if (e.featured) {
                    <div class="absolute -top-3.5 -right-2 rotate-[6deg] rounded-full bg-accent px-3.5 py-1 text-[11px] font-extrabold uppercase tracking-wide text-forest-900 shadow-soft">
                      ⭐ Más solicitada
                    </div>
                  }

                  <!-- Cabecera de la tarjeta: Entorno y Precio -->
                  <div>
                    <div class="flex items-center justify-between gap-2">
                      <span
                        class="inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-wider"
                        [class]="e.featured ? 'bg-white/10 text-white/90' : 'bg-forest-50 text-forest-700'"
                      >
                        <app-icon [name]="e.icon" [size]="16" [class]="e.featured ? 'text-accent' : 'text-forest-500'" />
                        {{ e.setting }}
                      </span>

                      @if (e.price) {
                        <span
                          class="rounded-full px-3 py-1 text-xs font-extrabold tracking-tight"
                          [class]="e.featured ? 'bg-accent/20 text-accent ring-1 ring-accent/30' : 'bg-surface-muted text-ink border border-line'"
                        >
                          \${{ e.price }} <span class="text-[10px] font-medium opacity-80">p/p</span>
                        </span>
                      }
                    </div>

                    <!-- Título y Ubicación -->
                    <h3 class="mt-4 sm:mt-5 font-display text-xl sm:text-2xl font-semibold tracking-tight leading-snug">
                      {{ e.name }}
                    </h3>
                    <p class="mt-1.5 text-xs sm:text-sm flex items-center gap-1.5" [class]="e.featured ? 'text-white/70' : 'text-muted'">
                      <app-icon name="mapPin" [size]="15" class="opacity-70 shrink-0" />
                      <span>{{ e.place }}</span>
                    </p>

                    <!-- Fechas y Cupos en bloque visual -->
                    <dl
                      class="mt-4 sm:mt-5 grid grid-cols-2 gap-3 rounded-2xl p-3.5 sm:p-4 text-xs sm:text-sm"
                      [class]="e.featured ? 'bg-white/5 border border-white/10' : 'bg-surface-muted/60 border border-line/60'"
                    >
                      <div>
                        <dt class="text-[11px] font-medium uppercase tracking-wider" [class]="e.featured ? 'text-white/60' : 'text-muted'">
                          Fecha
                        </dt>
                        <dd class="mt-1 font-semibold leading-tight">
                          <time [attr.datetime]="e.startDate">{{ range(e) }}</time>
                        </dd>
                      </div>
                      <div>
                        <dt class="text-[11px] font-medium uppercase tracking-wider" [class]="e.featured ? 'text-white/60' : 'text-muted'">
                          Reserva
                        </dt>
                        <dd class="mt-1 font-semibold leading-tight" [class.text-accent]="e.featured">
                          {{ e.deposit ? 'Separa con $' + e.deposit : (e.spotsLeft ? e.spotsLeft + ' cupos' : 'Cupos limitados') }}
                        </dd>
                      </div>
                    </dl>

                    <!-- Lista de inclusiones -->
                    <div class="mt-4 sm:mt-5">
                      <p class="text-[11px] font-bold uppercase tracking-wider mb-2.5" [class]="e.featured ? 'text-white/50' : 'text-muted'">
                        Qué incluye:
                      </p>
                      <ul class="space-y-2 text-xs sm:text-sm" [class]="e.featured ? 'text-white/85' : 'text-foreground/90'">
                        @for (h of e.highlights; track h) {
                          <li class="flex items-start gap-2.5">
                            <app-icon name="checkCircle" [size]="17" class="mt-0.5 shrink-0" [class]="e.featured ? 'text-accent' : 'text-forest-500'" />
                            <span class="leading-relaxed">{{ h }}</span>
                          </li>
                        }
                      </ul>
                    </div>
                  </div>

                  <!-- Botón CTA -->
                  <div class="mt-6 sm:mt-7 pt-2">
                    <a
                      [class]="e.featured ? 'btn-primary w-full shadow-soft' : 'btn-dark w-full shadow-soft'"
                      [href]="book(e)"
                      target="_blank"
                      rel="noopener noreferrer"
                      class="flex items-center justify-center gap-2 py-3 px-4 text-xs sm:text-sm font-semibold rounded-2xl transition-transform active:scale-95"
                    >
                      <app-icon name="whatsapp" [size]="18" />
                      Solicitar cupo
                    </a>
                  </div>
                </article>
              }
            </div>

            <!-- Indicadores de paginación (dots) e info para móvil -->
            <div class="mt-4 flex flex-col items-center gap-2 sm:hidden">
              <div class="flex items-center justify-center gap-1.5 py-1">
                @for (e of editions(); track e.id; let i = $index) {
                  <button
                    type="button"
                    (click)="scrollTo(i)"
                    class="h-2 rounded-full transition-all duration-300"
                    [class]="activeIndex() === i ? 'w-6 bg-accent' : 'w-2 bg-line hover:bg-muted'"
                    [attr.aria-label]="'Ir al viaje ' + (i + 1)"
                  ></button>
                }
              </div>
              <p class="text-xs text-muted">Desliza para ver más viajes ➔</p>
            </div>
          </div>
        }

        <footer class="mt-6 sm:mt-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-t border-line/60 pt-6 text-xs sm:text-sm text-muted">
          <p class="max-w-[70ch]">
            * Cada actividad deberás asegurar tu cupo con su abono inicial correspondiente. Cupos limitados por orden de reserva.
          </p>
          <a
            [href]="waGeneral"
            target="_blank"
            rel="noopener noreferrer"
            class="inline-flex items-center gap-1.5 font-medium text-forest-700 hover:text-accent transition-colors self-start sm:self-auto"
          >
            <span>¿Tienes dudas sobre los tours?</span>
            <app-icon name="arrowRight" [size]="15" />
          </a>
        </footer>
      </div>
    </section>
  `,
})
export class Events implements OnInit {
  private readonly retreatService = inject(RetreatService);
  private readonly carouselEl = viewChild<ElementRef<HTMLElement>>('carousel');

  protected readonly waGeneral = whatsappLink(
    `Hola ${SITE.therapistShort}, avísame cuando abras nuevas fechas de los viajes y retiros 2027.`,
  );

  protected readonly editions = signal<RetreatEdition[]>(
    RETREATS.filter((e) => e.startDate.startsWith('2027')),
  );

  protected readonly activeIndex = signal(0);

  async ngOnInit(): Promise<void> {
    const data = await this.retreatService.get2027Retreats();
    if (data && data.length > 0) {
      this.editions.set(data);
    }
  }

  protected onScroll(event: Event): void {
    const el = event.target as HTMLElement;
    if (!el || el.children.length === 0) return;
    const cardWidth = el.firstElementChild?.clientWidth || 340;
    const gap = 16;
    const index = Math.round(el.scrollLeft / (cardWidth + gap));
    this.activeIndex.set(Math.min(Math.max(index, 0), this.editions().length - 1));
  }

  protected scrollTo(index: number): void {
    const el = this.carouselEl()?.nativeElement;
    if (!el) return;
    const card = el.children[index] as HTMLElement;
    if (card) {
      card.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
    }
  }

  protected scrollPrev(): void {
    const el = this.carouselEl()?.nativeElement;
    if (!el) return;
    el.scrollBy({ left: -(el.clientWidth * 0.75), behavior: 'smooth' });
  }

  protected scrollNext(): void {
    const el = this.carouselEl()?.nativeElement;
    if (!el) return;
    el.scrollBy({ left: el.clientWidth * 0.75, behavior: 'smooth' });
  }

  protected range(e: RetreatEdition): string {
    return dateRange(e.startDate, e.endDate);
  }

  protected book(e: RetreatEdition): string {
    const precioTxt = e.price ? ` ($${e.price})` : '';
    return whatsappLink(
      `Hola ${SITE.therapist}, quiero solicitar un cupo para el ${e.name}${precioTxt} del ${dateRange(e.startDate, e.endDate)}.`,
    );
  }
}
