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

// Encapsulamos las variables de entorno en un objeto
export const config = {
  // Variables de entorno para la base de datos Airtable
  AIRTABLE_URL_BASE: getEnvVar('AIRTABLE_URL_BASE'),
  AIRTABLE_API_KEY: getEnvVar('AIRTABLE_API_KEY'),
  AIRTABLE_BASE_ID: getEnvVar('AIRTABLE_BASE_ID'),

  // URL de las tablas de Airtable
  diagnosticsTableUrl: `${getEnvVar('AIRTABLE_URL_BASE')}/${getEnvVar('AIRTABLE_BASE_ID')}/Diagnostics`,
  usersTableUrl: `${getEnvVar('AIRTABLE_URL_BASE')}/${getEnvVar('AIRTABLE_BASE_ID')}/Users`,
  messagesTableUrl: `${getEnvVar('AIRTABLE_URL_BASE')}/${getEnvVar('AIRTABLE_BASE_ID')}/Messages`,
  productsTableUrl: `${getEnvVar('AIRTABLE_URL_BASE')}/${getEnvVar('AIRTABLE_BASE_ID')}/Products`,
  leadsTableUrl: `${getEnvVar('AIRTABLE_URL_BASE')}/${getEnvVar('AIRTABLE_BASE_ID')}/Leads`,

  // Variables de entorno para la estrategia OAuth2
  AUTHORIZATION_URL: getEnvVar('AUTH_URL'),
  TOKEN_URL: getEnvVar('TOKEN_URL'),
  CLIENT_ID: getEnvVar('CLIENT_ID_GOOGLE'),
  CLIENT_SECRET: getEnvVar('CLIENT_SECRET'),
  CALLBACK_URL: getEnvVar('CALLBACK_URL'),
  LOCAL_CALLBACK_URL: getEnvVar('LOCAL_CALLBACK_URL'),

  // Variables de entorno para JWT
  JWT_SECRET: getEnvVar('JWT_SECRET'),

  // Variables de entorno para AWS
  AWS_ACCESS_KEY_ID: getEnvVar('AWS_ACCESS_KEY_ID'),
  AWS_SECRET_ACCESS_KEY: getEnvVar('AWS_SECRET_ACCESS_KEY'),
  AWS_BUCKET_NAME: getEnvVar('AWS_BUCKET_NAME'),
  AWS_REGION: getEnvVar('AWS_REGION'),


  // Variables de entorno para para SendGrid
  SENDGRID_API_KEY: getEnvVar('SENDGRID_API_KEY'),
  SENDGRID_EMAIL_FROM: getEnvVar('SENDGRID_EMAIL_FROM'),
};

