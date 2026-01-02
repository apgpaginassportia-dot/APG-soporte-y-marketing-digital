import { Plan, CustomServiceOption, ServiceCatalogItem, SchoolServiceItem, TeamServiceItem } from './types';

// Configuración de Terceros - Solo se mantiene como referencia interna
export const CALENDLY_URL = "https://calendly.com/aliciapons/reunion-evaluacion-deportiva";

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
    <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.175 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.114l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.382-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" /></svg>
  ),
  AutoForm: () => (
    <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
  ),
  CalendarAI: () => (
    <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2-2v12a2 2 0 002 2zM12 14v4m-2-2h4" /></svg>
  ),
  QR: () => (
    <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm12 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z" /></svg>
  ),
  Notification: () => (
    <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" /></svg>
  ),
};

export const METRICS = [
    { label: "Mis Operaciones Exitosas", value: "120+", icon: <Icons.Trophy /> },
    { label: "Atletas que he Gestionado", value: "15,000", icon: <Icons.Users /> },
    { label: "Horas que te ahorro", value: "2,400", icon: <Icons.Staff /> },
    { label: "Sedes Bajo mi Control", value: "45", icon: <Icons.Shield /> }
];

export const WORKFLOW_STEPS = [
    { 
        step: "01", 
        title: "Diagnóstico Táctico", 
        desc: "Audito tu operativa actual para detectar fugas de recursos y cuellos de botella.",
        icon: <Icons.Search />
    },
    { 
        step: "02", 
        title: "Estructura Operativa", 
        desc: "Diseño tu engranaje logístico: rutas, alojamiento y cronograma técnico.",
        icon: <Icons.Trophy />
    },
    { 
        step: "03", 
        title: "Blindaje de Gestión", 
        desc: "Implemento paneles de control para que monitorices cada detalle en tiempo real.",
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
    tagline: 'Captación Rápida',
    priceDisplay: '590€',
    basePrice: 590,
    subtitle: 'Administración Táctica',
    description: 'Gestión profesional de inscripciones de equipos y jugadores. El primer paso para el orden.',
    footerLabel: 'Punto de entrada ideal para profesionalizar tu torneo hoy mismo.',
    buttonText: 'Solicitar Auditoría Gratuita',
    features: [
      'Gestión de Inscripciones de equipos y jugadores',
      'Dashboard en tiempo real de inscritos por categoría',
      'Atención vía WhatsApp a delegados para registros',
      'Soporte administrativo Alicia Pons'
    ],
    milestones: [
      { amount: '177€', label: 'Reserva de fecha (30%)' },
      { amount: '236€', label: 'Inicio operativa (40%)' },
      { amount: '177€', label: 'Cierre de inscripciones (30%)' }
    ]
  },
  {
    id: 'intermediate',
    title: 'Intermedio',
    tagline: 'Flujo Logístico',
    priceDisplay: '1.590€',
    basePrice: 1590,
    subtitle: 'Operativa Maestra',
    description: 'Nada se te pierde, nada se descuadra. Tomo el control operativo de flotas y coordinación técnica.',
    isRecommended: true,
    recommendationLabel: 'El más equilibrado',
    buttonText: 'Solicitar Auditoría Gratuita',
    features: [
      'Todo lo del Plan Básico incluido',
      'Seguimiento y control de cobros a los equipos',
      'Coordinación de transporte (con tus proveedores)',
      'Planificación de horarios de partidos y sedes',
      'Acreditaciones digitales para staff y participantes'
    ],
    milestones: [
      { amount: '477€', label: 'Configuración inicial (30%)' },
      { amount: '636€', label: 'Desarrollo Logístico (40%)' },
      { amount: '477€', label: 'Semana del Torneo (30%)' }
    ]
  },
  {
    id: 'advanced',
    title: 'Avanzado',
    tagline: 'Dirección Operativa',
    priceDisplay: '2.950€',
    basePrice: 2950,
    subtitle: 'Control Total y Partner',
    description: 'Tu torneo bajo control absoluto. Me hago responsable de la dirección de campo y tesorería.',
    footerLabel: 'Nivel Partner: Máxima seguridad operativa para ti.',
    buttonText: 'Solicitar Auditoría Gratuita',
    features: [
      'Todo lo del Plan Intermedio incluido',
      'Gestión avanzada de tesorería y liquidación final',
      'Dirección logística presencial in-situ (día del evento)',
      'Gestión integral de transporte: negociación y cierre',
      'Control de accesos QR y gestión dinámica de staff'
    ],
    milestones: [
      { amount: '885€', label: 'Auditoría y Plan Maestro (30%)' },
      { amount: '1.180€', label: 'Gestión Integral (40%)' },
      { amount: '885€', label: 'Liquidación Final (30%)' }
    ]
  }
];

export const INDIVIDUAL_SERVICES_RATES = [
  { service: 'Gestión de Inscripciones', description: 'Control de plazas, validación de fichas y jugadores.', price: '450€ - 750€' },
  { service: 'Ingeniería de Transporte', description: 'Diseño de flotas, rutas dinámicas y transfers.', price: '600€ - 1.200€' },
  { service: 'Hospitalidad Élite', description: 'Gestión de hoteles, Rooming List y dietas.', price: '900€ - 2.000€' },
  { service: 'Seguridad y Control', description: 'Protocolos de riesgo y acreditaciones.', price: '500€ - 900€' },
];

export const CUSTOM_SERVICES_LIST: CustomServiceOption[] = [
  { id: 'admin_base', label: 'Central Administrativa', description: 'Inscripciones sin errores.', price: 400, unit: 'módulo' },
  { id: 'transport_pro', label: 'Logística de Flotas', description: 'Rutas optimizadas para equipos.', price: 550, unit: 'evento' },
  { id: 'hotel_master', label: 'Gestión de Alojamiento', description: 'Control de rooming y dietas.', price: 750, unit: 'módulo' },
  { id: 'vip_access', label: 'Protocolo VIP', description: 'Gestión de ojeadores y prensa.', price: 400, unit: 'módulo' },
  { id: 'safety_first', label: 'Seguridad y Crisis', description: 'Planes de contingencia deportiva.', price: 450, unit: 'módulo' },
];

export const SERVICE_CATALOG_DETAILED: ServiceCatalogItem[] = [
  { 
    title: "Administración",
    subtitle: "Precisión Documental",
    description: "Centralizo el registro de equipos, liberando a tu equipo de la carga administrativa pesada.",
    iconName: "Users",
    details: [
        "Diseño tus formularios de registro personalizados.",
        "Valido manualmente licencias y fichas de jugadores.",
        "Generación de listados oficiales de competición.",
        "Gestiono la comunicación con tus delegados."
    ]
  },
  { 
    title: "Transporte",
    subtitle: "Logística Sin Fallos",
    description: "Nadie llega tarde. Diseño el flujo de movimiento más eficiente para tus sedes.", 
    iconName: "Bus",
    details: [
        "Planifico las rutas equipo por equipo.",
        "Control de horarios en tiempo real.",
        "Soy tu interlocutora única con empresas de bus.",
        "Gestión de transfers VIP y staff."
    ]
  },
  { 
    title: "Hospitalidad", 
    subtitle: "Confort para Atletas",
    description: "Maximizo la experiencia de tus equipos en sus hoteles sin fricciones.", 
    iconName: "Hotel",
    details: [
        "Gestiono tus Rooming Lists.",
        "Coordino los menús deportivos.",
        "Control de zonas comunes en hoteles.",
        "Doy soporte directo en incidencias."
    ]
  },
];

export const SCHOOL_SERVICES: SchoolServiceItem[] = [
    {
        title: "Evaluación Previa",
        description: "Diagnóstico gratuito que hago de tus instalaciones y cultura deportiva.",
        iconName: "Search"
    },
    {
        title: "Live Scoring",
        description: "Resultados y clasificaciones en tiempo real para tus alumnos.",
        iconName: "Star"
    },
    {
        title: "Control de Campo",
        description: "Coordino presencialmente tu evento: staff, horarios y crisis.",
        iconName: "Staff"
    },
    {
        title: "Premiación Pro",
        description: "Organizo ceremonias de clausura de alto impacto con tus trofeos.",
        iconName: "Trophy"
    }
];

export const SCHOOL_PLAN_DATA: Plan = {
  id: 'school',
  title: "Dirección de Eventos Escolares",
  priceDisplay: "Desde 750€",
  basePrice: 750,
  subtitle: "Del Patio al Estadio Profesional",
  description: "Transformo el evento deportivo de tu colegio en una experiencia profesional. Gestión llave en mano.",
  details: "Olvídate del caos operativo. Implemento tecnología de live scoring y me encargo de la dirección de campo presencial. Mi proceso comienza con una auditoría gratuita de lo que necesita tu centro.",
  buttonText: "Solicitar Auditoría Gratuita",
  features: [
    "Mi Reunión de Diagnóstico (0€)",
    "Configuración de Cuadrantes Técnicos",
    "Tu Web App de Resultados en Vivo",
    "Mi Dirección el día del Evento",
    "Clausura y Entrega de Premios"
  ],
  milestones: [
    { amount: '225€', label: 'Estructura (30%)' },
    { amount: '300€', label: 'Preparación (40%)' },
    { amount: '225€', label: 'Ejecución (30%)' }
  ],
  isRecommended: true
};

export const TEAM_SERVICES: TeamServiceItem[] = [
  {
    id: 'player_management',
    title: "Gestión Deportiva",
    price: "185€",
    period: "/ temp",
    description: "Mantengo tus fichas de jugadores bajo control total.",
    iconName: "Users",
    features: ["Bóveda documental", "Historial médico", "Panel de coaches"],
    highlight: true
  },
  {
    id: 'match_day',
    title: "Logística de Partidos",
    price: "75€",
    period: "/ mes",
    description: "Sincronizo tus horarios y rutas para cada jornada.",
    iconName: "Bus",
    features: ["Alertas de cambios", "Convocatorias digitales", "Rutas GPS"],
    highlight: false
  }
];