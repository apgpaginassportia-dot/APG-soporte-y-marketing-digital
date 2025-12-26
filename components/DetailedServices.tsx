
import React from 'react';
import { Icons, SERVICE_CATALOG_DETAILED } from '../constants';

export const DetailedServices: React.FC = () => {
  return (
    <section id="detailed-services" className="py-32 bg-sports-bg relative">
       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
         <div className="flex flex-col md:flex-row items-end justify-between mb-24 gap-8">
            <div className="max-w-2xl">
              <h2 className="text-sports-accent font-bold tracking-[0.2em] uppercase text-[10px] mb-4">Core Operativo</h2>
              <h3 className="text-4xl md:text-6xl font-display font-black text-white uppercase tracking-tighter leading-none">
                Mi Gestión <span className="text-slate-500">Maestra</span>
              </h3>
            </div>
            <p className="text-slate-400 max-w-xs text-sm font-medium border-l border-white/10 pl-6">
              Servicios modulares que he diseñado para atacar los puntos de fricción más comunes en tus eventos de fútbol.
            </p>
         </div>
         
         <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
           {SERVICE_CATALOG_DETAILED.map((service, idx) => {
             const IconComponent = Icons[service.iconName as keyof typeof Icons] || Icons.Check;
             return (
               <div key={idx} className="group relative bg-white/[0.03] rounded-[3rem] p-12 border border-white/5 transition-all duration-500 hover:bg-white/[0.07] hover:border-white/20">
                   <div className="w-16 h-16 bg-sports-bg rounded-2xl flex items-center justify-center mb-10 border border-white/10 group-hover:scale-110 group-hover:border-sports-accent/30 transition-all text-sports-accent">
                       <IconComponent />
                   </div>
                   
                   <h4 className="text-2xl font-display font-black text-white mb-3 uppercase tracking-tight group-hover:text-sports-accent transition-colors">
                     {service.title}
                   </h4>
                   <p className="text-slate-500 text-[10px] font-black uppercase tracking-[0.2em] mb-8">
                      {service.subtitle}
                   </p>
                   
                   <ul className="space-y-4">
                     {service.details.map((detail, dIdx) => (
                       <li key={dIdx} className="flex items-start text-xs text-slate-400 font-semibold leading-relaxed">
                          <span className="mt-1.5 mr-3 w-1.5 h-px bg-sports-accent/50 flex-shrink-0"></span>
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
