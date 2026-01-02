import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-sports-dark border-t border-white/5 pt-20 pb-12 relative overflow-hidden">
      {/* Decorative pulse element */}
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-sports-primary/5 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-16 mb-16">
           
           {/* Brand */}
           <div>
             <div className="flex items-center gap-3 mb-6">
               <div className="w-10 h-10 bg-sports-primary flex items-center justify-center text-white font-display font-bold text-xl rounded-xl shadow-lg shadow-indigo-500/20">
                  <span>A</span>
               </div>
               <div className="flex flex-col">
                  <span className="font-display font-bold text-white text-xl uppercase tracking-tight leading-none">APG</span>
                  <span className="text-[9px] text-sports-accent uppercase tracking-widest font-bold">Marketing & Soporte Digital</span>
               </div>
             </div>
             <p className="text-slate-500 text-sm max-w-xs leading-relaxed font-body">
               Soluciones operativas de élite para organizadores de torneos de fútbol y eventos deportivos multidisciplinares.
             </p>
           </div>

           {/* Contact */}
           <div>
             <h3 className="text-white font-bold mb-8 font-display uppercase tracking-widest text-[11px]">Contacto Directo</h3>
             <ul className="space-y-4 mb-8">
               <li>
                 <a 
                   href="https://wa.me/34661256504" 
                   target="_blank" 
                   rel="noopener noreferrer"
                   className="text-slate-400 hover:text-sports-accent transition-colors flex items-center gap-3 text-sm font-medium"
                 >
                   <div className="w-8 h-8 rounded-lg bg-white/5 border border-white/5 flex items-center justify-center">
                     <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                   </div>
                   +34 661 256 504
                 </a>
               </li>
               <li>
                 <a href="mailto:alicia.pons.garcia@outlook.es" className="text-slate-400 hover:text-sports-accent transition-colors flex items-center gap-3 text-sm font-medium">
                   <div className="w-8 h-8 rounded-lg bg-white/5 border border-white/5 flex items-center justify-center">
                     <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                   </div>
                   alicia.pons.garcia@outlook.es
                 </a>
               </li>
             </ul>

             {/* Social Media */}
             <div className="flex gap-4">
               <a href="#" className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-slate-400 hover:text-sports-accent transition-all"><svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg></a>
               <a href="#" className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-slate-400 hover:text-white transition-all"><svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg></a>
             </div>
           </div>

           {/* Links */}
           <div>
             <h3 className="text-white font-bold mb-8 font-display uppercase tracking-widest text-[11px]">Explora</h3>
             <ul className="space-y-4 text-sm text-slate-400 font-medium">
               <li><a href="#plans" className="hover:text-sports-accent transition-colors">Planes de Gestión</a></li>
               <li><a href="#builder" className="hover:text-sports-accent transition-colors">Configurador Pro</a></li>
               <li><a href="#contact" className="hover:text-sports-accent transition-colors">Solicitar Presupuesto</a></li>
               <li><a href="#schools" className="hover:text-sports-accent transition-colors">Sector Educación</a></li>
             </ul>
           </div>
        </div>

        <div className="border-t border-white/5 pt-10 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-slate-600 text-[10px] font-bold font-display uppercase tracking-[0.2em]">© 2026 APG Marketing y Soporte Digital.</p>
          <div className="flex gap-8">
            <a href="#" className="text-slate-600 hover:text-slate-400 transition-colors text-[10px] font-bold uppercase tracking-widest">Aviso Legal</a>
            <a href="#" className="text-slate-600 hover:text-slate-400 transition-colors text-[10px] font-bold uppercase tracking-widest">Privacidad</a>
          </div>
        </div>
      </div>
    </footer>
  );
};