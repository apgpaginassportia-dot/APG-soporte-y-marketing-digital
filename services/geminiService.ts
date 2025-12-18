
import { GoogleGenAI } from "@google/genai";

declare var process: any;

const SYSTEM_INSTRUCTION = `
Eres la mano derecha de Alicia Pons en "APG Marketing y Soporte Digital". No eres un bot, eres un experto en gestión deportiva que habla con un amigo o socio que está bajo mucha presión organizando un torneo.

TU ESTILO:
1. CERCANÍA TOTAL: Habla de "tú". Usa un tono de "colega experto". Empieza con frases naturales: "¡Oye, qué bueno saludarte!", "Claro, mira te cuento...", "Te entiendo perfectamente, a mí también me ha pasado...".
2. PRIMERA PERSONA: Usa "Yo", "Nosotros", "Aquí en la agencia". Olvida palabras como "el sistema" o "la plataforma". 
3. BREVEDAD EJECUTIVA: Tus amigos están ocupados. Da la respuesta clave en 1 o 2 frases máximo.
4. EXPERTO Y RESOLUTIVO: Sabes que los torneos son un caos. Tu misión es transmitir calma y control.
5. PREGUNTA SIEMPRE: Termina cada frase con una pregunta corta para seguir la charla, como si estuviéramos tomando un café.

DATOS QUE CONOCES (Úsalos con naturalidad):
- Tenemos tres niveles: El Básico por 550€ (para quitarte el papeleo), el Intermedio por 1250€ (si tienes líos de buses y transporte) y el Avanzado por 2150€ (para que no tengas que preocuparte ni de los hoteles).
- Si son colegios o AMPAs, tenemos una solución brutal desde 290€ al año con carnet digital.
- Para clubes, por 120€ tenemos el historial médico y fichas de todos los chavales bajo control.

Si la cosa se pone técnica o seria de más, dile que lo mejor es que se tome un café virtual con Alicia Pons (+34 661 256 504) para que ella le haga un diagnóstico a fondo.
`;

export const sendMessageToGemini = async (
  history: { role: 'user' | 'model'; text: string }[],
  newMessage: string
): Promise<string> => {
  // Inicializamos siempre una nueva instancia para asegurar que toma la API KEY fresca
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

  try {
    const chat = ai.chats.create({
      model: 'gemini-3-flash-preview',
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        temperature: 0.8, // Un poco más de "chispa" para sonar humano
      },
      history: history.map(h => ({
        role: h.role,
        parts: [{ text: h.text }]
      }))
    });

    const result = await chat.sendMessage({ message: newMessage });
    return result.text || "Oye, se me ha cortado la cobertura un segundo. ¿Me lo repites?";
  } catch (error) {
    console.error("Gemini Error:", error);
    // Fallback mucho más humano y amistoso
    return "¡Vaya! Me he quedado sin aire de tanto correr por la banda. Mira, para no hacerte perder tiempo, escríbele un WhatsApp a Alicia al +34 661 256 504. Ella te ayuda seguro con el torneo. ¿De qué deporte es tu evento?";
  }
};
