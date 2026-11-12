import { Activity, Faq, GalleryPhoto, KidsProgram, RetreatEdition, Testimonial } from './models';

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
  galleryDance: '/img/fotos/deporte.webp',
  galleryBoat: '/img/fotos/campamento.webp',
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

export const ACTIVITIES: Activity[] = [
  { id: 'picnic', name: 'Picnic para compartir', icon: 'basket', text: '¡Una tarde al aire libre sabe mejor en compañía! Trae tu merienda favorita para compartir y disfruta de juegos, conversaciones, risas y nuevas amistades. Un encuentro relajado para intercambiar experiencias, desconectarte de la rutina y pasar un momento agradable entre chicas.' },
  { id: 'granja', name: 'Un día de granja', icon: 'cow', text: '¡Prepárate para una aventura campestre! Conoce animales, participa en actividades de finca, disfruta de la naturaleza y vive experiencias diferentes junto a otras chicas. Según el lugar, podrás disfrutar de actividades como cosecha, juegos rurales o paseos a caballo.' },
  { id: 'piscina', name: 'Día de piscina', icon: 'pool', text: '¡Sol, agua, música y buena compañía! Disfruta de un día de piscina con juegos, fotografías, momentos de descanso y muchas oportunidades para conocer nuevas amigas. ¡Trae tu traje de baño y ganas de divertirte!' },
  { id: 'campamento', name: 'Campamento Metamorfosis', icon: 'tent', text: '¡Una aventura que no querrás perderte! Prepárate para competencias por equipos, juegos al aire libre, desafíos divertidos, fogata, historias nocturnas y una noche de campamento llena de risas y nuevas amistades.' },
  { id: 'paintball', name: 'Batalla de chicas — Paintball', icon: 'target', text: '¡Es hora de entrar en acción! Forma parte de un equipo, escóndete entre obstáculos, crea estrategias y participa en una emocionante batalla de paintball. Una experiencia de adrenalina, trabajo en equipo y mucha diversión, incluso si es tu primera vez.' },
  { id: 'baile-karaoke', name: 'Noche de chicas — Baile y karaoke', icon: 'microphone', text: '¡Una noche para cantar, bailar y pasarla increíble! Disfruta de buena música, karaoke, dinámicas divertidas y un ambiente ideal para conocer nuevas amigas. Ven con tu mejor actitud y prepárate para una noche llena de canciones y risas.' },
  { id: 'juegos-disfraces', name: 'Noche de juegos y disfraces', icon: 'mask', text: '¡Una noche donde la diversión y la creatividad se encuentran! Ponte tu disfraz favorito y participa en juegos de mesa, retos por equipos, competencias, adivinanzas y sorpresas. Una oportunidad para reír, jugar y conocer nuevas amigas.' },
  { id: 'navidad-cine', name: 'Navidad en pijamas — Edición cine', icon: 'film', text: '¡Celebremos la Navidad de una manera diferente! Ponte tu pijama navideña favorita y acompáñanos a disfrutar de una película, fotografías, dinámicas para conocernos y una salida llena de espíritu navideño. ¡Porque los mejores planes se disfrutan acompañadas!' },
  { id: 'bolos', name: 'Bolos entre amigas', icon: 'bowling', text: '¡Que comiencen los strikes y las risas! Disfruta de una partida de bolos junto a otras chicas, participa en desafíos amistosos y comparte una experiencia diferente. No importa si nunca has jugado, aquí lo importante es divertirse.' },
  { id: 'caminata', name: 'Caminata y conversa', icon: 'walk', text: '¡Caminar es mejor cuando tienes compañía! Únete a una caminata recreativa a ritmo tranquilo, donde podrás conversar, reír, disfrutar del aire libre y conocer nuevas amigas. No necesitas condición física especial ni preocuparte por quedarte atrás: ¡caminamos juntas!' },
  { id: 'patinaje', name: 'Patinaje entre amigas', icon: 'skate', text: '¡Ponte los patines y acompáñanos a rodar! Disfruta de una experiencia recreativa sobre ruedas, comparte risas, aprende a tu ritmo y conoce nuevas amigas. No importa si eres principiante, lo importante es atreverte a vivir algo diferente.' },
  { id: 'voleibol', name: 'Voleibol entre chicas', icon: 'volleyball', text: '¡Tu equipo te estará esperando! Ven a disfrutar de una jornada de voleibol donde no necesitas traer amigas ni formar tu propio equipo, ¡aquí te asignaremos uno! No importa si nunca has jugado, podrás aprender, reírte, compartir y conocer nuevas amistades. Más que competir, queremos divertirnos y pasarla increíble juntas.' },
  { id: 'futbol', name: 'Fútbol entre chicas', icon: 'soccer', text: '¡Aquí todas entramos a la cancha! Participa en partidos amistosos, forma parte de un equipo, anima a tus compañeras y disfruta de una jornada llena de risas, emoción y diversión. No necesitas experiencia ni venir acompañada, ¡tu equipo te estará esperando!' },
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
    title: 'Origami y socialización',
    tag: 'Taller grupal',
    icon: 'users',
    tone: 'clay',
    image: IMG.kidsOrigami,
    alt: 'Taller grupal infantil de origami y dibujo',
    text: 'Encuentros en grupo para practicar empatía, trabajo en equipo y expresión artística, sin competir.',
    skill: 'Habilidades sociales',
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
    title: 'Mandalas y paciencia',
    tag: 'Concentración plena',
    icon: 'target',
    tone: 'honey',
    image: IMG.kidsMandala,
    alt: 'Niña completando un mandala con bloques de madera',
    text: 'Foco sostenido y relajación activa encajando piezas de madera de colores en patrones simétricos.',
    skill: 'Atención y sosiego',
  },
];

export const GALLERY: GalleryPhoto[] = [
  {
    image: IMG.galleryJoy,
    alt: 'Mujeres del retiro riendo a carcajadas bajo las palapas',
    tag: 'Alegría',
    title: 'Risas que sanan',
    text: 'Cuando el cuerpo ríe, el alma también respira.',
    focus: '50% 70%',
  },
  {
    image: IMG.galleryHug,
    alt: 'Dos participantes abrazadas dentro del mar durante el retiro',
    tag: 'Mar Caribe · Relajación · Convivencia',
    title: 'Esparcimiento, risas y momentos inolvidables',
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
    title: 'Premiación a las ganadoras',
    focus: '50% 40%',
    text: 'Cada momento compartido refuerza el lazo que nos une.',
  },
  {
    image: IMG.galleryDance,
    alt: 'Tres mujeres sonriendo en el jardín del retiro con palmeras al fondo',
    tag: 'Juegos Deportes Diversion',
    title: 'Premios en actividades',
    focus: '50% 40%',
    text: 'Muévete, comparte y disfruta cada momento',
  },
  {
    image: IMG.galleryBoat,
    alt: 'La psicóloga Nathalie Vera sonriendo en el bote junto al grupo',
    tag: 'Campamento',
    title: 'Fogata y malvaviscos ',
    focus: '50% 75%',
    text: 'Cada edición empieza con el mismo viaje compartido.',
  },
];

export const TESTIMONIALS: Testimonial[] = [
  {
    name: 'Massiel Sanchez',
    detail: 'Reseña de Google · ★★★★★',
    tone: 'clay',
    quote:
      'Gracias a Nathalie Vera he podido aprender sobre la importancia de la escucha activa, de sentirme en un espacio seguro donde no hay juicio. Esta nueva experiencia me está ayudando a desarrollar poco a poco mayor autoconocimiento, paciencia conmigo misma y comprensión más profunda de cómo mis emociones influyen en mis decisiones, relaciones y bienestar en general.',
  },
  {
    name: 'Melanie Len',
    detail: 'Reseña de Google · ★★★★★',
    tone: 'lilac',
    quote:
      '10/10. Es cálida, amable, divertida y no te sientes juzgada mientras mantiene lo profesional. Al mismo tiempo es moderna, así que entiende diversos temas que antes se consideraban tabú o desconocidos.',
  },
  {
    name: 'Monica Vega',
    detail: 'Reseña de Google · ★★★★★',
    tone: 'leaf',
    quote:
      'Mi experiencia ha sido muy buena. Desde la primera sesión me hizo sentir cómoda y en confianza. Es una profesional muy amable. La recomiendo mucho.',
  },
  {
    name: 'Celia Vuelvas',
    detail: 'Reseña de Google · ★★★★★',
    tone: 'honey',
    quote:
      'Las sesiones con la licenciada son amenas, me siento en total confianza y he podido descubrir aspectos en mí que ni yo sabía y ha sido muy enriquecedor y de crecimiento personal. Le estoy muy agradecida por acompañarme en mi proceso.',
  },
  {
    name: 'Fabiana Vega',
    detail: 'Reseña de Google · ★★★★★',
    tone: 'clay',
    quote:
      'Con cada sesión he conseguido aumentar confianza y seguridad tanto conmigo misma como con la psicóloga, es un espacio bastante cómodo y con muy buena atención donde puedo ser yo misma.',
  },
  {
    name: 'Danna Barrios',
    detail: 'Reseña de Google · ★★★★★',
    tone: 'lilac',
    quote:
      'Es muy profesional con su trabajo, lo recomiendo full ya que con ella te sentirás segura. Lo importante que puedes ser tú sin tener que encajar!',
  },
];

export const METAMORFOSIS_TESTIMONIALS: Testimonial[] = [
  {
    name: 'Valeria M.',
    detail: '22 años · Participante de Metamorfosis',
    tone: 'clay',
    quote:
      'Antes me perdía muchos planes porque mis amigas no podían o no querían salir. Con Metamorfosis descubrí que no necesito llegar con alguien para pasarla increíble. Siempre encuentro chicas con quienes compartir, reírme y hacer nuevas amistades.',
  },
  {
    name: 'Andrea R.',
    detail: '34 años · Participante de Metamorfosis',
    tone: 'lilac',
    quote:
      'Entre el trabajo, la casa y las responsabilidades, casi nunca encontraba tiempo para mí. Estas actividades se han convertido en mi escape favorito de la rutina. Me divierto, me desestreso y regreso a casa con anécdotas y una sonrisa enorme.',
  },
  {
    name: 'Gabriela C.',
    detail: '41 años · Participante de Metamorfosis',
    tone: 'leaf',
    quote:
      'Al principio me daba pena llegar sola porque no conocía a nadie, pero desde la primera actividad me sentí bienvenida. Me encanta que todas podamos integrarnos sin importar la edad. He conocido mujeres maravillosas y ahora siempre tengo un nuevo plan que esperar con emoción.',
  },
];


export const FAQS: Faq[] = [
  {
    question: '¿Las sesiones son presenciales o en línea?',
    answer:
      'Ambas. Atiendo en modalidad presencial en Panamá Oeste (La Chorrera) y virtual desde cualquier lugar de Panamá. La calidad del acompañamiento es la misma.',
  },
  {
    question: '¿Qué pasa en una primera consulta?',
    answer:
      'Cada atención tiene una duración de 50 a 60 minutos. En la primera consulta iniciamos con una bienvenida, la explicación de mi enfoque y metodología de trabajo, y un espacio para conocer tus emociones, inquietudes, antecedentes y objetivos. Al finalizar, te explico la estructura del proceso, que generalmente comprende 4 sesiones de evaluación y una quinta sesión de entrega del informe psicológico, donde se presentan los resultados y se propone un plan de intervención personalizado, con duración y frecuencia estimadas según cada caso.\n\nModalidad virtual: pago anticipado por Yappy o transferencia bancaria.\n\nModalidad presencial: pago al finalizar la consulta.',
  },
  {
    question: '¿Necesito estar en atención psicológica para ir a las actividades de Metamorfosis?',
    answer:
      'No, no necesitas llevar un proceso de atención psicológica individual para ir a las actividades, es un espacio creado para que chicas se diviertan y socialicen de manera segura.',
  },
  {
    question: '¿Hay facilidades de pago para las actividades?',
    answer: 'Sí. Puedes reservar con un abono y pagar el resto en cuotas antes de la fecha de la actividad.',
  },
  {
    question: '¿Desde qué edad atienden niños?',
    answer:
      'Trabajamos con niños de 6 a 12 años en atenciones individuales y en grupos pequeños de estimulación socioemocional.',
  },
  {
    question: '¿Lo que hablo en sesión es confidencial?',
    answer:
      'Siempre. Todo lo que compartes está protegido por el secreto profesional y el código de ética de la psicología.',
  },
  {
    question: '¿Debo participar en todas las actividades de Metamorfosis?',
    answer:
      '¡No! Puedes participar únicamente en las actividades que más te interesen. Cada experiencia se reserva y paga de manera independiente, por lo que puedes unirte cuando lo desees, sin compromisos ni obligaciones de asistencia continua.',
  },
  {
    question: '¿Qué sucede si pago una actividad y no puedo asistir?',
    answer:
      'Entendemos que pueden surgir imprevistos. Sin embargo, los pagos realizados no son reembolsables, ya que permiten asegurar tu cupo y cubrir la organización de cada actividad. Por eso, te recomendamos confirmar tu disponibilidad antes de reservar.',
  },
  {
    question: '¿Puedo asistir sola a las actividades de Metamorfosis?',
    answer:
      '¡Por supuesto! No necesitas venir acompañada ni conocer previamente a ninguna participante. Metamorfosis es precisamente un espacio para salir de la rutina, conocer nuevas amigas y compartir experiencias en un ambiente acogedor.',
  },
  {
    question: '¿Es necesario que ambos miembros de la pareja estén de acuerdo para iniciar la atención?',
    answer:
      'Lo ideal es que ambos estén dispuestos a participar. Sin embargo, si tu pareja aún no desea asistir, puedes iniciar un proceso de atención psicológica individual para trabajar tus inquietudes y dificultades relacionadas con la relación.',
  },
  {
    question: '¿Los padres participan en el proceso de atención psicológica infantil?',
    answer:
      '¡Sí! La participación de los padres o cuidadores es fundamental. Según las necesidades de cada niño, se realizan entrevistas, orientaciones y recomendaciones para acompañar su desarrollo emocional y conductual, respetando siempre su privacidad y bienestar.',
  },
];

