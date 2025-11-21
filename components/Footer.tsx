import React from 'react';
import { Mail, Phone, MapPin, Linkedin, Twitter, Instagram } from 'lucide-react';

const Footer: React.FC = () => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Gracias por tu interés. Nos pondremos en contacto contigo pronto.');
  };

  return (
    <footer id="contact" className="bg-slate-900 pt-20 pb-10 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 mb-16">
          
          {/* Brand Info */}
          <div className="lg:col-span-4">
            <h2 className="text-xl font-bold text-white mb-6 flex items-start">
              <span className="text-primary-500 mr-2 mt-1">✦</span> 
              <div className="flex flex-col">
                <span>APG</span>
                <span className="text-sm font-normal text-slate-400">Soporte y Marketing Deportivo Digital</span>
              </div>
            </h2>
            <p className="text-slate-400 mb-6 leading-relaxed">
              Transformamos la gestión deportiva mediante inteligencia artificial y automatización de procesos. 
              Organiza más rápido, con menos errores y mayor rentabilidad.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center hover:bg-primary-600 transition-colors text-slate-300 hover:text-white">
                <Linkedin size={18} />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center hover:bg-primary-600 transition-colors text-slate-300 hover:text-white">
                <Twitter size={18} />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center hover:bg-primary-600 transition-colors text-slate-300 hover:text-white">
                <Instagram size={18} />
              </a>
            </div>
          </div>

          {/* Contact Details */}
          <div className="lg:col-span-3">
            <h3 className="text-lg font-bold mb-6 text-white">Contacto</h3>
            <ul className="space-y-4">
              <li className="flex items-start">
                <Mail className="w-5 h-5 text-primary-500 mr-3 mt-1" />
                <a href="mailto:alicia.pons.garcia@outlook.es" className="text-slate-300 hover:text-white transition-colors break-all">
                  alicia.pons.garcia@outlook.es
                </a>
              </li>
              <li className="flex items-start">
                <Phone className="w-5 h-5 text-primary-500 mr-3 mt-1" />
                <a href="tel:+34661256504" className="text-slate-300 hover:text-white transition-colors">
                  661 256 504
                </a>
              </li>
              <li className="flex items-start">
                <MapPin className="w-5 h-5 text-primary-500 mr-3 mt-1" />
                <span className="text-slate-300">Madrid, España<br />Disponible remoto mundialmente</span>
              </li>
            </ul>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-5 bg-slate-800 p-6 rounded-2xl border border-slate-700">
            <h3 className="text-lg font-bold mb-4 text-white">Empieza tu automatización</h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <input 
                  type="email" 
                  placeholder="Tu correo electrónico" 
                  className="w-full px-4 py-3 bg-slate-900 border border-slate-600 rounded-lg text-white focus:outline-none focus:border-primary-500 placeholder-slate-500"
                  required 
                />
              </div>
              <div>
                <textarea 
                  placeholder="¿Qué necesitas organizar?" 
                  rows={3}
                  className="w-full px-4 py-3 bg-slate-900 border border-slate-600 rounded-lg text-white focus:outline-none focus:border-primary-500 placeholder-slate-500"
                  required
                ></textarea>
              </div>
              <button 
                type="submit" 
                className="w-full py-3 bg-primary-600 hover:bg-primary-700 text-white font-bold rounded-lg transition-colors"
              >
                Solicitar Información
              </button>
            </form>
          </div>
        </div>

        <div className="border-t border-slate-800 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-slate-500 text-sm">© 2025 APG Soporte y Marketing Deportivo Digital. Todos los derechos reservados.</p>
          <div className="flex space-x-6 mt-4 md:mt-0 text-sm text-slate-500">
            <a href="#" className="hover:text-white">Privacidad</a>
            <a href="#" className="hover:text-white">Términos</a>
            <a href="#" className="hover:text-white">Cookies</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;