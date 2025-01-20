"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CALLBACK_URL = exports.CLIENT_SECRET = exports.CLIENT_ID = exports.TOKEN_URL = exports.AUTHORIZATION_URL = void 0;
exports.validateEnv = validateEnv;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
// VALIDACION DE VARIABLES DE AIRTABLE
function validateEnv() {
    const apiKey = process.env.AIRTABLE_API_KEY;
    const baseId = process.env.AIRTABLE_BASE_ID;
    if (!apiKey || !baseId) {
        throw new Error("Missing required environment variables: AIRTABLE_API_KEY or AIRTABLE_BASE_ID");
    }
    return { apiKey, baseId };
}
// VALIDACION DE VARIABLES DE OAUTH2.0 
const getEnvVar = (key) => {
    const value = process.env[key];
    if (!value) {
        throw new Error(`Environment variable ${key} is not set`);
    }
    return value;
};
// Valida y asigna las variables necesarias
const AUTHORIZATION_URL = getEnvVar('AUTH_URL');
exports.AUTHORIZATION_URL = AUTHORIZATION_URL;
const TOKEN_URL = getEnvVar('TOKEN_URL');
exports.TOKEN_URL = TOKEN_URL;
const CLIENT_ID = getEnvVar('CLIENT_ID_GOOGLE');
exports.CLIENT_ID = CLIENT_ID;
const CLIENT_SECRET = getEnvVar('CLIENT_SECRET');
exports.CLIENT_SECRET = CLIENT_SECRET;
const CALLBACK_URL = getEnvVar('CALLBACK_URL');
exports.CALLBACK_URL = CALLBACK_URL;
