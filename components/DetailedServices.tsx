
import React from 'react';
import { Icons, SERVICE_CATALOG_DETAILED } from '../constants';

export const DetailedServices: React.FC = () => {
  return (
    <section id="detailed-services" className="py-24 bg-sports-surface border-t border-white/5 relative overflow-hidden">
       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
         <div className="text-center mb-16">
           <h2 className="text-sports-blue font-bold tracking-[0.2em] uppercase text-xs mb-3">Servicios Core</h2>
           <h3 className="text-4xl md:text-5xl font-display font-bold text-white uppercase tracking-tight">
             Gestión Integral de Torneos
           </h3>
           <p className="mt-4 text-gray-400 max-w-2xl mx-auto font-body text-lg">
             Cubrimos las tres áreas donde se ganan o pierden los torneos: Administración, Transporte y Alojamiento.
           </p>
         </div>
         
         <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
           {SERVICE_CATALOG_DETAILED.map((service, idx) => {
             const IconComponent = Icons[service.iconName as keyof typeof Icons] || Icons.Star;
             return (
               <div key={idx} className="group relative bg-sports-navy rounded-2xl p-8 border border-white/5 hover:border-sports-blue transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl">
                   
                   <div className="w-14 h-14 bg-sports-surface rounded-lg flex items-center justify-center mb-6 border border-white/5 group-hover:bg-sports-blue group-hover:text-white transition-all duration-300 text-sports-blue">
                       <IconComponent />
                   </div>
                   
                   <h4 className="text-2xl font-display font-bold text-white mb-2 uppercase tracking-wide">
                     {service.title}
                   </h4>
                   <p className="text-sports-lime text-xs font-bold uppercase tracking-widest mb-4">
                      {service.subtitle}
                   </p>
                   
                   <p className="text-gray-400 font-body mb-8 leading-relaxed">
                     {service.description}
                   </p>
                   
                   <ul className="space-y-3 border-t border-white/5 pt-6">
                     {service.details.map((detail, dIdx) => (
                       <li key={dIdx} className="flex items-start text-sm text-gray-300 font-body">
                          <span className="mt-1.5 mr-3 w-1.5 h-1.5 rounded-full bg-sports-blue flex-shrink-0"></span>
                          <span>{detail}</span>
                       </li>
                     ))}
                   </ul>
               </div>
             );
           })}
         </div>
       </div>
    </section>
  );
};
