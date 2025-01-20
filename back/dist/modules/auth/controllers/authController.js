"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.findOrCreateUser = findOrCreateUser;
const airtable_1 = __importDefault(require("airtable"));
const validateEnv_1 = require("../../../config/validateEnv");
const { apiKey, baseId } = (0, validateEnv_1.validateEnv)();
const base = new airtable_1.default({ apiKey }).base(baseId);
const usersTable = base('Users'); // Nombre de la tabla en Airtable
// Función para buscar o crear un usuario en Airtable
function findOrCreateUser(oauthId, profile) {
    return __awaiter(this, void 0, void 0, function* () {
        var _a, _b, _c, _d;
        try {
            // Buscar el usuario en Airtable
            const records = yield usersTable
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
            const newUser = yield usersTable.create({
                oauthId,
                name: profile.displayName || 'Anonymous',
                email: ((_b = (_a = profile.emails) === null || _a === void 0 ? void 0 : _a[0]) === null || _b === void 0 ? void 0 : _b.value) || '',
                avatar: ((_d = (_c = profile.photos) === null || _c === void 0 ? void 0 : _c[0]) === null || _d === void 0 ? void 0 : _d.value) || '',
            });
            return newUser.fields;
        }
        catch (error) {
            console.error('Error en findOrCreateUser:', error);
            throw error;
        }
    });
}
