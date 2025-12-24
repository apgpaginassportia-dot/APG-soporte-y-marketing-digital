import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-50 border-t border-sports-border pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
           
           {/* Brand */}
           <div>
             <div className="flex items-center gap-3 mb-6">
               <div className="w-8 h-8 bg-sports-primary flex items-center justify-center text-white font-display font-bold text-lg rounded">
                  <span>A</span>
               </div>
               <div className="flex flex-col">
                  <span className="font-display font-bold text-sports-dark text-lg uppercase tracking-tight leading-none">APG</span>
                  <span className="text-[9px] text-sports-primary uppercase tracking-widest font-bold">Marketing & Soporte Digital</span>
               </div>
             </div>
             <p className="text-sports-gray text-xs max-w-xs leading-relaxed font-body">
               Soluciones operativas de élite para organizadores de torneos de fútbol y eventos deportivos multidisciplinares.
             </p>
           </div>

           {/* Contact */}
           <div>
             <h3 className="text-sports-dark font-bold mb-6 font-display uppercase tracking-widest text-[10px]">Contacto Directo</h3>
             <ul className="space-y-3 mb-8">
               <li>
                 <a 
                   href="https://wa.me/34661256504" 
                   target="_blank" 
                   rel="noopener noreferrer"
                   className="text-sports-gray hover:text-sports-primary transition-colors flex items-center gap-2 text-xs font-medium"
                 >
                   WhatsApp: +34 661 256 504
                 </a>
               </li>
               <li>
                 <a href="mailto:alicia.pons.garcia@outlook.es" className="text-sports-gray hover:text-sports-primary transition-colors flex items-center gap-2 text-xs font-medium">
                   alicia.pons.garcia@outlook.es
                 </a>
               </li>
             </ul>

             {/* Social Media */}
             <div className="flex gap-3">
               <a href="#" className="w-8 h-8 rounded-lg bg-white border border-sports-border flex items-center justify-center text-sports-gray hover:text-sports-primary transition-all"><svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg></a>
               <a href="#" className="w-8 h-8 rounded-lg bg-white border border-sports-border flex items-center justify-center text-sports-gray hover:text-sports-dark transition-all"><svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg></a>
             </div>
           </div>

           {/* Links */}
           <div>
             <h3 className="text-sports-dark font-bold mb-6 font-display uppercase tracking-widest text-[10px]">Menú</h3>
             <ul className="space-y-2 text-xs text-sports-gray font-medium">
               <li><a href="#plans" className="hover:text-sports-primary transition-colors">Planes de Gestión</a></li>
               <li><a href="#builder" className="hover:text-sports-primary transition-colors">Configurador</a></li>
               <li><a href="#contact" className="hover:text-sports-primary transition-colors">Solicitar Presupuesto</a></li>
             </ul>
           </div>
        </div>

        <div className="border-t border-sports-border pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sports-muted text-[10px] font-medium font-body uppercase tracking-wider">© 2025 APG Marketing y Soporte Digital.</p>
          <p className="text-sports-muted text-[10px] font-medium font-body mt-2 md:mt-0 uppercase tracking-wider">Expertise en Organización de Fútbol</p>
        </div>
      </div>
    </footer>
  );
};