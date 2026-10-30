import { ChangeDetectionStrategy, Component, input } from '@angular/core';

// Logotipo de EspacioVital: el arco (espacio seguro) y una persona hecha de dos hojas que crecen.
// El símbolo va en SVG en línea para que use los colores del tema; el nombre es texto real (bueno para SEO).
@Component({
  selector: 'app-logo',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'inline-flex items-center gap-2.5' },
  template: `
    <svg viewBox="0 0 120 120" [attr.width]="size()" [attr.height]="size()" aria-hidden="true" class="shrink-0">
      <path
        d="M26 102 V58 A34 34 0 0 1 94 58 V102"
        fill="none"
        [attr.stroke]="inverse() ? '#9FD9C8' : 'var(--ev-forest-700)'"
        stroke-width="9"
        stroke-linecap="round"
      />
      <circle cx="60" cy="50" r="9" [attr.fill]="inverse() ? '#C9B8F2' : '#8E7CC3'" />
      <path d="M60 100 C42 97 33 80 41 66 C53 71 60 84 60 100 Z" [attr.fill]="inverse() ? '#BFE6D8' : '#7FB8A4'" />
      <path d="M60 100 C78 97 87 80 79 66 C67 71 60 84 60 100 Z" [attr.fill]="inverse() ? '#5FC0A6' : '#2F8F7A'" />
    </svg>
    @if (withName()) {
      <span class="leading-none">
        <span class="block font-display text-[1.35rem] tracking-tight" [class]="inverse() ? 'text-white' : 'text-ink'">
          <span class="font-semibold">Espacio</span><span class="font-extrabold" [class]="inverse() ? 'text-[#8FE0C8]' : 'text-forest-500'">Vital</span>
        </span>
        @if (tagline()) {
          <span class="mt-1 block text-[0.6rem] font-bold tracking-[0.2em] uppercase" [class]="inverse() ? 'text-white/70' : 'text-muted'">
            Psicología · Bienestar emocional
          </span>
        }
      </span>
    }
  `,
})
export class Logo {
  readonly size = input(40);
  readonly withName = input(true);
  readonly tagline = input(false);
  readonly inverse = input(false);
}
