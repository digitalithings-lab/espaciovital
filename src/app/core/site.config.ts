// Datos de contacto y del sitio. Cambia aquí y se actualiza en toda la página.
export const SITE = {
  name: 'EspacioVital',
  therapist: 'Psic. Nathalie Vera',
  therapistShort: 'Nathalie',
  role: 'Psicóloga Clínica & Guía Vivencial',
  /** Dominio final, sin barra al final (para SEO: canonical, sitemap y Open Graph). */
  url: 'https://espaciovital.com',
  description:
    'Psicología clínica, terapia somática y Retiro Metamorfosis para mujeres en Panamá. Talleres socioemocionales para niños con la Psic. Nathalie Vera.',
  /** Número con código de país y sin «+» ni espacios, p. ej. 50760000000. Vacío = WhatsApp pide elegir chat. */
  whatsapp: '',
  email: 'contacto@espaciovital.com',
  instagram: 'https://www.instagram.com/',
  country: 'Panamá',
  hours: 'Lunes a sábado · 8:00 a. m. – 6:00 p. m.',
  /** URL de tu backend (sin barra final). Vacío = el formulario solo abre WhatsApp. */
  apiUrl: '',
};

/** Enlace de WhatsApp con un mensaje ya escrito. */
export function whatsappLink(message: string): string {
  return `https://wa.me/${SITE.whatsapp}?text=${encodeURIComponent(message)}`;
}
