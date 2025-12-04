import React, { useState } from 'react';
import { Icons, SCHOOL_SERVICES, SCHOOL_PLAN_DATA } from '../constants';
import { PlanModal } from './PlanModal';

export const SchoolServices: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <section id="schools" className="py-24 bg-[#0F1C2E] border-t border-white/5 relative">
      {/* Subtle distinction background */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-sports-blue/5 to-transparent pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
           <div className="max-w-3xl">
             <h2 className="text-sports-lime font-bold tracking-[0.2em] uppercase text-xs mb-3">Automatización Educativa</h2>
             <h3 className="text-3xl md:text-5xl font-display font-bold text-white uppercase tracking-tight leading-none">
               Soluciones para Colegios y AMPAs
             </h3>
             <p className="mt-4 text-gray-400 text-lg font-body leading-relaxed">
               Transformamos la gestión del AMPA con tecnología moderna: <span className="text-white font-bold">Carnet Digital (Wallet)</span> y control de socios.
             </p>
           </div>
        </div>

        {/* Services Grid (Benefits) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
           {SCHOOL_SERVICES.map((service, idx) => {
             const IconComponent = Icons[service.iconName as keyof typeof Icons] || Icons.Star;
             return (
               <div key={idx} className="bg-sports-surface/50 rounded-lg p-6 border border-white/5 hover:bg-sports-surface hover:border-sports-lime/30 transition-all duration-300 group flex flex-col">
                  <div className="mb-4 text-sports-gray group-hover:text-sports-lime transition-colors">
                     <IconComponent />
                  </div>
                  <h4 className="text-white font-bold font-display uppercase text-sm mb-2 group-hover:text-sports-lime transition-colors">
                    {service.title}
                  </h4>
                  <p className="text-gray-500 text-xs leading-relaxed font-body group-hover:text-gray-300 transition-colors">
                    {service.description}
                  </p>
               </div>
             )
           })}
        </div>
        
        {/* Single Pricing Plan Card */}
        <div className="max-w-3xl mx-auto">
          <div className="relative bg-sports-navy rounded-2xl border border-sports-blue shadow-[0_0_40px_rgba(23,107,255,0.15)] overflow-hidden">
             <div className="absolute top-0 inset-x-0 h-1 bg-sports-blue"></div>
             
             <div className="p-8 md:p-12 flex flex-col md:flex-row gap-8 md:gap-12 items-center">
                <div className="flex-1">
                   <div className="inline-block px-3 py-1 bg-sports-blue/10 rounded text-sports-blue text-[10px] font-bold uppercase tracking-widest mb-4 border border-sports-blue/20">
                      Tarifa Plana Anual
                   </div>
                   <h4 className="text-3xl font-display font-bold text-white uppercase mb-2">
                     {SCHOOL_PLAN_DATA.title}
                   </h4>
                   <div className="flex items-baseline gap-2 mb-4">
                      <span className="text-5xl font-display font-bold text-sports-lime">{SCHOOL_PLAN_DATA.priceDisplay}</span>
                      <span className="text-gray-500 font-bold uppercase text-xs">/ año</span>
                   </div>
                   <p className="text-gray-400 text-sm leading-relaxed mb-6">
                      {SCHOOL_PLAN_DATA.description}
                   </p>
                   <button 
                      onClick={() => setIsModalOpen(true)}
                      className="inline-flex items-center justify-center px-8 py-4 bg-sports-blue text-white font-display font-bold uppercase tracking-wide rounded hover:bg-white hover:text-sports-navy transition-all shadow-lg shadow-sports-blue/20 w-full md:w-auto"
                   >
                      {SCHOOL_PLAN_DATA.buttonText}
                   </button>
                </div>

                <div className="w-full md:w-5/12 bg-sports-surface/50 rounded-xl p-6 border border-white/5">
                   <h5 className="text-white font-bold uppercase text-xs tracking-widest mb-4 border-b border-white/10 pb-2">
                     Qué incluye:
                   </h5>
                   <ul className="space-y-3">
                      {SCHOOL_PLAN_DATA.features.map((feat, i) => (
                        <li key={i} className="flex items-start text-xs text-gray-300">
                           <div className="mt-1 mr-3 w-4 h-4 rounded-full bg-sports-blue/20 flex items-center justify-center flex-shrink-0 text-sports-blue">
                              <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>
                           </div>
                           <span className="leading-snug">{feat}</span>
                        </li>
                      ))}
                   </ul>
                </div>
             </div>
          </div>
          <p className="text-center text-gray-500 text-xs mt-6 font-body">
            *Precio para centros estándar. Consultar para grandes volúmenes o personalizaciones a medida.
          </p>
        </div>

      </div>

      <PlanModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        selectedPlan={SCHOOL_PLAN_DATA} 
      />
    </section>
  );
};