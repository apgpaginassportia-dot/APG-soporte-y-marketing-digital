
import React, { useState } from 'react';
import { Icons, SCHOOL_PLAN_DATA, CALENDLY_URL } from '../constants';
import { PlanModal } from './PlanModal';

export const SchoolServices: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const getMilestones = (price: number) => [
    { label: 'Reserva', perc: '30%', amount: Math.round(price * 0.3) },
    { label: 'Inicio', perc: '40%', amount: Math.round(price * 0.4) },
    { label: 'Cierre', perc: '30%', amount: Math.round(price * 0.3) },
  ];

  return (
    <section id="schools" className="py-32 bg-sports-bg relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-full h-full pointer-events-none opacity-20">
        <div className="absolute top-0 right-0 w-1/3 h-full bg-sports-accent/10 -skew-x-12 translate-x-1/2"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-12 gap-12 xl:gap-20 items-center mb-24">
          
          {/* Columna de Texto */}
          <div className="lg:col-span-7 animate-slide-up">
            <h2 className="text-sports-accent font-bold tracking-[0.2em] uppercase text-[10px] mb-6">Centros Educativos & AMPAs</h2>
            <h3 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-display font-black text-white uppercase tracking-tighter leading-[1.1] mb-10">
              Transformo <br/>
              <span className="text-slate-500">tu Patio Escolar</span>
            </h3>
            <p className="text-slate-400 text-lg lg:text-xl font-medium max-w-xl leading-relaxed mb-12">
              Llevo la tecnología y el rigor de los torneos profesionales a la jornada deportiva de tu colegio. Gestión llave en mano para que los docentes solo disfruten.
            </p>
            
            <div className="flex flex-wrap gap-3">
               {['Live Scoring', 'Cuadrantes AI', 'Mi Dirección In-situ', 'Premiación Pro'].map((tag, i) => (
                 <span key={i} className="px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-slate-300 text-[10px] font-bold uppercase tracking-widest">{tag}</span>
               ))}
            </div>
          </div>

          {/* Columna de la Tarjeta */}
          <div className="lg:col-span-5 relative">
             <div className="absolute inset-0 bg-sports-accent/10 blur-[100px] rounded-full opacity-50"></div>
             <div className="relative glass-card rounded-[3rem] p-10 xl:p-14 border border-white/10 shadow-2xl">
                <h4 className="text-white font-display font-black text-2xl uppercase mb-8 border-b border-white/5 pb-8">Mi Plan Integral Escolar</h4>
                
                {/* Fraccionamiento de Pagos */}
                <div className="mb-10 p-5 bg-white/5 rounded-2xl border border-white/5">
                   <div className="grid grid-cols-3 gap-3">
                      {getMilestones(SCHOOL_PLAN_DATA.basePrice).map((m, i) => (
                        <div key={i} className="text-center">
                           <div className="text-[10px] text-sports-accent font-black">{m.perc}</div>
                           <div className="text-lg font-display font-black text-white">{m.amount}€</div>
                           <div className="text-[8px] text-slate-500 font-bold uppercase tracking-tight">{m.label}</div>
                        </div>
                      ))}
                   </div>
                </div>

                <ul className="space-y-6 mb-12">
                   {SCHOOL_PLAN_DATA.features.map((feature, i) => (
                     <li key={i} className="flex items-start text-xs font-semibold group">
                        <span className="w-1.5 h-1.5 rounded-full bg-sports-accent mt-1.5 mr-4 opacity-50 group-hover:opacity-100 transition-opacity"></span>
                        <span className={typeof feature === 'string' && feature.includes('0€') ? 'text-sports-accent' : 'text-slate-400'}>{typeof feature === 'string' ? feature : feature.label}</span>
                     </li>
                   ))}
                </ul>
                <div className="flex flex-col gap-4">
                   <button 
                     onClick={() => setIsModalOpen(true)}
                     className="w-full py-6 bg-white text-sports-dark font-display font-black uppercase tracking-widest text-[10px] rounded-2xl hover:bg-sports-accent transition-all shadow-2xl active:scale-95"
                   >
                     Solicitar Auditoría Gratuita
                   </button>
                   <p className="text-center text-[8px] text-slate-600 uppercase font-black tracking-widest mt-2">Inversión base desde 550€ (Sin IVA)</p>
                </div>
             </div>
          </div>
        </div>

        {/* Pasos para Colegios */}
        <div className="grid md:grid-cols-3 gap-px bg-white/5 rounded-[2.5rem] overflow-hidden border border-white/10">
           {[
             { title: "Auditoría de Campo", desc: "Hago una visita técnica al centro para evaluar infraestructura y necesidades.", icon: <Icons.Search /> },
             { title: "Estructura Digital", desc: "Configuro tu app de resultados y los registros de tus alumnos.", icon: <Icons.CalendarAI /> },
             { title: "Día del Evento", desc: "Mi dirección presencial: coordino staff, arbitraje y tiempos.", icon: <Icons.Trophy /> }
           ].map((step, idx) => (
             <div key={idx} className="bg-sports-bg p-12 hover:bg-white/[0.02] transition-colors group">
                <div className="text-sports-accent mb-8 group-hover:scale-110 transition-transform">{step.icon}</div>
                <h5 className="text-white font-display font-black uppercase text-sm mb-4">{step.title}</h5>
                <p className="text-slate-500 text-xs font-medium leading-relaxed">{step.desc}</p>
             </div>
           ))}
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
