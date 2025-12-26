
import React, { useState } from 'react';
import { Icons, SCHOOL_PLAN_DATA } from '../constants';
import { PlanModal } from './PlanModal';

export const SchoolServices: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <section id="schools" className="py-24 bg-sports-dark border-b border-white/5 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-sports-accent/5 skew-x-12 translate-x-1/2 pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center md:text-left mb-16">
          <h2 className="text-sports-accent font-bold tracking-[0.2em] uppercase text-xs mb-3">Sector Centros Educativos</h2>
          <h3 className="text-3xl md:text-6xl font-display font-black text-white uppercase tracking-tighter leading-[0.9]">
            Tu Torneo Escolar,<br/>
            <span className="text-gradient">Nivel Profesional</span>
          </h3>
          <p className="mt-6 text-slate-400 text-lg md:text-xl font-body max-w-2xl leading-relaxed">
            Eliminamos el caos de los cuadrantes y la logística. Alicia Pons transforma la competición de tu colegio en un evento de alto impacto para alumnos y familias.
          </p>
        </div>

        {/* The 3-Step Process (The "How it works" part) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          {[
            { 
              phase: "Fase 01", 
              title: "Auditoría de Campo", 
              price: "0€",
              desc: "Alicia visita el centro, analiza instalaciones y define la viabilidad técnica sin coste.",
              icon: <Icons.Search /> 
            },
            { 
              phase: "Fase 02", 
              title: "Ingeniería Técnica", 
              price: "Presupuestado",
              desc: "Configuramos calendarios, seguros y la app de resultados en tiempo real.",
              icon: <Icons.CalendarAI /> 
            },
            { 
              phase: "Fase 03", 
              title: "Dirección in-situ", 
              price: "Día del Evento",
              desc: "Coordinamos staff, arbitraje y protocolo de premiación de principio a fin.",
              icon: <Icons.Trophy /> 
            }
          ].map((step, idx) => (
            <div key={idx} className="bg-sports-navy/40 backdrop-blur-sm border border-white/10 p-8 rounded-[2rem] hover:border-sports-accent/40 transition-all group">
               <div className="flex justify-between items-start mb-8">
                  <div className="text-sports-accent group-hover:scale-110 transition-transform">
                    {step.icon}
                  </div>
                  <span className="text-[10px] font-black text-sports-accent bg-sports-accent/10 px-3 py-1 rounded-full uppercase tracking-widest">
                    {step.price}
                  </span>
               </div>
               <span className="text-slate-500 font-bold uppercase text-[10px] tracking-widest block mb-2">{step.phase}</span>
               <h4 className="text-white font-display font-bold text-xl uppercase mb-3">{step.title}</h4>
               <p className="text-slate-400 text-sm font-body leading-relaxed">{step.desc}</p>
            </div>
          ))}
        </div>
        
        {/* Main CTA Block */}
        <div className="max-w-5xl mx-auto">
          <div className="relative bg-sports-surface/50 border border-white/10 rounded-[3rem] p-8 md:p-16 overflow-hidden shadow-2xl">
             <div className="absolute top-0 right-0 w-64 h-64 bg-sports-accent/5 rounded-full blur-3xl -mr-32 -mt-32"></div>
             
             <div className="flex flex-col md:flex-row items-center gap-12 relative z-10">
                <div className="flex-1 text-center md:text-left">
                   <h4 className="text-2xl md:text-4xl font-display font-bold text-white uppercase mb-4">
                     ¿Listo para profesionalizar tu centro?
                   </h4>
                   <p className="text-slate-400 text-lg font-body mb-8 leading-relaxed">
                      No arriesgues la imagen del colegio con una organización precaria. Solicita hoy mismo tu **Auditoría de Viabilidad Gratuita** y recibe un plan operativo personalizado.
                   </p>
                   <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
                      <button 
                        onClick={() => setIsModalOpen(true)}
                        className="px-10 py-5 bg-sports-accent text-sports-dark font-display font-black uppercase tracking-wider rounded-2xl hover:bg-white transition-all shadow-xl shadow-lime-900/20"
                      >
                        Reservar Auditoría Gratis
                      </button>
                   </div>
                </div>

                <div className="w-full md:w-auto min-w-[300px] bg-sports-navy/80 rounded-3xl p-8 border border-white/10">
                   <h5 className="text-white font-bold uppercase text-xs tracking-widest mb-6 border-b border-white/5 pb-4">
                     Lo que Alicia gestionará:
                   </h5>
                   <ul className="space-y-4">
                      {SCHOOL_PLAN_DATA.features.map((feature, i) => (
                        <li key={i} className="flex items-start text-xs text-slate-300 font-semibold font-body">
                           <span className="w-1.5 h-1.5 rounded-full bg-sports-accent mt-1.5 mr-3 flex-shrink-0"></span>
                           <span className={feature.includes('0€') ? 'text-sports-accent' : ''}>{feature}</span>
                        </li>
                      ))}
                   </ul>
                </div>
             </div>
          </div>
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
