import React, { useState } from 'react';
import { PLANS, INDIVIDUAL_SERVICES_RATES } from '../constants';
import { Plan } from '../types';
import { PlanModal } from './PlanModal';

export const Services: React.FC = () => {
  const [selectedPlan, setSelectedPlan] = useState<Plan | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [expandedService, setExpandedService] = useState<number | null>(null);
  
  const handleOpenPlan = (plan: Plan) => {
    setSelectedPlan(plan);
    setIsModalOpen(true);
  };

  const toggleMobileService = (index: number) => {
    setExpandedService(expandedService === index ? null : index);
  };

  const getPlanAccentColor = (id: string) => {
    switch (id) {
      case 'basic': return 'border-sports-border';
      case 'intermediate': return 'border-sports-primary';
      case 'advanced': return 'border-sports-accent';
      default: return 'border-sports-border';
    }
  };

  return (
    <section id="plans" className="py-24 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-4xl mx-auto mb-16">
          <h2 className="text-sports-primary font-bold tracking-[0.2em] uppercase text-xs mb-3">Escalabilidad Operativa</h2>
          <h2 className="text-3xl md:text-5xl font-display font-extrabold text-sports-dark uppercase tracking-tight mb-6">
            Planes de Gestión Profesional
          </h2>
          <p className="text-sports-gray font-body text-lg max-w-2xl mx-auto leading-relaxed">
            Soluciones estructuradas para organizadores que exigen eficiencia, control y una experiencia de usuario superior.
          </p>
        </div>

        {/* Horizontal Card Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-20">
          {PLANS.map((plan) => (
            <div 
              key={plan.id} 
              className={`flex flex-col bg-white border-2 rounded-[2rem] transition-all duration-300 hover:shadow-2xl overflow-hidden ${getPlanAccentColor(plan.id)} ${
                plan.isRecommended ? 'ring-4 ring-sports-primary/5 scale-105 z-10' : 'scale-100'
              }`}
            >
              {plan.recommendationLabel && (
                <div className="bg-sports-primary text-white text-center py-2.5 text-[10px] font-bold uppercase tracking-widest">
                   {plan.recommendationLabel}
                </div>
              )}

              <div className="p-10 flex flex-col h-full">
                <div className="mb-8">
                  <h3 className="text-2xl font-display font-bold text-sports-dark uppercase mb-1">
                    {plan.title}
                  </h3>
                  <p className="text-sports-primary text-[10px] font-bold uppercase tracking-wider mb-6">
                    {plan.tagline}
                  </p>
                  <div className="flex items-baseline gap-1">
                    <span className="text-5xl font-display font-extrabold text-sports-dark">{plan.priceDisplay}</span>
                    <span className="text-sm text-sports-gray font-bold uppercase">/ base</span>
                  </div>
                </div>

                <p className="text-sports-gray text-sm font-body leading-relaxed mb-10 flex-1">
                  {plan.description}
                </p>

                <div className="space-y-4 mb-10">
                  {plan.features.slice(0, 5).map((feature, idx) => (
                    <div key={idx} className="flex items-start text-xs text-sports-dark font-medium">
                       <span className="text-sports-success mr-3 font-bold text-base">✓</span>
                       <span className="leading-snug">{feature}</span>
                    </div>
                  ))}
                </div>

                <button
                  onClick={() => handleOpenPlan(plan)}
                  className={`w-full py-5 rounded-2xl font-display font-bold text-xs uppercase tracking-widest transition-all ${
                    plan.id === 'advanced' 
                      ? 'bg-sports-accent text-sports-dark hover:bg-lime-400 shadow-xl shadow-lime-200' 
                      : plan.isRecommended
                        ? 'bg-sports-primary text-white hover:bg-indigo-700 shadow-xl shadow-indigo-100'
                        : 'bg-slate-100 text-sports-dark hover:bg-sports-primary hover:text-white'
                  }`}
                >
                  {plan.buttonText}
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Individual Services Section */}
        <div id="services-table" className="pt-20 border-t border-sports-border">
            <div className="text-center mb-12">
              <h2 className="text-sports-primary font-bold tracking-[0.2em] uppercase text-xs mb-3">Módulos Flexibles</h2>
              <h3 className="text-2xl md:text-4xl font-display font-bold text-sports-dark uppercase tracking-tight">Servicios Individuales</h3>
              <p className="mt-2 text-sports-gray text-base font-body">Configura tu propia operativa seleccionando módulos específicos.</p>
            </div>
            
            <div className="hidden md:block max-w-5xl mx-auto bg-white border border-sports-border rounded-3xl overflow-hidden shadow-xl shadow-slate-200/50">
              <table className="w-full text-left">
                <thead>
                  <tr className="bg-slate-50 border-b border-sports-border">
                    <th className="p-8 text-[11px] font-bold text-sports-gray uppercase tracking-widest">Servicio</th>
                    <th className="p-8 text-[11px] font-bold text-sports-gray uppercase tracking-widest">Descripción</th>
                    <th className="p-8 text-[11px] font-bold text-sports-gray uppercase tracking-widest text-right">Inversión</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-sports-border">
                  {INDIVIDUAL_SERVICES_RATES.map((item, idx) => (
                    <tr key={idx} className="hover:bg-indigo-50/20 transition-colors group">
                      <td className="p-8 text-sports-dark font-bold text-sm uppercase group-hover:text-sports-primary transition-colors">
                          {item.service}
                      </td>
                      <td className="p-8 text-sports-gray text-xs leading-relaxed font-body">{item.description}</td>
                      <td className="p-8 text-sports-dark font-bold text-sm text-right whitespace-nowrap">
                        <span className="bg-indigo-50 text-sports-primary px-4 py-1.5 rounded-full text-xs border border-indigo-100">{item.price}</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Mobile Cards View */}
            <div className="md:hidden space-y-4 max-w-md mx-auto">
              {INDIVIDUAL_SERVICES_RATES.map((item, idx) => (
                <div 
                  key={idx} 
                  className={`bg-white border-2 rounded-2xl overflow-hidden transition-all duration-300 ${expandedService === idx ? 'border-sports-primary shadow-lg' : 'border-sports-border'}`}
                >
                  <button 
                    onClick={() => toggleMobileService(idx)}
                    className="w-full p-6 text-left flex justify-between items-center group"
                  >
                    <div className="flex-1 pr-4">
                      <h4 className={`text-sm font-bold uppercase tracking-wide transition-colors ${expandedService === idx ? 'text-sports-primary' : 'text-sports-dark'}`}>
                        {item.service}
                      </h4>
                      <div className="mt-1 flex items-baseline gap-2">
                        <span className="text-[10px] text-sports-gray uppercase font-bold">Desde:</span>
                        <span className="text-sm font-bold text-sports-primary">{item.price}</span>
                      </div>
                    </div>
                    <div className={`transition-transform duration-300 ${expandedService === idx ? 'rotate-180 text-sports-primary' : 'text-sports-muted'}`}>
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
                      </svg>
                    </div>
                  </button>
                  
                  <div 
                    className={`overflow-hidden transition-all duration-300 ease-in-out ${expandedService === idx ? 'max-h-52 opacity-100' : 'max-h-0 opacity-0'}`}
                  >
                    <div className="px-6 pb-6 pt-0 border-t border-slate-50">
                      <p className="text-xs text-sports-gray leading-relaxed font-body py-4">
                        {item.description}
                      </p>
                      <button 
                        onClick={() => handleOpenPlan({
                          id: 'custom',
                          title: item.service,
                          priceDisplay: item.price,
                          basePrice: 0,
                          subtitle: 'Servicio Individual',
                          description: item.description,
                          features: [item.description],
                          buttonText: 'Solicitar Información'
                        })}
                        className="w-full mt-2 py-4 bg-sports-primary text-white text-[10px] font-bold uppercase tracking-widest rounded-xl hover:bg-sports-dark transition-colors"
                      >
                        Más Detalles
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="mt-12 text-center">
              <p className="text-[10px] text-sports-muted uppercase font-bold tracking-[0.2em]">
                * IVA no incluido. Consultar para eventos fuera de temporada.
              </p>
            </div>
        </div>

      </div>

      <PlanModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        selectedPlan={selectedPlan} 
      />
    </section>
  );
};