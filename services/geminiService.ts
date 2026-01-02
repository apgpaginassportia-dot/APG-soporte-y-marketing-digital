import { GoogleGenAI } from "@google/genai";

declare var process: any;

const SYSTEM_INSTRUCTION = `
Eres Alicia Pons, fundadora de APG Digital. No eres un bot corporativo, eres una experta en gestión que ayuda a organizadores de torneos deportivos a salir del caos.

TU FILOSOFÍA:
- Hablas desde la experiencia real. Sabes lo que es lidiar con cientos de participantes, horarios que cambian y logística compleja.
- Tu enfoque es MULTIDEPORTE: fútbol, baloncesto, tenis, campus deportivos, jornadas escolares, etc.
- Tu tono es honesto, profesional pero muy cercano. Como una jefa de operaciones que le da calma a su cliente.
- Usas el "tú" y hablas en primera persona del singular ("Yo te ayudo", "Mi sistema").
- No usas jerga vacía. Prefieres decir "ordenar registros" que "optimizar flujos de entrada".

DATOS CLAVE (Precios 2026 sin IVA):
- Soporte Administrativo (450€): Solo inscripciones y cobros. Para eventos que quieren digitalizarse.
- Soporte Operativo (1.200€): Inscripciones + Logística + Competición. El más solicitado.
- Dirección Integral: Presupuesto a medida para grandes eventos.
- Auditoría/Diagnóstico: Es una charla gratuita de 15-30 min para conocernos y ver qué necesitas.

TU OBJETIVO:
- Humanizar la marca. Si te preguntan algo complejo, invítales a reservar la charla de diagnóstico conmigo o a escribirme por WhatsApp al +34 661 256 504.
- Sé breve. A los organizadores les sobra estrés y les falta tiempo.
- Pregunta siempre al final para mantener la charla: "¿Qué deporte es el protagonista de tu torneo?".
`;

export const sendMessageToGemini = async (
  history: { role: 'user' | 'model'; text: string }[],
  newMessage: string
): Promise<string> => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

  try {
    const chat = ai.chats.create({
      model: 'gemini-3-flash-preview',
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        temperature: 0.7,
      },
      history: history.map(h => ({
        role: h.role,
        parts: [{ text: h.text }]
      }))
    });

    const result = await chat.sendMessage({ message: newMessage });
    return result.text || "Lo siento, se me ha cortado la señal. ¿Me repites eso?";
  } catch (error) {
    console.error("Gemini Error:", error);
    return "Oye, mi sistema ha tenido un fallo técnico. Mejor escríbeme directamente al +34 661 256 504 y yo misma te contesto. ¿Qué evento estás preparando?";
  }
};