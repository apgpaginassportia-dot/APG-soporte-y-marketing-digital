
import React from 'react';
import { WORKFLOW_STEPS } from '../constants';

export const Workflow: React.FC = () => {
  return (
    <section className="py-32 bg-sports-bg relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-8">
           <div className="max-w-2xl">
              <h2 className="text-sports-accent font-bold tracking-[0.2em] uppercase text-[10px] mb-4">Metodología APG</h2>
              <h3 className="text-4xl md:text-5xl font-display font-black text-white uppercase tracking-tighter leading-none">
                Mi Proceso de <br/><span className="text-slate-500">Transformación</span>
              </h3>
           </div>
           <p className="text-slate-400 max-w-sm text-sm font-medium">
              Audito, estructuro y ejecuto. Un flujo lineal que he diseñado para eliminar el error humano.
           </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
           {WORKFLOW_STEPS.map((step, idx) => (
             <div key={idx} className="group relative bg-white/5 border border-white/5 p-10 rounded-[2.5rem] transition-all duration-500 hover:bg-white/10 hover:border-white/20">
                <div className="absolute top-8 right-8 text-5xl font-display font-black text-white/5 group-hover:text-sports-accent/10 transition-colors">
                  {step.step}
                </div>
                
                <div className="w-12 h-12 rounded-2xl bg-sports-bg border border-white/10 flex items-center justify-center text-sports-accent mb-8 group-hover:scale-110 transition-transform shadow-xl">
                  {step.icon}
                </div>
                
                <h4 className="text-white font-display font-black uppercase text-sm mb-4 tracking-wide group-hover:text-sports-accent transition-colors">
                  {step.title}
                </h4>
                
                <p className="text-slate-500 text-xs font-medium leading-relaxed group-hover:text-slate-400 transition-colors">
                  {step.desc}
                </p>

                {idx < WORKFLOW_STEPS.length - 1 && (
                  <div className="hidden md:block absolute -right-2 top-1/2 -translate-y-1/2 w-4 h-4 text-white/10">
                    <svg fill="currentColor" viewBox="0 0 24 24"><path d="M12 4l-1.41 1.41L16.17 11H4v2h12.17l-5.58 5.59L12 20l8-8z"/></svg>
                  </div>
                )}
             </div>
           ))}
        </div>
      </div>
    </section>
  );
};
