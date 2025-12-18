
import React, { useState, useRef, useEffect } from 'react';
import { sendMessageToGemini } from '../services/geminiService';

interface Message {
  role: 'user' | 'model';
  text: string;
}

export const AIChat: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { role: 'model', text: 'Bienvenido. El sistema de soporte de APG está activo. ¿Qué área del evento requiere optimización o qué plan despierta interés?' }
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
        <div className="mb-4 w-80 sm:w-96 bg-sports-surface rounded-2xl shadow-2xl border border-white/10 overflow-hidden flex flex-col animate-fade-in-up" style={{ maxHeight: '500px', height: '70vh' }}>
          {/* Header */}
          <div className="bg-sports-navy p-4 flex justify-between items-center border-b border-white/5">
             <div className="flex items-center gap-2">
               <div className="w-2 h-2 bg-sports-lime rounded-full animate-pulse shadow-[0_0_8px_#A3E635]"></div>
               <span className="text-white font-bold font-display uppercase tracking-wide text-sm">Interfaz de Soporte APG</span>
             </div>
             <button onClick={() => setIsOpen(false)} className="text-gray-400 hover:text-white p-1">
               <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
             </button>
          </div>

          {/* Mensajes */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-sports-dark custom-scrollbar">
            {messages.map((msg, idx) => (
              <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[85%] rounded-xl px-4 py-2.5 text-sm font-body leading-relaxed ${
                  msg.role === 'user' 
                    ? 'bg-sports-blue text-white shadow-lg shadow-sports-blue/10' 
                    : 'bg-sports-surface text-gray-200 border border-white/5'
                }`}>
                  {msg.text}
                </div>
              </div>
            ))}
            {isLoading && (
               <div className="flex justify-start">
                 <div className="bg-sports-surface rounded-full px-4 py-2 text-[10px] text-sports-lime animate-pulse border border-sports-lime/20 uppercase font-bold tracking-widest">El sistema está procesando...</div>
               </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="p-3 bg-sports-surface border-t border-white/5">
            <div className="flex gap-2">
              <input 
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Solicite información sobre el sistema..."
                className="flex-1 bg-sports-navy border border-white/10 rounded-lg text-white px-4 py-2.5 text-sm focus:outline-none focus:border-sports-lime transition-all"
              />
              <button 
                onClick={handleSend}
                disabled={isLoading}
                className="bg-sports-blue text-white rounded-lg p-2.5 hover:bg-sports-lime hover:text-sports-navy disabled:opacity-50 transition-all shadow-lg"
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
        className={`group flex items-center gap-3 p-4 rounded-full shadow-[0_0_30px_rgba(59,130,246,0.3)] transition-all transform hover:scale-110 ${isOpen ? 'bg-sports-surface text-white rotate-90' : 'bg-sports-blue text-white'}`}
      >
        {isOpen ? (
           <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
        ) : (
           <>
            <span className="hidden sm:block font-bold font-display uppercase tracking-widest text-xs ml-2">Consultar al Sistema</span>
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" /></svg>
           </>
        )}
      </button>
    </div>
  );
};
