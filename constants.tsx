import { ServiceModule, Plan, CustomFeature } from './types';

export const SERVICE_MODULES: ServiceModule[] = [
  {
    id: 'mod1',
    title: 'Registro Inteligente',
    price: 550,
    features: [
      'Formularios automatizados',
      'Validación de documentación automática',
      'Integración con Sheets/BD en tiempo real',
      'Emails de confirmación automáticos',
      'Control de plazas (stock) en vivo'
    ],
    icon: 'FileSpreadsheet'
  },
  {
    id: 'mod2',
    title: 'Gestión de Autocares',
    price: 850,
    features: [
      'Coordinación de rutas y horarios',
      'Asignación inteligente por expedición',
      'Generación de hojas de ruta (drivers)',
      'Optimización de ocupación de flotas',
      'Cálculo de tiempos de traslado'
    ],
    icon: 'Bus'
  },
  {
    id: 'mod3',
    title: 'Gestión Hotelera',
    price: 1100,
    features: [
      'Rooming lists automáticas',
      'Cálculo de ocupación por equipo',
      'Gestión de cambios y reubicaciones',
      'Informes automáticos para hoteles',
      'Control por tipología de habitación'
    ],
    icon: 'Hotel'
  },
  {
    id: 'mod4',
    title: 'Consultoría y Soporte',
    price: 300,
    isMonthly: true,
    features: [
      'Mejora continua del sistema',
      'Ajustes en automatizaciones',
      'Reunión mensual de seguimiento',
      'Soporte técnico prioritario',
      'Auditoría de procesos post-evento'
    ],
    icon: 'Headset'
  }
];

export const PREDEFINED_PLANS: Plan[] = [
  {
    id: 'basic',
    title: 'Plan Inicio',
    price: 550,
    description: 'Automatización esencial para torneos locales.',
    features: [
      'Formularios inteligentes',
      'Validación de documentos',
      'Base de datos de participantes',
      'Soporte por email'
    ]
  },
  {
    id: 'intermediate',
    title: 'Plan Profesional',
    price: 1250,
    isPopular: true,
    description: 'Para eventos con logística de transporte compleja.',
    features: [
      'Todo lo del Plan Inicio',
      'Gestión integral de autocares',
      'Optimización de rutas',
      'Soporte prioritario'
    ]
  },
  {
    id: 'advanced',
    title: 'Plan Elite',
    price: 2200,
    description: 'La solución completa llave en mano.',
    features: [
      'Todo lo del Plan Profesional',
      'Gestión hotelera automatizada',
      'Rooming lists inteligentes',
      'Dashboard de control total'
    ]
  }
];

export const CUSTOM_PLAN_FEATURES: CustomFeature[] = [
  // Gestión General
  { id: 'f1', title: 'Formularios inteligentes', price: 150, category: 'Gestión' },
  { id: 'f2', title: 'Validación de documentos', price: 120, category: 'Gestión' },
  { id: 'f3', title: 'Base de datos de participantes', price: 100, category: 'Gestión' },
  { id: 'f10', title: 'Dashboard de control total', price: 200, category: 'Gestión' },
  
  // Transporte
  { id: 'f5', title: 'Gestión integral de autocares', price: 250, category: 'Transporte' },
  { id: 'f6', title: 'Optimización de rutas', price: 180, category: 'Transporte' },
  
  // Alojamiento
  { id: 'f8', title: 'Gestión hotelera automatizada', price: 350, category: 'Alojamiento' },
  { id: 'f9', title: 'Rooming lists inteligentes', price: 150, category: 'Alojamiento' },

  // Marketing (Nuevos)
  { id: 'f11', title: 'Generación de contenidos RRSS', price: 150, isMonthly: true, category: 'Marketing' },
  
  // Soporte
  { id: 'f12', title: 'Chatbot IA para participantes', price: 300, category: 'Soporte' },
  { id: 'f4', title: 'Soporte por email', price: 50, isMonthly: true, category: 'Soporte' },
  { id: 'f7', title: 'Soporte prioritario', price: 150, isMonthly: true, category: 'Soporte' },
];