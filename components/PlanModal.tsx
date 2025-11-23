import React, { useState, useEffect } from 'react';
import { Plan, LeadForm } from '../types';
import { CUSTOM_SERVICES_LIST } from '../constants';

interface PlanModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedPlan: Plan | null;
  preselectedServices?: string[];
}

export const PlanModal: React.FC<PlanModalProps> = ({ isOpen, onClose, selectedPlan, preselectedServices = [] }) => {
  const [formData, setFormData] = useState<LeadForm>({
    name: '',
    email: '',
    phone: '',
    message: '',
    selectedServices: []
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setFormData({
        name: '',
        email: '',
        phone: '',
        message: '',
        selectedServices: preselectedServices
      });
      setErrors({});
      setShowSuccess(false);
      setIsSubmitting(false);
    }
  }, [isOpen, selectedPlan, preselectedServices]);

  if (!isOpen || !selectedPlan) return null;

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.name.trim()) newErrors.name = 'El nombre es obligatorio';
    if (!formData.email.trim()) newErrors.email = 'El email es obligatorio';
    if (!formData.phone.trim()) newErrors.phone = 'El teléfono es obligatorio';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const getCustomServiceBreakdown = () => {
    return formData.selectedServices.map(id => CUSTOM_SERVICES_LIST.find(s => s.id === id)).filter(Boolean);
  };

  const calculateTotal = () => {
    if (selectedPlan.id === 'custom') {
      const services = getCustomServiceBreakdown();
      return services.reduce((acc, curr) => acc + (curr?.price || 0), 0);
    }
    return selectedPlan.basePrice;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    
    setIsSubmitting(true);
    
    // Simulate backend call
    await new Promise(resolve => setTimeout(resolve, 800));

    setShowSuccess(true);
    
    // After showing success, redirect
    setTimeout(() => {
        executeRedirection();
    }, 2000);
  };

  const executeRedirection = () => {
    const total = calculateTotal();
    const services = getCustomServiceBreakdown();
    
    // --- Email Template (Structured Text) ---
    const emailSubject = `Solicitud APG: ${selectedPlan.title} - ${formData.name}`;
    
    let emailBody = `SOLICITUD DE SERVICIOS APG MARKETING\n`;
    emailBody += `--------------------------------------------------\n\n`;
    emailBody += `DATOS DEL CLIENTE\n`;
    emailBody += `Nombre: ${formData.name}\n`;
    emailBody += `Email:  ${formData.email}\n`;
    emailBody += `Móvil:  ${formData.phone}\n\n`;
    emailBody += `DETALLES DEL SERVICIO\n`;
    emailBody += `Plan Seleccionado: ${selectedPlan.title.toUpperCase()}\n`;
    emailBody += `Total Estimado: ${total}€\n\n`;
    
    if (selectedPlan.id === 'custom' && services.length > 0) {
      emailBody += `Servicios Incluidos:\n`;
      services.forEach(s => {
        if (s) emailBody += `- ${s.label} (${s.price}€)\n`;
      });
      emailBody += `\n`;
    }

    const mailtoUrl = `mailto:alicia.pons.garcia@outlook.es?subject=${encodeURIComponent(emailSubject)}&body=${encodeURIComponent(emailBody)}`;
    
    window.location.href = mailtoUrl;
    
    // Optionally close modal after redirection logic
    setTimeout(() => {
        onClose();
    }, 1000);
  };

  const total = calculateTotal();

  return (
    <div className="fixed inset-0 z-[100] overflow-y-auto font-sans" aria-labelledby="modal-title" role="dialog" aria-modal="true">
      <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
        <div className="fixed inset-0 bg-sports-navy/90 backdrop-blur-sm transition-opacity" aria-hidden="true" onClick={onClose}></div>
        <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>

        <div className="relative inline-block align-bottom bg-sports-navy border border-white/10 rounded-xl text-left overflow-hidden shadow-2xl transform transition-all sm:my-8 sm:align-middle sm:max-w-3xl w-full">
          
          {showSuccess ? (
             <div className="p-12 text-center bg-sports-surface">
                <div className="w-16 h-16 bg-sports-lime rounded-full flex items-center justify-center mx-auto mb-6">
                   <svg className="w-8 h-8 text-sports-navy" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                   </svg>
                </div>
                <h3 className="text-2xl font-display font-bold text-white mb-2 uppercase">¡Solicitud Enviada!</h3>
                <p className="text-gray-400 font-body mb-6">Estamos redirigiéndote a tu cliente de correo para finalizar el envío.</p>
                <div className="w-full bg-sports-navy rounded-full h-1.5 overflow-hidden">
                   <div className="bg-sports-blue h-full animate-[progress_2s_ease-in-out]"></div>
                </div>
             </div>
          ) : (
            <div className="flex flex-col md:flex-row min-h-full">
              {/* Left Panel: Summary */}
              <div className="md:w-5/12 bg-sports-surface p-6 md:p-8 border-b md:border-b-0 md:border-r border-white/5 flex flex-col order-first">
                <div className="mb-6">
                   <h3 className="text-xl md:text-2xl font-display font-bold text-white uppercase mb-2">
                    {selectedPlan.title}
                   </h3>
                   <div className="text-3xl font-display font-bold text-sports-lime">{total}€</div>
                   <p className="text-[10px] text-gray-500 mt-1 uppercase tracking-wide">Estimación sin IVA</p>
                </div>

                <div className="flex-1 overflow-y-auto custom-scrollbar pr-2 max-h-[30vh] md:max-h-none">
                   <p className="text-sm text-gray-300 mb-6 leading-relaxed font-body">
                     {selectedPlan.details || selectedPlan.description}
                   </p>
                   
                   {selectedPlan.id === 'custom' ? (
                      <div className="bg-sports-navy/50 rounded p-4 border border-white/5 mb-6">
                        <h4 className="text-xs font-bold text-sports-blue uppercase mb-3 pb-2 border-b border-white/10">Desglose de Servicios</h4>
                        <ul className="space-y-0">
                          {getCustomServiceBreakdown().map((s, idx, arr) => s && (
                            <li key={idx} className={`${idx !== arr.length - 1 ? 'border-b border-white/5 pb-3 mb-3' : ''}`}>
                               <div className="flex justify-between items-center mb-1">
                                  <span className="font-bold text-gray-200 text-xs">{s.label}</span>
                                  <span className="font-bold text-sports-lime text-xs">{s.price}€</span>
                               </div>
                               <p className="text-gray-500 text-[10px] leading-snug">{s.description}</p>
                            </li>
                          ))}
                        </ul>
                      </div>
                   ) : (
                      <div className="bg-sports-navy/50 rounded p-4 border border-white/5 mb-6">
                        <h4 className="text-xs font-bold text-sports-blue uppercase mb-3 pb-2 border-b border-white/10">Incluye</h4>
                        <ul className="space-y-2">
                          {selectedPlan.features.map((feature, idx) => (
                            <li key={idx} className="flex items-start text-xs text-gray-300">
                               <svg className="w-4 h-4 text-sports-lime mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                               </svg>
                               <span className="leading-snug">{feature}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                   )}
                </div>
              </div>

              {/* Right Panel: Form */}
              <div className="md:w-7/12 p-6 md:p-8 bg-sports-navy">
                 <div className="flex justify-between items-center mb-6">
                   <h4 className="text-lg font-bold text-white uppercase tracking-wide font-display">Tus Datos</h4>
                   <button onClick={onClose} className="text-gray-500 hover:text-white transition-colors p-2 -mr-2">
                     <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                     </svg>
                   </button>
                 </div>

                 <form onSubmit={handleSubmit} className="space-y-5">
                    <div>
                        <label className="block text-xs font-bold text-sports-lime uppercase mb-2">Nombre Completo</label>
                        <input
                          type="text"
                          value={formData.name}
                          onChange={e => setFormData({...formData, name: e.target.value})}
                          className={`block w-full border ${errors.name ? 'border-red-500' : 'border-gray-700'} rounded bg-sports-dark text-white py-3 px-4 focus:outline-none focus:border-sports-blue transition-all placeholder-gray-600 font-body text-sm`}
                          placeholder="Tu nombre"
                        />
                        {errors.name && <p className="mt-1 text-xs text-red-400">{errors.name}</p>}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold text-sports-lime uppercase mb-2">Email</label>
                        <input
                          type="email"
                          value={formData.email}
                          onChange={e => setFormData({...formData, email: e.target.value})}
                          className={`block w-full border ${errors.email ? 'border-red-500' : 'border-gray-700'} rounded bg-sports-dark text-white py-3 px-4 focus:outline-none focus:border-sports-blue transition-all placeholder-gray-600 font-body text-sm`}
                          placeholder="tu@email.com"
                        />
                        {errors.email && <p className="mt-1 text-xs text-red-400">{errors.email}</p>}
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-sports-lime uppercase mb-2">Teléfono</label>
                        <input
                          type="tel"
                          value={formData.phone}
                          onChange={e => setFormData({...formData, phone: e.target.value})}
                          className={`block w-full border ${errors.phone ? 'border-red-500' : 'border-gray-700'} rounded bg-sports-dark text-white py-3 px-4 focus:outline-none focus:border-sports-blue transition-all placeholder-gray-600 font-body text-sm`}
                          placeholder="+34..."
                        />
                        {errors.phone && <p className="mt-1 text-xs text-red-400">{errors.phone}</p>}
                      </div>
                    </div>

                    <div className="pt-4">
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full flex justify-center py-4 px-4 border border-transparent rounded shadow-lg shadow-sports-blue/20 text-sm font-bold text-white bg-sports-blue hover:bg-sports-lime hover:text-sports-navy uppercase tracking-wider transition-all duration-300 transform hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-wait"
                      >
                        {isSubmitting ? 'Procesando...' : 'Enviar Solicitud'}
                      </button>
                      <p className="mt-4 text-center text-[10px] text-gray-500 leading-tight">
                        Al enviar, se generará un correo oficial con los detalles de tu solicitud.
                      </p>
                    </div>
                 </form>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};