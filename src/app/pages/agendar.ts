import { HttpErrorResponse } from '@angular/common/http';
import { afterNextRender, ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { BookingAgenda, bookingError, BookingResult, BookingService } from '../core/booking.service';
import { SeoService } from '../core/seo.service';
import { cleanText, emailValidators, nameValidators, PHONE_PATTERN } from '../core/safe-input';
import { SITE, whatsappLink } from '../core/site.config';
import { Icon } from '../shared/icon';

const WEEKDAYS = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];
const SHORT_DAY = new Intl.DateTimeFormat('es', { weekday: 'short', timeZone: 'UTC' });
const LONG_DAY = new Intl.DateTimeFormat('es', { weekday: 'long', day: 'numeric', month: 'long', timeZone: 'UTC' });
const MONTH = new Intl.DateTimeFormat('es', { month: 'short', timeZone: 'UTC' });

const utcDate = (iso: string) => new Date(`${iso}T00:00:00Z`);

type Frequency = 'single' | 'weekly' | 'biweekly' | 'manual';

// Agendar cita: horario de Nathalie, solo horas libres (las ocupadas nunca se muestran ni se pueden tomar).
@Component({
  selector: 'app-agendar',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ReactiveFormsModule, RouterLink, Icon],
  template: `
    <!-- Cabecera burgundy con retrato en arco, sol naranja y hoja rosada (mismo lenguaje que el inicio). -->
    <section class="relative overflow-hidden bg-forest-900 pt-12 pb-28 text-white md:pt-16 md:pb-36">
      <div class="pointer-events-none absolute -top-20 -right-20 size-64 rounded-full bg-forest-500 md:size-96" aria-hidden="true"></div>
      <div class="page relative flex max-w-5xl flex-col gap-8 sm:flex-row sm:items-center sm:gap-12">
        <div class="relative shrink-0">
          <div class="absolute -top-3 -left-3 size-20 rounded-full bg-accent sm:size-24" aria-hidden="true"></div>
          <div class="absolute -right-3 -bottom-3 size-16 rounded-[100%_0_100%_0] bg-forest-100" aria-hidden="true"></div>
          <img
            src="/img/nathalie-vera-retrato-336.webp"
            alt="Psicóloga Nathalie Vera"
            width="112"
            height="112"
            class="relative h-36 w-28 rounded-t-[999px] rounded-b-[1.25rem] object-cover sm:h-44 sm:w-36"
          />
        </div>
        <div class="space-y-4">
          <p class="inline-flex items-center gap-2 rounded-full bg-accent px-4 py-1.5 text-sm font-bold text-forest-900"><app-icon name="calendar" [size]="16" /> Agenda en línea</p>
          <h1 class="font-display text-4xl leading-[1.05] font-semibold tracking-tight md:text-6xl">Agenda tu cita con <span class="text-accent italic">{{ site.therapistShort }}</span></h1>
          <p class="max-w-[52ch] text-base leading-relaxed text-white/90 sm:text-lg">Elige el día y la hora que te queden mejor. Solo verás horarios libres; {{ site.therapistShort }} confirmará tu cita.</p>
        </div>
      </div>
    </section>

    <section class="layer z-10 bg-background pt-12 pb-20 md:pt-16">
      <div class="page">
        @if (state() === 'loading') {
          <div class="grid gap-6 lg:grid-cols-12" aria-busy="true">
            <div class="h-72 animate-pulse rounded-[2rem] bg-surface-muted lg:col-span-4"></div>
            <div class="h-96 animate-pulse rounded-[2rem] bg-surface-muted lg:col-span-8"></div>
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
            <h2 class="font-display text-3xl font-semibold">
              {{ r.recurring ? '¡Solicitud de ' + r.count + ' citas enviada!' : '¡Solicitud enviada!' }}
            </h2>
            <p class="mt-3 text-muted">
              {{ site.therapistShort }} ya recibió tu solicitud {{ r.recurring ? 'para tus sesiones periódicas' : '' }} y te confirmará por correo o teléfono.
            </p>
            <div class="mx-auto mt-6 max-w-sm rounded-xl border border-line bg-background p-4 text-left">
              <p class="eyebrow text-muted">{{ r.recurring ? 'Tus sesiones (' + r.count + ' citas)' : 'Tu cita' }}</p>
              @if (r.recurring && r.appointments && r.appointments.length > 0) {
                <div class="mt-2 space-y-1.5 max-h-48 overflow-y-auto pr-1">
                  @for (apt of r.appointments; track apt.id) {
                    <p class="text-xs font-semibold capitalize bg-surface p-2 rounded-lg border border-line">
                      {{ formatAppointmentDate(apt.startsAt) }}
                    </p>
                  }
                </div>
              } @else {
                <p class="mt-1 font-bold capitalize">{{ resultLabel() }}</p>
              }
              <p class="mt-2 text-sm text-muted">{{ agenda()!.psychologist.sessionMinutes }} minutos · {{ site.therapist }}</p>
            </div>
            @if (error()) {
              <p class="mx-auto mt-4 max-w-sm rounded-xl bg-accent/15 px-4 py-3 text-sm font-semibold text-accent-ink" role="alert">{{ error() }}</p>
            }
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
                        class="flex w-[4.5rem] shrink-0 snap-start flex-col items-center gap-0.5 rounded-xl border-[1.5px] py-3 transition-[transform,box-shadow,background-color,border-color,color,opacity] duration-200"
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
                          class="cursor-pointer rounded-full border-[1.5px] py-3 text-sm font-bold tabular-nums transition-[transform,box-shadow,background-color,border-color,color,opacity] duration-200"
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
                      <input id="b-name" class="input" formControlName="fullName" maxlength="120" autocomplete="name" [attr.aria-invalid]="invalid('fullName')" />
                      @if (invalid('fullName')) {
                        <p class="mt-1.5 text-xs font-semibold text-accent-ink">Escribe tu nombre completo (solo letras).</p>
                      }
                    </div>
                    <div>
                      <label class="label" for="b-email">Correo</label>
                      <input id="b-email" class="input" type="email" inputmode="email" formControlName="email" maxlength="254" autocomplete="email" [attr.aria-invalid]="invalid('email')" />
                      @if (invalid('email')) {
                        <p class="mt-1.5 text-xs font-semibold text-accent-ink">Escribe un correo válido.</p>
                      }
                    </div>
                    <div>
                      <label class="label" for="b-phone">Teléfono / WhatsApp</label>
                      <input id="b-phone" class="input" type="tel" inputmode="tel" formControlName="phone" maxlength="20" autocomplete="tel" placeholder="+507 6000-0000" [attr.aria-invalid]="invalid('phone')" />
                      @if (invalid('phone')) {
                        <p class="mt-1.5 text-xs font-semibold text-accent-ink">Escribe un teléfono para confirmarte.</p>
                      }
                    </div>
                    <div>
                      <label class="label" for="b-id">Cédula <span class="font-medium text-muted">(opcional)</span></label>
                      <input id="b-id" class="input uppercase" formControlName="idNumber" maxlength="30" placeholder="8-123-4567" [attr.aria-invalid]="invalid('idNumber')" />
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

                  <!-- Frecuencia: solo esta cita, repetición automática o días elegidos a mano -->
                  <fieldset class="space-y-4 rounded-2xl border border-line bg-surface-muted/40 p-5">
                    <legend class="px-1 text-sm font-bold text-ink">¿Con qué frecuencia?</legend>
                    <div class="grid grid-cols-1 gap-2 sm:grid-cols-2" role="radiogroup" aria-label="Frecuencia de las citas">
                      @for (opt of frequencies; track opt.value) {
                        <button
                          type="button"
                          role="radio"
                          class="flex min-h-12 cursor-pointer items-center gap-3 rounded-xl border-[1.5px] px-4 py-3 text-left text-sm font-bold transition-[transform,background-color,border-color,color] duration-[180ms] ease-[cubic-bezier(0.23,1,0.32,1)] active:scale-[0.97]"
                          [class]="frequency() === opt.value ? 'border-accent bg-accent text-forest-900 shadow-soft' : 'border-line bg-surface hover:border-forest-500'"
                          [attr.aria-checked]="frequency() === opt.value"
                          (click)="setFrequency(opt.value)"
                        >
                          <app-icon [name]="opt.icon" [size]="18" class="shrink-0" />
                          <span>{{ opt.label }}<span class="block text-xs font-medium opacity-80">{{ opt.hint }}</span></span>
                        </button>
                      }
                    </div>

                    @if (frequency() === 'weekly' || frequency() === 'biweekly') {
                      <div class="space-y-3 border-t border-line/60 pt-4">
                        <div>
                          <label class="label text-xs" for="r-count">Total de sesiones</label>
                          <select id="r-count" class="input py-2.5 text-sm" formControlName="recurrenceCount">
                            <option [value]="2">2 sesiones</option>
                            <option [value]="3">3 sesiones</option>
                            <option [value]="4">4 sesiones (1 mes aprox.)</option>
                            <option [value]="6">6 sesiones</option>
                            <option [value]="8">8 sesiones (2 meses aprox.)</option>
                            <option [value]="10">10 sesiones</option>
                            <option [value]="12">12 sesiones (3 meses aprox.)</option>
                          </select>
                        </div>
                        @if (recurringPreview().length > 0) {
                          <div class="rounded-xl border border-line/60 bg-surface p-3.5">
                            <p class="mb-2 text-xs font-bold tracking-wider text-forest-700 uppercase">Fechas que se reservarán:</p>
                            <div class="flex flex-wrap gap-1.5">
                              @for (d of recurringPreview(); track d) {
                                <span class="rounded-lg border border-forest-200/60 bg-forest-50 px-2.5 py-1 text-xs font-semibold text-forest-800">{{ d }}</span>
                              }
                            </div>
                          </div>
                        }
                      </div>
                    }

                    @if (frequency() === 'manual') {
                      <div class="space-y-4 border-t border-line/60 pt-4">
                        <p class="text-xs text-muted">Tu primera cita es la que elegiste arriba. Toca los días de las próximas semanas que quieras agregar y escoge la hora de cada uno.</p>
                        @for (week of manualWeeks(); track week.label) {
                          <div>
                            <p class="mb-2 text-xs font-bold text-forest-700">{{ week.label }}</p>
                            <div class="flex flex-wrap gap-2">
                              @for (day of week.days; track day.date) {
                                <button
                                  type="button"
                                  class="flex w-16 cursor-pointer flex-col items-center rounded-xl border-[1.5px] py-2 transition-[transform,background-color,border-color,color] duration-[180ms] ease-[cubic-bezier(0.23,1,0.32,1)] active:scale-[0.97]"
                                  [class]="manualPicks()[day.date] ? 'border-accent bg-accent text-forest-900' : 'border-line bg-surface hover:border-forest-500'"
                                  [attr.aria-pressed]="!!manualPicks()[day.date]"
                                  [attr.aria-label]="longDay(day.date)"
                                  (click)="toggleManual(day.date)"
                                >
                                  <span class="text-[11px] font-bold uppercase">{{ shortDay(day.date) }}</span>
                                  <span class="font-display text-xl font-semibold">{{ dayNumber(day.date) }}</span>
                                </button>
                              }
                            </div>
                          </div>
                        } @empty {
                          <p class="text-sm text-muted">No hay más días con horas libres en las próximas semanas.</p>
                        }

                        @if (manualList().length > 0) {
                          <div class="space-y-2 rounded-xl border border-line/60 bg-surface p-3.5">
                            <p class="text-xs font-bold tracking-wider text-forest-700 uppercase">Tus citas ({{ manualList().length + 1 }})</p>
                            <p class="text-sm font-semibold capitalize">{{ slotLabel() }}</p>
                            @for (m of manualList(); track m.date) {
                              <div class="flex flex-wrap items-center justify-between gap-2">
                                <span class="text-sm font-semibold capitalize">{{ longDay(m.date) }}</span>
                                <span class="flex items-center gap-2">
                                  <select class="input w-auto py-2 text-sm" [attr.aria-label]="'Hora para ' + longDay(m.date)" (change)="setManualTime(m.date, $any($event.target).value)">
                                    @for (slot of m.slots; track slot.startsAt) {
                                      <option [value]="slot.startsAt" [selected]="slot.startsAt === m.startsAt">{{ slotTime(slot.startsAt) }}</option>
                                    }
                                  </select>
                                  <button type="button" class="flex size-11 cursor-pointer items-center justify-center rounded-full text-muted hover:bg-surface-muted hover:text-ink" [attr.aria-label]="'Quitar ' + longDay(m.date)" (click)="toggleManual(m.date)">
                                    <app-icon name="x" [size]="16" />
                                  </button>
                                </span>
                              </div>
                            }
                          </div>
                        }
                      </div>
                    }
                  </fieldset>

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
    fullName: ['', [...nameValidators, Validators.minLength(3)]],
    email: ['', emailValidators],
    phone: ['', [Validators.required, Validators.pattern(PHONE_PATTERN)]],
    idNumber: ['', Validators.pattern(/^[A-Za-z0-9.\- ]{4,30}$/)],
    birthDate: [''],
    reason: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(500)]],
    consent: [false, Validators.requiredTrue],
    website: [''],
    recurrenceCount: [4],
  });

  protected readonly frequencies: { value: Frequency; label: string; hint: string; icon: string }[] = [
    { value: 'single', label: 'Solo esta cita', hint: 'Una única sesión', icon: 'target' },
    { value: 'weekly', label: 'Cada semana', hint: 'Mismo día y hora', icon: 'calendar' },
    { value: 'biweekly', label: 'Cada 2 semanas', hint: 'Quincenal', icon: 'calendar' },
    { value: 'manual', label: 'Seleccionar manualmente', hint: 'Elijo los días de cada semana', icon: 'hand' },
  ];
  protected readonly frequency = signal<Frequency>('single');
  /** Días extra elegidos a mano: fecha («YYYY-MM-DD») → inicio de la hora escogida. */
  protected readonly manualPicks = signal<Record<string, string>>({});

  /** Próximos días con horas libres (sin el día de la primera cita), agrupados por semana. */
  protected readonly manualWeeks = computed(() => {
    const days = this.agenda()?.days ?? [];
    const first = this.selectedDay()?.date;
    const groups = new Map<string, { label: string; days: typeof days }>();
    for (const d of days) {
      if (d.slots.length === 0 || d.date === first || d.date < (first ?? '')) continue;
      const monday = new Date(utcDate(d.date));
      monday.setUTCDate(monday.getUTCDate() - ((monday.getUTCDay() + 6) % 7));
      const key = monday.toISOString().slice(0, 10);
      if (!groups.has(key)) groups.set(key, { label: `Semana del ${monday.getUTCDate()} de ${MONTH.format(monday).replace('.', '')}`, days: [] });
      groups.get(key)!.days.push(d);
    }
    return [...groups.values()];
  });

  protected readonly manualList = computed(() => {
    const picks = this.manualPicks();
    return (this.agenda()?.days ?? [])
      .filter((d) => picks[d.date])
      .map((d) => ({ date: d.date, slots: d.slots, startsAt: picks[d.date] }));
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
    this.manualPicks.set({});
  }

  protected setFrequency(value: Frequency) {
    this.frequency.set(value);
    if (value !== 'manual') this.manualPicks.set({});
  }

  /** Marca o desmarca un día; propone la misma hora de la primera cita si ese día la tiene libre. */
  protected toggleManual(date: string) {
    const picks = { ...this.manualPicks() };
    if (picks[date]) {
      delete picks[date];
    } else {
      const day = this.agenda()?.days.find((d) => d.date === date);
      const wanted = this.slotStart() ? this.slotTime(this.slotStart()!) : '';
      const slot = day?.slots.find((s) => this.slotTime(s.startsAt) === wanted) ?? day?.slots[0];
      if (slot) picks[date] = slot.startsAt;
    }
    this.manualPicks.set(picks);
  }

  protected setManualTime(date: string, startsAt: string) {
    this.manualPicks.set({ ...this.manualPicks(), [date]: startsAt });
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
      const freq = this.frequency();
      const base = {
        fullName: cleanText(v.fullName, 120),
        email: v.email.trim().toLowerCase(),
        phone: cleanText(v.phone, 20),
        idNumber: cleanText(v.idNumber, 30).toUpperCase() || undefined,
        birthDate: /^\d{4}-\d{2}-\d{2}$/.test(v.birthDate) && v.birthDate <= this.today ? v.birthDate : undefined,
        reason: cleanText(v.reason, 500, true),
        consent: true as const,
        website: v.website,
      };
      const first = await this.booking.book({
        ...base,
        startsAt,
        recurrence:
          freq === 'weekly' || freq === 'biweekly'
            ? { rule: freq, count: Math.min(12, Math.max(2, Math.trunc(Number(v.recurrenceCount)) || 2)) }
            : undefined,
      });

      if (freq === 'manual' && this.manualList().length > 0) {
        // El servidor agenda una cita por solicitud: las demás fechas se piden una a una.
        const done = [{ id: first.id, startsAt: first.startsAt, endsAt: first.endsAt, recurrenceIndex: 0 }];
        let failed = 0;
        for (const m of this.manualList()) {
          try {
            const r = await this.booking.book({ ...base, startsAt: m.startsAt });
            done.push({ id: r.id, startsAt: r.startsAt, endsAt: r.endsAt, recurrenceIndex: done.length });
          } catch {
            failed++;
          }
        }
        this.result.set({ ...first, recurring: true, count: done.length, appointments: done });
        if (failed > 0) this.error.set(`${failed} de las fechas elegidas ya no estaban disponibles y no se reservaron.`);
      } else {
        this.result.set(first);
      }
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

  protected formatAppointmentDate(iso: string) {
    return this.format(iso);
  }

  protected recurringPreview(): string[] {
    const start = this.slotStart();
    const count = Number(this.form.controls.recurrenceCount.value);
    const rule = this.frequency();
    if (!start || count < 2 || (rule !== 'weekly' && rule !== 'biweekly')) return [];

    const days = rule === 'weekly' ? 7 : 14;
    const tz = this.agenda()?.psychologist.timezone;
    const fmt = new Intl.DateTimeFormat('es', {
      weekday: 'short',
      day: 'numeric',
      month: 'short',
      timeZone: tz,
    });

    const dates: string[] = [];
    let d = new Date(start);
    for (let i = 0; i < count; i++) {
      dates.push(fmt.format(d));
      d = new Date(d.getTime() + days * 24 * 60 * 60 * 1000);
    }
    return dates;
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
