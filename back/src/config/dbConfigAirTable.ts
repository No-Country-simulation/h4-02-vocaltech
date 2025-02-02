import { base } from "../utils/repositoryAirTable"; 

// Función para obtener registros
async function getRecords(table: string) {
  try {
    const records = await base(table)
      .select()
      .all();

    return records.map((record) => ({
      id: record.id,
      fields: record.fields,
    }));
  } catch (error) {
    console.error(`Error retrieving records from table ${table}:`, error);
    throw error;
  }
}

export default getRecords;

