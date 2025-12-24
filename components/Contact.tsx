
import React, { useState } from 'react';
import { createContact } from '../services/airtableService';

export const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    setIsSubmitting(true);

    try {
      await createContact({
        Nombre: formData.name,
        Email: formData.email,
        Teléfono: "No especificado",
        Asunto: "Consulta Web General",
        Detalles: "Origen: Formulario Contacto Footer",
        Mensaje: formData.message
      });
      setShowSuccess(true);
      setFormData({ name: '', email: '', message: '' });
    } catch (error: any) {
      console.error(error);
      alert(error.message || "Hubo un error al enviar el mensaje.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-24 bg-sports-bg relative">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-sports-navy/50 backdrop-blur-md rounded-[3rem] overflow-hidden border border-white/10 shadow-2xl">
           <div className="md:flex">
              <div className="bg-sports-primary p-12 text-white md:w-2/5 flex flex-col justify-between relative overflow-hidden">
                 <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-white/5 rounded-full blur-3xl"></div>
                 <div className="relative z-10">
                   <h3 className="text-3xl font-display font-bold mb-4 uppercase tracking-tight">Contacto</h3>
                   <p className="text-indigo-100 mb-8 font-light text-sm leading-relaxed">
                     ¿Dudas sobre cómo profesionalizar tu torneo de fútbol? Resolvemos tus inquietudes en menos de 24h.
                   </p>
                   
                   <div className="space-y-4">
                     <a href="mailto:alicia.pons.garcia@outlook.es" className="flex items-center text-xs hover:text-sports-accent transition-colors">
                       <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center mr-4 border border-white/10">
                         <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                       </div>
                       <span className="break-all font-medium">alicia.pons.garcia@outlook.es</span>
                     </a>
                   </div>
                 </div>
              </div>
              
              <div className="p-10 md:w-3/5 bg-transparent">
                  {!showSuccess ? (
                    <form className="space-y-5" onSubmit={handleSubmit}>
                      <div>
                        <label className="block text-[10px] font-bold text-sports-accent uppercase mb-2 tracking-widest">Nombre Completo</label>
                        <input required type="text" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} className="w-full bg-white/5 border border-white/10 text-white rounded-xl px-4 py-4 focus:border-sports-accent outline-none transition-all text-sm" placeholder="Ej: Manuel García" />
                      </div>
                      <div>
                        <label className="block text-[10px] font-bold text-sports-accent uppercase mb-2 tracking-widest">Email Corporativo</label>
                        <input required type="email" value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} className="w-full bg-white/5 border border-white/10 text-white rounded-xl px-4 py-4 focus:border-sports-accent outline-none transition-all text-sm" placeholder="ejemplo@club.com" />
                      </div>
                      <div>
                        <label className="block text-[10px] font-bold text-sports-accent uppercase mb-2 tracking-widest">Mensaje / Detalles del Evento</label>
                        <textarea required rows={4} value={formData.message} onChange={(e) => setFormData({...formData, message: e.target.value})} className="w-full bg-white/5 border border-white/10 text-white rounded-xl px-4 py-4 focus:border-sports-accent outline-none transition-all resize-none text-sm" placeholder="Cuéntanos un poco sobre tu torneo..."></textarea>
                      </div>
                      
                      <button type="submit" disabled={isSubmitting} className="w-full bg-sports-accent text-sports-dark font-display font-extrabold py-5 rounded-2xl hover:bg-white transition-all uppercase tracking-widest text-xs disabled:opacity-50 shadow-xl shadow-lime-500/10">
                        {isSubmitting ? 'Enviando...' : 'Enviar Mensaje'}
                      </button>
                    </form>
                  ) : (
                    <div className="text-center py-10 flex flex-col items-center">
                       <div className="w-20 h-20 bg-sports-success/10 border border-sports-success/30 rounded-full flex items-center justify-center mb-6">
                          <svg className="w-10 h-10 text-sports-success" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                          </svg>
                       </div>
                       <h4 className="text-2xl font-display font-bold text-white uppercase mb-2 tracking-tight">¡Recibido!</h4>
                       <p className="text-slate-400 text-sm mb-8 max-w-xs mx-auto leading-relaxed">
                         Gracias por contactar. Alicia Pons revisará tu solicitud y te responderá personalmente.
                       </p>
                       <button onClick={() => setShowSuccess(false)} className="text-sports-accent hover:text-white font-bold uppercase text-[10px] tracking-widest transition-colors">
                         Enviar otro mensaje
                       </button>
                    </div>
                  )}
              </div>
           </div>
        </div>
      </div>
    </section>
  );
};
