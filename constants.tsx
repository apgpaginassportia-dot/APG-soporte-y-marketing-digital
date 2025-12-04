

import { Plan, CustomServiceOption, ServiceCatalogItem, SchoolServiceItem, TeamServiceItem } from './types';

// Icon Components - Simplified for Sports Theme
export const Icons = {
  Check: () => (
    <svg className="w-5 h-5 text-sports-lime flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
    </svg>
  ),
  Star: () => (
    <svg className="w-6 h-6 text-sports-lime" fill="currentColor" viewBox="0 0 20 20">
      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
    </svg>
  ),
  Digital: () => (
    <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
  ),
  Bus: () => (
    <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" /></svg>
  ),
  Hotel: () => (
    <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2-2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" /></svg>
  ),
  Staff: () => (
    <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
  ),
  AI: () => (
    <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
  ),
  Support: () => (
    <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" /></svg>
  ),
  Users: () => (
    <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" /></svg>
  ),
  Doc: () => (
    <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
  ),
  Warn: () => (
    <svg className="w-10 h-10 text-orange-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
  ),
  Clock: () => (
    <svg className="w-10 h-10 text-orange-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
  ),
  Shuffle: () => (
    <svg className="w-10 h-10 text-orange-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" /></svg>
  ),
  Share: () => (
    <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" /></svg>
  ),
  Briefcase: () => (
    <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
  ),
  Speaker: () => (
    <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z" /></svg>
  ),
  // New Icons for Schools
  SchoolForm: () => (
    <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" /></svg>
  ),
  SchoolMoney: () => (
    <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
  ),
  SchoolChat: () => (
    <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" /></svg>
  ),
  SchoolShirt: () => (
    <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
  ),
  SchoolData: () => (
    <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>
  ),
  QR: () => (
    <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 4v1m6 11h2m-6 0h-2v4h2v-4zM6 8V4h2M4 8h2M6 20h2m-2-4h2m6 0h2M6 8H4m0 0V4m2 16H4m0 0v-4m12 0h2m-2 4h2" /><rect x="4" y="4" width="6" height="6" rx="1" /><rect x="14" y="4" width="6" height="6" rx="1" /><rect x="4" y="14" width="6" height="6" rx="1" /></svg>
  ),
  // Automation Icons
  AutoForm: () => (
    <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
  ),
  CalendarAI: () => (
    <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
  ),
  Notification: () => (
    <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" /></svg>
  ),
  Results: () => (
    <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>
  ),
  Payment: () => (
    <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" /></svg>
  ),
  Trophy: () => (
    <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" /></svg>
  )
};

// 8 AUTOMATION FOCUSED SERVICES (Adjusted prices for market competitiveness)
export const CUSTOM_SERVICES_LIST: CustomServiceOption[] = [
  { id: 'auto_forms', label: 'Registro Inteligente', description: 'Formularios con OCR y validación auto de fichas.', price: 120, unit: 'módulo' },
  { id: 'ai_calendar', label: 'Calendarios IA', description: 'Generación de cruces y horarios sin conflictos.', price: 190, unit: 'evento' },
  { id: 'live_results', label: 'Actas Digitales', description: 'Resultados y clasificaciones en tiempo real.', price: 150, unit: 'módulo' },
  { id: 'push_notifs', label: 'Alertas WhatsApp', description: 'Notificaciones automáticas a delegados y árbitros.', price: 90, unit: 'pack' },
  { id: 'access_qr', label: 'Control Acceso QR', description: 'Entradas y acreditaciones digitales automatizadas.', price: 120, unit: 'módulo' },
  { id: 'staff_logistics', label: 'Gestión Staff', description: 'Asignación automática de turnos para voluntarios.', price: 80, unit: 'módulo' },
  { id: 'smart_transport', label: 'Rutas Inteligentes', description: 'Optimización automática de rutas de autobús.', price: 250, unit: 'evento' },
  { id: 'digital_awards', label: 'Trofeos Digitales', description: 'Generación y envío automático de diplomas PDF.', price: 50, unit: 'pack' },
];

export const INDIVIDUAL_SERVICES_RATES = [
  { service: 'Gestión de Inscripciones', description: 'Validación de documentación, seguros y control de pagos por equipo.', price: '200€ - 400€' },
  { service: 'Logística de Autocares', description: 'Diseño de rutas, control de horarios y coordinación con transportistas.', price: '350€ - 600€' },
  { service: 'Gestión Hotelera', description: 'Rooming list, asignación de habitaciones y gestión de dietas.', price: '600€ - 1.000€' },
  { service: 'Coordinación de Sedes', description: 'Gestión de horarios de partidos y coordinación de instalaciones.', price: '250€ - 400€' },
];

export const PLANS: Plan[] = [
  {
    id: 'basic',
    title: 'Plan Básico',
    priceDisplay: '495€',
    basePrice: 495,
    subtitle: 'Gestión Documental',
    description: 'Evita errores y ahorra horas desde el primer día.',
    details: 'Digitalización completa de fichas y control documental básico.',
    buttonText: 'Ver detalles',
    features: [
      'Gestión de inscripciones de equipos',
      'Gestión de inscripciones de jugadores',
      'Revisión documental',
      'Soporte básico'
    ]
  },
  {
    id: 'intermediate',
    title: 'Plan Intermedio',
    priceDisplay: '1.150€',
    basePrice: 1150,
    subtitle: 'Logística Terrestre',
    description: 'Planifica rutas sin estrés y sin llamadas de última hora.',
    details: 'Incluye todo lo del Plan Básico más una gestión integral de la flota de autobuses y transferencias.',
    buttonText: 'Ver detalles',
    features: [
      'Todo lo del Plan Básico',
      'Gestión logística de autocares',
      'Coordinación con empresas',
      'Planificación de rutas y horarios'
    ]
  },
  {
    id: 'advanced',
    title: 'Plan Avanzado',
    priceDisplay: '1.950€',
    basePrice: 1950,
    subtitle: 'Gestión Integral 360°',
    description: 'Despreocúpate por completo de la logística.',
    isRecommended: true,
    details: 'La experiencia definitiva. Incluye gestión de inscripciones, transporte y alojamiento (asignación) para equipos.',
    buttonText: 'Ver detalles',
    features: [
      'Todo lo del Plan Intermedio',
      'Gestión logística de hoteles (asignación)',
      'Asignación de habitaciones (Rooming)',
      'Hoteles previamente contactados'
    ]
  }
];

// Detalle Profesional de Servicios para Torneos
export const SERVICE_CATALOG_DETAILED: ServiceCatalogItem[] = [
  { 
    title: "Gestión de Inscripciones",
    subtitle: "Tu oficina técnica virtual",
    description: "Centralizamos la documentación para evitar errores administrativos.",
    iconName: "Users",
    details: [
        "Plataforma de registro digital.",
        "Validación de fichas y seguros.",
        "Control de pagos por equipo.",
        "Listados automatizados para arbitraje."
    ]
  },
  { 
    title: "Logística de Autocares",
    subtitle: "Control total de flotas",
    description: "Ingeniería de rutas para garantizar puntualidad en cada partido.", 
    iconName: "Bus",
    details: [
        "Diseño de rutas eficientes.",
        "Interlocución única con la empresa de transporte.",
        "Gestión de incidencias en tiempo real.",
        "Control de horarios de conductores."
    ]
  },
  { 
    title: "Gestión Hotelera (Rooming)", 
    subtitle: "Experiencia 5 estrellas",
    description: "Asignación profesional de equipos en hoteles concertados.", 
    iconName: "Hotel",
    details: [
        "Distribución lógica de habitaciones.",
        "Separación de staffs y jugadores.",
        "Gestión de dietas especiales.",
        "Check-in organizado para grupos masivos."
    ]
  },
];

// Servicios para Centros Escolares (ACTUALIZADO - Tech & Modern)
export const SCHOOL_SERVICES: SchoolServiceItem[] = [
    {
        title: "Carnet Digital (Wallet)",
        description: "El carnet de socio directamente en el móvil de los padres. Adiós al plástico.",
        iconName: "Digital"
    },
    {
        title: "Inscripción 1-Click",
        description: "Formularios inteligentes que se autocompletan. Sin repetir datos cada año.",
        iconName: "SchoolForm"
    },
    {
        title: "App Familias",
        description: "Todas las notificaciones, avisos y autorizaciones en la palma de la mano.",
        iconName: "SchoolChat"
    },
    {
        title: "Listados Oficiales",
        description: "Generación automática de listas de asistencia y registro de socios.",
        iconName: "SchoolData"
    }
];

// Configuración Plan Colegios - ESTRATEGIA PRECIO POR ALUMNO
export const SCHOOL_PLAN_PRICING = {
    title: "Pack AMPA Digital 360",
    pricePerStudent: "0,50€",
    studentDetail: "/ alumno al año",
    totalPrice: "290€",
    totalDetail: "/ año por centro (Tarifa Plana)",
    description: "Moderniza tu colegio por menos de lo que cuesta una fotocopia.",
    features: [
        "Carnet Digital en Wallet (iOS/Android)",
        "App de comunicación ilimitada",
        "Gestión de Listados de Socios",
        "Soporte prioritario a directiva"
    ]
};

// Servicios para Clubes de Fútbol Base (REAL MANAGEMENT SOLUTIONS - UPDATED PRICES)
export const TEAM_SERVICES: TeamServiceItem[] = [
  {
    title: "Planificación de Plantillas",
    price: "195€",
    period: "/ temporada",
    description: "Organiza todas tus categorías (Prebenjamín a Juvenil) visualmente. Control de fichas, subidas de categoría y ratios por equipo.",
    iconName: "Users",
    features: ["Mapa de categorías", "Control de ratios", "Historial de jugador"],
    highlight: true
  },
  {
    title: "Cuadrantes de Campo",
    price: "60€",
    period: "/ mes",
    description: "Se acabó el Tetris. Optimizamos el uso de tu instalación para que entrenen todos los equipos sin solapamientos ni conflictos.",
    iconName: "CalendarAI",
    features: ["Rotación de espacios", "Asignación vestuarios", "Horarios justos"]
  },
  {
    title: "Agenda de Torneos",
    price: "150€",
    period: "/ evento",
    description: "Gestionamos el calendario externo. Inscripciones a torneos, control de fechas bloqueadas en liga y logística de viajes.",
    iconName: "Trophy",
    features: ["Calendario unificado", "Gestión de invitaciones", "Logística de viajes"]
  },
  {
    title: "Coordinación de Jornada",
    price: "90€",
    period: "/ mes",
    description: "El fin de semana, automatizado. Horarios de partidos, designación de autobuses y envío de convocatorias a familias.",
    iconName: "Clock",
    features: ["Horarios partidos", "Rutas de bus", "Avisos a familias"]
  }
];
