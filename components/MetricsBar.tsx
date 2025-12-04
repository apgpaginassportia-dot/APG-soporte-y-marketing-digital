
import React from 'react';
import { METRICS } from '../constants';

export const MetricsBar: React.FC = () => {
  return (
    <div className="bg-sports-blue relative z-20 -mt-10 mx-4 md:mx-0 md:mt-0 border-y border-white/10 shadow-2xl">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-white/10">
          {METRICS.map((metric, idx) => (
            <div key={idx} className="p-6 md:p-8 flex flex-col items-center justify-center text-center group hover:bg-white/5 transition-colors">
              <div className="text-sports-lime mb-2 opacity-80 group-hover:opacity-100 transform group-hover:scale-110 transition-all">
                {metric.icon}
              </div>
              <span className="text-3xl md:text-4xl font-display font-bold text-white mb-1">
                {metric.value}
              </span>
              <span className="text-[10px] md:text-xs uppercase tracking-widest text-blue-100 font-bold">
                {metric.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
