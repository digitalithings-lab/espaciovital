import { DOCUMENT } from '@angular/common';
import { afterNextRender, ChangeDetectionStrategy, Component, DestroyRef, inject, signal } from '@angular/core';
import { NavigationEnd, Router, RouterLink } from '@angular/router';
import { filter } from 'rxjs';
import { SITE, whatsappLink } from '../core/site.config';
import { Icon } from '../shared/icon';
import { Logo } from '../shared/logo';

const NAV = [
  { id: 'inicio', label: 'Inicio' },
  { id: 'sobre-mi', label: 'Sobre mí' },
  { id: 'retiro', label: 'Retiro Metamorfosis' },
  { id: 'espacio-kids', label: 'Espacio Kids' },
  { id: 'proximas-fechas', label: 'Próximas fechas' },
  { id: 'contacto', label: 'Contacto' },
];

@Component({
  selector: 'app-header',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink, Icon, Logo],
  host: { '(document:keydown.escape)': 'close()' },
  template: `
    <header
      class="sticky top-0 z-50 border-b transition-[background-color,border-color,box-shadow] duration-300"
      [class]="scrolled() || open() ? 'border-line bg-background/85 shadow-soft backdrop-blur-xl' : 'border-transparent bg-transparent'"
    >
      <div class="page flex h-20 items-center justify-between gap-4">
        <a routerLink="/" fragment="inicio" class="rounded-2xl" aria-label="EspacioVital, ir al inicio" (click)="close()">
          <app-logo [size]="40" />
        </a>

        <nav class="hidden items-center gap-1 rounded-full border border-line bg-surface/70 p-1.5 shadow-soft xl:flex" aria-label="Secciones">
          @for (item of nav; track item.id) {
            <a
              routerLink="/"
              [fragment]="item.id"
              class="rounded-full px-4 py-2 text-[13px] font-semibold transition-colors duration-200"
              [class]="active() === item.id ? 'bg-leaf-100 text-leaf-700' : 'text-muted hover:bg-surface-muted hover:text-ink'"
              [attr.aria-current]="active() === item.id ? 'location' : null"
            >
              {{ item.label }}
            </a>
          }
        </nav>

        <div class="flex items-center gap-2">
          <a
            class="icon-btn hidden sm:inline-flex"
            [href]="whatsapp"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Escribir por WhatsApp"
            title="Escribir por WhatsApp"
          >
            <app-icon name="message" />
          </a>
          <a routerLink="/agendar" class="btn-sunset hidden min-h-11 px-6 sm:inline-flex">
            Agendar cita <app-icon name="arrowRight" [size]="18" />
          </a>
          <button
            type="button"
            class="icon-btn xl:hidden"
            (click)="toggle()"
            [attr.aria-expanded]="open()"
            aria-controls="menu-movil"
            [attr.aria-label]="open() ? 'Cerrar menú' : 'Abrir menú'"
          >
            <app-icon [name]="open() ? 'x' : 'menu'" />
          </button>
        </div>
      </div>

      <!-- Menú en celular y tableta: en la referencia no existía. -->
      @if (open()) {
        <div id="menu-movil" class="animate-fade-in border-t border-line xl:hidden">
          <nav class="page flex flex-col gap-1 py-4" aria-label="Secciones">
            @for (item of nav; track item.id) {
              <a
                routerLink="/"
                [fragment]="item.id"
                class="flex items-center justify-between rounded-2xl px-4 py-3.5 text-lg font-semibold transition-colors"
                [class]="active() === item.id ? 'bg-leaf-100 text-leaf-700' : 'text-ink hover:bg-surface-muted'"
                (click)="close()"
              >
                {{ item.label }}
                <app-icon name="chevronRight" [size]="18" class="text-muted" />
              </a>
            }
            <div class="mt-3 grid gap-2 sm:grid-cols-2">
              <a routerLink="/agendar" class="btn-sunset" (click)="close()"><app-icon name="calendar" [size]="18" /> Agendar cita</a>
              <a class="btn-outline" [href]="whatsapp" target="_blank" rel="noopener noreferrer">
                <app-icon name="message" [size]="18" /> WhatsApp
              </a>
            </div>
          </nav>
        </div>
      }
    </header>
  `,
})
export class Header {
  protected readonly nav = NAV;
  protected readonly whatsapp = whatsappLink(`Hola ${SITE.therapistShort}, me gustaría recibir información.`);
  protected readonly open = signal(false);
  protected readonly scrolled = signal(false);
  protected readonly active = signal('inicio');

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
