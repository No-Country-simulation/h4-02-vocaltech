import passport from 'passport';
import { Strategy as OAuth2Strategy, VerifyCallback } from 'passport-oauth2';
import { CLIENT_ID, CALLBACK_URL, CLIENT_SECRET, TOKEN_URL, AUTHORIZATION_URL } from '../config/validateEnv';
import { base } from '../utils/repositoryAirTable';

// Configuración de la estrategia OAuth2
export const configureOAuth2Strategy = () => {
  passport.use(
    'oauth2',
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
          // Busca si existe el usuario en airtaible
          const records = await base('Users')  // Busca en la base de datos la tabla 'Users'
            .select({ filterByFormula: `{email} = "${profile.emails[0].value}"` })
            .firstPage();
          
          if (records.length > 0) {
            // Usuario existe, se pasa el perfil al siguiente paso
            return done(null, records[0].fields);
          } else {
            // Si el usuario no existe, creamos uno nuevo
            const newUser = await base('Users').create({
              email: profile.emails[0].value,
              name: profile.displayName,
              picture: profile.photos ? profile.photos[0].value : null,
            });

            return done(null, newUser.fields);
          }
        } catch (error) {
          return done(error);
        }
      }
    )
  );
};