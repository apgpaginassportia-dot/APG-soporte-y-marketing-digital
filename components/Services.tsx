import React, { useState } from 'react';
import { PLANS, Icons } from '../constants';
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
    <section id="plans" className="py-24 bg-sports-navy border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-sports-lime font-bold tracking-[0.2em] uppercase text-xs mb-3">Servicios Modulares</h2>
          <p className="text-4xl md:text-5xl font-display font-bold text-white tracking-tight uppercase">
            Planes de Servicio
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {PLANS.map((plan) => (
            <div 
              key={plan.id} 
              className={`relative flex flex-col rounded-xl transition-all duration-300 group overflow-hidden ${
                plan.isRecommended 
                  ? 'bg-sports-surface border-2 border-sports-blue shadow-[0_0_30px_rgba(23,107,255,0.15)] z-10 transform md:-translate-y-4' 
                  : 'bg-sports-surface border border-white/5 hover:border-sports-lime/50 hover:shadow-lg'
              }`}
            >
              {plan.isRecommended && (
                <div className="absolute top-0 inset-x-0 h-1 bg-sports-blue"></div>
              )}
              {plan.isRecommended && (
                <div className="absolute top-4 right-4 bg-sports-blue text-white px-3 py-1 text-xs font-bold uppercase tracking-wider rounded-sm">
                   Recomendado
                </div>
              )}
              
              <div className="p-8 flex-1 flex flex-col">
                <div className="mb-6">
                  <h3 className="text-2xl font-display font-bold text-white mb-2 uppercase">
                    {plan.title}
                  </h3>
                  <div className="flex items-baseline gap-1 mt-4">
                     <span className="text-4xl font-display font-bold text-white">{plan.priceDisplay}</span>
                  </div>
                  <p className="text-sm text-sports-lime uppercase tracking-widest font-semibold mt-2">
                    {plan.subtitle}
                  </p>
                </div>

                <p className="text-sm mb-8 text-gray-400 leading-relaxed font-body">
                  {plan.description}
                </p>
                
                <ul className="space-y-4 mb-8 flex-1">
                  {plan.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start text-sm text-gray-300 font-body">
                       <span className="mt-0.5 mr-3 flex-shrink-0">
                         <Icons.Check />
                       </span>
                       <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                
                <button
                  onClick={() => handleOpenPlan(plan)}
                  className={`w-full py-4 px-4 font-bold text-sm uppercase tracking-wide transition-all rounded ${
                    plan.isRecommended
                        ? 'bg-sports-blue text-white hover:bg-white hover:text-sports-navy' 
                        : 'bg-white/5 border border-white/10 text-white hover:bg-sports-lime hover:text-sports-navy hover:border-sports-lime'
                  }`}
                >
                  {plan.buttonText}
                </button>
              </div>
            </div>
          ))}
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