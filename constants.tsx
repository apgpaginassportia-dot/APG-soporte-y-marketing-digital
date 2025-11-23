import React from 'react';
import { Plan, CustomServiceOption, ServiceCatalogItem } from './types';

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
  )
};

// Prices reflect market averages for calculation
export const CUSTOM_SERVICES_LIST: CustomServiceOption[] = [
  { id: 'inscripciones', label: 'Inscripciones', description: 'Digitalización y gestión documental.', price: 200, unit: 'base' }, // Avg of 150-250
  { id: 'logistica_autocares', label: 'Autocares', description: 'Coordinación rutas y horarios.', price: 550, unit: 'base' }, // Avg of 400-700
  { id: 'logistica_hoteles', label: 'Hoteles', description: 'Asignación de equipos en hoteles ya concertados.', price: 950, unit: 'base' }, // Avg of 700-1200
  { id: 'atencion_delegaciones', label: 'Atención Delegaciones', description: 'Soporte y acompañamiento.', price: 225, unit: 'base' }, // Avg of 150-300
  { id: 'coordinacion_horarios', label: 'Coordinación Sedes', description: 'Control de calendario deportivo.', price: 275, unit: 'base' }, // Avg of 200-350
];

export const PLANS: Plan[] = [
  {
    id: 'basic',
    title: 'Plan Básico',
    priceDisplay: '550€',
    basePrice: 550,
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
    priceDisplay: '1.250€',
    basePrice: 1250,
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
    priceDisplay: '2.200€',
    basePrice: 2200,
    subtitle: 'Gestión Integral 360°',
    description: 'Despreocúpate por completo de la logística.',
    isRecommended: true,
    details: 'La experiencia definitiva. Incluye gestión de inscripciones, transporte y alojamiento (asignación) para equipos.',
    buttonText: 'Ver detalles',
    features: [
      'Todo lo del Plan Intermedio',
      'Gestión logística de hoteles (asignación)',
      'Asignación de habitaciones (Rooming)',
      'Hoteles previamente contactados',
      'Apoyo a delegaciones'
    ]
  }
];

export const SERVICE_CATALOG: ServiceCatalogItem[] = [
  { title: "Evita errores en la gestión de equipos", iconName: "Users" },
  { title: "Coordino rutas y horarios sin retrasos", iconName: "Bus" },
  { title: "Gestiono hoteles sin caos ni cambios inesperados", iconName: "Hotel" },
];