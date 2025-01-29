import express from 'express';
import passport from 'passport';

const router = express.Router();

// Ruta de autenticación con OAuth2 (Google)
router.get('/', passport.authenticate('oauth2', {
  scope: ['profile', 'email'],  // Asegúrate de agregar los scopes necesarios
}));

// Ruta de callback después de la autenticación
router.get('/callback',
  passport.authenticate('oauth2', { failureRedirect: '/login' }),
  (req, res) => {
    // Aquí puedes redirigir al usuario a la página deseada después de la autenticación exitosa
    res.redirect('/api/home');  // O cualquier página que desees
  }
);

export default router;



