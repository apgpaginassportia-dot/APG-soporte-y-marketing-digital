
import React, { useState } from 'react';
import { Icons, SCHOOL_SERVICES, SCHOOL_PLAN_DATA } from '../constants';
import { PlanModal } from './PlanModal';

export const SchoolServices: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <section id="schools" className="py-24 bg-sports-dark border-b border-white/5 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6 text-center md:text-left">
           <div className="max-w-3xl">
             <h2 className="text-sports-accent font-bold tracking-[0.2em] uppercase text-xs mb-3">Sector Educación</h2>
             <h3 className="text-3xl md:text-5xl font-display font-bold text-white uppercase tracking-tight leading-none">
               Profesionalizamos el<br/><span className="text-gradient">Torneo de tu Colegio</span>
             </h3>
             <p className="mt-4 text-slate-400 text-lg font-body leading-relaxed">
               No es solo una liga, es la imagen de tu centro. Liberamos al profesorado de la carga operativa para que <span className="text-sports-accent font-bold">el colegio destaque</span> por su organización de élite.
             </p>
           </div>
        </div>

        {/* Intuitive Process Steps */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
           {[
             { title: "Diagnóstico (Gratis)", desc: "Alicia Pons visita tu centro para evaluar espacios y necesidades sin coste.", icon: <Icons.Search /> },
             { title: "Preparación Técnica", desc: "Diseñamos los cuadrantes, seguros y la app de resultados personalizados.", icon: <Icons.CalendarAI /> },
             { title: "Dirección de Campo", desc: "Coordinamos el día del evento de principio a fin: arbitraje, horarios y trofeos.", icon: <Icons.Trophy /> }
           ].map((step, idx) => (
             <div key={idx} className="relative bg-sports-surface/30 rounded-3xl p-8 border border-white/5 hover:border-sports-accent/30 transition-all group">
                <div className="text-sports-accent mb-6 transform group-hover:scale-110 transition-transform">
                   {step.icon}
                </div>
                <div className="absolute top-6 right-8 text-4xl font-display font-black text-white/5 group-hover:text-sports-accent/10">0{idx+1}</div>
                <h4 className="text-white font-bold font-display uppercase text-lg mb-2">{step.title}</h4>
                <p className="text-slate-400 text-sm font-body leading-relaxed">{step.desc}</p>
             </div>
           ))}
        </div>
        
        <div className="max-w-4xl mx-auto">
          <div className="relative bg-sports-navy/50 backdrop-blur-md rounded-[2.5rem] border border-white/10 shadow-2xl overflow-hidden">
             <div className="absolute top-0 inset-x-0 h-1 bg-sports-accent"></div>
             
             <div className="p-8 md:p-12 flex flex-col md:flex-row gap-8 md:gap-12 items-start">
                {/* Left Side: Summary & Action */}
                <div className="flex-1 text-center md:text-left">
                   <div className="inline-block px-3 py-1 bg-white/5 rounded text-sports-accent text-[10px] font-bold uppercase tracking-widest mb-4 border border-white/10">
                      Pack Integral Llave en Mano
                   </div>
                   <h4 className="text-3xl font-display font-bold text-white uppercase mb-2">
                     {SCHOOL_PLAN_DATA.title}
                   </h4>
                   <div className="flex items-baseline justify-center md:justify-start gap-2 mb-8">
                      <span className="text-5xl font-display font-bold text-sports-accent">{SCHOOL_PLAN_DATA.priceDisplay}</span>
                      <span className="text-slate-500 font-bold uppercase text-xs">/ base</span>
                   </div>

                   <p className="text-slate-400 text-sm leading-relaxed font-body mb-8">
                      Solución operativa completa para torneos anuales o ligas internas. <span className="text-white font-bold">Empieza hoy con una evaluación previa de 0€.</span>
                   </p>
                   
                   <button 
                      onClick={() => setIsModalOpen(true)}
                      className="inline-flex items-center justify-center px-10 py-5 bg-sports-accent text-sports-dark font-display font-bold uppercase tracking-wide rounded-2xl hover:bg-white transition-all shadow-lg shadow-lime-500/10 w-full md:w-auto"
                   >
                      {SCHOOL_PLAN_DATA.buttonText}
                   </button>
                </div>

                {/* Right Side: Features Simplified */}
                <div className="w-full md:w-5/12 bg-white/5 rounded-3xl p-8 border border-white/10">
                   <h5 className="text-sports-accent font-bold uppercase text-[10px] tracking-widest mb-6 flex items-center gap-2">
                     Servicios que Incluye:
                   </h5>
                   <ul className="space-y-4">
                      {SCHOOL_PLAN_DATA.features.map((feature, i) => (
                        <li key={i} className="text-xs text-slate-300 font-semibold font-body">
                           <span className={feature.includes('0€') ? 'text-sports-accent font-bold underline decoration-dotted underline-offset-4' : ''}>
                              {feature}
                           </span>
                        </li>
                      ))}
                   </ul>
                </div>
             </div>
          </div>
          <p className="text-center text-slate-600 text-[9px] mt-8 font-bold uppercase tracking-[0.3em]">
            * Presupuesto final condicionado al nº de alumnos y sedes.
          </p>
        </div>
      </div>

      <PlanModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        selectedPlan={SCHOOL_PLAN_DATA} 
      />
    </section>
  );
};
