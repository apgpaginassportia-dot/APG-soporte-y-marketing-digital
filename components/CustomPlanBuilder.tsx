import React, { useState } from 'react';
import { CUSTOM_PLAN_FEATURES } from '../constants';
import { Check, Send, AlertCircle, Settings, Truck, BedDouble, Headphones, Megaphone, Trophy, Lightbulb } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import ContactModal from './ContactModal';

const CustomPlanBuilder: React.FC = () => {
  const [selectedFeatures, setSelectedFeatures] = useState<string[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleFeature = (id: string) => {
    setSelectedFeatures(prev => 
      prev.includes(id) 
        ? prev.filter(f => f !== id) 
        : [...prev, id]
    );
  };

  // Calculate costs
  const oneTimeCost = selectedFeatures.reduce((sum, id) => {
    const feat = CUSTOM_PLAN_FEATURES.find(f => f.id === id);
    return sum + (feat && !feat.isMonthly ? feat.price : 0);
  }, 0);

  const monthlyCost = selectedFeatures.reduce((sum, id) => {
    const feat = CUSTOM_PLAN_FEATURES.find(f => f.id === id);
    return sum + (feat && feat.isMonthly ? feat.price : 0);
  }, 0);

  const handleRequestPack = () => {
    if (selectedFeatures.length === 0) return;
    setIsModalOpen(true);
  };

  const getPlanFeaturesList = () => {
    return selectedFeatures
      .map(id => {
        const f = CUSTOM_PLAN_FEATURES.find(feat => feat.id === id);
        return f ? `${f.title} (${f.isMonthly ? 'Mensual' : 'Pago único'}) - ${f.price}€` : '';
      })
      .filter(Boolean);
  };

  const getFormattedPrice = () => {
    const parts = [];
    if (oneTimeCost > 0) parts.push(`Pago Único: ${oneTimeCost}€`);
    if (monthlyCost > 0) parts.push(`Mensual: ${monthlyCost}€`);
    return parts.join(' + ');
  };

  const getCategoryIcon = (cat: string) => {
    switch(cat) {
      case 'Gestión': return <Settings size={18} />;
      case 'Transporte': return <Truck size={18} />;
      case 'Alojamiento': return <BedDouble size={18} />;
      case 'Soporte': return <Headphones size={18} />;
      case 'Marketing': return <Megaphone size={18} />;
      case 'Competición': return <Trophy size={18} />;
      case 'Innovación': return <Lightbulb size={18} />;
      default: return <Settings size={18} />;
    }
  };

  // Group features by category
  const categories = Array.from(new Set(CUSTOM_PLAN_FEATURES.map(f => f.category)));

  return (
    <section id="calculator" className="py-24 bg-slate-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-primary-600 font-semibold tracking-wide uppercase text-sm mb-3">A tu medida</h2>
          <h3 className="text-3xl md:text-4xl font-bold text-slate-900">Configurador de Servicios</h3>
          <p className="mt-4 text-slate-600">Selecciona componente a componente lo que realmente necesitas.</p>
        </div>

        <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-slate-100">
          <div className="grid grid-cols-1 lg:grid-cols-3">
            
            {/* Left: Builder Interface */}
            <div className="lg:col-span-2 p-6 md:p-10 lg:p-12 overflow-y-auto max-h-[800px]">
              <div className="space-y-8">
                {categories.map(category => (
                  <div key={category}>
                    <div className="flex items-center gap-2 mb-4 text-slate-800 font-bold border-b border-slate-100 pb-2">
                      <span className="text-primary-600">{getCategoryIcon(category)}</span>
                      <h4>{category}</h4>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {CUSTOM_PLAN_FEATURES.filter(f => f.category === category).map((feature) => {
                        const isSelected = selectedFeatures.includes(feature.id);
                        return (
                          <div 
                            key={feature.id}
                            onClick={() => toggleFeature(feature.id)}
                            className={`relative flex items-start p-4 rounded-xl border-2 cursor-pointer transition-all duration-200 ${
                              isSelected 
                                ? 'border-primary-500 bg-primary-50/50' 
                                : 'border-slate-100 hover:border-slate-200 bg-white'
                            }`}
                          >
                            <div className={`flex-shrink-0 w-5 h-5 rounded border flex items-center justify-center mr-3 mt-0.5 transition-colors ${
                              isSelected ? 'bg-primary-500 border-primary-500' : 'border-slate-300'
                            }`}>
                              {isSelected && <Check className="w-3 h-3 text-white" />}
                            </div>
                            
                            <div className="flex-1">
                              <h5 className="text-sm font-bold text-slate-900 leading-snug">{feature.title}</h5>
                              <div className="flex items-center mt-1">
                                <span className="text-primary-600 font-semibold text-sm">
                                  {feature.price}€
                                </span>
                                {feature.isMonthly && (
                                  <span className="ml-1 text-[10px] bg-amber-100 text-amber-800 px-1.5 py-0.5 rounded-full font-medium">
                                    /mes
                                  </span>
                                )}
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: Summary Panel */}
            <div className="bg-slate-900 p-8 md:p-10 text-white flex flex-col justify-between relative">
              <div className="sticky top-0">
                <h4 className="text-xl font-bold mb-6 flex items-center gap-2">
                  <Settings className="text-primary-400" size={20}/> 
                  Tu Selección
                </h4>
                
                <div className="space-y-3 mb-8 min-h-[150px]">
                  <AnimatePresence>
                    {selectedFeatures.length === 0 && (
                      <motion.div 
                        initial={{ opacity: 0 }} 
                        animate={{ opacity: 1 }}
                        className="flex flex-col items-center justify-center h-32 text-slate-500 text-sm italic gap-2 border-2 border-dashed border-slate-700 rounded-xl"
                      >
                        <AlertCircle size={20} />
                        <span className="text-center px-4">Marca las casillas para añadir servicios</span>
                      </motion.div>
                    )}
                    {selectedFeatures.map(id => {
                      const feat = CUSTOM_PLAN_FEATURES.find(f => f.id === id);
                      if (!feat) return null;
                      return (
                        <motion.div 
                          key={id}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, height: 0 }}
                          className="flex justify-between text-sm text-slate-300 border-b border-slate-800 pb-2 last:border-0"
                        >
                          <span className="truncate pr-4">{feat.title}</span>
                          <span className="whitespace-nowrap flex flex-col items-end leading-tight">
                            <span>{feat.price}€</span>
                            {feat.isMonthly && <span className="text-[10px] text-amber-400">mensual</span>}
                          </span>
                        </motion.div>
                      );
                    })}
                  </AnimatePresence>
                </div>
              </div>

              <div className="border-t border-slate-700 pt-6 mt-auto">
                <div className="flex justify-between items-end mb-3">
                  <span className="text-slate-400 text-sm">Pago Único (Implementación)</span>
                  <span className="text-2xl font-bold text-white">{oneTimeCost}€</span>
                </div>
                
                <div className={`flex justify-between items-end mb-8 p-3 rounded-lg ${monthlyCost > 0 ? 'bg-primary-900/50 border border-primary-700/50' : 'opacity-50'}`}>
                  <span className="text-primary-200 text-sm">Cuota Mensual (Soporte)</span>
                  <span className="text-xl font-bold text-primary-300">{monthlyCost}€<span className="text-xs font-normal">/mes</span></span>
                </div>

                <button 
                  onClick={handleRequestPack}
                  disabled={selectedFeatures.length === 0}
                  className="w-full py-4 bg-primary-600 text-white rounded-xl font-bold hover:bg-primary-700 transition-all shadow-lg shadow-primary-600/20 disabled:opacity-50 disabled:cursor-not-allowed disabled:shadow-none flex items-center justify-center gap-2 group"
                >
                  <Send size={18} className="group-hover:translate-x-1 transition-transform" />
                  Solicitar Presupuesto
                </button>
                <p className="text-center text-[11px] text-slate-500 mt-4">
                  Sin compromiso. Recibirás una propuesta formal en 24h.
                </p>
              </div>
            </div>

          </div>
        </div>
      </div>
      
      {/* Modal de Contacto */}
      <ContactModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        planTitle="Plan Personalizado"
        planPrice={getFormattedPrice()}
        planFeatures={getPlanFeaturesList()}
        isCustom={true}
      />
    </section>
  );
};

export default CustomPlanBuilder;