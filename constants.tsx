import { ServiceModule, Plan } from './types';

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