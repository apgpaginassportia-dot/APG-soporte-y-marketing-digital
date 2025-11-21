import React, { useState } from 'react';
import { X, Send, CheckCircle, User, Mail, Phone } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
  planTitle: string;
  planPrice: string | number;
  planFeatures: string[]; // Lista de características o resumen
  isCustom?: boolean; // Para saber si es el plan a medida
}

const ContactModal: React.FC<ContactModalProps> = ({ 
  isOpen, 
  onClose, 
  planTitle, 
  planPrice, 
  planFeatures,
  isCustom 
}) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Construir el cuerpo del correo
    const featuresList = planFeatures.map(f => `- ${f}`).join('\n');
    
    const subject = encodeURIComponent(`Solicitud: ${planTitle} - APG Sportflow`);
    
    const bodyContent = `Hola Alicia,

Me interesa contratar el siguiente servicio:

PLAN SELECCIONADO: ${planTitle}
PRECIO ESTIMADO: ${planPrice}${typeof planPrice === 'number' ? '€' : ''}

DETALLES DEL PLAN:
${featuresList}

MIS DATOS DE CONTACTO:
-----------------------
Nombre: ${formData.name}
Email: ${formData.email}
Teléfono: ${formData.phone}

Quedo a la espera de tu confirmación para avanzar.
Gracias.`;

    const body = encodeURIComponent(bodyContent);

    // Abrir cliente de correo
    window.open(`mailto:alicia.pons.garcia@outlook.es?subject=${subject}&body=${body}`, '_blank');
    
    // Cerrar modal
    onClose();
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
        {/* Backdrop */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
        ></motion.div>

        {/* Modal Content */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative bg-white w-full max-w-lg rounded-2xl shadow-2xl overflow-hidden"
        >
          {/* Header */}
          <div className="bg-primary-600 p-6 text-white flex justify-between items-start">
            <div>
              <h3 className="text-xl font-bold mb-1">Confirmar Solicitud</h3>
              <p className="text-primary-100 text-sm">Estás a un paso de optimizar tu evento.</p>
            </div>
            <button 
              onClick={onClose}
              className="text-white/80 hover:text-white hover:bg-primary-500/50 p-1 rounded-lg transition-colors"
            >
              <X size={24} />
            </button>
          </div>

          <div className="p-6 md:p-8">
            {/* Plan Summary Card */}
            <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 mb-6 flex items-start gap-4">
              <div className="bg-primary-100 p-2 rounded-lg text-primary-600 mt-1">
                <CheckCircle size={20} />
              </div>
              <div>
                <h4 className="font-bold text-slate-900">{planTitle}</h4>
                <p className="text-slate-500 text-sm mb-1">
                  {isCustom ? 'Configuración personalizada' : 'Plan predefinido'}
                </p>
                <p className="text-lg font-bold text-primary-600">
                  {planPrice}
                  {typeof planPrice === 'number' ? '€' : ''}
                </p>
              </div>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Nombre Completo</label>
                <div className="relative">
                  <User className="absolute left-3 top-3 text-slate-400 w-5 h-5" />
                  <input 
                    type="text" 
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Tu nombre o el de tu empresa"
                    className="w-full pl-10 pr-4 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition-all"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Correo Electrónico</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 text-slate-400 w-5 h-5" />
                  <input 
                    type="email" 
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="ejemplo@club.com"
                    className="w-full pl-10 pr-4 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition-all"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Teléfono de Contacto</label>
                <div className="relative">
                  <Phone className="absolute left-3 top-3 text-slate-400 w-5 h-5" />
                  <input 
                    type="tel" 
                    name="phone"
                    required
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="+34 600 000 000"
                    className="w-full pl-10 pr-4 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition-all"
                  />
                </div>
              </div>

              <div className="pt-4">
                <button 
                  type="submit"
                  className="w-full bg-slate-900 hover:bg-primary-600 text-white font-bold py-3.5 rounded-xl shadow-lg shadow-slate-900/20 hover:shadow-primary-600/30 transition-all duration-300 flex items-center justify-center gap-2"
                >
                  <Send size={18} />
                  Enviar Solicitud Ahora
                </button>
                <p className="text-center text-xs text-slate-500 mt-3">
                  Se abrirá tu gestor de correo para confirmar el envío.
                </p>
              </div>
            </form>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default ContactModal;