import React, { useState, useEffect } from 'react';
import { Menu, X, Cpu, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Manejar el efecto de scroll para cambiar el fondo
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Cerrar menú móvil automáticamente si la pantalla se agranda (ej. rotar tablet)
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsOpen(false);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const scrollToSection = (id: string) => {
    setIsOpen(false);
    
    // Pequeño timeout para permitir que el menú empiece a cerrar y evitar bloqueos de UI en móviles
    setTimeout(() => {
      const element = document.getElementById(id);
      if (element) {
        const offset = 80; // Compensar la altura del navbar fijo
        const elementPosition = element.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.scrollY - offset;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    }, 100);
  };

  const navLinks = [
    { name: 'Soluciones', id: 'solutions' },
    { name: 'Módulos', id: 'services' },
    { name: 'Packs', id: 'plans' },
    { name: 'A medida', id: 'calculator' },
  ];

  return (
    <nav 
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        scrolled || isOpen 
          ? 'bg-white/95 backdrop-blur-md border-b border-slate-100 shadow-sm py-2' 
          : 'bg-transparent py-4 md:py-6'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          
          {/* Logo Brand */}
          <div 
            className="flex items-center cursor-pointer group relative z-50" 
            onClick={() => scrollToSection('hero')}
          >
            <div className={`p-2 rounded-xl mr-3 transition-colors ${scrolled || isOpen ? 'bg-primary-50 text-primary-600' : 'bg-white text-primary-600 shadow-sm'}`}>
              <Cpu className="h-6 w-6" />
            </div>
            <div className="flex flex-col">
              <span className={`text-lg font-bold tracking-tight leading-none transition-colors ${scrolled || isOpen ? 'text-slate-900' : 'text-slate-900'}`}>
                APG
              </span>
              <span className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider mt-0.5">
                Soporte Digital
              </span>
            </div>
          </div>

          {/* Desktop Navigation (Centered) */}
          <div className="hidden md:flex items-center space-x-1 bg-slate-100/50 p-1 rounded-full border border-slate-200/50 backdrop-blur-sm">
            {navLinks.map((link) => (
              <button
                key={link.name}
                onClick={() => scrollToSection(link.id)}
                className="px-3 lg:px-5 py-2 text-sm font-medium text-slate-600 hover:text-slate-900 hover:bg-white hover:shadow-sm rounded-full transition-all duration-200"
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
          <div className="md:hidden flex items-center relative z-50">
            <button 
              onClick={() => setIsOpen(!isOpen)} 
              aria-label={isOpen ? "Cerrar menú" : "Abrir menú"}
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
            transition={{ duration: 0.2, ease: "easeInOut" }}
            className="md:hidden absolute top-full left-0 w-full bg-white border-b border-slate-100 shadow-xl overflow-hidden"
            style={{ maxHeight: '85vh', overflowY: 'auto' }}
          >
            <div className="px-4 py-6 space-y-2 flex flex-col">
              {navLinks.map((link) => (
                <button 
                  key={link.name}
                  onClick={(e) => {
                    e.preventDefault();
                    scrollToSection(link.id);
                  }} 
                  className="block w-full text-left px-4 py-4 text-base font-medium text-slate-600 hover:text-primary-600 hover:bg-slate-50 rounded-xl transition-colors active:bg-slate-100"
                >
                  {link.name}
                </button>
              ))}
              <div className="pt-4 mt-4 border-t border-slate-100">
                <button 
                  onClick={(e) => {
                    e.preventDefault();
                    scrollToSection('contact');
                  }} 
                  className="block w-full text-center bg-slate-900 text-white px-5 py-4 rounded-xl font-bold shadow-lg active:scale-95 transition-transform"
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