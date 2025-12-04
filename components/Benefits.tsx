
import React from 'react';
import { Icons } from '../constants';

export const Benefits: React.FC = () => {
  return (
    <section id="benefits" className="py-24 bg-sports-dark relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid md:grid-cols-2 gap-16 items-center">
          
          {/* Left: The Pain (Agitation) */}
          <div>
             <h2 className="text-red-500 font-bold tracking-[0.2em] uppercase text-xs mb-3">La Realidad Actual</h2>
             <h3 className="text-3xl md:text-4xl font-display font-bold text-white uppercase mb-6 leading-tight">
               ¿Tu torneo es una fuente de ingresos o de <span className="text-red-500 underline decoration-red-500/30">estrés</span>?
             </h3>
             <p className="text-gray-400 font-body text-lg mb-8 leading-relaxed">
               Sabemos lo que pasa detrás de escena: teléfonos que no paran de sonar, excel con versiones infinitas y el miedo constante a que un autobús no llegue.
             </p>
             
             <ul className="space-y-4">
               {[
                 "Inscripciones duplicadas y documentación perdida.",
                 "Equipos enfadados por fallos en el hotel.",
                 "Horas perdidas cuadrando rutas manualmente.",
                 "Errores humanos que cuestan dinero."
               ].map((item, i) => (
                 <li key={i} className="flex items-center text-gray-400 font-body">
                   <div className="w-8 h-8 rounded bg-red-500/10 flex items-center justify-center text-red-500 mr-4 flex-shrink-0">
                     <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                   </div>
                   {item}
                 </li>
               ))}
             </ul>
          </div>

          {/* Right: The Solution (Value Prop) */}
          <div className="relative">
             <div className="absolute inset-0 bg-sports-blue/5 blur-3xl rounded-full"></div>
             <div className="relative bg-sports-surface border border-sports-blue/30 rounded-2xl p-8 md:p-12 shadow-[0_0_50px_rgba(23,107,255,0.1)]">
                <div className="w-16 h-16 bg-sports-blue rounded-xl flex items-center justify-center text-white mb-8 shadow-lg transform -rotate-6">
                  <Icons.Check />
                </div>
                
                <h3 className="text-2xl font-display font-bold text-white uppercase mb-4">
                  El Método APG
                </h3>
                <p className="text-gray-300 font-body mb-8">
                  Transformamos el caos en un sistema predecible. Tú pones el fútbol, nosotros ponemos la estructura operativa.
                </p>

                <div className="space-y-6">
                   <div className="flex items-start">
                      <span className="text-sports-lime font-bold text-xl mr-4">01.</span>
                      <div>
                        <h4 className="text-white font-bold uppercase text-sm">Cero Papeles</h4>
                        <p className="text-gray-500 text-sm mt-1">Digitalización 100% de fichas y pagos.</p>
                      </div>
                   </div>
                   <div className="flex items-start">
                      <span className="text-sports-lime font-bold text-xl mr-4">02.</span>
                      <div>
                        <h4 className="text-white font-bold uppercase text-sm">Logística Blindada</h4>
                        <p className="text-gray-500 text-sm mt-1">Control milimétrico de transporte y alojamiento.</p>
                      </div>
                   </div>
                   <div className="flex items-start">
                      <span className="text-sports-lime font-bold text-xl mr-4">03.</span>
                      <div>
                        <h4 className="text-white font-bold uppercase text-sm">Rentabilidad</h4>
                        <p className="text-gray-500 text-sm mt-1">Optimiza costes y evita fugas de dinero.</p>
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
