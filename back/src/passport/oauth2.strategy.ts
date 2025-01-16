import passport from 'passport';
import { Strategy as OAuth2Strategy, VerifyCallback } from 'passport-oauth2';
import { CLIENT_ID, CALLBACK_URL, CLIENT_SECRET, TOKEN_URL, AUTHORIZATION_URL } from '../config/validateEnv';

// Configuración de la estrategia OAuth2
passport.use(
  new OAuth2Strategy(
    {
      authorizationURL: AUTHORIZATION_URL,
      tokenURL: TOKEN_URL,
      clientID: CLIENT_ID,
      clientSecret: CLIENT_SECRET,
      callbackURL: CALLBACK_URL,
    },
    async (accessToken: string, refreshToken: string, profile: any, done: VerifyCallback) => {
      try {
        // Aquí puedes implementar la lógica para buscar o procesar el usuario.
        // Por ahora, no hacemos nada y devolvemos null como error y el perfil vacío.
        return done(null, profile);
      } catch (error) {
        return done(error);
      }
    }
  )
);
