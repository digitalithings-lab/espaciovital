import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RETREATS } from '../../core/content';
import { RetreatEdition } from '../../core/models';
import { SITE, whatsappLink } from '../../core/site.config';
import { Icon } from '../../shared/icon';
import { Reveal } from '../../shared/reveal.directive';

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
    <section id="proximas-fechas" class="section-y border-t border-line">
      <div class="page">
        <header class="grid gap-6 lg:grid-cols-12 lg:items-end">
          <div class="lg:col-span-6">
            <p appReveal class="eyebrow">Retiro Metamorfosis · Calendario</p>
            <h2 appReveal="60" class="heading-lg mt-4">Próximas <span class="em-brand">ediciones.</span></h2>
          </div>
          <p appReveal="100" class="lead lg:col-span-5 lg:col-start-8">
            Elige la fecha y el entorno que resuenen con tu proceso. Grupos reducidos y acompañamiento clínico continuo.
          </p>
        </header>

        @if (editions.length === 0) {
          <div class="mt-14 border-t border-line pt-10">
            <p class="font-display text-2xl font-medium">Muy pronto, nuevas fechas.</p>
            <p class="mt-2 text-muted">Escríbeme y te aviso en cuanto abramos la próxima edición.</p>
            <a class="btn-outline mt-6" [href]="waGeneral" target="_blank" rel="noopener noreferrer">
              <app-icon name="whatsapp" [size]="18" /> Escribir por WhatsApp
            </a>
          </div>
        } @else {
          <div class="mt-14 grid items-stretch gap-6 md:grid-cols-2 lg:grid-cols-3">
            @for (e of editions; track e.id; let i = $index) {
              <article
                [appReveal]="i * 80"
                class="relative flex flex-col rounded-3xl p-7 transition-transform duration-300 hover:-translate-y-1"
                [class]="e.featured ? 'bg-forest-900 text-white shadow-lift' : 'border border-line bg-surface shadow-soft'"
              >
                <div class="flex items-center justify-between gap-3">
                  <span class="flex items-center gap-2 text-sm font-semibold" [class]="e.featured ? 'text-white/80' : 'text-muted'">
                    <app-icon [name]="e.icon" [size]="18" [class]="e.featured ? 'text-accent' : 'text-forest-500'" /> {{ e.setting }}
                  </span>
                  @if (e.featured) {
                    <span class="rounded-full bg-accent px-3 py-1 text-[11px] font-bold text-forest-900">Más solicitada</span>
                  }
                </div>

                <h3 class="mt-6 text-2xl font-medium">{{ e.name }}</h3>
                <p class="mt-1 text-sm" [class]="e.featured ? 'text-white/70' : 'text-muted'">{{ e.place }}</p>

                <dl class="mt-6 grid grid-cols-2 gap-4 border-y py-5 text-sm" [class]="e.featured ? 'border-white/15' : 'border-line'">
                  <div>
                    <dt [class]="e.featured ? 'text-white/60' : 'text-muted'">Fechas</dt>
                    <dd class="mt-1 font-semibold"><time [attr.datetime]="e.startDate">{{ range(e) }}</time></dd>
                  </div>
                  <div>
                    <dt [class]="e.featured ? 'text-white/60' : 'text-muted'">Cupos</dt>
                    <dd class="mt-1 font-semibold" [class.text-accent]="e.featured && e.spotsLeft <= 4" [class.text-accent-ink]="!e.featured && e.spotsLeft <= 4">
                      {{ e.spotsLeft <= 4 ? 'Últimos ' + e.spotsLeft : e.spotsLeft + ' libres' }}
                    </dd>
                  </div>
                </dl>

                <ul class="mt-5 flex-1 space-y-3 text-sm" [class]="e.featured ? 'text-white/80' : 'text-muted'">
                  @for (h of e.highlights; track h) {
                    <li class="flex gap-2.5">
                      <app-icon name="checkCircle" [size]="18" class="mt-px" [class]="e.featured ? 'text-accent' : 'text-forest-500'" /> {{ h }}
                    </li>
                  }
                </ul>

                <a
                  [class]="e.featured ? 'btn-primary mt-8 w-full' : 'btn-dark mt-8 w-full'"
                  [href]="book(e)"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Solicitar cupo
                </a>
              </article>
            }
          </div>
        }

        <p class="mt-10 max-w-[70ch] text-sm text-muted">
          Cada retiro incluye una evaluación clínica previa, facilidades de pago en cuotas y confidencialidad absoluta.
        </p>
      </div>
    </section>
  `,
})
export class Events {
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
