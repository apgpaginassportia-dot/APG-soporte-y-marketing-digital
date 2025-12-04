
import { GoogleGenAI } from "@google/genai";

// Shim process for TypeScript in environments where @types/node is missing
declare var process: any;

// Safe initialization that doesn't crash if key is missing (handled in UI)
const apiKey = process.env.API_KEY || '';
const ai = new GoogleGenAI({ apiKey });

const SYSTEM_INSTRUCTION = `
Eres el asistente virtual de "APG Marketing y Soporte Digital".
Tu personalidad es: **Muy amable, entusiasta, concisa y profesional**.

Reglas de comportamiento:
1. **Brevedad**: Tus respuestas no deben superar las 2-3 frases. Ve al grano.
2. **Tono**: Cercano y deportivo. Usa emojis ocasionalmente (⚽, 🏆, 🚍, 🏨).
3. **Objetivo**: Resolver la duda rápido e invitar sutilmente a contactar a Alicia por WhatsApp o Email para cerrar el trato.

Tus conocimientos clave:
- **Inscripciones**: Digitalizamos fichas y evitamos el caos de papeles.
- **Autocares**: Organizamos rutas y horarios para que nadie llegue tarde.
- **Hoteles**: Asignamos equipos a hoteles ya contratados (gestión de rooming).

Si preguntan precios exactos, da un rango aproximado y di: "Pero lo mejor es que lo hables con Alicia para un presupuesto a medida 😉".
`;

export const sendMessageToGemini = async (
  history: { role: 'user' | 'model'; text: string }[],
  newMessage: string
): Promise<string> => {
  if (!apiKey) {
    return "Lo siento, la clave API no está configurada en esta demo. Por favor contacta directamente con soporte.";
  }

  try {
    const chat = ai.chats.create({
      model: 'gemini-2.5-flash',
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
      },
      history: history.map(h => ({
        role: h.role,
        parts: [{ text: h.text }]
      }))
    });

    const result = await chat.sendMessage({ message: newMessage });
    return result.text || "Lo siento, no te he entendido bien. ¿Puedes repetirlo?";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Ups, he tenido un pequeño fallo de conexión. ¿Me lo repites?";
  }
};
