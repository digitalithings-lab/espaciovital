import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FAQS, RETREATS } from '../../core/content';
import { businessJsonLd, SeoService } from '../../core/seo.service';
import { SITE } from '../../core/site.config';
import { About } from './about';
import { Contact } from './contact';
import { Events } from './events';
import { FaqSection } from './faq';
import { FinalCta } from './final-cta';
import { Gallery } from './gallery';
import { Hero } from './hero';
import { Kids } from './kids';
import { Retreat } from './retreat';
import { Testimonials } from './testimonials';

@Component({
  selector: 'app-home',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [Hero, About, Retreat, Kids, Gallery, Testimonials, Events, FaqSection, Contact, FinalCta],
  template: `
    <app-hero />
    <app-about />
    <app-testimonials />
    <app-kids />
    <app-retreat />
    <app-gallery />
    <app-events />
    <app-contact />
    <app-faq />
    <app-final-cta />
  `,
})
export class Home {
  constructor() {
    inject(SeoService).set({
      title: `Psicóloga en La Chorrera y Panamá | ${SITE.therapist}`,
      description: SITE.description,
      path: '/',
      alternates: { es: '/', en: '/en' },
      jsonLd: [
        businessJsonLd(SITE.description),
        {
          '@context': 'https://schema.org',
          '@type': 'FAQPage',
          mainEntity: FAQS.map((f) => ({ '@type': 'Question', name: f.question, acceptedAnswer: { '@type': 'Answer', text: f.answer } })),
        },
        ...RETREATS.map((r) => ({
          '@context': 'https://schema.org',
          '@type': 'Event',
          name: `Actividades Metamorfosis · ${r.name}`,
          startDate: r.startDate,
          endDate: r.endDate,
          eventAttendanceMode: 'https://schema.org/OfflineEventAttendanceMode',
          eventStatus: 'https://schema.org/EventScheduled',
          location: { '@type': 'Place', name: r.place, address: { '@type': 'PostalAddress', addressCountry: 'PA' } },
          organizer: { '@type': 'Organization', name: SITE.name, url: SITE.url },
          performer: { '@type': 'Person', name: SITE.therapist },
          image: [`${SITE.url}/brand/redes-compartir-1200x630.png`],
          offers: {
            '@type': 'Offer',
            url: `${SITE.url}/#retiro`,
            price: String(r.price),
            priceCurrency: 'USD',
            availability: r.spotsLeft > 0 ? 'https://schema.org/InStock' : 'https://schema.org/SoldOut',
          },
          description: r.highlights.join('. '),
        })),
      ],
    });
  }
}
