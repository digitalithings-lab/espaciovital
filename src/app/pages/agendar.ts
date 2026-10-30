import { HttpErrorResponse } from '@angular/common/http';
import { afterNextRender, ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { BookingAgenda, bookingError, BookingResult, BookingService } from '../core/booking.service';
import { SeoService } from '../core/seo.service';
import { SITE, whatsappLink } from '../core/site.config';
import { Icon } from '../shared/icon';

const WEEKDAYS = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];
const SHORT_DAY = new Intl.DateTimeFormat('es', { weekday: 'short', timeZone: 'UTC' });
const LONG_DAY = new Intl.DateTimeFormat('es', { weekday: 'long', day: 'numeric', month: 'long', timeZone: 'UTC' });
const MONTH = new Intl.DateTimeFormat('es', { month: 'short', timeZone: 'UTC' });

const utcDate = (iso: string) => new Date(`${iso}T00:00:00Z`);

// Agendar cita: horario de Nathalie, solo horas libres (las ocupadas nunca se muestran ni se pueden tomar).
@Component({
  selector: 'app-agendar',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ReactiveFormsModule, RouterLink, Icon],
  template: `
    <section class="pt-12 pb-20 md:pt-16">
      <div class="page">
        <header class="mb-12 flex max-w-3xl flex-col gap-6 sm:flex-row sm:items-center sm:gap-8">
          <!-- Retrato pequeño: la foto de estudio disponible mide 467 px, nítida a este tamaño. -->
          <img
            src="/img/nathalie-vera-retrato-336.webp"
            alt="Psicóloga Nathalie Vera"
            width="112"
            height="112"
            class="size-24 shrink-0 rounded-full object-cover shadow-lift ring-4 ring-surface sm:size-28"
          />
          <div class="space-y-4">
            <p class="eyebrow"><app-icon name="calendar" [size]="16" /> Agenda en línea</p>
            <h1 class="heading-lg">Agenda tu cita con <span class="em-brand">{{ site.therapistShort }}</span></h1>
            <p class="lead">Elige el día y la hora que te queden mejor. Solo verás horarios libres; {{ site.therapistShort }} confirmará tu cita.</p>
          </div>
        </header>

        @if (state() === 'loading') {
          <div class="grid gap-6 lg:grid-cols-12" aria-busy="true">
            <div class="h-72 animate-pulse rounded-3xl bg-surface-muted lg:col-span-4"></div>
            <div class="h-96 animate-pulse rounded-3xl bg-surface-muted lg:col-span-8"></div>
            <span class="sr-only">Cargando horarios…</span>
          </div>
        } @else if (state() === 'unavailable') {
          <div class="card mx-auto max-w-xl p-10 text-center">
            <span class="mx-auto mb-4 flex size-14 items-center justify-center rounded-full bg-accent/15 text-accent-ink"><app-icon name="calendar" [size]="26" /></span>
            <h2 class="font-display text-2xl font-semibold">La agenda en línea no está disponible ahora</h2>
            <p class="mt-2 text-muted">{{ loadError() }}</p>
            <div class="mt-6 flex flex-col justify-center gap-3 sm:flex-row">
              <button type="button" class="btn-dark" (click)="load()">Reintentar</button>
              <a class="btn-outline" [href]="whatsapp" target="_blank" rel="noopener noreferrer"><app-icon name="message" [size]="18" /> Escribir por WhatsApp</a>
            </div>
          </div>
        } @else if (result(); as r) {
          <div class="card mx-auto max-w-xl animate-fade-up p-8 text-center md:p-10" role="status">
            <span class="mx-auto mb-5 flex size-16 items-center justify-center rounded-full bg-forest-100 text-forest-700"><app-icon name="checkCircle" [size]="32" /></span>
            <h2 class="font-display text-3xl font-semibold">¡Solicitud enviada!</h2>
            <p class="mt-3 text-muted">{{ site.therapistShort }} ya recibió tu solicitud y te confirmará por correo o teléfono.</p>
            <div class="mx-auto mt-6 max-w-sm rounded-xl border border-line bg-background p-4 text-left">
              <p class="eyebrow text-muted">Tu cita</p>
              <p class="mt-1 font-bold capitalize">{{ resultLabel() }}</p>
              <p class="text-sm text-muted">{{ agenda()!.psychologist.sessionMinutes }} minutos · {{ site.therapist }}</p>
            </div>
            <div class="mt-7 flex flex-col justify-center gap-3 sm:flex-row">
              <button type="button" class="btn-dark" (click)="downloadIcs(r)"><app-icon name="calendar" [size]="18" /> Añadir a mi calendario</button>
              <a routerLink="/" class="btn-outline">Volver al inicio</a>
            </div>
          </div>
        } @else if (agenda(); as a) {
          <div class="grid grid-cols-1 items-start gap-6 lg:grid-cols-12">
            <!-- Horario de atención -->
            <aside class="min-w-0 space-y-4 lg:sticky lg:top-28 lg:col-span-4">
              <div class="card p-6">
                <h2 class="mb-4 flex items-center gap-2 text-lg font-bold"><app-icon name="clock" class="text-forest-700" /> Horario de atención</h2>
                @if (a.weekly.length === 0) {
                  <p class="text-sm text-muted">Pronto se publicarán los horarios.</p>
                } @else {
                  <ul class="divide-y divide-line">
                    @for (day of a.weekly; track day.weekday) {
                      <li class="flex items-start justify-between gap-4 py-2.5 text-sm">
                        <span class="font-semibold">{{ weekdays[day.weekday] }}</span>
                        <span class="text-right text-muted tabular-nums">
                          @for (r of day.ranges; track r.start) {
                            <span class="block">{{ clock(r.start) }} – {{ clock(r.end) }}</span>
                          }
                        </span>
                      </li>
                    }
                  </ul>
                }
                <p class="mt-4 text-xs text-muted">Horario de {{ placeLabel() }}.</p>
              </div>
              <div class="card space-y-3 p-6 text-sm">
                <p class="flex items-center gap-2.5"><app-icon name="clock" [size]="18" class="text-accent-ink" /> Sesiones de {{ a.psychologist.sessionMinutes }} minutos</p>
                <!-- Sin precio en la web: Nathalie lo indica al confirmar la cita. -->
                <p class="flex items-center gap-2.5"><app-icon name="heart" [size]="18" class="text-accent-ink" /> El precio te lo indica {{ site.therapistShort }} al confirmar tu cita</p>
                <p class="flex items-center gap-2.5"><app-icon name="video" [size]="18" class="text-accent-ink" /> Presencial o por videollamada</p>
                <p class="flex items-center gap-2.5"><app-icon name="shield" [size]="18" class="text-accent-ink" /> Tus datos son confidenciales</p>
              </div>
            </aside>

            <div class="min-w-0 space-y-6 lg:col-span-8">
              <!-- Paso 1: día y hora -->
              <div class="card p-6 md:p-8">
                <h2 class="mb-1 text-lg font-bold">1. Elige el día</h2>
                <p class="mb-4 text-sm text-muted">Los días en gris no tienen horas libres.</p>
                @if (!anySlots()) {
                  <p class="rounded-xl bg-accent/15 p-4 text-sm font-semibold text-accent-ink">
                    No hay horas libres en las próximas semanas. Escríbenos y te avisamos cuando se abran nuevos espacios.
                  </p>
                } @else {
                  <div class="-mx-2 flex snap-x gap-2 overflow-x-auto px-2 pb-2" role="listbox" aria-label="Días disponibles">
                    @for (day of a.days; track day.date; let i = $index) {
                      <button
                        type="button"
                        role="option"
                        class="flex w-[4.5rem] shrink-0 snap-start flex-col items-center gap-0.5 rounded-xl border-[1.5px] py-3 transition-all duration-200"
                        [class]="
                          i === dayIndex()
                            ? 'border-accent bg-accent text-forest-900 shadow-soft'
                            : day.slots.length === 0
                              ? 'cursor-not-allowed border-line bg-surface-muted text-muted opacity-50'
                              : 'cursor-pointer border-line bg-surface hover:border-forest-500'
                        "
                        [disabled]="day.slots.length === 0"
                        [attr.aria-selected]="i === dayIndex()"
                        [attr.aria-label]="longDay(day.date) + ', ' + (day.slots.length || 'sin') + ' horas libres'"
                        (click)="selectDay(i)"
                      >
                        <span class="text-[11px] font-bold uppercase">{{ shortDay(day.date) }}</span>
                        <span class="font-display text-2xl font-semibold">{{ dayNumber(day.date) }}</span>
                        <span class="text-[11px] font-semibold opacity-80">{{ month(day.date) }}</span>
                      </button>
                    }
                  </div>

                  @if (selectedDay(); as day) {
                    <h2 class="mt-6 mb-3 text-lg font-bold">2. Elige la hora <span class="font-medium text-muted capitalize">· {{ longDay(day.date) }}</span></h2>
                    <div class="grid grid-cols-3 gap-2 sm:grid-cols-4 md:grid-cols-5" role="radiogroup" aria-label="Horas libres">
                      @for (slot of day.slots; track slot.startsAt) {
                        <button
                          type="button"
                          role="radio"
                          class="cursor-pointer rounded-full border-[1.5px] py-3 text-sm font-bold tabular-nums transition-all duration-200"
                          [class]="slot.startsAt === slotStart() ? 'border-accent bg-accent text-forest-900 shadow-soft' : 'border-line bg-surface hover:border-forest-500 hover:bg-forest-50'"
                          [attr.aria-checked]="slot.startsAt === slotStart()"
                          (click)="slotStart.set(slot.startsAt)"
                        >
                          {{ slotTime(slot.startsAt) }}
                        </button>
                      }
                    </div>
                  }
                }
              </div>

              <!-- Paso 3: datos -->
              @if (slotStart()) {
                <form [formGroup]="form" (ngSubmit)="submit()" class="card animate-fade-up space-y-5 p-6 md:p-8" novalidate>
                  <div class="flex flex-wrap items-center justify-between gap-3 rounded-xl bg-forest-50 px-4 py-3">
                    <p class="text-sm"><span class="font-bold text-forest-700">Tu cita:</span> <span class="capitalize">{{ slotLabel() }}</span></p>
                    <button type="button" class="text-sm font-bold text-forest-700 underline-offset-4 hover:underline" (click)="slotStart.set(null)">Cambiar</button>
                  </div>
                  <h2 class="text-lg font-bold">3. Tus datos</h2>

                  <div class="grid gap-5 sm:grid-cols-2">
                    <div class="sm:col-span-2">
                      <label class="label" for="b-name">Nombre completo</label>
                      <input id="b-name" class="input" formControlName="fullName" autocomplete="name" [attr.aria-invalid]="invalid('fullName')" />
                      @if (invalid('fullName')) {
                        <p class="mt-1.5 text-xs font-semibold text-accent-ink">Escribe tu nombre completo.</p>
                      }
                    </div>
                    <div>
                      <label class="label" for="b-email">Correo</label>
                      <input id="b-email" class="input" type="email" inputmode="email" formControlName="email" autocomplete="email" [attr.aria-invalid]="invalid('email')" />
                      @if (invalid('email')) {
                        <p class="mt-1.5 text-xs font-semibold text-accent-ink">Escribe un correo válido.</p>
                      }
                    </div>
                    <div>
                      <label class="label" for="b-phone">Teléfono / WhatsApp</label>
                      <input id="b-phone" class="input" type="tel" inputmode="tel" formControlName="phone" autocomplete="tel" placeholder="+507 6000-0000" [attr.aria-invalid]="invalid('phone')" />
                      @if (invalid('phone')) {
                        <p class="mt-1.5 text-xs font-semibold text-accent-ink">Escribe un teléfono para confirmarte.</p>
                      }
                    </div>
                    <div>
                      <label class="label" for="b-id">Cédula <span class="font-medium text-muted">(opcional)</span></label>
                      <input id="b-id" class="input uppercase" formControlName="idNumber" placeholder="8-123-4567" [attr.aria-invalid]="invalid('idNumber')" />
                    </div>
                    <div>
                      <label class="label" for="b-birth">Fecha de nacimiento <span class="font-medium text-muted">(opcional)</span></label>
                      <input id="b-birth" class="input" type="date" formControlName="birthDate" [max]="today" />
                    </div>
                    <div class="sm:col-span-2">
                      <label class="label" for="b-reason">Motivo de la cita</label>
                      <textarea
                        id="b-reason"
                        class="input min-h-28 resize-y"
                        formControlName="reason"
                        maxlength="500"
                        placeholder="Cuéntale brevemente qué te gustaría trabajar…"
                        [attr.aria-invalid]="invalid('reason')"
                      ></textarea>
                      <div class="mt-1.5 flex justify-between text-xs">
                        <span class="font-semibold text-accent-ink">{{ invalid('reason') ? 'Escribe al menos 5 caracteres.' : '' }}</span>
                        <span class="text-muted tabular-nums">{{ form.controls.reason.value.length }}/500</span>
                      </div>
                    </div>
                  </div>

                  <!-- Campo trampa contra robots: oculto para las personas. -->
                  <input type="text" formControlName="website" tabindex="-1" autocomplete="off" class="hidden" aria-hidden="true" />

                  <label class="flex cursor-pointer items-start gap-3 text-sm text-muted">
                    <input type="checkbox" formControlName="consent" class="mt-0.5 size-5 shrink-0 cursor-pointer accent-[var(--ev-forest-700)]" [attr.aria-invalid]="invalid('consent')" />
                    <span>Acepto la <a routerLink="/privacidad" class="font-bold text-forest-700 underline-offset-4 hover:underline">política de privacidad</a> y que me contacten para confirmar la cita.</span>
                  </label>

                  @if (error()) {
                    <p class="rounded-xl bg-accent/15 px-4 py-3 text-sm font-semibold text-accent-ink" role="alert">{{ error() }}</p>
                  }

                  <button type="submit" class="btn-primary h-14 w-full text-base" [disabled]="sending()" [attr.aria-busy]="sending()">
                    @if (sending()) {
                      <span class="size-4 animate-spin rounded-full border-2 border-white border-r-transparent" aria-hidden="true"></span> Agendando…
                    } @else {
                      Confirmar solicitud de cita <app-icon name="arrowRight" />
                    }
                  </button>
                </form>
              }
            </div>
          </div>
        }
      </div>
    </section>
  `,
})
export class Agendar {
  private readonly booking = inject(BookingService);
  protected readonly site = SITE;
  protected readonly weekdays = WEEKDAYS;
  protected readonly whatsapp = whatsappLink(`Hola ${SITE.therapistShort}, quiero agendar una cita.`);
  protected readonly today = new Date().toISOString().slice(0, 10);

  protected readonly agenda = signal<BookingAgenda | null>(null);
  protected readonly loadError = signal('');
  protected readonly state = computed(() => (this.agenda() ? 'ready' : this.loadError() ? 'unavailable' : 'loading'));
  protected readonly dayIndex = signal(0);
  protected readonly slotStart = signal<string | null>(null);
  protected readonly sending = signal(false);
  protected readonly error = signal<string | null>(null);
  protected readonly result = signal<BookingResult | null>(null);
  private readonly submitted = signal(false);

  protected readonly anySlots = computed(() => this.agenda()?.days.some((d) => d.slots.length > 0) ?? false);
  protected readonly selectedDay = computed(() => this.agenda()?.days[this.dayIndex()] ?? null);

  protected readonly form = inject(FormBuilder).nonNullable.group({
    fullName: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(120)]],
    email: ['', [Validators.required, Validators.email]],
    phone: ['', [Validators.required, Validators.pattern(/^\+?[0-9 ()-]{7,20}$/)]],
    idNumber: ['', Validators.pattern(/^[A-Za-z0-9.\- ]{4,30}$/)],
    birthDate: [''],
    reason: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(500)]],
    consent: [false, Validators.requiredTrue],
    website: [''],
  });

  constructor() {
    inject(SeoService).set({
      title: `Agendar cita con ${SITE.therapist} | ${SITE.name}`,
      description: `Agenda en línea tu sesión de psicología con ${SITE.therapist}. Elige el día y la hora libres que te queden mejor.`,
      path: '/agendar',
    });
    // Los horarios se piden en el navegador: al pre-renderizar quedarían congelados.
    afterNextRender(() => void this.load());
  }

  protected async load() {
    this.loadError.set('');
    this.agenda.set(null);
    try {
      const agenda = await this.booking.agenda(21);
      this.agenda.set(agenda);
      this.dayIndex.set(Math.max(0, agenda.days.findIndex((d) => d.slots.length > 0)));
    } catch (err) {
      this.loadError.set(
        err instanceof HttpErrorResponse && err.status === 404
          ? 'La agenda todavía no está activada. Mientras tanto, puedes escribirnos por WhatsApp.'
          : bookingError(err, 'No pudimos cargar los horarios.'),
      );
    }
  }

  protected selectDay(i: number) {
    this.dayIndex.set(i);
    this.slotStart.set(null);
  }

  protected invalid(name: keyof typeof this.form.controls) {
    const control = this.form.controls[name];
    return control.invalid && (control.touched || this.submitted()) ? true : null;
  }

  protected async submit() {
    this.submitted.set(true);
    this.form.markAllAsTouched();
    const startsAt = this.slotStart();
    if (this.form.invalid || !startsAt) return;

    const v = this.form.getRawValue();
    this.sending.set(true);
    this.error.set(null);
    try {
      this.result.set(
        await this.booking.book({
          startsAt,
          fullName: v.fullName.trim(),
          email: v.email.trim(),
          phone: v.phone.trim(),
          idNumber: v.idNumber.trim() || undefined,
          birthDate: v.birthDate || undefined,
          reason: v.reason.trim(),
          consent: true,
          website: v.website,
        }),
      );
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (err) {
      // Si alguien tomó esa hora un instante antes, se recargan los horarios para elegir otra.
      if (err instanceof HttpErrorResponse && err.status === 409) {
        this.error.set(bookingError(err, 'Ese horario ya no está disponible.'));
        const agenda = await this.booking.agenda(21).catch(() => null);
        if (agenda) {
          this.agenda.set(agenda);
          this.slotStart.set(null);
        }
      } else {
        this.error.set(bookingError(err, 'No pudimos agendar tu cita. Inténtalo de nuevo.'));
      }
    } finally {
      this.sending.set(false);
    }
  }

  // ─── Formato ─────────────────────────────────────────

  protected shortDay(date: string) {
    return SHORT_DAY.format(utcDate(date)).replace('.', '');
  }
  protected dayNumber(date: string) {
    return utcDate(date).getUTCDate();
  }
  protected month(date: string) {
    return MONTH.format(utcDate(date)).replace('.', '');
  }
  protected longDay(date: string) {
    return LONG_DAY.format(utcDate(date));
  }
  /** «14:00» → «2:00 p. m.» (sin hora militar). */
  protected clock(hhmm: string) {
    const [h, m] = hhmm.split(':').map(Number);
    return `${h % 12 || 12}:${String(m).padStart(2, '0')} ${h < 12 ? 'a. m.' : 'p. m.'}`;
  }
  /** Hora de una cita en la zona de la psicóloga, en formato de 12 horas. */
  protected slotTime(iso: string) {
    const tz = this.agenda()?.psychologist.timezone;
    return new Intl.DateTimeFormat('es', { hour: 'numeric', minute: '2-digit', hour12: true, timeZone: tz }).format(new Date(iso));
  }
  protected placeLabel() {
    const tz = this.agenda()?.psychologist.timezone ?? '';
    return tz === 'America/Panama' ? 'Panamá' : tz.split('/').pop()?.replace(/_/g, ' ') ?? tz;
  }
  private format(iso: string) {
    const tz = this.agenda()?.psychologist.timezone;
    return new Intl.DateTimeFormat('es', { weekday: 'long', day: 'numeric', month: 'long', hour: 'numeric', minute: '2-digit', hour12: true, timeZone: tz }).format(new Date(iso));
  }
  protected slotLabel() {
    return this.slotStart() ? this.format(this.slotStart()!) : '';
  }
  protected resultLabel() {
    return this.result() ? this.format(this.result()!.startsAt) : '';
  }

  /** Descarga un archivo .ics para añadir la cita a Google Calendar, Apple o Outlook. */
  protected downloadIcs(r: BookingResult) {
    const stamp = (iso: string) => new Date(iso).toISOString().replace(/[-:]/g, '').replace(/\.\d{3}/, '');
    const ics = [
      'BEGIN:VCALENDAR',
      'VERSION:2.0',
      'PRODID:-//EspacioVital//Agenda//ES',
      'BEGIN:VEVENT',
      `UID:${r.id}@espaciovitalpsic.site`,
      `DTSTAMP:${stamp(new Date().toISOString())}`,
      `DTSTART:${stamp(r.startsAt)}`,
      `DTEND:${stamp(r.endsAt)}`,
      `SUMMARY:Cita con ${SITE.therapist} (por confirmar)`,
      `DESCRIPTION:Solicitud de cita en ${SITE.name}. ${SITE.therapistShort} te confirmará.`,
      'END:VEVENT',
      'END:VCALENDAR',
    ].join('\r\n');
    const url = URL.createObjectURL(new Blob([ics], { type: 'text/calendar;charset=utf-8' }));
    const link = Object.assign(document.createElement('a'), { href: url, download: 'cita-espaciovital.ics' });
    link.click();
    URL.revokeObjectURL(url);
  }
}
