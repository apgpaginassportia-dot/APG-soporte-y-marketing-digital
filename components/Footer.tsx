import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-sports-navy border-t border-white/5 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
           
           {/* Brand */}
           <div>
             <div className="flex items-center gap-3 mb-6">
               <div className="w-8 h-8 bg-sports-blue flex items-center justify-center text-white font-display font-bold text-lg skew-x-[-10deg]">
                  <span className="skew-x-[10deg]">A</span>
               </div>
               <div className="flex flex-col">
                  <span className="font-display font-bold text-white text-lg uppercase tracking-wider leading-none">APG Marketing</span>
                  <span className="text-[10px] text-sports-lime uppercase tracking-widest">Soporte Digital</span>
               </div>
             </div>
             <p className="text-gray-500 text-sm max-w-xs leading-relaxed font-body">
               Llevamos tu torneo al siguiente nivel. Gestión profesional de inscripciones, logística y alojamiento.
             </p>
           </div>

           {/* Contact */}
           <div>
             <h3 className="text-white font-bold mb-6 font-display uppercase tracking-widest text-sm">Contacto Directo</h3>
             <ul className="space-y-4">
               <li>
                 <a href="https://wa.me/34661256504" className="text-gray-400 hover:text-sports-lime transition-colors flex items-center gap-3 text-sm font-body">
                   <span className="w-1.5 h-1.5 bg-sports-lime rounded-full"></span>
                   +34 661 256 504
                 </a>
               </li>
               <li>
                 <a href="mailto:alicia.pons.garcia@outlook.es" className="text-gray-400 hover:text-sports-lime transition-colors flex items-center gap-3 text-sm font-body">
                   <span className="w-1.5 h-1.5 bg-sports-lime rounded-full"></span>
                   alicia.pons.garcia@outlook.es
                 </a>
               </li>
             </ul>
           </div>

           {/* Links */}
           <div>
             <h3 className="text-white font-bold mb-6 font-display uppercase tracking-widest text-sm">Menú</h3>
             <ul className="space-y-3 text-sm text-gray-400 font-body">
               <li><a href="#plans" className="hover:text-sports-blue transition-colors">Planes de Servicio</a></li>
               <li><a href="#builder" className="hover:text-sports-blue transition-colors">Configurador Personalizado</a></li>
               <li><a href="#contact" className="hover:text-sports-blue transition-colors">Contacto</a></li>
             </ul>
           </div>
        </div>

        <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-600 text-xs font-body">© 2025 APG Marketing y Soporte Digital.</p>
        </div>
      </div>
    </footer>
  );
};