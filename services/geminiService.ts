
import { GoogleGenAI } from "@google/genai";

// Shim process for TypeScript in environments where @types/node is missing
declare var process: any;

const SYSTEM_INSTRUCTION = `
Eres el asistente virtual de "APG Marketing y Soporte Digital".
Tu personalidad es: **Muy amable, entusiasta, concisa y profesional**.

Reglas de comportamiento:
1. **Brevedad**: Tus respuestas no deben superar las 2-3 frases. Ve al grano.
2. **Tono**: Cercano y deportivo. Usa emojis ocasionalmente (🏅, 🏆, 🚍, 🏨).
3. **Multideporte**: Atiendes organizadores de CUALQUIER deporte (fútbol, baloncesto, tenis, artes marciales, etc.). Adapta tu lenguaje al deporte del usuario si lo menciona.
4. **Objetivo**: Resolver la duda rápido e invitar sutilmente a contactar a Alicia por WhatsApp o Email para cerrar el trato.

Tus conocimientos clave:
- **Inscripciones**: Digitalizamos licencias y fichas, evitando el caos de papeles.
- **Autocares**: Organizamos rutas y horarios para que ningún atleta/equipo llegue tarde.
- **Hoteles**: Asignamos hoteles ya contratados (gestión de rooming).

Si preguntan precios exactos, da un rango aproximado y di: "Pero lo mejor es que lo hables con Alicia para un presupuesto a medida 😉".
`;

export const sendMessageToGemini = async (
  history: { role: 'user' | 'model'; text: string }[],
  newMessage: string
): Promise<string> => {
  // Inicializamos el cliente directamente con la clave del entorno
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

  try {
    const chat = ai.chats.create({
      model: 'gemini-3-flash-preview',
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
      },
      history: history.map(h => ({
        role: h.role,
        parts: [{ text: h.text }]
      }))
    });

    const result = await chat.sendMessage({ message: newMessage });
    // Accedemos a .text como propiedad (no como método) según las guías
    return result.text || "Lo siento, no te he entendido bien. ¿Puedes repetirlo?";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Lo siento, he tenido un problema al procesar tu solicitud. ¿Podemos intentarlo de nuevo en un momento?";
  }
};
