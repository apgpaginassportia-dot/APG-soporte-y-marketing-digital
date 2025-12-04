
import { useState } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { Benefits } from './components/Benefits';
import { Workflow } from './components/Workflow';
import { DetailedServices } from './components/DetailedServices';
import { AutomationGrid } from './components/AutomationGrid';
import { Services } from './components/Services';
import { TeamServices } from './components/TeamServices';
import { SchoolServices } from './components/SchoolServices';
import { CustomBuilder } from './components/CustomBuilder';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';
import { AIChat } from './components/AIChat';
import { ScrollToTop } from './components/ScrollToTop';

function App() {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [externalChatMessage, setExternalChatMessage] = useState<string | null>(null);

  const handleConsultAI = (message: string) => {
    setIsChatOpen(true);
    setExternalChatMessage(message);
  };

  return (
    <div className="min-h-screen bg-sports-navy text-sports-text overflow-x-hidden selection:bg-sports-blue selection:text-white">
      <Header />
      <main>
        {/* 1. ATENCIÓN & AUTORIDAD */}
        <Hero />
        
        {/* 2. PROBLEMA & AGITACIÓN */}
        <Benefits />

        {/* 3. SOLUCIÓN & GUÍA */}
        <Workflow />         {/* Cómo trabajo */}

        {/* 4. OFERTA PRINCIPAL (TORNEOS) */}
        <DetailedServices /> {/* Qué hago (General) */}
        <AutomationGrid />   {/* Tecnología específica */}
        
        {/* 6. PRECIOS Y NICHOS */}
        <Services />         {/* Planes Torneos */}
        <TeamServices />     {/* Clubes */}
        <SchoolServices />   {/* Colegios */}
        
        {/* 7. INTERACCIÓN & CIERRE */}
        <CustomBuilder />    {/* Configurador */}
        <Contact onConsultAI={handleConsultAI} />
      </main>
      <Footer />
      <AIChat 
        isOpen={isChatOpen} 
        onToggle={() => setIsChatOpen(!isChatOpen)}
        externalMessage={externalChatMessage}
        onMessageHandled={() => setExternalChatMessage(null)}
      />
      <ScrollToTop />
    </div>
  );
}

export default App;
