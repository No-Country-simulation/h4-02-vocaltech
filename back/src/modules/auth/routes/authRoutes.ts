import express from 'express';
import passport from 'passport';

const router = express.Router();

// Ruta de inicio de sesión con OAuth
router.get('/auth/', passport.authenticate('oauth2'));

// Ruta de callback de OAuth2
router.get('/auth/google/callback', passport.authenticate('oauth2', { failureRedirect: '/login' }), (req, res) => {
  res.redirect('/dashboard'); // Redirige al dashboard u otra página después de un login exitoso
});

export default router;
