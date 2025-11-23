import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { Benefits } from './components/Benefits';
import { VisualServices } from './components/VisualServices';
import { Services } from './components/Services';
import { CustomBuilder } from './components/CustomBuilder';
import { MidCTA } from './components/MidCTA';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';
import { AIChat } from './components/AIChat';

function App() {
  return (
    <div className="min-h-screen bg-sports-navy text-sports-text overflow-x-hidden selection:bg-sports-blue selection:text-white">
      <Header />
      <main>
        <Hero />
        <Benefits />      {/* 1. Los 3 grandes problemas */}
        <VisualServices /> {/* 2. Servicios que solucionan (Solutions) */}
        <Services />      {/* 3. Planes de servicio (Fixed Plans) */}
        <CustomBuilder /> {/* 4. Carrito dinámico (Custom Plan) */}
        <MidCTA />        {/* 5. Authority Section (Soy Alicia) */}
        <Contact />       {/* 6. Final Capture */}
      </main>
      <Footer />
      <AIChat />
    </div>
  );
}

export default App;