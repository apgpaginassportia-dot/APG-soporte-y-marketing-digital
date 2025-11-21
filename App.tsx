import { HashRouter } from 'react-router-dom';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import ServiceDetails from './components/ServiceDetails';
import Services from './components/Services';
import Plans from './components/Plans';
import CustomPlanBuilder from './components/CustomPlanBuilder';
import Footer from './components/Footer';

function App() {
  return (
    <HashRouter>
      <div className="min-h-screen bg-white">
        <Navbar />
        <main>
          <Hero />
          <ServiceDetails />
          <Services />
          <Plans />
          <CustomPlanBuilder />
        </main>
        <Footer />
      </div>
    </HashRouter>
  );
}

export default App;