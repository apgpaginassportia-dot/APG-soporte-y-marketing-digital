import React, { useState } from 'react';
import { SERVICE_MODULES } from '../constants';
import { Check, Send, AlertCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const CustomPlanBuilder: React.FC = () => {
  const [selectedModules, setSelectedModules] = useState<string[]>([]);

  const toggleModule = (id: string) => {
    setSelectedModules(prev => 
      prev.includes(id) 
        ? prev.filter(m => m !== id) 
        : [...prev, id]
    );
  };

  // Calculate total value of all selected items
  const totalPrice = selectedModules.reduce((sum, id) => {
    const mod = SERVICE_MODULES.find(m => m.id === id);
    return sum + (mod ? mod.price : 0);
  }, 0);

  // Dynamically calculate monthly cost based on the monthly module(s) selected
  const monthlyModule = SERVICE_MODULES.find(m => m.id === 'mod4');
  const monthlyPrice = monthlyModule ? monthlyModule.price : 0;
  const monthlyCost = selectedModules.includes('mod4') ? monthlyPrice : 0;
  
  // Calculate one-time setup cost
  const oneTimeCost = totalPrice - monthlyCost;

  const handleRequestPack = () => {
    if (selectedModules.length === 0) return;

    const selectedNames = selectedModules
      .map(id => SERVICE_MODULES.find(m => m.id === id)?.title)
      .filter(Boolean)
      .join('\n- ');

    const subject = encodeURIComponent("Solicitud de Pack Personalizado - APG Sportflow");
    const body = encodeURIComponent(`Hola Alicia,

Estoy interesado en contratar un pack personalizado de automatización para mi torneo deportivo con los siguientes servicios:

- ${selectedNames}

Resumen de costes estimados:
- Implementación: ${oneTimeCost}€
${monthlyCost > 0 ? `- Mensualidad soporte: ${monthlyCost}€/mes` : ''}

Me gustaría agendar una reunión para concretar detalles.

Un saludo.`);

    window.open(`mailto:alicia.pons.garcia@outlook.es?subject=${subject}&body=${body}`, '_blank');
  };

  return (
    <section id="calculator" className="py-24 bg-slate-50">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-slate-100">
          <div className="grid grid-cols-1 lg:grid-cols-3">
            
            {/* Left: Builder Interface */}
            <div className="lg:col-span-2 p-8 md:p-12">
              <h3 className="text-2xl font-bold text-slate-900 mb-2">Crea tu Plan Personalizado</h3>
              <p className="text-slate-600 mb-8">Selecciona los módulos que realmente necesitas para tu evento.</p>

              <div className="space-y-4">
                {SERVICE_MODULES.map((module) => {
                  const isSelected = selectedModules.includes(module.id);
                  return (
                    <div 
                      key={module.id}
                      onClick={() => toggleModule(module.id)}
                      className={`relative flex items-center p-5 rounded-xl border-2 cursor-pointer transition-all duration-200 ${
                        isSelected 
                          ? 'border-primary-500 bg-primary-50/50' 
                          : 'border-slate-100 hover:border-slate-200 bg-white'
                      }`}
                    >
                      <div className={`flex-shrink-0 w-6 h-6 rounded-full border flex items-center justify-center mr-4 transition-colors ${
                        isSelected ? 'bg-primary-500 border-primary-500' : 'border-slate-300'
                      }`}>
                        {isSelected && <Check className="w-4 h-4 text-white" />}
                      </div>
                      
                      <div className="flex-1">
                        <div className="flex justify-between items-center mb-1">
                          <h5 className="font-bold text-slate-900">{module.title}</h5>
                          <span className="font-semibold text-primary-600">
                            {module.price}€{module.isMonthly && <span className="text-xs text-slate-500 font-normal">/mes</span>}
                          </span>
                        </div>
                        <p className="text-sm text-slate-500">{module.features[0]} y más...</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Right: Summary Panel */}
            <div className="bg-slate-900 p-8 md:p-12 text-white flex flex-col justify-between">
              <div>
                <h4 className="text-xl font-bold mb-6">Resumen Estimado</h4>
                <div className="space-y-4 mb-8">
                  <AnimatePresence>
                    {selectedModules.length === 0 && (
                      <motion.div 
                        initial={{ opacity: 0 }} 
                        animate={{ opacity: 1 }}
                        className="flex items-center text-slate-400 text-sm italic gap-2"
                      >
                        <AlertCircle size={16} />
                        <span>Selecciona módulos para comenzar</span>
                      </motion.div>
                    )}
                    {selectedModules.map(id => {
                      const mod = SERVICE_MODULES.find(m => m.id === id);
                      return (
                        <motion.div 
                          key={id}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, height: 0 }}
                          className="flex justify-between text-sm text-slate-300"
                        >
                          <span>{mod?.title}</span>
                          <span>{mod?.price}€</span>
                        </motion.div>
                      );
                    })}
                  </AnimatePresence>
                </div>
              </div>

              <div>
                <div className="h-px w-full bg-slate-700 mb-6"></div>
                <div className="flex justify-between items-end mb-2">
                  <span className="text-slate-300">Total Proyecto</span>
                  <span className="text-3xl font-bold">{oneTimeCost}€</span>
                </div>
                {monthlyCost > 0 && (
                  <div className="flex justify-between items-end mb-6">
                    <span className="text-slate-300">Mensualidad</span>
                    <span className="text-xl font-semibold text-primary-400">+{monthlyCost}€</span>
                  </div>
                )}
                <button 
                  onClick={handleRequestPack}
                  disabled={selectedModules.length === 0}
                  className="w-full py-4 bg-primary-600 text-white rounded-xl font-bold hover:bg-primary-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  <Send size={20} />
                  Solicitar este Pack
                </button>
                <p className="text-center text-xs text-slate-500 mt-4">
                  Se abrirá tu cliente de correo con los detalles.
                </p>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};

export default CustomPlanBuilder;