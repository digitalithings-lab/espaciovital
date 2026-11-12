import { DOCUMENT } from '@angular/common';
import { inject, Injectable } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { IMG } from './content';
import { SITE } from './site.config';

interface PageSeo {
  title: string;
  description: string;
  path: string;
  /** Datos estructurados (JSON-LD) propios de la página. */
  jsonLd?: object[];
  noindex?: boolean;
  /** Idioma de la página (por defecto español). */
  lang?: 'es' | 'en';
  /** Versiones de la misma página en cada idioma (hreflang), p. ej. { es: '/', en: '/en' }. */
  alternates?: { es: string; en: string };
}

// Título, descripción, Open Graph, URL canónica y JSON-LD de cada página.
// Corre también al pre-renderizar, así que los buscadores lo reciben en el HTML.
@Injectable({ providedIn: 'root' })
export class SeoService {
  private readonly title = inject(Title);
  private readonly meta = inject(Meta);
  private readonly document = inject(DOCUMENT);

  set(page: PageSeo) {
    const url = SITE.url + page.path;
    const image = `${SITE.url}/brand/redes-compartir-1200x630.png`;

    const lang = page.lang ?? 'es';
    this.document.documentElement.lang = lang;
    this.title.setTitle(page.title);
    this.meta.updateTag({ name: 'description', content: page.description });
    this.meta.updateTag({
      name: 'keywords',
      content:
        'psicologa chorrera, psicologo la chorrera, psicologa panama oeste, atencion de pareja chorrera, psicologa general panama, psicologa en linea panama, actividades metamorfosis, psicologa nathalie vera, espaciovital',
    });
    this.meta.updateTag({ name: 'robots', content: page.noindex ? 'noindex, follow' : 'index, follow, max-image-preview:large' });

    this.meta.updateTag({ property: 'og:type', content: 'website' });
    this.meta.updateTag({ property: 'og:locale', content: lang === 'en' ? 'en_US' : 'es_PA' });
    this.meta.updateTag({ property: 'og:locale:alternate', content: lang === 'en' ? 'es_PA' : 'en_US' });
    this.meta.updateTag({ property: 'og:image', content: image });
    this.meta.updateTag({ property: 'og:site_name', content: SITE.name });
    this.meta.updateTag({ property: 'og:title', content: page.title });
    this.meta.updateTag({ property: 'og:description', content: page.description });
    this.meta.updateTag({ property: 'og:url', content: url });
    // Add image dimensions for better preview rendering
    this.meta.updateTag({ property: 'og:image:width',  content: '1200' });
    this.meta.updateTag({ property: 'og:image:height', content: '630' });
    this.meta.updateTag({ name: 'twitter:image:width',  content: '1200' });
    this.meta.updateTag({ name: 'twitter:image:height', content: '630' });
    this.meta.updateTag({ property: 'og:image:alt', content: `${SITE.name} · ${SITE.therapist}` });
    this.meta.updateTag({ name: 'twitter:card', content: 'summary_large_image' });
    this.meta.updateTag({ name: 'twitter:title', content: page.title });
    this.meta.updateTag({ name: 'twitter:description', content: page.description });
    this.meta.updateTag({ name: 'twitter:image', content: image });

    this.setCanonical(url);
    this.setAlternates(page.alternates);
    this.setJsonLd(page.jsonLd ?? []);
  }

  /** Datos de eventos para Google, con las fechas que llegan de la base de datos. Solo eventos con lugar definido. */
  setEvents(events: { name: string; startDate: string; endDate: string; place: string; price?: number; spotsLeft: number; highlights: string[] }[]) {
    this.document.head.querySelectorAll('script[data-seo="events"]').forEach((el) => el.remove());
    for (const r of events.filter((e) => e.place && e.place !== 'Lugar por confirmar')) {
      const script = this.document.createElement('script');
      script.type = 'application/ld+json';
      script.setAttribute('data-seo', 'events');
      script.textContent = JSON.stringify({
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
        ...(r.price !== undefined
          ? {
              offers: {
                '@type': 'Offer',
                url: `${SITE.url}/#retiro`,
                price: String(r.price),
                priceCurrency: 'USD',
                availability: r.spotsLeft > 0 ? 'https://schema.org/InStock' : 'https://schema.org/SoldOut',
              },
            }
          : {}),
        description: r.highlights.join('. '),
      });
      this.document.head.appendChild(script);
    }
  }

  private setCanonical(url: string) {
    let link = this.document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (!link) {
      link = this.document.createElement('link');
      link.rel = 'canonical';
      this.document.head.appendChild(link);
    }
    link.href = url;
  }

  private setAlternates(alternates?: { es: string; en: string }) {
    this.document.head.querySelectorAll('link[rel="alternate"][hreflang]').forEach((el) => el.remove());
    if (!alternates) return;
    for (const [hreflang, path] of [['es', alternates.es], ['en', alternates.en], ['x-default', alternates.es]]) {
      const link = this.document.createElement('link');
      link.rel = 'alternate';
      link.hreflang = hreflang;
      link.href = SITE.url + path;
      this.document.head.appendChild(link);
    }
  }

  private setJsonLd(items: object[]) {
    this.document.head.querySelectorAll('script[data-seo="page"]').forEach((el) => el.remove());
    for (const item of items) {
      const script = this.document.createElement('script');
      script.type = 'application/ld+json';
      script.setAttribute('data-seo', 'page');
      script.textContent = JSON.stringify(item);
      this.document.head.appendChild(script);
    }
  }
}

/** Ficha de negocio local para Google: presencial en La Chorrera y en línea en todo Panamá. */
export function businessJsonLd(description: string): object {
  return {
    '@context': 'https://schema.org',
    '@type': ['Psychologist', 'MedicalBusiness', 'LocalBusiness', 'ProfessionalService'],
    '@id': `${SITE.url}/#negocio`,
    name: `${SITE.name} · ${SITE.therapist}`,
    alternateName: ['EspacioVital', 'Psic. Nathalie Vera', 'Nathalie Vera Psicóloga', 'Psicóloga en La Chorrera'],
    url: SITE.url,
    image: [SITE.url + IMG.hero, `${SITE.url}/brand/redes-compartir-1200x630.png`],
    logo: `${SITE.url}/brand/icono-app-512.png`,
    description,
    email: SITE.email,
    telephone: SITE.whatsapp,
    priceRange: '$$',
    currenciesAccepted: 'USD, PAB',
    paymentAccepted: 'Efectivo, Yappy, Transferencia bancaria',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'La Chorrera Centro',
      addressLocality: SITE.city,
      addressRegion: SITE.region,
      postalCode: '1001',
      addressCountry: 'PA',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 8.8803,
      longitude: -79.7833,
    },
    hasMap: 'https://maps.google.com/?q=La+Chorrera+Panama+Oeste',
    areaServed: [
      { '@type': 'City', name: 'La Chorrera' },
      { '@type': 'AdministrativeArea', name: 'Panamá Oeste' },
      { '@type': 'AdministrativeArea', name: 'Arraiján' },
      { '@type': 'City', name: 'Ciudad de Panamá' },
      { '@type': 'Country', name: 'Panamá' },
    ],
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
        opens: '10:00',
        closes: '22:00',
      },
    ],
    medicalSpecialty: ['Psychology'],
    knowsAbout: [
      'Psicología general',
      'Terapia psicológica en La Chorrera',
      'Atención individual',
      'Atención de pareja',
      'Terapia en línea Panamá',
      'Terapia somática',
      'Regulación emocional',
      'Ansiedad y estrés',
      'Autoestima y límites saludables',
    ],
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Servicios de psicología y bienestar',
      itemListElement: [
        'Atención psicológica individual en La Chorrera (presencial)',
        'Atención psicológica de pareja en La Chorrera y Panamá Oeste',
        'Terapia psicológica en línea para todo Panamá e internacional',
        'Actividades Metamorfosis vivenciales para mujeres en Panamá',
        'Talleres socioemocionales para niños (Vital Kids)',
      ].map((name) => ({ '@type': 'Offer', itemOffered: { '@type': 'Service', name } })),
    },
    founder: {
      '@type': 'Person',
      name: 'Nathalie Vera',
      jobTitle: 'Psicóloga General & Guía Vivencial',
      knowsAbout: ['Psicología general', 'Atención individual y de pareja', 'Terapia somática'],
    },
    sameAs: [SITE.instagram],
  };
}
