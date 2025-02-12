import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import { config } from "../config/validateEnv";
import { base } from "../utils/repositoryAirTable";
import { AirtableRecordUser } from "../utils/airtableInterfaces";
import { Record, FieldSet } from "airtable";

// Extiende la interfaz User para que sea compatible con Express.User
interface User extends Express.User {
  id: string;
  name: string;
  email: string;
  password?: string;
  phone?: string;
  company?: string;
  [key: string]: any;
}

export const configureOAuth2Strategy = () => {
  passport.use(
    new GoogleStrategy(
      {
        clientID: config.CLIENT_ID,
        clientSecret: config.CLIENT_SECRET,
        callbackURL: config.CALLBACK_URL_BACK,
        passReqToCallback: true,
      },
      async (req, accessToken, refreshToken, profile, done) => {
        try {
          if (!profile.emails || profile.emails.length === 0) {
            return done(new Error("No email found in profile"));
          }

          const email = profile.emails[0].value;
          const name = profile.displayName || "Usuario sin nombre";
          const picture = profile.photos?.[0]?.value || "default-avatar.png";

          // Buscar si el usuario ya existe en Airtable
          const records = await base("Users")
            .select({ filterByFormula: `{email} = "${email}"` })
            .firstPage();

          if (records.length > 0) {
            const existingUser = records[0] as Record<FieldSet>;
            return done(null, {
              id: existingUser.id,
              name: existingUser.fields.name,
              email: existingUser.fields.email,
              password: existingUser.fields.password,
              phone: existingUser.fields.phone,
              company: existingUser.fields.company,
            } as User); // Asegúrate de que esto se trata como un tipo Express.User
          }

          // Crear nuevo usuario si no existe
          const newUser = await base("Users").create([{
            fields: {
              name,
              email,
              password: "", // No se almacena en OAuth
              phone: "", // Opcional
              company: "", // Opcional
            },
          }]);

          return done(null, {
            id: newUser[0].id,
            name: newUser[0].fields.name,
            email: newUser[0].fields.email,
            password: newUser[0].fields.password,
            phone: newUser[0].fields.phone,
            company: newUser[0].fields.company,
          } as User); // Asegúrate de que esto se trata como un tipo Express.User
        } catch (error) {
          return done(error);
        }
      }
    )
  );

  // Serialización y deserialización del usuario
  passport.serializeUser((user: Express.User, done) => {
    done(null, (user as User).id); // Asegúrate de que el id sea de tipo User
  });

  passport.deserializeUser(async (id: string, done) => {
    try {
      const record = await base("Users").find(id); // Buscar el usuario en Airtable
      done(null, {
        id: record.id,
        name: record.fields.name,
        email: record.fields.email,
        password: record.fields.password,
        phone: record.fields.phone,
        company: record.fields.company,
      } as User); // Asegúrate de que esto se trata como un tipo Express.User
    } catch (error) {
      done(error);
    }
  });
};







