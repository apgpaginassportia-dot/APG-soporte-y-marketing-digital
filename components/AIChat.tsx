import React, { useState, useRef, useEffect } from 'react';
import { sendMessageToGemini } from '../services/geminiService';

interface Message {
  role: 'user' | 'model';
  text: string;
}

export const AIChat: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { role: 'model', text: '¡Hola! Soy el asistente de APG. Estoy aquí para ayudarte a que tu próximo torneo de fútbol sea impecable. ¿En qué área tienes más lío: inscripciones, autobuses o alojamiento?' }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) scrollToBottom();
  }, [messages, isOpen]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMsg: Message = { role: 'user', text: input };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);

    const responseText = await sendMessageToGemini(messages.concat(userMsg), userMsg.text);
    
    setMessages(prev => [...prev, { role: 'model', text: responseText }]);
    setIsLoading(false);
  };

  return (
    <div className="fixed bottom-6 right-6 z-[100] flex flex-col items-end">
      {/* Ventana de Chat */}
      {isOpen && (
        <div className="mb-4 w-80 sm:w-96 bg-white rounded-2xl shadow-2xl border border-sports-border overflow-hidden flex flex-col animate-fade-in transition-all" style={{ maxHeight: '500px', height: '70vh' }}>
          {/* Header */}
          <div className="bg-sports-primary p-4 flex justify-between items-center text-white">
             <div className="flex items-center gap-2">
               <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
               <span className="font-bold font-display uppercase tracking-wide text-xs">Soporte APG</span>
             </div>
             <button onClick={() => setIsOpen(false)} className="hover:opacity-70">
               <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
             </button>
          </div>

          {/* Mensajes */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50 custom-scrollbar">
            {messages.map((msg, idx) => (
              <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[85%] rounded-2xl px-4 py-3 text-sm font-body leading-relaxed ${
                  msg.role === 'user' 
                    ? 'bg-sports-primary text-white rounded-tr-none' 
                    : 'bg-white text-sports-dark border border-sports-border rounded-tl-none'
                }`}>
                  {msg.text}
                </div>
              </div>
            ))}
            {isLoading && (
               <div className="flex justify-start">
                 <div className="bg-white border border-sports-border rounded-full px-4 py-2 text-[10px] text-sports-primary animate-pulse font-bold tracking-widest italic">Pensando...</div>
               </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="p-3 bg-white border-t border-sports-border">
            <div className="flex gap-2">
              <input 
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Escribe aquí tu consulta..."
                className="flex-1 bg-slate-50 border border-sports-border rounded-xl text-sports-dark px-4 py-3 text-sm focus:outline-none focus:border-sports-primary transition-all placeholder:text-sports-muted"
              />
              <button 
                onClick={handleSend}
                disabled={isLoading}
                className="bg-sports-primary text-white rounded-xl p-3 hover:bg-sports-dark transition-all disabled:opacity-50 shadow-md shadow-blue-100"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" /></svg>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Botón Flotante */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`group flex items-center gap-3 p-4 rounded-full shadow-lg transition-all transform hover:scale-105 active:scale-95 ${isOpen ? 'bg-white text-sports-dark border border-sports-border rotate-90' : 'bg-sports-primary text-white'}`}
      >
        {isOpen ? (
           <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
        ) : (
           <>
            <span className="hidden sm:block font-bold font-display uppercase tracking-widest text-xs ml-2">¿Necesitas ayuda?</span>
            <div className="relative">
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" /></svg>
              <span className="absolute -top-1 -right-1 flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-white"></span>
              </span>
            </div>
           </>
        )}
      </button>
    </div>
  );
};