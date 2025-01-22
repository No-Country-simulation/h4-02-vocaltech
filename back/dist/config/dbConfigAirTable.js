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
Object.defineProperty(exports, "__esModule", { value: true });
const repositoryAirTable_1 = require("../utils/repositoryAirTable");
// Función genérica para obtener registros de una tabla de Airtable
function getRecords(table) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const records = yield (0, repositoryAirTable_1.base)(table)
                .select()
                .all();
            return records.map((record) => ({
                id: record.id,
                fields: record.fields,
            }));
        }
        catch (error) {
            console.error(`Error retrieving records from table ${table}:`, error);
            throw error;
        }
    });
}
exports.default = getRecords;
