"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cors_1 = __importDefault(require("cors"));
const morgan_1 = __importDefault(require("morgan"));
const express_1 = __importDefault(require("express"));
const passport_1 = __importDefault(require("passport"));
const index_1 = __importDefault(require("./router/index"));
const authRoutes_1 = __importDefault(require("./modules/auth/routes/authRoutes"));
const server = (0, express_1.default)();
// Middleware de Passport
server.use(passport_1.default.initialize());
// Usar las rutas de autenticación
server.use("/api", authRoutes_1.default);
server.use((0, cors_1.default)());
server.use(express_1.default.json());
server.use((0, morgan_1.default)("dev"));
server.use("/api", index_1.default);
exports.default = server;
