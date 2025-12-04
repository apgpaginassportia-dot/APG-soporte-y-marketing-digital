import React, { useState } from 'react';

interface ContactProps {
  onConsultAI: (message: string) => void;
}

export const Contact: React.FC<ContactProps> = ({ onConsultAI }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [aiError, setAiError] = useState('');

  const handleConsultClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (formData.message.trim()) {
      setAiError('');
      onConsultAI(formData.message);
    } else {
      setAiError("Por favor, escribe tu duda antes de consultar a la IA.");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      alert("Por favor rellena todos los campos.");
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus('idle');

    const emailPayload = {
      _subject: `Consulta Web General: ${formData.name}`,
      _template: "table",
      _captcha: "false",
      Nombre: formData.name,
      Email: formData.email,
      Mensaje: formData.message
    };

    try {
      const response = await fetch("https://formsubmit.co/ajax/alicia.pons.garcia@outlook.es", {
        method: "POST",
        headers: { 
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(emailPayload)
      });

      if (response.ok) {
        setSubmitStatus('success');
        setFormData({ name: '', email: '', message: '' });
      } else {
        setSubmitStatus('error');
      }
    } catch (error) {
      console.error(error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-24 bg-sports-dark relative">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-sports-surface rounded-lg overflow-hidden border border-white/5 shadow-2xl">
           <div className="md:flex">
              <div className="bg-sports-navy p-12 text-white md:w-2/5 flex flex-col justify-between relative overflow-hidden">
                 <div className="absolute top-0 right-0 -mr-10 -mt-10 w-40 h-40 bg-sports-blue/20 rounded-full blur-2xl"></div>
                 
                 <div className="relative z-10 flex flex-col h-full">
                   <div>
                     <h3 className="text-4xl font-display font-bold mb-4 uppercase">Contacto</h3>
                     <p className="text-gray-400 mb-8 font-light leading-relaxed">
                       ¿Listo para profesionalizar tu torneo? Hablemos.
                     </p>
                     
                     <div className="space-y-6">
                       <a href="mailto:alicia.pons.garcia@outlook.es" className="flex items-center text-sm hover:text-sports-lime transition-colors group">
                         <div className="w-10 h-10 rounded bg-white/5 flex items-center justify-center mr-4 group-hover:bg-sports-lime group-hover:text-sports-navy transition-all">
                           <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                         </div>
                         <span className="truncate">alicia.pons.garcia@outlook.es</span>
                       </a>
                       <a href="https://wa.me/34661256504" className="flex items-center text-sm hover:text-sports-lime transition-colors group">
                         <div className="w-10 h-10 rounded bg-white/5 flex items-center justify-center mr-4 group-hover:bg-sports-lime group-hover:text-sports-navy transition-all">
                           <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
                         </div>
                         +34 661 256 504
                       </a>
                     </div>
                   </div>

                   <div className="mt-10 pt-8 border-t border-white/10">
                      <h4 className="text-sm font-bold text-sports-lime uppercase tracking-widest mb-4">Redes Sociales</h4>
                      <div className="flex gap-4">
                        <a 
                          href="https://www.linkedin.com/in/alicia-pons-garc%C3%ADa-aa00a3381/"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-10 h-10 rounded bg-white/5 flex items-center justify-center text-gray-400 hover:bg-blue-700 hover:text-white transition-all duration-300"
                          aria-label="LinkedIn"
                        >
                          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
                        </a>
                        <a 
                          href="https://x.com/AliSportsIA"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-10 h-10 rounded bg-white/5 flex items-center justify-center text-gray-400 hover:bg-black hover:text-white transition-all duration-300"
                          aria-label="X (Twitter)"
                        >
                          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
                        </a>
                        <a 
                          href="https://www.instagram.com/apg_socialmedia91?igsh=MXJ1Zm85cGdkcHAxMA=="
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-10 h-10 rounded bg-white/5 flex items-center justify-center text-gray-400 hover:bg-pink-600 hover:text-white transition-all duration-300"
                          aria-label="Instagram"
                        >
                          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
                        </a>
                      </div>
                   </div>
                 </div>
              </div>
              
              <div className="p-12 md:w-3/5 bg-sports-surface">
                {submitStatus === 'success' ? (
                  <div className="h-full flex flex-col items-center justify-center text-center">
                    <div className="w-16 h-16 bg-sports-lime rounded-full flex items-center justify-center mb-6">
                       <svg className="w-8 h-8 text-sports-navy" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                       </svg>
                    </div>
                    <h4 className="text-2xl font-bold text-white mb-2 uppercase">¡Mensaje Enviado!</h4>
                    <p className="text-gray-400">Gracias por contactar. Te responderemos en breve.</p>
                    <button onClick={() => setSubmitStatus('idle')} className="mt-8 text-sports-lime underline text-sm">Enviar otro mensaje</button>
                  </div>
                ) : (
                  <form className="space-y-6" onSubmit={handleSubmit}>
                    <div>
                      <label className="block text-xs font-bold text-sports-blue uppercase mb-2">Nombre</label>
                      <input 
                        type="text" 
                        value={formData.name}
                        onChange={(e) => setFormData({...formData, name: e.target.value})}
                        className="w-full bg-sports-dark border border-gray-700 text-white rounded px-4 py-3 focus:border-sports-lime outline-none transition-all" 
                        placeholder="Nombre completo" 
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-sports-blue uppercase mb-2">Email</label>
                      <input 
                        type="email" 
                        value={formData.email}
                        onChange={(e) => setFormData({...formData, email: e.target.value})}
                        className="w-full bg-sports-dark border border-gray-700 text-white rounded px-4 py-3 focus:border-sports-lime outline-none transition-all" 
                        placeholder="email@club.com" 
                      />
                    </div>
                    <div>
                      <div className="flex justify-between items-end mb-2">
                        <label className="block text-xs font-bold text-sports-blue uppercase">Mensaje</label>
                        {/* Inline AI Hint */}
                        <button 
                          type="button"
                          onClick={handleConsultClick}
                          className="text-[10px] text-sports-lime hover:text-white flex items-center gap-1 transition-colors uppercase font-bold tracking-wider"
                        >
                          <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
                          ¿Preguntar a la IA?
                        </button>
                      </div>
                      <textarea 
                        rows={4} 
                        value={formData.message}
                        onChange={(e) => {
                          setFormData({...formData, message: e.target.value});
                          if(aiError) setAiError('');
                        }}
                        className={`w-full bg-sports-dark border ${aiError ? 'border-red-500' : 'border-gray-700'} text-white rounded px-4 py-3 focus:border-sports-lime outline-none transition-all resize-none`}
                        placeholder="Escribe aquí tu duda o detalles del torneo..."
                      ></textarea>
                      {aiError && <p className="text-red-400 text-xs mt-1">{aiError}</p>}
                    </div>
                    
                    <div className="flex flex-col sm:flex-row gap-4 pt-2">
                       <button 
                        type="button"
                        onClick={handleConsultClick}
                        className="flex-1 bg-sports-dark border border-sports-blue text-sports-blue hover:bg-sports-blue hover:text-white font-bold py-4 rounded transition-colors uppercase tracking-wide text-sm flex items-center justify-center gap-2 group"
                       >
                         <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
                         Consultar con IA
                       </button>
                       <button 
                        type="submit"
                        disabled={isSubmitting}
                        className="flex-1 bg-sports-blue text-white font-bold py-4 rounded hover:bg-blue-600 transition-colors uppercase tracking-wide text-sm disabled:opacity-50"
                       >
                         {isSubmitting ? 'Enviando...' : 'Enviar Email'}
                       </button>
                    </div>
                    {submitStatus === 'error' && (
                      <p className="text-red-400 text-xs text-center">Hubo un error al enviar. Por favor intenta por WhatsApp.</p>
                    )}
                  </form>
                )}
              </div>
           </div>
        </div>
      </div>
    </section>
  );
};