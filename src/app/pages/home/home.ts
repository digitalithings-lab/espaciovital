import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FAQS } from '../../core/content';
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
import { ServiceLinks } from '../../shared/service-links';
import { Testimonials } from './testimonials';

@Component({
  selector: 'app-home',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [Hero, About, ServiceLinks, Retreat, Kids, Gallery, Testimonials, Events, FaqSection, Contact, FinalCta],
  template: `
    <app-hero />
    <app-about />
    <app-service-links title="Elige cómo quieres empezar" subtitle="Atención presencial en La Chorrera y virtual para todo Panamá." layerClass="z-[15]" />
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
      ],
    });
  }
}
