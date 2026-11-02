import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { IMG } from '../core/content';
import { businessJsonLd, SeoService } from '../core/seo.service';
import { SITE, whatsappLink } from '../core/site.config';
import { Icon } from '../shared/icon';

const DESCRIPTION =
  'Psychologist in La Chorrera, Panama (in person) and online across Panama: individual and couples therapy with Psic. Nathalie Vera. Women’s retreat and kids’ workshops.';

const FAQS_EN = [
  {
    question: 'Do you offer in-person or online sessions?',
    answer: 'Both. In-person sessions take place in La Chorrera (Panamá Oeste), and online video sessions are available anywhere in Panama.',
  },
  {
    question: 'What happens in the first session?',
    answer: 'We talk about what brings you in, your goals and your story. At the end I suggest a plan, and you decide whether to continue, with no commitment.',
  },
  {
    question: 'Do you work with couples and children?',
    answer: 'Yes. I offer couples therapy, and socio-emotional sessions and small-group workshops for children from age 5.',
  },
  {
    question: 'Is what I share confidential?',
    answer: 'Always. Everything you share is protected by professional secrecy and the psychology code of ethics.',
  },
];

// Página en inglés para quien busca «psychologist in La Chorrera / Panama». Enlazada con la portada por hreflang.
@Component({
  selector: 'app-english',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink, Icon],
  host: { lang: 'en' },
  template: `
    <section class="page grid items-center gap-12 py-14 lg:grid-cols-12 lg:py-20">
      <div class="animate-fade-up lg:col-span-7">
        <p class="eyebrow mb-6">General psychology · In person in La Chorrera · Online across Panama</p>
        <h1 class="font-display text-4xl leading-[1.05] font-bold tracking-tight text-ink md:text-5xl lg:text-6xl">
          Psychologist in La Chorrera, Panama <span class="text-forest-500 italic">and online.</span>
        </h1>
        <p class="lead mt-7 max-w-[52ch]">
          I’m Nathalie Vera, a licensed general psychologist with an integrative, cognitive-behavioural approach. I offer
          individual and couples therapy in person in La Chorrera and by video call anywhere in Panama.
        </p>
        <div class="mt-10 flex flex-col gap-3 sm:flex-row">
          <a class="btn-primary h-14 px-8 text-base" [href]="whatsapp" target="_blank" rel="noopener noreferrer">
            <app-icon name="whatsapp" [size]="18" /> Message me on WhatsApp
          </a>
          <a routerLink="/agendar" class="btn-outline h-14 px-7 text-base" hreflang="es">Book online (form in Spanish)</a>
        </div>
        <p class="mt-6 text-sm text-muted">
          <a routerLink="/" class="font-semibold text-forest-700 underline underline-offset-4" hreflang="es" lang="es">Ver la página en español</a>
        </p>
      </div>
      <div class="mx-auto w-full max-w-[22rem] lg:col-span-5 lg:max-w-none">
        <img
          [src]="img.hero"
          alt="Psychologist Nathalie Vera"
          width="934"
          height="1168"
          fetchpriority="high"
          class="aspect-[4/5] w-full rounded-t-[999px] rounded-b-3xl object-cover shadow-lift"
        />
      </div>
    </section>

    <section class="section-y border-t border-line bg-surface">
      <div class="page">
        <p class="eyebrow">How I can help</p>
        <h2 class="heading-lg mt-4">Therapy services</h2>
        <ul class="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          @for (service of services; track service.title) {
            <li class="card p-6">
              <app-icon [name]="service.icon" [size]="26" class="text-forest-500" />
              <h3 class="mt-4 font-display text-xl font-bold">{{ service.title }}</h3>
              <p class="mt-2 leading-relaxed text-muted">{{ service.text }}</p>
            </li>
          }
        </ul>
      </div>
    </section>

    <section class="section-y border-t border-line">
      <div class="page grid gap-6 md:grid-cols-2">
        <div class="card p-7">
          <app-icon name="mapPin" [size]="26" class="text-forest-500" />
          <h2 class="mt-4 font-display text-2xl font-bold">In person in La Chorrera</h2>
          <p class="mt-2 leading-relaxed text-muted">Face-to-face sessions in La Chorrera, Panamá Oeste. Message me for the exact address.</p>
        </div>
        <div class="card p-7">
          <app-icon name="video" [size]="26" class="text-forest-500" />
          <h2 class="mt-4 font-display text-2xl font-bold">Online across Panama</h2>
          <p class="mt-2 leading-relaxed text-muted">Video sessions from Panama City, Arraiján, Coronado or anywhere else in the country.</p>
        </div>
        <p class="flex items-center gap-2 text-muted md:col-span-2">
          <app-icon name="clock" [size]="18" /> Monday to Saturday · 8:00 a.m. – 6:00 p.m.
        </p>
      </div>
    </section>

    <section class="section-y border-t border-line bg-surface">
      <div class="page max-w-3xl">
        <p class="eyebrow">FAQ</p>
        <h2 class="heading-lg mt-4">Frequently asked questions</h2>
        <div class="mt-8 divide-y divide-line border-y border-line">
          @for (item of faqs; track item.question; let i = $index) {
            <details class="group" [open]="i === 0">
              <summary class="flex cursor-pointer list-none items-center justify-between gap-6 py-6 text-lg font-medium hover:text-forest-500 [&::-webkit-details-marker]:hidden">
                <span class="font-display">{{ item.question }}</span>
                <app-icon name="chevronDown" [size]="20" class="shrink-0 text-muted transition-transform duration-300 group-open:rotate-180" />
              </summary>
              <p class="pb-6 leading-relaxed text-muted">{{ item.answer }}</p>
            </details>
          }
        </div>
        <a class="btn-dark mt-10" [href]="whatsapp" target="_blank" rel="noopener noreferrer">
          <app-icon name="whatsapp" [size]="18" /> Ask me anything on WhatsApp
        </a>
      </div>
    </section>
  `,
})
export class English {
  protected readonly img = IMG;
  protected readonly faqs = FAQS_EN;
  protected readonly whatsapp = whatsappLink(`Hi ${SITE.therapistShort}, I found your website and I’d like information about therapy.`);
  protected readonly services = [
    { icon: 'heart', title: 'Individual therapy', text: 'A safe space to understand your emotions, cope with anxiety, stress or grief, and strengthen your well-being.' },
    { icon: 'users', title: 'Couples therapy', text: 'Improve communication, handle conflict and build healthier relationships.' },
    { icon: 'video', title: 'Online therapy', text: 'The same quality of care by video call, wherever you are in Panama.' },
    { icon: 'waves', title: 'Metamorphosis retreat', text: 'A women’s retreat and community to reconnect, share experiences and build meaningful connections.' },
    { icon: 'smile', title: 'Vital Kids', text: 'Socio-emotional sessions and small-group workshops for children from age 5.' },
  ];

  constructor() {
    inject(SeoService).set({
      title: `Psychologist in La Chorrera, Panama & Online | ${SITE.therapist}`,
      description: DESCRIPTION,
      path: '/en',
      lang: 'en',
      alternates: { es: '/', en: '/en' },
      jsonLd: [
        businessJsonLd(DESCRIPTION),
        {
          '@context': 'https://schema.org',
          '@type': 'FAQPage',
          inLanguage: 'en',
          mainEntity: FAQS_EN.map((f) => ({ '@type': 'Question', name: f.question, acceptedAnswer: { '@type': 'Answer', text: f.answer } })),
        },
      ],
    });
  }
}
