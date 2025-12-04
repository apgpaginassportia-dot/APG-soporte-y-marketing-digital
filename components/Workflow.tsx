
import React from 'react';
import { WORKFLOW_STEPS } from '../constants';

export const Workflow: React.FC = () => {
  return (
    <section className="py-24 bg-sports-dark border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
           <h2 className="text-sports-lime font-bold tracking-[0.2em] uppercase text-xs mb-3">Metodología Probada</h2>
           <h3 className="text-3xl md:text-5xl font-display font-bold text-white uppercase">Cómo Trabajamos</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
           {WORKFLOW_STEPS.map((step, idx) => (
             <div key={idx} className="relative group">
                {/* Connector Line (Desktop) */}
                {idx !== WORKFLOW_STEPS.length - 1 && (
                  <div className="hidden md:block absolute top-8 left-1/2 w-full h-px bg-white/10 group-hover:bg-sports-blue/50 transition-colors"></div>
                )}
                
                <div className="relative flex flex-col items-center text-center">
                   <div className="w-16 h-16 rounded-2xl bg-sports-surface border border-white/10 flex items-center justify-center text-sports-blue text-2xl font-bold mb-6 z-10 group-hover:bg-sports-blue group-hover:text-white group-hover:shadow-[0_0_20px_rgba(23,107,255,0.4)] transition-all duration-300">
                     {step.icon}
                   </div>
                   
                   <span className="text-sports-lime font-bold text-5xl opacity-10 absolute -top-4 font-display select-none">
                     {step.step}
                   </span>
                   
                   <h4 className="text-white font-bold font-display uppercase text-lg mb-3">
                     {step.title}
                   </h4>
                   
                   <p className="text-gray-400 text-sm font-body leading-relaxed px-2">
                     {step.desc}
                   </p>
                </div>
             </div>
           ))}
        </div>
      </div>
    </section>
  );
};
