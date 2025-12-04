import { useState } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { Benefits } from './components/Benefits';
import { DetailedServices } from './components/DetailedServices';
import { SchoolServices } from './components/SchoolServices';
import { TeamServices } from './components/TeamServices';
import { Services } from './components/Services';
import { CustomBuilder } from './components/CustomBuilder';
import { AutomationGrid } from './components/AutomationGrid';
import { MidCTA } from './components/MidCTA';
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
        <Hero />             {/* 1. IMPACTO: Propuesta de valor clara */}
        <Benefits />         {/* 2. PROBLEMA: Puntos de dolor del cliente */}
        <MidCTA />           {/* 3. AUTORIDAD: Humanización y solución experta (Alicia) */}
        <DetailedServices /> {/* 4. SOLUCIÓN: Servicios principales explicados */}
        <AutomationGrid />   {/* 5. TECNOLOGÍA: Detalle de módulos (modernidad) */}
        <Services />         {/* 6. PRECIO: Planes estructurados (Torneos) */}
        <TeamServices />     {/* 7. NICHO 1: Clubes de Fútbol Base (NUEVO) */}
        <SchoolServices />   {/* 8. NICHO 2: Sección específica Colegios */}
        <CustomBuilder />    {/* 9. INTERACCIÓN: Configurador */}
        <Contact onConsultAI={handleConsultAI} />          {/* 10. CIERRE: Contacto */}
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