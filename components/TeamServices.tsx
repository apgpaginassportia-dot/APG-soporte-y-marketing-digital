import React, { useState, useMemo } from 'react';
import { TEAM_SERVICES, Icons, CALENDLY_URL } from '../constants';
import { PlanModal } from './PlanModal';
import { Plan, TeamServiceItem } from '../types';

export const TeamServices: React.FC = () => {
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleService = (id: string) => {
    if (selectedServices.includes(id)) {
      setSelectedServices(prev => prev.filter(s => s !== id));
    } else {
      setSelectedServices(prev => [...prev, id]);
    }
  };

  const totalEstimated = useMemo(() => {
    return selectedServices.reduce((acc, id) => {
       const service = TEAM_SERVICES.find(srv => srv.id === id);
       if (!service) return acc;
       const price = parseInt(service.price.replace(/[^\d]/g, '')) || 0;
       return acc + price;
    }, 0);
  }, [selectedServices]);

  const handleOpenCart = () => {
    if (selectedServices.length > 0) {
        setIsModalOpen(true);
    }
  };

  const customTeamPlan: Plan = useMemo(() => ({
    id: 'team_custom',
    title: 'Pack Club Personalizado',
    priceDisplay: `${totalEstimated}€`,
    basePrice: totalEstimated,
    subtitle: 'Servicios Combinados',
    description: 'Selección a medida de servicios administrativos y logísticos para liberar la carga operativa de tu staff técnico.',
    features: [],
    buttonText: 'Solicitar Auditoría de Club'
  }), [totalEstimated]);

  const ServiceCard: React.FC<{ service: TeamServiceItem }> = ({ service }) => {
    const IconComponent = Icons[service.iconName as keyof typeof Icons] || Icons.Check;
    const isSelected = selectedServices.includes(service.id);

    return (
      <div 
        onClick={() => toggleService(service.id)}
        className={`relative flex flex-col rounded-[2.5rem] transition-all duration-500 group overflow-hidden cursor-pointer h-full border ${
            isSelected
            ? 'bg-white border-white shadow-2xl scale-[1.02] z-10'
            : 'bg-white/5 border-white/10 hover:border-white/30 hover:shadow-lg'
        }`}
      >
        {isSelected && (
           <div className="absolute top-6 right-6 bg-sports-primary text-white w-10 h-10 rounded-full flex items-center justify-center shadow-lg z-20 animate-bounce">
               <Icons.Check />
           </div>
        )}

        <div className="p-10 flex-1 flex flex-col">
            <div className="mb-8">
                <div className={`mb-6 transition-colors ${isSelected ? 'text-sports-primary' : 'text-sports-accent'}`}>
                  <IconComponent />
                </div>
                <h3 className={`text-xl font-display font-black mb-2 uppercase leading-tight ${isSelected ? 'text-sports-dark' : 'text-white'}`}>
                    {service.title}
                </h3>
                <div className="flex items-baseline gap-1 mt-2">
                    <span className={`text-3xl lg:text-4xl font-display font-black ${isSelected ? 'text-sports-primary' : 'text-white'}`}>
                      {service.price}
                    </span>
                    <span className={`text-[10px] font-bold uppercase tracking-wider ${isSelected ? 'text-sports-muted' : 'text-slate-500'}`}>{service.period}</span>
                </div>
            </div>

            <div className="mb-8">
                <p className={`text-sm leading-relaxed font-medium ${isSelected ? 'text-sports-muted' : 'text-slate-400'}`}>
                    {service.description}
                </p>
            </div>

            <ul className={`space-y-4 pt-6 border-t mb-8 ${isSelected ? 'border-sports-dark/10' : 'border-white/5'}`}>
                {service.features.map((feature, idx) => (
                <li key={idx} className={`flex items-start text-xs font-semibold ${isSelected ? 'text-sports-dark/70' : 'text-slate-400'}`}>
                    <span className={`mt-0.5 mr-3 flex-shrink-0 ${isSelected ? 'text-sports-primary' : 'text-sports-accent'}`}>
                       <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>
                    </span>
                    <span>{feature}</span>
                </li>
                ))}
            </ul>

            <div className="mt-auto">
               <div className={`w-full py-4 rounded-2xl text-center text-[10px] font-black uppercase tracking-widest transition-all duration-300 ${isSelected ? 'bg-sports-primary text-white shadow-lg' : 'bg-white/5 text-white group-hover:bg-white/10 group-hover:text-sports-accent border border-white/5'}`}>
                  {isSelected ? 'Añadido al Pack' : 'Subcontratar Servicio'}
               </div>
            </div>
        </div>
      </div>
    );
  };

  return (
    <section id="teams" className="py-32 bg-sports-bg border-t border-white/5 relative pb-32 xl:pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col xl:flex-row gap-12 items-start">
        
        <div className="flex-1 w-full">
            <div className="mb-16">
                <h2 className="text-sports-accent font-bold tracking-[0.2em] uppercase text-[10px] mb-4">Estructura para Entidades</h2>
                <h3 className="text-4xl md:text-6xl font-display font-black text-white uppercase tracking-tighter leading-none">
                    Clubes y Academias
                </h3>
                <p className="mt-6 text-slate-400 max-w-2xl text-lg font-medium leading-relaxed">
                    Céntrate en el entrenamiento y el scouting. Yo me encargo de que la oficina y los viajes de tus equipos funcionen como un club profesional.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 transition-all duration-300">
                {TEAM_SERVICES.map((service) => (
                    <ServiceCard key={service.id} service={service} />
                ))}
            </div>
        </div>

        <div className="hidden xl:block xl:w-96 sticky top-24">
            <div className={`bg-white/5 border rounded-[2.5rem] p-10 backdrop-blur-xl shadow-2xl transition-all duration-500 ${selectedServices.length > 0 ? 'border-white/20' : 'border-white/5'}`}>
                <div className="flex items-center justify-between mb-8 pb-8 border-b border-white/5">
                    <h4 className="font-display font-black text-xl text-white uppercase tracking-tighter">Pack Seleccionado</h4>
                    <span className={`text-[10px] font-black px-3 py-1 rounded-full ${selectedServices.length > 0 ? 'bg-sports-accent text-sports-dark' : 'bg-white/10 text-slate-500'}`}>
                        {selectedServices.length} SERVICIOS
                    </span>
                </div>

                {selectedServices.length === 0 ? (
                    <div className="text-center py-12 flex flex-col items-center justify-center opacity-50">
                        <p className="text-xs text-slate-500 font-bold uppercase tracking-widest px-4 italic">
                            Selecciona servicios para profesionalizar tu oficina técnica.
                        </p>
                    </div>
                ) : (
                    <div className="space-y-6 mb-10">
                        <ul className="space-y-3">
                            {selectedServices.map(id => {
                                const s = TEAM_SERVICES.find(srv => srv.id === id);
                                return s ? (
                                    <li key={id} className="flex justify-between items-center bg-white/5 p-5 rounded-xl border border-white/5 group">
                                        <span className="text-xs text-white font-black uppercase truncate pr-2">{s.title}</span>
                                        <div className="flex items-center gap-3">
                                            <span className="text-sm text-sports-accent font-black">{s.price}</span>
                                            <button onClick={(e) => { e.stopPropagation(); toggleService(id); }} className="text-slate-600 hover:text-white transition-colors p-1">✕</button>
                                        </div>
                                    </li>
                                ) : null;
                            })}
                        </ul>
                        <div className="border-t border-white/5 pt-8 mt-4">
                            <div className="flex justify-between items-end">
                                <span className="text-[10px] text-slate-500 uppercase font-black tracking-widest">Inversión Estimada</span>
                                <span className="text-4xl font-display font-black text-white tracking-tighter">{totalEstimated}€</span>
                            </div>
                        </div>
                    </div>
                )}

                <div className="space-y-4 pt-4">
                  <button
                      onClick={handleOpenCart}
                      disabled={selectedServices.length === 0}
                      className="w-full py-5 bg-white text-sports-dark font-display font-black uppercase tracking-[0.2em] text-[10px] hover:bg-sports-accent transition-all rounded-2xl shadow-2xl shadow-white/5 disabled:opacity-10"
                  >
                      {selectedServices.length === 0 ? 'Personaliza tu Pack' : 'Solicitar Propuesta Club'}
                  </button>
                </div>
            </div>
        </div>

      </div>

      {/* Mobile Sticky Bar */}
       <div className={`fixed bottom-0 left-0 right-0 bg-sports-navy border-t border-white/10 p-6 z-40 xl:hidden transition-transform duration-500 transform shadow-[0_-10px_40px_rgba(0,0,0,0.5)] ${selectedServices.length > 0 ? 'translate-y-0' : 'translate-y-full'}`}>
          <div className="flex items-center justify-between gap-6">
             <div className="flex flex-col">
                <span className="text-[8px] text-slate-500 uppercase font-black tracking-widest">Presupuesto Club</span>
                <div className="flex items-baseline gap-2">
                   <span className="text-3xl font-display font-black text-white">{totalEstimated}€</span>
                </div>
             </div>
             <button
                onClick={handleOpenCart}
                className="flex-1 py-4 bg-white text-sports-dark font-display font-black text-xs uppercase rounded-xl shadow-xl active:scale-95"
             >
                Continuar Solicitud
             </button>
          </div>
       </div>

      <PlanModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        selectedPlan={customTeamPlan} 
        preselectedServices={selectedServices}
      />
    </section>
  );
};