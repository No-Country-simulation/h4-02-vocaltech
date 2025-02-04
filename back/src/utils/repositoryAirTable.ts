import { config } from "../config/validateEnv";
import Airtable from 'airtable';

// Inicialización de AirTable
export const base = new Airtable({ apiKey: config.AIRTABLE_API_KEY }).base(config.AIRTABLE_BASE_ID);