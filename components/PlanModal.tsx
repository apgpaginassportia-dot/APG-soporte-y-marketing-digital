
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

const PRICE_PER_STUDENT = 3.50; 

export const PlanModal: React.FC<PlanModalProps> = ({ isOpen, onClose, selectedPlan, preselectedServices = [] }) => {
  const [formData, setFormData] = useState<LeadForm>({
    name: '',
    email: '',
    phone: '',
    message: '',
    pricePerStudent: '',
    selectedServices: preselectedServices
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  const [schoolPricingMode, setSchoolPricingMode] = useState<'fixed' | 'students'>('fixed');
  const [studentCount, setStudentCount] = useState<number>(100);

  useEffect(() => {
    if (isOpen && selectedPlan) {
      setFormData({
        name: '',
        email: '',
        phone: '',
        message: '',
        pricePerStudent: '',
        selectedServices: preselectedServices
      });
      setErrors({});
      setShowSuccessPopup(false);
      setIsSubmitting(false);
      setSchoolPricingMode('fixed');
      setStudentCount(100);
    }
  }, [isOpen, selectedPlan, preselectedServices]);

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

    if (selectedPlan.id === 'school') {
      if (schoolPricingMode === 'fixed') {
        return selectedPlan.basePrice;
      } else {
        return Math.ceil(studentCount * PRICE_PER_STUDENT);
      }
    }

    return selectedPlan.basePrice;
  }, [selectedPlan, schoolPricingMode, studentCount, formData.selectedServices]);

  if (!isOpen || !selectedPlan) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.phone) {
        alert("Por favor, completa los campos obligatorios.");
        return;
    }
    setIsSubmitting(true);

    const detallesStr = `[NUEVA_SOLICITUD_${selectedPlan.id.toUpperCase()}]
PROYECTO: ${formData.name}
PRECIO ESTIMADO: ${totalPrice}€
FASE ACTUAL: SOLICITUD AUDITORÍA GRATUITA
NOTIFICAR A: alicia.pons.garcia@outlook.es`;

    try {
      await createContact({
        Nombre: formData.name,
        Email: formData.email,
        Teléfono: formData.phone,
        Asunto: `SOLICITUD: ${selectedPlan.title}`,
        Detalles: detallesStr,
        Mensaje: formData.message || "Sin mensaje"
      });
      setShowSuccessPopup(true);
    } catch (error: any) {
      alert("Hubo un error al guardar tu solicitud.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <div className="fixed inset-0 z-[100] overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
        <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
          <div className="fixed inset-0 bg-sports-dark/95 backdrop-blur-md transition-opacity" aria-hidden="true" onClick={onClose}></div>
          <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>

          <div className="relative inline-block align-bottom bg-sports-navy border border-white/10 rounded-[2.5rem] text-left overflow-hidden shadow-2xl transform transition-all sm:my-8 sm:align-middle sm:max-w-4xl w-full">
            
            <div className="flex flex-col md:flex-row min-h-full">
              {/* Summary Side */}
              <div className="md:w-5/12 bg-sports-surface p-10 border-b md:border-b-0 md:border-r border-white/5 flex flex-col order-first">
                <div className="mb-10">
                   <h3 className="text-2xl font-display font-extrabold text-white uppercase mb-4 leading-tight">
                    {selectedPlan.id === 'school' ? 'Plan de Mejora Escolar' : selectedPlan.title}
                   </h3>
                   
                   {selectedPlan.id === 'school' ? (
                      <div className="space-y-4">
                         <div className="p-5 bg-sports-accent/10 border border-sports-accent/30 rounded-2xl relative">
                            <div className="absolute -top-3 left-4 bg-sports-accent text-sports-dark text-[8px] font-black uppercase px-2 py-0.5 rounded">Paso Actual</div>
                            <span className="text-[10px] text-sports-accent font-bold uppercase tracking-widest block mb-1">Fase 1: Auditoría Física</span>
                            <div className="flex items-baseline gap-2">
                               <span className="text-3xl font-display font-bold text-white">0€</span>
                               <span className="text-slate-500 text-[10px] font-bold uppercase">Sin Compromiso</span>
                            </div>
                         </div>
                         <div className="p-5 bg-white/5 border border-white/10 rounded-2xl opacity-60">
                            <span className="text-[10px] text-slate-400 font-bold uppercase tracking-widest block mb-1">Fase 2: Gestión Integral</span>
                            <div className="flex items-baseline gap-2">
                               <span className="text-xl font-display font-bold text-white">{totalPrice}€*</span>
                               <span className="text-slate-600 text-[9px] font-bold uppercase">Estimación Base</span>
                            </div>
                         </div>
                      </div>
                   ) : (
                      <div className="flex items-center gap-3">
                        <div className="text-4xl font-display font-extrabold text-sports-accent">{totalPrice}€</div>
                        <span className="text-[10px] text-slate-500 font-bold uppercase tracking-widest bg-white/5 px-2 py-1 rounded">Inversión</span>
                      </div>
                   )}
                </div>

                {selectedPlan.id === 'school' && (
                  <div className="bg-sports-navy/50 rounded-2xl p-6 border border-white/10 mb-8">
                     <label className="block text-[10px] font-bold text-slate-500 uppercase mb-4 tracking-widest">Tamaño del Centro</label>
                     <div className="flex rounded-xl border border-white/10 overflow-hidden mb-6">
                        <button 
                          type="button"
                          onClick={() => setSchoolPricingMode('fixed')}
                          className={`flex-1 py-3 text-[9px] font-bold uppercase transition-all ${schoolPricingMode === 'fixed' ? 'bg-sports-primary text-white' : 'text-slate-500 hover:text-white'}`}
                        >
                          Hasta 100 pax
                        </button>
                        <button 
                          type="button"
                          onClick={() => setSchoolPricingMode('students')}
                          className={`flex-1 py-3 text-[9px] font-bold uppercase transition-all ${schoolPricingMode === 'students' ? 'bg-sports-primary text-white' : 'text-slate-500 hover:text-white'}`}
                        >
                          Ligas (+100)
                        </button>
                     </div>
                     
                     {schoolPricingMode === 'students' && (
                       <div className="animate-fade-in">
                          <span className="text-[10px] text-slate-500 uppercase font-bold mb-2 block">Número de alumnos:</span>
                          <input 
                               type="number" 
                               value={studentCount}
                               onChange={(e) => setStudentCount(Math.max(1, parseInt(e.target.value) || 0))}
                               className="w-full bg-sports-dark border border-white/10 rounded-xl px-4 py-3 text-white font-display font-bold focus:border-sports-accent outline-none"
                          />
                       </div>
                     )}
                  </div>
                )}

                <div className="flex-1 overflow-y-auto custom-scrollbar pr-2 max-h-[25vh] md:max-h-none">
                   <h5 className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-4">Servicios Incluidos:</h5>
                   <ul className="space-y-3">
                      {(selectedPlan.id === 'custom' || selectedPlan.id === 'team_custom' ? getCustomServiceBreakdown() : selectedPlan.features).map((f: any, idx) => (
                          <li key={idx} className="text-xs text-slate-400 font-body leading-relaxed flex items-center gap-2">
                              <span className="w-1 h-1 rounded-full bg-slate-700"></span>
                              {typeof f === 'string' ? f : (f.label || f.title)}
                          </li>
                      ))}
                   </ul>
                </div>
              </div>

              {/* Form Side */}
              <div className="md:w-7/12 p-10 bg-sports-navy relative flex flex-col justify-center">
                 <button onClick={onClose} className="absolute top-8 right-8 text-slate-500 hover:text-white p-2">✕</button>
                 
                 <div className="mb-8">
                    <h4 className="text-2xl font-display font-extrabold text-white uppercase tracking-tight">Solicitud de Auditoría</h4>
                    <p className="text-slate-500 text-sm mt-2">Completa estos datos para que Alicia pueda visitarte.</p>
                 </div>

                 <form onSubmit={handleSubmit} className="space-y-5">
                    <div>
                        <label className="block text-[10px] font-bold text-sports-accent uppercase mb-2 tracking-widest">Responsable / Centro Educativo</label>
                        <input
                          required
                          type="text"
                          value={formData.name}
                          onChange={e => setFormData(prev => ({...prev, name: e.target.value}))}
                          className="block w-full border border-white/10 rounded-2xl bg-sports-dark text-white py-4 px-5 focus:border-sports-accent outline-none transition-all text-sm"
                          placeholder="Ej: Manuel Pons (IES El Deporte)"
                        />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <div>
                        <label className="block text-[10px] font-bold text-sports-accent uppercase mb-2 tracking-widest">Email</label>
                        <input
                          required
                          type="email"
                          value={formData.email}
                          onChange={e => setFormData(prev => ({...prev, email: e.target.value}))}
                          className="block w-full border border-white/10 rounded-2xl bg-sports-dark text-white py-4 px-5 focus:border-sports-accent outline-none transition-all text-sm"
                          placeholder="tu@email.com"
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] font-bold text-sports-accent uppercase mb-2 tracking-widest">Teléfono</label>
                        <input
                          required
                          type="tel"
                          value={formData.phone}
                          onChange={e => setFormData(prev => ({...prev, phone: e.target.value}))}
                          className="block w-full border border-white/10 rounded-2xl bg-sports-dark text-white py-4 px-5 focus:border-sports-accent outline-none transition-all text-sm"
                          placeholder="600 000 000"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-[10px] font-bold text-sports-accent uppercase mb-2 tracking-widest">Breve descripción del evento</label>
                      <textarea
                        value={formData.message}
                        onChange={e => setFormData(prev => ({...prev, message: e.target.value}))}
                        rows={3}
                        className="block w-full border border-white/10 rounded-2xl bg-sports-dark text-white py-4 px-5 focus:border-sports-accent outline-none transition-all text-sm resize-none"
                        placeholder="Ej: Torneo fin de curso, 3 días, fútbol 7..."
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full py-5 bg-sports-accent text-sports-dark font-display font-black uppercase tracking-widest rounded-2xl hover:bg-white transition-all shadow-xl shadow-lime-900/20 disabled:opacity-30"
                    >
                      {isSubmitting ? 'Registrando...' : (selectedPlan.id === 'school' ? 'Confirmar Auditoría Gratis (0€)' : 'Confirmar Solicitud')}
                    </button>
                    <p className="text-center text-[9px] text-slate-600 uppercase font-bold tracking-widest">
                       Tras confirmar, podrás elegir fecha en la agenda de Alicia.
                    </p>
                 </form>
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
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                </div>
                <h3 className="text-3xl font-display font-extrabold text-white uppercase mb-4 tracking-tight">¡Paso 1 Completado!</h3>
                <p className="text-slate-400 font-body mb-10 leading-relaxed text-sm">
                    {selectedPlan.id === 'school' 
                       ? 'Hemos recibido tus datos. Para formalizar la auditoría de 0€, solo falta que elijas el día y hora en el calendario de Alicia.'
                       : 'Alicia Pons ha recibido tu solicitud. Se pondrá en contacto contigo personalmente en menos de 24 horas.'}
                </p>
                <div className="space-y-4">
                   {selectedPlan.id === 'school' ? (
                      <a 
                        href={CALENDLY_URL} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="block w-full py-5 bg-sports-accent text-sports-dark font-display font-extrabold uppercase tracking-widest rounded-2xl hover:bg-white transition-all shadow-xl shadow-lime-900/20"
                      >
                        Abrir Calendly de Alicia
                      </a>
                   ) : (
                      <button 
                         onClick={onClose}
                         className="w-full py-5 bg-sports-accent text-sports-dark font-display font-extrabold uppercase tracking-widest rounded-2xl"
                      >
                         Volver a la Web
                      </button>
                   )}
                   <button 
                      onClick={onClose}
                      className="w-full py-4 text-white font-display font-bold uppercase text-[10px] tracking-widest hover:text-sports-accent transition-all"
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
