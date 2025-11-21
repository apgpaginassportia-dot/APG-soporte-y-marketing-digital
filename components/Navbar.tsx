import React, { useState, useEffect } from 'react';
import { Menu, X, Cpu } from 'lucide-react';

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
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsOpen(false);
  };

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? 'bg-white/90 backdrop-blur-md shadow-md py-4' : 'bg-transparent py-6'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          <div className="flex items-center cursor-pointer" onClick={() => scrollToSection('hero')}>
            <Cpu className="h-8 w-8 text-primary-600 flex-shrink-0" />
            <div className="ml-2 flex flex-col">
              <span className="text-lg sm:text-xl font-bold text-slate-900 tracking-tight leading-tight">APG</span>
              <span className="text-[10px] sm:text-xs font-semibold text-slate-600 uppercase tracking-wider hidden sm:block">Soporte y Marketing Deportivo Digital</span>
            </div>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            <button onClick={() => scrollToSection('services')} className="text-slate-600 hover:text-primary-600 transition-colors font-medium">Servicios</button>
            <button onClick={() => scrollToSection('plans')} className="text-slate-600 hover:text-primary-600 transition-colors font-medium">Planes</button>
            <button onClick={() => scrollToSection('calculator')} className="text-slate-600 hover:text-primary-600 transition-colors font-medium">Personalizar</button>
            <button 
              onClick={() => scrollToSection('contact')}
              className="bg-primary-600 text-white px-5 py-2.5 rounded-full font-medium hover:bg-primary-700 transition-all shadow-lg shadow-primary-500/30"
            >
              Contactar
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button onClick={() => setIsOpen(!isOpen)} className="text-slate-900 hover:text-primary-600 focus:outline-none">
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white border-t absolute w-full shadow-lg">
          <div className="px-4 pt-2 pb-8 space-y-1">
            <button onClick={() => scrollToSection('services')} className="block px-3 py-4 text-base font-medium text-slate-700 hover:text-primary-600 w-full text-left">Servicios</button>
            <button onClick={() => scrollToSection('plans')} className="block px-3 py-4 text-base font-medium text-slate-700 hover:text-primary-600 w-full text-left">Planes</button>
            <button onClick={() => scrollToSection('calculator')} className="block px-3 py-4 text-base font-medium text-slate-700 hover:text-primary-600 w-full text-left">Calculadora</button>
            <button onClick={() => scrollToSection('contact')} className="block w-full text-center mt-4 bg-primary-600 text-white px-5 py-3 rounded-lg font-medium">Contactar</button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;