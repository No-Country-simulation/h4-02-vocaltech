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
exports.diagnosticService = void 0;
const validateEnv_1 = require("../config/validateEnv");
exports.diagnosticService = {
    findDiagnosticById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const { AIRTABLE_API_KEY, diagnosticsTableUrl } = validateEnv_1.config;
            const response = yield fetch(`${diagnosticsTableUrl}/${id}`, {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${AIRTABLE_API_KEY}`,
                },
            });
            if (!response.ok) {
                const errorText = yield response.text();
                throw new Error(`Failed to fetch diagnostic from Airtable: ${errorText}`);
            }
            // Explicitly cast the JSON response to `AirtableRecord`
            const diagnostic = (yield response.json());
            return diagnostic.fields || null;
        });
    },
    deleteDiagnosticById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const { AIRTABLE_API_KEY, diagnosticsTableUrl } = validateEnv_1.config;
            const response = yield fetch(`${diagnosticsTableUrl}/${id}`, {
                method: "DELETE",
                headers: {
                    Authorization: `Bearer ${AIRTABLE_API_KEY}`,
                },
            });
            if (!response.ok) {
                const errorText = yield response.text();
                throw new Error(`Failed to delete diagnostic from Airtable: ${errorText}`);
            }
            return true;
        });
    },
    updateDiagnosticById(id, data) {
        return __awaiter(this, void 0, void 0, function* () {
            const { AIRTABLE_API_KEY, diagnosticsTableUrl } = validateEnv_1.config;
            const response = yield fetch(`${diagnosticsTableUrl}/${id}`, {
                method: "PUT",
                headers: {
                    Authorization: `Bearer ${AIRTABLE_API_KEY}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ fields: data }),
            });
            if (!response.ok) {
                const errorText = yield response.text();
                throw new Error(`Failed to update diagnostic in Airtable: ${errorText}`);
            }
            const updatedDiagnostic = (yield response.json());
            return updatedDiagnostic.fields;
        });
    },
    patchDiagnosticById(id, data) {
        return __awaiter(this, void 0, void 0, function* () {
            const existingDiagnostic = yield this.findDiagnosticById(id);
            if (!existingDiagnostic) {
                throw new Error(`Diagnostic with ID ${id} not found`);
            }
            const updatedData = Object.assign(Object.assign({}, existingDiagnostic), data);
            return this.updateDiagnosticById(id, updatedData);
        });
    },
    createDiagnostic(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const { AIRTABLE_API_KEY, diagnosticsTableUrl } = validateEnv_1.config;
            const response = yield fetch(diagnosticsTableUrl, {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${AIRTABLE_API_KEY}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ fields: data }),
            });
            if (!response.ok) {
                const errorText = yield response.text();
                throw new Error(`Failed to create diagnostic in Airtable: ${errorText}`);
            }
            const newDiagnostic = (yield response.json());
            return newDiagnostic;
        });
    },
};
