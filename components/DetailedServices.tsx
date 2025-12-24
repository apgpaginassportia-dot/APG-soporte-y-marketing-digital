import React from 'react';
import { Icons, SERVICE_CATALOG_DETAILED } from '../constants';

export const DetailedServices: React.FC = () => {
  return (
    <section id="detailed-services" className="py-24 bg-white relative border-t border-sports-border">
       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
         <div className="text-center mb-20">
           <h2 className="text-sports-primary font-bold tracking-[0.2em] uppercase text-xs mb-3">Especialización Operativa</h2>
           <h3 className="text-3xl md:text-4xl font-display font-extrabold text-sports-dark uppercase tracking-tight mb-6">
             Gestión Técnica de Torneos
           </h3>
           <p className="mt-4 text-sports-gray max-w-2xl mx-auto font-body text-lg leading-relaxed">
             Nos encargamos de las áreas críticas que determinan la calidad percibida por equipos y patrocinadores.
           </p>
         </div>
         
         <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
           {SERVICE_CATALOG_DETAILED.map((service, idx) => {
             const IconComponent = Icons[service.iconName as keyof typeof Icons] || Icons.Check;
             return (
               <div key={idx} className="bg-slate-50 rounded-2xl p-8 border border-sports-border hover:border-sports-primary/30 transition-all duration-300 hover:shadow-xl hover:bg-white group">
                   <div className="w-14 h-14 bg-white rounded-xl flex items-center justify-center mb-8 border border-sports-border group-hover:bg-sports-primary group-hover:text-white transition-all duration-300 text-sports-primary shadow-sm">
                       <IconComponent />
                   </div>
                   
                   <h4 className="text-xl font-display font-bold text-sports-dark mb-2 uppercase tracking-tight">
                     {service.title}
                   </h4>
                   <p className="text-sports-primary text-[10px] font-bold uppercase tracking-[0.1em] mb-6">
                      {service.subtitle}
                   </p>
                   
                   <p className="text-sports-gray font-body mb-8 leading-relaxed text-sm">
                     {service.description}
                   </p>
                   
                   <ul className="space-y-3">
                     {service.details.map((detail, dIdx) => (
                       <li key={dIdx} className="flex items-start text-xs text-sports-dark font-medium font-body">
                          <span className="mt-1 mr-3 w-1.5 h-1.5 rounded-full bg-sports-primary/40 flex-shrink-0"></span>
                          <span className="leading-snug">{detail}</span>
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