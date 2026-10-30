import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RETREATS } from '../../core/content';
import { RetreatEdition } from '../../core/models';
import { SITE, whatsappLink } from '../../core/site.config';
import { Icon } from '../../shared/icon';
import { Reveal } from '../../shared/reveal.directive';
import { TONE } from '../../shared/tones';

const DAY = new Intl.DateTimeFormat('es', { day: 'numeric', timeZone: 'UTC' });
const DAY_MONTH = new Intl.DateTimeFormat('es', { day: 'numeric', month: 'long', timeZone: 'UTC' });
const MONTH_YEAR = new Intl.DateTimeFormat('es', { month: 'long', year: 'numeric', timeZone: 'UTC' });

// «13 al 15 de noviembre de 2026» o «28 de noviembre al 1 de diciembre de 2026».
function dateRange(start: string, end: string): string {
  const a = new Date(`${start}T00:00:00Z`);
  const b = new Date(`${end}T00:00:00Z`);
  return a.getUTCMonth() === b.getUTCMonth()
    ? `${DAY.format(a)} al ${DAY.format(b)} de ${MONTH_YEAR.format(b)}`
    : `${DAY_MONTH.format(a)} al ${DAY_MONTH.format(b)} de ${b.getUTCFullYear()}`;
}

@Component({
  selector: 'app-events',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [Icon, Reveal],
  template: `
    <section id="proximas-fechas" class="section-y border-t border-line bg-surface-muted">
      <div class="page">
        <header class="mx-auto mb-16 max-w-3xl space-y-4 text-center">
          <p appReveal class="eyebrow bg-leaf-100 text-leaf-700"><app-icon name="calendar" [size]="16" /> Calendario de experiencias</p>
          <h2 appReveal="80" class="heading-lg">Próximas ediciones del Retiro Metamorfosis</h2>
          <p appReveal="120" class="lead">
            Elige la fecha y el entorno que resuenen con tu proceso. Grupos reducidos y acompañamiento clínico continuo.
          </p>
        </header>

        @if (editions.length === 0) {
          <div class="card mx-auto max-w-xl p-10 text-center">
            <p class="font-display text-2xl">Muy pronto, nuevas fechas</p>
            <p class="mt-2 text-muted">Escríbeme y te aviso en cuanto abramos la próxima edición.</p>
            <a class="btn-sunset mt-6" [href]="waGeneral" target="_blank" rel="noopener noreferrer">Avísame</a>
          </div>
        } @else {
          <div class="grid items-start gap-8 md:grid-cols-2 lg:grid-cols-3">
            @for (e of editions; track e.id; let i = $index) {
              <article
                [appReveal]="i * 90"
                class="relative flex h-full flex-col rounded-[2rem] bg-surface transition-all duration-300 hover:-translate-y-1 hover:shadow-lift"
                [class]="e.featured ? 'border-2 border-clay-500 shadow-lift lg:-translate-y-3' : 'border border-line shadow-soft'"
              >
                @if (e.featured) {
                  <span class="btn-sunset absolute -top-4 left-1/2 min-h-0 -translate-x-1/2 px-4 py-1.5 text-[11px] tracking-wider whitespace-nowrap uppercase shadow-glow">
                    Edición más solicitada
                  </span>
                }
                <div class="rounded-t-[2rem] border-b border-line p-6 pt-8" [class]="tone[e.tone].soft">
                  <div class="mb-4 flex items-center justify-between gap-2">
                    <span class="chip border-0" [class]="tone[e.tone].text">{{ e.setting }}</span>
                    <span
                      class="inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-bold"
                      [class]="e.spotsLeft <= 4 ? 'bg-clay-500 text-white' : 'bg-surface text-ink'"
                    >
                      @if (e.spotsLeft <= 4) {
                        <span class="size-1.5 animate-pulse rounded-full bg-white"></span>
                      }
                      {{ e.spotsLeft <= 4 ? 'Últimos ' + e.spotsLeft + ' cupos' : e.spotsLeft + ' cupos libres' }}
                    </span>
                  </div>
                  <h3 class="font-display text-2xl font-semibold">{{ e.name }}</h3>
                  <p class="mt-1 flex items-center gap-1.5 text-sm font-semibold" [class]="tone[e.tone].text">
                    <app-icon [name]="e.icon" [size]="16" /> {{ e.place }}
                  </p>
                </div>

                <div class="flex flex-1 flex-col gap-5 p-6">
                  <div class="flex items-center gap-3 rounded-2xl border border-line bg-background p-3.5">
                    <span class="flex size-11 shrink-0 items-center justify-center rounded-xl" [class]="tone[e.tone].soft + ' ' + tone[e.tone].text">
                      <app-icon name="calendar" />
                    </span>
                    <span>
                      <span class="block text-[11px] font-bold tracking-wide text-muted uppercase">Fechas confirmadas</span>
                      <time class="block text-sm font-bold" [attr.datetime]="e.startDate">{{ range(e) }}</time>
                    </span>
                  </div>
                  <ul class="flex-1 space-y-3 text-sm text-muted">
                    @for (h of e.highlights; track h) {
                      <li class="flex gap-2.5"><app-icon name="checkCircle" [size]="18" class="mt-px" [class]="tone[e.tone].text" /> {{ h }}</li>
                    }
                  </ul>
                  <a class="btn-sunset w-full" [href]="book(e)" target="_blank" rel="noopener noreferrer">
                    Solicitar cupo <app-icon name="arrowRight" [size]="18" />
                  </a>
                </div>
              </article>
            }
          </div>
        }

        <p class="mx-auto mt-12 max-w-2xl text-center text-sm text-muted">
          Cada retiro incluye una evaluación clínica previa de idoneidad, facilidades de pago en cuotas y confidencialidad absoluta.
        </p>
      </div>
    </section>
  `,
})
export class Events {
  protected readonly tone = TONE;
  protected readonly waGeneral = whatsappLink(`Hola ${SITE.therapistShort}, avísame cuando abras nuevas fechas del Retiro Metamorfosis.`);
  // Las ediciones que ya terminaron no se muestran.
  protected readonly editions = RETREATS.filter((e) => new Date(`${e.endDate}T23:59:59`) >= new Date());

  protected range(e: RetreatEdition) {
    return dateRange(e.startDate, e.endDate);
  }

  protected book(e: RetreatEdition) {
    return whatsappLink(`Hola ${SITE.therapist}, quiero solicitar un cupo para la ${e.name} (${dateRange(e.startDate, e.endDate)}).`);
  }
}
