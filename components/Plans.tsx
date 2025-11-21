import React from 'react';
import { PREDEFINED_PLANS } from '../constants';
import { Check, Sliders } from 'lucide-react';
import { motion } from 'framer-motion';

const Plans: React.FC = () => {
  return (
    <section id="plans" className="py-24 bg-slate-900 text-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-primary-400 font-semibold tracking-wide uppercase text-sm mb-3">Packs Ahorro</h2>
          <h3 className="text-3xl md:text-4xl font-bold text-white mb-4">Planes diseñados para crecer</h3>
          <p className="max-w-2xl mx-auto text-slate-300 text-lg">
            Combina servicios y ahorra. Soluciones llave en mano para despreocuparte de la logística.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {PREDEFINED_PLANS.map((plan, index) => (
            <motion.div
              key={plan.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className={`relative rounded-3xl p-6 flex flex-col ${
                plan.isPopular 
                  ? 'bg-white text-slate-900 ring-4 ring-primary-500 ring-opacity-50 transform lg:-translate-y-4 z-10' 
                  : 'bg-slate-800 text-white border border-slate-700'
              }`}
            >
              {plan.isPopular && (
                <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-primary-600 text-white px-4 py-1 rounded-full text-xs font-bold uppercase tracking-wide">
                  Más Vendido
                </div>
              )}

              <div className="mb-6">
                <h4 className={`text-xl font-bold mb-2 ${plan.isPopular ? 'text-slate-900' : 'text-white'}`}>
                  {plan.title}
                </h4>
                <p className={`text-sm mb-4 ${plan.isPopular ? 'text-slate-500' : 'text-slate-400'}`}>
                  {plan.description}
                </p>
                <div className="flex items-baseline">
                  <span className={`text-4xl font-extrabold ${plan.isPopular ? 'text-slate-900' : 'text-white'}`}>
                    {plan.price}€
                  </span>
                  {typeof plan.price === 'number' && (
                    <span className={`ml-2 text-sm ${plan.isPopular ? 'text-slate-500' : 'text-slate-400'}`}>
                      /evento
                    </span>
                  )}
                </div>
              </div>

              <div className={`h-px w-full mb-6 ${plan.isPopular ? 'bg-slate-200' : 'bg-slate-700'}`}></div>

              <ul className="space-y-3 mb-8 flex-1">
                {plan.features.map((feature, i) => (
                  <li key={i} className="flex items-start">
                    <Check className={`w-5 h-5 mr-3 flex-shrink-0 ${plan.isPopular ? 'text-primary-600' : 'text-primary-400'}`} />
                    <span className={`text-sm ${plan.isPopular ? 'text-slate-700' : 'text-slate-300'}`}>
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>

              <button 
                className={`w-full py-4 rounded-xl font-bold transition-all ${
                  plan.isPopular 
                    ? 'bg-primary-600 text-white hover:bg-primary-700 shadow-lg shadow-primary-500/30' 
                    : 'bg-slate-700 text-white hover:bg-slate-600'
                }`}
                onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
              >
                Elegir {plan.title}
              </button>
            </motion.div>
          ))}

          {/* Custom Plan Card */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="relative rounded-3xl p-6 flex flex-col bg-slate-800 text-white border border-slate-600 border-dashed"
          >
            <div className="mb-6">
              <h4 className="text-xl font-bold mb-2 text-white">
                A Medida
              </h4>
              <p className="text-sm mb-4 text-slate-400">
                Crea una solución única adaptada a tus necesidades específicas.
              </p>
              <div className="flex items-baseline">
                <span className="text-4xl font-extrabold text-white">
                  Variable
                </span>
              </div>
            </div>

            <div className="h-px w-full mb-6 bg-slate-700"></div>

            <ul className="space-y-3 mb-8 flex-1">
                <li className="flex items-start">
                  <Check className="w-5 h-5 mr-3 flex-shrink-0 text-primary-400" />
                  <span className="text-sm text-slate-300">Selección modular</span>
                </li>
                <li className="flex items-start">
                  <Check className="w-5 h-5 mr-3 flex-shrink-0 text-primary-400" />
                  <span className="text-sm text-slate-300">Pagas solo lo que usas</span>
                </li>
                  <li className="flex items-start">
                  <Check className="w-5 h-5 mr-3 flex-shrink-0 text-primary-400" />
                  <span className="text-sm text-slate-300">Asesoramiento IA</span>
                </li>
            </ul>

            <button 
              className="w-full py-4 rounded-xl font-bold transition-all bg-transparent border-2 border-primary-500 text-primary-400 hover:bg-primary-500 hover:text-white flex items-center justify-center gap-2"
              onClick={() => document.getElementById('calculator')?.scrollIntoView({ behavior: 'smooth' })}
            >
              <Sliders size={18} />
              Configurar Pack
            </button>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Plans;