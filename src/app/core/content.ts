import { Faq, GalleryPhoto, KidsProgram, RetreatEdition, Testimonial } from './models';

// Contenido de la página. Hoy vive aquí; cuando tengas el backend, ContentService puede pedirlo a tu API
// (mismas formas de datos, ver models.ts) sin cambiar los componentes.

/** Fotos de la referencia. Reemplázalas por las tuyas (idealmente en public/img, en WebP). */
export const IMG = {
  // Foto de estudio de Nathalie (public/img, WebP en 934 y 560 px).
  hero: '/img/nathalie-vera-934.webp',
  about: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCvhOHYSKO0TvUglYg7OEEcr6EdGP19nIOZfUOYYyImgvv2VPsxqhuWT4hEXGwZlPldEyib9vugrL9fuSfc1fWUz6aT_tBHmA4bYTXSQfQJ3zikuUAfy_rq17YEJ8BU7aHQ1KIjzlycXcPcdTFotqcJ-g0pu_oBbAFkhrU7vd3rZLW3CWNnO_gZy-2Wefog0oRaaJPx3-QVsVR9FIf-7r6_WjF5CGbIjZAhutkiJZqNYAqV5GKPI6ZT4g',
  retreat: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCVVTlLSr9VBa77y61PoiUGHdiO36ILoINGLUf3aL2yBYDfJcs4CjtrJnrbw_g0Pk6Vohx1Exxogbc0QOX0jHJkqWWw-Rj-IUMtl5Tl74qhsOLaSMLlJVpj_CJra90z-erqVtMtMTgmyk_hTJZPyndIdQdxe1P5eaWIYLntqvcnz7gxvjScwnApsdh-6ffm2YllepSst0YYFjrncF4Myff5u_2hTJn1WdwxyGj7HuVO5_pthajnU3gpMQ',
  kidsBreath: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBwUw2_afarzvYgwyi0-l-deLSmw-DS_Vca6kSHn-VW8SiMYwhaHaGTY7Z1hk6Dtk3IrRrnI5WhgRozBYIa3p4BHDZzvE6BGAmJc5AZq25IDja8OXCv79eDivUleeVXfGciPQyVFaq8igvld1pDPD_CJn4uiUjZJumJdExMF6WuC15-pL7xPQPFFE7RXUCNZUjwHLzEZTmKvN2ygFgY4y1rqxDZI-Htui7KFbEkpHU2TU0UmAfD_Si7dA',
  kidsTangram: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBF3XP1wtQGJozuzzuDGQVSExhKRgxpyAra726-hxw3UdbmsAWyNG9jXhvWyLllB2Toswb9JIQWP-zuyBNgKbr1K0FM2Oi-YJ6jFiJRYVye1ltXEClnsLKB3hBKKhG4wwUWsMPB3Y4x8hDocGup95KTeoj-Bi0uClNdQ3_E6X5ugEXt5PSYE_tB6jT2mj9J_aFDDj6bU8cJ3Es1AXkW_-DX4g4Wzm89gHNbO4-a3w9IZtsMsV0ZqzfJjQ',
  kidsMandala: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBgsx1qq7VnEciPCNgP6fmZxU_ph2RE8Bfuc3fZql6GqgmYN6Jm5-anN_Tss7ABzZhJuLCZLLFWWYvkN27hl8hFF-HqYQCWon8VaUPrbWYH4jbVHU-mKR66Muy7a-xd0hBdkECWvssF2A_flBWESe-JSopUK8TPjz8q-2DonW7CoZn0nE13jtFHHw26OHk5Mxkql-dQ6nOOE42a1Aerdt_0WJmT2-nlqI3abUOaK_1z1VN0twjfclJjwA',
  kidsLego: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC9z8S2-NaGWjiyZGDbjzFtJCegTanrV8G7HsnM5Gu-MJs_w-xswQsGSNRUu8eAd7rdo9y6p9GNILGuJtWAOS8hzwvgQ5XdSIxE5-kdhNKhUAwQ0aIPgBtTN1xsyH-Q_8CfYZO8MxyZ2yrcRyygwdXbDMiLKnTPA9_X8m-Htdh-j77W6VtkCbCbCKPt5tL3l67dxjFdFNLuUvnZzjCtEDOq364QDvJAl0-8mxgc-lLBryDBvEx0X6IPdw',
  kidsSensory: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA9ZdPbQCrTpiI1T6OpKYaILero4Et_w3u5feTLEN5lwKjkhjZOvRexGc6PeXrl0rOYX3Tgd8loBWai6ZbGv3kuUkq3QVon7ftdGysiIFi5-z_hjunMUwTlNwXWIYkQa72Hmcx9rsvy-x3I7NMyVOXQD1s-Os_czc46QgombnQLCx1Z2gzypoj9hjpMZ3Es9BVO8zQXdZHnsdM5u5tTr7ucrwWLRWgZzrN6czwUiw6VXjxsK2ncPnx3rw',
  kidsOrigami: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDjLVBSQHO8VWQVHNi4QkOGYaNOgltdRDJgGfMxO9tPrD2PwR91IKniJMwTFtFPQ91ZM5VKCW2koO5d1fUkXPJCopoPRBpKsEl5X6bTiOjoF_SUgJNXvs1En39LOMglTaJsdKzRg5Z72A9uCgEQy5pb5sS7mwocUKR8fvtt_KV97H2HaFW_VGE_YuPw0xzBZgkd18cQCrDBsguHL1ximb79i1ph_1LLed4IQvyt1ONqWsRG43BIFKTMag',
  galleryWater: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA8RrboigRNrrKmHov62cVTGwI0LorbkcXjr_Zz-a3nvcT5CnIwUgJvXrs5c8PysSWDthUgOywl3l1QZRYH3l6jwCNZgKbeR_n6BpraBOuzUC6YXcL-a5-9kR94R6Yo-N9jBQv_jYtrvpaxAKae-mheEAjaR3qG_DylTYheCrGKb5FIKEmJ_sVOwhkzhLDhbCnRPTQlO1cXzM8O_2IFNl-xVQCNxRyeKBnIrsCaCQP5ltsfH8syc0tTAg',
  galleryCircle: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAWVXW4UOyD_9aDq7V0UuiNQgdo8Elw0_7ulDpfE2gLTlnMQ1Pvx9oSS2HumrCO-vatIm66LT334PpmpHSwEU7d9OnKul6xq0UA2P2kV9JeTnXMz0etuqX2qWMSZqvQlkNnUI9lHQYxIXlbOwx8ToF8Z1q3A_sx9Amn5ISxZQ160H3706kx1O5Hkn4uvMQYCD4jA7yOX2HCAm6V7dV0SVmE401rDVxB3soGJ_lnCzwG-PxSxs8tc5alqQ',
  galleryJoy: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCvhOHYSKO0TvUglYg7OEEcr6EdGP19nIOZfUOYYyImgvv2VPsxqhuWT4hEXGwZlPldEyib9vugrL9fuSfc1fWUz6aT_tBHmA4bYTXSQfQJ3zikuUAfy_rq17YEJ8BU7aHQ1KIjzlycXcPcdTFotqcJ-g0pu_oBbAFkhrU7vd3rZLW3CWNnO_gZy-2Wefog0oRaaJPx3-QVsVR9FIf-7r6_WjF5CGbIjZAhutkiJZqNYAqV5GKPI6ZT4g',
  galleryBeach: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCVVTlLSr9VBa77y61PoiUGHdiO36ILoINGLUf3aL2yBYDfJcs4CjtrJnrbw_g0Pk6Vohx1Exxogbc0QOX0jHJkqWWw-Rj-IUMtl5Tl74qhsOLaSMLlJVpj_CJra90z-erqVtMtMTgmyk_hTJZPyndIdQdxe1P5eaWIYLntqvcnz7gxvjScwnApsdh-6ffm2YllepSst0YYFjrncF4Myff5u_2hTJn1WdwxyGj7HuVO5_pthajnU3gpMQ',
};

export const RETREATS: RetreatEdition[] = [
  {
    id: 'san-carlos',
    name: 'Edición San Carlos',
    setting: 'Mar & litoral costero',
    place: 'Playa · San Carlos',
    icon: 'waves',
    startDate: '2026-11-13',
    endDate: '2026-11-15',
    spotsLeft: 4,
    tone: 'clay',
    highlights: [
      'Ritual de agua y soltado de cargas en el mar',
      'Hospedaje boutique y alimentación consciente',
      'Sesiones clínicas grupales frente al atardecer',
    ],
  },
  {
    id: 'montana-serena',
    name: 'Edición Montaña Serena',
    setting: 'Bosque nuboso & montaña',
    place: 'Valle de Antón',
    icon: 'mountain',
    startDate: '2026-12-11',
    endDate: '2026-12-13',
    spotsLeft: 3,
    featured: true,
    tone: 'leaf',
    highlights: [
      'Clima fresco de montaña para calmar el sistema nervioso',
      'Círculos de palabra junto al fuego y ritual de cierre de año',
      'Kit de trabajo clínico vivencial impreso y personalizado',
    ],
  },
  {
    id: 'nuevo-renacer',
    name: 'Edición Nuevo Renacer',
    setting: 'Archipiélago & santuario',
    place: 'Archipiélago de las Perlas',
    icon: 'sailboat',
    startDate: '2027-01-22',
    endDate: '2027-01-24',
    spotsLeft: 6,
    tone: 'lilac',
    highlights: [
      'Inmersión en aguas cristalinas y arenas blancas',
      'Apertura del nuevo ciclo con claridad, propósito y límites',
      'Traslado marítimo incluido y guía terapéutica 24/7',
    ],
  },
];

export const KIDS: KidsProgram[] = [
  {
    title: 'La respiración de la abeja',
    tag: 'Respiración consciente',
    icon: 'wind',
    tone: 'leaf',
    image: IMG.kidsBreath,
    alt: 'Niño practicando una técnica de respiración consciente',
    text: 'Técnicas de respiración adaptadas para niños que ayudan a regular la ansiedad y volver al momento presente.',
    skill: 'Calma y atención plena',
  },
  {
    title: 'Tangram y figuras geométricas',
    tag: 'Razonamiento lógico',
    icon: 'shapes',
    tone: 'clay',
    image: IMG.kidsTangram,
    alt: 'Niño armando un tangram con figuras geométricas',
    text: 'Estimula las funciones ejecutivas, la tolerancia a la frustración y la orientación espacial resolviendo retos con las manos.',
    skill: 'Flexibilidad cognitiva',
  },
  {
    title: 'Mandalas y paciencia',
    tag: 'Concentración plena',
    icon: 'target',
    tone: 'honey',
    image: IMG.kidsMandala,
    alt: 'Niña completando un mandala con bloques de madera',
    text: 'Foco sostenido y relajación activa encajando piezas de madera de colores en patrones simétricos.',
    skill: 'Atención y sosiego',
  },
  {
    title: 'Construcción con bloques',
    tag: 'Motricidad fina',
    icon: 'blocks',
    tone: 'lilac',
    image: IMG.kidsLego,
    alt: 'Construcción tridimensional con piezas de bloques',
    text: 'Precisión óculo-manual, planeación paso a paso y una forma constructiva de canalizar las emociones.',
    skill: 'Pensamiento espacial',
  },
  {
    title: 'Laboratorio sensorial',
    tag: 'Estimulación sensorial',
    icon: 'hand',
    tone: 'leaf',
    image: IMG.kidsSensory,
    alt: 'Niño clasificando piezas por textura y color',
    text: 'Clasificar texturas, tamaños y colores fortalece la toma de decisiones y el orden mental.',
    skill: 'Discriminación táctil',
  },
  {
    title: 'Origami y socialización',
    tag: 'Taller grupal',
    icon: 'users',
    tone: 'clay',
    image: IMG.kidsOrigami,
    alt: 'Taller grupal infantil de origami y dibujo',
    text: 'Encuentros en grupo para practicar empatía, trabajo en equipo y expresión artística, sin competir.',
    skill: 'Habilidades sociales',
  },
];

export const GALLERY: GalleryPhoto[] = [
  {
    image: IMG.galleryWater,
    alt: 'Baño grupal en el mar durante el Retiro Metamorfosis',
    tag: 'Aguas claras · Inmersión',
    title: 'Ritual del agua: soltar el peso que no te corresponde',
    text: 'Conexión profunda con la naturaleza para liberar cargas acumuladas.',
  },
  {
    image: IMG.galleryCircle,
    alt: 'Grupo de mujeres conversando con la psicóloga en el retiro',
    tag: 'Complicidad',
    title: 'Círculo de confianza',
    text: 'Donde tu historia es respetada y celebrada.',
  },
  {
    image: IMG.galleryJoy,
    alt: 'Participantes celebrando juntas en el retiro',
    tag: 'Celebración',
    title: 'Hermandad que perdura',
    text: 'Vínculos que continúan después del retiro.',
  },
  {
    image: IMG.galleryBeach,
    alt: 'Mujeres sonriendo en la playa',
    tag: 'Playa Bonita',
    title: 'La libertad de volver a ser tú',
    text: 'Sin poses ni juicios: plenitud, risa y renovación.',
  },
];

export const TESTIMONIALS: Testimonial[] = [
  {
    name: 'María Elena R.',
    detail: '38 años · Emprendedora',
    tone: 'clay',
    quote:
      'Llegué al retiro exhausta de cuidar a todos menos a mí. Nathalie creó un entorno tan amoroso y clínicamente guiado que por primera vez en años lloré sin culpa y me sentí comprendida.',
  },
  {
    name: 'Karla S.',
    detail: '32 años · Arquitecta',
    tone: 'leaf',
    quote:
      'Tenía miedo de no encajar o de sentirme juzgada. Fue todo lo contrario: sentí que me quitaba un caparazón de años. Regresé a casa con límites claros y el corazón liviano.',
  },
  {
    name: 'Ana Sofía C.',
    detail: '45 años · Docente',
    tone: 'lilac',
    quote:
      'La combinación del conocimiento psicológico de Nathalie y la calidez del grupo fue la medicina que necesitaba. Metamorfosis marcó un antes y un después en cómo me relaciono conmigo misma.',
  },
];

export const FAQS: Faq[] = [
  {
    question: '¿Las sesiones son presenciales o en línea?',
    answer:
      'Ambas. Puedes elegir sesiones presenciales en Panamá o videollamadas desde cualquier país. La calidad del acompañamiento es la misma.',
  },
  {
    question: '¿Qué pasa en una primera consulta?',
    answer:
      'Conversamos sobre lo que te trae, tus objetivos y tu historia. Al final te propongo un plan de trabajo; tú decides si continuar, sin compromiso.',
  },
  {
    question: '¿Necesito estar en terapia para ir al Retiro Metamorfosis?',
    answer:
      'No. Antes de confirmar tu cupo hacemos una breve evaluación de idoneidad para asegurarnos de que el retiro sea seguro y útil para tu momento actual.',
  },
  {
    question: '¿Hay facilidades de pago para los retiros?',
    answer: 'Sí. Puedes reservar con un abono y pagar el resto en cuotas antes de la fecha del retiro.',
  },
  {
    question: '¿Desde qué edad atienden niños?',
    answer:
      'Trabajamos con niños desde los 5 años y preadolescentes, en sesiones individuales y en grupos pequeños de estimulación socioemocional.',
  },
  {
    question: '¿Lo que hablo en sesión es confidencial?',
    answer:
      'Siempre. Todo lo que compartes está protegido por el secreto profesional y el código de ética de la psicología clínica.',
  },
];
