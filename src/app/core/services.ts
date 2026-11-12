import { Faq } from './models';
import { IMG } from './content';
import { SITE } from './site.config';

// Páginas de servicio: una por cada cosa que la gente busca en Google, con su propio título, texto y dirección.
export interface ServicePage {
  /** Dirección de la página, sin barra: /psicologa-en-la-chorrera */
  slug: string;
  /** Texto corto del enlace (pie de página y «otros servicios»). */
  navLabel: string;
  /** Título corto y frase de la tarjeta en «Servicios». */
  cardTitle: string;
  blurb: string;
  icon: string;
  /** Título de la pestaña y de Google (unos 60 caracteres). */
  title: string;
  /** Descripción que muestra Google (unos 150 caracteres). */
  description: string;
  h1: string;
  h1Accent: string;
  lead: string;
  forWhoTitle: string;
  forWho: string[];
  steps: { title: string; text: string }[];
  facts: { label: string; value: string }[];
  faqs: Faq[];
  related: string[];
  image: string;
  imageAlt: string;
  /** Nombre del servicio para los datos estructurados de Google. */
  serviceName: string;
  /** Qué bloque grande va después de «Sobre Nathalie»: las actividades Metamorfosis o Vital Kids. */
  showcase: 'retreat' | 'kids';
}

const HOURS = SITE.hours;
const PAYMENT = 'Virtual: pago anticipado por Yappy o transferencia bancaria. Presencial: pago al finalizar la consulta.';
const DURATION = '50 a 60 minutos por sesión';

export const SERVICE_PAGES: ServicePage[] = [
  {
    slug: 'psicologa-en-la-chorrera',
    cardTitle: 'Atención individual',
    blurb: 'Presencial en La Chorrera o por videollamada.',
    icon: 'mapPin',
    navLabel: 'Psicóloga en La Chorrera',
    title: 'Psicóloga en La Chorrera | Psic. Nathalie Vera',
    description: 'Psicóloga en La Chorrera, Panamá Oeste. Atención individual y de pareja, presencial o virtual, con enfoque cognitivo-conductual. Agenda tu cita en línea.',
    h1: 'Psicóloga en La Chorrera',
    h1Accent: 'para cuando quieres sentirte mejor',
    lead: 'Soy Nathalie Vera, psicóloga idónea con un enfoque integrativo de base cognitivo-conductual. Atiendo de forma presencial en La Chorrera (Panamá Oeste) y también en línea, adaptando cada proceso a lo que tú necesitas.',
    forWhoTitle: 'Cuándo buscar apoyo psicológico',
    forWho: [
      'Sientes ansiedad, estrés o cansancio emocional que no logras soltar.',
      'Estás atravesando un duelo, una ruptura o un cambio grande en tu vida.',
      'Quieres trabajar tu autoestima y la forma en que te relacionas con otras personas.',
      'Necesitas ordenar lo que sientes para tomar decisiones con más claridad.',
      'Buscas un espacio seguro y confidencial para hablar sin ser juzgada o juzgado.',
    ],
    steps: [
      { title: 'Primera consulta', text: 'Nos conocemos: te explico mi enfoque y mi forma de trabajar, y tú me cuentas tus emociones, inquietudes, antecedentes y objetivos.' },
      { title: 'Evaluación', text: 'El proceso generalmente comprende 4 sesiones de evaluación y una quinta sesión donde te entrego el informe psicológico.' },
      { title: 'Plan a tu medida', text: 'Con los resultados proponemos un plan de intervención personalizado, con duración y frecuencia estimadas según tu caso.' },
    ],
    facts: [
      { label: 'Modalidad', value: 'Presencial en La Chorrera o virtual' },
      { label: 'Duración', value: DURATION },
      { label: 'Horario', value: HOURS },
      { label: 'Pago', value: PAYMENT },
    ],
    faqs: [
      { question: '¿Dónde atiendes en La Chorrera?', answer: 'La atención presencial es en Panamá Oeste (La Chorrera). Al confirmar tu cita te indico los detalles del lugar. Si prefieres, también puedes tener tus sesiones por videollamada.' },
      { question: '¿Atiendes a personas de Arraiján, Capira o Ciudad de Panamá?', answer: 'Sí. Si te queda lejos de La Chorrera, puedes elegir la modalidad virtual y conectarte desde cualquier lugar de Panamá.' },
      { question: '¿Qué pasa en la primera consulta?', answer: 'Iniciamos con una bienvenida, te explico mi enfoque y metodología, y conversamos sobre tus emociones, inquietudes y objetivos. Al final te explico cómo sería el proceso.' },
      { question: '¿Lo que hablo es confidencial?', answer: 'Sí. Todo lo que se conversa en la atención psicológica está protegido por el secreto profesional y el código de ética de la psicología.' },
    ],
    related: ['terapia-de-pareja-panama-oeste', 'psicologia-virtual-panama', 'psicologia-infantil-la-chorrera'],
    image: IMG.hero,
    imageAlt: 'Psicóloga Nathalie Vera, psicóloga en La Chorrera',
    serviceName: 'Atención psicológica individual',
    showcase: 'retreat',
  },
  {
    slug: 'terapia-de-pareja-panama-oeste',
    cardTitle: 'Atención de pareja',
    blurb: 'Comunicación, conflictos y vínculo, juntos.',
    icon: 'heart',
    navLabel: 'Atención de pareja',
    title: 'Atención de pareja en Panamá Oeste | Nathalie Vera',
    description: 'Atención de pareja en La Chorrera y Panamá Oeste, presencial o virtual. Mejora la comunicación, gestiona conflictos y fortalece tu vínculo. Agenda en línea.',
    h1: 'Atención de pareja en Panamá Oeste',
    h1Accent: 'para construir un vínculo más sano',
    lead: 'En la atención de pareja trabajamos la comunicación, la forma de resolver los conflictos y el vínculo entre ustedes. Un espacio ordenado y respetuoso, presencial en La Chorrera o por videollamada.',
    forWhoTitle: 'Cuándo puede ayudarles la atención de pareja',
    forWho: [
      'Discuten con frecuencia por los mismos temas y no logran llegar a acuerdos.',
      'Sienten distancia, poca comunicación o falta de conexión.',
      'Les cuesta expresar lo que necesitan sin que termine en pelea.',
      'Están enfrentando una decisión importante o un cambio grande como pareja.',
      'Quieren fortalecer su vínculo antes de que los problemas crezcan.',
    ],
    steps: [
      { title: 'Primera sesión', text: 'Los escucho a los dos, entiendo qué los trajo y qué esperan de la atención.' },
      { title: 'Objetivos en común', text: 'Definimos juntos hacia dónde quieren ir como pareja y qué es lo más urgente trabajar.' },
      { title: 'Herramientas y acuerdos', text: 'Practicamos formas de comunicarse y de gestionar los desacuerdos que puedan usar en su día a día.' },
    ],
    facts: [
      { label: 'Modalidad', value: 'Presencial en La Chorrera o virtual' },
      { label: 'Duración', value: DURATION },
      { label: 'Horario', value: HOURS },
      { label: 'Pago', value: PAYMENT },
    ],
    faqs: [
      { question: '¿Tienen que asistir los dos?', answer: 'Lo ideal es que asistan ambos, porque el trabajo es sobre la relación. Si tienes dudas sobre cómo empezar, escríbeme y lo conversamos.' },
      { question: '¿Se puede hacer la atención de pareja en línea?', answer: 'Sí. Atiendo en modalidad presencial en Panamá Oeste (La Chorrera) y virtual desde cualquier lugar de Panamá; la calidad del acompañamiento es la misma.' },
      { question: '¿Cuánto dura cada sesión?', answer: 'Cada atención dura de 50 a 60 minutos. Cuántas sesiones se necesitan depende de cada pareja y se define a medida que avanzamos.' },
      { question: '¿Lo que se habla es confidencial?', answer: 'Sí. Todo lo que se conversa en sesión está protegido por el secreto profesional.' },
    ],
    related: ['psicologa-en-la-chorrera', 'psicologia-virtual-panama', 'psicologia-infantil-la-chorrera'],
    image: IMG.about,
    imageAlt: 'Psicóloga Nathalie Vera, atención de pareja en Panamá Oeste',
    serviceName: 'Atención de pareja',
    showcase: 'retreat',
  },
  {
    slug: 'psicologia-virtual-panama',
    cardTitle: 'Psicología en línea',
    blurb: 'Sesiones por videollamada, desde donde estés.',
    icon: 'video',
    navLabel: 'Psicología en línea',
    title: 'Psicología en línea en Panamá | Psic. Nathalie Vera',
    description: 'Atención psicológica por videollamada para todo Panamá: individual y de pareja, desde donde estés. Reserva tu cita en línea con la Psic. Nathalie Vera.',
    h1: 'Psicología en línea para todo Panamá',
    h1Accent: 'desde donde estés',
    lead: 'Si vives lejos, tienes poco tiempo o prefieres la comodidad de tu casa, puedes tener tus sesiones por videollamada. Atención psicológica individual y de pareja, con la misma calidad que en consulta.',
    forWhoTitle: 'La atención virtual es una buena opción si…',
    forWho: [
      'Vives fuera de La Chorrera, en otra provincia o en un lugar de difícil acceso.',
      'Tu horario hace complicado trasladarte a un consultorio.',
      'Prefieres hablar desde un lugar en el que te sientes cómoda o cómodo.',
      'Estás fuera de Panamá por un tiempo y quieres mantener tu proceso.',
      'Quieres empezar a recibir atención psicológica pero te da nervios ir a un consultorio por primera vez.',
    ],
    steps: [
      { title: 'Eliges tu hora', text: 'Reservas en la agenda en línea, escogiendo "Virtual" como modalidad.' },
      { title: 'Pago anticipado', text: 'Para la modalidad virtual el pago es anticipado, por Yappy o transferencia bancaria. Te indico cómo al confirmar tu cita.' },
      { title: 'Recibes el enlace', text: 'Al confirmar tu cita te llega el enlace de la videollamada. Solo necesitas internet estable y un lugar tranquilo y privado.' },
    ],
    facts: [
      { label: 'Modalidad', value: 'Videollamada, para todo Panamá' },
      { label: 'Duración', value: DURATION },
      { label: 'Horario', value: HOURS },
      { label: 'Pago', value: 'Anticipado, por Yappy o transferencia bancaria' },
    ],
    faqs: [
      { question: '¿Es igual de efectiva que la atención presencial?', answer: 'La calidad del acompañamiento es la misma. Lo que cambia es el lugar desde el que nos conectamos.' },
      { question: '¿Qué necesito para una sesión virtual?', answer: 'Un teléfono o computadora con cámara y micrófono, internet estable y un lugar tranquilo donde puedas hablar con privacidad.' },
      { question: '¿Cómo se paga la sesión virtual?', answer: 'El pago es anticipado, por Yappy o transferencia bancaria. Al confirmar tu cita te doy los datos.' },
      { question: '¿Atiendes pareja por videollamada?', answer: 'Sí, también atiendo parejas en modalidad virtual.' },
    ],
    related: ['psicologa-en-la-chorrera', 'terapia-de-pareja-panama-oeste', 'psicologia-infantil-la-chorrera'],
    image: IMG.hero,
    imageAlt: 'Psicóloga Nathalie Vera, atención psicológica en línea en Panamá',
    serviceName: 'Psicología en línea',
    showcase: 'retreat',
  },
  {
    slug: 'psicologia-infantil-la-chorrera',
    cardTitle: 'Psicología infantil',
    blurb: 'Juego terapéutico para niños, individual o en grupo.',
    icon: 'smile',
    navLabel: 'Psicología infantil (Vital Kids)',
    title: 'Psicología infantil en La Chorrera | Vital Kids',
    description: 'Atención psicológica para niños en La Chorrera con Vital Kids: juego terapéutico, regulación emocional y habilidades sociales. Sesiones individuales y grupales.',
    h1: 'Psicología infantil en La Chorrera',
    h1Accent: 'aprender a sentir, jugando',
    lead: 'Vital Kids es el espacio de atención a niños de EspacioVital. A través del juego terapéutico promovemos el aprendizaje, la expresión y la regulación emocional, y el desarrollo de habilidades sociales, con sesiones individuales y grupos pequeños.',
    forWhoTitle: 'Cuándo puede ayudar a tu hijo o hija',
    forWho: [
      'Le cuesta expresar o regular lo que siente.',
      'Se frustra con facilidad o tiene reacciones intensas.',
      'Tiene miedos, preocupaciones o se siente ansioso.',
      'Le cuesta relacionarse con otros niños.',
      'Está pasando por un cambio en casa o en la escuela.',
    ],
    steps: [
      { title: 'Conocemos a tu hijo o hija', text: 'En una primera consulta conversamos sobre cómo es, qué te preocupa y qué quieres que mejore.' },
      { title: 'Elegimos el formato', text: 'Definimos si conviene una sesión individual o un grupo pequeño de estimulación socioemocional.' },
      { title: 'Aprender jugando', text: 'Trabajamos con respiración consciente, tangram, mandalas, origami, juego sensorial y construcción, adaptados a su edad.' },
    ],
    facts: [
      { label: 'Atención', value: 'Niños, individual y grupal' },
      { label: 'Duración', value: DURATION },
      { label: 'Horario', value: HOURS },
      { label: 'Equipo', value: 'En conjunto con psicopedagogía, para favorecer el desarrollo integral' },
    ],
    faqs: [
      { question: '¿Qué es Vital Kids?', answer: 'Es el espacio de EspacioVital para niños: atención psicológica y talleres socioemocionales basados en el juego terapéutico.' },
      { question: '¿Es individual o en grupo?', answer: 'Ofrecemos las dos opciones: sesiones individuales y grupos pequeños. En la primera consulta definimos cuál conviene a tu hijo o hija.' },
      { question: '¿Trabajan con psicopedagogía?', answer: 'Sí, trabajamos en conjunto con el equipo de psicopedagogía para favorecer el desarrollo integral de cada niño.' },
      { question: '¿Dónde son las sesiones?', answer: 'La atención presencial es en Panamá Oeste (La Chorrera). Escríbenos o agenda tu cita y te damos los detalles.' },
    ],
    related: ['psicologa-en-la-chorrera', 'terapia-de-pareja-panama-oeste', 'psicologia-virtual-panama'],
    image: IMG.kidsBreath,
    imageAlt: 'Niño practicando respiración consciente en Vital Kids, La Chorrera',
    serviceName: 'Atención psicológica infantil',
    showcase: 'kids',
  },
];

export const serviceBySlug = (slug: string) => SERVICE_PAGES.find((p) => p.slug === slug);
