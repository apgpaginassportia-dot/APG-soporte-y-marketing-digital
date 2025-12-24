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
    <section className="py-24 bg-white border-t border-sports-border relative overflow-hidden">
      {/* Decorative gradient */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-sports-primary/20 to-transparent"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-sports-primary font-bold tracking-[0.2em] uppercase text-xs mb-3">Tecnología Modular</h2>
          <h3 className="text-3xl md:text-5xl font-display font-bold text-sports-dark uppercase tracking-tight">
            Suite de Automatización
          </h3>
          <p className="mt-4 text-sports-gray max-w-2xl mx-auto font-body text-lg">
            Módulos inteligentes diseñados para eliminar el trabajo manual. Escoge lo que necesitas para tu evento.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {CUSTOM_SERVICES_LIST.map((service) => (
            <div key={service.id} className="bg-sports-bg p-6 rounded-xl border border-sports-border hover:border-sports-primary/30 transition-all duration-300 group hover:-translate-y-1 hover:shadow-lg">
              <div className="mb-4 text-sports-primary group-hover:scale-110 transition-transform">
                {getIcon(service.id)}
              </div>
              <h4 className="text-sports-dark font-bold font-display uppercase text-sm mb-2 group-hover:text-sports-primary transition-colors">
                {service.label}
              </h4>
              <p className="text-sports-gray text-xs leading-relaxed font-body">
                {service.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};