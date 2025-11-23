import React from 'react';

export const MidCTA: React.FC = () => {
  return (
    <section className="py-24 bg-sports-surface relative overflow-hidden border-t border-white/5">
      <div className="absolute inset-0 bg-mesh opacity-10"></div>
      
      <div className="relative max-w-4xl mx-auto px-4 text-center">
        <div className="mb-8">
           <div className="w-24 h-24 bg-sports-blue rounded-full mx-auto flex items-center justify-center text-white font-display font-bold text-4xl shadow-[0_0_20px_rgba(23,107,255,0.4)] border-4 border-sports-navy">
             A
           </div>
        </div>
        
        <h2 className="text-3xl md:text-4xl font-display font-bold text-white mb-6 uppercase">
          Soy Alicia
        </h2>
        
        <p className="text-xl md:text-2xl text-gray-300 mb-8 font-light max-w-3xl mx-auto leading-relaxed">
          Especializada en <span className="text-sports-lime font-semibold">soporte digital y logística deportiva</span>.
          Mi objetivo es que tú puedas centrarte en lo importante: <span className="text-white font-semibold">tu torneo</span>.
        </p>

        <div className="flex flex-col sm:flex-row justify-center gap-4">
           <a
              href="https://wa.me/34661256504"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center px-8 py-4 bg-sports-blue text-white font-bold uppercase tracking-wide hover:bg-sports-lime hover:text-sports-navy transition-all rounded shadow-lg"
           >
             Hablemos por WhatsApp
           </a>
        </div>
      </div>
    </section>
  );
};