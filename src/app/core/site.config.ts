// Datos de contacto y del sitio. Cambia aquí y se actualiza en toda la página.
export const SITE = {
  name: 'EspacioVital',
  therapist: 'Psic. Nathalie Vera',
  therapistShort: 'Nathalie',
  role: 'Psicóloga General & Guía Vivencial',
  /** Dominio final, sin barra al final (para SEO: canonical, sitemap y Open Graph). */
  url: 'https://espaciovitalpsic.site',
  description:
    'Psicóloga en La Chorrera, Panamá Oeste: terapia individual y de pareja, presencial y en línea, con la Psic. Nathalie Vera. Retiro Metamorfosis para mujeres y talleres para niños.',
  /** Número con código de país y sin «+» ni espacios, p. ej. 50760000000. Vacío = WhatsApp pide elegir chat. */
  whatsapp: '+50765807290',
  email: 'contacto@espaciovitalpsic.site',
  instagram: 'https://www.instagram.com/espaciovitalpsic?srtk=cHQxMnhwNWp4bW10',
  country: 'Panamá',
  city: 'La Chorrera',
  region: 'Panamá Oeste',
  hours: 'Lunes a sábado · 8:00 a. m. – 6:00 p. m.',
  /** URL de tu backend (sin barra final). Vacío = el formulario solo abre WhatsApp. */
  apiUrl: '',
  /**
   * Agenda de citas: se consulta en el backend de Florece, solo el horario de esta psicóloga.
   * slug = el «Enlace de tu agenda» que Nathalie activa en su panel (Mi perfil → Agenda en tu sitio web).
   */
  booking: {
    apiUrl: 'https://florece-digitali3.vercel.app',
    slug: 'nathalie-vera',
  },
};

/** Enlace de WhatsApp con un mensaje ya escrito. */
export function whatsappLink(message: string): string {
  return `https://wa.me/${SITE.whatsapp}?text=${encodeURIComponent(message)}`;
}
