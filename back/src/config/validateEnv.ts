import dotenv from "dotenv";
dotenv.config();

// VALIDACION DE VARIABLES DE AIRTABLE
export function validateEnv() {
  const apiKey = process.env.AIRTABLE_API_KEY;
  const baseId = process.env.AIRTABLE_BASE_ID;

  if (!apiKey || !baseId) {
    throw new Error(
      "Missing required environment variables: AIRTABLE_API_KEY or AIRTABLE_BASE_ID"
    );
  }

  return { apiKey, baseId };
}

// VALIDACION DE VARIABLES DE OAUTH2.0 
const getEnvVar = (key: string): string => {
  const value = process.env[key];
  if (!value) {
    throw new Error(`Environment variable ${key} is not set`);
  }
  return value;
};

// Valida y asigna las variables necesarias
const AUTHORIZATION_URL = getEnvVar('AUTH_URL');
const TOKEN_URL = getEnvVar('TOKEN_URL');
const CLIENT_ID = getEnvVar('CLIENT_ID_GOOGLE');
const CLIENT_SECRET = getEnvVar('CLIENT_SECRET');
const CALLBACK_URL = getEnvVar('CALLBACK_URL');

export { AUTHORIZATION_URL, TOKEN_URL, CLIENT_ID, CLIENT_SECRET, CALLBACK_URL };