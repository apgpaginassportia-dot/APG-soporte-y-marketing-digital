
import React, { useState, useEffect, useMemo } from 'react';
import { Plan, LeadForm, CustomServiceOption, TeamServiceItem } from '../types';
import { CUSTOM_SERVICES_LIST, TEAM_SERVICES, CALENDLY_URL } from '../constants';
import { createContact } from '../services/airtableService';

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
    pricePerStudent: '',
    selectedServices: []
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);

  useEffect(() => {
    if (isOpen && selectedPlan) {
      setFormData({
        name: '',
        email: '',
        phone: '',
        message: '',
        pricePerStudent: '',
        selectedServices: preselectedServices || []
      });
      setShowSuccessPopup(false);
      setIsSubmitting(false);
    }
  }, [isOpen]); 

  const getCustomServiceBreakdown = () => {
    if (!selectedPlan) return [];
    if (selectedPlan.id === 'custom') {
      return formData.selectedServices.map(id => CUSTOM_SERVICES_LIST.find(s => s.id === id)).filter((s): s is CustomServiceOption => !!s);
    }
    if (selectedPlan.id === 'team_custom') {
      return formData.selectedServices.map(id => TEAM_SERVICES.find(s => s.id === id)).filter((s): s is TeamServiceItem => !!s);
    }
    return [];
  };

  const totalPrice = useMemo(() => {
    if (!selectedPlan) return 0;
    if (selectedPlan.id === 'custom') {
      const services = getCustomServiceBreakdown() as CustomServiceOption[];
      return services.reduce((acc, curr) => acc + (curr.price || 0), 0);
    }
    if (selectedPlan.id === 'team_custom') {
      const services = getCustomServiceBreakdown() as TeamServiceItem[];
      return services.reduce((acc, curr) => {
        const priceStr = curr.price || "0";
        const priceNum = parseInt(priceStr.replace(/[^\d]/g, '')) || 0;
        return acc + priceNum;
      }, 0);
    }
    return selectedPlan.basePrice;
  }, [selectedPlan, formData.selectedServices]);

  // Cálculo dinámico de hitos de pago (30% - 40% - 30%)
  const calculatedMilestones = useMemo(() => {
    if (!totalPrice) return [];
    return [
      { label: 'Reserva y Bloqueo (30%)', amount: Math.round(totalPrice * 0.3) },
      { label: 'Inicio Operativa (40%)', amount: Math.round(totalPrice * 0.4) },
      { label: 'Entrega / Evento (30%)', amount: Math.round(totalPrice * 0.3) }
    ];
  }, [totalPrice]);

  if (!isOpen || !selectedPlan) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.phone) {
        alert("Por favor, rellena los campos obligatorios (*).");
        return;
    }
    setIsSubmitting(true);
    try {
      await createContact({
        Nombre: formData.name,
        Email: formData.email,
        Teléfono: formData.phone,
        Asunto: `SOLICITUD AUDITORÍA: ${selectedPlan.title}`,
        Detalles: `PLAN INTERÉS: ${selectedPlan.id}\nESTIMADO: ${totalPrice}€ (Sin IVA)\nDESGLOSE: ${calculatedMilestones.map(m => `${m.label}: ${m.amount}€`).join(' | ')}`,
        Mensaje: formData.message || "Interés en auditoría estratégica gratuita."
      });
      setShowSuccessPopup(true);
    } catch (error: any) {
      alert("Error al enviar solicitud: " + error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-sports-dark/95 backdrop-blur-xl" onClick={onClose}></div>
      
      <div 
        className="relative bg-sports-navy border border-white/10 rounded-[2.5rem] w-full max-w-5xl max-h-[95vh] overflow-hidden shadow-[0_0_100px_rgba(0,0,0,0.5)] flex flex-col md:flex-row z-[210] animate-slide-up"
        onClick={(e) => e.stopPropagation()}
      >
        {/* PANEL IZQUIERDO: Resumen y Pagos */}
        <div className="md:w-5/12 bg-sports-surface p-8 md:p-12 border-b md:border-b-0 md:border-r border-white/10 overflow-y-auto custom-scrollbar">
          <div className="mb-10">
            <span className="text-sports-accent font-bold text-xs tracking-widest uppercase block mb-2">Paso 1: Diagnóstico Operativo</span>
            <h3 className="text-2xl font-display font-black text-white uppercase leading-tight">Auditoría: {selectedPlan.title}</h3>
          </div>
          
          <div className="mb-8 p-8 bg-gradient-to-br from-sports-accent/20 to-transparent border border-sports-accent/20 rounded-[2rem]">
            <span className="text-xs text-slate-400 font-bold uppercase tracking-[0.2em] block mb-2">Inversión del Plan Analizado</span>
            <div className="flex items-baseline gap-2">
              <span className="text-5xl font-display font-black text-sports-accent tracking-tighter">{totalPrice}€</span>
              <span className="text-xs text-slate-400 font-bold uppercase tracking-widest">Base (Sin IVA)</span>
            </div>
          </div>

          <div className="mb-10 p-6 bg-white/5 border border-white/5 rounded-3xl">
            <h5 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-sports-accent animate-pulse"></span>
              Modelo de Pagos Sugerido
            </h5>
            <div className="space-y-4">
              {calculatedMilestones.map((m, idx) => (
                <div key={idx} className="flex justify-between items-center bg-sports-navy/50 p-4 rounded-xl border border-white/5">
                  <span className="text-xs text-slate-300 font-semibold">{m.label}</span>
                  <span className="text-lg font-display font-black text-white">{m.amount}€</span>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            <h5 className="text-xs font-bold text-slate-500 uppercase tracking-widest">Módulos a Auditar:</h5>
            <ul className="space-y-3">
              {(selectedPlan.id === 'custom' || selectedPlan.id === 'team_custom' ? getCustomServiceBreakdown() : selectedPlan.features).map((f: any, idx) => (
                <li key={idx} className="text-sm text-slate-300 font-body flex items-start gap-3">
                  <span className="text-sports-accent flex-shrink-0 mt-1">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>
                  </span>
                  <span className="leading-tight">{typeof f === 'string' ? f : (f.label || f.title)}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* PANEL DERECHO: Formulario */}
        <div className="md:w-7/12 p-8 md:p-16 bg-sports-navy relative overflow-y-auto custom-scrollbar flex flex-col justify-center">
          <button onClick={onClose} className="absolute top-8 right-8 text-slate-500 hover:text-white transition-colors p-2 z-50">
            <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" /></svg>
          </button>
          
          <div className="mb-12">
            <h4 className="text-3xl font-display font-black text-white uppercase tracking-tight">Solicitar Auditoría</h4>
            <p className="text-slate-500 text-sm mt-2">Introduce tus datos para que Alicia Pons pueda analizar tu evento antes de la reunión.</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="space-y-2">
              <label className="block text-[10px] font-bold text-sports-accent uppercase tracking-widest">Nombre del Responsable *</label>
              <input
                required
                type="text"
                autoComplete="name"
                value={formData.name}
                onChange={e => setFormData(prev => ({...prev, name: e.target.value}))}
                className="w-full bg-sports-dark border border-white/10 rounded-2xl px-6 py-5 text-white focus:border-sports-accent outline-none transition-all text-sm placeholder:text-slate-600 shadow-inner"
                placeholder="Nombre completo"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
              <div className="space-y-2">
                <label className="block text-[10px] font-bold text-sports-accent uppercase tracking-widest">Email Corporativo *</label>
                <input
                  required
                  type="email"
                  autoComplete="email"
                  value={formData.email}
                  onChange={e => setFormData(prev => ({...prev, email: e.target.value}))}
                  className="w-full bg-sports-dark border border-white/10 rounded-2xl px-6 py-5 text-white focus:border-sports-accent outline-none transition-all text-sm shadow-inner"
                  placeholder="ejemplo@club.com"
                />
              </div>
              <div className="space-y-2">
                <label className="block text-[10px] font-bold text-sports-accent uppercase tracking-widest">Móvil de Contacto *</label>
                <input
                  required
                  type="tel"
                  autoComplete="tel"
                  value={formData.phone}
                  onChange={e => setFormData(prev => ({...prev, phone: e.target.value}))}
                  className="w-full bg-sports-dark border border-white/10 rounded-2xl px-6 py-5 text-white focus:border-sports-accent outline-none transition-all text-sm shadow-inner"
                  placeholder="600 000 000"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="block text-[10px] font-bold text-sports-accent uppercase tracking-widest">Detalles del Evento</label>
              <textarea
                value={formData.message}
                onChange={e => setFormData(prev => ({...prev, message: e.target.value}))}
                rows={3}
                className="w-full bg-sports-dark border border-white/10 rounded-2xl px-6 py-5 text-white focus:border-sports-accent outline-none transition-all text-sm resize-none shadow-inner"
                placeholder="Cuéntanos un poco sobre el torneo o proyecto..."
              />
            </div>

            <div className="space-y-4 pt-4">
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-6 bg-sports-accent text-sports-dark font-display font-black uppercase tracking-[0.2em] text-xs rounded-2xl hover:bg-white transition-all shadow-[0_20px_40px_rgba(190,242,100,0.15)] active:scale-95 disabled:opacity-30 disabled:pointer-events-none"
              >
                {isSubmitting ? 'Analizando Táctica...' : 'Solicitar Auditoría Gratuita'}
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* MODAL DE ÉXITO */}
      {showSuccessPopup && (
         <div className="fixed inset-0 z-[300] flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-black/95 backdrop-blur-2xl" onClick={onClose}></div>
            <div className="bg-sports-surface border-2 border-sports-accent rounded-[4rem] p-12 max-w-lg w-full relative text-center shadow-[0_0_100px_rgba(190,242,100,0.1)] z-10 animate-slide-up">
                <div className="w-24 h-24 bg-sports-accent rounded-3xl flex items-center justify-center mx-auto mb-10 shadow-[0_0_30px_rgba(190,242,100,0.3)] rotate-6">
                    <svg className="w-12 h-12 text-sports-dark" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                </div>
                <h3 className="text-3xl font-display font-black text-white uppercase mb-4 tracking-tight">¡Solicitud Enviada!</h3>
                <p className="text-slate-400 text-base mb-12 leading-relaxed">
                  Alicia Pons ha recibido tu solicitud de auditoría. Analizaremos tu evento y nos pondremos en contacto contigo hoy mismo para validar los detalles técnicos.
                </p>
                <div className="space-y-4">
                   <button 
                      onClick={onClose}
                      className="w-full py-6 bg-white text-sports-dark font-display font-black uppercase tracking-widest text-xs rounded-2xl hover:bg-sports-accent transition-all shadow-xl"
                   >
                      Cerrar y volver a la web
                   </button>
                </div>
            </div>
         </div>
      )}
    </div>
  );
};
