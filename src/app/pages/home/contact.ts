import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { ContactService } from '../../core/contact.service';
import { ContactRequest } from '../../core/models';
import { cleanText, emailValidators, nameValidators, PHONE_PATTERN } from '../../core/safe-input';
import { SITE } from '../../core/site.config';
import { Icon } from '../../shared/icon';
import { Reveal } from '../../shared/reveal.directive';

@Component({
  selector: 'app-contact',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ReactiveFormsModule, RouterLink, Icon, Reveal],
  template: `
    <section id="contacto" class="section-y border-t border-line">
      <div class="page grid gap-12 lg:grid-cols-12 lg:gap-16">
        <div class="space-y-6 lg:col-span-5">
          <p appReveal class="eyebrow">Contacto</p>
          <h2 appReveal="60" class="heading-lg">Da el primer paso. <span class="em-brand">Estoy aquí.</span></h2>
          <p appReveal="100" class="lead">Cuéntame qué te trae y te respondo en menos de 24 horas hábiles.</p>
          <ul appReveal="140" class="divide-y divide-line border-y border-line">
            <li class="flex items-center gap-4 py-4">
              <app-icon name="video" [size]="24" class="text-forest-500" />
              <span><span class="block font-bold">Modalidades</span><span class="text-sm text-muted">Presencial en Panamá Oeste (La Chorrera) y Virtual en todo Panamá</span></span>
            </li>
            <li class="flex items-center gap-4 py-4">
              <app-icon name="clock" [size]="24" class="text-forest-500" />
              <span><span class="block font-bold">Horario</span><span class="text-sm text-muted">{{ site.hours }}</span></span>
            </li>
            <li class="flex items-center gap-4 py-4">
              <app-icon name="shield" [size]="24" class="text-forest-500" />
              <span><span class="block font-bold">Confidencialidad total</span><span class="text-sm text-muted">Protegida por el secreto profesional</span></span>
            </li>
          </ul>
        </div>

        <div appReveal="120" class="lg:col-span-7">
          @if (sent()) {
            <div class="card flex h-full flex-col items-center justify-center gap-4 p-10 text-center" role="status">
              <app-icon name="checkCircle" [size]="44" class="text-forest-500" />
              <h3 class="text-2xl font-medium">¡Gracias, {{ firstName() }}!</h3>
              <p class="max-w-sm text-muted">Recibí tu mensaje. Te escribiré muy pronto para coordinar el siguiente paso.</p>
              <button type="button" class="btn-outline mt-2" (click)="reset()">Enviar otro mensaje</button>
            </div>
          } @else {
            <form [formGroup]="form" (ngSubmit)="submit()" class="card card-light space-y-5 p-6 md:p-8" novalidate>
              <div class="grid gap-5 sm:grid-cols-2">
                <div>
                  <label class="label" for="c-name">Nombre <span class="font-medium text-muted">(obligatorio)</span></label>
                  <input id="c-name" class="input" formControlName="name" maxlength="120" autocomplete="name" [attr.aria-invalid]="invalid('name')" aria-describedby="c-name-err" />
                  @if (invalid('name')) {
                    <p id="c-name-err" class="mt-2 text-xs font-semibold text-accent-ink">Escribe tu nombre (solo letras).</p>
                  }
                </div>
                <div>
                  <label class="label" for="c-phone">Teléfono / WhatsApp <span class="font-medium text-muted">(obligatorio)</span></label>
                  <input id="c-phone" class="input" type="tel" formControlName="phone" maxlength="20" autocomplete="tel" inputmode="tel" [attr.aria-invalid]="invalid('phone')" />
                  @if (invalid('phone')) {
                    <p class="mt-2 text-xs font-semibold text-accent-ink">Escribe tu teléfono o WhatsApp (obligatorio).</p>
                  }
                </div>
              </div>
              <div>
                <label class="label" for="c-email">Correo</label>
                <input id="c-email" class="input" type="email" formControlName="email" maxlength="254" autocomplete="email" inputmode="email" [attr.aria-invalid]="invalid('email')" aria-describedby="c-email-err" />
                @if (invalid('email')) {
                  <p id="c-email-err" class="mt-2 text-xs font-semibold text-accent-ink">Escribe un correo válido.</p>
                }
              </div>
              <fieldset>
                <legend class="label">¿Qué te interesa?</legend>
                <div class="grid grid-cols-2 gap-2 sm:grid-cols-4">
                  @for (option of interests; track option.value) {
                    <label class="cursor-pointer">
                      <input type="radio" class="peer sr-only" formControlName="interest" [value]="option.value" />
                      <span class="flex h-full flex-col items-center gap-1.5 rounded-xl border-[1.5px] border-line bg-background px-2 py-3 text-center text-xs font-bold text-muted transition-[transform,box-shadow,background-color,border-color,color,opacity] peer-checked:border-forest-500 peer-checked:bg-forest-50 peer-checked:text-forest-700 peer-focus-visible:ring-2 peer-focus-visible:ring-forest-500">
                        <app-icon [name]="option.icon" />
                        {{ option.label }}
                      </span>
                    </label>
                  }
                </div>
              </fieldset>
              <div>
                <label class="label" for="c-message">Mensaje <span class="font-medium text-muted">(opcional)</span></label>
                <textarea id="c-message" class="input min-h-28 resize-y" formControlName="message" maxlength="1000" placeholder="Cuéntame brevemente el motivo de consulta y si vienes por Metamorfosis puedes dejar este espacio en blanco…"></textarea>
              </div>
              <!-- Campo trampa contra robots: oculto para las personas. -->
              <input type="text" formControlName="website" tabindex="-1" autocomplete="off" class="hidden" aria-hidden="true" />
              <label class="flex cursor-pointer items-start gap-3 text-sm text-muted">
                <input type="checkbox" formControlName="consent" class="mt-0.5 size-5 shrink-0 cursor-pointer accent-[var(--ev-forest-700)]" [attr.aria-invalid]="invalid('consent')" />
                <span>Acepto la <a routerLink="/privacidad" class="font-bold text-forest-700 underline underline-offset-4">política de privacidad</a> y que me contacten sobre mi consulta.</span>
              </label>
              @if (invalid('consent')) {
                <p class="-mt-3 text-xs font-semibold text-accent-ink">Necesitamos tu autorización para responderte.</p>
              }
              @if (error()) {
                <p class="rounded-xl border border-accent/40 bg-accent/10 px-4 py-3 text-sm font-semibold text-accent-ink" role="alert">{{ error() }}</p>
              }
              <button type="submit" class="btn-dark w-full sm:w-auto" [disabled]="sending()" [attr.aria-busy]="sending()">
                @if (sending()) {
                  <span class="size-4 animate-spin rounded-full border-2 border-white border-r-transparent" aria-hidden="true"></span> Enviando…
                } @else {
                  {{ contact.hasBackend ? 'Enviar mensaje' : 'Escribir por WhatsApp' }} <app-icon [name]="contact.hasBackend ? 'send' : 'whatsapp'" [size]="18" />
                }
              </button>
            </form>
          }
        </div>
      </div>
    </section>
  `,
})
export class Contact {
  protected readonly contact = inject(ContactService);
  protected readonly site = SITE;
  protected readonly sending = signal(false);
  protected readonly sent = signal(false);
  protected readonly error = signal<string | null>(null);
  protected readonly firstName = signal('');
  private readonly submitted = signal(false);

  protected readonly interests = [
    { value: 'terapia', label: 'Psicología', icon: 'brain' },
    { value: 'retiro', label: 'Metamorfosis', icon: 'waves' },
    { value: 'kids', label: 'Niños', icon: 'smile' },
    { value: 'pareja', label: 'Pareja', icon: 'users' },
  ] as const;

  protected readonly form = inject(FormBuilder).nonNullable.group({
    name: ['', nameValidators],
    email: ['', emailValidators],
    phone: ['', [Validators.required, Validators.pattern(PHONE_PATTERN)]],
    interest: ['terapia' as ContactRequest['interest']],
    message: ['', Validators.maxLength(1000)],
    consent: [false, Validators.requiredTrue],
    /** Campo trampa contra robots: siempre vacío. */
    website: [''],
  });

  // Los errores se muestran al tocar el campo o al intentar enviar.
  protected invalid(name: keyof typeof this.form.controls) {
    const control = this.form.controls[name];
    return control.invalid && (control.touched || this.submitted()) ? true : null;
  }

  protected async submit() {
    this.submitted.set(true);
    this.form.markAllAsTouched();
    if (this.form.invalid) return;

    const v = this.form.getRawValue();
    // Un robot rellena el campo oculto: se descarta en silencio.
    if (v.website) {
      this.sent.set(true);
      return;
    }
    const request: ContactRequest = {
      name: cleanText(v.name, 120),
      email: v.email.trim().toLowerCase(),
      phone: cleanText(v.phone, 20),
      interest: this.interests.some((o) => o.value === v.interest) ? v.interest : 'otro',
      message: cleanText(v.message, 1000, true),
      consent: true,
    };
    this.firstName.set(request.name.split(' ')[0]);

    if (!this.contact.hasBackend) {
      window.open(this.contact.whatsappFor(request), '_blank', 'noopener');
      return;
    }

    this.sending.set(true);
    this.error.set(null);
    try {
      await this.contact.send(request);
      this.sent.set(true);
    } catch {
      this.error.set('No pudimos enviar tu mensaje. Inténtalo de nuevo o escríbeme por WhatsApp.');
    } finally {
      this.sending.set(false);
    }
  }

  protected reset() {
    this.form.reset();
    this.submitted.set(false);
    this.sent.set(false);
  }
}
