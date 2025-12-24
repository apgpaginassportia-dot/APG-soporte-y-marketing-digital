import React, { useState } from 'react';
import { Icons, SCHOOL_SERVICES, SCHOOL_PLAN_DATA } from '../constants';
import { PlanModal } from './PlanModal';

export const SchoolServices: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <section id="schools" className="py-24 bg-sports-bg border-t border-sports-border relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
           <div className="max-w-3xl">
             <h2 className="text-sports-primary font-bold tracking-[0.2em] uppercase text-xs mb-3">Automatización Educativa</h2>
             <h3 className="text-3xl md:text-5xl font-display font-bold text-sports-dark uppercase tracking-tight leading-none">
               Colegios y AMPAs
             </h3>
             <p className="mt-4 text-sports-gray text-lg font-body leading-relaxed">
               Transformamos la gestión del AMPA con tecnología moderna: <span className="text-sports-primary font-bold">Carnet Digital (Wallet)</span> y control de socios.
             </p>
           </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
           {SCHOOL_SERVICES.map((service, idx) => {
             const IconComponent = Icons[service.iconName as keyof typeof Icons] || Icons.Star;
             return (
               <div key={idx} className="bg-white rounded-xl p-6 border border-sports-border hover:border-sports-primary/30 transition-all duration-300 group flex flex-col shadow-sm">
                  <div className="mb-4 text-sports-gray group-hover:text-sports-primary transition-colors">
                     <IconComponent />
                  </div>
                  <h4 className="text-sports-dark font-bold font-display uppercase text-sm mb-2">
                    {service.title}
                  </h4>
                  <p className="text-sports-gray text-xs leading-relaxed font-body">
                    {service.description}
                  </p>
               </div>
             )
           })}
        </div>
        
        <div className="max-w-3xl mx-auto">
          <div className="relative bg-white rounded-2xl border border-sports-border shadow-xl overflow-hidden">
             <div className="absolute top-0 inset-x-0 h-1 bg-sports-primary"></div>
             
             <div className="p-8 md:p-12 flex flex-col md:flex-row gap-8 md:gap-12 items-center">
                <div className="flex-1 text-center md:text-left">
                   <div className="inline-block px-3 py-1 bg-blue-50 rounded text-sports-primary text-[10px] font-bold uppercase tracking-widest mb-4 border border-blue-100">
                      Tarifa Plana Anual
                   </div>
                   <h4 className="text-3xl font-display font-bold text-sports-dark uppercase mb-2">
                     {SCHOOL_PLAN_DATA.title}
                   </h4>
                   <div className="flex items-baseline justify-center md:justify-start gap-2 mb-4">
                      <span className="text-5xl font-display font-bold text-sports-primary">{SCHOOL_PLAN_DATA.priceDisplay}</span>
                      <span className="text-sports-gray font-bold uppercase text-xs">/ año</span>
                   </div>
                   <p className="text-sports-gray text-sm leading-relaxed mb-6">
                      {SCHOOL_PLAN_DATA.description}
                   </p>
                   <button 
                      onClick={() => setIsModalOpen(true)}
                      className="inline-flex items-center justify-center px-8 py-4 bg-sports-primary text-white font-display font-bold uppercase tracking-wide rounded-xl hover:bg-sports-dark transition-all shadow-lg shadow-blue-200 w-full md:w-auto"
                   >
                      {SCHOOL_PLAN_DATA.buttonText}
                   </button>
                </div>

                <div className="w-full md:w-5/12 bg-blue-50/50 rounded-xl p-6 border border-blue-100">
                   <h5 className="text-sports-dark font-bold uppercase text-xs tracking-widest mb-4 border-b border-blue-100 pb-2">
                     Qué incluye:
                   </h5>
                   <ul className="space-y-3 text-left">
                      {SCHOOL_PLAN_DATA.features.map((feat, i) => (
                        <li key={i} className="flex items-start text-xs text-sports-gray">
                           <div className="mt-1 mr-3 text-sports-primary">
                              <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>
                           </div>
                           <span className="leading-snug">{feat}</span>
                        </li>
                      ))}
                   </ul>
                </div>
             </div>
          </div>
          <p className="text-center text-sports-muted text-xs mt-6 font-body">
            *Precio para centros estándar. Consultar para grandes volúmenes.
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