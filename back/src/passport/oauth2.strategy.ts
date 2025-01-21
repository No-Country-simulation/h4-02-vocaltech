import passport from 'passport';
import { Strategy as OAuth2Strategy, VerifyCallback } from 'passport-oauth2';
import { config } from '../config/validateEnv';
import { base } from '../utils/repositoryAirTable';

// Configuración de la estrategia OAuth2
export const configureOAuth2Strategy = () => {
  passport.use(
    'oauth2',
    new OAuth2Strategy(
      {
        authorizationURL: config.AUTHORIZATION_URL,
        tokenURL: config.TOKEN_URL,
        clientID: config.CLIENT_ID,
        clientSecret: config.CLIENT_SECRET,
        callbackURL: config.CALLBACK_URL || config.LOCAL_CALLBACK_URL,
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