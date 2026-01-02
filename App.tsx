
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { Benefits } from './components/Benefits';
import { Workflow } from './components/Workflow';
import { DetailedServices } from './components/DetailedServices';
import { Services } from './components/Services';
import { TeamServices } from './components/TeamServices';
import { SchoolServices } from './components/SchoolServices';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';
import { ScrollToTop } from './components/ScrollToTop';

function App() {
  return (
    <div className="min-h-screen bg-sports-bg text-slate-200 overflow-x-hidden selection:bg-sports-primary selection:text-white">
      <Header />
      <main>
        <Hero />
        <Benefits />
        <DetailedServices />
        <Workflow />
        <Services />
        <SchoolServices />
        <TeamServices />
        <Contact />
      </main>
      <Footer />
      <ScrollToTop />
    </div>
  );
}

export default App;
