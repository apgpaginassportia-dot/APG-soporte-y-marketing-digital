
import React, { useState, useEffect } from 'react';
import { createContact } from '../services/airtableService';
import { CALENDLY_URL } from '../constants';

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

    const detallesStr = `[NUEVA_CITA_AUDITORIA]
REUNIÓN: SOLICITADA VÍA WEB
NOTIFICAR A: alicia.pons.garcia@outlook.es y ${formData.email}
ESTADO: PENDIENTE CALENDLY`;

    try {
      await createContact({
        Nombre: formData.name,
        Email: formData.email,
        Teléfono: formData.phone,
        Asunto: "SOLICITUD AUDITORÍA ESTRATÉGICA",
        Detalles: detallesStr,
        Mensaje: `Organización: ${formData.project || "No especificada"}`
      });

      setShowSuccessPopup(true);
    } catch (error: any) {
      console.error(error);
      alert(error.message || "Hubo un error al registrar tu solicitud.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <div className="fixed inset-0 z-[100] overflow-y-auto font-sans" aria-labelledby="modal-title" role="dialog" aria-modal="true">
        <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
          <div className="fixed inset-0 bg-sports-navy/90 backdrop-blur-sm transition-opacity" aria-hidden="true" onClick={onClose}></div>
          <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>

          <div className="relative inline-block align-bottom bg-sports-navy border border-white/10 rounded-[2rem] text-left overflow-hidden shadow-2xl transform transition-all sm:my-8 sm:align-middle sm:max-w-4xl w-full">
            
            <div className="flex flex-col md:flex-row min-h-[500px]">
              <div className="md:w-5/12 bg-sports-surface p-12 border-r border-white/5 flex flex-col justify-between relative overflow-hidden">
                 <div className="absolute top-0 right-0 -mr-10 -mt-10 w-40 h-40 bg-sports-lime/10 rounded-full blur-2xl"></div>
                 <div>
                   <h3 className="text-3xl font-display font-extrabold text-white uppercase leading-tight mb-4 pt-4">
                     Auditoría<br/>Estratégica
                   </h3>
                   <p className="text-slate-400 text-sm leading-relaxed mb-8 font-body">
                     En 30 minutos analizaremos tu estructura operativa actual y detectaremos fugas de recursos. Cita gratuita con Alicia Pons.
                   </p>
                 </div>
                 <div className="mt-auto">
                    <div className="flex items-center gap-3 text-sports-accent">
                       <span className="w-2 h-2 rounded-full bg-sports-accent animate-pulse"></span>
                       <span className="text-[10px] font-bold uppercase tracking-widest">Plazas limitadas por semana</span>
                    </div>
                 </div>
              </div>

              <div className="md:w-7/12 p-12 bg-sports-navy relative flex flex-col justify-center">
                 <button onClick={onClose} className="absolute top-6 right-6 text-slate-500 hover:text-white transition-colors z-10 p-2">✕</button>

                 <div className="animate-fade-in-up">
                    <h4 className="text-xl font-display font-extrabold text-white uppercase mb-8 tracking-tight">Datos de Contacto</h4>
                    <form onSubmit={handleFormSubmit} className="space-y-5">
                       <div>
                          <label className="block text-[10px] font-bold text-sports-accent uppercase mb-2 tracking-widest">Responsable</label>
                          <input required type="text" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} className="w-full bg-sports-dark border border-white/10 rounded-xl px-5 py-4 text-white focus:border-sports-accent outline-none transition-all text-sm" placeholder="Nombre completo" />
                       </div>
                       <div className="grid grid-cols-2 gap-4">
                          <div>
                             <label className="block text-[10px] font-bold text-sports-accent uppercase mb-2 tracking-widest">Email Corporativo</label>
                             <input required type="email" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} className="w-full bg-sports-dark border border-white/10 rounded-xl px-5 py-4 text-white focus:border-sports-accent outline-none transition-all text-sm" placeholder="Email" />
                          </div>
                          <div>
                             <label className="block text-[10px] font-bold text-sports-accent uppercase mb-2 tracking-widest">Móvil</label>
                             <input required type="tel" value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} className="w-full bg-sports-dark border border-white/10 rounded-xl px-5 py-4 text-white focus:border-sports-accent outline-none transition-all text-sm" placeholder="Teléfono" />
                          </div>
                       </div>
                       <div>
                          <label className="block text-[10px] font-bold text-sports-accent uppercase mb-2 tracking-widest">Club / Organización</label>
                          <input type="text" value={formData.project} onChange={e => setFormData({...formData, project: e.target.value})} className="w-full bg-sports-dark border border-white/10 rounded-xl px-5 py-4 text-white focus:border-sports-accent outline-none transition-all text-sm" placeholder="Ej: Club Deportivo Madrid" />
                       </div>
                       <button type="submit" disabled={isSubmitting} className="w-full mt-4 py-5 bg-sports-accent text-sports-dark font-display font-extrabold uppercase tracking-widest rounded-2xl hover:bg-white transition-all shadow-xl shadow-lime-900/20 disabled:opacity-50">
                          {isSubmitting ? 'Registrando...' : 'Elegir Fecha en Calendly'}
                       </button>
                    </form>
                 </div>
              </div>
            </div>

          </div>
        </div>
      </div>

      {showSuccessPopup && (
         <div className="fixed inset-0 z-[110] flex items-center justify-center px-4 animate-fade-in">
            <div className="absolute inset-0 bg-black/95 backdrop-blur-xl" onClick={onClose}></div>
            <div className="bg-sports-surface border border-sports-accent rounded-[3rem] p-12 max-w-md w-full relative text-center shadow-2xl">
                <div className="w-24 h-24 bg-sports-accent rounded-3xl flex items-center justify-center mx-auto mb-8 shadow-2xl rotate-3">
                    <svg className="w-12 h-12 text-sports-dark" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2-2v12a2 2 0 002 2zM12 14v4m-2-2h4" />
                    </svg>
                </div>
                <h3 className="text-3xl font-display font-extrabold text-white uppercase mb-4 tracking-tight">¡Casi Listo!</h3>
                <p className="text-slate-400 font-body mb-10 leading-relaxed">
                    Tus datos han sido registrados. Ahora, para que Alicia y tú estéis coordinados, selecciona tu hueco en Calendly. Recibirás un correo de confirmación automático.
                </p>
                <div className="space-y-4">
                   <a 
                     href={CALENDLY_URL} 
                     target="_blank" 
                     rel="noopener noreferrer"
                     className="block w-full py-5 bg-sports-accent text-sports-dark font-display font-extrabold uppercase tracking-widest rounded-2xl hover:bg-white transition-all shadow-xl shadow-lime-900/20"
                   >
                     Abrir Calendly
                   </a>
                   <button 
                      onClick={onClose}
                      className="w-full py-5 bg-white/5 text-white font-display font-extrabold uppercase tracking-widest rounded-2xl border border-white/10 hover:bg-white hover:text-sports-dark transition-all"
                   >
                      Cerrar y Volver
                   </button>
                </div>
            </div>
         </div>
      )}
    </>
  );
};
