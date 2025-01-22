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
exports.authController = void 0;
const authService_1 = require("../services/authService");
exports.authController = {
    // Controlador para registrar un usuario
    register(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const registerDto = req.body;
                const newUser = yield authService_1.authService.registerUser(registerDto);
                return res.status(201).json({
                    message: "User registered successfully.",
                    user: newUser,
                });
            }
            catch (error) {
                // Manejo de errores específicos para las nuevas validaciones
                if (error instanceof Error) {
                    if (error.message === "Password is too weak. Please choose a stronger password.") {
                        return res.status(400).json({
                            message: "Password is too weak.",
                            error: error.message,
                        });
                    }
                    else if (error.message === "Email is already registered.") {
                        return res.status(400).json({
                            message: "Email is already registered.",
                            error: error.message,
                        });
                    }
                    console.error("Error registering user:", error.message);
                    return res.status(500).json({
                        message: "Failed to register user.",
                        error: error.message,
                    });
                }
                else {
                    console.error("Unexpected error:", error);
                    return res.status(500).json({
                        message: "An unexpected error occurred.",
                    });
                }
            }
        });
    },
    // Controlador para loguear un usuario
    login(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const loginDto = req.body;
                const token = yield authService_1.authService.loginUser(loginDto);
                return res.status(200).json({
                    message: "Login successful.",
                    token,
                });
            }
            catch (error) {
                // Manejo de errores específicos para login
                if (error instanceof Error) {
                    if (error.message === "Invalid email or password.") {
                        return res.status(401).json({
                            message: "Invalid credentials.",
                            error: error.message,
                        });
                    }
                    console.error("Error logging in user:", error.message);
                    return res.status(500).json({
                        message: "Failed to login.",
                        error: error.message,
                    });
                }
                else {
                    console.error("Unexpected error:", error);
                    return res.status(500).json({
                        message: "An unexpected error occurred.",
                    });
                }
            }
        });
    },
};
