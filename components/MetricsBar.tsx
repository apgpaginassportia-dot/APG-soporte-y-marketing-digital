import React, { useState, useEffect, useRef } from 'react';
import { METRICS } from '../constants';

const AnimatedNumber: React.FC<{ value: string }> = ({ value }) => {
  const [displayValue, setDisplayValue] = useState('0');
  const [hasAnimated, setHasAnimated] = useState(false);
  const elementRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !hasAnimated) {
          startAnimation();
        }
      },
      { threshold: 0.5 }
    );

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => observer.disconnect();
  }, [hasAnimated, value]);

  const startAnimation = () => {
    setHasAnimated(true);
    const numberMatch = value.match(/\d+/);
    if (!numberMatch) {
      setDisplayValue(value);
      return;
    }

    const target = parseInt(numberMatch[0]);
    const prefix = value.split(numberMatch[0])[0];
    const suffix = value.split(numberMatch[0])[1];
    
    let startTimestamp: number | null = null;
    const duration = 2000;

    const step = (timestamp: number) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      const easeProgress = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      const currentCount = Math.floor(easeProgress * target);
      setDisplayValue(`${prefix}${currentCount}${suffix}`);
      if (progress < 1) window.requestAnimationFrame(step);
    };

    window.requestAnimationFrame(step);
  };

  return (
    <span ref={elementRef} className="tabular-nums">
      {displayValue}
    </span>
  );
};

export const MetricsBar: React.FC = () => {
  return (
    <div className="bg-sports-primary relative z-20 border-y border-white/5 shadow-2xl overflow-hidden">
      {/* Decorative pulse element */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -mr-32 -mt-32 blur-3xl animate-pulse-slow"></div>
      
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-white/10">
          {METRICS.map((metric, idx) => (
            <div key={idx} className="p-8 md:p-12 flex flex-col items-center justify-center text-center group hover:bg-white/5 transition-colors">
              <div className="text-sports-accent mb-4 opacity-80 group-hover:opacity-100 transform group-hover:scale-110 transition-all">
                {metric.icon}
              </div>
              <span className="text-3xl md:text-5xl font-display font-extrabold text-white mb-2 tracking-tighter">
                <AnimatedNumber value={metric.value} />
              </span>
              <span className="text-[10px] md:text-[11px] uppercase tracking-[0.3em] text-indigo-100 font-bold opacity-70">
                {metric.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};