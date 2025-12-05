

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
  ),
  Chart: () => (
    <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" /></svg>
  ),
  Search: () => (
     <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
  ),
  Settings: () => (
     <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
  ),
  Rocket: () => (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
  )
};

// NEW: METRICS FOR AUTHORITY
export const METRICS = [
    { label: "Eventos Gestionados", value: "+120", icon: <Icons.Trophy /> },
    { label: "Participantes", value: "15k+", icon: <Icons.Users /> }, // Generic term
    { label: "Horas Ahorradas/Torneo", value: "200h", icon: <Icons.Clock /> },
    { label: "Errores Administrativos", value: "0%", icon: <Icons.Check /> }
];

// NEW: WORKFLOW STEPS
export const WORKFLOW_STEPS = [
    { 
        step: "01", 
        title: "Auditoría Express", 
        desc: "Analizo tu evento actual: inscripciones, sedes, logística y cuellos de botella.",
        icon: <Icons.Search />
    },
    { 
        step: "02", 
        title: "Plan de Acción", 
        desc: "Diseño la logística de transporte, alojamiento y el flujo de la competición.",
        icon: <Icons.Chart />
    },
    { 
        step: "03", 
        title: "Despliegue Tech", 
        desc: "Implemento las herramientas de automatización y registro en 48h.",
        icon: <Icons.Settings />
    },
    { 
        step: "04", 
        title: "Ejecución & Control", 
        desc: "Durante el evento, yo controlo el caos. Tú disfrutas del deporte.",
        icon: <Icons.Rocket />
    }
];

// NEW: TESTIMONIALS (Social Proof) - Multideporte
export const TESTIMONIALS = [
    {
        quote: "Antes perdía semanas cuadrando autobuses para 40 equipos. Con APG, todo fluye solo.",
        author: "Carlos M.",
        role: "Director Torneo Internacional Basket"
    },
    {
        quote: "La gestión de los hoteles para el campeonato de judo era una pesadilla. Alicia lo profesionalizó.",
        author: "Marta R.",
        role: "Coordinadora Federación"
    },
    {
        quote: "La inversión se paga sola solo con lo que ahorras en errores administrativos y multas.",
        author: "Javier P.",
        role: "Presidente Club Deportivo"
    }
];

// 8 AUTOMATION FOCUSED SERVICES (Adjusted prices for market competitiveness)
export const CUSTOM_SERVICES_LIST: CustomServiceOption[] = [
  { id: 'auto_forms', label: 'Registro Inteligente', description: 'Formularios con OCR y validación auto de licencias/fichas.', price: 120, unit: 'módulo' },
  { id: 'ai_calendar', label: 'Calendarios IA', description: 'Generación de cruces y horarios sin conflictos de pista/campo.', price: 190, unit: 'evento' },
  { id: 'live_results', label: 'Actas Digitales', description: 'Resultados y clasificaciones en tiempo real.', price: 150, unit: 'módulo' },
  { id: 'push_notifs', label: 'Alertas Móviles', description: 'Notificaciones automáticas a delegados y jueces/árbitros.', price: 90, unit: 'pack' },
  { id: 'access_qr', label: 'Control Acceso QR', description: 'Entradas y acreditaciones digitales automatizadas.', price: 120, unit: 'módulo' },
  { id: 'staff_logistics', label: 'Gestión Staff', description: 'Asignación automática de turnos para voluntarios.', price: 80, unit: 'módulo' },
  { id: 'smart_transport', label: 'Rutas Inteligentes', description: 'Optimización automática de rutas de autobús.', price: 250, unit: 'evento' },
  { id: 'digital_awards', label: 'Trofeos Digitales', description: 'Generación y envío automático de diplomas PDF.', price: 50, unit: 'pack' },
];

export const INDIVIDUAL_SERVICES_RATES = [
  { service: 'Gestión de Inscripciones', description: 'Validación de documentación, seguros y control de plazas.', price: '200€ - 400€' },
  { service: 'Logística de Transporte', description: 'Diseño de rutas, control de horarios y coordinación de flotas.', price: '350€ - 600€' },
  { service: 'Gestión Hotelera', description: 'Rooming list, asignación de habitaciones y gestión de dietas.', price: '600€ - 1.000€' },
  { service: 'Coordinación de Sedes', description: 'Gestión de horarios de pistas/campos y coordinación de instalaciones.', price: '250€ - 400€' },
];

export const PLANS: Plan[] = [
  {
    id: 'basic',
    title: 'Plan Básico',
    priceDisplay: '550€',
    basePrice: 550,
    subtitle: 'Gestión Documental',
    description: 'Evita errores y ahorra horas desde el primer día.',
    details: 'Digitalización completa de fichas/licencias y control documental básico.',
    buttonText: 'Ver detalles',
    features: [
      'Gestión de inscripciones de equipos',
      'Gestión de inscripciones individuales',
      'Diploma Digital de Participación',
      'Revisión documental',
      'Soporte básico'
    ]
  },
  {
    id: 'intermediate',
    title: 'Plan Intermedio',
    priceDisplay: '1.250€',
    basePrice: 1250,
    subtitle: 'Logística Terrestre',
    description: 'Planifica traslados sin estrés y sin llamadas de última hora.',
    details: 'Incluye todo lo del Plan Básico más una gestión integral de la flota de autobuses y transferencias.',
    isRecommended: true,
    buttonText: 'Ver detalles',
    features: [
      'Todo lo del Plan Básico',
      'Gestión logística de transporte',
      'Coordinación con empresas',
      'Planificación de rutas y horarios'
    ]
  },
  {
    id: 'advanced',
    title: 'Plan Avanzado',
    priceDisplay: '2.150€',
    basePrice: 2150,
    subtitle: 'Gestión Integral 360°',
    description: 'Despreocúpate por completo de la logística.',
    details: 'La experiencia definitiva. Incluye gestión de inscripciones, transporte y alojamiento (asignación) para participantes.',
    buttonText: 'Ver detalles',
    features: [
      'Todo lo del Plan Intermedio',
      'Diploma Digital Premium',
      'Gestión logística de hoteles (asignación)',
      'Asignación de habitaciones (Rooming)',
      'Hoteles previamente contactados'
    ]
  }
];

// Detalle Profesional de Servicios para Torneos (COPYWRITING IMPROVED - NO PAYMENTS)
export const SERVICE_CATALOG_DETAILED: ServiceCatalogItem[] = [
  { 
    title: "Gestión de Inscripciones",
    subtitle: "Oficina Técnica Virtual",
    description: "Elimino el 90% de los emails. Centralizo toda la documentación en una nube segura.",
    iconName: "Users",
    details: [
        "Plataforma de registro digital.",
        "Validación automática de seguros.",
        "Validación de justificantes (sin acceso a banco).",
        "Listados limpios para jueces/árbitros."
    ]
  },
  { 
    title: "Logística de Transporte",
    subtitle: "Control Total de Flotas",
    description: "Ingeniería de rutas para que ningún equipo o atleta llegue tarde. Cero estrés.", 
    iconName: "Bus",
    details: [
        "Diseño de rutas eficientes.",
        "Interlocución única con proveedores.",
        "Resolución de incidencias 24/7.",
        "Control de tiempos de conducción."
    ]
  },
  { 
    title: "Gestión Hotelera", 
    subtitle: "Experiencia 5 Estrellas",
    description: "Convierto el alojamiento en una ventaja competitiva, no en un problema logístico.", 
    iconName: "Hotel",
    details: [
        "Rooming lists inteligentes.",
        "Separación estratégica de staffs.",
        "Gestión de dietas y alergias.",
        "Check-in masivo organizado."
    ]
  },
];

// Servicios para Centros Escolares (ACTUALIZADO - Tech & Modern - NO PAYMENTS)
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
        title: "Control Asistencia",
        description: "Listados automáticos para actividades extraescolares y excursiones.",
        iconName: "SchoolData"
    }
];

// Configurador Plan Colegios - NO GESTIÓN DE COBROS
export const SCHOOL_PLAN_DATA: Plan = {
  id: 'school',
  title: "Pack Gestión AMPA 360º",
  priceDisplay: "Desde 290€",
  basePrice: 290,
  subtitle: "Suscripción Flexible",
  description: "La solución completa para digitalizar tu AMPA o Escuela Deportiva. Elige entre tarifa plana anual o pago flexible.",
  details: "Olvídate de las hojas de cálculo y el papeleo. Con este plan, profesionalizas la gestión, ofreciendo a las familias una experiencia moderna (App + Carnet) y a la directiva un control total sobre socios.",
  buttonText: "Solicitar Alta Centro",
  features: [
    "Carnet de Socio Digital (Wallet iOS/Android)",
    "Plataforma de Inscripción Online",
    "App de Comunicación Directa con Familias",
    "Gestión de Bajas y Altas",
    "Listados Automáticos para Actividades",
    "Soporte Técnico Prioritario para Directiva"
  ],
  isRecommended: true
};

// Servicios para Clubes (SIMPLIFIED TO 2 CORE SERVICES)
export const TEAM_SERVICES: TeamServiceItem[] = [
  {
    id: 'player_management',
    title: "Gestión de Jugadores",
    price: "120€",
    period: "/ temporada",
    description: "Base de datos centralizada. Documentación, fichas médicas y seguimiento deportivo en una nube segura.",
    iconName: "Users",
    features: ["Digitalización de DNI/Fichas", "Historial médico y deportivo", "Acceso seguro para entrenadores"],
    highlight: true
  },
  {
    id: 'match_calendar',
    title: "Calendario de Competición",
    price: "29€",
    period: "/ mes",
    description: "Agenda sincronizada. El sistema avisa automáticamente de cambios y nuevas convocatorias.",
    iconName: "CalendarAI",
    features: ["Sincronización móvil automática", "Avisos de horario", "Notificación de Convocatorias", "Confirmación de Asistencia"],
    highlight: false
  }
];
