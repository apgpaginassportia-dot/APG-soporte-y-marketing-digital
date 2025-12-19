
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
  
  // States for Success Popup
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
      if (schoolPricingMode === 'fixed') {
        return selectedPlan.basePrice;
      } else {
        return Number((studentCount * PRICE_PER_STUDENT).toFixed(2));
      }
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
       const services = getCustomServiceBreakdown() as CustomServiceOption[];
       servicesList = services.map(s => s.label).join(', ');
    }

    if (selectedPlan.id === 'team_custom') {
       const services = getCustomServiceBreakdown() as TeamServiceItem[];
       servicesList = services.map(s => `${s.title} (${s.price}${s.period})`).join(', ');
    }

    let planTitleFull = selectedPlan.title;
    let extraDetails = "";

    if (selectedPlan.id === 'school') {
       if (schoolPricingMode === 'fixed') {
          planTitleFull += " (Tarifa Plana Anual)";
       } else {
          planTitleFull += ` (Por Alumno: ${studentCount} alumnos)`;
          extraDetails = `Modo Pago por Uso: ${studentCount} alumnos x ${PRICE_PER_STUDENT}€ (Sin cuota base)`;
       }
    }
    
    if (selectedPlan.id === 'team') {
       planTitleFull += ` (${selectedPlan.subtitle})`;
    }

    // Construimos el resumen detallado
    const detallesStr = `PRECIO ESTIMADO PAGO ÚNICO: ${total}€
${extraDetails ? `INFO EXTRA: ${extraDetails}\n` : ''}${selectedPlan.id === 'school' && formData.pricePerStudent ? `PRECIO MANUAL ALUMNO: ${formData.pricePerStudent}\n` : ''}
SERVICIOS INCLUIDOS:
${servicesList}`;

    try {
      await createContact({
        Nombre: formData.name,
        Email: formData.email,
        Teléfono: formData.phone,
        Asunto: planTitleFull,
        Detalles: detallesStr,
        Mensaje: formData.message || "Sin mensaje adicional"
      });

      setShowSuccessPopup(true);
    } catch (error: any) {
      console.error("Fallo guardando en Airtable:", error);
      alert(error.message || "Hubo un error al guardar tu solicitud.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const total = calculateTotal();

  return (
    <>
      <div className="fixed inset-0 z-[100] overflow-y-auto font-sans" aria-labelledby="modal-title" role="dialog" aria-modal="true">
        <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
          <div className="fixed inset-0 bg-sports-navy/90 backdrop-blur-sm transition-opacity" aria-hidden="true" onClick={onClose}></div>
          <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>

          <div className="relative inline-block align-bottom bg-sports-navy border border-white/10 rounded-xl text-left overflow-hidden shadow-2xl transform transition-all sm:my-8 sm:align-middle sm:max-w-3xl w-full">
            
            <div className="flex flex-col md:flex-row min-h-full">
              {/* Left Panel: Summary */}
              <div className="md:w-5/12 bg-sports-surface p-6 md:p-8 border-b md:border-b-0 md:border-r border-white/5 flex flex-col order-first">
                <div className="mb-6">
                   <h3 className="text-xl md:text-2xl font-display font-bold text-white uppercase mb-2">
                    {selectedPlan.title}
                   </h3>
                   <div className="text-3xl font-display font-bold text-sports-lime">{total}€</div>
                   <p className="text-[10px] text-gray-500 mt-1 uppercase tracking-wide">Pago Único</p>
                </div>

                {/* SCHOOL PLAN CALCULATOR UI */}
                {selectedPlan.id === 'school' && (
                  <div className="bg-sports-navy/50 rounded p-4 border border-white/10 mb-6 shadow-inner">
                     <label className="block text-xs font-bold text-sports-blue uppercase mb-3">Modo de Pago</label>
                     <div className="flex rounded border border-white/10 overflow-hidden mb-4">
                        <button 
                          type="button"
                          onClick={() => setSchoolPricingMode('fixed')}
                          className={`flex-1 py-2 text-xs font-bold uppercase transition-colors ${schoolPricingMode === 'fixed' ? 'bg-sports-blue text-white' : 'bg-transparent text-gray-400 hover:text-white'}`}
                        >
                          Tarifa Plana
                        </button>
                        <button 
                          type="button"
                          onClick={() => setSchoolPricingMode('students')}
                          className={`flex-1 py-2 text-xs font-bold uppercase transition-colors ${schoolPricingMode === 'students' ? 'bg-sports-blue text-white' : 'bg-transparent text-gray-400 hover:text-white'}`}
                        >
                          Por Alumno
                        </button>
                     </div>

                     {schoolPricingMode === 'students' && (
                       <div className="animate-fade-in-up mt-4 bg-sports-dark/50 p-3 rounded border border-white/5">
                          <label className="block text-[10px] font-bold text-gray-400 uppercase mb-2">Número de Alumnos</label>
                          <div className="flex items-center gap-2">
                             <input 
                               type="number" 
                               min="1"
                               step="1"
                               value={studentCount}
                               onChange={(e) => {
                                   const val = parseInt(e.target.value);
                                   if (!isNaN(val)) setStudentCount(Math.max(1, val));
                               }}
                               className="w-20 bg-sports-navy border border-gray-600 rounded px-2 py-2 text-white font-bold text-lg focus:border-sports-lime focus:outline-none text-center"
                             />
                             <span className="text-gray-500 font-bold text-sm">x</span>
                             <span className="text-gray-300 font-bold text-sm">{PRICE_PER_STUDENT.toFixed(2)}€</span>
                          </div>
                          <p className="text-lg font-bold text-sports-lime mt-2 text-right">
                                = {(studentCount * PRICE_PER_STUDENT).toFixed(2)}€
                          </p>
                       </div>
                     )}
                  </div>
                )}

                <div className="flex-1 overflow-y-auto custom-scrollbar pr-2 max-h-[30vh] md:max-h-none">
                   <p className="text-sm text-gray-300 mb-6 leading-relaxed font-body">
                     {selectedPlan.details || selectedPlan.description}
                   </p>
                   <ul className="space-y-2">
                      {(selectedPlan.id === 'custom' || selectedPlan.id === 'team_custom' ? getCustomServiceBreakdown() : selectedPlan.features).map((f: any, idx) => (
                          <li key={idx} className="text-xs text-gray-400 flex gap-2">
                              <span className="text-sports-lime">✓</span> 
                              {typeof f === 'string' ? f : (f.label || f.title)}
                          </li>
                      ))}
                   </ul>
                </div>
              </div>

              {/* Right Panel: Form */}
              <div className="md:w-7/12 p-6 md:p-8 bg-sports-navy">
                 <div className="flex justify-between items-center mb-6">
                   <h4 className="text-lg font-bold text-white uppercase tracking-wide font-display">Tus Datos</h4>
                   <button onClick={onClose} className="text-gray-500 hover:text-white transition-colors p-2 -mr-2">✕</button>
                 </div>

                 <form onSubmit={handleSubmit} className="space-y-5">
                    <div>
                        <label className="block text-xs font-bold text-sports-lime uppercase mb-2">Nombre Completo</label>
                        <input
                          type="text"
                          value={formData.name}
                          onChange={e => setFormData(prev => ({...prev, name: e.target.value}))}
                          className={`block w-full border ${errors.name ? 'border-red-500' : 'border-gray-700'} rounded bg-sports-dark text-white py-3 px-4 focus:outline-none focus:border-sports-blue transition-all font-body text-sm`}
                          placeholder={selectedPlan.id === 'school' ? "Nombre del Centro" : "Tu nombre"}
                        />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold text-sports-lime uppercase mb-2">Email</label>
                        <input
                          type="email"
                          value={formData.email}
                          onChange={e => setFormData(prev => ({...prev, email: e.target.value}))}
                          className={`block w-full border ${errors.email ? 'border-red-500' : 'border-gray-700'} rounded bg-sports-dark text-white py-3 px-4 focus:outline-none focus:border-sports-blue transition-all font-body text-sm`}
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-sports-lime uppercase mb-2">Teléfono</label>
                        <input
                          type="tel"
                          value={formData.phone}
                          onChange={e => setFormData(prev => ({...prev, phone: e.target.value}))}
                          className={`block w-full border ${errors.phone ? 'border-red-500' : 'border-gray-700'} rounded bg-sports-dark text-white py-3 px-4 focus:outline-none focus:border-sports-blue transition-all font-body text-sm`}
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-sports-lime uppercase mb-2">Mensaje (Opcional)</label>
                      <textarea
                        value={formData.message}
                        onChange={e => setFormData(prev => ({...prev, message: e.target.value}))}
                        rows={3}
                        className="block w-full border border-gray-700 rounded bg-sports-dark text-white py-3 px-4 focus:outline-none focus:border-sports-blue transition-all font-body text-sm resize-none"
                      />
                    </div>

                    <div className="pt-4">
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full flex justify-center py-4 px-4 border border-transparent rounded shadow-lg shadow-sports-blue/20 text-sm font-bold text-white bg-sports-blue hover:bg-sports-lime hover:text-sports-navy uppercase tracking-wider transition-all duration-300 transform hover:-translate-y-0.5 disabled:opacity-50"
                      >
                        {isSubmitting ? 'Guardando...' : 'Enviar Solicitud'}
                      </button>
                    </div>
                 </form>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* SUCCESS POPUP OVERLAY */}
      {showSuccessPopup && (
         <div className="fixed inset-0 z-[110] flex items-center justify-center px-4 animate-fade-in-up">
            <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={onClose}></div>
            <div className="bg-sports-surface border border-sports-lime rounded-2xl p-8 max-w-md w-full relative shadow-[0_0_50px_rgba(163,230,53,0.2)] text-center">
                <div className="w-20 h-20 bg-sports-lime rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
                    <svg className="w-10 h-10 text-sports-navy" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                </div>
                <h3 className="text-3xl font-display font-bold text-white uppercase mb-2">¡Recibido!</h3>
                <p className="text-gray-300 font-body mb-6">
                    Hemos guardado todos los detalles de tu solicitud en nuestro sistema. Nos pondremos en contacto contigo muy pronto.
                </p>
                <button 
                    onClick={onClose}
                    className="w-full py-4 bg-sports-lime text-sports-navy font-bold uppercase tracking-widest rounded hover:bg-white transition-colors"
                >
                    Cerrar Ventana
                </button>
            </div>
         </div>
      )}
    </>
  );
};
