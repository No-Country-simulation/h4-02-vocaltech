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
exports.diagnosticController = void 0;
const diagnosticService_1 = require("../services/diagnosticService");
exports.diagnosticController = {
    getDiagnosticById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const diagnostic = yield diagnosticService_1.diagnosticService.findDiagnosticById(id);
                if (!diagnostic) {
                    return res.status(404).json({
                        message: "Diagnostic not found",
                    });
                }
                return res.status(200).json({
                    message: "Diagnostic retrieved successfully",
                    diagnostic,
                });
            }
            catch (error) {
                const errorMessage = error instanceof Error ? error.message : "Unexpected error";
                console.error("Error fetching diagnostic by ID:", errorMessage);
                return res.status(500).json({
                    message: "Failed to fetch diagnostic",
                    error: errorMessage,
                });
            }
        });
    },
    deleteDiagnosticById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const deleted = yield diagnosticService_1.diagnosticService.deleteDiagnosticById(id);
                if (!deleted) {
                    return res.status(404).json({
                        message: "Diagnostic not found",
                    });
                }
                return res.status(200).json({
                    message: "Diagnostic deleted successfully",
                });
            }
            catch (error) {
                const errorMessage = error instanceof Error ? error.message : "Unexpected error";
                console.error("Error deleting diagnostic:", errorMessage);
                return res.status(500).json({
                    message: "Failed to delete diagnostic",
                    error: errorMessage,
                });
            }
        });
    },
    editDiagnosticById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const diagnosticData = req.body;
                const updatedDiagnostic = yield diagnosticService_1.diagnosticService.updateDiagnosticById(id, diagnosticData);
                return res.status(200).json({
                    message: "Diagnostic updated successfully",
                    diagnostic: updatedDiagnostic,
                });
            }
            catch (error) {
                const errorMessage = error instanceof Error ? error.message : "Unexpected error";
                console.error("Error updating diagnostic:", errorMessage);
                return res.status(500).json({
                    message: "Failed to update diagnostic",
                    error: errorMessage,
                });
            }
        });
    },
    //   async patchDiagnosticById(req: Request, res: Response): Promise<Response> {
    //     try {
    //       const { id } = req.params;
    //       const diagnosticData = req.body;
    //       const updatedDiagnostic = await diagnosticService.patchDiagnosticById(id, diagnosticData);
    //       return res.status(200).json({
    //         message: "Diagnostic patched successfully",
    //         diagnostic: updatedDiagnostic,
    //       });
    //     } catch (error) {
    //       const errorMessage = error instanceof Error ? error.message : "Unexpected error";
    //       console.error("Error patching diagnostic:", errorMessage);
    //       return res.status(500).json({
    //         message: "Failed to patch diagnostic",
    //         error: errorMessage,
    //       });
    //     }
    //   },
    createDiagnostic(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const diagnosticData = req.body;
                // Basic validation for required fields
                const requiredFields = [
                    "Type",
                    "idUser",
                    "idProduct"
                ];
                const missingFields = requiredFields.filter((field) => !diagnosticData[field]);
                if (missingFields.length > 0) {
                    return res.status(400).json({
                        message: `Missing required fields: ${missingFields.join(", ")}`,
                    });
                }
                // Create new diagnostic in Airtable
                const newDiagnostic = yield diagnosticService_1.diagnosticService.createDiagnostic(diagnosticData);
                return res.status(201).json({
                    message: "Diagnostic created successfully",
                    diagnostic: newDiagnostic,
                });
            }
            catch (error) {
                const errorMessage = error instanceof Error ? error.message : "Unexpected error";
                console.error("Error creating diagnostic:", errorMessage);
                return res.status(500).json({
                    message: "Failed to create diagnostic",
                    error: errorMessage,
                });
            }
        });
    },
};
