
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
                  ? 'bg-[#0f172a] border border-sports-lime/50 shadow-[0_0_50px_rgba(163,230,53,0.15)] z-10 transform md:-translate-y-4' 
                  : 'bg-sports-surface border border-white/5 hover:border-sports-blue/50 hover:shadow-[0_0_30px_rgba(59,130,246,0.2)]'
              }`}
            >
              {plan.isRecommended && (
                <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-sports-lime to-transparent"></div>
              )}
              {plan.isRecommended && (
                <div className="absolute top-4 right-4 bg-sports-lime text-sports-navy px-3 py-1 text-xs font-bold uppercase tracking-wider rounded shadow-lg animate-pulse-slow">
                   Más Popular
                </div>
              )}
              
              <div className="p-8 flex-1 flex flex-col relative z-10">
                <div className="mb-6">
                  <h3 className={`text-2xl font-display font-bold mb-2 uppercase tracking-wide ${plan.isRecommended ? 'text-white' : 'text-gray-200'}`}>
                    {plan.title}
                  </h3>
                  <div className="flex flex-col mt-4">
                     <div className="flex items-baseline gap-2">
                        <span className={`text-5xl font-display font-bold ${plan.isRecommended ? 'text-sports-lime' : 'text-white'}`}>
                           {plan.priceDisplay}
                        </span>
                        <span className="text-[10px] text-gray-500 uppercase tracking-widest font-bold">Un único pago</span>
                     </div>
                     {plan.monthlyPriceDisplay && (
                       <div className="mt-2 flex items-center gap-2">
                          <span className="text-sports-blue font-bold text-lg font-display">o {plan.monthlyPriceDisplay}</span>
                          <span className="bg-sports-blue/10 text-sports-blue text-[9px] px-1.5 py-0.5 rounded border border-sports-blue/20 font-bold uppercase tracking-tighter">Suscripción Anual</span>
                       </div>
                     )}
                  </div>
                  <p className={`text-sm uppercase tracking-widest font-bold mt-6 ${plan.isRecommended ? 'text-white' : 'text-sports-blue'}`}>
                    {plan.subtitle}
                  </p>
                </div>

                <p className="text-sm mb-8 text-gray-400 leading-relaxed font-body border-t border-white/5 pt-4">
                  {plan.description}
                </p>
                
                <ul className="space-y-4 mb-8 flex-1">
                  {plan.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start text-sm text-gray-300 font-body group-hover:text-white transition-colors">
                       <span className={`mt-0.5 mr-3 flex-shrink-0 ${plan.isRecommended ? 'text-sports-lime' : 'text-sports-blue'}`}>
                         <Icons.Check />
                       </span>
                       <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                
                <button
                  onClick={() => handleOpenPlan(plan)}
                  className={`w-full py-4 px-4 font-bold text-sm uppercase tracking-wide transition-all rounded-lg ${
                    plan.isRecommended
                        ? 'bg-sports-lime text-sports-navy hover:bg-white hover:text-sports-navy shadow-[0_0_20px_rgba(163,230,53,0.3)]' 
                        : 'bg-white/5 border border-white/10 text-white hover:bg-sports-blue hover:text-white hover:border-sports-blue'
                  }`}
                >
                  {plan.buttonText}
                </button>
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
