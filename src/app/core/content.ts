import { Faq, GalleryPhoto, KidsProgram, RetreatEdition, Testimonial } from './models';

// Contenido de la página. Hoy vive aquí; cuando tengas el backend, ContentService puede pedirlo a tu API
// (mismas formas de datos, ver models.ts) sin cambiar los componentes.

/** Fotos de la página, en public/img como WebP. Las de muestra (public/img/fotos) son temporales: cámbialas por fotos propias. */
// Cada foto de public/img/fotos existe en su ancho completo (en el nombre: «-1200») y en 640 px para celulares.
export function srcset(src: string) {
  const width = Number(/-(\d+)\.webp$/.exec(src)?.[1]);
  if (!width || width <= 640) return null;
  return `${src.replace(/-\d+\.webp$/, '-640.webp')} 640w, ${src} ${width}w`;
}

export const IMG = {
  // Foto de estudio de Nathalie (public/img, WebP en 934 y 560 px).
  hero: '/img/nathalie-vera-934.webp',
  // Foto de estudio de Nathalie de cuerpo completo (ampliada al doble desde 467 px; cambiar por la original cuando esté).
  about: '/img/nathalie-vera-cuerpo-934.webp',
  retreat: '/img/fotos/retiro-manglar-1200.webp',
  kidsBreath: '/img/fotos/kids-respiracion-720.webp',
  kidsTangram: '/img/fotos/kids-tangram-960.webp',
  kidsMandala: '/img/fotos/kids-mandala-960.webp',
  kidsLego: '/img/fotos/kids-lego-720.webp',
  kidsSensory: '/img/fotos/kids-sensorial-960.webp',
  kidsOrigami: '/img/fotos/kids-origami-960.webp',
  galleryJoy: '/img/fotos/risas-1200.webp',
  galleryHug: '/img/fotos/retiro-abrazo-1200.webp',
  galleryViewpoint: '/img/fotos/retiro-mirador-1200.webp',
  galleryBeach: '/img/fotos/recurso.webp',
  galleryDance: '/img/fotos/recurso1.webp',
  galleryBoat: '/img/fotos/retiro-nathalie-bote-960.webp',
  galleryNathalie: '/img/fotos/recurso3.webp',
};

export const RETREATS: RetreatEdition[] = [
  {
    id: 'san-blas-2027',
    name: 'Pasadía San Blas · Guna Yala',
    setting: 'Archipiélago & Playas Vírgenes',
    place: 'Guna Yala · San Blas',
    icon: 'sailboat',
    startDate: '2027-01-03',
    endDate: '2027-01-03',
    spotsLeft: 25,
    price: 140,
    deposit: 20,
    tone: 'clay',
    highlights: [
      'Transporte terrestre y en lancha ida y vuelta (Pma Oeste y Albrook)',
      'Tour a Isla Perro, Isla Diablo y Piscina Natural de estrellas',
      'Almuerzo incluido (pollo o pescado) e impuestos comarcales',
    ],
  },
  {
    id: 'isla-grande-2027',
    name: 'Tour Isla Grande',
    setting: 'Caribe & Costa Arriba',
    place: 'Isla Grande · Colón',
    icon: 'waves',
    startDate: '2027-01-17',
    endDate: '2027-01-17',
    spotsLeft: 20,
    price: 65,
    deposit: 10,
    tone: 'leaf',
    highlights: [
      'Transporte terrestre y marítimo ida y vuelta con seguro',
      'Uso de instalaciones del hotel (playa privada, jardines, duchas)',
      'Almuerzo caribeño con bebida + tour panorámico y piscina natural',
    ],
  },
  {
    id: 'venas-azules-2027',
    name: 'Venas Azules + Playa Blanca',
    setting: 'Manglar & Aguas Cristalinas',
    place: 'Portobelo · Colón',
    icon: 'sparkles',
    startDate: '2027-01-31',
    endDate: '2027-01-31',
    spotsLeft: 18,
    featured: true,
    price: 55,
    deposit: 10,
    tone: 'lilac',
    highlights: [
      'Visita histórica a las Ruinas de Portobelo e Iglesia',
      'Recorrido por Venas Azules en Isla del Padre',
      'Almuerzo caribeño, máscara de snorkel y kayak en Playa Blanca',
    ],
  },
  {
    id: 'isla-iguana-2027',
    name: 'Aventura Isla Iguana',
    setting: 'Refugio Silvestre & Pacífico',
    place: 'Pedasí · Los Santos',
    icon: 'compass',
    startDate: '2027-02-07',
    endDate: '2027-02-07',
    spotsLeft: 15,
    price: 80.5,
    deposit: 15,
    tone: 'honey',
    highlights: [
      'Pasadía en isla de roca volcánica y refugio silvestre',
      'Senderos interpretativos y snorkel en arrecifes de coral',
      'Parada cultural en la Plaza de Pedasí y almuerzo típico',
    ],
  },
  {
    id: 'golfo-chiriqui-2027',
    name: 'Expedición Golfo de Chiriquí',
    setting: 'Parque Marino & Islas del Pacífico',
    place: 'Boca Chica · Chiriquí',
    icon: 'mountain',
    startDate: '2027-02-21',
    endDate: '2027-02-21',
    spotsLeft: 16,
    price: 70.5,
    deposit: 15,
    tone: 'leaf',
    highlights: [
      'Tour acuático a Isla Bolaños, Isla Gámez e Isla Paridas',
      'Transporte nocturno para amanecer en el destino',
      'Almuerzo típico tradicional (tipo mono) incluido',
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
    image: IMG.galleryJoy,
    alt: 'Mujeres del retiro riendo a carcajadas bajo los palapas',
    tag: 'Alegría',
    title: 'Risas que sanan',
    text: 'Cuando el cuerpo ríe, el alma también respira.',
    focus: '50% 70%',
  },
  {
    image: IMG.galleryHug,
    alt: 'Dos participantes abrazadas dentro del mar durante el retiro',
    tag: 'Aguas claras · Inmersión',
    title: 'Ritual del agua: soltar el peso que no te corresponde',
    focus: '50% 80%',
    text: 'Conexión profunda con la naturaleza para liberar cargas acumuladas.',
  },
  {
    image: IMG.galleryViewpoint,
    alt: 'Grupo de mujeres sentadas en un mirador frente a las montañas',
    tag: 'Mirador',
    title: 'Círculo de confianza',
    focus: '50% 80%',
    text: 'Donde tu historia es respetada y celebrada.',
  },
  {
    image: IMG.galleryBeach,
    alt: 'Cuatro participantes posando en la playa con botellas de agua',
    tag: 'Playa · Isla',
    title: 'Juntas en la orilla',
    focus: '50% 40%',
    text: 'Cada momento compartido refuerza el lazo que nos une.',
  },
  {
    image: IMG.galleryDance,
    alt: 'Tres mujeres sonriendo en el jardín del retiro con palmeras al fondo',
    tag: 'Comunidad',
    title: 'Premios en Actividades',
    focus: '50% 40%',
    text: 'Amistades reales nacidas de la vulnerabilidad compartida.',
  },
  {
    image: IMG.galleryBoat,
    alt: 'La psicóloga Nathalie Vera sonriendo en el bote junto al grupo',
    tag: 'Con Nathalie',
    title: 'Rumbo a la isla, juntas',
    focus: '50% 75%',
    text: 'Cada edición empieza con el mismo viaje compartido.',
  },
];

export const TESTIMONIALS: Testimonial[] = [
  {
    name: 'María Elena R.',
    detail: '38 años · Emprendedora',
    tone: 'clay',
    quote:
      'Llegué al retiro exhausta de cuidar a todos menos a mí. Nathalie creó un entorno tan amoroso y profesionalmente guiado que por primera vez en años lloré sin culpa y me sentí comprendida.',
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
      'Ambas. Atiendo de forma presencial en La Chorrera (Panamá Oeste) y por videollamada desde cualquier lugar de Panamá. La calidad del acompañamiento es la misma.',
  },
  {
    question: '¿Qué pasa en una primera consulta?',
    answer:
      'Conversamos sobre lo que te trae, tus objetivos y tu historia. Al final te propongo un plan de trabajo; tú decides si continuar, sin compromiso.',
  },
  {
    question: '¿Necesito estar en terapia para ir al Retiro Metamorfosis?',
    answer:
      'No. Antes de confirmar tu cupo hacemos una breve evaluación de idoneidad para asegurarnos de que la Actividad sea segura y útil para tu momento actual.',
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
      'Siempre. Todo lo que compartes está protegido por el secreto profesional y el código de ética de la psicología.',
  },
];
