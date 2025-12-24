import React from 'react';
import { Icons } from '../constants';

export const Benefits: React.FC = () => {
  return (
    <section id="benefits" className="py-24 bg-slate-50 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid md:grid-cols-2 gap-16 items-center">
          
          {/* Left: The Pain */}
          <div className="animate-slide-up">
             <h2 className="text-indigo-500 font-bold tracking-[0.2em] uppercase text-xs mb-4">Optimización Real</h2>
             <h3 className="text-3xl md:text-5xl font-display font-extrabold text-sports-dark uppercase mb-8 leading-tight">
               ¿Tu torneo es una fuente de ingresos o de <span className="text-indigo-600 italic">caos</span> constante?
             </h3>
             <p className="text-sports-gray font-body text-lg mb-10 leading-relaxed">
               Organizar un torneo de fútbol de élite exige precisión. El descontrol en inscripciones o la falta de coordinación logística daña la imagen de tu marca y agota a tu equipo.
             </p>
             
             <ul className="space-y-5">
               {[
                 "Inscripciones duplicadas y pagos sin trazabilidad.",
                 "Logística de flotas sin rutas ni horarios dinámicos.",
                 "Gestión de hospitalidad con errores en el check-in.",
                 "Carga administrativa que paraliza a tu staff técnico."
               ].map((item, i) => (
                 <li key={i} className="flex items-center text-sports-dark font-body text-sm font-semibold">
                   <div className="w-8 h-8 rounded-xl bg-indigo-50 flex items-center justify-center text-indigo-600 mr-4 flex-shrink-0 border border-indigo-100">
                     <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M6 18L18 6M6 6l12 12" /></svg>
                   </div>
                   {item}
                 </li>
               ))}
             </ul>
          </div>

          {/* Right: The Solution */}
          <div className="relative">
             <div className="absolute inset-0 bg-indigo-500/10 blur-3xl rounded-full translate-x-10 translate-y-10"></div>
             <div className="relative bg-white border border-sports-border rounded-[2.5rem] p-10 md:p-14 shadow-2xl">
                <div className="w-16 h-16 bg-sports-accent rounded-2xl flex items-center justify-center text-sports-dark mb-10 shadow-lg shadow-lime-200">
                  <Icons.Check />
                </div>
                
                <h3 className="text-2xl font-display font-bold text-sports-dark uppercase mb-6">
                  El Método APG
                </h3>
                <p className="text-sports-gray font-body text-base mb-10 leading-relaxed">
                  Transformamos procesos manuales en flujos digitales de alto rendimiento. Tú pones el deporte, yo pongo el sistema.
                </p>

                <div className="space-y-8">
                   <div className="flex items-start group">
                      <span className="text-sports-primary font-bold text-xl mr-5 group-hover:scale-110 transition-transform">01.</span>
                      <div>
                        <h4 className="text-sports-dark font-bold uppercase text-xs tracking-widest mb-1">Ecosistema Digital</h4>
                        <p className="text-sports-gray text-xs font-body">Adiós al papel. Control total desde cualquier dispositivo.</p>
                      </div>
                   </div>
                   <div className="flex items-start group">
                      <span className="text-sports-primary font-bold text-xl mr-5 group-hover:scale-110 transition-transform">02.</span>
                      <div>
                        <h4 className="text-sports-dark font-bold uppercase text-xs tracking-widest mb-1">Logística Inteligente</h4>
                        <p className="text-sports-gray text-xs font-body">Anticipación quirúrgica de conflictos en transporte.</p>
                      </div>
                   </div>
                   <div className="flex items-start group">
                      <span className="text-sports-primary font-bold text-xl mr-5 group-hover:scale-110 transition-transform">03.</span>
                      <div>
                        <h4 className="text-sports-dark font-bold uppercase text-xs tracking-widest mb-1">Impacto de Marca</h4>
                        <p className="text-sports-gray text-xs font-body">Percepción de profesionalidad superior para tus partners.</p>
                      </div>
                   </div>
                </div>
             </div>
          </div>

        </div>
      </div>
    </section>
  );
};