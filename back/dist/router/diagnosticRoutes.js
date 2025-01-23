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
const express_1 = require("express");
const diagnosticController_1 = require("../controllers/diagnosticController");
const DiagnosticRouter = (0, express_1.Router)();
// Route to get diagnostic by ID
DiagnosticRouter.get("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield diagnosticController_1.diagnosticController.getDiagnosticById(req, res);
    }
    catch (error) {
        res.status(500).json({
            message: "Unexpected error in diagnostic route",
            error: error instanceof Error ? error.message : "Unknown error",
        });
    }
}));
// Route to delete diagnostic by ID
DiagnosticRouter.delete("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield diagnosticController_1.diagnosticController.deleteDiagnosticById(req, res);
    }
    catch (error) {
        res.status(500).json({
            message: "Unexpected error in diagnostic route",
            error: error instanceof Error ? error.message : "Unknown error",
        });
    }
}));
// Route to edit diagnostic by ID
DiagnosticRouter.put("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield diagnosticController_1.diagnosticController.editDiagnosticById(req, res);
    }
    catch (error) {
        res.status(500).json({
            message: "Unexpected error in diagnostic route",
            error: error instanceof Error ? error.message : "Unknown error",
        });
    }
}));
// Route to patch diagnostic by ID (partial update)
DiagnosticRouter.patch("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield diagnosticController_1.diagnosticController.patchDiagnosticById(req, res);
    }
    catch (error) {
        res.status(500).json({
            message: "Unexpected error in diagnostic route",
            error: error instanceof Error ? error.message : "Unknown error",
        });
    }
}));
// Route to create a new diagnostic
DiagnosticRouter.post("/new", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield diagnosticController_1.diagnosticController.createDiagnostic(req, res);
    }
    catch (error) {
        res.status(500).json({
            message: "Unexpected error in diagnostic route",
            error: error instanceof Error ? error.message : "Unknown error",
        });
    }
}));
exports.default = DiagnosticRouter;
