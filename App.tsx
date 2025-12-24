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
import { ScrollToTop } from './components/ScrollToTop';

function App() {
  return (
    <div className="min-h-screen bg-sports-bg text-sports-dark overflow-x-hidden selection:bg-sports-primary selection:text-white">
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
        <Contact />
      </main>
      <Footer />
      <ScrollToTop />
    </div>
  );
}

export default App;