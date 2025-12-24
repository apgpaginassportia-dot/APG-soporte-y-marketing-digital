
import React from 'react';
import { CUSTOM_SERVICES_LIST, Icons } from '../constants';

export const AutomationGrid: React.FC = () => {
  const getIcon = (id: string) => {
    switch (id) {
      case 'admin_base': return <Icons.AutoForm />;
      case 'transport_pro': return <Icons.Bus />;
      case 'hotel_master': return <Icons.Hotel />;
      case 'vip_access': return <Icons.Users />;
      case 'safety_first': return <Icons.Shield />;
      default: return <Icons.Check />;
    }
  };

  return (
    <section className="py-24 bg-sports-navy border-b border-white/5 relative overflow-hidden">
      {/* Decorative gradient */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-sports-accent/20 to-transparent"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-sports-accent font-bold tracking-[0.2em] uppercase text-xs mb-3">Tecnología Modular</h2>
          <h3 className="text-3xl md:text-5xl font-display font-bold text-white uppercase tracking-tight">
            Suite de Automatización
          </h3>
          <p className="mt-4 text-slate-400 max-w-2xl mx-auto font-body text-lg">
            Módulos inteligentes diseñados para eliminar el trabajo manual. Escoge lo que necesitas para tu evento.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {CUSTOM_SERVICES_LIST.map((service) => (
            <div key={service.id} className="bg-sports-surface/40 p-8 rounded-3xl border border-white/5 hover:border-sports-accent/30 transition-all duration-300 group hover:-translate-y-1 hover:shadow-2xl">
              <div className="mb-4 text-sports-accent group-hover:scale-110 transition-transform">
                {getIcon(service.id)}
              </div>
              <h4 className="text-white font-bold font-display uppercase text-sm mb-2 group-hover:text-sports-accent transition-colors">
                {service.label}
              </h4>
              <p className="text-slate-400 text-xs leading-relaxed font-body">
                {service.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
