import { AIRTABLE_API_KEY, AIRTABLE_BASE_ID } from "../config/validateEnv";
import Airtable from 'airtable';

// Inicialización de AirTable
export const base = new Airtable({ apiKey: AIRTABLE_API_KEY }).base(AIRTABLE_BASE_ID);