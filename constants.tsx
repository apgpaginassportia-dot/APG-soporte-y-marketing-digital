
import { Plan, ServiceCatalogItem, SchoolServiceItem, TeamServiceItem, CustomServiceOption } from './types';

export const CALENDLY_URL = "https://calendly.com/aliciavons/diagnostico-operativo-torneos";

export const Icons = {
  Check: () => (
    <svg className="w-5 h-5 text-sports-accent flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
    </svg>
  ),
  Trophy: () => (
    <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 4v16m8-8H4m12-8l4 4-4 4m-8-8L4 12l4 4" /></svg>
  ),
  Bus: () => (
    <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" /></svg>
  ),
  Hotel: () => (
    <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2-2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" /></svg>
  ),
  Users: () => (
    <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" /></svg>
  ),
  Search: () => (
     <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
  ),
  Shield: () => (
    <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>
  ),
  CalendarAI: () => (
    <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2-2v12a2 2 0 002 2zM12 14v4m-2-2h4" /></svg>
  ),
};

export const PLANS: Plan[] = [
  {
    id: 'basic',
    title: 'Plan Básico: Control de Categorías',
    tagline: 'Ideal para digitalizar tu registro',
    priceDisplay: '550€',
    basePrice: 550,
    subtitle: 'Olvídate de revisar DNI por WhatsApp',
    description: 'Centralizo el registro de jugadores por categorías (Alevín, Infantil, etc.). Valido sus documentos y te entrego listados listos para los árbitros.',
    buttonText: 'Digitalizar mi registro',
    features: [
      { label: 'Registro Digital por Categoría', description: 'Formularios inteligentes que separan automáticamente a los jugadores por edad.' },
      { label: 'Validación Técnica de Fichas', description: 'Reviso que cada DNI y seguro sea válido para evitar alineaciones indebidas.' },
      { label: 'Control de Pagos de Equipos', description: 'Sé al segundo qué equipo ha pagado su inscripción y quién falta.' },
      { label: 'Listados para Mesa Técnica', description: 'Generación de actas y listados PDF profesionales por cada categoría.' }
    ]
  },
  {
    id: 'intermediate',
    title: 'Plan Avanzado: Operativa 360º',
    tagline: 'Gestión Integral MEC 2025',
    priceDisplay: '1.450€',
    basePrice: 1450,
    subtitle: 'Tu torneo llave en mano',
    description: 'Incluye TODO lo del Plan Básico más el control total de la logística y la competición in-situ. Yo dirijo el evento, tú disfrutas.',
    isRecommended: true,
    recommendationLabel: 'INCLUYE PLAN BÁSICO',
    buttonText: 'Hablemos de mi operativa',
    features: [
      { label: 'TODO el Plan Básico Incluido', description: 'Gestión completa de jugadores, categorías, fichas y cobros.' },
      { label: 'Ingeniería de Cuadros y Horarios', description: 'Diseño experto de cruces y sedes para optimizar cada minuto del torneo.' },
      { label: 'Dirección Logística de Transporte', description: 'Coordinación de flotas de autobuses para que nadie llegue tarde al campo.' },
      { label: 'Soporte Directo in-situ', description: 'Resolución de crisis y atención a coordinadores durante los días del torneo.' }
    ]
  }
];

export const INDIVIDUAL_SERVICES_RATES = [
  { 
    service: "Validación de Licencias", 
    description: "Revisión técnica masiva de registros.", 
    benefit: "Evita que equipos queden fuera por fallos en fichas o seguros sin que tú tengas que revisar mil fotos de DNI.",
    price: "220€" 
  },
  { 
    service: "Optimización de Cuadros", 
    description: "Diseño de horarios y sedes.", 
    benefit: "Elimina tiempos muertos innecesarios y garantiza un flujo de partidos impecable que encantará a equipos y familias.",
    price: "300€" 
  },
  { 
    service: "Plan de Transporte", 
    description: "Logística de flotas y rutas.", 
    benefit: "Asegúrate de que cada equipo llegue a su campo a tiempo, eliminando llamadas de pánico de última hora y retrasos en cadena.",
    price: "350€" 
  },
  { 
    service: "Gestión de Hoteles", 
    description: "Coordinación de rooming y dietas.", 
    benefit: "Centralizo la interlocución con hoteles para evitar crisis de alojamiento y asegurar que cada equipo tenga su menú a tiempo.",
    price: "300€" 
  },
  { 
    service: "Resultados Live", 
    description: "App de resultados en tiempo real.", 
    benefit: "Ofrece una experiencia profesional donde familias y jugadores siguen la clasificación al segundo desde su móvil.",
    price: "350€" 
  },
  { 
    service: "Seguridad y Accesos", 
    description: "Plan de control de flujo de público.", 
    benefit: "Evita aglomeraciones y garantiza que solo el personal autorizado acceda a zonas críticas, mejorando la seguridad general.",
    price: "200€" 
  }
];

export const CUSTOM_SERVICES_LIST: CustomServiceOption[] = [
  { id: 'admin_base', label: 'Admin Base', description: 'Registro digital centralizado.', price: 180, unit: 'base' },
  { id: 'transport_pro', label: 'Transport Pro', description: 'Coordinación de rutas logísticas.', price: 250, unit: 'base' },
  { id: 'hotel_master', label: 'Sedes & Hoteles', description: 'Gestión de rooming y dietas.', price: 300, unit: 'base' },
  { id: 'live_scoring', label: 'Resultados Live', description: 'Resultados en tiempo real.', price: 350, unit: 'base' }
];

export const SERVICE_CATALOG_DETAILED: ServiceCatalogItem[] = [
  { 
    title: "Gestión de Jugadores",
    subtitle: "Cero alineaciones indebidas",
    description: "Digitalizo el registro para que cada jugador esté en su categoría correcta con su ID validado.",
    iconName: "Users",
    details: [
        "Inscripción online por equipo.",
        "Validación técnica de DNI/Fichas.",
        "Control de categorías por edad.",
        "Actas de partido digitales."
    ]
  },
  { 
    title: "Logística de Élite",
    subtitle: "Puntualidad en cada campo",
    description: "Mi experiencia en la MEC 2025 coordinando flotas me permite blindar tus traslados y horarios.", 
    iconName: "Bus",
    details: [
        "Diseño de rutas de autobuses.",
        "Sincronización con competición.",
        "Gestión de staff y sedes.",
        "Atención a incidencias en vivo."
    ]
  },
  { 
    title: "Dirección Técnica", 
    subtitle: "El alma de la competición",
    description: "Organizo los cuadros de juego para que el torneo sea fluido, equilibrado y profesional.", 
    iconName: "Trophy",
    details: [
        "Cruces y horarios optimizados.",
        "Reglamentos de competición.",
        "App de resultados Live.",
        "Protocolo de premiación."
    ]
  },
];

export const SCHOOL_SERVICES: SchoolServiceItem[] = [
    { title: "Diagnóstico Operativo", description: "Analizo tu evento actual para detectar fallos.", iconName: "Search" },
    { title: "App de Jornada", description: "Resultados en vivo para familias.", iconName: "Trophy" },
    { title: "Dirección in-situ", description: "Yo coordino, los profes disfrutan.", iconName: "CalendarAI" }
];

export const SCHOOL_PLAN_DATA: Plan = {
  id: 'school',
  title: 'Plan Colegios & AMPAS',
  subtitle: 'Día del Deporte Nivel Pro',
  priceDisplay: '650€',
  basePrice: 650,
  description: 'Transformo tu jornada escolar en un evento de élite con resultados en vivo y logística profesional llave en mano.',
  features: [
    'Gestión digital de cuadros y horarios',
    'App de resultados para padres y alumnos',
    'Coordinación presencial de staff',
    'Ceremonia de clausura organizada'
  ],
  buttonText: 'Hablemos de tu jornada escolar'
};

export const TEAM_SERVICES: TeamServiceItem[] = [
  {
    id: 'external_office',
    title: "Secretaría Técnica Externa",
    price: "250€",
    period: "/ mes",
    description: "Libero a tus directores de la gestión de jugadores. Organizo cada ficha por categoría (Alevín, Infantil...) asegurando que la documentación sea técnica y legalmente válida.",
    iconName: "Shield",
    features: [
      "Control de Registros por Categoría", 
      "Validación de DNI, Fichas y Seguros", 
      "Auditoría de Plantillas (Control de Edad)",
      "Digitalización de Documentación de Equipo"
    ],
    highlight: true
  },
  {
    id: 'match_day_logistics',
    title: "Soporte Logística Fin de Semana",
    price: "120€",
    period: "/ jornada",
    description: "Me encargo de que cada equipo del club llegue a su partido a tiempo con todo lo necesario.",
    iconName: "Bus",
    features: [
      "Coordinación de Flotas de Autobuses", 
      "Gestión de Dietas y Picnic Equipos", 
      "Hojas de Ruta para Delegados",
      "Resolución de Incidencias de Última Hora"
    ],
    highlight: false
  }
];

export const WORKFLOW_STEPS = [
    { step: "01", title: "Charla 15 min", desc: "Detectamos qué te quita el sueño hoy mismo.", icon: <Icons.Search /> },
    { step: "02", title: "Hoja de Ruta", desc: "Te presento el plan para blindar tu operativa.", icon: <Icons.Trophy /> },
    { step: "03", title: "Control APG", desc: "Tomo el mando administrativo y logístico.", icon: <Icons.Shield /> },
    { step: "04", title: "Tranquilidad", desc: "Tú disfrutas del deporte, yo de los datos.", icon: <Icons.Check /> }
];

export const METRICS = [
  { label: "Participantes MEC'25", value: "+2000", icon: <Icons.Users /> },
  { label: "Equipos Gestionados", value: "150", icon: <Icons.Trophy /> },
  { label: "Logística Efectiva", value: "100%", icon: <Icons.Bus /> },
  { label: "Horas de Estrés Ahorradas", value: "+500", icon: <Icons.Check /> }
];
