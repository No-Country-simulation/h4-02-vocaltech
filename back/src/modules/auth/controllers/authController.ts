import Airtable from 'airtable';
import { validateEnv } from '../../../config/validateEnv';

const { apiKey, baseId } = validateEnv();
const base = new Airtable({ apiKey }).base(baseId);
const usersTable = base('Users'); // Nombre de la tabla en Airtable

// Función para buscar o crear un usuario en Airtable
export async function findOrCreateUser(oauthId: string, profile: any): Promise<any> {
  try {
    // Buscar el usuario en Airtable
    const records = await usersTable
      .select({
        filterByFormula: `{oauthId} = '${oauthId}'`,
        maxRecords: 1,
      })
      .firstPage();

    // Si el usuario existe, devolverlo
    if (records.length > 0) {
      return records[0].fields;
    }

    // Si no existe, crear un nuevo registro
    const newUser = await usersTable.create({
      oauthId,
      name: profile.displayName || 'Anonymous',
      email: profile.emails?.[0]?.value || '',
      avatar: profile.photos?.[0]?.value || '',
    });

    return newUser.fields;
  } catch (error) {
    console.error('Error en findOrCreateUser:', error);
    throw error;
  }
}
