import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { map } from 'rxjs';
import { SeoService } from '../core/seo.service';
import { SITE } from '../core/site.config';
import { Icon } from '../shared/icon';

type LegalKind = 'privacidad' | 'terminos';

const PAGES: Record<LegalKind, { title: string; intro: string; sections: { title: string; text: string }[] }> = {
  privacidad: {
    title: 'Política de privacidad',
    intro: `En ${SITE.name} cuidamos tu información con el mismo respeto con el que cuidamos lo que compartes en sesión.`,
    sections: [
      { title: 'Qué datos recogemos', text: 'Solo los que nos das en el formulario de contacto o por WhatsApp: nombre, correo, teléfono y tu mensaje.' },
      { title: 'Para qué los usamos', text: 'Únicamente para responder tu consulta y coordinar sesiones o retiros. No los vendemos ni los compartimos con terceros.' },
      { title: 'Confidencialidad y secreto profesional', text: 'Todo lo que se habla en terapia está protegido por el secreto profesional y el código de ética de la psicología.' },
      { title: 'Tus derechos', text: `Puedes pedir que corrijamos o borremos tus datos en cualquier momento escribiendo a ${SITE.email}.` },
    ],
  },
  terminos: {
    title: 'Términos y condiciones',
    intro: 'Estas condiciones aplican a las sesiones, talleres y retiros que se reservan a través de este sitio.',
    sections: [
      { title: 'Reservas', text: 'Un cupo queda confirmado al completar la evaluación previa y el abono acordado.' },
      { title: 'Cancelaciones', text: 'Las condiciones de reembolso o reprogramación se informan por escrito antes de confirmar cada reserva.' },
      { title: 'No es un servicio de emergencias', text: 'Si estás en crisis o en peligro, comunícate de inmediato con los servicios de emergencia de tu país.' },
    ],
  },
};

// Páginas legales (privacidad y términos). Revisa los textos con un profesional antes de publicar.
@Component({
  selector: 'app-legal',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink, Icon],
  template: `
    <article class="page max-w-3xl py-16 md:py-24">
      <a routerLink="/" class="mb-8 inline-flex items-center gap-1.5 text-sm font-bold text-forest-700 hover:underline">
        <app-icon name="chevronLeft" [size]="16" /> Volver al inicio
      </a>
      <h1 class="heading-lg mb-4">{{ page().title }}</h1>
      <p class="lead mb-10">{{ page().intro }}</p>
      <div class="space-y-8">
        @for (section of page().sections; track section.title) {
          <section>
            <h2 class="mb-2 text-lg font-bold">{{ section.title }}</h2>
            <p class="leading-relaxed text-muted">{{ section.text }}</p>
          </section>
        }
      </div>
      <p class="mt-12 text-xs text-muted">Última actualización: {{ updated }}</p>
    </article>
  `,
})
export class Legal {
  private readonly kind = toSignal(inject(ActivatedRoute).data.pipe(map((d) => d['kind'] as LegalKind)), { requireSync: true });
  protected readonly page = computed(() => PAGES[this.kind()]);
  protected readonly updated = new Intl.DateTimeFormat('es', { month: 'long', year: 'numeric' }).format(new Date());

  constructor() {
    const seo = inject(SeoService);
    const page = PAGES[this.kind()];
    seo.set({ title: `${page.title} | ${SITE.name}`, description: page.intro, path: `/${this.kind()}` });
  }
}
