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
exports.getTableRecords = getTableRecords;
const dbConfigAirTable_1 = __importDefault(require("./dbConfigAirTable"));
// Controlador para obtener registros de una tabla
function getTableRecords(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const tableName = req.params.table;
        try {
            const records = yield (0, dbConfigAirTable_1.default)(tableName);
            res.status(200).json(records);
        }
        catch (error) {
            console.error(`Error fetching records from table ${tableName}:`, error);
            res.status(500).json({ message: "Error fetching records", error });
        }
    });
}
