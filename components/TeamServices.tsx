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
    description: 'Selección a medida de servicios administrativos y deportivos para clubes y academias.',
    features: [],
    buttonText: 'Solicitar Pack'
  }), [totalEstimated]);

  const ServiceCard: React.FC<{ service: TeamServiceItem }> = ({ service }) => {
    const IconComponent = Icons[service.iconName as keyof typeof Icons] || Icons.Star;
    const isSelected = selectedServices.includes(service.id);

    return (
      <div 
        onClick={() => toggleService(service.id)}
        className={`relative flex flex-col rounded-2xl transition-all duration-300 group overflow-hidden cursor-pointer h-full border-2 ${
            isSelected
            ? 'bg-white border-sports-primary shadow-xl scale-[1.02] z-10'
            : 'bg-white border-sports-border hover:border-sports-primary/50 hover:shadow-lg'
        }`}
      >
        {isSelected && (
           <div className="absolute top-4 right-4 bg-sports-primary text-white w-8 h-8 rounded-full flex items-center justify-center shadow-lg z-20 animate-bounce">
               <Icons.Check />
           </div>
        )}

        <div className="p-6 md:p-8 flex-1 flex flex-col">
            <div className="mb-6">
                <div className={`mb-4 transition-colors ${isSelected ? 'text-sports-primary' : 'text-sports-gray'}`}>
                  <IconComponent />
                </div>
                <h3 className="text-xl font-display font-bold text-sports-dark mb-2 uppercase leading-tight h-12 flex items-center">
                    {service.title}
                </h3>
                <div className="flex items-baseline gap-1 mt-2">
                    <span className={`text-3xl lg:text-4xl font-display font-bold ${isSelected ? 'text-sports-primary' : 'text-sports-dark'}`}>
                      {service.price}
                    </span>
                    <span className="text-[10px] font-bold text-sports-gray uppercase tracking-wider">{service.period}</span>
                </div>
            </div>

            <div className="mb-6">
                <p className="text-sm text-sports-gray leading-relaxed font-body">
                    {service.description}
                </p>
            </div>

            <ul className="space-y-3 pt-4 border-t border-sports-border mb-6">
                {service.features.map((feature, idx) => (
                <li key={idx} className="flex items-start text-xs text-sports-gray font-body">
                    <span className={`mt-0.5 mr-3 flex-shrink-0 ${isSelected ? 'text-sports-primary' : 'text-sports-muted'}`}>
                       <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>
                    </span>
                    <span>{feature}</span>
                </li>
                ))}
            </ul>

            <div className="mt-auto">
               <div className={`w-full py-4 rounded-xl text-center text-sm font-bold uppercase tracking-widest transition-all duration-300 ${isSelected ? 'bg-sports-primary text-white shadow-lg' : 'bg-blue-50 text-sports-primary group-hover:bg-sports-primary group-hover:text-white'}`}>
                  {isSelected ? 'Añadido al Pack' : 'Añadir al Pack'}
               </div>
            </div>
        </div>
      </div>
    );
  };

  return (
    <section id="teams" className="py-24 bg-white border-t border-sports-border relative pb-32 xl:pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col xl:flex-row gap-8 items-start">
        
        <div className="flex-1 w-full">
            <div className="mb-12">
                <h2 className="text-sports-primary font-bold tracking-[0.2em] uppercase text-xs mb-3">Multidisciplinar</h2>
                <h3 className="text-3xl md:text-5xl font-display font-bold text-sports-dark uppercase tracking-tight">
                    Clubes y Academias
                </h3>
                <p className="mt-4 text-sports-gray max-w-2xl font-body text-lg">
                    Automatización administrativa para clubes. Céntrate en entrenar, yo gestiono los datos.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 transition-all duration-300">
                {TEAM_SERVICES.map((service) => (
                    <ServiceCard key={service.id} service={service} />
                ))}
            </div>
        </div>

        <div className="hidden xl:block xl:w-96 sticky top-24">
            <div className={`bg-sports-bg border rounded-2xl p-6 shadow-xl transition-all duration-300 ${selectedServices.length > 0 ? 'border-sports-primary shadow-blue-100' : 'border-sports-border'}`}>
                <div className="flex items-center justify-between mb-6 pb-6 border-b border-sports-border">
                    <h4 className="font-display font-bold text-xl text-sports-dark uppercase">Tu Selección</h4>
                    <span className={`text-xs font-bold px-3 py-1 rounded-full ${selectedServices.length > 0 ? 'bg-sports-primary text-white' : 'bg-slate-200 text-slate-500'}`}>
                        {selectedServices.length} Servicios
                    </span>
                </div>

                {selectedServices.length === 0 ? (
                    <div className="text-center py-12 flex flex-col items-center justify-center opacity-50">
                        <p className="text-sm text-sports-muted font-body px-4 italic">
                            Selecciona las opciones para configurar tu pack.
                        </p>
                    </div>
                ) : (
                    <div className="space-y-4 mb-8">
                        <ul className="space-y-3">
                            {selectedServices.map(id => {
                                const s = TEAM_SERVICES.find(srv => srv.id === id);
                                return s ? (
                                    <li key={id} className="flex justify-between items-center text-sm bg-white p-3 rounded-lg border border-sports-border">
                                        <span className="text-sports-dark font-bold truncate pr-2">{s.title}</span>
                                        <div className="flex items-center gap-3">
                                            <span className="text-sports-primary font-bold">{s.price}</span>
                                            <button onClick={(e) => { e.stopPropagation(); toggleService(id); }} className="text-sports-muted hover:text-red-500 transition-colors">✕</button>
                                        </div>
                                    </li>
                                ) : null;
                            })}
                        </ul>
                        <div className="border-t border-sports-border pt-6 mt-4">
                            <div className="flex justify-between items-end">
                                <span className="text-sm text-sports-gray uppercase font-bold tracking-wider">Total Pack</span>
                                <span className="text-3xl font-display font-bold text-sports-primary">{totalEstimated}€</span>
                            </div>
                        </div>
                    </div>
                )}

                <button
                    onClick={handleOpenCart}
                    disabled={selectedServices.length === 0}
                    className="w-full py-4 bg-sports-primary text-white font-display font-bold uppercase tracking-wider hover:bg-sports-dark transition-all rounded-xl shadow-lg disabled:opacity-50 disabled:bg-slate-200"
                >
                    {selectedServices.length === 0 ? 'Elige Servicios' : 'Solicitar Presupuesto'}
                </button>
            </div>
        </div>

      </div>

      {/* Mobile Sticky Bar */}
       <div className={`fixed bottom-0 left-0 right-0 bg-white border-t border-sports-border p-4 z-40 xl:hidden transition-transform duration-300 transform shadow-2xl ${selectedServices.length > 0 ? 'translate-y-0' : 'translate-y-full'}`}>
          <div className="flex items-center justify-between gap-4">
             <div className="flex flex-col">
                <span className="text-[10px] text-sports-gray uppercase font-bold">Total Pack Club</span>
                <div className="flex items-baseline gap-2">
                   <span className="text-3xl font-display font-bold text-sports-primary">{totalEstimated}€</span>
                </div>
             </div>
             <button
                onClick={handleOpenCart}
                className="flex-1 py-3 bg-sports-primary text-white font-display font-bold text-sm uppercase rounded-xl shadow-lg"
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