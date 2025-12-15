
import React, { useState, useEffect } from 'react';
import { createContact } from '../services/airtableService';

interface AuditModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const TIME_SLOTS = [
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
  
  const [availableDates, setAvailableDates] = useState<Date[]>([]);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [step, setStep] = useState<'form' | 'calendar'>('form');
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);

  useEffect(() => {
    if (isOpen) {
      const dates: Date[] = [];
      let current = new Date();
      current.setDate(current.getDate() + 1);
      while (dates.length < 5) {
        if (current.getDay() !== 0 && current.getDay() !== 6) {
          dates.push(new Date(current));
        }
        current.setDate(current.getDate() + 1);
      }
      setAvailableDates(dates);
      setStep('form');
      setSelectedDate(null);
      setSelectedTime(null);
      setShowSuccessPopup(false);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.phone) return;
    setStep('calendar');
    if (availableDates.length > 0) setSelectedDate(availableDates[0]);
  };

  const handleFinalConfirm = async () => {
    if (!selectedDate || !selectedTime) return;

    setIsSubmitting(true);

    const formattedDate = selectedDate.toLocaleDateString('es-ES', { weekday: 'long', day: 'numeric', month: 'long' });
    const detallesStr = `FECHA: ${formattedDate}
HORA: ${selectedTime}
PROYECTO: ${formData.project || "No especificado"}`;

    try {
      await createContact({
        Nombre: formData.name,
        Email: formData.email,
        Teléfono: formData.phone,
        Asunto: "Cita Auditoría Estratégica",
        Detalles: detallesStr,
        Mensaje: `Organización: ${formData.project || ""}`
      });

      setShowSuccessPopup(true);
    } catch (error: any) {
      console.error(error);
      alert(error.message || "Hubo un error al agendar tu cita.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const formatDateLabel = (date: Date) => {
    const dayName = date.toLocaleDateString('es-ES', { weekday: 'short' }).toUpperCase().replace('.', '');
    const dayNum = date.getDate();
    return { name: dayName, num: dayNum };
  };

  return (
    <>
      <div className="fixed inset-0 z-[100] overflow-y-auto font-sans" aria-labelledby="modal-title" role="dialog" aria-modal="true">
        <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
          <div className="fixed inset-0 bg-sports-navy/90 backdrop-blur-sm transition-opacity" aria-hidden="true" onClick={onClose}></div>
          <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>

          <div className="relative inline-block align-bottom bg-sports-navy border border-white/10 rounded-xl text-left overflow-hidden shadow-2xl transform transition-all sm:my-8 sm:align-middle sm:max-w-4xl w-full">
            
            <div className="flex flex-col md:flex-row min-h-[500px]">
              {/* Left Panel */}
              <div className="md:w-5/12 bg-sports-surface p-8 border-r border-white/5 flex flex-col justify-between relative overflow-hidden">
                 <div className="absolute top-0 right-0 -mr-10 -mt-10 w-40 h-40 bg-sports-lime/10 rounded-full blur-2xl"></div>
                 <div>
                   <h3 className="text-3xl font-display font-bold text-white uppercase leading-tight mb-4 pt-4">
                     Auditoría<br/>Estratégica
                   </h3>
                   <p className="text-gray-400 text-sm leading-relaxed mb-8">
                     En 30 minutos analizaremos tu estructura actual.
                   </p>
                 </div>
              </div>

              {/* Right Panel */}
              <div className="md:w-7/12 p-8 bg-sports-navy relative flex flex-col">
                 <button onClick={onClose} className="absolute top-4 right-4 text-gray-500 hover:text-white transition-colors z-10">✕</button>

                 {step === 'form' && (
                   <div className="h-full flex flex-col justify-center animate-fade-in-up">
                      <h4 className="text-xl font-display font-bold text-white uppercase mb-6">Tus Datos</h4>
                      <form onSubmit={handleFormSubmit} className="space-y-4">
                         <input required type="text" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} className="w-full bg-sports-dark border border-gray-700 rounded px-4 py-3 text-white" placeholder="Tu nombre" />
                         <div className="grid grid-cols-2 gap-4">
                            <input required type="email" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} className="w-full bg-sports-dark border border-gray-700 rounded px-4 py-3 text-white" placeholder="Email" />
                            <input required type="tel" value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} className="w-full bg-sports-dark border border-gray-700 rounded px-4 py-3 text-white" placeholder="Teléfono" />
                         </div>
                         <input type="text" value={formData.project} onChange={e => setFormData({...formData, project: e.target.value})} className="w-full bg-sports-dark border border-gray-700 rounded px-4 py-3 text-white" placeholder="Organización" />
                         <button type="submit" className="w-full mt-4 py-4 bg-sports-blue text-white font-bold uppercase rounded">Elegir Horario</button>
                      </form>
                   </div>
                 )}

                 {step === 'calendar' && (
                   <div className="h-full flex flex-col animate-fade-in-up">
                      <h4 className="text-xl font-display font-bold text-white uppercase mb-6">Selecciona Horario</h4>
                      
                      <div className="mb-6 flex gap-2 overflow-x-auto pb-2 custom-scrollbar">
                          {availableDates.map((date, idx) => {
                              const { name, num } = formatDateLabel(date);
                              const isSelected = selectedDate?.toDateString() === date.toDateString();
                              return (
                                  <button key={idx} onClick={() => { setSelectedDate(date); setSelectedTime(null); }} className={`flex flex-col items-center justify-center min-w-[70px] p-3 rounded border ${isSelected ? 'bg-sports-lime text-sports-navy' : 'bg-sports-dark text-gray-400'}`}>
                                      <span className="text-[10px] font-bold uppercase">{name}</span>
                                      <span className="text-xl font-display font-bold">{num}</span>
                                  </button>
                              );
                          })}
                      </div>

                      <div className="mb-8 grid grid-cols-3 gap-3">
                          {TIME_SLOTS.map((slot) => (
                              <button key={slot.id} onClick={() => setSelectedTime(slot.id)} className={`py-3 px-2 rounded border text-sm font-bold ${selectedTime === slot.id ? 'bg-sports-blue text-white' : 'bg-sports-dark text-gray-300'}`}>
                                  {slot.label}
                              </button>
                          ))}
                      </div>

                      <button onClick={handleFinalConfirm} disabled={!selectedDate || !selectedTime || isSubmitting} className="w-full py-4 bg-sports-lime text-sports-navy font-bold uppercase rounded disabled:opacity-50">
                           {isSubmitting ? 'Confirmando...' : 'Confirmar Cita'}
                      </button>
                   </div>
                 )}
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* SUCCESS POPUP */}
      {showSuccessPopup && (
         <div className="fixed inset-0 z-[110] flex items-center justify-center px-4 animate-fade-in-up">
            <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={onClose}></div>
            <div className="bg-sports-surface border border-sports-lime rounded-2xl p-8 max-w-md w-full relative text-center">
                <div className="w-20 h-20 bg-sports-lime rounded-full flex items-center justify-center mx-auto mb-6">
                    <svg className="w-10 h-10 text-sports-navy" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                </div>
                <h3 className="text-3xl font-display font-bold text-white uppercase mb-2">¡Cita Agendada!</h3>
                <p className="text-gray-300 font-body mb-6">
                    Tu auditoría ha sido confirmada para el {selectedDate?.toLocaleDateString()} a las {selectedTime}.
                </p>
                <button onClick={onClose} className="w-full py-4 bg-sports-lime text-sports-navy font-bold uppercase rounded hover:bg-white">Cerrar</button>
            </div>
         </div>
      )}
    </>
  );
};
