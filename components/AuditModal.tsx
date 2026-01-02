
import React, { useState, useEffect } from 'react';
import { createContact } from '../services/airtableService';

interface AuditModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AuditModal: React.FC<AuditModalProps> = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    project: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setFormData({ name: '', email: '', phone: '', project: '' });
      setShowSuccessPopup(false);
      setIsSubmitting(false);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.phone) return;
    setIsSubmitting(true);
    try {
      await createContact({
        Nombre: formData.name,
        Email: formData.email,
        Teléfono: formData.phone,
        Asunto: "SOLICITUD CHARLA DIAGNÓSTICO",
        Detalles: `Proyecto: ${formData.project}`,
        Mensaje: `Interés en diagnóstico gratuito para: ${formData.project}`
      });
      setShowSuccessPopup(true);
    } catch (error: any) {
      alert("Error: " + error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[110] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-sports-navy/90 backdrop-blur-sm" onClick={onClose}></div>
      
      <div 
        className="relative bg-sports-navy border border-white/10 rounded-[2.5rem] w-full max-w-4xl max-h-[90vh] overflow-hidden shadow-2xl flex flex-col md:flex-row z-10"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="md:w-5/12 bg-sports-surface p-12 border-r border-white/5 flex flex-col justify-between">
           <div>
             <h3 className="text-3xl font-display font-black text-white uppercase leading-tight mb-4">Hablemos de tu Torneo</h3>
             <p className="text-slate-400 text-sm leading-relaxed mb-8">
               Reserva una charla de 15 minutos conmigo. Analizaré los puntos críticos de tu organización y te daré mi opinión técnica sobre cómo profesionalizar tu operativa, sin compromiso.
             </p>
             <ul className="space-y-4 mb-8">
               <li className="flex items-center gap-3 text-xs text-slate-300 font-medium">
                  <span className="text-sports-accent">✓</span> Sin coste ni permanencia.
               </li>
               <li className="flex items-center gap-3 text-xs text-slate-300 font-medium">
                  <span className="text-sports-accent">✓</span> Enfoque en ahorro de tiempo real.
               </li>
               <li className="flex items-center gap-3 text-xs text-slate-300 font-medium">
                  <span className="text-sports-accent">✓</span> Análisis basado en mi experiencia en MEC'25.
               </li>
             </ul>
           </div>
           <div className="flex items-center gap-3 text-sports-accent">
              <span className="w-2 h-2 rounded-full bg-sports-accent animate-pulse"></span>
              <span className="text-[10px] font-bold uppercase tracking-widest">Atención directa de Alicia Pons</span>
           </div>
        </div>

        <div className="md:w-7/12 p-12 bg-sports-navy relative flex flex-col justify-center">
           <button onClick={onClose} className="absolute top-6 right-6 text-slate-500 hover:text-white p-2">✕</button>
           <h4 className="text-xl font-display font-bold text-white uppercase mb-8">Diagnóstico Gratuito</h4>
           <form className="space-y-5" onSubmit={handleFormSubmit}>
              <div className="space-y-2">
                 <label className="block text-[10px] font-bold text-sports-accent uppercase tracking-widest">Nombre</label>
                 <input required type="text" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} className="w-full bg-sports-dark border border-white/10 rounded-xl px-5 py-4 text-white focus:border-sports-accent outline-none text-sm shadow-inner" placeholder="Tu nombre" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                 <div className="space-y-2">
                    <label className="block text-[10px] font-bold text-sports-accent uppercase tracking-widest">Email</label>
                    <input required type="email" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} className="w-full bg-sports-dark border border-white/10 rounded-xl px-5 py-4 text-white focus:border-sports-accent outline-none text-sm shadow-inner" placeholder="tu@email.com" />
                 </div>
                 <div className="space-y-2">
                    <label className="block text-[10px] font-bold text-sports-accent uppercase tracking-widest">Teléfono</label>
                    <input required type="tel" value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} className="w-full bg-sports-dark border border-white/10 rounded-xl px-5 py-4 text-white focus:border-sports-accent outline-none text-sm shadow-inner" placeholder="600 000 000" />
                 </div>
              </div>
              <div className="space-y-2">
                 <label className="block text-[10px] font-bold text-sports-accent uppercase tracking-widest">Tipo de Evento / Club</label>
                 <input type="text" value={formData.project} onChange={e => setFormData({...formData, project: e.target.value})} className="w-full bg-sports-dark border border-white/10 rounded-xl px-5 py-4 text-white focus:border-sports-accent outline-none text-sm shadow-inner" placeholder="Ej: Torneo Verano Fútbol" />
              </div>
              <button type="submit" disabled={isSubmitting} className="w-full py-5 bg-sports-accent text-sports-dark font-display font-black uppercase tracking-widest rounded-2xl hover:bg-white shadow-xl shadow-lime-900/20 disabled:opacity-50 transition-all active:scale-95">
                 {isSubmitting ? 'Enviando...' : 'Solicitar Charla de 15 min'}
              </button>
           </form>
        </div>
      </div>

      {showSuccessPopup && (
         <div className="fixed inset-0 z-[130] flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-black/95 backdrop-blur-xl" onClick={onClose}></div>
            <div className="bg-sports-surface border border-sports-accent rounded-[3rem] p-12 max-w-md w-full relative text-center z-10 animate-slide-up">
                <div className="w-20 h-20 bg-sports-accent rounded-full flex items-center justify-center mx-auto mb-6 shadow-xl shadow-lime-500/20">
                    <svg className="w-10 h-10 text-sports-dark" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>
                </div>
                <h3 className="text-3xl font-display font-black text-white uppercase mb-4 tracking-tight">¡Solicitud Recibida!</h3>
                <p className="text-slate-400 text-sm mb-10 leading-relaxed">
                    Gracias por confiar en APG Digital. Alicia Pons te contactará personalmente en menos de 24 horas para agendar tu diagnóstico gratuito.
                </p>
                <button onClick={onClose} className="w-full py-5 bg-white text-sports-dark font-display font-black uppercase tracking-widest rounded-2xl hover:bg-sports-accent transition-all text-xs">Cerrar</button>
            </div>
         </div>
      )}
    </div>
  );
};
