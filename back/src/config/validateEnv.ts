import dotenv from "dotenv";
dotenv.config();

// Función genérica para validar variables de entorno
const getEnvVar = (key: string): string => {
  const value = process.env[key];
  if (!value) {
    throw new Error(`Environment variable ${key} is not set`);
  }
  return value;
};

// VALIDACIÓN DE VARIABLES DE ENTORNO
export const AIRTABLE_API_KEY = getEnvVar('AIRTABLE_API_KEY');
export const AIRTABLE_BASE_ID = getEnvVar('AIRTABLE_BASE_ID');
export const AUTHORIZATION_URL = getEnvVar('AUTH_URL');
export const TOKEN_URL = getEnvVar('TOKEN_URL');
export const CLIENT_ID = getEnvVar('CLIENT_ID_GOOGLE');
export const CLIENT_SECRET = getEnvVar('CLIENT_SECRET');
export const CALLBACK_URL = getEnvVar('CALLBACK_URL');
export const JWT_SECRET = getEnvVar('JWT_SECRET');
