import React from 'react';
import { motion } from 'framer-motion';
import { 
  FileCheck, 
  Bus, 
  BedDouble, 
  Bot, 
  BarChart3, 
  Share2, 
  ShieldCheck, 
  Zap,
  Database,
  FileText,
  PieChart
} from 'lucide-react';

const details = [
  {
    icon: <FileCheck className="w-6 h-6 text-blue-600" />,
    title: "Inscripciones & Validación Documental",
    description: "Olvídate de perseguir DNIs caducados o autorizaciones paternas ilegibles. Nuestra IA procesa los documentos subidos, verifica su validez legal y extrae los datos automáticamente a tu base de datos.",
    benefit: "Ahorra un 90% de tiempo administrativo."
  },
  {
    icon: <Bus className="w-6 h-6 text-indigo-600" />,
    title: "Logística de Transporte Inteligente",
    description: "Algoritmos que agrupan equipos por ubicación y horarios para optimizar la ocupación de los autocares. Generamos hojas de ruta digitales para los conductores y controlamos los tiempos de llegada.",
    benefit: "Reduce costes de flota y evita retrasos."
  },
  {
    icon: <BedDouble className="w-6 h-6 text-teal-600" />,
    title: "Rooming Lists Automatizadas",
    description: "Cuadrar habitaciones por sexo, categoría y equipo es un rompecabezas matemático. Nuestro sistema lo resuelve en segundos, generando informes compatibles con el software de cualquier cadena hotelera.",
    benefit: "Elimina errores de asignación (overbooking)."
  },
  {
    icon: <Share2 className="w-6 h-6 text-pink-600" />,
    title: "Marketing y RRSS Deportivo",
    description: "Maximizamos el impacto de tu material visual. Automatizamos la publicación de las fotos y vídeos que nos facilites, mientras nuestra IA genera copys creativos y atractivos para captar la atención de tu audiencia.",
    benefit: "Engagement constante sin esfuerzo."
  },
  {
    icon: <Bot className="w-6 h-6 text-purple-600" />,
    title: "Asistente Virtual 24/7 (Chatbot)",
    description: "Un agente de IA entrenado con las reglas de tu torneo. Responde dudas sobre horarios, ubicaciones, menús o reglamentos al instante por WhatsApp o Web, liberando a tu staff de llamadas repetitivas.",
    benefit: "Atención inmediata sin personal extra."
  },
  {
    icon: <BarChart3 className="w-6 h-6 text-orange-600" />,
    title: "Dashboard de Control y Datos",
    description: "Toma decisiones basadas en datos reales. Visualiza en tiempo real el estado de las inscripciones, pagos pendientes, ocupación hotelera y llegadas de equipos desde un panel de control centralizado.",
    benefit: "Control total de la operación en una pantalla."
  }
];

const techStack = [
  { name: "Make (Integromat)", icon: <Zap className="w-5 h-5" />, desc: "Orquestación de flujos" },
  { name: "ChatGPT / OpenAI", icon: <Bot className="w-5 h-5" />, desc: "Inteligencia Generativa" },
  { name: "Airtable", icon: <Database className="w-5 h-5" />, desc: "Base de datos Relacional" },
  { name: "Tally Forms", icon: <FileText className="w-5 h-5" />, desc: "Captura de datos" },
  { name: "Metricool", icon: <PieChart className="w-5 h-5" />, desc: "Analítica Social" },
];

const ServiceDetails: React.FC = () => {
  return (
    <section id="solutions" className="py-24 bg-slate-50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center justify-center p-2 bg-white rounded-full shadow-sm border border-slate-100 mb-4">
            <ShieldCheck className="w-4 h-4 text-primary-600 mr-2" />
            <span className="text-xs font-bold text-slate-600 tracking-wide uppercase">Excelencia Operativa</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6">
            Tecnología que transforma la gestión deportiva
          </h2>
          <p className="text-lg text-slate-600 leading-relaxed">
            No solo digitalizamos datos; automatizamos decisiones. 
            Nuestro ecosistema de servicios cubre el ciclo de vida completo de tu evento, 
            desde la primera inscripción hasta la ceremonia de clausura.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
          {details.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-2xl p-8 shadow-sm border border-slate-100 hover:shadow-lg hover:border-primary-100 transition-all duration-300 group"
            >
              <div className="w-12 h-12 bg-slate-50 rounded-xl flex items-center justify-center mb-6 group-hover:bg-primary-50 transition-colors">
                {item.icon}
              </div>
              
              <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-primary-700 transition-colors">
                {item.title}
              </h3>
              
              <p className="text-slate-600 mb-5 leading-relaxed text-sm">
                {item.description}
              </p>
              
              <div className="flex items-center pt-5 border-t border-slate-50">
                <Zap className="w-4 h-4 text-amber-500 mr-2" />
                <span className="text-xs font-bold text-slate-700 uppercase tracking-wide">
                  {item.benefit}
                </span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Tech Stack Section */}
        <div className="bg-white rounded-3xl p-8 md:p-12 border border-slate-100 shadow-sm text-center">
          <h3 className="text-xl font-bold text-slate-900 mb-8">Potenciado por las mejores herramientas No-Code & IA</h3>
          <div className="flex flex-wrap justify-center gap-6 md:gap-12">
            {techStack.map((tech, idx) => (
              <div key={idx} className="flex flex-col items-center group">
                <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mb-3 group-hover:bg-primary-50 group-hover:scale-110 transition-all text-slate-600 group-hover:text-primary-600">
                  {tech.icon}
                </div>
                <span className="font-bold text-slate-800 text-sm">{tech.name}</span>
                <span className="text-xs text-slate-500">{tech.desc}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServiceDetails;