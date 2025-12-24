import React, { useState, useEffect, useMemo } from 'react';
import { CUSTOM_SERVICES_LIST, Icons } from '../constants';
import { PlanModal } from './PlanModal';
import { Plan } from '../types';

export const CustomBuilder: React.FC = () => {
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [totalEstimated, setTotalEstimated] = useState(0);

  // Recalculate total whenever selection changes
  useEffect(() => {
    const sum = selectedServices.reduce((acc, id) => {
      const service = CUSTOM_SERVICES_LIST.find(s => s.id === id);
      return acc + (service?.price || 0);
    }, 0);
    setTotalEstimated(sum);
  }, [selectedServices]);

  const MIN_SERVICES = 2;
  const MAX_SERVICES = 8;

  const toggleService = (id: string) => {
    if (selectedServices.includes(id)) {
      setSelectedServices(prev => prev.filter(s => s !== id));
    } else {
      if (selectedServices.length >= MAX_SERVICES) return;
      setSelectedServices(prev => [...prev, id]);
    }
  };

  const customPlan: Plan = useMemo(() => ({
    id: 'custom',
    title: 'Plan Personalizado',
    subtitle: 'Módulos a Medida',
    priceDisplay: `${totalEstimated}€`,
    basePrice: totalEstimated,
    description: 'Configuración manual de módulos de automatización seleccionados para tu evento.',
    features: [],
    buttonText: 'Solicitar Presupuesto'
  }), [totalEstimated]);

  const isValid = selectedServices.length >= MIN_SERVICES && selectedServices.length <= MAX_SERVICES;

  return (
    <section id="builder" className="py-24 bg-sports-dark border-t border-white/5 relative pb-32 md:pb-24 overflow-hidden">
       {/* Decorative BG element */}
       <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-sports-primary/5 rounded-full blur-[150px] pointer-events-none"></div>

       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col xl:flex-row gap-16 relative z-10">
         
         {/* Services Grid */}
         <div className="flex-1">
            <div className="mb-12">
              <h2 className="text-sports-accent font-bold tracking-[0.3em] uppercase text-xs mb-4">Personalización Total</h2>
              <h3 className="text-4xl md:text-5xl font-display font-extrabold text-white uppercase tracking-tight">
                 Configurador Pro
              </h3>
              <p className="text-slate-400 mt-6 max-w-2xl font-body text-lg">
                Diseña tu propia cobertura operativa. Selecciona los módulos que tu evento realmente necesita y obtén una estimación inmediata.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {CUSTOM_SERVICES_LIST.map((service) => {
                const isSelected = selectedServices.includes(service.id);
                const isMaxed = selectedServices.length >= MAX_SERVICES && !isSelected;
                
                return (
                  <div 
                    key={service.id}
                    onClick={() => !isMaxed && toggleService(service.id)}
                    className={`cursor-pointer p-8 rounded-3xl border-2 transition-all duration-300 relative group ${
                       isSelected 
                       ? 'bg-sports-surface border-sports-accent shadow-[0_0_30px_rgba(190,242,100,0.1)]' 
                       : isMaxed
                         ? 'opacity-30 cursor-not-allowed border-white/5 bg-transparent'
                         : 'bg-white/5 border-white/10 hover:border-sports-accent/50 hover:bg-white/10'
                    }`}
                  >
                    <div className="flex justify-between items-start mb-4">
                      <span className={`font-display font-bold text-lg uppercase tracking-wide ${isSelected ? 'text-white' : 'text-slate-300'}`}>
                        {service.label}
                      </span>
                      <div className={`w-6 h-6 rounded-lg flex items-center justify-center border-2 transition-all duration-300 ${
                        isSelected 
                          ? 'bg-sports-accent border-sports-accent text-sports-dark scale-110' 
                          : 'border-white/20 group-hover:border-sports-accent/50'
                      }`}>
                        {isSelected && <Icons.Check />}
                      </div>
                    </div>
                    
                    <p className="text-sm text-slate-400 mb-6 font-body leading-relaxed">{service.description}</p>
                    
                    <div className="flex items-center justify-between mt-auto">
                       <span className={`text-2xl font-display font-bold ${isSelected ? 'text-sports-accent' : 'text-white'}`}>
                         {service.price}€
                       </span>
                       <span className="text-[10px] text-slate-500 uppercase tracking-widest font-bold font-display">{service.unit}</span>
                    </div>
                  </div>
                );
              })}
            </div>
         </div>

         {/* Sidebar Summary */}
         <div className="hidden xl:block xl:w-96">
            <div className="sticky top-28 bg-sports-surface border-2 border-white/10 rounded-[2.5rem] p-8 shadow-2xl">
               <div className="flex items-center justify-between mb-8 pb-8 border-b border-white/5">
                 <h4 className="font-display font-bold text-xl text-white uppercase tracking-tight">Presupuesto</h4>
                 <div className="flex items-center gap-2">
                    <span className={`text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-widest transition-colors ${isValid ? 'bg-sports-accent text-sports-dark' : 'bg-slate-700 text-slate-400'}`}>
                      {selectedServices.length} MODS
                    </span>
                 </div>
               </div>

               {selectedServices.length === 0 ? (
                 <div className="text-center py-16 text-slate-500 text-sm flex flex-col items-center font-body italic px-4">
                   Selecciona módulos de la izquierda para generar tu plan a medida.
                 </div>
               ) : (
                 <div className="space-y-6 mb-10">
                   <ul className="space-y-3 max-h-[350px] overflow-y-auto custom-scrollbar pr-2">
                     {selectedServices.map(id => {
                       const service = CUSTOM_SERVICES_LIST.find(s => s.id === id);
                       return (
                         <li key={id} className="flex justify-between items-center text-sm group bg-white/5 p-4 rounded-2xl border border-white/5 hover:border-white/10 transition-colors">
                           <div className="flex-1 pr-4">
                              <div className="text-slate-200 font-bold uppercase text-[10px] tracking-wide">{service?.label}</div>
                           </div>
                           <div className="flex items-center gap-4">
                              <span className="text-white font-bold">{service?.price}€</span>
                              <button onClick={() => toggleService(id)} className="text-slate-500 hover:text-red-400 transition-colors">
                                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" /></svg>
                              </button>
                           </div>
                         </li>
                       )
                     })}
                   </ul>

                   <div className="border-t border-white/5 pt-8">
                      <div className="flex justify-between items-end">
                        <span className="text-xs text-slate-500 uppercase tracking-[0.2em] font-bold mb-1">Total Estimado</span>
                        <span className="text-4xl font-display font-bold text-white tracking-tighter">{totalEstimated}€</span>
                      </div>
                   </div>
                 </div>
               )}

               <div className="space-y-4">
                 {!isValid && selectedServices.length > 0 && (
                   <div className="text-[10px] text-indigo-400 bg-indigo-500/10 p-4 rounded-xl border border-indigo-500/20 font-bold uppercase tracking-wider text-center">
                     Mínimo {MIN_SERVICES} módulos requeridos
                   </div>
                 )}
                 <button
                   disabled={!isValid}
                   onClick={() => setIsModalOpen(true)}
                   className="w-full py-5 bg-sports-accent text-sports-dark font-display font-extrabold uppercase tracking-[0.1em] hover:bg-white disabled:opacity-30 disabled:cursor-not-allowed transition-all rounded-2xl shadow-xl shadow-lime-900/20"
                 >
                   Solicitar este Pack
                 </button>
               </div>
            </div>
         </div>
       </div>

       {/* Mobile Sticky Bottom Bar */}
       <div className={`fixed bottom-0 left-0 right-0 bg-sports-surface/95 backdrop-blur-md border-t border-white/10 p-5 z-40 xl:hidden transition-transform duration-500 transform ${selectedServices.length > 0 ? 'translate-y-0' : 'translate-y-full'}`}>
          <div className="flex items-center justify-between gap-6">
             <div className="flex flex-col">
                <span className="text-[10px] text-slate-500 uppercase tracking-widest font-bold">Inversión Base</span>
                <div className="flex items-baseline gap-3">
                   <span className="text-3xl font-display font-bold text-white">{totalEstimated}€</span>
                   <span className={`text-[10px] font-bold px-2 py-0.5 rounded transition-colors ${isValid ? 'bg-sports-accent text-sports-dark' : 'bg-slate-700 text-slate-400'}`}>
                      {selectedServices.length}
                   </span>
                </div>
             </div>
             <button
                disabled={!isValid}
                onClick={() => setIsModalOpen(true)}
                className="flex-1 py-4 bg-sports-accent text-sports-dark font-display font-extrabold text-xs uppercase tracking-widest rounded-xl hover:bg-white disabled:opacity-30 transition-colors"
             >
                {isValid ? 'Confirmar' : 'Añadir más'}
             </button>
          </div>
       </div>

       <PlanModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        selectedPlan={customPlan}
        preselectedServices={selectedServices}
      />
    </section>
  );
};