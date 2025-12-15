
import React, { useState, useEffect } from 'react';

interface AuditModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface TimeSlot {
  id: string;
  label: string;
}

// Simulated available slots
const TIME_SLOTS: TimeSlot[] = [
  { id: '10:00', label: '10:00' },
  { id: '11:00', label: '11:00' },
  { id: '12:00', label: '12:00' },
  { id: '16:00', label: '16:00' },
  { id: '17:00', label: '17:00' },
  { id: '18:00', label: '18:00' },
];

export const AuditModal: React.FC<AuditModalProps> = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    project: ''
  });
  
  // Calendar State
  const [availableDates, setAvailableDates] = useState<Date[]>([]);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [step, setStep] = useState<'form' | 'calendar' | 'success'>('form');

  // Generate next 5 business days on mount
  useEffect(() => {
    if (isOpen) {
      const dates: Date[] = [];
      let current = new Date();
      current.setDate(current.getDate() + 1); // Start tomorrow

      while (dates.length < 5) {
        // 0 = Sunday, 6 = Saturday
        if (current.getDay() !== 0 && current.getDay() !== 6) {
          dates.push(new Date(current));
        }
        current.setDate(current.getDate() + 1);
      }
      setAvailableDates(dates);
      // Reset states
      setStep('form');
      setSelectedDate(null);
      setSelectedTime(null);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.phone) return;
    // Move to calendar step instead of sending immediately
    setStep('calendar');
    // Auto-select first date
    if (availableDates.length > 0) setSelectedDate(availableDates[0]);
  };

  const handleFinalConfirm = async () => {
    if (!selectedDate || !selectedTime) return;

    setIsSubmitting(true);

    const formattedDate = selectedDate.toLocaleDateString('es-ES', { weekday: 'long', day: 'numeric', month: 'long' });

    // FormData construction
    const body = new FormData();
    body.append("_subject", `📅 CITA AUDITORÍA: ${formData.name}`);
    body.append("_template", "table");
    body.append("_captcha", "false");
    
    body.append("Nombre", formData.name);
    body.append("Email", formData.email);
    body.append("Teléfono", formData.phone);
    body.append("Proyecto", formData.project || "No especificado");
    body.append("Tipo", "Auditoría Estratégica");
    body.append("Fecha Cita", formattedDate);
    body.append("Hora Cita", selectedTime);

    try {
      const response = await fetch("https://formsubmit.co/ajax/alicia.pons.garcia@outlook.es", {
        method: "POST",
        body: body
      });

      if (response.ok) {
        setStep('success');
      } else {
        throw new Error("Respuesta inválida servidor");
      }
    } catch (error) {
      console.error(error);
      
      // Fallback a Mailto
      const subject = encodeURIComponent(`Cita Auditoría: ${formData.name}`);
      const bodyText = encodeURIComponent(`Hola, deseo agendar una auditoría.\n\nNombre: ${formData.name}\nTeléfono: ${formData.phone}\nProyecto: ${formData.project}\nFecha: ${formattedDate} a las ${selectedTime}`);
      
      window.location.href = `mailto:alicia.pons.garcia@outlook.es?subject=${subject}&body=${bodyText}`;
      setStep('success');
      
    } finally {
      setIsSubmitting(false);
    }
  };

  const formatDateLabel = (date: Date) => {
    // Returns "LUN 12" format
    const dayName = date.toLocaleDateString('es-ES', { weekday: 'short' }).toUpperCase().replace('.', '');
    const dayNum = date.getDate();
    return { name: dayName, num: dayNum };
  };

  return (
    <div className="fixed inset-0 z-[100] overflow-y-auto font-sans" aria-labelledby="modal-title" role="dialog" aria-modal="true">
      <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
        <div className="fixed inset-0 bg-sports-navy/90 backdrop-blur-sm transition-opacity" aria-hidden="true" onClick={onClose}></div>
        <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>

        <div className="relative inline-block align-bottom bg-sports-navy border border-white/10 rounded-xl text-left overflow-hidden shadow-2xl transform transition-all sm:my-8 sm:align-middle sm:max-w-4xl w-full">
          
          <div className="flex flex-col md:flex-row min-h-[500px]">
            {/* Left Panel: Value Proposition & Context */}
            <div className="md:w-5/12 bg-sports-surface p-8 border-r border-white/5 flex flex-col justify-between relative overflow-hidden">
               <div className="absolute top-0 right-0 -mr-10 -mt-10 w-40 h-40 bg-sports-lime/10 rounded-full blur-2xl"></div>
               
               <div>
                 <h3 className="text-3xl font-display font-bold text-white uppercase leading-tight mb-4 pt-4">
                   Auditoría<br/>Estratégica
                 </h3>
                 <p className="text-gray-400 text-sm leading-relaxed mb-8">
                   En 30 minutos analizaremos tu estructura actual y detectaremos los cuellos de botella que te están haciendo perder dinero y tiempo.
                 </p>
                 
                 {step === 'form' && (
                   <ul className="space-y-4">
                      {[
                        "Diagnóstico de procesos actuales",
                        "Detección de fugas de ingresos",
                        "Roadmap de digitalización",
                        "Sin coste ni compromiso"
                      ].map((item, i) => (
                        <li key={i} className="flex items-center text-gray-300 text-xs font-bold uppercase tracking-wide">
                          <svg className="w-4 h-4 text-sports-lime mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>
                          {item}
                        </li>
                      ))}
                   </ul>
                 )}

                 {step === 'calendar' && (
                    <div className="bg-sports-navy/50 p-4 rounded border border-white/10 animate-fade-in-up">
                        <p className="text-xs text-gray-500 uppercase tracking-widest mb-2">Tus Datos:</p>
                        <div className="text-white font-bold">{formData.name}</div>
                        <div className="text-gray-400 text-sm">{formData.project}</div>
                        <button onClick={() => setStep('form')} className="text-xs text-sports-blue underline mt-2 hover:text-white">Editar datos</button>
                    </div>
                 )}
               </div>

               <div className="mt-8 pt-6 border-t border-white/10">
                 <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gray-700 rounded-full flex items-center justify-center font-display font-bold text-white">A</div>
                    <div>
                      <p className="text-white font-bold text-xs uppercase">Alicia Pons</p>
                      <p className="text-gray-500 text-[10px]">Tu consultora estratégica</p>
                    </div>
                 </div>
               </div>
            </div>

            {/* Right Panel: Logic Switch */}
            <div className="md:w-7/12 p-8 bg-sports-navy relative flex flex-col">
               <button onClick={onClose} className="absolute top-4 right-4 text-gray-500 hover:text-white transition-colors z-10">
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
               </button>

               {/* STEP 1: FORM */}
               {step === 'form' && (
                 <div className="h-full flex flex-col justify-center animate-fade-in-up">
                    <div className="flex justify-between items-center mb-2">
                         <h4 className="text-xl font-display font-bold text-white uppercase">Paso 1: Tus Datos</h4>
                         <span className="text-xs font-bold text-sports-lime border border-sports-lime px-2 py-0.5 rounded">1/2</span>
                    </div>
                    
                    <p className="text-gray-400 text-sm mb-8">Necesitamos esta información para preparar la reunión.</p>

                    <form onSubmit={handleFormSubmit} className="space-y-4">
                       <div>
                          <label className="block text-xs font-bold text-sports-blue uppercase mb-2">Nombre Completo</label>
                          <input 
                            required
                            type="text" 
                            value={formData.name}
                            onChange={e => setFormData({...formData, name: e.target.value})}
                            className="w-full bg-sports-dark border border-gray-700 rounded px-4 py-3 text-white focus:border-sports-lime outline-none transition-colors"
                            placeholder="Tu nombre"
                          />
                       </div>
                       <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label className="block text-xs font-bold text-sports-blue uppercase mb-2">Email</label>
                            <input 
                              required
                              type="email" 
                              value={formData.email}
                              onChange={e => setFormData({...formData, email: e.target.value})}
                              className="w-full bg-sports-dark border border-gray-700 rounded px-4 py-3 text-white focus:border-sports-lime outline-none transition-colors"
                              placeholder="tu@email.com"
                            />
                          </div>
                          <div>
                            <label className="block text-xs font-bold text-sports-blue uppercase mb-2">Teléfono</label>
                            <input 
                              required
                              type="tel" 
                              value={formData.phone}
                              onChange={e => setFormData({...formData, phone: e.target.value})}
                              className="w-full bg-sports-dark border border-gray-700 rounded px-4 py-3 text-white focus:border-sports-lime outline-none transition-colors"
                              placeholder="+34..."
                            />
                          </div>
                       </div>
                       <div>
                          <label className="block text-xs font-bold text-sports-blue uppercase mb-2">Club / Torneo / Colegio</label>
                          <input 
                            type="text" 
                            value={formData.project}
                            onChange={e => setFormData({...formData, project: e.target.value})}
                            className="w-full bg-sports-dark border border-gray-700 rounded px-4 py-3 text-white focus:border-sports-lime outline-none transition-colors"
                            placeholder="Nombre de tu organización"
                          />
                       </div>

                       <button 
                         type="submit"
                         className="w-full mt-4 py-4 bg-sports-blue hover:bg-white hover:text-sports-navy text-white font-bold font-display uppercase tracking-wider rounded transition-all shadow-lg shadow-sports-blue/20"
                       >
                         Elegir Horario
                       </button>
                    </form>
                 </div>
               )}

               {/* STEP 2: CALENDAR */}
               {step === 'calendar' && (
                 <div className="h-full flex flex-col animate-fade-in-up">
                    <div className="flex justify-between items-center mb-6">
                         <h4 className="text-xl font-display font-bold text-white uppercase">Paso 2: Agenda</h4>
                         <span className="text-xs font-bold text-white border border-white/20 px-2 py-0.5 rounded">2/2</span>
                    </div>

                    {/* Date Selector */}
                    <div className="mb-6">
                        <label className="block text-xs font-bold text-sports-lime uppercase mb-3">1. Selecciona el día</label>
                        <div className="flex gap-2 overflow-x-auto pb-2 custom-scrollbar">
                            {availableDates.map((date, idx) => {
                                const { name, num } = formatDateLabel(date);
                                const isSelected = selectedDate?.toDateString() === date.toDateString();
                                return (
                                    <button
                                        key={idx}
                                        onClick={() => { setSelectedDate(date); setSelectedTime(null); }}
                                        className={`flex flex-col items-center justify-center min-w-[70px] p-3 rounded border transition-all ${
                                            isSelected 
                                            ? 'bg-sports-lime border-sports-lime text-sports-navy' 
                                            : 'bg-sports-dark border-white/10 text-gray-400 hover:border-white/30 hover:text-white'
                                        }`}
                                    >
                                        <span className="text-[10px] font-bold uppercase tracking-wider">{name}</span>
                                        <span className="text-xl font-display font-bold">{num}</span>
                                    </button>
                                );
                            })}
                        </div>
                    </div>

                    {/* Time Selector */}
                    <div className="mb-8 flex-1">
                        <label className="block text-xs font-bold text-sports-lime uppercase mb-3">2. Selecciona la hora</label>
                        <div className="grid grid-cols-3 gap-3">
                            {TIME_SLOTS.map((slot) => {
                                const isSelected = selectedTime === slot.id;
                                return (
                                    <button
                                        key={slot.id}
                                        onClick={() => setSelectedTime(slot.id)}
                                        className={`py-3 px-2 rounded border text-sm font-bold transition-all ${
                                            isSelected
                                            ? 'bg-sports-blue border-sports-blue text-white shadow-lg'
                                            : 'bg-sports-dark border-white/10 text-gray-300 hover:bg-sports-surface hover:border-white/30'
                                        }`}
                                    >
                                        {slot.label}
                                    </button>
                                )
                            })}
                        </div>
                    </div>

                    <button 
                         onClick={handleFinalConfirm}
                         disabled={!selectedDate || !selectedTime || isSubmitting}
                         className="w-full py-4 bg-sports-lime text-sports-navy hover:bg-white font-bold font-display uppercase tracking-wider rounded transition-all shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                         {isSubmitting ? 'Confirmando...' : 'Confirmar Cita'}
                    </button>
                 </div>
               )}

               {/* STEP 3: SUCCESS */}
               {step === 'success' && (
                 <div className="h-full flex flex-col items-center justify-center text-center animate-fade-in-up">
                    <div className="w-16 h-16 bg-sports-lime rounded-full flex items-center justify-center mb-6 shadow-[0_0_20px_rgba(120,224,143,0.3)]">
                       <svg className="w-8 h-8 text-sports-navy" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                    </div>
                    <h4 className="text-2xl font-display font-bold text-white uppercase mb-2">¡Cita Confirmada!</h4>
                    <p className="text-gray-300 max-w-sm mb-2">
                      Hemos agendado tu auditoría para el:
                    </p>
                    <div className="text-xl font-bold text-white mb-6 bg-sports-blue/20 border border-sports-blue/30 px-6 py-3 rounded-lg">
                        {selectedDate?.toLocaleDateString('es-ES', { weekday: 'long', day: 'numeric' })} a las {selectedTime}
                    </div>
                    <p className="text-gray-500 text-xs mb-8">
                       Te hemos enviado un correo de confirmación. Te contactaremos por teléfono si necesitamos algún dato previo.
                    </p>
                    
                    <button 
                      onClick={onClose}
                      className="px-8 py-3 bg-transparent border border-white/20 text-white font-bold uppercase tracking-wider rounded hover:bg-white/5 transition-colors"
                    >
                      Cerrar
                    </button>
                 </div>
               )}

            </div>
          </div>

        </div>
      </div>
    </div>
  );
};
