import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FAQS, IMG, RETREATS } from '../../core/content';
import { SeoService } from '../../core/seo.service';
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
    <app-retreat />
    <app-kids />
    <app-gallery />
    <app-testimonials />
    <app-events />
    <app-faq />
    <app-contact />
    <app-final-cta />
  `,
})
export class Home {
  constructor() {
    inject(SeoService).set({
      title: `${SITE.therapist} · Psicóloga clínica en Panamá | ${SITE.name}`,
      description: SITE.description,
      path: '/',
      jsonLd: [
        {
          '@context': 'https://schema.org',
          '@type': 'ProfessionalService',
          name: SITE.name,
          url: SITE.url,
          image: SITE.url + IMG.hero,
          logo: `${SITE.url}/brand/icono-app-512.png`,
          description: SITE.description,
          email: SITE.email,
          areaServed: SITE.country,
          address: { '@type': 'PostalAddress', addressCountry: 'PA' },
          founder: { '@type': 'Person', name: 'Nathalie Vera', jobTitle: 'Psicóloga clínica' },
          sameAs: [SITE.instagram],
        },
        {
          '@context': 'https://schema.org',
          '@type': 'FAQPage',
          mainEntity: FAQS.map((f) => ({ '@type': 'Question', name: f.question, acceptedAnswer: { '@type': 'Answer', text: f.answer } })),
        },
        ...RETREATS.map((r) => ({
          '@context': 'https://schema.org',
          '@type': 'Event',
          name: `Retiro Metamorfosis · ${r.name}`,
          startDate: r.startDate,
          endDate: r.endDate,
          eventAttendanceMode: 'https://schema.org/OfflineEventAttendanceMode',
          eventStatus: 'https://schema.org/EventScheduled',
          location: { '@type': 'Place', name: r.place, address: { '@type': 'PostalAddress', addressCountry: 'PA' } },
          organizer: { '@type': 'Organization', name: SITE.name, url: SITE.url },
          description: r.highlights.join('. '),
        })),
      ],
    });
  }
}
