
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
    <section id="hero" className="relative min-h-[90vh] flex items-center bg-sports-bg overflow-hidden pt-20 border-b border-white/5">
      {/* Decorative Blur Elements */}
      <div className="absolute top-0 right-0 w-2/3 h-full bg-indigo-500/5 skew-x-[-15deg] translate-x-1/2 pointer-events-none"></div>
      <div className="absolute -top-24 -left-24 w-96 h-96 bg-sports-primary/10 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-sports-accent/10 rounded-full blur-[80px] pointer-events-none"></div>
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 z-20">
        <div className="max-w-4xl animate-slide-up">
          
          <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-8 shadow-sm">
            <span className="flex h-2 w-2 rounded-full bg-sports-accent animate-pulse"></span>
            <span className="text-sports-accent font-bold text-[10px] tracking-[0.2em] uppercase font-display">
              Operativa de Élite para Torneos
            </span>
          </div>
          
          <h1 className="text-4xl sm:text-5xl md:text-7xl font-display font-extrabold text-white mb-6 leading-[1.05] tracking-tight">
            Profesionaliza la Gestión de tu <br />
            <span className="text-gradient">Torneo de Fútbol</span>
          </h1>
          
          <div className="max-w-2xl border-l-4 border-sports-accent pl-8 py-2 mb-10">
            <p className="text-lg md:text-xl text-slate-400 font-body font-normal leading-relaxed">
              Tú te centras en el balón, yo en la logística. Digitalización integral, control de flotas y hospitalidad premium para que tu evento sea inolvidable.
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4">
            <button
              onClick={() => setIsAuditOpen(true)}
              className="group flex items-center justify-center px-10 py-5 bg-sports-primary text-white font-display font-bold text-sm uppercase tracking-wider rounded-2xl transition-all hover:bg-sports-accent hover:text-sports-dark shadow-xl shadow-indigo-900/40 active:scale-95"
            >
              <span>Agendar Auditoría</span>
              <svg className="w-5 h-5 ml-2 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
            </button>
            
            <button
              onClick={scrollToPlans}
              className="flex items-center justify-center px-10 py-5 border-2 border-white/10 bg-white/5 text-white font-display font-bold text-sm uppercase tracking-wider rounded-2xl hover:border-sports-accent transition-all duration-300 shadow-sm active:scale-95"
            >
              Tarifas 2025
            </button>
          </div>

        </div>
      </div>

      <AuditModal isOpen={isAuditOpen} onClose={() => setIsAuditOpen(false)} />
    </section>
  );
};
