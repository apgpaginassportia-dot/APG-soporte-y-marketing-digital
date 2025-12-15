
import React, { useState, useEffect } from 'react';
import { Plan, LeadForm, CustomServiceOption, TeamServiceItem } from '../types';
import { CUSTOM_SERVICES_LIST, TEAM_SERVICES } from '../constants';

interface PlanModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedPlan: Plan | null;
  preselectedServices?: string[];
}

// Define stable default constant outside component to prevent re-render resets
const DEFAULT_SERVICES: string[] = [];

// Standard Market Rate for Student App/Management
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
  const [showSuccess, setShowSuccess] = useState(false);

  // School Plan specific states
  const [schoolPricingMode, setSchoolPricingMode] = useState<'fixed' | 'students'>('fixed');
  const [studentCount, setStudentCount] = useState<number>(100);

  // Reset form ONLY when the modal opens or the plan actually changes
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
      setShowSuccess(false);
      setIsSubmitting(false);
      // Reset School specifics
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
    
    // School Plan Dynamic Pricing Logic
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

    // Usamos FormData para mayor compatibilidad con FormSubmit
    const body = new FormData();
    // Configuración FormSubmit
    body.append("_subject", `Nuevo Cliente APG: ${formData.name}`);
    body.append("_template", "table");
    body.append("_captcha", "false"); // Desactivar captcha
    // body.append("_cc", formData.email); // ELIMINADO PARA EVITAR CONFUSIÓN DE DESTINATARIO

    // Datos del formulario - 'email' en minúsculas es CLAVE para FormSubmit
    body.append("Nombre", formData.name);
    body.append("email", formData.email); 
    body.append("Teléfono", formData.phone);
    body.append("Mensaje", formData.message || "Sin mensaje adicional");
    
    // Datos del Plan
    body.append("Plan Seleccionado", planTitleFull);
    body.append("Precio Estimado", `${total}€`);
    body.append("Detalles Cálculo", extraDetails || "N/A");
    body.append("Servicios Incluidos", servicesList);

    // Solo añadir precio por alumno si se rellenó manualmente en el plan escolar
    if (selectedPlan.id === 'school' && formData.pricePerStudent) {
        body.append("Precio Alumno (Manual)", formData.pricePerStudent);
    }

    try {
      // Usamos el endpoint AJAX para evitar redirecciones, pero con FormData
      const response = await fetch("https://formsubmit.co/ajax/alicia.pons.garcia@outlook.es", {
        method: "POST",
        // NO poner Content-Type header manualmente con FormData, el navegador lo pone con el boundary correcto
        body: body
      });

      if (response.ok) {
        setShowSuccess(true);
      } else {
        throw new Error("Error en el servidor de correo.");
      }
    } catch (error) {
      console.error("Fallo envío automático:", error);
      
      // FALLBACK ROBUSTO: Mailto
      const subject = encodeURIComponent(`Contratar ${planTitleFull}`);
      const bodyText = encodeURIComponent(`
Hola Alicia, quiero contratar el ${planTitleFull}.

Mis datos:
Nombre: ${formData.name}
Email: ${formData.email}
Teléfono: ${formData.phone}
Precio web: ${total}€

Mensaje: ${formData.message || ''}
      `);
      
      window.location.href = `mailto:alicia.pons.garcia@outlook.es?subject=${subject}&body=${bodyText}`;
      // Mostramos éxito porque el usuario ya tiene la acción en su cliente de correo
      setShowSuccess(true);
    } finally {
      setIsSubmitting(false);
    }
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
                <div className="w-16 h-16 bg-sports-lime rounded-full flex items-center justify-center mx-auto mb-6 shadow-[0_0_20px_rgba(120,224,143,0.3)]">
                   <svg className="w-8 h-8 text-sports-navy" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                   </svg>
                </div>
                <h3 className="text-2xl font-display font-bold text-white mb-4 uppercase tracking-wide">¡Solicitud Procesada!</h3>
                <div className="max-w-md mx-auto space-y-2 mb-8">
                  <p className="text-gray-300 font-body text-lg">
                    Hemos recibido tus datos correctamente.
                  </p>
                  <p className="text-gray-400 font-body text-sm">
                    En breve recibirás una respuesta en tu correo <span className="text-sports-lime font-bold">alicia.pons.garcia@outlook.es</span>.
                  </p>
                </div>
                <button 
                  onClick={onClose}
                  className="px-8 py-3 bg-sports-blue hover:bg-white hover:text-sports-navy text-white font-bold uppercase tracking-wide rounded transition-colors"
                >
                  Entendido, cerrar
                </button>
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
                   <p className="text-[10px] text-gray-500 mt-1 uppercase tracking-wide">
                     {selectedPlan.id === 'school' && schoolPricingMode === 'students' 
                        ? 'Precio anual total (Sin Base)' 
                        : selectedPlan.id === 'team'
                          ? `Precio ${selectedPlan.subtitle}` 
                          : selectedPlan.id === 'team_custom'
                            ? 'Estimación Total (Mixta)'
                            : 'Precio base anual (sin IVA)'}
                   </p>
                </div>

                {/* SCHOOL PLAN CALCULATOR UI */}
                {selectedPlan.id === 'school' && (
                  <div className="bg-sports-navy/50 rounded p-4 border border-white/10 mb-6 shadow-inner">
                     <label className="block text-xs font-bold text-sports-blue uppercase mb-3">Modo de Pago</label>
                     <div className="flex rounded border border-white/10 overflow-hidden mb-4">
                        <button 
                          onClick={() => setSchoolPricingMode('fixed')}
                          className={`flex-1 py-2 text-xs font-bold uppercase transition-colors ${schoolPricingMode === 'fixed' ? 'bg-sports-blue text-white' : 'bg-transparent text-gray-400 hover:text-white'}`}
                        >
                          Tarifa Plana
                        </button>
                        <button 
                          onClick={() => setSchoolPricingMode('students')}
                          className={`flex-1 py-2 text-xs font-bold uppercase transition-colors ${schoolPricingMode === 'students' ? 'bg-sports-blue text-white' : 'bg-transparent text-gray-400 hover:text-white'}`}
                        >
                          Por Alumno
                        </button>
                     </div>

                     {schoolPricingMode === 'students' && (
                       <div className="animate-fade-in-up mt-4 bg-sports-dark/50 p-3 rounded border border-white/5">
                          <label className="block text-[10px] font-bold text-gray-400 uppercase mb-2">Número de Alumnos (Mínimo 1)</label>
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
                             <span className="text-gray-500 font-bold text-sm">=</span>
                             <span className="text-lg font-bold text-sports-lime whitespace-nowrap">
                                {(studentCount * PRICE_PER_STUDENT).toFixed(2)}€
                             </span>
                          </div>
                          <p className="text-[10px] text-gray-500 mt-2 italic">
                            *Cálculo directo en base a {studentCount} alumnos.
                          </p>
                       </div>
                     )}
                     
                     <p className="text-[10px] text-gray-500 mt-3 italic">
                        {schoolPricingMode === 'fixed' 
                          ? "Recomendado para centros estándar. Tarifa fija sin sorpresas." 
                          : "Paga solo por lo que usas. Sin coste de alta ni precio base."}
                     </p>
                  </div>
                )}

                <div className="flex-1 overflow-y-auto custom-scrollbar pr-2 max-h-[30vh] md:max-h-none">
                   <p className="text-sm text-gray-300 mb-6 leading-relaxed font-body">
                     {selectedPlan.details || selectedPlan.description}
                   </p>
                   
                   {/* DYNAMIC LIST */}
                   {(selectedPlan.id === 'custom' || selectedPlan.id === 'team_custom') ? (
                      <div className="bg-sports-navy/50 rounded p-4 border border-white/5 mb-6">
                        <h4 className="text-xs font-bold text-sports-blue uppercase mb-3 pb-2 border-b border-white/10">Desglose de Servicios</h4>
                        <ul className="space-y-0">
                          {getCustomServiceBreakdown().map((s: any, idx, arr) => s && (
                            <li key={idx} className={`${idx !== arr.length - 1 ? 'border-b border-white/5 pb-3 mb-3' : ''}`}>
                               <div className="flex justify-between items-center mb-1">
                                  <span className="font-bold text-gray-200 text-xs">{s.label || s.title}</span>
                                  <span className="font-bold text-sports-lime text-xs">
                                     {s.price}{s.unit ? `€` : ''}{s.period ? ` ${s.period}` : ''}
                                  </span>
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
                          name="name"
                          value={formData.name}
                          onChange={e => setFormData(prev => ({...prev, name: e.target.value}))}
                          className={`block w-full border ${errors.name ? 'border-red-500' : 'border-gray-700'} rounded bg-sports-dark text-white py-3 px-4 focus:outline-none focus:border-sports-blue transition-all placeholder-gray-600 font-body text-sm`}
                          placeholder={selectedPlan.id === 'school' ? "Nombre del Centro / AMPA" : "Tu nombre"}
                        />
                        {errors.name && <p className="mt-1 text-xs text-red-400">{errors.name}</p>}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold text-sports-lime uppercase mb-2">Email</label>
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={e => setFormData(prev => ({...prev, email: e.target.value}))}
                          className={`block w-full border ${errors.email ? 'border-red-500' : 'border-gray-700'} rounded bg-sports-dark text-white py-3 px-4 focus:outline-none focus:border-sports-blue transition-all placeholder-gray-600 font-body text-sm`}
                          placeholder="tu@email.com"
                        />
                        {errors.email && <p className="mt-1 text-xs text-red-400">{errors.email}</p>}
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-sports-lime uppercase mb-2">Teléfono</label>
                        <input
                          type="tel"
                          name="phone"
                          value={formData.phone}
                          onChange={e => setFormData(prev => ({...prev, phone: e.target.value}))}
                          className={`block w-full border ${errors.phone ? 'border-red-500' : 'border-gray-700'} rounded bg-sports-dark text-white py-3 px-4 focus:outline-none focus:border-sports-blue transition-all placeholder-gray-600 font-body text-sm`}
                          placeholder="+34..."
                        />
                        {errors.phone && <p className="mt-1 text-xs text-red-400">{errors.phone}</p>}
                      </div>
                    </div>

                    {/* ONLY SHOW FOR SCHOOL PLAN - STRICT CONDITION */}
                    {selectedPlan.id === 'school' && (
                        <div className="animate-fade-in-up">
                            <label className="block text-xs font-bold text-sports-lime uppercase mb-2">Precio por alumno (Opcional)</label>
                            <input
                              type="text"
                              name="pricePerStudent"
                              value={formData.pricePerStudent}
                              onChange={e => setFormData(prev => ({...prev, pricePerStudent: e.target.value}))}
                              className="block w-full border border-gray-700 rounded bg-sports-dark text-white py-3 px-4 focus:outline-none focus:border-sports-blue transition-all placeholder-gray-600 font-body text-sm"
                              placeholder="Ej: 30€ (Si difiere del cálculo automático)"
                            />
                        </div>
                    )}

                    <div>
                      <label className="block text-xs font-bold text-sports-lime uppercase mb-2">Mensaje (Opcional)</label>
                      <textarea
                        name="message"
                        value={formData.message}
                        onChange={e => setFormData(prev => ({...prev, message: e.target.value}))}
                        rows={3}
                        className="block w-full border border-gray-700 rounded bg-sports-dark text-white py-3 px-4 focus:outline-none focus:border-sports-blue transition-all placeholder-gray-600 font-body text-sm resize-none"
                        placeholder="Comentarios adicionales..."
                      />
                    </div>

                    <div className="pt-4">
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full flex justify-center py-4 px-4 border border-transparent rounded shadow-lg shadow-sports-blue/20 text-sm font-bold text-white bg-sports-blue hover:bg-sports-lime hover:text-sports-navy uppercase tracking-wider transition-all duration-300 transform hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-wait"
                      >
                        {isSubmitting ? 'Enviando...' : 'Enviar Solicitud'}
                      </button>
                      <p className="mt-4 text-center text-[10px] text-gray-500 leading-tight">
                        Al enviar, los datos se mandarán directamente a alicia.pons.garcia@outlook.es
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
