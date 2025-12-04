import React from 'react';

export const Hero: React.FC = () => {
  return (
    <div className="relative min-h-screen flex items-center bg-sports-navy overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-mesh opacity-20"></div>
      <div className="absolute top-0 right-0 w-[400px] md:w-[800px] h-[400px] md:h-[800px] bg-sports-blue/10 rounded-full blur-[60px] md:blur-[100px] pointer-events-none -mr-20 -mt-20 md:-mr-40 md:-mt-40"></div>
      <div className="absolute bottom-0 left-0 w-[300px] md:w-[600px] h-[300px] md:h-[600px] bg-sports-lime/5 rounded-full blur-[60px] md:blur-[100px] pointer-events-none -ml-10 -mb-10 md:-ml-20 md:-mb-20"></div>
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-sports-navy/95"></div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 md:pt-20">
        <div className="max-w-5xl">
          <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-8 md:mb-10 backdrop-blur-sm">
            <span className="w-2 h-2 rounded-full bg-sports-lime animate-pulse shadow-[0_0_10px_#78E08F]"></span>
            <span className="text-sports-lime font-bold text-[10px] md:text-xs tracking-[0.2em] uppercase font-display">
              Gestión Integral Deportiva & Educativa
            </span>
          </div>
          
          <h1 className="text-5xl sm:text-6xl md:text-7xl font-display font-bold text-white mb-8 leading-[0.95] md:leading-[0.9] tracking-tight uppercase break-words drop-shadow-xl">
            Automatiza la organización <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-sports-blue via-cyan-400 to-sports-lime">
              de tu torneo
            </span>{" "}
            y evita errores
          </h1>
          
          <p className="mt-8 max-w-3xl text-lg md:text-2xl text-gray-300 font-light leading-relaxed border-l-4 border-sports-lime pl-6 font-body">
            Soluciones profesionales para <span className="text-white font-semibold">Organizadores de Torneos</span> y <span className="text-white font-semibold">Centros Escolares</span>. Digitalizamos inscripciones, logística y gestión diaria.
          </p>
          
          <div className="mt-12 md:mt-16 flex flex-col sm:flex-row items-stretch sm:items-center gap-5">
            {/* Primary CTA - WhatsApp */}
            <a
              href="https://wa.me/34661256504"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto group relative flex items-center justify-center px-10 py-5 bg-sports-blue text-white font-display font-bold text-lg uppercase tracking-wider skew-x-0 sm:skew-x-[-6deg] hover:bg-sports-lime hover:text-sports-navy transition-all duration-300 shadow-[0_0_30px_rgba(23,107,255,0.25)] hover:shadow-[0_0_40px_rgba(120,224,143,0.4)] rounded-sm"
            >
              <div className="skew-x-0 sm:skew-x-[6deg] flex items-center">
                <svg className="w-6 h-6 mr-3" fill="currentColor" viewBox="0 0 24 24"><path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-8.683-2.031-.967-.272-.297-.471-.446-.967-.446s-.72.248-1.12.694c-.4.445-1.535 1.534-1.535 3.738s1.584 4.332 1.808 4.63c.223.298 3.07 4.743 7.496 6.653 4.425 1.909 4.425 1.287 5.218 1.188.793-.099 1.758-.718 2.006-1.411.248-.693.248-1.287.173-1.411z"/></svg>
                Contactar por WhatsApp
              </div>
            </a>
            
            {/* Secondary CTA - Email */}
            <a
              href="mailto:alicia.pons.garcia@outlook.es"
              className="w-full sm:w-auto group flex items-center justify-center px-10 py-5 border border-white/20 text-white font-display font-bold text-lg uppercase tracking-wider skew-x-0 sm:skew-x-[-6deg] hover:border-sports-lime hover:text-sports-lime hover:bg-white/5 transition-all duration-300 rounded-sm"
            >
              <div className="skew-x-0 sm:skew-x-[6deg] flex items-center">
                <svg className="w-6 h-6 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                Solicitar Info
              </div>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};