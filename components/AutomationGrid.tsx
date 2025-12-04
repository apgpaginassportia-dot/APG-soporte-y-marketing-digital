import React from 'react';
import { CUSTOM_SERVICES_LIST, Icons } from '../constants';

export const AutomationGrid: React.FC = () => {
  // Mapping of IDs to specific icons (reusing generic ones where needed)
  const getIcon = (id: string) => {
    switch (id) {
      case 'auto_forms': return <Icons.AutoForm />;
      case 'ai_calendar': return <Icons.CalendarAI />;
      case 'live_results': return <Icons.Results />;
      case 'push_notifs': return <Icons.Notification />;
      case 'access_qr': return <Icons.QR />;
      case 'staff_logistics': return <Icons.Staff />;
      case 'smart_transport': return <Icons.Bus />;
      case 'digital_awards': return <Icons.Trophy />;
      default: return <Icons.Check />;
    }
  };

  return (
    <section className="py-24 bg-[#050E1A] border-t border-white/5 relative overflow-hidden">
      {/* Decorative background */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-sports-lime/20 to-transparent"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-sports-lime font-bold tracking-[0.2em] uppercase text-xs mb-3">Tecnología Modular</h2>
          <h3 className="text-3xl md:text-5xl font-display font-bold text-white uppercase tracking-tight">
            Suite de Automatización
          </h3>
          <p className="mt-4 text-gray-400 max-w-2xl mx-auto font-body text-lg">
            8 módulos inteligentes diseñados para eliminar el trabajo manual. Elige los que necesitas en nuestro configurador.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {CUSTOM_SERVICES_LIST.map((service) => (
            <div key={service.id} className="bg-sports-navy p-6 rounded-xl border border-white/5 hover:border-sports-lime/30 transition-all duration-300 group hover:-translate-y-1">
              <div className="mb-4 text-sports-blue group-hover:text-sports-lime transition-colors">
                {getIcon(service.id)}
              </div>
              <h4 className="text-white font-bold font-display uppercase text-sm mb-2 group-hover:text-sports-lime transition-colors">
                {service.label}
              </h4>
              <p className="text-gray-500 text-xs leading-relaxed font-body">
                {service.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};