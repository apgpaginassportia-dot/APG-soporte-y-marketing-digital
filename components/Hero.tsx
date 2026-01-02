import React, { useState } from 'react';
import { AuditModal } from './AuditModal';

export const Hero: React.FC = () => {
  const [isAuditOpen, setIsAuditOpen] = useState(false);

  return (
    <section id="hero" className="relative min-h-screen flex items-center bg-sports-bg overflow-hidden pt-20">
      <div className="absolute top-0 right-0 w-full h-full pointer-events-none overflow-hidden">
        <div className="absolute top-1/4 -right-1/4 w-[50rem] h-[50rem] bg-indigo-500/10 rounded-full blur-[7.5rem] animate-pulse-slow"></div>
        <div className="absolute -bottom-1/4 left-0 w-[37.5rem] h-[37.5rem] bg-sports-accent/5 rounded-full blur-[6.25rem]"></div>
      </div>
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 z-20">
        <div className="grid lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-11 animate-slide-up">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 mb-8 backdrop-blur-md">
              <span className="flex h-1.5 w-1.5 rounded-full bg-sports-accent animate-pulse"></span>
              <span className="text-sports-accent font-bold text-[9px] tracking-[0.2em] uppercase">
                Metodología probada en la Madrid Easter Cup 2025: +150 equipos gestionados
              </span>
            </div>
            
            <h1 className="text-6xl sm:text-7xl md:text-8xl font-display font-black text-white mb-8 leading-[1] tracking-tighter">
              Organiza tu torneo <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-white to-sports-accent/50 text-glow">sin perder los nervios.</span>
            </h1>
            
            <p className="text-lg md:text-xl text-slate-400 font-normal leading-relaxed mb-12 max-w-2xl border-l-2 border-sports-accent/30 pl-8">
              Basta de Excels que no cuadran y fotos de fichas por WhatsApp. Me encargo de la ingeniería operativa de tu evento para que tú solo te preocupes de la entrega de trofeos.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-5">
              <button
                onClick={() => setIsAuditOpen(true)}
                className="group relative px-10 py-6 bg-white text-sports-dark font-display font-black text-[10px] uppercase tracking-[0.2em] rounded-2xl transition-all hover:bg-sports-accent hover:-translate-y-1 shadow-2xl shadow-white/5"
              >
                <span>Diagnosticar mi torneo gratis</span>
              </button>
              <a 
                href="#plans"
                className="px-10 py-6 bg-white/5 border border-white/10 text-white font-display font-black text-[10px] uppercase tracking-[0.2em] rounded-2xl hover:bg-white/10 transition-all text-center"
              >
                Ver servicios concretos
              </a>
            </div>
          </div>
        </div>
      </div>
      
      <AuditModal isOpen={isAuditOpen} onClose={() => setIsAuditOpen(false)} />
    </section>
  );
};