
import React, { useState } from 'react';
import { PLANS, INDIVIDUAL_SERVICES_RATES, CALENDLY_URL } from '../constants';
import { Plan } from '../types';
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
          <h2 className="text-sports-accent font-bold tracking-[0.2em] uppercase text-[10px] mb-4">Propuestas de Valor</h2>
          <h3 className="text-4xl md:text-6xl font-display font-black text-white uppercase tracking-tighter mb-8 leading-none">
            Inversión Estratégica
          </h3>
          <p className="text-slate-400 font-medium text-lg">
            Planes escalables según el volumen de tu evento. <br className="hidden md:block"/> Todos los precios excluyen IVA para mayor claridad operativa.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-32">
          {PLANS.map((plan) => (
            <div 
              key={plan.id} 
              className={`flex flex-col bg-white/5 border border-white/10 rounded-[3rem] transition-all duration-500 hover:-translate-y-2 overflow-hidden ${
                plan.isRecommended ? 'ring-2 ring-sports-accent/30 bg-white/[0.07]' : ''
              }`}
            >
              <div className="p-12 flex flex-col h-full">
                <div className="mb-10">
                  <div className="flex justify-between items-start mb-6">
                    <span className="text-sports-accent text-[9px] font-black uppercase tracking-[0.2em]">{plan.tagline}</span>
                    {plan.isRecommended && (
                      <span className="bg-sports-accent text-sports-dark text-[8px] font-black px-2 py-1 rounded-md uppercase">Top Seller</span>
                    )}
                  </div>
                  <h3 className="text-3xl font-display font-black text-white uppercase mb-2">
                    {plan.title}
                  </h3>
                  <div className="flex items-baseline gap-2">
                    <span className="text-5xl font-display font-black text-white tracking-tighter">{plan.priceDisplay}</span>
                    <span className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">Base</span>
                  </div>
                </div>

                <div className="space-y-4 mb-10 flex-1">
                  {plan.features.map((feature, idx) => (
                    <div key={idx} className="flex items-start text-[11px] text-slate-400 font-semibold group">
                       <span className="text-sports-accent mr-3 mt-1 opacity-50 group-hover:opacity-100 transition-opacity">
                         <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={4}><path d="M5 13l4 4L19 7"/></svg>
                       </span>
                       <span className="leading-snug">{feature}</span>
                    </div>
                  ))}
                </div>

                {/* Micro-table for milestones */}
                {plan.milestones && (
                   <div className="mb-10 p-5 bg-white/5 rounded-2xl border border-white/5">
                      <div className="text-[8px] font-black text-slate-500 uppercase tracking-widest mb-4 flex items-center justify-between">
                        <span>Pago Fraccionado (30/40/30)</span>
                        <span className="w-1 h-1 rounded-full bg-sports-accent"></span>
                      </div>
                      <div className="grid grid-cols-3 gap-2">
                         {plan.milestones.map((ms, idx) => (
                            <div key={idx} className="flex flex-col">
                               <span className="text-[9px] text-white font-black">{ms.amount}</span>
                               <span className="text-[7px] text-slate-500 uppercase font-bold">{ms.label.split(' ')[0]}</span>
                            </div>
                         ))}
                      </div>
                   </div>
                )}

                <div className="space-y-3">
                  <button
                    onClick={() => handleOpenPlan(plan)}
                    className={`w-full py-5 rounded-2xl font-display font-black text-[10px] uppercase tracking-[0.2em] transition-all ${
                      plan.isRecommended 
                        ? 'bg-sports-accent text-sports-dark hover:bg-white shadow-xl shadow-lime-900/10' 
                        : 'bg-white/5 text-white hover:bg-white/10 border border-white/10'
                    }`}
                  >
                    Solicitar Auditoría Gratuita
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Individual Services Table - Simplified and Cleaned */}
        <div id="services-table" className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h4 className="text-white font-display font-black text-2xl uppercase tracking-tighter">Módulos Especializados</h4>
            </div>
            
            <div className="bg-white/5 border border-white/5 rounded-[2.5rem] overflow-hidden">
                {INDIVIDUAL_SERVICES_RATES.map((item, idx) => (
                  <div key={idx} className="flex flex-col md:flex-row items-center justify-between p-8 border-b border-white/5 last:border-0 hover:bg-white/[0.02] transition-colors">
                     <div className="mb-4 md:mb-0">
                        <h5 className="text-white font-bold uppercase text-xs tracking-widest mb-1">{item.service}</h5>
                        <p className="text-slate-500 text-[10px] font-medium">{item.description}</p>
                     </div>
                     <div className="flex items-center gap-6">
                        <span className="text-sports-accent font-display font-black text-sm">{item.price}</span>
                        <button 
                          onClick={() => handleOpenPlan({
                            id: 'custom',
                            title: item.service,
                            priceDisplay: item.price,
                            basePrice: 0,
                            subtitle: 'Módulo Técnico',
                            description: item.description,
                            features: [item.description],
                            buttonText: 'Solicitar Auditoría Gratuita'
                          })}
                          className="bg-white/5 hover:bg-white/10 text-white px-6 py-2 rounded-xl text-[9px] font-bold uppercase tracking-widest border border-white/10 transition-all"
                        >
                          Info
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
