import { afterNextRender, DestroyRef, Directive, ElementRef, inject, input } from '@angular/core';

// Hace aparecer el elemento con suavidad la primera vez que entra en pantalla.
// En el servidor no hace nada: el HTML pre-renderizado se ve completo.
@Directive({
  selector: '[appReveal]',
  host: { class: 'reveal', '[style.--reveal-delay]': 'delay() + "ms"' },
})
export class Reveal {
  readonly delay = input(0, { alias: 'appReveal', transform: (v: number | string) => Number(v) || 0 });

  constructor() {
    const el = inject(ElementRef<HTMLElement>).nativeElement;
    const destroyRef = inject(DestroyRef);

    afterNextRender(() => {
      if (!('IntersectionObserver' in window)) {
        el.classList.add('is-visible');
        return;
      }
      const observer = new IntersectionObserver(
        (entries) => {
          if (entries.some((e) => e.isIntersecting)) {
            el.classList.add('is-visible');
            observer.disconnect();
          }
        },
        { rootMargin: '0px 0px -10% 0px' },
      );
      observer.observe(el);
      destroyRef.onDestroy(() => observer.disconnect());
    });
  }
}
