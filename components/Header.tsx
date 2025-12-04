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
    { name: 'Clubes', id: 'teams' }, // New link
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
    <header className={`fixed w-full z-50 transition-all duration-300 ${scrolled || isOpen ? 'bg-sports-navy/95 backdrop-blur-md shadow-lg border-b border-sports-gray' : 'bg-transparent'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <div className="flex items-center">
            <a href="/" className="flex-shrink-0 flex items-center gap-3 text-decoration-none group">
              <div className="w-10 h-10 bg-sports-blue rounded flex items-center justify-center text-white skew-x-[-10deg] group-hover:bg-sports-lime transition-colors duration-300 shadow-[0_0_15px_rgba(26,115,232,0.5)]">
                <span className="font-display font-bold text-2xl skew-x-[10deg] text-white group-hover:text-sports-navy">A</span>
              </div>
              <div className="flex flex-col">
                <span className="font-display font-bold text-white text-xl tracking-wide uppercase">APG Marketing</span>
                <span className="text-[10px] text-sports-lime uppercase tracking-[0.2em] font-semibold">Soporte Digital</span>
              </div>
            </a>
          </div>
          
          {/* Desktop Nav */}
          <div className="hidden md:flex space-x-8">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={`#${link.id}`}
                onClick={(e) => handleScroll(e, link.id)}
                className="relative text-xs lg:text-sm font-bold uppercase tracking-wider text-sports-text hover:text-white transition-colors py-2 group"
              >
                {link.name}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-sports-lime transition-all duration-300 group-hover:w-full"></span>
              </a>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-white hover:text-sports-lime focus:outline-none p-2"
              aria-label="Toggle menu"
            >
              <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {isOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Nav */}
      <div className={`md:hidden absolute w-full bg-sports-navy border-b border-sports-gray shadow-xl transition-all duration-300 ease-in-out ${isOpen ? 'opacity-100 max-h-96' : 'opacity-0 max-h-0 overflow-hidden'}`}>
        <div className="px-4 pt-4 pb-6 space-y-2">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={`#${link.id}`}
              onClick={(e) => handleScroll(e, link.id)}
              className="block px-4 py-3 rounded-lg text-lg font-display font-bold uppercase text-white hover:bg-sports-surface hover:text-sports-lime transition-colors border border-transparent hover:border-white/5"
            >
              {link.name}
            </a>
          ))}
        </div>
      </div>
    </header>
  );
};