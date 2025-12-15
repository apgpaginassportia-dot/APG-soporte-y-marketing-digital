
// Shim process for TypeScript compatibility
declare var process: any;

// Configuración de Airtable leyendo desde variables de entorno
const AIRTABLE_PAT = process.env.AIRTABLE_PAT;
const BASE_ID = process.env.AIRTABLE_BASE_ID;
const TABLE_ID = process.env.AIRTABLE_TABLE_ID;

export interface AirtableContactData {
  Nombre: string;
  Email: string;
  Teléfono: string;
  Mensaje?: string; 
  Asunto?: string;
  Detalles?: string;
}

export const createContact = async (data: AirtableContactData) => {
  // Verificación de seguridad detallada para depuración
  if (!AIRTABLE_PAT || !BASE_ID || !TABLE_ID) {
    console.error("Error de Credenciales Airtable:", {
      PAT_Existe: !!AIRTABLE_PAT,
      BaseID_Existe: !!BASE_ID,
      TableID_Existe: !!TABLE_ID
    });
    
    // Si estamos en desarrollo (localhost), avisar del .env
    if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
       throw new Error("Faltan las claves en el archivo .env. Revisa la consola (F12) para ver cuál falta.");
    }
    
    throw new Error("Error de configuración del sistema. Contacta por WhatsApp.");
  }

  const url = `https://api.airtable.com/v0/${BASE_ID}/${TABLE_ID}`;
  
  // Limpiamos campos undefined para no enviarlos
  const fields: Record<string, any> = {
    "Nombre": data.Nombre,
    "Email": data.Email,
    "Teléfono": data.Teléfono
  };

  if (data.Mensaje) fields["Mensaje"] = data.Mensaje;
  if (data.Asunto) fields["Asunto"] = data.Asunto;
  if (data.Detalles) fields["Detalles"] = data.Detalles;

  const body = {
    records: [
      {
        fields: fields
      }
    ],
    typecast: true // Permite convertir valores si es necesario
  };

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${AIRTABLE_PAT}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body)
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error("Airtable API Error Full:", JSON.stringify(errorData));
      const msg = errorData.error?.message || errorData.error || 'Error desconocido';
      
      if (msg.includes('UNKNOWN_FIELD_NAME')) {
        throw new Error(`Error: Airtable no encuentra una columna. Revisa en tu tabla: Nombre, Email, Teléfono, Asunto, Detalles, Mensaje. (${msg})`);
      }
      
      throw new Error(`Error Airtable: ${msg}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Error de conexión:", error);
    throw error;
  }
};
