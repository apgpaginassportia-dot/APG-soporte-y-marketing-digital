
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
    description: 'Selección a medida de servicios administrativos y deportivos para clubes y academias.',
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
        className={`relative flex flex-col rounded-xl transition-all duration-300 group overflow-hidden cursor-pointer h-full border-2 ${
            isSelected
            ? 'bg-sports-surface border-sports-lime shadow-[0_0_30px_rgba(163,230,53,0.2)] z-10 scale-[1.02]'
            : isHighlight 
                ? 'bg-[#152a48] border-sports-blue/50 hover:border-sports-lime shadow-lg' 
                : 'bg-sports-surface border-white/5 hover:border-sports-lime/50 hover:shadow-lg hover:-translate-y-1'
        }`}
      >
        {isSelected && (
           <div className="absolute top-4 right-4 bg-sports-lime text-sports-navy w-8 h-8 rounded-full flex items-center justify-center shadow-lg z-20 animate-bounce">
               <Icons.Check />
           </div>
        )}

        <div className="p-6 md:p-8 flex-1 flex flex-col">
            <div className="mb-6">
                <div className={`mb-4 transform transition-transform group-hover:scale-110 ${isSelected ? 'text-sports-lime' : isHighlight ? 'text-white' : 'text-gray-400'}`}>
                  <IconComponent />
                </div>
                <h3 className="text-xl font-display font-bold text-white mb-2 uppercase leading-tight h-12 flex items-center">
                    {service.title}
                </h3>
                <div className="flex items-baseline gap-1 mt-2">
                    <span className={`text-3xl lg:text-4xl font-display font-bold ${isSelected ? 'text-sports-lime' : 'text-white'}`}>
                      {service.price}
                    </span>
                    <span className="text-[10px] font-bold text-gray-500 uppercase tracking-wider whitespace-nowrap">{service.period}</span>
                </div>
            </div>

            <div className="mb-6 min-h-[40px]">
                <p className="text-sm text-gray-400 leading-relaxed font-body">
                    {service.description}
                </p>
            </div>

            <ul className="space-y-3 pt-4 border-t border-white/5 mb-6">
                {service.features.map((feature, idx) => (
                <li key={idx} className="flex items-start text-xs text-gray-300 font-body">
                    <span className={`mt-0.5 mr-3 flex-shrink-0 ${isSelected ? 'text-sports-lime' : 'text-gray-600'}`}>
                       <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>
                    </span>
                    <span>{feature}</span>
                </li>
                ))}
            </ul>

            <div className="mt-auto">
               <div className={`w-full py-4 rounded text-center text-sm font-bold uppercase tracking-widest transition-all duration-300 ${isSelected ? 'bg-sports-lime text-sports-navy shadow-lg shadow-sports-lime/20' : 'bg-white/5 text-gray-400 group-hover:bg-white group-hover:text-sports-navy'}`}>
                  {isSelected ? 'Añadido al Pack' : 'Añadir al Pack'}
               </div>
            </div>
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
                <h2 className="text-sports-lime font-bold tracking-[0.2em] uppercase text-xs mb-3">Multidisciplinar</h2>
                <h3 className="text-3xl md:text-5xl font-display font-bold text-white uppercase tracking-tight">
                    Clubes y Academias
                </h3>
                <p className="mt-4 text-gray-400 max-w-2xl font-body text-lg">
                    Automatización administrativa para clubes de cualquier deporte. Céntrate en entrenar, yo gestiono los datos.
                </p>
            </div>

            {/* UNIFIED GRID SECTION - Adjusted for 2 items to look big and premium */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 transition-all duration-300">
                {TEAM_SERVICES.map((service) => (
                    <ServiceCard key={service.id} service={service} />
                ))}
            </div>
        </div>

        {/* Desktop Shopping Cart Sidebar - ALWAYS VISIBLE NOW */}
        <div className="hidden xl:block xl:w-96 sticky top-24 animate-fade-in-up">
            <div className={`bg-sports-surface border rounded-xl p-6 shadow-2xl transition-all duration-300 ${selectedServices.length > 0 ? 'border-sports-lime shadow-[0_0_30px_rgba(163,230,53,0.1)]' : 'border-white/10'}`}>
                <div className="flex items-center justify-between mb-6 pb-6 border-b border-white/10">
                    <h4 className="font-display font-bold text-xl text-white uppercase">Tu Presupuesto</h4>
                    <span className={`text-xs font-bold px-3 py-1 rounded-full ${selectedServices.length > 0 ? 'bg-sports-lime text-sports-navy' : 'bg-gray-700 text-gray-400'}`}>
                        {selectedServices.length} Servicios
                    </span>
                </div>

                {selectedServices.length === 0 ? (
                    <div className="text-center py-12 flex flex-col items-center justify-center opacity-50">
                        <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center mb-4">
                            <svg className="w-8 h-8 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6v6m0 0v6m0-6h6m-6 0H6" /></svg>
                        </div>
                        <p className="text-sm text-gray-400 font-body px-4">
                            Selecciona las opciones de la izquierda para configurar tu pack a medida.
                        </p>
                    </div>
                ) : (
                    <div className="space-y-4 mb-8">
                        <ul className="space-y-3">
                            {selectedServices.map(id => {
                                const s = TEAM_SERVICES.find(srv => srv.id === id);
                                return s ? (
                                    <li key={id} className="flex justify-between items-center text-sm group bg-sports-navy p-3 rounded border border-white/5">
                                        <span className="text-gray-200 font-bold font-body truncate pr-2">{s.title}</span>
                                        <div className="flex items-center gap-3 flex-shrink-0">
                                            <span className="text-sports-lime font-bold">{s.price}</span>
                                            <button onClick={(e) => { e.stopPropagation(); toggleService(id); }} className="text-gray-500 hover:text-red-400 transition-colors">
                                                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                                            </button>
                                        </div>
                                    </li>
                                ) : null;
                            })}
                        </ul>
                        <div className="border-t border-white/10 pt-6 mt-4">
                            <div className="flex justify-between items-end">
                                <span className="text-sm text-gray-400 uppercase font-bold tracking-wider">Total Estimado</span>
                                <span className="text-3xl font-display font-bold text-sports-lime drop-shadow-lg">{totalEstimated}€</span>
                            </div>
                            <p className="text-[10px] text-gray-500 mt-2 text-right italic">*Precio sujeto a volumen de jugadores</p>
                        </div>
                    </div>
                )}

                <button
                    onClick={handleOpenCart}
                    disabled={selectedServices.length === 0}
                    className="w-full py-4 bg-sports-blue text-white font-display font-bold uppercase tracking-wider hover:bg-sports-lime hover:text-sports-navy transition-all rounded shadow-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-gray-700 disabled:text-gray-500"
                >
                    {selectedServices.length === 0 ? 'Configura tu Pack' : 'Solicitar Presupuesto'}
                </button>
            </div>
        </div>

      </div>

      {/* Mobile Sticky Bottom Bar - High Visibility */}
       <div className={`fixed bottom-0 left-0 right-0 bg-sports-surface border-t border-sports-lime/30 p-4 z-40 xl:hidden transition-transform duration-300 transform shadow-[0_-5px_20px_rgba(0,0,0,0.5)] ${selectedServices.length > 0 ? 'translate-y-0' : 'translate-y-full'}`}>
          <div className="flex items-center justify-between gap-4">
             <div className="flex flex-col">
                <span className="text-[10px] text-gray-400 uppercase tracking-wider font-bold">Total Pack Club</span>
                <div className="flex items-baseline gap-2">
                   <span className="text-3xl font-display font-bold text-sports-lime">{totalEstimated}€</span>
                   <span className="text-xs font-bold text-sports-navy bg-sports-lime px-2 py-0.5 rounded-full">
                      {selectedServices.length}
                   </span>
                </div>
             </div>
             <button
                onClick={handleOpenCart}
                className="flex-1 max-w-[200px] py-3 bg-sports-blue text-white font-display font-bold text-sm uppercase tracking-wide rounded hover:bg-white hover:text-sports-navy transition-colors shadow-lg"
             >
                Continuar
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
