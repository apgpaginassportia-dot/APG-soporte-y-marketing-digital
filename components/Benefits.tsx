import React from 'react';
import { Icons } from '../constants';

export const Benefits: React.FC = () => {
  const problems = [
    {
      title: "Inscripciones caóticas",
      description: "Datos duplicados, documentación perdida y errores en listados.",
      icon: <Icons.Warn />
    },
    {
      title: "Autocares que no llegan a tiempo",
      description: "Retrasos que descuadran partidos y generan quejas de equipos.",
      icon: <Icons.Clock />
    },
    {
      title: "Cambios de habitaciones a última hora",
      description: "Sorpresas desagradables en el rooming y gestión hotelera.",
      icon: <Icons.Shuffle />
    }
  ];

  return (
    <section id="benefits" className="py-24 bg-sports-dark relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-orange-500 font-bold tracking-[0.2em] uppercase text-sm mb-2">Entendemos tus problemas</h2>
          <p className="text-3xl md:text-4xl font-display font-bold text-white uppercase leading-tight">
            Los 3 grandes problemas del organizador
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {problems.map((prob, idx) => (
            <div key={idx} className="bg-sports-navy/50 p-8 rounded-xl border border-red-500/20 hover:border-red-500/40 transition-all duration-300">
              <div className="w-16 h-16 bg-sports-dark rounded flex items-center justify-center mb-6 border border-white/5">
                {prob.icon}
              </div>
              <h3 className="text-xl font-display font-bold text-gray-200 mb-3 uppercase">{prob.title}</h3>
              <p className="text-gray-400 leading-relaxed font-body text-sm">
                {prob.description}
              </p>
            </div>
          ))}
        </div>

        <div className="text-center">
             <h3 className="text-2xl md:text-3xl font-display font-bold text-sports-lime uppercase mb-4">
               Me encargo de que todo esto deje de ser un problema.
             </h3>
        </div>
      </div>
    </section>
  );
};