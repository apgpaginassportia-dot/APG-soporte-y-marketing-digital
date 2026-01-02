import React, { useState } from 'react';
import { PLANS, INDIVIDUAL_SERVICES_RATES, CALENDLY_URL } from '../constants';
import { Plan, PlanFeature } from '../types';
import { PlanModal } from './PlanModal';

export const Services: React.FC = () => {
  const [selectedPlan, setSelectedPlan] = useState<Plan | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  const handleOpenPlan = (plan: Plan) => {
    setSelectedPlan(plan);
    setIsModalOpen(true);
  };

  return (
    <section id="plans" className="py-32 bg-sports-bg relative border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-3xl mx-auto mb-20">
          <h2 className="text-sports-accent font-bold tracking-[0.2em] uppercase text-[10px] mb-4">Planes de Gestión</h2>
          <h3 className="text-4xl md:text-6xl font-display font-black text-white uppercase tracking-tighter mb-8 leading-none">
            Soluciones Directas
          </h3>
          <p className="text-slate-400 font-medium text-lg">
            He simplificado mi oferta para que te centres en lo que importa: <br className="hidden md:block"/> tus jugadores y la competición.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-5xl mx-auto mb-32">
          {PLANS.map((plan) => (
            <div 
              key={plan.id} 
              className={`flex flex-col bg-white/5 border border-white/10 rounded-[3.5rem] transition-all duration-500 hover:-translate-y-2 overflow-hidden ${
                plan.isRecommended ? 'ring-2 ring-sports-accent/30 bg-white/[0.07]' : ''
              }`}
            >
              <div className="p-12 md:p-16 flex flex-col h-full">
                <div className="mb-10">
                  <div className="flex justify-between items-start mb-6">
                    <span className="text-sports-accent text-[9px] font-black uppercase tracking-[0.2em]">{plan.tagline}</span>
                    {plan.isRecommended && (
                      <span className="bg-sports-accent text-sports-dark text-[8px] font-black px-3 py-1.5 rounded-full uppercase tracking-widest">
                        {plan.recommendationLabel}
                      </span>
                    )}
                  </div>
                  <h3 className="text-4xl font-display font-black text-white uppercase mb-2">
                    {plan.title}
                  </h3>
                  <div className="flex items-baseline gap-2">
                    <span className="text-5xl font-display font-black text-white tracking-tighter">{plan.priceDisplay}</span>
                    <span className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">Base</span>
                  </div>
                </div>

                <p className="text-slate-400 font-semibold text-sm mb-10 leading-relaxed italic">
                  "{plan.description}"
                </p>

                <div className="space-y-6 mb-12 flex-1">
                  {plan.features.map((feature, idx) => {
                    const isDetailed = typeof feature !== 'string';
                    const label = isDetailed ? (feature as PlanFeature).label : (feature as string);
                    const description = isDetailed ? (feature as PlanFeature).description : null;
                    const isBasicsInclude = label.toLowerCase().includes('plan básico');

                    return (
                      <div key={idx} className={`flex items-start text-xs group leading-snug p-3 rounded-2xl transition-all ${isBasicsInclude ? 'bg-sports-accent/10 border border-sports-accent/20' : ''}`}>
                        <span className={`${isBasicsInclude ? 'text-sports-accent' : 'text-sports-accent/50'} mr-3 mt-1 flex-shrink-0 group-hover:opacity-100 transition-opacity`}>
                          <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={4}><path d="M5 13l4 4L19 7"/></svg>
                        </span>
                        <div>
                          <span className={`${isBasicsInclude ? 'text-sports-accent' : 'text-slate-200'} font-bold block mb-1 uppercase tracking-wider`}>{label}</span>
                          {description && (
                            <span className="text-slate-500 font-medium block leading-relaxed">{description}</span>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>

                <div className="space-y-3">
                  <button
                    onClick={() => handleOpenPlan(plan)}
                    className={`w-full py-6 rounded-2xl font-display font-black text-[11px] uppercase tracking-[0.2em] transition-all ${
                      plan.isRecommended 
                        ? 'bg-sports-accent text-sports-dark hover:bg-white shadow-xl shadow-lime-900/10' 
                        : 'bg-white/5 text-white hover:bg-white/10 border border-white/10'
                    }`}
                  >
                    {plan.buttonText}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Módulos Especializados */}
        <div id="services-table" className="max-w-5xl mx-auto">
            <div className="text-center mb-12">
              <h4 className="text-white font-display font-black text-2xl uppercase tracking-tighter">¿Necesitas solo una pieza?</h4>
              <p className="text-slate-500 text-xs font-bold uppercase tracking-widest mt-2">Soluciones modulares e independientes</p>
            </div>
            
            <div className="bg-white/5 border border-white/5 rounded-[2.5rem] overflow-hidden">
                {INDIVIDUAL_SERVICES_RATES.map((item, idx) => (
                  <div key={idx} className="flex flex-col md:flex-row items-center justify-between p-8 md:p-10 border-b border-white/5 last:border-0 hover:bg-white/[0.02] transition-colors">
                     <div className="mb-6 md:mb-0 max-w-2xl">
                        <div className="flex items-center gap-3 mb-2">
                          <h5 className="text-white font-bold uppercase text-xs tracking-widest">{item.service}</h5>
                          <span className="text-sports-accent font-display font-black text-sm">{item.price}</span>
                        </div>
                        <p className="text-slate-500 text-[10px] font-medium mb-3 uppercase tracking-tight">{item.description}</p>
                        <p className="text-slate-300 text-[11px] font-semibold leading-relaxed border-l-2 border-sports-accent/30 pl-4 py-1">
                          {item.benefit}
                        </p>
                     </div>
                     <div className="w-full md:w-auto">
                        <button 
                          onClick={() => {
                            const numericPrice = parseInt(item.price.replace(/[^\d]/g, '')) || 0;
                            handleOpenPlan({
                              id: 'basic',
                              title: item.service,
                              priceDisplay: item.price,
                              basePrice: numericPrice,
                              subtitle: 'Servicio Específico',
                              description: item.description,
                              features: [item.description, item.benefit],
                              buttonText: 'Solicitar Info'
                            });
                          }}
                          className="w-full md:w-auto bg-white/5 hover:bg-sports-accent hover:text-sports-dark text-white px-8 py-4 rounded-2xl text-[10px] font-black uppercase tracking-widest border border-white/10 transition-all active:scale-95"
                        >
                          Solicitar Info
                        </button>
                     </div>
                  </div>
                ))}
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