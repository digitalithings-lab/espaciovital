import { DOCUMENT } from '@angular/common';
import { afterNextRender, ChangeDetectionStrategy, Component, DestroyRef, inject, signal } from '@angular/core';
import { NavigationEnd, Router, RouterLink } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { filter, map } from 'rxjs';
import { SITE, whatsappLink } from '../core/site.config';
import { Icon } from '../shared/icon';
import { Logo } from '../shared/logo';

const NAV = [
  { id: 'sobre-mi', label: 'Sobre mí' },
  { id: 'retiro', label: 'Actividades' },
  { id: 'espacio-kids', label: 'Vital Kids' },
  { id: 'proximas-fechas', label: 'Fechas' },
  { id: 'contacto', label: 'Contacto' },
  { id: 'preguntas', label: 'Preguntas' },
];

@Component({
  selector: 'app-header',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink, Icon, Logo],
  host: { '(document:keydown.escape)': 'close()' },
  template: `
    <header class="sticky top-0 z-50 flex h-[72px] items-center">
      <div class="page relative">
        <div
          class="flex h-14 items-center justify-between gap-3 rounded-full border py-1 pr-1.5 pl-5 transition-[background-color,border-color,box-shadow] duration-300"
          [class]="open() ? 'border-line bg-surface shadow-lift' : scrolled() ? 'border-line bg-background/90 shadow-soft backdrop-blur-xl' : 'border-white/25 bg-background/85 backdrop-blur-md'"
        >
          <a routerLink="/" fragment="inicio" class="rounded-2xl" aria-label="EspacioVital, ir al inicio" (click)="close()">
            <app-logo [size]="36" />
          </a>

          <nav class="hidden items-center gap-1 lg:flex" aria-label="Secciones">
            @for (item of nav; track item.id) {
              <a
                routerLink="/"
                [fragment]="item.id"
                class="relative rounded-full px-3.5 py-2 text-sm font-semibold transition-colors duration-200"
                [class]="active() === item.id ? 'bg-forest-100 text-forest-900' : 'text-muted hover:bg-surface-muted hover:text-ink'"
                [attr.aria-current]="active() === item.id ? 'location' : null"
              >
                {{ item.label }}
              </a>
            }
          </nav>

          <div class="flex items-center gap-1.5">
            <a
              class="icon-btn hidden sm:inline-flex"
              [href]="whatsapp"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Escribir por WhatsApp"
              title="Escribir por WhatsApp"
            >
              <app-icon name="whatsapp" />
            </a>
            <a
              [routerLink]="isEnglish() ? '/' : '/en'"
              class="icon-btn text-xs font-extrabold tracking-wider"
              [attr.hreflang]="isEnglish() ? 'es' : 'en'"
              [attr.aria-label]="isEnglish() ? 'Ver en español' : 'View in English'"
              [title]="isEnglish() ? 'Ver en español' : 'View in English'"
              (click)="close()"
            >
              {{ isEnglish() ? 'ES' : 'EN' }}
            </a>
            <a routerLink="/agendar" class="btn-primary hidden min-h-11 px-6 sm:inline-flex">Agendar cita</a>
            <button
              type="button"
              class="icon-btn lg:hidden"
              (click)="toggle()"
              [attr.aria-expanded]="open()"
              aria-controls="menu-movil"
              [attr.aria-label]="open() ? 'Cerrar menú' : 'Abrir menú'"
            >
              <app-icon [name]="open() ? 'x' : 'menu'" />
            </button>
          </div>
        </div>

        <!-- Menú en celular y tableta: se despliega bajo la píldora. -->
        @if (open()) {
          <div id="menu-movil" class="animate-fade-in absolute inset-x-5 top-full mt-2 rounded-[2rem] border border-line bg-surface p-3 shadow-lift sm:inset-x-8 lg:hidden">
            <nav class="flex flex-col gap-1" aria-label="Secciones">
              @for (item of nav; track item.id) {
                <a
                  routerLink="/"
                  [fragment]="item.id"
                  class="flex items-center justify-between rounded-full px-5 py-3.5 text-lg font-semibold transition-colors"
                  [class]="active() === item.id ? 'bg-forest-100 text-forest-900' : 'text-ink hover:bg-surface-muted'"
                  (click)="close()"
                >
                  {{ item.label }}
                  <app-icon name="chevronRight" [size]="18" class="text-muted" />
                </a>
              }
              <div class="mt-2 grid gap-2 sm:grid-cols-2">
                <a routerLink="/agendar" class="btn-primary" (click)="close()">Agendar cita</a>
                <a class="btn-outline" [href]="whatsapp" target="_blank" rel="noopener noreferrer">
                  <app-icon name="whatsapp" [size]="18" /> Escribir por WhatsApp
                </a>
              </div>
            </nav>
          </div>
        }
      </div>
    </header>
  `,
})
export class Header {
  protected readonly nav = NAV;
  protected readonly whatsapp = whatsappLink(`Hola ${SITE.therapistShort}, me gustaría recibir información.`);
  protected readonly open = signal(false);
  protected readonly scrolled = signal(false);
  protected readonly active = signal('');
  private readonly router = inject(Router);
  protected readonly isEnglish = toSignal(
    this.router.events.pipe(filter((e) => e instanceof NavigationEnd), map(() => this.router.url.startsWith('/en'))),
    { initialValue: this.router.url.startsWith('/en') },
  );

  private readonly document = inject(DOCUMENT);

  constructor() {
    const router = inject(Router);
    const destroyRef = inject(DestroyRef);

    // Solo en el navegador: sombra al hacer scroll y sección activa del menú.
    afterNextRender(() => {
      const window = this.document.defaultView!;
      const onScroll = () => this.scrolled.set(window.scrollY > 12);
      onScroll();
      window.addEventListener('scroll', onScroll, { passive: true });

      let observer: IntersectionObserver | null = null;
      const watchSections = () => {
        observer?.disconnect();
        // Fuera de la portada (agenda, páginas legales) ninguna sección del menú está activa.
        if (router.url.split(/[?#]/)[0] !== '/') {
          this.active.set('');
          return;
        }
        observer = new IntersectionObserver(
          (entries) => {
            const visible = entries.filter((e) => e.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
            if (visible) this.active.set(visible.target.id);
          },
          { rootMargin: '-35% 0px -55% 0px', threshold: [0, 0.25, 0.5] },
        );
        NAV.forEach((item) => {
          const section = this.document.getElementById(item.id);
          if (section) observer!.observe(section);
        });
      };
      watchSections();
      const sub = router.events.pipe(filter((e) => e instanceof NavigationEnd)).subscribe(() => setTimeout(watchSections));

      destroyRef.onDestroy(() => {
        window.removeEventListener('scroll', onScroll);
        observer?.disconnect();
        sub.unsubscribe();
      });
    });
  }

  protected toggle() {
    this.open.update((v) => !v);
  }

  protected close() {
    this.open.set(false);
  }
}
