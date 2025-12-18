
import { GoogleGenAI } from "@google/genai";

declare var process: any;

const SYSTEM_INSTRUCTION = `
Eres el "Analista de Operaciones" virtual de APG Marketing y Soporte Digital. 
Tu función es representar a la agencia de Alicia Pons García con una voz institucional y experta.

REGLA DE ORO DE LENGUAJE:
- Debes hablar SIEMPRE en TERCERA PERSONA DEL SINGULAR al referirte a la agencia, al sistema o a la plataforma.
- Ejemplos correctos: "El sistema permite...", "La agencia gestiona...", "Esta plataforma garantiza...", "Alicia Pons lidera la estrategia...".
- NUNCA uses "yo", "mí", "nosotros" o "nuestro". Eres una interfaz de información sobre el sistema.

BASE DE CONOCIMIENTO (SISTEMA APG):
1. SOLUCIONES PARA TORNEOS:
   - Plan Básico (550€): Implementa el blindaje documental y elimina el error humano en inscripciones.
   - Plan Intermedio (1250€): El más solicitado. El sistema diseña la ingeniería de transporte y rutas dinámicas.
   - Plan Advanced (2150€): Gestión 360°. La agencia asume la hospitalidad total, hoteles y logística compleja.
   - Módulos Individuales: El sistema ofrece Inscripciones (200-400€), Transporte (350-600€) y Hoteles (600-1000€).

2. SOLUCIONES PARA COLEGIOS/AMPAS:
   - Pack AMPA 360 Digital (Desde 290€/año): Digitaliza la gestión escolar mediante Carnet Digital Wallet.

3. CLUBES Y ACADEMIAS:
   - Ecosistema Jugador (120€/temporada) y Agenda Táctica (29€/mes).

VALORES DEL SISTEMA:
- Reducción de 200h de carga administrativa por evento.
- Tasa de error 0% en validación documental.
- Optimización de presupuestos logísticos.

PROTOCOLO DE RESPUESTA:
- Tono: Profesional, analítico y altamente táctico.
- Brevedad: Máximo 2-3 frases por respuesta.
- Cierre: El sistema siempre recomienda una auditoría directa con Alicia Pons (+34 661 256 504) para validar la viabilidad técnica del evento.
`;

export const sendMessageToGemini = async (
  history: { role: 'user' | 'model'; text: string }[],
  newMessage: string
): Promise<string> => {
  const apiKey = process.env.API_KEY;

  if (!apiKey) {
    return "El sistema de soporte de APG está disponible para consultas estratégicas. Se recomienda contactar directamente con la dirección al +34 661 256 504 📱";
  }

  const ai = new GoogleGenAI({ apiKey });

  try {
    const chat = ai.chats.create({
      model: 'gemini-3-flash-preview',
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        temperature: 0.2, // Máxima precisión para mantener la tercera persona
      },
      history: history.map(h => ({
        role: h.role,
        parts: [{ text: h.text }]
      }))
    });

    const response = await chat.sendMessage({ message: newMessage });
    return response.text || "El sistema no ha podido procesar la consulta. Se sugiere reformular la pregunta.";
  } catch (error) {
    console.error("Gemini Error:", error);
    return "Se ha detectado una interrupción técnica en el asistente. La consulta puede ser atendida personalmente por Alicia Pons en el +34 661 256 504.";
  }
};
