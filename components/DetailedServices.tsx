import React from 'react';
import { Icons, SERVICE_CATALOG_DETAILED } from '../constants';
import { ServiceCatalogItem } from '../types';

export const DetailedServices: React.FC = () => {
  const handleShare = async (service: ServiceCatalogItem) => {
    const shareData = {
      title: `APG Marketing - ${service.title}`,
      text: `${service.title}: ${service.description} \n\nDescubre más soluciones deportivas profesionales.`,
      url: window.location.href,
    };

    try {
      // Check if share is supported and valid
      if (navigator.share && navigator.canShare && navigator.canShare(shareData)) {
        await navigator.share(shareData);
      } else {
        throw new Error('Web Share API not supported or invalid data');
      }
    } catch (error: any) {
      // Ignore if user aborted the share action
      if (error.name === 'AbortError') return;

      console.warn('Share API failed, falling back to clipboard:', error);
      
      try {
        await navigator.clipboard.writeText(`${shareData.title}\n${shareData.text}\n${shareData.url}`);
        alert("Enlace y detalles copiados al portapapeles.");
      } catch (clipboardError) {
        console.error('Clipboard failed:', clipboardError);
      }
    }
  };

  return (
    <section id="detailed-services" className="py-24 bg-sports-navy border-t border-white/5 relative overflow-hidden">
       {/* Background decorative elements */}
       <div className="absolute top-0 right-0 w-96 h-96 bg-sports-blue/5 rounded-full blur-3xl -mr-32 -mt-32"></div>

       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
         <div className="text-center mb-20">
           <div className="inline-block px-3 py-1 bg-sports-blue/10 rounded mb-4 border border-sports-blue/20">
             <h2 className="text-sports-blue font-bold tracking-[0.2em] uppercase text-xs">Excelencia Operativa</h2>
           </div>
           <h3 className="text-4xl md:text-5xl font-display font-bold text-white uppercase tracking-tight">
             Gestión de Torneos
           </h3>
           <p className="mt-4 text-gray-400 max-w-2xl mx-auto font-body text-lg">
             Elevamos el nivel de tu evento profesionalizando las tres áreas críticas de la organización.
           </p>
         </div>
         
         <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-10">
           {SERVICE_CATALOG_DETAILED.map((service, idx) => {
             const IconComponent = Icons[service.iconName as keyof typeof Icons] || Icons.Star;
             return (
               <div key={idx} className="group relative bg-sports-surface rounded-2xl p-1 overflow-hidden transition-all duration-300 hover:shadow-[0_0_40px_rgba(23,107,255,0.1)]">
                 {/* Gradient Border Effect */}
                 <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-white/0 group-hover:from-sports-blue/50 group-hover:to-sports-lime/50 transition-all duration-500 opacity-50 group-hover:opacity-100 rounded-2xl"></div>
                 
                 <div className="relative bg-[#11223A] h-full rounded-xl p-8 flex flex-col">
                   <div className="w-14 h-14 bg-sports-navy rounded-lg flex items-center justify-center mb-6 border border-white/5 group-hover:border-sports-blue/30 group-hover:bg-sports-blue/10 transition-all duration-300">
                     <div className="text-sports-blue group-hover:text-sports-lime transition-colors transform group-hover:scale-110 duration-300">
                       <IconComponent />
                     </div>
                   </div>
                   
                   <h4 className="text-2xl font-display font-bold text-white mb-2 uppercase tracking-wide group-hover:text-sports-blue transition-colors">
                     {service.title}
                   </h4>

                   <div className="text-sports-lime text-xs font-bold uppercase tracking-widest mb-4">
                      {service.subtitle}
                   </div>
                   
                   <p className="text-gray-400 font-body mb-8 leading-relaxed">
                     {service.description}
                   </p>
                   
                   <ul className="space-y-3 mt-auto mb-8">
                     {service.details.map((detail, dIdx) => (
                       <li key={dIdx} className="flex items-start text-sm text-gray-300 font-body group/item">
                          <span className="mt-1 mr-3 w-1.5 h-1.5 rounded-full bg-sports-gray group-hover:bg-sports-lime transition-colors"></span>
                          <span className="group-hover/item:text-white transition-colors">{detail}</span>
                       </li>
                     ))}
                   </ul>

                   <div className="pt-6 border-t border-white/5 flex justify-end">
                      <button 
                          onClick={() => handleShare(service)}
                          className="flex items-center gap-2 text-sm font-bold text-gray-400 hover:text-sports-lime transition-colors group/share"
                      >
                          <span className="uppercase tracking-wider text-xs">Compartir</span>
                          <div className="p-2 rounded-full bg-white/5 group-hover/share:bg-sports-lime/10 transition-colors">
                              <Icons.Share />
                          </div>
                      </button>
                   </div>
                 </div>
               </div>
             );
           })}
         </div>
       </div>
    </section>
  );
};