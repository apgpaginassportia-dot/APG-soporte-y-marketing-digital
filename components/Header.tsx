import React, { useState, useEffect } from 'react';

export const Header: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScrollEvent = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScrollEvent);
    return () => window.removeEventListener('scroll', handleScrollEvent);
  }, []);

  // Bloquear scroll del body cuando el menú está abierto
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isOpen]);

  const navLinks = [
    { name: 'Torneos', id: 'detailed-services' },
    { name: 'Servicios', id: 'services-table' },
    { name: 'Planes', id: 'plans' },
    { name: 'Clubes', id: 'teams' },
    { name: 'Colegios', id: 'schools' },
    { name: 'Configurador', id: 'builder' },
    { name: 'Contacto', id: 'contact' },
  ];

  const handleScroll = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    
    // Cerramos el menú primero para que la transición de cierre comience
    setIsOpen(false);
    
    // Pequeño delay para permitir que el menú empiece a cerrarse antes de hacer scroll
    setTimeout(() => {
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }, 150);
  };

  return (
    <header className={`fixed w-full z-[150] transition-all duration-500 ${scrolled || isOpen ? 'bg-sports-bg/90 backdrop-blur-xl border-b border-white/5 py-4' : 'bg-transparent py-8'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <a href="/" className="flex-shrink-0 flex items-center gap-5 group">
              <div className="w-12 h-12 bg-sports-primary rounded-2xl flex items-center justify-center text-white transition-all group-hover:rotate-12 group-hover:scale-110 shadow-lg shadow-indigo-900/50">
                <span className="font-display font-black text-3xl">A</span>
              </div>
              <div className="flex flex-col">
                <span className={`font-display font-black text-3xl tracking-tighter text-white`}>APG</span>
                <span className="text-[9px] text-sports-accent uppercase tracking-[0.3em] font-extrabold -mt-1">Marketing & Operaciones</span>
              </div>
            </a>
          </div>
          
          {/* Desktop Nav */}
          <div className="hidden md:flex space-x-2">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={`#${link.id}`}
                onClick={(e) => handleScroll(e, link.id)}
                className="px-5 py-2.5 rounded-xl text-[11px] font-bold uppercase tracking-widest text-slate-400 hover:text-sports-accent hover:bg-white/5 transition-all"
              >
                {link.name}
              </a>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-white hover:text-sports-accent transition-colors p-2 z-[160]"
              aria-label="Toggle menu"
            >
              <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {isOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Nav Overlay (Backdrop) */}
      <div 
        className={`fixed inset-0 bg-sports-dark/60 backdrop-blur-sm transition-opacity duration-500 md:hidden ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        onClick={() => setIsOpen(false)}
      />

      {/* Mobile Nav Content */}
      <div 
        className={`md:hidden absolute w-full bg-sports-bg/95 border-b border-white/5 shadow-2xl transition-all duration-500 ease-in-out transform ${
          isOpen ? 'opacity-100 translate-y-0 visible' : 'opacity-0 -translate-y-10 invisible'
        }`}
      >
        <div className="px-6 pt-6 pb-12 space-y-2">
          {navLinks.map((link, index) => (
            <a
              key={link.name}
              href={`#${link.id}`}
              onClick={(e) => handleScroll(e, link.id)}
              style={{ 
                transitionDelay: isOpen ? `${index * 50}ms` : '0ms',
                transform: isOpen ? 'translateX(0)' : 'translateX(-20px)',
                opacity: isOpen ? 1 : 0
              }}
              className="block px-6 py-6 rounded-2xl text-xl font-display font-extrabold uppercase tracking-tight text-white hover:bg-white/5 hover:text-sports-accent transition-all"
            >
              {link.name}
            </a>
          ))}
        </div>
      </div>
    </header>
  );
};