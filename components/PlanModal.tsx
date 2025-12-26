
import React, { useState, useEffect } from 'react';
import { Plan, LeadForm, CustomServiceOption, TeamServiceItem } from '../types';
import { CUSTOM_SERVICES_LIST, TEAM_SERVICES } from '../constants';
import { createContact } from '../services/airtableService';

interface PlanModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedPlan: Plan | null;
  preselectedServices?: string[];
}

const DEFAULT_SERVICES: string[] = [];
const PRICE_PER_STUDENT = 3.50; 

export const PlanModal: React.FC<PlanModalProps> = ({ isOpen, onClose, selectedPlan, preselectedServices = DEFAULT_SERVICES }) => {
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
    if (selectedPlan.id === 'custom') {
      return formData.selectedServices.map(id => CUSTOM_SERVICES_LIST.find(s => s.id === id)).filter((s): s is CustomServiceOption => !!s);
    }
    if (selectedPlan.id === 'team_custom') {
      return formData.selectedServices.map(id => TEAM_SERVICES.find(s => s.id === id)).filter((s): s is TeamServiceItem => !!s);
    }
    return [];
  };

  const calculateTotal = () => {
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
      return schoolPricingMode === 'fixed' ? selectedPlan.basePrice : Number((studentCount * PRICE_PER_STUDENT).toFixed(2));
    }
    return selectedPlan.basePrice;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setIsSubmitting(true);

    const total = calculateTotal();
    let servicesList = selectedPlan.features.join(', ');
    if (selectedPlan.id === 'custom') {
       servicesList = (getCustomServiceBreakdown() as CustomServiceOption[]).map(s => s.label).join(', ');
    } else if (selectedPlan.id === 'team_custom') {
       servicesList = (getCustomServiceBreakdown() as TeamServiceItem[]).map(s => `${s.title} (${s.price}${s.period})`).join(', ');
    }

    const detallesStr = `PRECIO ESTIMADO: ${total}€
${selectedPlan.id === 'school' ? `MODO: ${schoolPricingMode} (${studentCount} alumnos)\n` : ''}
SERVICIOS: ${servicesList}`;

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

  const total = calculateTotal();

  return (
    <>
      <div className="fixed inset-0 z-[100] overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
        <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
          <div className="fixed inset-0 bg-sports-dark/95 backdrop-blur-md transition-opacity" aria-hidden="true" onClick={onClose}></div>
          <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>

          <div className="relative inline-block align-bottom bg-sports-navy border border-white/10 rounded-[2.5rem] text-left overflow-hidden shadow-2xl transform transition-all sm:my-8 sm:align-middle sm:max-w-4xl w-full">
            
            <div className="flex flex-col md:flex-row min-h-full">
              {/* Left Panel: Summary */}
              <div className="md:w-5/12 bg-sports-surface p-10 border-b md:border-b-0 md:border-r border-white/5 flex flex-col order-first">
                <div className="mb-8">
                   <h3 className="text-2xl font-display font-extrabold text-white uppercase mb-2">
                    {selectedPlan.title}
                   </h3>
                   <div className="text-4xl font-display font-extrabold text-sports-accent">{total}€</div>
                   <p className="text-[10px] text-slate-500 mt-2 uppercase tracking-[0.2em] font-bold font-display">Estimación Base</p>
                </div>

                {/* Milestone breakdown in modal */}
                {selectedPlan.milestones && (
                  <div className="bg-sports-navy/40 rounded-2xl p-6 border border-white/5 mb-8">
                    <h5 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-4">Plan de Pagos (3 Cuotas)</h5>
                    <div className="space-y-3">
                      {selectedPlan.milestones.map((ms, idx) => (
                        <div key={idx} className="flex justify-between items-center text-xs">
                          <span className="text-slate-500 font-medium">{ms.label.split('(')[0]}</span>
                          <span className="text-white font-bold">{ms.amount}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {selectedPlan.id === 'school' && (
                  <div className="bg-sports-navy/50 rounded-2xl p-6 border border-white/5 mb-8">
                     <label className="block text-[10px] font-bold text-slate-400 uppercase mb-4 tracking-widest">Modelo de Pago</label>
                     <div className="flex rounded-xl border border-white/10 overflow-hidden mb-4">
                        <button 
                          type="button"
                          onClick={() => setSchoolPricingMode('fixed')}
                          className={`flex-1 py-3 text-[10px] font-bold uppercase tracking-wider transition-all ${schoolPricingMode === 'fixed' ? 'bg-sports-primary text-white' : 'bg-transparent text-slate-500 hover:text-white'}`}
                        >
                          Tarifa Plana
                        </button>
                        <button 
                          type="button"
                          onClick={() => setSchoolPricingMode('students')}
                          className={`flex-1 py-3 text-[10px] font-bold uppercase tracking-wider transition-all ${schoolPricingMode === 'students' ? 'bg-sports-primary text-white' : 'bg-transparent text-slate-500 hover:text-white'}`}
                        >
                          Pago x Alumno
                        </button>
                     </div>
                     {schoolPricingMode === 'students' && (
                       <div className="mt-4 animate-fade-in space-y-3">
                          <input 
                               type="number" 
                               min="1"
                               value={studentCount}
                               onChange={(e) => setStudentCount(Math.max(1, parseInt(e.target.value) || 0))}
                               className="w-full bg-sports-dark border border-white/10 rounded-xl px-4 py-3 text-white font-bold focus:border-sports-accent outline-none"
                               placeholder="Nº Alumnos"
                          />
                          <p className="text-xs text-slate-400 text-center font-bold">x {PRICE_PER_STUDENT}€ por alumno</p>
                       </div>
                     )}
                  </div>
                )}

                <div className="flex-1 overflow-y-auto custom-scrollbar pr-2 max-h-[30vh] md:max-h-none">
                   <h5 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-4">Servicios Incluidos</h5>
                   <ul className="space-y-4">
                      {(selectedPlan.id === 'custom' || selectedPlan.id === 'team_custom' ? getCustomServiceBreakdown() : selectedPlan.features).map((f: any, idx) => (
                          <li key={idx} className="text-xs text-slate-300 flex gap-3 font-body">
                              <span className="text-sports-accent font-bold">✓</span> 
                              {typeof f === 'string' ? f : (f.label || f.title)}
                          </li>
                      ))}
                   </ul>
                </div>
              </div>

              {/* Right Panel: Form */}
              <div className="md:w-7/12 p-10 bg-sports-navy relative">
                 <button onClick={onClose} className="absolute top-8 right-8 text-slate-500 hover:text-white transition-colors p-2 -mr-2 text-xl">✕</button>
                 
                 <h4 className="text-xl font-display font-extrabold text-white uppercase tracking-tight mb-8">Información de Contacto</h4>

                 <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label className="block text-[10px] font-bold text-sports-accent uppercase mb-2 tracking-[0.2em]">Nombre Completo / Entidad</label>
                        <input
                          required
                          type="text"
                          value={formData.name}
                          onChange={e => {
                            setFormData(prev => ({...prev, name: e.target.value}));
                            if (errors.name) setErrors(prev => { const n = {...prev}; delete n.name; return n; });
                          }}
                          className={`block w-full border ${errors.name ? 'border-red-500/50' : 'border-white/10'} rounded-2xl bg-sports-dark text-white py-4 px-5 focus:outline-none focus:border-sports-primary transition-all font-body text-sm`}
                          placeholder="Ej: CD Real Torneo"
                        />
                        {errors.name && <p className="text-[10px] text-red-500 mt-1.5 ml-1 font-bold uppercase tracking-widest">{errors.name}</p>}
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <div>
                        <label className="block text-[10px] font-bold text-sports-accent uppercase mb-2 tracking-[0.2em]">Email</label>
                        <input
                          required
                          type="email"
                          value={formData.email}
                          onChange={e => {
                            setFormData(prev => ({...prev, email: e.target.value}));
                            if (errors.email) setErrors(prev => { const n = {...prev}; delete n.email; return n; });
                          }}
                          className={`block w-full border ${errors.email ? 'border-red-500/50' : 'border-white/10'} rounded-2xl bg-sports-dark text-white py-4 px-5 focus:outline-none focus:border-sports-primary transition-all font-body text-sm`}
                        />
                        {errors.email && <p className="text-[10px] text-red-500 mt-1.5 ml-1 font-bold uppercase tracking-widest">{errors.email}</p>}
                      </div>
                      <div>
                        <label className="block text-[10px] font-bold text-sports-accent uppercase mb-2 tracking-[0.2em]">Teléfono</label>
                        <input
                          required
                          type="tel"
                          value={formData.phone}
                          onChange={e => {
                            setFormData(prev => ({...prev, phone: e.target.value}));
                            if (errors.phone) setErrors(prev => { const n = {...prev}; delete n.phone; return n; });
                          }}
                          className={`block w-full border ${errors.phone ? 'border-red-500/50' : 'border-white/10'} rounded-2xl bg-sports-dark text-white py-4 px-5 focus:outline-none focus:border-sports-primary transition-all font-body text-sm`}
                        />
                        {errors.phone && <p className="text-[10px] text-red-500 mt-1.5 ml-1 font-bold uppercase tracking-widest">{errors.phone}</p>}
                      </div>
                    </div>

                    <div>
                      <label className="block text-[10px] font-bold text-sports-accent uppercase mb-2 tracking-[0.2em]">Observaciones Adicionales</label>
                      <textarea
                        value={formData.message}
                        onChange={e => setFormData(prev => ({...prev, message: e.target.value}))}
                        rows={3}
                        className="block w-full border border-white/10 rounded-2xl bg-sports-dark text-white py-4 px-5 focus:outline-none focus:border-sports-primary transition-all font-body text-sm resize-none"
                        placeholder="Fechas tentativas, ubicación, nº de equipos..."
                      />
                    </div>

                    <div className="pt-4">
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full py-5 bg-sports-accent text-sports-dark font-display font-extrabold uppercase tracking-widest rounded-2xl hover:bg-white transition-all duration-300 shadow-xl shadow-lime-900/20 disabled:opacity-30"
                      >
                        {isSubmitting ? 'Procesando...' : 'Enviar Solicitud Premium'}
                      </button>
                    </div>
                 </form>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* SUCCESS POPUP */}
      {showSuccessPopup && (
         <div className="fixed inset-0 z-[110] flex items-center justify-center px-4 animate-fade-in">
            <div className="absolute inset-0 bg-black/90 backdrop-blur-xl" onClick={onClose}></div>
            <div className="bg-sports-surface border border-sports-accent rounded-[3rem] p-12 max-w-md w-full relative shadow-[0_0_80px_rgba(190,242,100,0.1)] text-center">
                <div className="w-24 h-24 bg-sports-accent rounded-3xl flex items-center justify-center mx-auto mb-8 shadow-2xl rotate-3">
                    <svg className="w-12 h-12 text-sports-dark" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                </div>
                <h3 className="text-3xl font-display font-extrabold text-white uppercase mb-4 tracking-tight">¡Solicitud Enviada!</h3>
                <p className="text-slate-400 font-body mb-10 leading-relaxed">
                    Hemos recibido tus detalles. Alicia Pons revisará la viabilidad operativa y te contactará en menos de 24 horas.
                </p>
                <button 
                    onClick={onClose}
                    className="w-full py-5 bg-white text-sports-dark font-display font-extrabold uppercase tracking-widest rounded-2xl hover:bg-sports-accent transition-all"
                >
                    Volver a la Web
                </button>
            </div>
         </div>
      )}
    </>
  );
};
