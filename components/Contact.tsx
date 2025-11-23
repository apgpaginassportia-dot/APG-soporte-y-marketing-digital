import React from 'react';

export const Contact: React.FC = () => {
  return (
    <section id="contact" className="py-24 bg-sports-dark relative">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-sports-surface rounded-lg overflow-hidden border border-white/5 shadow-2xl">
           <div className="md:flex">
              <div className="bg-sports-navy p-12 text-white md:w-2/5 flex flex-col justify-between relative overflow-hidden">
                 <div className="absolute top-0 right-0 -mr-10 -mt-10 w-40 h-40 bg-sports-blue/20 rounded-full blur-2xl"></div>
                 
                 <div className="relative z-10">
                   <h3 className="text-4xl font-display font-bold mb-4 uppercase">Contacto</h3>
                   <p className="text-gray-400 mb-8 font-light leading-relaxed">
                     ¿Listo para profesionalizar tu torneo? Hablemos.
                   </p>
                   
                   <div className="space-y-6">
                     <a href="mailto:alicia.pons.garcia@outlook.es" className="flex items-center text-sm hover:text-sports-lime transition-colors group">
                       <div className="w-10 h-10 rounded bg-white/5 flex items-center justify-center mr-4 group-hover:bg-sports-lime group-hover:text-sports-navy transition-all">
                         <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                       </div>
                       <span className="truncate">alicia.pons.garcia@outlook.es</span>
                     </a>
                     <a href="https://wa.me/34661256504" className="flex items-center text-sm hover:text-sports-lime transition-colors group">
                       <div className="w-10 h-10 rounded bg-white/5 flex items-center justify-center mr-4 group-hover:bg-sports-lime group-hover:text-sports-navy transition-all">
                         <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
                       </div>
                       +34 661 256 504
                     </a>
                   </div>
                 </div>
              </div>
              
              <div className="p-12 md:w-3/5 bg-sports-surface">
                <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
                  <div>
                    <label className="block text-xs font-bold text-sports-blue uppercase mb-2">Nombre</label>
                    <input type="text" className="w-full bg-sports-dark border border-gray-700 text-white rounded px-4 py-3 focus:border-sports-lime outline-none transition-all" placeholder="Nombre completo" />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-sports-blue uppercase mb-2">Email</label>
                    <input type="email" className="w-full bg-sports-dark border border-gray-700 text-white rounded px-4 py-3 focus:border-sports-lime outline-none transition-all" placeholder="email@club.com" />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-sports-blue uppercase mb-2">Mensaje</label>
                    <textarea rows={4} className="w-full bg-sports-dark border border-gray-700 text-white rounded px-4 py-3 focus:border-sports-lime outline-none transition-all resize-none" placeholder="Detalles del torneo..."></textarea>
                  </div>
                  <button className="w-full bg-sports-blue text-white font-bold py-4 rounded hover:bg-blue-600 transition-colors uppercase tracking-wide">
                    Enviar Consulta
                  </button>
                </form>
              </div>
           </div>
        </div>
      </div>
    </section>
  );
};