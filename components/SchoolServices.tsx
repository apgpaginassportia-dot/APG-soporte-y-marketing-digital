import React from 'react';
import { Icons, SCHOOL_SERVICES, SCHOOL_PLAN_PRICING } from '../constants';

export const SchoolServices: React.FC = () => {
  return (
    <section id="schools" className="py-24 bg-[#0F1C2E] border-t border-white/5 relative">
      {/* Subtle distinction background */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-sports-blue/5 to-transparent pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
           <div className="max-w-3xl">
             <h2 className="text-sports-lime font-bold tracking-[0.2em] uppercase text-xs mb-3">Automatización Educativa</h2>
             <h3 className="text-3xl md:text-5xl font-display font-bold text-white uppercase tracking-tight leading-none">
               Soluciones para Colegios y AMPAs
             </h3>
             <p className="mt-4 text-gray-400 text-lg font-body leading-relaxed">
               Transformamos la gestión del AMPA con tecnología moderna: <span className="text-white font-bold">Carnet Digital (Wallet)</span> y control de socios.
             </p>
           </div>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
           {SCHOOL_SERVICES.map((service, idx) => {
             const IconComponent = Icons[service.iconName as keyof typeof Icons] || Icons.Star;
             return (
               <div key={idx} className="bg-sports-surface/50 rounded-lg p-6 border border-white/5 hover:bg-sports-surface hover:border-sports-lime/30 transition-all duration-300 group flex flex-col">
                  <div className="mb-4 text-sports-gray group-hover:text-sports-lime transition-colors">
                     <IconComponent />
                  </div>
                  <h4 className="text-white font-bold font-display uppercase text-sm mb-2 group-hover:text-sports-lime transition-colors">
                    {service.title}
                  </h4>
                  <p className="text-gray-500 text-xs leading-relaxed font-body group-hover:text-gray-300 transition-colors">
                    {service.description}
                  </p>
               </div>
             )
           })}
        </div>
        
        {/* Pricing Card for AMPAs - REDESIGNED */}
        <div className="max-w-5xl mx-auto">
            <div className="relative rounded-2xl p-0.5 overflow-hidden shadow-[0_0_50px_rgba(23,107,255,0.15)] group transition-all duration-500 hover:shadow-[0_0_80px_rgba(23,107,255,0.25)]">
                {/* Gradient Border */}
                <div className="absolute inset-0 bg-gradient-to-r from-sports-blue via-sports-lime to-sports-blue opacity-50 group-hover:opacity-100 transition-opacity duration-700 animate-gradient-xy"></div>
                
                <div className="relative bg-[#0A1A2F] rounded-[14px] p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-10 overflow-hidden">
                    
                    {/* Subtle Internal Gradient */}
                    <div className="absolute inset-0 bg-gradient-to-br from-sports-blue/10 via-transparent to-sports-lime/5 opacity-60 pointer-events-none"></div>

                    {/* Background Glow */}
                    <div className="absolute top-0 right-0 w-96 h-96 bg-sports-blue/10 rounded-full blur-3xl -mr-20 -mt-20 pointer-events-none"></div>

                    {/* Left: Value Prop */}
                    <div className="flex-1 relative z-10">
                        <div className="inline-flex items-center gap-2 px-3 py-1 bg-sports-lime/10 rounded-full mb-6 border border-sports-lime/20 backdrop-blur-md">
                            <span className="w-1.5 h-1.5 rounded-full bg-sports-lime animate-pulse"></span>
                            <span className="text-sports-lime font-bold uppercase text-[10px] tracking-widest">Tecnología Educativa</span>
                        </div>
                        <h4 className="text-4xl font-display font-bold text-white uppercase mb-3">
                            {SCHOOL_PLAN_PRICING.title}
                        </h4>
                        <p className="text-gray-300 mb-8 font-body text-base max-w-lg">
                            {SCHOOL_PLAN_PRICING.description}
                        </p>
                        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            {SCHOOL_PLAN_PRICING.features.map((feat, i) => (
                                <li key={i} className="flex items-center text-sm text-gray-300">
                                    <div className="mr-3 p-1 rounded-full bg-sports-blue/20 text-sports-lime">
                                        <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>
                                    </div>
                                    {feat}
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Right: Price & CTA */}
                    <div className="relative z-10 flex flex-col items-center justify-center min-w-[300px] text-center bg-white/5 rounded-xl p-8 border border-white/10 backdrop-blur-sm">
                        <div className="mb-2">
                            <span className="block text-gray-400 text-[10px] uppercase tracking-widest mb-1">Coste equivalente</span>
                            <div className="flex items-baseline justify-center gap-1">
                                <span className="text-6xl md:text-7xl font-display font-bold text-transparent bg-clip-text bg-gradient-to-r from-white to-sports-lime drop-shadow-lg">
                                    {SCHOOL_PLAN_PRICING.pricePerStudent}
                                </span>
                            </div>
                            <span className="text-sports-lime text-sm font-bold uppercase tracking-wide">{SCHOOL_PLAN_PRICING.studentDetail}</span>
                        </div>

                        <div className="my-6 w-full h-px bg-white/10"></div>

                        <div className="mb-6">
                            <span className="text-gray-400 text-sm">
                                o tarifa plana de <span className="text-white font-bold">{SCHOOL_PLAN_PRICING.totalPrice}</span> {SCHOOL_PLAN_PRICING.totalDetail}
                            </span>
                        </div>
                        
                        <a 
                            href={`https://wa.me/34661256504?text=Hola,%20soy%20del%20AMPA/Colegio%20y%20me%20interesa%20el%20Pack%20Digital%20de%20${SCHOOL_PLAN_PRICING.totalPrice}`}
                            target="_blank"
                            rel="noreferrer"
                            className="w-full py-4 px-8 bg-sports-lime text-sports-navy font-bold uppercase text-sm tracking-widest rounded-lg transition-all duration-300 shadow-[0_0_20px_rgba(120,224,143,0.3)] hover:shadow-[0_0_30px_rgba(120,224,143,0.6)] hover:bg-white hover:text-sports-blue transform hover:-translate-y-1"
                        >
                            Contratar Ahora
                        </a>
                    </div>

                </div>
            </div>
        </div>

      </div>
    </section>
  );
};