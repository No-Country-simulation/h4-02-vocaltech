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
exports.configureOAuth2Strategy = void 0;
const passport_1 = __importDefault(require("passport"));
const passport_oauth2_1 = require("passport-oauth2");
const validateEnv_1 = require("../config/validateEnv");
const repositoryAirTable_1 = require("../utils/repositoryAirTable");
// Configuración de la estrategia OAuth2
const configureOAuth2Strategy = () => {
    passport_1.default.use('oauth2', new passport_oauth2_1.Strategy({
        authorizationURL: validateEnv_1.config.AUTHORIZATION_URL,
        tokenURL: validateEnv_1.config.TOKEN_URL,
        clientID: validateEnv_1.config.CLIENT_ID,
        clientSecret: validateEnv_1.config.CLIENT_SECRET,
        callbackURL: validateEnv_1.config.CALLBACK_URL || validateEnv_1.config.LOCAL_CALLBACK_URL,
    }, (accessToken, refreshToken, profile, done) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            // Busca si existe el usuario en airtaible
            const records = yield (0, repositoryAirTable_1.base)('Users') // Busca en la base de datos la tabla 'Users'
                .select({ filterByFormula: `{email} = "${profile.emails[0].value}"` })
                .firstPage();
            if (records.length > 0) {
                // Usuario existe, se pasa el perfil al siguiente paso
                return done(null, records[0].fields);
            }
            else {
                // Si el usuario no existe, creamos uno nuevo
                const newUser = yield (0, repositoryAirTable_1.base)('Users').create({
                    email: profile.emails[0].value,
                    name: profile.displayName,
                    picture: profile.photos ? profile.photos[0].value : null,
                });
                return done(null, newUser.fields);
            }
        }
        catch (error) {
            return done(error);
        }
    })));
};
exports.configureOAuth2Strategy = configureOAuth2Strategy;
