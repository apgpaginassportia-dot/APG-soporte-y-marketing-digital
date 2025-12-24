import React, { useState, useEffect } from 'react';

export const Header: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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
    setIsOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className={`fixed w-full z-50 transition-all duration-500 ${scrolled || isOpen ? 'bg-white/90 backdrop-blur-xl shadow-lg py-3' : 'bg-transparent py-6'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-14">
          <div className="flex items-center">
            <a href="/" className="flex-shrink-0 flex items-center gap-4 group">
              <div className="w-11 h-11 bg-sports-primary rounded-2xl flex items-center justify-center text-white transition-all group-hover:rotate-12 group-hover:scale-110 shadow-lg shadow-indigo-200">
                <span className="font-display font-black text-2xl">A</span>
              </div>
              <div className="flex flex-col">
                <span className={`font-display font-black text-2xl tracking-tighter transition-colors ${scrolled ? 'text-sports-dark' : 'text-sports-dark'}`}>APG</span>
                <span className="text-[8px] text-sports-primary uppercase tracking-[0.3em] font-extrabold -mt-1">Marketing & Operaciones</span>
              </div>
            </a>
          </div>
          
          {/* Desktop Nav */}
          <div className="hidden md:flex space-x-1">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={`#${link.id}`}
                onClick={(e) => handleScroll(e, link.id)}
                className="px-4 py-2 rounded-xl text-[10px] font-bold uppercase tracking-widest text-sports-gray hover:text-sports-primary hover:bg-indigo-50 transition-all"
              >
                {link.name}
              </a>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-sports-dark hover:text-sports-primary transition-colors p-2"
              aria-label="Toggle menu"
            >
              <svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
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

      {/* Mobile Nav */}
      <div className={`md:hidden absolute w-full bg-white border-b border-sports-border shadow-2xl transition-all duration-500 ease-in-out ${isOpen ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4 pointer-events-none'}`}>
        <div className="px-6 pt-6 pb-12 space-y-2">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={`#${link.id}`}
              onClick={(e) => handleScroll(e, link.id)}
              className="block px-6 py-5 rounded-2xl text-lg font-display font-extrabold uppercase tracking-tight text-sports-dark hover:bg-indigo-50 hover:text-sports-primary transition-all"
            >
              {link.name}
            </a>
          ))}
        </div>
      </div>
    </header>
  );
};