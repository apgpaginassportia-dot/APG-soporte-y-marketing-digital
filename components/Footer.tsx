import React, { useState } from 'react';
import { Mail, Phone, MapPin, Linkedin, MessageCircle, Send } from 'lucide-react';

const Footer: React.FC = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const subject = encodeURIComponent("Consulta General - APG Web");
    const body = encodeURIComponent(`Email de contacto: ${email}\n\nMensaje:\n${message}`);
    window.open(`mailto:alicia.pons.garcia@outlook.es?subject=${subject}&body=${body}`, '_blank');
  };

  const openWhatsApp = () => {
    // Enlace directo a WhatsApp API con el número proporcionado y mensaje predefinido
    const phone = "34661256504";
    const text = encodeURIComponent("Hola Alicia, me gustaría agendar una videollamada para conocer los servicios de automatización deportiva.");
    window.open(`https://wa.me/${phone}?text=${text}`, '_blank');
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
            
            <div className="flex flex-col space-y-4 mt-8">
               <button 
                onClick={openWhatsApp}
                className="inline-flex items-center justify-center px-6 py-3 border border-[#25D366] text-[#25D366] rounded-lg hover:bg-[#25D366]/10 transition-colors w-full sm:w-auto font-medium"
              >
                <MessageCircle className="w-5 h-5 mr-2" />
                Agendar llamada (WhatsApp)
              </button>
            </div>
          </div>

          {/* Contact Details */}
          <div className="lg:col-span-3">
            <h3 className="text-lg font-bold mb-6 text-white">Contacto Directo</h3>
            <ul className="space-y-6">
              <li className="flex items-start group cursor-pointer">
                <div className="w-10 h-10 rounded-lg bg-slate-800 flex items-center justify-center mr-4 group-hover:bg-primary-600 transition-colors">
                    <Mail className="w-5 h-5 text-primary-500 group-hover:text-white transition-colors" />
                </div>
                <div>
                    <span className="text-xs text-slate-500 uppercase tracking-wider">Email</span>
                    <a href="mailto:alicia.pons.garcia@outlook.es" className="block text-slate-200 hover:text-white transition-colors break-all font-medium">
                    alicia.pons.garcia@outlook.es
                    </a>
                </div>
              </li>
              <li className="flex items-start group cursor-pointer">
                <div className="w-10 h-10 rounded-lg bg-slate-800 flex items-center justify-center mr-4 group-hover:bg-primary-600 transition-colors">
                    <Phone className="w-5 h-5 text-primary-500 group-hover:text-white transition-colors" />
                </div>
                <div>
                    <span className="text-xs text-slate-500 uppercase tracking-wider">Teléfono</span>
                    <a href="tel:+34661256504" className="block text-slate-200 hover:text-white transition-colors font-medium">
                    +34 661 256 504
                    </a>
                </div>
              </li>
              <li className="flex items-start group">
                <div className="w-10 h-10 rounded-lg bg-slate-800 flex items-center justify-center mr-4">
                    <MapPin className="w-5 h-5 text-primary-500" />
                </div>
                <div>
                    <span className="text-xs text-slate-500 uppercase tracking-wider">Ubicación</span>
                    <span className="block text-slate-200">Madrid, España</span>
                </div>
              </li>
            </ul>
            
            <div className="flex space-x-4 mt-8">
              <a href="#" className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center hover:bg-blue-600 transition-colors text-slate-400 hover:text-white">
                <Linkedin size={18} />
              </a>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-5 bg-slate-800 p-6 rounded-2xl border border-slate-700">
            <h3 className="text-lg font-bold mb-4 text-white">¿Tienes dudas? Escríbenos</h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="email" className="block text-xs text-slate-400 mb-1 ml-1">Tu correo</label>
                <input 
                  id="email"
                  type="email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="ejemplo@club.com" 
                  className="w-full px-4 py-3 bg-slate-900 border border-slate-600 rounded-lg text-white focus:outline-none focus:border-primary-500 placeholder-slate-600 transition-colors"
                  required 
                />
              </div>
              <div>
                <label htmlFor="message" className="block text-xs text-slate-400 mb-1 ml-1">Tu mensaje</label>
                <textarea 
                  id="message"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Hola, me gustaría saber más sobre la gestión de hoteles..." 
                  rows={3}
                  className="w-full px-4 py-3 bg-slate-900 border border-slate-600 rounded-lg text-white focus:outline-none focus:border-primary-500 placeholder-slate-600 transition-colors resize-none"
                  required
                ></textarea>
              </div>
              <button 
                type="submit" 
                className="w-full py-3 bg-primary-600 hover:bg-primary-700 text-white font-bold rounded-lg transition-colors flex items-center justify-center gap-2"
              >
                <Send size={18} />
                Enviar Consulta
              </button>
            </form>
          </div>
        </div>

        <div className="border-t border-slate-800 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-slate-500 text-sm">© 2025 APG Soporte y Marketing Deportivo Digital.</p>
          <div className="flex space-x-6 mt-4 md:mt-0 text-sm text-slate-500">
            <a href="#" className="hover:text-white transition-colors">Aviso Legal</a>
            <a href="#" className="hover:text-white transition-colors">Privacidad</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;