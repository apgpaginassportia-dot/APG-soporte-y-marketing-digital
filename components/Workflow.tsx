
import React from 'react';
import { WORKFLOW_STEPS } from '../constants';

export const Workflow: React.FC = () => {
  return (
    <section className="py-24 bg-sports-dark border-b border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
           <h2 className="text-sports-accent font-bold tracking-[0.2em] uppercase text-xs mb-3">Tu Socio Estratégico</h2>
           <h3 className="text-3xl md:text-4xl font-display font-bold text-white uppercase tracking-tight">Metodología APG</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
           {WORKFLOW_STEPS.map((step, idx) => (
             <div key={idx} className="relative group">
                {/* Connector Line (Desktop) */}
                {idx !== WORKFLOW_STEPS.length - 1 && (
                  <div className="hidden md:block absolute top-7 left-1/2 w-full h-[1px] bg-white/10"></div>
                )}
                
                <div className="relative flex flex-col items-center text-center">
                   <div className="w-14 h-14 rounded-2xl bg-sports-surface border border-white/10 flex items-center justify-center text-sports-accent text-xl font-bold mb-6 z-10 group-hover:bg-sports-accent group-hover:text-sports-dark group-hover:shadow-[0_0_20px_rgba(190,242,100,0.2)] group-hover:-translate-y-1 transition-all duration-300">
                     {step.icon}
                   </div>
                   
                   <span className="text-white/5 font-bold text-7xl absolute -top-8 font-display select-none -z-0 group-hover:text-sports-accent/5 transition-colors">
                     {step.step}
                   </span>
                   
                   <h4 className="text-white font-bold font-display uppercase text-sm mb-3 relative z-10">
                     {step.title}
                   </h4>
                   
                   <p className="text-slate-400 text-xs font-body leading-relaxed px-2">
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
