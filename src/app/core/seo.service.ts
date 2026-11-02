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
    '@type': ['ProfessionalService', 'LocalBusiness'],
    '@id': `${SITE.url}/#negocio`,
    name: `${SITE.name} · ${SITE.therapist}`,
    alternateName: ['EspacioVital', 'Nathalie Vera Psicóloga', 'Psychologist Nathalie Vera'],
    url: SITE.url,
    image: SITE.url + IMG.hero,
    logo: `${SITE.url}/brand/icono-app-512.png`,
    description,
    email: SITE.email,
    telephone: SITE.whatsapp,
    priceRange: '$$',
    address: { '@type': 'PostalAddress', addressLocality: SITE.city, addressRegion: SITE.region, addressCountry: 'PA' },
    areaServed: [
      { '@type': 'City', name: SITE.city },
      { '@type': 'AdministrativeArea', name: SITE.region },
      { '@type': 'Country', name: SITE.country },
    ],
    openingHours: 'Mo-Sa 08:00-18:00',
    knowsAbout: ['Psicología general', 'Terapia individual', 'Terapia de pareja', 'Terapia en línea', 'Bienestar emocional', 'Psychology', 'Online therapy', 'Couples therapy'],
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Servicios de psicología',
      itemListElement: [
        'Terapia psicológica individual (presencial en La Chorrera)',
        'Terapia psicológica de pareja',
        'Terapia psicológica en línea para todo Panamá',
        'Retiro Metamorfosis para mujeres',
        'Talleres socioemocionales para niños (Vital Kids)',
      ].map((name) => ({ '@type': 'Offer', itemOffered: { '@type': 'Service', name } })),
    },
    founder: { '@type': 'Person', name: 'Nathalie Vera', jobTitle: 'Psicóloga general' },
    sameAs: [SITE.instagram],
  };
}
