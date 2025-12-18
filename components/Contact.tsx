
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
    if (!formData.name || !formData.email || !formData.message) {
      return;
    }

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

  const resetForm = () => {
    setShowSuccess(false);
  };

  return (
    <section id="contact" className="py-24 bg-sports-dark relative">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-sports-surface rounded-lg overflow-hidden border border-white/5 shadow-xl">
           <div className="md:flex min-h-[450px]">
              <div className="bg-sports-navy p-12 text-white md:w-2/5 flex flex-col justify-between relative overflow-hidden">
                 <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-b from-sports-blue/10 to-transparent pointer-events-none"></div>
                 
                 <div className="relative z-10 flex flex-col h-full">
                   <div>
                     <h3 className="text-4xl font-display font-bold mb-4 uppercase">Contacto</h3>
                     <p className="text-sports-muted mb-8 font-light leading-relaxed">
                       ¿Listo para profesionalizar tu torneo? Hablemos.
                     </p>
                     
                     <div className="space-y-6">
                       <a href="mailto:alicia.pons.garcia@outlook.es" className="flex items-center text-sm hover:text-sports-lime transition-colors group">
                         <div className="w-10 h-10 rounded bg-sports-surface border border-white/5 flex items-center justify-center mr-4 group-hover:bg-sports-lime group-hover:text-sports-navy transition-all">
                           <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                         </div>
                         <span className="truncate">alicia.pons.garcia@outlook.es</span>
                       </a>
                     </div>
                   </div>
                 </div>
              </div>
              
              <div className="p-12 md:w-3/5 bg-sports-surface relative flex items-center justify-center">
                  {!showSuccess ? (
                    <form className="space-y-6 w-full animate-fade-in-up" onSubmit={handleSubmit}>
                      <div>
                        <label className="block text-xs font-bold text-sports-blue uppercase mb-2">Nombre</label>
                        <input 
                          required
                          type="text" 
                          value={formData.name}
                          onChange={(e) => setFormData({...formData, name: e.target.value})}
                          className="w-full bg-sports-navy border border-sports-gray text-white rounded px-4 py-3 focus:border-sports-lime outline-none transition-all" 
                          placeholder="Nombre completo" 
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-sports-blue uppercase mb-2">Email</label>
                        <input 
                          required
                          type="email" 
                          value={formData.email}
                          onChange={(e) => setFormData({...formData, email: e.target.value})}
                          className="w-full bg-sports-navy border border-sports-gray text-white rounded px-4 py-3 focus:border-sports-lime outline-none transition-all" 
                          placeholder="email@club.com" 
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-sports-blue uppercase mb-2">Mensaje</label>
                        <textarea 
                          required
                          rows={4} 
                          value={formData.message}
                          onChange={(e) => setFormData({...formData, message: e.target.value})}
                          className="w-full bg-sports-navy border border-sports-gray text-white rounded px-4 py-3 focus:border-sports-lime outline-none transition-all resize-none"
                          placeholder="Escribe aquí tu duda o detalles del torneo..."
                        ></textarea>
                      </div>
                      
                      <div className="pt-2">
                         <button 
                          type="submit"
                          disabled={isSubmitting}
                          className="w-full bg-sports-blue text-white font-bold py-4 rounded hover:bg-sports-lime hover:text-sports-navy transition-all uppercase tracking-wide text-sm disabled:opacity-50 shadow-lg shadow-sports-blue/20"
                         >
                           {isSubmitting ? 'Enviando...' : 'Enviar Email'}
                         </button>
                      </div>
                    </form>
                  ) : (
                    <div className="text-center animate-fade-in-up py-8 flex flex-col items-center">
                       <div className="w-20 h-20 bg-sports-lime/10 border border-sports-lime rounded-full flex items-center justify-center mb-6 shadow-[0_0_20px_rgba(163,230,53,0.2)]">
                          <svg className="w-10 h-10 text-sports-lime" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                          </svg>
                       </div>
                       <h4 className="text-2xl font-display font-bold text-white uppercase mb-2">¡Mensaje Enviado!</h4>
                       <p className="text-gray-400 font-body mb-8 max-w-xs mx-auto">
                         Gracias por contactar. Alicia Pons revisará tu solicitud y te responderá en las próximas 24-48 horas.
                       </p>
                       <button 
                         onClick={resetForm}
                         className="text-sports-blue hover:text-sports-lime font-bold uppercase text-xs tracking-widest flex items-center gap-2 transition-colors"
                       >
                         <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
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
