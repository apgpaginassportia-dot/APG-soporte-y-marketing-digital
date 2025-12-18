
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
                  <span className="font-display font-bold text-white text-lg uppercase tracking-wider leading-none">APG</span>
                  <span className="text-[10px] text-sports-lime uppercase tracking-widest">Marketing y Soporte Digital</span>
               </div>
             </div>
             <p className="text-gray-500 text-sm max-w-xs leading-relaxed font-body">
               Llevo tu torneo al siguiente nivel. Gestión profesional de inscripciones, logística y alojamiento.
             </p>
           </div>

           {/* Contact */}
           <div>
             <h3 className="text-white font-bold mb-6 font-display uppercase tracking-widest text-sm">Contacto Directo</h3>
             <ul className="space-y-4 mb-8">
               <li>
                 <a 
                   href="https://wa.me/34661256504" 
                   target="_blank" 
                   rel="noopener noreferrer"
                   className="text-gray-400 hover:text-sports-lime transition-colors flex items-center gap-3 text-sm font-body"
                 >
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

             {/* Social Media */}
             <div className="flex gap-4">
               <a 
                 href="https://www.linkedin.com/in/alicia-pons-garc%C3%ADa-aa00a3381/" 
                 target="_blank" 
                 rel="noopener noreferrer"
                 className="w-10 h-10 rounded bg-white/5 flex items-center justify-center text-gray-400 hover:bg-blue-700 hover:text-white transition-all duration-300"
                 aria-label="LinkedIn"
               >
                 <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
               </a>
               <a 
                 href="https://x.com/AliSportsIA" 
                 target="_blank" 
                 rel="noopener noreferrer"
                 className="w-10 h-10 rounded bg-white/5 flex items-center justify-center text-gray-400 hover:bg-black hover:text-white transition-all duration-300"
                 aria-label="X (Twitter)"
               >
                 <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
               </a>
               <a 
                 href="https://www.instagram.com/apg_socialmedia91?igsh=MXJ1Zm85cGdkcHAxMA==" 
                 target="_blank" 
                 rel="noopener noreferrer"
                 className="w-10 h-10 rounded bg-white/5 flex items-center justify-center text-gray-400 hover:bg-pink-600 hover:text-white transition-all duration-300"
                 aria-label="Instagram"
               >
                 <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
               </a>
             </div>
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
