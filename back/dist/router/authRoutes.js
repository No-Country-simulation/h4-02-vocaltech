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
const authController_1 = require("../controllers/authController");
const AuthRouter = (0, express_1.Router)();
// Ruta para registrar un usuario
AuthRouter.post("/register", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield authController_1.authController.register(req, res); // Espera la resolución de la promesa
    }
    catch (error) {
        res.status(500).json({
            message: "Error registering user",
            error: error instanceof Error ? error.message : "Unknown error",
        });
    }
}));
// Ruta para loguear un usuario
AuthRouter.post("/login", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield authController_1.authController.login(req, res); // Espera la resolución de la promesa
    }
    catch (error) {
        res.status(500).json({
            message: "Error logging in user",
            error: error instanceof Error ? error.message : "Unknown error",
        });
    }
}));
exports.default = AuthRouter;
