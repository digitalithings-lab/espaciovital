import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
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
      class="sr-only z-[70] rounded-full bg-leaf-700 px-5 py-3 font-bold text-white focus:not-sr-only focus:fixed focus:top-4 focus:left-4"
    >
      Saltar al contenido
    </a>
    <app-header />
    <main id="contenido" tabindex="-1" class="outline-none"><router-outlet /></main>
    <app-footer />

    <!-- Agendar siempre a mano en el celular. -->
    <a routerLink="/agendar" class="btn-sunset fixed right-4 bottom-4 z-40 size-14 rounded-full p-0 sm:hidden" aria-label="Agendar cita">
      <app-icon name="calendar" [size]="24" />
    </a>
  `,
})
export class App {}
