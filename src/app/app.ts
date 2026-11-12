import { DOCUMENT } from '@angular/common';
import { afterNextRender, ChangeDetectionStrategy, Component, DestroyRef, inject, signal } from '@angular/core';
import { NavigationEnd, Router, RouterLink, RouterOutlet } from '@angular/router';
import { filter } from 'rxjs';
import { Footer } from './layout/footer';
import { Header } from './layout/header';
import { Icon } from './shared/icon';

@Component({
  selector: 'app-root',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterOutlet, RouterLink, Header, Footer, Icon],
  template: `
    <a
      href="#contenido"
      class="sr-only z-[70] rounded-full bg-forest-900 px-5 py-3 font-bold text-white focus:not-sr-only focus:fixed focus:top-4 focus:left-4"
    >
      Saltar al contenido
    </a>
    <app-header />
    <main id="contenido" tabindex="-1" class="outline-none"><router-outlet /></main>
    <app-footer />

    <!-- Agendar siempre a mano en el celular; se retira donde ya hay un formulario o el pie, para no tapar campos ni botones. -->
    <a
      routerLink="/agendar"
      class="btn-primary fixed right-4 bottom-[max(1rem,env(safe-area-inset-bottom))] z-40 size-14 rounded-full p-0 shadow-lift transition-[opacity,transform,background-color] duration-200 ease-out sm:hidden"
      [class]="hideFab() ? 'pointer-events-none translate-y-2 scale-95 opacity-0' : ''"
      [attr.aria-hidden]="hideFab() ? 'true' : null"
      [attr.tabindex]="hideFab() ? -1 : null"
      aria-label="Agendar cita"
    >
      <app-icon name="calendar" [size]="24" />
    </a>

    <!-- Subir al inicio: aparece al bajar. En el celular queda sobre el botón de agendar. -->
    <button
      type="button"
      (click)="scrollTop()"
      class="fixed right-4 bottom-[calc(max(1rem,env(safe-area-inset-bottom))+4.25rem)] z-40 flex size-12 items-center justify-center rounded-full bg-white text-forest-900 shadow-lift ring-1 ring-forest-900/15 transition-[opacity,transform,background-color] duration-200 ease-out hover:bg-forest-50 active:scale-95 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-forest-900 sm:right-6 sm:bottom-6"
      [class]="showTop() ? '' : 'pointer-events-none translate-y-2 opacity-0'"
      [attr.aria-hidden]="showTop() ? null : 'true'"
      [attr.tabindex]="showTop() ? null : -1"
      aria-label="Subir al inicio"
    >
      <app-icon name="arrowUp" [size]="22" />
    </button>
  `,
})
export class App {
  protected readonly hideFab = signal(false);
  protected readonly showTop = signal(false);
  private readonly doc = inject(DOCUMENT);

  protected scrollTop() {
    const win = this.doc.defaultView;
    const reduce = win?.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
    win?.scrollTo({ top: 0, behavior: reduce ? 'auto' : 'smooth' });
  }

  constructor() {
    const document = inject(DOCUMENT);
    const router = inject(Router);
    const destroyRef = inject(DestroyRef);

    afterNextRender(() => {
      const win = document.defaultView!;

      // Oculta el botón mientras el formulario de contacto, las preguntas o el pie están en pantalla.
      const update = () => {
        this.showTop.set(win.scrollY > 600);
        if (router.url.startsWith('/agendar')) {
          this.hideFab.set(true);
          return;
        }
        const targets = ['contacto', 'preguntas'].map((id) => document.getElementById(id));
        targets.push(document.querySelector('footer'));
        const inView = targets.some((el) => {
          if (!el) return false;
          const r = el.getBoundingClientRect();
          return r.top < win.innerHeight && r.bottom > 0;
        });
        this.hideFab.set(inView);
      };
      const schedule = update;

      update();
      win.addEventListener('scroll', schedule, { passive: true });
      win.addEventListener('resize', schedule, { passive: true });
      const sub = router.events.pipe(filter((e) => e instanceof NavigationEnd)).subscribe(() => setTimeout(update));
      destroyRef.onDestroy(() => {
        win.removeEventListener('scroll', schedule);
        win.removeEventListener('resize', schedule);
        sub.unsubscribe();
      });
    });
  }
}
