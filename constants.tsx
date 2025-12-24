
import { Plan, CustomServiceOption, ServiceCatalogItem, SchoolServiceItem, TeamServiceItem } from './types';

// Icon Components - Professional Sports Theme
export const Icons = {
  Check: () => (
    <svg className="w-5 h-5 text-sports-primary flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
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
  Staff: () => (
    <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
  ),
  Search: () => (
     <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
  ),
  Shield: () => (
    <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>
  ),
  Star: () => (
    <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.175 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.382-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" /></svg>
  ),
  AutoForm: () => (
    <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
  ),
  CalendarAI: () => (
    <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2-2v12a2 2 0 002 2zM12 14v4m-2-2h4" /></svg>
  ),
  Results: () => (
    <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 01-2 2h2a2 2 0 012-2zm4 0v-2a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2zm4 0V9a2 2 0 012-2h2a2 2 0 012 2v10a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>
  ),
  Notification: () => (
    <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" /></svg>
  ),
  QR: () => (
    <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm12 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z" /></svg>
  ),
};

export const METRICS = [
    { label: "Operaciones Exitosas", value: "120+", icon: <Icons.Trophy /> },
    { label: "Atletas Gestionados", value: "15,000", icon: <Icons.Users /> },
    { label: "Horas de Gestión", value: "2,400", icon: <Icons.Staff /> },
    { label: "Sedes Controladas", value: "45", icon: <Icons.Shield /> }
];

export const WORKFLOW_STEPS = [
    { 
        step: "01", 
        title: "Diagnóstico Táctico", 
        desc: "Auditoría de tu operativa actual para detectar fugas de recursos y cuellos de botella.",
        icon: <Icons.Search />
    },
    { 
        step: "02", 
        title: "Estructura Operativa", 
        desc: "Diseño del engranaje logístico: rutas, alojamiento y cronograma técnico.",
        icon: <Icons.Trophy />
    },
    { 
        step: "03", 
        title: "Blindaje de Gestión", 
        desc: "Implementación de paneles de control para monitorizar cada detalle en tiempo real.",
        icon: <Icons.Shield />
    },
    { 
        step: "04", 
        title: "Ejecución de Élite", 
        desc: "Tú te encargas del deporte. Yo me encargo de que todo lo demás funcione.",
        icon: <Icons.Staff />
    }
];

export const PLANS: Plan[] = [
  {
    id: 'basic',
    title: 'Básico',
    tagline: 'Administración Core',
    priceDisplay: '550€',
    basePrice: 550,
    subtitle: 'Administración Táctica',
    description: 'Elimina el papeleo y centraliza el control de inscripciones de forma profesional y segura.',
    footerLabel: 'Ideal para torneos locales con staff propio.',
    buttonText: 'Solicitar Plan Básico',
    features: [
      'Gestión digital de inscripciones (Formularios Pro)',
      'Validación técnica de fichas de jugadores',
      'Control manual de validación de pagos y transferencias',
      'Dashboard básico de inscritos por categorías',
      'Soporte administrativo preventa'
    ],
    milestones: [
      { amount: '165€', label: 'al contratar' },
      { amount: '220€', label: '60 días antes' },
      { amount: '165€', label: 'semana del evento' }
    ]
  },
  {
    id: 'intermediate',
    title: 'Intermedio',
    tagline: 'Flujo Logístico',
    priceDisplay: '1.250€',
    basePrice: 1250,
    subtitle: 'Operativa Maestra',
    description: 'Nada se pierde, nada se descuadra, nada se olvida. Control operativo de flotas y pagos.',
    isRecommended: true,
    recommendationLabel: 'El más solicitado',
    buttonText: 'Elegir Plan Intermedio',
    features: [
      'Seguimiento y control de pagos de los equipos',
      'Coordinación logística de transporte (Proveedores definidos)',
      'Planificación horaria operativa de partidos y sedes',
      'Seguimiento operativo de inscripciones y documentación',
      'Comunicación logística constante con los equipos',
      'Acreditaciones digitales para staff y jugadores'
    ],
    milestones: [
      { amount: '375€', label: 'al contratar' },
      { amount: '500€', label: '60 días antes' },
      { amount: '375€', label: 'semana del evento' }
    ]
  },
  {
    id: 'advanced',
    title: 'Avanzado',
    tagline: 'Dirección Operativa',
    priceDisplay: '2.150€',
    basePrice: 2150,
    subtitle: 'Control Total y Partner',
    description: 'El torneo está bajo control... también el dinero. Responsabilidad real y dirección de campo.',
    footerLabel: 'Nivel Partner: Máxima seguridad operativa y financiera.',
    buttonText: 'Contratar Plan Avanzado',
    features: [
      'Gestión avanzada de pagos y decisiones económicas críticas',
      'Diseño y control estratégico del calendario de competición',
      'Gestión integral de transporte: Búsqueda y Negociación',
      'Validación documental técnica con OCR y control legal',
      'Dirección logística in-situ y toma de decisiones en tiempo real',
      'Control de accesos QR y gestión de staff durante el evento'
    ],
    milestones: [
      { amount: '645€', label: 'al contratar' },
      { amount: '860€', label: '60 días antes' },
      { amount: '645€', label: 'semana del evento' }
    ]
  }
];

export const INDIVIDUAL_SERVICES_RATES = [
  { service: 'Gestión de Inscripciones', description: 'Control de plazas, validación técnica de fichas y pagos.', price: '200€ - 400€' },
  { service: 'Ingeniería de Transporte', description: 'Diseño de flotas, rutas dinámicas y transfers.', price: '350€ - 600€' },
  { service: 'Hospitalidad Élite', description: 'Gestión de hoteles, Rooming List y alimentación.', price: '600€ - 1.000€' },
  { service: 'Seguridad y Control', description: 'Protocolos de riesgo y acreditaciones de seguridad.', price: '300€ - 500€' },
];

export const CUSTOM_SERVICES_LIST: CustomServiceOption[] = [
  { id: 'admin_base', label: 'Central Administrativa', description: 'Control de inscripciones sin errores.', price: 150, unit: 'módulo' },
  { id: 'transport_pro', label: 'Logística de Flotas', description: 'Rutas optimizadas para equipos.', price: 250, unit: 'evento' },
  { id: 'hotel_master', label: 'Gestión de Alojamiento', description: 'Control total de rooming y dietas.', price: 300, unit: 'módulo' },
  { id: 'vip_access', label: 'Protocolo VIP', description: 'Gestión de ojeadores y prensa.', price: 200, unit: 'módulo' },
  { id: 'safety_first', label: 'Seguridad y Crisis', description: 'Planes de contingencia deportiva.', price: 180, unit: 'módulo' },
];

export const SERVICE_CATALOG_DETAILED: ServiceCatalogItem[] = [
  { 
    title: "Administración",
    subtitle: "Precisión Documental",
    description: "Centralizo el registro de equipos, liberando a tu staff de la carga administrativa pesada.",
    iconName: "Users",
    details: [
        "Formularios de registro personalizados.",
        "Validación manual de licencias y pagos.",
        "Generación de listados técnicos oficiales.",
        "Gestión de comunicación con delegados."
    ]
  },
  { 
    title: "Transporte",
    subtitle: "Logística Sin Fallos",
    description: "Nadie llega tarde. Diseñamos el flujo de movement más eficiente para tus sedes.", 
    iconName: "Bus",
    details: [
        "Planificación de rutas equipo por equipo.",
        "Control de horarios en tiempo real.",
        "Interlocutor único con empresas de bus.",
        "Gestión de transfers VIP y staff."
    ]
  },
  { 
    title: "Hospitalidad", 
    subtitle: "Confort para Atletas",
    description: "Maximizamos la experiencia de los equipos en sus hoteles sin fricciones en el check-in.", 
    iconName: "Hotel",
    details: [
        "Gestión automatizada de Rooming Lists.",
        "Coordinación de menús deportivos.",
        "Control de zonas comunes en hoteles.",
        "Soporte directo en incidencias de estancia."
    ]
  },
];

export const SCHOOL_SERVICES: SchoolServiceItem[] = [
    {
        title: "Wallet Digital",
        description: "AMPA moderna con carnet digital en el móvil de los padres.",
        iconName: "Search"
    },
    {
        title: "Registro Express",
        description: "Inscripciones rápidas y sin formularios infinitos.",
        iconName: "Users"
    },
    {
        title: "Notificaciones Pro",
        description: "Canal de avisos directos y relevantes para las familias.",
        iconName: "Trophy"
    },
    {
        title: "Control de Socios",
        description: "Gestión centralizada de cuotas y bases de datos segura.",
        iconName: "Shield"
    }
];

export const SCHOOL_PLAN_DATA: Plan = {
  id: 'school',
  title: "AMPA Digital 360",
  priceDisplay: "Desde 290€",
  basePrice: 290,
  subtitle: "Modernización Escolar",
  description: "Digitaliza la gestión de tu AMPA. Carnet Wallet, control de socios y avisos directos.",
  details: "Sustituye el carnet físico por uno digital. Ahorra costes de impresión y mejora la comunicación con las familias.",
  buttonText: "Digitalizar Mi AMPA",
  features: [
    "Carnet Digital Wallet (iOS/Android)",
    "Gestión de Socios y Cuotas Anuales",
    "App de Avisos Críticos y Eventos",
    "Gestión de Autorizaciones Digitales",
    "Soporte Estratégico a la Directiva"
  ],
  isRecommended: true
};

export const TEAM_SERVICES: TeamServiceItem[] = [
  {
    id: 'player_management',
    title: "Gestión Deportiva",
    price: "120€",
    period: "/ temp",
    description: "Documentación y fichas de jugadores bajo control total.",
    iconName: "Users",
    features: ["Bóveda documental", "Historial médico", "Panel de coaches"],
    highlight: true
  },
  {
    id: 'match_day',
    title: "Logística de Partidos",
    price: "29€",
    period: "/ mes",
    description: "Sincronización de horarios y rutas para cada jornada.",
    iconName: "Bus",
    features: ["Alertas de cambio de hora", "Convocatorias digitales", "Rutas GPS a campos"],
    highlight: false
  }
];
