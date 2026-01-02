import React from 'react';
import { Icons } from '../constants';

export const Benefits: React.FC = () => {
  return (
    <section id="benefits" className="py-24 bg-sports-navy relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid md:grid-cols-2 gap-16 items-center">
          
          <div className="animate-slide-up">
             <h2 className="text-sports-accent font-bold tracking-[0.2em] uppercase text-xs mb-4">La realidad del organizador</h2>
             <h3 className="text-3xl md:text-5xl font-display font-extrabold text-white uppercase mb-8 leading-tight">
               Tu móvil no debería ser <span className="text-sports-accent italic">una oficina de bomberos</span>
             </h3>
             <p className="text-slate-400 font-body text-lg mb-10 leading-relaxed">
               He estado ahí. He visto torneos excelentes empañados por fallos en el registro de jugadores o buses que nunca llegan. Mi trabajo es que el sistema trabaje para ti, no tú para el sistema.
             </p>
             
             <ul className="space-y-5">
               {[
                 "Recibir cientos de fotos de DNI por WhatsApp a deshoras.",
                 "No saber quién ha pagado realmente hasta que el balón rueda.",
                 "Gestionar transportes y cuadrantes con un Excel que se rompe.",
                 "Llegar al día del evento agotado por la burocracia previa."
               ].map((item, i) => (
                 <li key={i} className="flex items-center text-slate-300 font-body text-sm font-semibold">
                   <div className="w-8 h-8 rounded-xl bg-white/5 flex items-center justify-center text-red-400 mr-4 flex-shrink-0 border border-white/10">
                     <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M6 18L18 6M6 6l12 12" /></svg>
                   </div>
                   {item}
                 </li>
               ))}
             </ul>
          </div>

          <div className="relative">
             <div className="absolute inset-0 bg-sports-accent/5 blur-3xl rounded-full translate-x-10 translate-y-10"></div>
             <div className="relative bg-sports-surface border border-white/10 rounded-[2.5rem] p-10 md:p-14 shadow-2xl">
                <div className="w-16 h-16 bg-sports-accent rounded-2xl flex items-center justify-center text-sports-dark mb-10 shadow-lg shadow-lime-500/20">
                  <Icons.Shield />
                </div>
                
                <h3 className="text-2xl font-display font-bold text-white uppercase mb-6">
                  Mi Propuesta: Calma Operativa
                </h3>
                <p className="text-slate-400 font-body text-base mb-10 leading-relaxed">
                  Soy Alicia Pons, y aplico la metodología de la <strong>Madrid Easter Cup 2025</strong> a tu evento. No te vendo software, te vendo la seguridad de que todo el engranaje invisible funcionará.
                </p>

                <div className="space-y-8">
                   <div className="flex items-start group">
                      <span className="text-sports-accent font-bold text-xl mr-5 group-hover:scale-110 transition-transform">01.</span>
                      <div>
                        <h4 className="text-white font-bold uppercase text-xs tracking-widest mb-1">Orden Digital</h4>
                        <p className="text-slate-500 text-xs font-body">Registros validados al momento. Todo centralizado, nada perdido en chats.</p>
                      </div>
                   </div>
                   <div className="flex items-start group">
                      <span className="text-sports-accent font-bold text-xl mr-5 group-hover:scale-110 transition-transform">02.</span>
                      <div>
                        <h4 className="text-white font-bold uppercase text-xs tracking-widest mb-1">Logística Blindada</h4>
                        <p className="text-slate-500 text-xs font-body">Buses, hoteles y sedes coordinados bajo un mismo mando operativo experto.</p>
                      </div>
                   </div>
                   <div className="flex items-start group">
                      <span className="text-sports-accent font-bold text-xl mr-5 group-hover:scale-110 transition-transform">03.</span>
                      <div>
                        <h4 className="text-white font-bold uppercase text-xs tracking-widest mb-1">Enfoque Deportivo</h4>
                        <p className="text-slate-400 text-xs font-body">Tú atiendes a tus patrocinadores y al deporte, yo atiendo a la operativa.</p>
                      </div>
                   </div>
                </div>
             </div>
          </div>

        </div>
      </div>
    </section>
  );
};