
import React from 'react';

export const MidCTA: React.FC = () => {
  return (
    <section className="py-24 bg-sports-navy relative border-y border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center gap-12">
           
           <div className="w-full md:w-1/3">
              <div className="aspect-square rounded-2xl bg-gradient-to-tr from-sports-blue to-sports-lime p-1 relative group">
                <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl"></div>
                <div className="w-full h-full bg-sports-surface rounded-xl flex items-center justify-center overflow-hidden relative">
                   {/* Abstract Representation of Alicia */}
                   <span className="text-9xl font-display font-bold text-sports-navy/50 select-none">A</span>
                   <div className="absolute bottom-6 left-6 right-6 bg-sports-navy/90 backdrop-blur p-4 rounded-lg border border-white/10">
                      <p className="text-white font-bold font-display uppercase">Alicia Pons</p>
                      <p className="text-sports-lime text-xs uppercase tracking-wider">Tu Jefa de Operaciones</p>
                   </div>
                </div>
              </div>
           </div>

           <div className="w-full md:w-2/3">
             <h2 className="text-sports-lime font-bold tracking-[0.2em] uppercase text-xs mb-3">Mi Compromiso Contigo</h2>
             <h3 className="text-3xl md:text-5xl font-display font-bold text-white uppercase leading-tight mb-6">
               "No soy una asistente virtual.<br/>Soy tu socia operativa."
             </h3>
             <p className="text-xl text-gray-300 font-light font-body leading-relaxed mb-8 border-l-4 border-sports-blue pl-6">
               Gestiono personalmente lo que a ti te quita el sueño: la logística compleja. Mi trabajo es simple: me das las llaves del caos y te devuelvo un torneo organizado, rentable y profesional.
             </p>
             
             <div className="flex flex-wrap gap-4">
               <div className="px-4 py-2 bg-sports-surface rounded border border-white/5 text-gray-400 text-sm font-bold uppercase tracking-wide">
                 + Logística
               </div>
               <div className="px-4 py-2 bg-sports-surface rounded border border-white/5 text-gray-400 text-sm font-bold uppercase tracking-wide">
                 + Digitalización
               </div>
               <div className="px-4 py-2 bg-sports-surface rounded border border-white/5 text-gray-400 text-sm font-bold uppercase tracking-wide">
                 + Soporte Real
               </div>
             </div>
           </div>

        </div>
      </div>
    </section>
  );
};
