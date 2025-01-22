"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const passport_1 = __importDefault(require("passport"));
const router = express_1.default.Router();
// Ruta de autenticación con OAuth2 (Google)
router.get('/', passport_1.default.authenticate('oauth2', {
    scope: ['profile', 'email'], // Asegúrate de agregar los scopes necesarios
}));
// Ruta de callback después de la autenticación
router.get('/callback', passport_1.default.authenticate('oauth2', { failureRedirect: '/login' }), (req, res) => {
    // Aquí puedes redirigir al usuario a la página deseada después de la autenticación exitosa
    res.redirect('/api/create_user'); // O cualquier página que desees
});
exports.default = router;
