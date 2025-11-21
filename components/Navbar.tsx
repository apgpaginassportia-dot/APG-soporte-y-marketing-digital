import React, { useState, useEffect } from 'react';
import { Menu, X, Cpu, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 80; // Compensar la altura del navbar fijo
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
    setIsOpen(false);
  };

  const navLinks = [
    { name: 'Soluciones', id: 'solutions' },
    { name: 'Módulos', id: 'services' },
    { name: 'Packs', id: 'plans' },
    { name: 'A medida', id: 'calculator' },
  ];

  return (
    <nav 
      className={`fixed w-full z-50 transition-all duration-500 border-b ${
        scrolled 
          ? 'bg-white/80 backdrop-blur-md border-slate-200/50 shadow-sm py-3' 
          : 'bg-transparent border-transparent py-6'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          
          {/* Logo Brand */}
          <div 
            className="flex items-center cursor-pointer group" 
            onClick={() => scrollToSection('hero')}
          >
            <div className={`p-2 rounded-xl mr-3 transition-colors ${scrolled ? 'bg-primary-50 text-primary-600' : 'bg-white text-primary-600 shadow-sm'}`}>
              <Cpu className="h-6 w-6" />
            </div>
            <div className="flex flex-col">
              <span className="text-lg font-bold text-slate-900 tracking-tight leading-none group-hover:text-primary-600 transition-colors">APG</span>
              <span className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider mt-0.5">Soporte Digital</span>
            </div>
          </div>

          {/* Desktop Navigation (Centered) */}
          <div className="hidden md:flex items-center space-x-1 bg-slate-100/50 p-1 rounded-full border border-slate-200/50 backdrop-blur-sm">
            {navLinks.map((link) => (
              <button
                key={link.name}
                onClick={() => scrollToSection(link.id)}
                className="px-5 py-2 text-sm font-medium text-slate-600 hover:text-slate-900 hover:bg-white hover:shadow-sm rounded-full transition-all duration-200"
              >
                {link.name}
              </button>
            ))}
          </div>

          {/* Right CTA */}
          <div className="hidden md:flex items-center">
            <button 
              onClick={() => scrollToSection('contact')}
              className="group flex items-center gap-2 bg-slate-900 text-white px-5 py-2.5 rounded-lg text-sm font-medium hover:bg-primary-600 transition-all shadow-lg shadow-slate-900/10 hover:shadow-primary-600/20"
            >
              Contactar
              <ChevronRight size={16} className="text-slate-400 group-hover:text-white transition-colors" />
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button 
              onClick={() => setIsOpen(!isOpen)} 
              className="p-2 text-slate-600 hover:text-primary-600 hover:bg-slate-100 rounded-lg transition-colors focus:outline-none"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white border-b border-slate-100 overflow-hidden shadow-xl absolute w-full"
          >
            <div className="px-4 py-6 space-y-2">
              {navLinks.map((link) => (
                <button 
                  key={link.name}
                  onClick={() => scrollToSection(link.id)} 
                  className="block w-full text-left px-4 py-3 text-base font-medium text-slate-600 hover:text-primary-600 hover:bg-slate-50 rounded-xl transition-colors"
                >
                  {link.name}
                </button>
              ))}
              <div className="pt-4 mt-4 border-t border-slate-100">
                <button 
                  onClick={() => scrollToSection('contact')} 
                  className="block w-full text-center bg-primary-600 text-white px-5 py-3 rounded-xl font-bold shadow-lg shadow-primary-600/20 active:scale-95 transition-transform"
                >
                  Contactar ahora
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;