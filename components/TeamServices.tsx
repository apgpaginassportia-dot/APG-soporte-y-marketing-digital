

import React, { useState, useMemo } from 'react';
import { TEAM_SERVICES, Icons } from '../constants';
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
       const service = TEAM_SERVICES.find(s => s.id === id);
       if (!service) return acc;
       const price = parseInt(service.price.replace(/[^\d]/g, '')) || 0;
       return acc + price;
    }, 0);
  }, [selectedServices]);

  const handleOpenCart = () => {
    setIsModalOpen(true);
  };

  const customTeamPlan: Plan = useMemo(() => ({
    id: 'team_custom',
    title: 'Pack Club Personalizado',
    priceDisplay: `${totalEstimated}€`,
    basePrice: totalEstimated,
    subtitle: 'Servicios Combinados',
    description: 'Selección a medida de servicios administrativos y deportivos para clubes.',
    features: [],
    buttonText: 'Solicitar Pack'
  }), [totalEstimated]);

  const ServiceCard = ({ service }: { service: TeamServiceItem }) => {
    const IconComponent = Icons[service.iconName as keyof typeof Icons] || Icons.Star;
    const isSelected = selectedServices.includes(service.id);
    const isHighlight = service.highlight;

    return (
      <div 
        onClick={() => toggleService(service.id)}
        className={`relative flex flex-col rounded-xl transition-all duration-300 group overflow-hidden cursor-pointer h-full ${
            isSelected
            ? 'bg-sports-surface border-2 border-sports-blue shadow-[0_0_20px_rgba(23,107,255,0.3)] z-10 scale-[1.02]'
            : isHighlight 
                ? 'bg-[#152a48] border-2 border-sports-lime/50 shadow-[0_0_30px_rgba(120,224,143,0.1)]' 
                : 'bg-sports-surface border border-white/5 hover:border-sports-lime/50 hover:shadow-lg hover:-translate-y-1'
        }`}
      >
        {isSelected && (
           <div className="absolute top-4 right-4 bg-sports-blue text-white w-8 h-8 rounded-full flex items-center justify-center shadow-lg z-20">
               <Icons.Check />
           </div>
        )}

        <div className="p-6 md:p-8 flex-1 flex flex-col">
            <div className="mb-6">
                <div className={`mb-4 ${isSelected ? 'text-sports-blue' : isHighlight ? 'text-white' : 'text-gray-400'}`}>
                  <IconComponent />
                </div>
                <h3 className="text-lg font-display font-bold text-white mb-2 uppercase leading-tight h-12 flex items-center">
                    {service.title}
                </h3>
                <div className="flex items-baseline gap-1 mt-2">
                    <span className={`text-2xl lg:text-3xl font-display font-bold ${isSelected ? 'text-sports-blue' : 'text-white'}`}>
                      {service.price}
                    </span>
                    <span className="text-[10px] font-bold text-gray-500 uppercase tracking-wider whitespace-nowrap">{service.period}</span>
                </div>
            </div>

            <p className="text-xs text-gray-400 mb-6 leading-relaxed font-body min-h-[40px]">
                {service.description}
            </p>

            <ul className="space-y-3 mt-auto pt-4 border-t border-white/5">
                {service.features.map((feature, idx) => (
                <li key={idx} className="flex items-start text-xs text-gray-300 font-body">
                    <span className={`mt-0.5 mr-3 flex-shrink-0 ${isSelected ? 'text-sports-blue' : 'text-gray-600'}`}>
                       <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>
                    </span>
                    <span>{feature}</span>
                </li>
                ))}
            </ul>
        </div>
      </div>
    );
  };

  return (
    <section id="teams" className="py-24 bg-[#081221] border-t border-white/5 relative pb-32 xl:pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col xl:flex-row gap-8 items-start">
        
        <div className="flex-1 w-full">
            {/* Header Section */}
            <div className="mb-12">
                <h2 className="text-sports-lime font-bold tracking-[0.2em] uppercase text-xs mb-3">Fútbol Base y Modesto</h2>
                <h3 className="text-3xl md:text-5xl font-display font-bold text-white uppercase tracking-tight">
                    Servicios para Clubes
                </h3>
                <p className="mt-4 text-gray-400 max-w-2xl font-body text-lg">
                    Selecciona los módulos que necesitas para crear tu pack personalizado.
                </p>
            </div>

            {/* UNIFIED GRID SECTION */}
            <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 transition-all duration-300`}>
                {TEAM_SERVICES.map((service) => (
                    <ServiceCard key={service.id} service={service} />
                ))}
            </div>
        </div>

        {/* Desktop Shopping Cart Sidebar - ONLY SHOWS IF ITEMS SELECTED */}
        {selectedServices.length > 0 && (
            <div className="hidden xl:block xl:w-80 sticky top-24 animate-fade-in-up">
                <div className="bg-sports-surface border border-white/10 rounded-xl p-6 shadow-2xl">
                    <div className="flex items-center justify-between mb-6 pb-6 border-b border-white/10">
                        <h4 className="font-display font-bold text-lg text-white uppercase">Tu Pack</h4>
                        <span className="bg-sports-blue text-white text-xs font-bold px-2 py-1 rounded">
                            {selectedServices.length} Items
                        </span>
                    </div>

                    <div className="space-y-4 mb-8">
                        <ul className="space-y-3">
                            {selectedServices.map(id => {
                                const s = TEAM_SERVICES.find(srv => srv.id === id);
                                return s ? (
                                    <li key={id} className="flex justify-between items-center text-xs group">
                                        <span className="text-gray-300 font-medium truncate pr-2">{s.title}</span>
                                        <div className="flex items-center gap-2 flex-shrink-0">
                                            <span className="text-white font-bold">{s.price}</span>
                                            <button onClick={(e) => { e.stopPropagation(); toggleService(id); }} className="text-gray-500 hover:text-red-400">
                                                <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                                            </button>
                                        </div>
                                    </li>
                                ) : null;
                            })}
                        </ul>
                        <div className="border-t border-white/10 pt-4 mt-2">
                                <div className="flex justify-between items-end">
                                <span className="text-xs text-gray-400 uppercase font-bold">Total Estimado</span>
                                <span className="text-2xl font-display font-bold text-sports-lime">{totalEstimated}€</span>
                                </div>
                                <p className="text-[10px] text-gray-500 mt-1 text-right">*Combinación de pagos mensuales y anuales</p>
                        </div>
                    </div>

                    <button
                        onClick={handleOpenCart}
                        className="w-full py-4 bg-sports-blue text-white font-display font-bold uppercase tracking-wider hover:bg-sports-lime hover:text-sports-navy transition-all rounded shadow-lg"
                    >
                        Solicitar Pack
                    </button>
                </div>
            </div>
        )}

      </div>

      {/* Mobile Sticky Bottom Bar */}
       <div className={`fixed bottom-0 left-0 right-0 bg-sports-surface border-t border-white/10 p-4 z-40 xl:hidden transition-transform duration-300 transform ${selectedServices.length > 0 ? 'translate-y-0' : 'translate-y-full'}`}>
          <div className="flex items-center justify-between gap-4">
             <div className="flex flex-col">
                <span className="text-[10px] text-gray-400 uppercase tracking-wider">Total Pack</span>
                <div className="flex items-baseline gap-2">
                   <span className="text-2xl font-display font-bold text-sports-lime">{totalEstimated}€</span>
                   <span className="text-xs font-bold text-white bg-sports-blue px-1.5 py-0.5 rounded">
                      {selectedServices.length}
                   </span>
                </div>
             </div>
             <button
                onClick={handleOpenCart}
                className="flex-1 max-w-[200px] py-3 bg-sports-blue text-white font-display font-bold text-sm uppercase tracking-wide rounded hover:bg-sports-lime hover:text-sports-navy transition-colors shadow-lg"
             >
                Contratar
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
