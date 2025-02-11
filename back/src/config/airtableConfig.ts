// import Airtable from "airtable";

// const base = new Airtable({ apiKey: process.env.AIRTABLE_API_KEY }).base(`${process.env.AIRTABLE_BASE_ID}`);

// export { base };



import { config } from "../config/validateEnv";
import Airtable from 'airtable';

// Inicialización de AirTable
export const base = new Airtable({ apiKey: config.AIRTABLE_API_KEY }).base(config.AIRTABLE_BASE_ID);