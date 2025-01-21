import { base } from "../utils/repositoryAirTable";

// Definición del tipo genérico para un registro de Airtable
interface AirtableRecord<T = any> {
  id: string;
  fields: T;
}

// Función genérica para obtener registros de una tabla de Airtable
async function getRecords<T>(table: string): Promise<AirtableRecord<T>[]> {
  try {
    const records = await base(table)
      .select()
      .all();

    return records.map((record) => ({
      id: record.id,
      fields: record.fields as T,
    }));
  } catch (error) {
    console.error(`Error retrieving records from table ${table}:`, error);
    throw error;
  }
}

export default getRecords;


