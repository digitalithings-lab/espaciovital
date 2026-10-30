// Tipos del contenido. Cuando tengas el backend, tus endpoints pueden devolver estas mismas formas.

export type Tone = 'leaf' | 'clay' | 'lilac' | 'honey';

export interface RetreatEdition {
  id: string;
  name: string;
  setting: string;
  place: string;
  icon: string;
  /** Fechas en formato AAAA-MM-DD. */
  startDate: string;
  endDate: string;
  spotsLeft: number;
  featured?: boolean;
  tone: Tone;
  highlights: string[];
}

export interface KidsProgram {
  title: string;
  tag: string;
  icon: string;
  tone: Tone;
  image: string;
  alt: string;
  text: string;
  skill: string;
}

export interface GalleryPhoto {
  image: string;
  alt: string;
  tag: string;
  title: string;
  text: string;
  /** Parte de la foto que se conserva al recortarla (CSS object-position), p. ej. '50% 80%'. */
  focus?: string;
}

export interface Testimonial {
  name: string;
  detail: string;
  quote: string;
  tone: Tone;
}

export interface Faq {
  question: string;
  answer: string;
}

export interface ContactRequest {
  name: string;
  email: string;
  phone: string;
  interest: 'terapia' | 'retiro' | 'kids' | 'otro';
  message: string;
  consent: boolean;
}
