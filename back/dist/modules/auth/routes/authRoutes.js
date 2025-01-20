"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const passport_1 = __importDefault(require("passport"));
const router = express_1.default.Router();
// Ruta de inicio de sesión con OAuth
router.get('/auth/', passport_1.default.authenticate('oauth2'));
// Ruta de callback de OAuth2
router.get('/auth/google/callback', passport_1.default.authenticate('oauth2', { failureRedirect: '/login' }), (req, res) => {
    res.redirect('/dashboard'); // Redirige al dashboard u otra página después de un login exitoso
});
exports.default = router;
