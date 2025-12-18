
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
    <div className="relative min-h-[95vh] flex items-center bg-sports-navy overflow-hidden">
      {/* Dynamic Background Effects */}
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent z-10"></div>
      
      {/* Animated Blobs */}
      <div className="absolute top-[-10%] right-[-5%] w-[600px] h-[600px] bg-sports-blue/20 rounded-full blur-[100px] animate-blob mix-blend-screen pointer-events-none"></div>
      <div className="absolute top-[20%] right-[10%] w-[400px] h-[400px] bg-indigo-600/20 rounded-full blur-[80px] animate-blob animation-delay-2000 mix-blend-screen pointer-events-none"></div>
      <div className="absolute bottom-[-10%] left-[-10%] w-[600px] h-[600px] bg-sports-lime/10 rounded-full blur-[120px] animate-blob animation-delay-4000 pointer-events-none"></div>
      
      {/* Mesh Grid Overlay */}
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 pointer-events-none"></div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 z-20">
        <div className="max-w-4xl">
          {/* Trust Badge with Glow */}
          <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-sports-surface/80 border border-sports-lime/20 mb-8 backdrop-blur-md animate-fade-in-up shadow-[0_0_15px_rgba(163,230,53,0.1)]">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sports-lime opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-sports-lime"></span>
            </span>
            <span className="text-sports-lime font-bold text-xs tracking-[0.2em] uppercase font-display">
              Gestión Élite de Eventos
            </span>
          </div>
          
          {/* Main Headline - High Impact */}
          <h1 className="text-5xl sm:text-7xl md:text-8xl font-display font-bold text-white mb-8 leading-[0.9] tracking-tight uppercase drop-shadow-2xl">
            Tu torneo merece <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-sports-blue via-indigo-400 to-sports-lime">
              resultados de élite
            </span>
          </h1>
          
          {/* Subheadline - Clear Value Prop */}
          <p className="mt-8 max-w-2xl text-lg md:text-xl text-sports-text/80 font-light leading-relaxed font-body border-l-4 border-sports-lime pl-6 bg-gradient-to-r from-sports-surface/50 to-transparent py-2 rounded-r-lg">
            Deja de apagar fuegos administrativos. Digitaliza inscripciones, optimiza traslados y delega la logística en manos profesionales. **Tú pones el juego, yo pongo el sistema.**
          </p>
          
          {/* CTAs with improved aesthetics */}
          <div className="mt-12 flex flex-col sm:flex-row gap-5">
            <button
              onClick={() => setIsAuditOpen(true)}
              className="group relative flex items-center justify-center px-8 py-5 bg-gradient-to-r from-sports-blue to-sports-blueDark text-white font-display font-bold text-lg uppercase tracking-wider rounded-lg transition-all hover:shadow-[0_0_30px_rgba(59,130,246,0.5)] hover:scale-[1.02]"
            >
              <div className="absolute inset-0 bg-white/20 group-hover:translate-x-full duration-700 transition-transform skew-x-12 opacity-0 group-hover:opacity-100 ease-in-out"></div>
              <span className="mr-2 relative">Reservar Auditoría Gratis</span>
              <svg className="w-5 h-5 relative transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
            </button>
            
            <button
              onClick={scrollToPlans}
              className="group flex items-center justify-center px-8 py-5 border border-white/10 bg-sports-surface/50 backdrop-blur-sm text-white font-display font-bold text-lg uppercase tracking-wider rounded-lg hover:bg-sports-surface hover:border-sports-lime hover:text-sports-lime transition-all duration-300"
            >
              Explorar Soluciones
            </button>
          </div>

        </div>
      </div>

      <AuditModal isOpen={isAuditOpen} onClose={() => setIsAuditOpen(false)} />
    </div>
  );
};
