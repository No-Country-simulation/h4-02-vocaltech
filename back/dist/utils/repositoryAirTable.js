"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.base = void 0;
const validateEnv_1 = require("../config/validateEnv");
const airtable_1 = __importDefault(require("airtable"));
// Inicialización de AirTable
exports.base = new airtable_1.default({ apiKey: validateEnv_1.config.AIRTABLE_API_KEY }).base(validateEnv_1.config.AIRTABLE_BASE_ID);
