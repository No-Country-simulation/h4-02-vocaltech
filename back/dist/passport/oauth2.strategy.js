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
const passport_1 = __importDefault(require("passport"));
const passport_oauth2_1 = require("passport-oauth2");
const validateEnv_1 = require("../config/validateEnv");
// Configuración de la estrategia OAuth2
passport_1.default.use(new passport_oauth2_1.Strategy({
    authorizationURL: validateEnv_1.AUTHORIZATION_URL,
    tokenURL: validateEnv_1.TOKEN_URL,
    clientID: validateEnv_1.CLIENT_ID,
    clientSecret: validateEnv_1.CLIENT_SECRET,
    callbackURL: validateEnv_1.CALLBACK_URL,
}, (accessToken, refreshToken, profile, done) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Aquí puedes implementar la lógica para buscar o procesar el usuario.
        // Por ahora, no hacemos nada y devolvemos null como error y el perfil vacío.
        return done(null, profile);
    }
    catch (error) {
        return done(error);
    }
})));
