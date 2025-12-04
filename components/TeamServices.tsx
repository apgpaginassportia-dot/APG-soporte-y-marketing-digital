import React from 'react';
import { TEAM_SERVICES, Icons } from '../constants';

export const TeamServices: React.FC = () => {
  return (
    <section id="teams" className="py-24 bg-[#081221] border-t border-white/5 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Section */}
        <div className="text-center mb-16">
          <div className="inline-block px-3 py-1 bg-white/5 rounded mb-4 border border-white/10">
             <h2 className="text-white font-bold tracking-[0.2em] uppercase text-xs">Fútbol Base y Modesto</h2>
           </div>
          <h3 className="text-3xl md:text-5xl font-display font-bold text-white uppercase tracking-tight">
            Servicios para Clubes
          </h3>
          <p className="mt-4 text-gray-400 max-w-2xl mx-auto font-body text-lg">
            Soluciones "Low Cost" diseñadas para equipos no profesionales. Profesionaliza tu imagen y consigue ingresos extra.
          </p>
        </div>

        {/* Pricing Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {TEAM_SERVICES.map((service, idx) => {
            const IconComponent = Icons[service.iconName as keyof typeof Icons] || Icons.Star;
            const isHighlight = service.highlight;

            return (
              <div 
                key={idx} 
                className={`relative flex flex-col p-6 rounded-xl transition-all duration-300 group hover:-translate-y-2 ${
                    isHighlight 
                    ? 'bg-sports-blue text-white shadow-[0_0_30px_rgba(23,107,255,0.2)] border border-sports-blue' 
                    : 'bg-sports-surface border border-white/5 hover:border-sports-lime/50'
                }`}
              >
                {isHighlight && (
                    <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-sports-lime text-sports-navy px-3 py-1 text-[10px] font-bold uppercase tracking-widest rounded-full shadow-lg">
                        Más Popular
                    </div>
                )}

                <div className={`mb-4 ${isHighlight ? 'text-white' : 'text-sports-blue group-hover:text-sports-lime transition-colors'}`}>
                  <IconComponent />
                </div>

                <h4 className="font-display font-bold text-xl uppercase mb-2 leading-tight">
                  {service.title}
                </h4>

                <p className={`text-xs mb-6 font-body leading-relaxed ${isHighlight ? 'text-blue-100' : 'text-gray-400'}`}>
                  {service.description}
                </p>

                <div className="mt-auto pt-6 border-t border-white/10">
                    <div className="flex items-baseline gap-1 mb-4">
                        <span className="text-3xl font-display font-bold">{service.price}</span>
                        <span className={`text-[10px] font-bold uppercase ${isHighlight ? 'text-blue-200' : 'text-gray-500'}`}>{service.period}</span>
                    </div>

                    <ul className="space-y-2 mb-6">
                        {service.features.map((feat, i) => (
                            <li key={i} className="flex items-start text-xs">
                                <span className="mr-2 mt-0.5">•</span>
                                <span className={isHighlight ? 'text-blue-50' : 'text-gray-300'}>{feat}</span>
                            </li>
                        ))}
                    </ul>

                    <a 
                      href={`https://wa.me/34661256504?text=Hola,%20soy%20de%20un%20club%20y%20me%20interesa:%20${service.title}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`block w-full py-3 text-center text-xs font-bold uppercase tracking-wider rounded transition-colors ${
                          isHighlight 
                          ? 'bg-white text-sports-blue hover:bg-sports-lime hover:text-sports-navy' 
                          : 'bg-white/5 text-white hover:bg-sports-blue'
                      }`}
                    >
                        Solicitar
                    </a>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};