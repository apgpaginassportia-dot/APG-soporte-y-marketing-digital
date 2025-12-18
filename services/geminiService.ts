
import { GoogleGenAI } from "@google/genai";

declare var process: any;

const SYSTEM_INSTRUCTION = `
Actúa como el Asistente Estratégico de "APG Marketing y Soporte Digital". 
Tu propósito es ayudar a organizadores de torneos de forma rápida, amable y profesional.

REGLAS DE ORO DE LA CONVERSACIÓN:
1. BREVEDAD ABSOLUTA: El sistema debe dar respuestas muy cortas y directas (máximo 2 frases). Valora el tiempo del cliente.
2. AMABILIDAD Y CALIDEZ: Aunque sea breve, el sistema debe sonar muy acogedor. Usa saludos cordiales y expresiones de cortesía ("¡Un placer!", "Excelente elección", "El sistema está encantado de asistirle").
3. TERCERA PERSONA SIEMPRE: Nunca uses "yo" o "nosotros". Refiérete a la agencia o a la tecnología como "el sistema", "la plataforma APG" o "la solución".
4. ENFOQUE TÁCTICO: Si preguntan por precios o planes, da el dato exacto sin rodeos.
5. CIERRE CONECTIVO: Termina con una pregunta breve para mantener el flujo ("¿Le gustaría profundizar en este plan?" o "¿Cuántos equipos gestionará?").

BASE DE DATOS RÁPIDA:
- Torneos: Plan Básico (550€), Intermedio (1250€ - Logística), Avanzado (2150€ - 360°).
- AMPAs: Pack Digital desde 290€/año.
- Clubes: Ecosistema Jugador (120€/temp).
- Valor: Ahorro de 200h y error 0%.

Si la duda requiere análisis profundo, el sistema sugiere contacto directo con Alicia Pons (+34 661 256 504).
`;

export const sendMessageToGemini = async (
  history: { role: 'user' | 'model'; text: string }[],
  newMessage: string
): Promise<string> => {
  const apiKey = process.env.API_KEY;

  if (!apiKey) {
    return "¡Hola! Es un gusto saludarle. La plataforma APG está lista para optimizar su torneo. Para una atención inmediata, la dirección atiende en el +34 661 256 504 📱";
  }

  const ai = new GoogleGenAI({ apiKey });

  try {
    const chat = ai.chats.create({
      model: 'gemini-3-flash-preview',
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        temperature: 0.5, // Equilibrio entre creatividad y rigor.
      },
      history: history.map(h => ({
        role: h.role,
        parts: [{ text: h.text }]
      }))
    });

    const response = await chat.sendMessage({ message: newMessage });
    return response.text || "El sistema ha tenido un pequeño retraso. ¿Podría repetir su consulta para que la plataforma le asista de nuevo?";
  } catch (error) {
    console.error("Gemini Error:", error);
    return "¡Vaya! El sistema ha detectado una pausa técnica. Alicia Pons puede resolver su duda personalmente en el +34 661 256 504.";
  }
};
