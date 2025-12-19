
import React, { useState } from 'react';
import { PLANS, Icons, INDIVIDUAL_SERVICES_RATES } from '../constants';
import { Plan } from '../types';
import { PlanModal } from './PlanModal';

export const Services: React.FC = () => {
  const [selectedPlan, setSelectedPlan] = useState<Plan | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  const handleOpenPlan = (plan: Plan) => {
    setSelectedPlan(plan);
    setIsModalOpen(true);
  };

  const getPlanIconColor = (id: string) => {
    switch (id) {
      case 'basic': return 'text-green-500';
      case 'intermediate': return 'text-blue-500';
      case 'advanced': return 'text-red-500';
      default: return 'text-sports-lime';
    }
  };

  return (
    <section id="plans" className="py-24 bg-sports-navy border-t border-white/5 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-sports-lime font-bold tracking-[0.2em] uppercase text-xs mb-3">Gestión de Competiciones</h2>
          <p className="text-4xl md:text-6xl font-display font-bold text-white tracking-tight uppercase drop-shadow-lg">
            Planes para Organizadores de Torneos
          </p>
          <p className="text-gray-400 mt-4 font-body">Soluciones integrales diseñadas específicamente para empresas y entidades que gestionan eventos deportivos.</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto mb-24">
          {PLANS.map((plan) => (
            <div 
              key={plan.id} 
              className={`relative flex flex-col rounded-2xl transition-all duration-500 group overflow-hidden ${
                plan.isRecommended 
                  ? 'bg-[#0f172a] border border-sports-blue/30 shadow-[0_0_50px_rgba(59,130,246,0.1)] z-10 transform md:-translate-y-4' 
                  : 'bg-sports-surface border border-white/5 hover:border-white/20'
              }`}
            >
              {plan.isRecommended && (
                <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-sports-blue to-transparent"></div>
              )}
              {plan.recommendationLabel && (
                <div className="absolute top-4 right-4 bg-sports-blue text-white px-3 py-1 text-[10px] font-bold uppercase tracking-wider rounded shadow-lg">
                   {plan.recommendationLabel}
                </div>
              )}
              
              <div className="p-8 flex-1 flex flex-col relative z-10">
                <div className="mb-6">
                  <div className="flex items-center gap-2 mb-2">
                    <div className={`w-3 h-3 rounded-full ${getPlanIconColor(plan.id)}`}></div>
                    <h3 className="text-2xl font-display font-bold text-white uppercase tracking-wide">
                      {plan.title} {plan.tagline && <span className="text-gray-500">— {plan.tagline}</span>}
                    </h3>
                  </div>
                  
                  <p className="text-sports-blue font-bold text-sm uppercase tracking-wider mb-2">{plan.subtitle}</p>
                  <p className="text-gray-300 text-sm font-body mb-6 leading-relaxed italic border-l-2 border-white/10 pl-4">{plan.description}</p>

                  <div className="mb-6 pt-4 border-t border-white/5">
                    <p className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-4">Incluye:</p>
                    <ul className="space-y-3">
                      {plan.features.map((feature, idx) => (
                        <li key={idx} className="flex items-start text-xs text-gray-400 font-body group-hover:text-white transition-colors">
                           <span className="text-sports-lime mt-0.5 mr-2">✔</span>
                           <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="mt-8 pt-6 border-t border-white/10">
                    <div className="flex items-baseline gap-2 mb-4">
                       <span className="text-gray-500 text-2xl">💰</span>
                       <span className="text-4xl font-display font-bold text-white">{plan.priceDisplay}</span>
                       <span className="text-[10px] text-gray-500 uppercase font-bold tracking-tighter">por torneo</span>
                    </div>

                    <div className="space-y-4">
                      <div className="bg-black/20 p-4 rounded-lg border border-white/5">
                         <div className="flex items-center gap-2 mb-3">
                           <span className="text-lg">💳</span>
                           <p className="text-[10px] font-bold text-sports-blue uppercase tracking-widest">Pago fraccionado por hitos:</p>
                         </div>
                         <div className="space-y-2">
                            {plan.milestones?.map((m, idx) => (
                              <div key={idx} className="flex justify-between text-[11px] font-body">
                                <span className="text-white font-bold">{m.amount}</span>
                                <span className="text-gray-500">{m.label}</span>
                              </div>
                            ))}
                         </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-auto pt-6">
                  {plan.footerLabel && (
                    <p className="text-[10px] text-gray-500 italic mb-4 text-center font-body">
                      👉 {plan.footerLabel}
                    </p>
                  )}
                  <button
                    onClick={() => handleOpenPlan(plan)}
                    className={`w-full py-4 px-4 font-bold text-sm uppercase tracking-wide transition-all rounded-lg ${
                      plan.isRecommended
                          ? 'bg-sports-blue text-white hover:bg-white hover:text-sports-navy shadow-[0_0_20px_rgba(59,130,246,0.3)]' 
                          : 'bg-white/5 border border-white/10 text-white hover:bg-sports-blue hover:text-white hover:border-sports-blue'
                    }`}
                  >
                    [{plan.buttonText}]
                  </button>
                </div>
              </div>
              
              {/* Background gradient for depth */}
              <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/40 pointer-events-none"></div>
            </div>
          ))}
        </div>

        {/* Pricing Table Section */}
        <div id="services-table" className="pt-16 border-t border-white/5 scroll-mt-24">
            <div className="text-center mb-12">
              <h2 className="text-sports-lime font-bold tracking-[0.2em] uppercase text-xs mb-3">Tarifas Individuales</h2>
              <h3 className="text-3xl font-display font-bold text-white uppercase">Servicios a la Carta</h3>
              <p className="text-gray-400 mt-4 text-sm font-body">Contratación independiente fuera de los planes globales para eventos deportivos.</p>
            </div>
            
            <div className="max-w-5xl mx-auto bg-sports-surface rounded-xl border border-white/5 overflow-hidden shadow-2xl">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-black/40 border-b border-white/10">
                      <th className="p-5 text-xs md:text-sm font-bold text-sports-muted uppercase tracking-wider">Servicio</th>
                      <th className="p-5 text-xs md:text-sm font-bold text-sports-muted uppercase tracking-wider hidden md:table-cell">Descripción</th>
                      <th className="p-5 text-xs md:text-sm font-bold text-sports-muted uppercase tracking-wider text-right">Rango de Precio</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5">
                    {INDIVIDUAL_SERVICES_RATES.map((item, idx) => (
                      <tr key={idx} className="hover:bg-white/5 transition-colors group">
                        <td className="p-5 text-white font-bold text-sm font-display uppercase group-hover:text-sports-blue transition-colors duration-300">
                            {item.service}
                            <div className="md:hidden text-xs text-gray-500 font-body mt-1 font-normal normal-case">{item.description}</div>
                        </td>
                        <td className="p-5 text-gray-400 text-sm font-body hidden md:table-cell">{item.description}</td>
                        <td className="p-5 text-sports-lime font-bold text-sm font-mono text-right whitespace-nowrap drop-shadow-md">{item.price}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
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
