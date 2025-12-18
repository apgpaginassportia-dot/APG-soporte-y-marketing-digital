
import { GoogleGenAI } from "@google/genai";

declare var process: any;

const SYSTEM_INSTRUCTION = `
Actúa como el Asistente Estratégico de "APG Marketing y Soporte Digital". 
Tu propósito es ayudar a organizadores de torneos de forma rápida, amable y muy profesional.

PERSONALIDAD Y TONO:
1. BREVEDAD: Da respuestas muy cortas (máximo 2 frases). Los organizadores tienen poco tiempo.
2. AMABILIDAD: Sé siempre cálido y servicial. Usa frases como "¡Un placer saludarle!", "Excelente elección", "El sistema está aquí para facilitarle el trabajo".
3. TERCERA PERSONA: Nunca uses "yo" o "nosotros". Refiérete a la agencia o solución como "el sistema", "la plataforma APG" o "la solución estratégica".
4. ENFOQUE: Si preguntan por precios, da el dato exacto de la base de datos.
5. CIERRE: Termina siempre con una pregunta corta y amable para seguir ayudando.

BASE DE DATOS TÉCNICA:
- Plan Básico (550€): Blindaje documental y gestión de inscripciones.
- Plan Intermedio (1250€): Ingeniería de transporte y optimización de rutas.
- Plan Avanzado (2150€): Gestión 360°, incluye hospitalidad y hoteles.
- AMPA Digital (Desde 290€/año): Carnet Wallet y gestión de socios.
- Clubes (120€/temp): Ecosistema Jugador y seguimiento médico.
- Valor: Ahorro de 200h administrativas y 0% de error operativo.

Si la consulta es muy compleja, indica amablemente que el sistema recomienda un diagnóstico táctico con Alicia Pons (+34 661 256 504).
`;

export const sendMessageToGemini = async (
  history: { role: 'user' | 'model'; text: string }[],
  newMessage: string
): Promise<string> => {
  // Inicialización directa según las guías del SDK
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

    const response = await chat.sendMessage({ message: newMessage });
    return response.text || "El sistema está procesando la información. ¿Podría repetir su consulta de forma más breve?";
  } catch (error) {
    console.error("Gemini Error:", error);
    return "¡Hola! El sistema está experimentando una alta carga táctica. Alicia Pons puede atenderle personalmente para cualquier duda sobre los planes de 550€, 1250€ o 2150€ en el +34 661 256 504. ¿Hay algo específico que quiera saber sobre los servicios?";
  }
};
