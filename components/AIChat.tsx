import React, { useState, useRef, useEffect } from 'react';
import { sendMessageToGemini } from '../services/geminiService';

interface Message {
  role: 'user' | 'model';
  text: string;
}

interface AIChatProps {
  isOpen: boolean;
  onToggle: () => void;
  externalMessage: string | null;
  onMessageHandled: () => void;
}

export const AIChat: React.FC<AIChatProps> = ({ isOpen, onToggle, externalMessage, onMessageHandled }) => {
  const [messages, setMessages] = useState<Message[]>([
    { role: 'model', text: 'Hola 👋 Soy el asistente táctico de APG. ¿Cómo puedo ayudarte a organizar tu torneo?' }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isOpen]);

  // Handle external messages (e.g. from Contact form)
  useEffect(() => {
    if (externalMessage) {
      handleSend(externalMessage);
      onMessageHandled();
    }
  }, [externalMessage]);

  const handleSend = async (textOverride?: string) => {
    const textToSend = textOverride || input;
    if (!textToSend.trim() || isLoading) return;

    const userMsg: Message = { role: 'user', text: textToSend };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);

    const responseText = await sendMessageToGemini(messages.concat(userMsg), userMsg.text);
    
    setMessages(prev => [...prev, { role: 'model', text: responseText }]);
    setIsLoading(false);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end font-sans">
      {/* Chat Window */}
      {isOpen && (
        <div className="mb-4 w-80 sm:w-96 bg-sports-surface rounded-lg shadow-2xl border border-white/10 overflow-hidden flex flex-col" style={{ maxHeight: '500px', height: '70vh' }}>
          {/* Header */}
          <div className="bg-sports-navy p-4 flex justify-between items-center border-b border-white/5">
             <div className="flex items-center gap-2">
               <div className="w-2 h-2 bg-sports-lime rounded-full animate-pulse"></div>
               <span className="text-white font-bold font-display uppercase tracking-wide">Soporte IA</span>
             </div>
             <button onClick={onToggle} className="text-gray-400 hover:text-white">
               <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
             </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-sports-dark">
            {messages.map((msg, idx) => (
              <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[85%] rounded px-4 py-2 text-sm ${
                  msg.role === 'user' 
                    ? 'bg-sports-blue text-white' 
                    : 'bg-sports-surface text-gray-200 border border-white/5'
                }`}>
                  {msg.text}
                </div>
              </div>
            ))}
            {isLoading && (
               <div className="flex justify-start">
                 <div className="bg-sports-surface rounded px-4 py-2 text-xs text-gray-400 animate-pulse border border-white/5">Escribiendo...</div>
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
                placeholder="Pregunta sobre servicios..."
                className="flex-1 bg-sports-dark border border-white/10 rounded text-white px-4 py-2 text-sm focus:outline-none focus:border-sports-lime transition-colors"
              />
              <button 
                onClick={() => handleSend()}
                disabled={isLoading}
                className="bg-sports-blue text-white rounded p-2 hover:bg-blue-600 disabled:opacity-50 transition-colors"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" /></svg>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Toggle Button */}
      <button
        onClick={onToggle}
        className="group flex items-center gap-3 bg-sports-blue hover:bg-white hover:text-sports-navy text-white p-4 rounded-full shadow-[0_0_20px_rgba(26,115,232,0.5)] transition-all transform hover:scale-105"
      >
        <span className={`${isOpen ? 'hidden' : 'hidden sm:block'} font-bold font-display uppercase tracking-wide`}>Asistente</span>
        {isOpen ? (
           <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
        ) : (
           <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" /></svg>
        )}
      </button>
    </div>
  );
};