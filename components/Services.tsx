import React from 'react';
import { motion } from 'framer-motion';
import { SERVICE_MODULES } from '../constants';
import { FileSpreadsheet, Bus, Hotel, Headset } from 'lucide-react';

const iconMap: Record<string, React.ReactNode> = {
  FileSpreadsheet: <FileSpreadsheet className="w-8 h-8" />,
  Bus: <Bus className="w-8 h-8" />,
  Hotel: <Hotel className="w-8 h-8" />,
  Headset: <Headset className="w-8 h-8" />
};

const Services: React.FC = () => {
  return (
    <section id="services" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-primary-600 font-semibold tracking-wide uppercase text-sm mb-3">Tarifas Modulares</h2>
          <h3 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Contratación Individual por Módulos</h3>
          <p className="max-w-2xl mx-auto text-slate-600 text-lg">
            Si no necesitas un plan integral, puedes contratar nuestros servicios de IA de forma independiente.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {SERVICE_MODULES.map((module, index) => (
            <motion.div
              key={module.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-slate-50 rounded-2xl p-8 border border-slate-100 hover:shadow-xl transition-shadow duration-300 relative group"
            >
              <div className="w-14 h-14 bg-white rounded-xl shadow-sm flex items-center justify-center text-primary-600 mb-6 group-hover:scale-110 transition-transform duration-300">
                {iconMap[module.icon]}
              </div>
              
              <h4 className="text-xl font-bold text-slate-900 mb-2">{module.title}</h4>
              <div className="flex items-baseline mb-6">
                <span className="text-3xl font-extrabold text-slate-900">{module.price}€</span>
                {module.isMonthly && <span className="text-slate-500 ml-1">/mes</span>}
              </div>

              <ul className="space-y-3 mb-8">
                {module.features.map((feature, i) => (
                  <li key={i} className="flex items-start text-sm text-slate-600">
                    <span className="mr-2 text-primary-500 mt-1">•</span>
                    {feature}
                  </li>
                ))}
              </ul>
              
              <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-primary-400 to-primary-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 rounded-b-2xl"></div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;