
import React, { useState, useEffect, useMemo } from 'react';
import { CUSTOM_SERVICES_LIST, Icons } from '../constants';
import { PlanModal } from './PlanModal';
import { Plan } from '../types';

export const CustomBuilder: React.FC = () => {
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [totalEstimated, setTotalEstimated] = useState(0);

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
    subtitle: 'Arquitectura Modular',
    priceDisplay: `${totalEstimated}€`,
    basePrice: totalEstimated,
    description: 'Configuración de módulos de automatización seleccionados para tu evento.',
    features: [],
    buttonText: 'Solicitar Auditoría Gratuita'
  }), [totalEstimated]);

  const isValid = selectedServices.length >= MIN_SERVICES;

  return (
    <section id="builder" className="py-32 bg-sports-bg relative pb-32 xl:pb-24">
       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
         <div className="grid xl:grid-cols-12 gap-16 items-start">
           
           <div className="xl:col-span-8">
              <div className="mb-16">
                <h2 className="text-sports-accent font-bold tracking-[0.2em] uppercase text-[10px] mb-4">Configurador a Medida</h2>
                <h3 className="text-4xl md:text-6xl font-display font-black text-white uppercase tracking-tighter leading-none mb-8">
                  Diseña tu <br/><span className="text-slate-500">Operativa</span>
                </h3>
                <p className="text-slate-400 max-w-xl text-lg font-medium leading-relaxed">
                  Selecciona los módulos críticos para tu torneo. Combinamos tecnología y gestión para adaptarnos a tu presupuesto.
                </p>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                {CUSTOM_SERVICES_LIST.map((service) => {
                  const isSelected = selectedServices.includes(service.id);
                  const isMaxed = selectedServices.length >= MAX_SERVICES && !isSelected;
                  
                  return (
                    <button 
                      key={service.id}
                      onClick={() => !isMaxed && toggleService(service.id)}
                      className={`text-left p-10 rounded-[2.5rem] border transition-all duration-500 group relative outline-none ${
                        isSelected 
                        ? 'bg-white border-white shadow-2xl' 
                        : isMaxed
                          ? 'opacity-20 cursor-not-allowed border-white/5'
                          : 'bg-white/5 border-white/10 hover:border-white/30'
                      }`}
                    >
                      <div className="flex justify-between items-start mb-10">
                        <div className={`w-12 h-12 rounded-2xl flex items-center justify-center border transition-all ${isSelected ? 'bg-sports-bg text-sports-accent border-sports-bg' : 'bg-sports-bg/50 border-white/10 text-slate-500'}`}>
                           <Icons.Check />
                        </div>
                        <span className={`text-xl font-display font-black tracking-tighter ${isSelected ? 'text-sports-bg' : 'text-white'}`}>
                          {service.price}€
                        </span>
                      </div>
                      
                      <h4 className={`text-sm font-black uppercase tracking-wide mb-3 ${isSelected ? 'text-sports-bg' : 'text-white'}`}>
                        {service.label}
                      </h4>
                      <p className={`text-[10px] font-semibold leading-relaxed ${isSelected ? 'text-sports-bg/60' : 'text-slate-500'}`}>
                        {service.description}
                      </p>

                      {isSelected && (
                        <div className="absolute bottom-6 right-8 text-[8px] font-black text-sports-bg/40 uppercase tracking-widest">Activo</div>
                      )}
                    </button>
                  );
                })}
              </div>
           </div>

           <div className="xl:col-span-4 sticky top-28">
              <div className="bg-white/5 border border-white/10 rounded-[3rem] p-10 backdrop-blur-md shadow-2xl">
                 <h4 className="font-display font-black text-xl text-white uppercase mb-10 border-b border-white/5 pb-8 tracking-tighter">Tu Selección</h4>
                 
                 {selectedServices.length === 0 ? (
                   <div className="text-center py-20 text-slate-500 text-xs font-bold uppercase tracking-widest italic opacity-40">Añade módulos</div>
                 ) : (
                   <div className="space-y-4 mb-10">
                     <ul className="space-y-3 max-h-[300px] overflow-y-auto custom-scrollbar pr-2">
                       {selectedServices.map(id => {
                         const s = CUSTOM_SERVICES_LIST.find(srv => srv.id === id);
                         return (
                           <li key={id} className="flex justify-between items-center bg-white/5 p-5 rounded-2xl border border-white/5 group">
                             <span className="text-sm text-white font-black uppercase tracking-wide">{s?.label}</span>
                             <div className="flex items-center gap-4">
                                <span className="text-sports-accent font-black text-sm">{s?.price}€</span>
                                <button onClick={() => toggleService(id)} className="text-slate-600 hover:text-white transition-colors p-1">✕</button>
                             </div>
                           </li>
                         )
                       })}
                     </ul>
                     <div className="border-t border-white/5 pt-10 flex justify-between items-end">
                        <span className="text-[10px] text-slate-500 uppercase font-black tracking-widest">Presupuesto Base</span>
                        <div className="text-right">
                           <span className="text-5xl font-display font-black text-white tracking-tighter leading-none">{totalEstimated}€</span>
                           <p className="text-[7px] text-slate-600 font-black uppercase tracking-widest mt-1">Sin IVA</p>
                        </div>
                     </div>
                   </div>
                 )}

                 <div className="space-y-4">
                   {!isValid && selectedServices.length > 0 && (
                     <div className="text-[8px] text-indigo-400 bg-indigo-500/10 p-3 rounded-xl text-center font-black uppercase tracking-widest">Selecciona {MIN_SERVICES - selectedServices.length} más</div>
                   )}
                   <button
                     disabled={!isValid}
                     onClick={() => setIsModalOpen(true)}
                     className="w-full py-6 bg-white text-sports-dark font-display font-black uppercase tracking-[0.2em] text-[10px] rounded-2xl hover:bg-sports-accent transition-all shadow-2xl shadow-white/5 disabled:opacity-20"
                   >
                     Solicitar Auditoría Gratuita
                   </button>
                 </div>
              </div>
           </div>
         </div>
       </div>

       <PlanModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} selectedPlan={customPlan} preselectedServices={selectedServices} />
    </section>
  );
};
