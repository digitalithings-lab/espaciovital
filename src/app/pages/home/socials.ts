import { afterNextRender, ChangeDetectionStrategy, Component, ElementRef, signal, viewChild } from '@angular/core';
import { SITE } from '../../core/site.config';
import { Icon } from '../../shared/icon';
import { Reveal } from '../../shared/reveal.directive';

// Redes sociales con los feeds de SociableKit (Instagram y TikTok).
// Los scripts de terceros se cargan solo cuando la persona llega a esta parte de la página, para no frenar el inicio.
const WIDGET_SCRIPTS = [
  'https://widgets.sociablekit.com/instagram-feed/widget.js',
  'https://widgets.sociablekit.com/tiktok-feed/widget.js',
];

@Component({
  selector: 'app-socials',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [Icon, Reveal],
  template: `
    <div #root class="mt-16 border-t border-white/25 pt-14 lg:mt-20 lg:pt-16">
      <div appReveal class="max-w-2xl">
        <h3 class="heading-lg">Mis redes <span class="font-semibold text-forest-100 italic">sociales.</span></h3>
        <p class="lead mt-3 text-white/95!">Lo que pasa en las sesiones, en Vital Kids y en cada actividad de Metamorfosis, día a día.</p>
      </div>

      <div class="mt-8 grid gap-5 lg:mt-10 lg:grid-cols-2 lg:gap-6">
        @for (net of networks; track net.id; let i = $index) {
          <article [appReveal]="i * 80" class="flex min-w-0 flex-col overflow-hidden rounded-[2rem] bg-white text-ink shadow-lift">
            <header class="flex items-center gap-3 px-5 pt-5 sm:px-6 sm:pt-6">
              <span class="flex size-12 shrink-0 items-center justify-center rounded-full text-white" [class]="net.badge">
                <app-icon [name]="net.icon" [size]="24" />
              </span>
              <div class="min-w-0 flex-1">
                <h4 class="font-display text-xl leading-tight font-bold text-forest-900">{{ net.name }}</h4>
                <p class="truncate text-sm text-muted">&#64;espaciovitalpsic</p>
              </div>
              @if (net.url) {
                <a class="btn-dark min-h-11 shrink-0 px-5 py-2 text-sm" [href]="net.url" target="_blank" rel="noopener noreferrer" [attr.aria-label]="'Seguir en ' + net.name">Seguir</a>
              }
            </header>

            <!-- Publicaciones: se desliza hacia abajo dentro de la tarjeta para ver más -->
            <div class="relative mt-4">
             <div
              class="max-h-[26rem] overflow-y-auto overscroll-contain px-3 [scrollbar-color:var(--ev-forest-500)_transparent] [scrollbar-width:thin] sm:max-h-[32rem] sm:px-4"
              tabindex="0"
              role="region"
              [attr.aria-label]="'Publicaciones de ' + net.name + ', desliza para ver más'"
             >
              @if (net.id === 'instagram') {
                <div class="peer sk-instagram-feed" data-embed-id="25728086"></div>
              } @else {
                <div class="peer sk-tiktok-feed" data-embed-id="25728090"></div>
              }
              <!-- Mientras llegan las publicaciones; si no llegan, un aviso con el enlace al perfil -->
              @if (failed()[net.id]) {
                <div class="hidden rounded-2xl bg-surface-muted px-5 py-8 text-center peer-empty:block" role="status">
                  <p class="font-bold text-forest-900">No pudimos cargar las publicaciones de {{ net.name }}.</p>
                  <p class="mt-1 text-sm text-muted">Puede ser tu bloqueador de anuncios o la conexión. Búscanos como &#64;espaciovitalpsic.</p>
                  @if (net.url) {
                    <a class="btn-dark mt-4 min-h-11 px-5 py-2 text-sm" [href]="net.url" target="_blank" rel="noopener noreferrer">Abrir {{ net.name }}</a>
                  }
                </div>
              } @else {
                <div class="hidden grid-cols-3 gap-2 peer-empty:grid" aria-hidden="true">
                  @for (n of placeholders; track n) {
                    <div class="aspect-square animate-pulse rounded-xl bg-surface-muted"></div>
                  }
                </div>
              }
             </div>
             <div class="pointer-events-none absolute inset-x-0 bottom-0 h-14 bg-gradient-to-t from-white to-transparent" aria-hidden="true"></div>
            </div>
            <p class="px-5 pt-1 text-center text-xs font-semibold text-muted sm:px-6">Desliza para ver más publicaciones</p>

            @if (net.url) {
              <a
                class="mx-5 mt-2 mb-5 flex min-h-12 items-center justify-center gap-2 rounded-full border-[1.5px] border-forest-500 px-5 text-sm font-bold text-forest-500 transition-[transform,background-color,color] duration-[180ms] ease-[cubic-bezier(0.23,1,0.32,1)] active:scale-[0.97] sm:mx-6 sm:mb-6 [@media(hover:hover)]:hover:bg-forest-500 [@media(hover:hover)]:hover:text-white"
                [href]="net.url"
                target="_blank"
                rel="noopener noreferrer"
              >
                Ver más en {{ net.name }} <app-icon name="arrowRight" [size]="16" />
              </a>
            } @else {
              <span class="mb-5 block sm:mb-6"></span>
            }
          </article>
        }
      </div>
    </div>
  `,
})
export class Socials {
  protected readonly site = SITE;
  protected readonly placeholders = [1, 2, 3, 4, 5, 6];
  protected readonly networks = [
    { id: 'instagram', name: 'Instagram', icon: 'instagram', badge: 'bg-forest-500', url: SITE.instagram },
    { id: 'tiktok', name: 'TikTok', icon: 'film', badge: 'bg-forest-900', url: SITE.tiktok },
  ];
  private readonly root = viewChild.required<ElementRef<HTMLElement>>('root');
  /** Redes cuyo feed no llegó a tiempo. */
  protected readonly failed = signal<Record<string, boolean>>({});

  constructor() {
    afterNextRender(() => {
      const el = this.root().nativeElement;
      if (typeof IntersectionObserver === 'undefined') return this.start();
      const observer = new IntersectionObserver(
        (entries) => {
          if (entries.some((e) => e.isIntersecting)) {
            observer.disconnect();
            this.start();
          }
        },
        { rootMargin: '400px 0px' },
      );
      observer.observe(el);
      // Respaldo: si el navegador no avisa que llegó a esta parte, se cargan igual unos segundos después.
      setTimeout(() => {
        observer.disconnect();
        this.start();
      }, 8000);
    });
  }

  /**
   * Los videos se abren en ventanas que crea el widget. Aquí se les da lo que hace falta para que se reproduzcan bien en el celular:
   * el reproductor de TikTok puede arrancar con permiso de reproducción y pantalla completa, y los videos de Instagram se quedan en la página
   * (sin saltar a pantalla completa) y con sus controles, incluido el volumen. El sonido lo activa la persona con el ícono de volumen:
   * los navegadores no dejan que una página ponga sonido sin que se toque.
   */
  private fixPlayers() {
    const tune = (root: ParentNode) => {
      root.querySelectorAll<HTMLIFrameElement>('iframe[src*="tiktok.com"]').forEach((frame) => {
        if (frame.getAttribute('allow')?.includes('autoplay')) return;
        frame.setAttribute('allow', 'autoplay; fullscreen; encrypted-media; picture-in-picture');
        frame.setAttribute('allowfullscreen', '');
        const src = frame.src;
        frame.src = src; // se vuelve a cargar con los permisos ya puestos
      });
      root.querySelectorAll<HTMLVideoElement>('.white-popup video, .mfp-content video').forEach((video) => {
        video.playsInline = true;
        video.controls = true;
        video.setAttribute('controlsList', 'nodownload');
      });
    };
    new MutationObserver((mutations) => {
      for (const m of mutations) m.addedNodes.forEach((n) => n instanceof HTMLElement && tune(n.matches?.('iframe, video') ? n.parentElement ?? document : n));
    }).observe(document.body, { childList: true, subtree: true });
  }

  private started = false;
  /** Carga los scripts y, si pasados unos segundos un feed sigue vacío, avisa en su tarjeta. */
  private start() {
    if (this.started) return;
    this.started = true;
    load();
    this.fixPlayers();
    setTimeout(() => {
      const empty = (cls: string) => (document.querySelector(cls)?.childElementCount ?? 0) === 0;
      this.failed.set({ instagram: empty('.sk-instagram-feed'), tiktok: empty('.sk-tiktok-feed') });
    }, 20000);
  }
}

function load() {
  for (const src of WIDGET_SCRIPTS) {
    if (document.querySelector(`script[src="${src}"]`)) continue;
    const script = document.createElement('script');
    script.src = src;
    script.async = true;
    document.body.appendChild(script);
  }
}
