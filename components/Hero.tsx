
import React, { useState } from 'react';
import { AuditModal } from './AuditModal';

export const Hero: React.FC = () => {
  const [isAuditOpen, setIsAuditOpen] = useState(false);

  const scrollToPlans = (e: React.MouseEvent) => {
    e.preventDefault();
    const element = document.getElementById('plans');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="relative min-h-[90vh] flex items-center bg-sports-navy overflow-hidden">
      {/* Background Effects - More subtle and professional */}
      <div className="absolute inset-0 bg-mesh opacity-10"></div>
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-sports-blue/10 rounded-full blur-[120px] pointer-events-none -mr-40 -mt-40"></div>
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-sports-lime/5 rounded-full blur-[100px] pointer-events-none -ml-20 -mb-20"></div>
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20">
        <div className="max-w-4xl">
          {/* Trust Badge */}
          <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-8 backdrop-blur-md animate-fade-in-up">
            <span className="w-2 h-2 rounded-full bg-sports-lime animate-pulse shadow-[0_0_10px_#78E08F]"></span>
            <span className="text-gray-300 font-bold text-xs tracking-[0.2em] uppercase font-display">
              Operaciones Deportivas 360°
            </span>
          </div>
          
          {/* Main Headline - Benefit Oriented */}
          <h1 className="text-5xl sm:text-6xl md:text-7xl font-display font-bold text-white mb-6 leading-[0.9] tracking-tight uppercase drop-shadow-2xl">
            Tu torneo, <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-sports-blue to-sports-lime">
              en piloto automático
            </span>
          </h1>
          
          {/* Subheadline - Clear Value Prop */}
          <p className="mt-6 max-w-2xl text-lg md:text-xl text-gray-300 font-light leading-relaxed font-body border-l-2 border-sports-blue pl-6">
            Elimina el caos administrativo. Digitalizamos inscripciones, optimizamos la logística y gestionamos el alojamiento para que tú solo te preocupes del fútbol.
          </p>
          
          {/* CTAs */}
          <div className="mt-10 flex flex-col sm:flex-row gap-4">
            <button
              onClick={() => setIsAuditOpen(true)}
              className="group relative flex items-center justify-center px-8 py-4 bg-sports-blue text-white font-display font-bold text-lg uppercase tracking-wider rounded transition-all hover:bg-sports-lime hover:text-sports-navy hover:shadow-[0_0_30px_rgba(120,224,143,0.4)]"
            >
              <span className="mr-2">Solicitar Auditoría Gratis</span>
              <svg className="w-5 h-5 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
            </button>
            
            <button
              onClick={scrollToPlans}
              className="group flex items-center justify-center px-8 py-4 border border-white/20 text-white font-display font-bold text-lg uppercase tracking-wider rounded hover:bg-white/5 hover:border-sports-lime hover:text-sports-lime transition-all"
            >
              Ver Planes y Precios
            </button>
          </div>

          {/* Mini Social Proof */}
          <div className="mt-12 flex items-center gap-4 text-xs font-bold text-gray-500 uppercase tracking-widest font-body">
             <span>Confían en nosotros:</span>
             <div className="flex -space-x-2">
                {[1,2,3,4].map(i => (
                  <div key={i} className="w-8 h-8 rounded-full bg-sports-surface border border-sports-navy flex items-center justify-center text-gray-600">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" /></svg>
                  </div>
                ))}
             </div>
             <span className="text-sports-lime">+50 Organizadores</span>
          </div>
        </div>
      </div>

      <AuditModal isOpen={isAuditOpen} onClose={() => setIsAuditOpen(false)} />
    </div>
  );
};
