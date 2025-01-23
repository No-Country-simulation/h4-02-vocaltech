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
const oAuth2Routes_1 = __importDefault(require("./router/oAuth2Routes"));
const corsConfig_1 = __importDefault(require("./utils/corsConfig"));
const oauth2_strategy_1 = require("./passport/oauth2.strategy");
const fileRouter_1 = __importDefault(require("./router/fileRouter"));
const server = (0, express_1.default)();
// Configuracion de Passport
(0, oauth2_strategy_1.configureOAuth2Strategy)();
// Configuracion de CORS
server.use((0, cors_1.default)(corsConfig_1.default));
// Middleware de Passport
server.use(passport_1.default.initialize());
server.use(express_1.default.json());
server.use((0, morgan_1.default)("dev"));
// Rutas definidas
server.use("/api", index_1.default);
server.use("/Oauth", oAuth2Routes_1.default);
server.use("/file", fileRouter_1.default);
exports.default = server;
