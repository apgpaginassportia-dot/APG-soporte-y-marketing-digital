import React from 'react';
import { SERVICE_CATALOG, Icons } from '../constants';

export const VisualServices: React.FC = () => {
  const solutions = [
    { title: "Inscripciones", desc: "Evita errores en la gestión de equipos.", iconName: "Users" },
    { title: "Autocares", desc: "Coordino rutas y horarios sin retrasos.", iconName: "Bus" },
    { title: "Hoteles", desc: "Gestiono hoteles sin caos ni cambios inesperados.", iconName: "Hotel" }
  ];

  return (
    <section id="services" className="py-24 bg-sports-navy border-t border-white/5 relative">
       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
         <div className="text-center mb-16">
           <h2 className="text-sports-lime font-semibold tracking-widest uppercase text-xs mb-3">Servicios que solucionan problemas</h2>
           <h2 className="text-3xl font-display font-bold text-white uppercase">Tu torneo bajo control</h2>
         </div>
         
         <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
           {solutions.map((service, idx) => {
             const IconComponent = Icons[service.iconName as keyof typeof Icons] || Icons.Star;
             return (
               <div key={idx} className="group bg-sports-surface p-10 rounded-xl border border-white/5 flex flex-col items-center text-center hover:border-sports-blue transition-all duration-300 hover:-translate-y-1 shadow-lg">
                 <div className="text-sports-blue group-hover:text-sports-lime mb-6 transition-colors transform scale-125">
                   <IconComponent />
                 </div>
                 <span className="font-bold text-white text-xl font-display uppercase tracking-wide mb-2">{service.title}</span>
                 <p className="text-gray-400 font-body">{service.desc}</p>
               </div>
             );
           })}
         </div>
       </div>
    </section>
  );
};