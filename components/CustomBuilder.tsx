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
  const MAX_SERVICES = 5;

  const toggleService = (id: string) => {
    if (selectedServices.includes(id)) {
      setSelectedServices(prev => prev.filter(s => s !== id));
    } else {
      if (selectedServices.length >= MAX_SERVICES) return;
      setSelectedServices(prev => [...prev, id]);
    }
  };

  // Memoize the plan object to prevent reference changes on re-renders
  const customPlan: Plan = useMemo(() => ({
    id: 'custom',
    title: 'Plan Personalizado',
    subtitle: 'A la carta',
    priceDisplay: `${totalEstimated}€`,
    basePrice: totalEstimated,
    description: 'Configuración manual de servicios seleccionados adaptada a tus necesidades operativas.',
    features: [],
    buttonText: 'Solicitar Presupuesto'
  }), [totalEstimated]);

  const isValid = selectedServices.length >= MIN_SERVICES && selectedServices.length <= MAX_SERVICES;

  return (
    <section id="builder" className="py-24 bg-sports-dark border-t border-white/5 relative pb-32 md:pb-24">
       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col lg:flex-row gap-12">
         
         {/* Services Grid */}
         <div className="flex-1">
            <div className="mb-10">
              <h2 className="text-sports-lime font-bold tracking-[0.2em] uppercase text-xs mb-3">Diseña tu cobertura</h2>
              <h3 className="text-4xl font-display font-bold text-white uppercase">
                 Configurador Personalizado
              </h3>
              <p className="text-gray-400 mt-4 max-w-2xl font-body">
                Elige entre {MIN_SERVICES} y {MAX_SERVICES} servicios. Precio calculado en tiempo real.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {CUSTOM_SERVICES_LIST.map((service) => {
                const isSelected = selectedServices.includes(service.id);
                const isMaxed = selectedServices.length >= MAX_SERVICES && !isSelected;
                
                return (
                  <div 
                    key={service.id}
                    onClick={() => !isMaxed && toggleService(service.id)}
                    className={`cursor-pointer p-6 rounded-lg border transition-all duration-200 relative overflow-hidden group ${
                       isSelected 
                       ? 'bg-sports-surface border-sports-blue shadow-[0_0_15px_rgba(23,107,255,0.15)]' 
                       : isMaxed
                         ? 'opacity-40 cursor-not-allowed border-white/5 bg-transparent'
                         : 'bg-sports-navy/50 border-white/10 hover:border-sports-lime hover:bg-sports-surface'
                    }`}
                  >
                    <div className="flex justify-between items-start mb-2">
                      <span className={`font-display font-bold text-lg uppercase ${isSelected ? 'text-white' : 'text-gray-300'}`}>
                        {service.label}
                      </span>
                      <div className={`w-6 h-6 rounded flex items-center justify-center border transition-colors ${
                        isSelected ? 'bg-sports-blue border-sports-blue text-white' : 'border-gray-600 group-hover:border-sports-lime text-transparent group-hover:text-sports-lime'
                      }`}>
                        <Icons.Check />
                      </div>
                    </div>
                    
                    <p className="text-sm text-gray-500 mb-4 font-body">{service.description}</p>
                    
                    <div className="flex items-center gap-2">
                       <span className={`text-xl font-bold font-display ${isSelected ? 'text-sports-blue' : 'text-white'}`}>
                         {service.price}€
                       </span>
                    </div>
                  </div>
                );
              })}
            </div>
         </div>

         {/* Desktop Floating Cart / Sidebar */}
         <div className="hidden lg:block lg:w-96">
            <div className="sticky top-24 bg-sports-surface border border-white/10 rounded-xl p-6 shadow-2xl">
               <div className="flex items-center justify-between mb-6 pb-6 border-b border-white/10">
                 <h4 className="font-display font-bold text-xl text-white uppercase">Tu Selección</h4>
                 <div className="flex items-center gap-2">
                    <span className={`text-xs font-bold px-2 py-1 rounded transition-colors ${isValid ? 'bg-sports-lime text-sports-navy' : 'bg-sports-gray text-gray-300'}`}>
                      {selectedServices.length}/{MAX_SERVICES}
                    </span>
                 </div>
               </div>

               {selectedServices.length === 0 ? (
                 <div className="text-center py-12 text-gray-500 text-sm flex flex-col items-center font-body">
                   <span className="italic">Añade módulos para calcular tu presupuesto.</span>
                 </div>
               ) : (
                 <div className="space-y-4 mb-8">
                   <ul className="space-y-3">
                     {selectedServices.map(id => {
                       const service = CUSTOM_SERVICES_LIST.find(s => s.id === id);
                       return (
                         <li key={id} className="flex justify-between items-center text-sm group bg-sports-navy/50 p-3 rounded border border-white/5">
                           <div className="flex-1 pr-4">
                              <div className="text-gray-200 font-medium font-body">{service?.label}</div>
                           </div>
                           <div className="flex items-center gap-3">
                              <span className="text-white font-bold">{service?.price}€</span>
                              <button onClick={() => toggleService(id)} className="text-gray-500 hover:text-red-400 transition-colors">
                                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                              </button>
                           </div>
                         </li>
                       )
                     })}
                   </ul>

                   <div className="border-t border-white/10 pt-6 mt-4">
                      <div className="flex justify-between items-end mb-1">
                        <span className="text-sm text-gray-400 uppercase tracking-wider font-bold">Total</span>
                        <span className="text-3xl font-display font-bold text-white">{totalEstimated}€</span>
                      </div>
                   </div>
                 </div>
               )}

               <div className="space-y-4">
                 {!isValid && (
                   <div className="text-xs text-orange-400 bg-orange-400/10 p-3 rounded border border-orange-400/20 font-body">
                     ⚠️ Selecciona entre {MIN_SERVICES} y {MAX_SERVICES} servicios para continuar.
                   </div>
                 )}
                 <button
                   disabled={!isValid}
                   onClick={() => setIsModalOpen(true)}
                   className="w-full py-4 bg-sports-blue text-white font-display font-bold uppercase tracking-wider hover:bg-sports-lime hover:text-sports-navy disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-sports-blue disabled:hover:text-white transition-all rounded shadow-lg shadow-sports-blue/20"
                 >
                   Finalizar Selección
                 </button>
               </div>
            </div>
         </div>
       </div>

       {/* Mobile Sticky Bottom Bar */}
       <div className={`fixed bottom-0 left-0 right-0 bg-sports-surface border-t border-white/10 p-4 z-40 lg:hidden transition-transform duration-300 transform ${selectedServices.length > 0 ? 'translate-y-0' : 'translate-y-full'}`}>
          <div className="flex items-center justify-between gap-4">
             <div className="flex flex-col">
                <span className="text-[10px] text-gray-400 uppercase tracking-wider">Total Estimado</span>
                <div className="flex items-baseline gap-2">
                   <span className="text-2xl font-display font-bold text-white">{totalEstimated}€</span>
                   <span className={`text-xs font-bold px-1.5 py-0.5 rounded ${isValid ? 'bg-sports-lime text-sports-navy' : 'bg-sports-gray text-gray-300'}`}>
                      {selectedServices.length}/{MAX_SERVICES}
                   </span>
                </div>
             </div>
             <button
                disabled={!isValid}
                onClick={() => setIsModalOpen(true)}
                className="flex-1 max-w-[200px] py-3 bg-sports-blue text-white font-display font-bold text-sm uppercase tracking-wide rounded hover:bg-sports-lime hover:text-sports-navy disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
             >
                {isValid ? 'Finalizar' : 'Elige más'}
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