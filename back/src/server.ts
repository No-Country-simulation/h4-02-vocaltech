import cors from "cors";
import morgan from "morgan";
import express from "express";
import passport from "passport";
import indexRouter from "./router/index";
import OAuthRouter from "./router/oAuth2Routes";
import { config } from "./config/validateEnv";
import corsConfig from "./utils/corsConfig";
import { configureOAuth2Strategy } from "./passport/oauth2.strategy";
import fileRouter from "./router/fileRouter";
import { setupSwagger } from "./config/swaggerConfig"; // Import Swagger configuration
import session from "express-session";


const server = express();

// After defining `server` (Express instance), add:
setupSwagger(server);

// Configuración de la sesión
server.use(session({
    secret: config.SECRET_SECTION, // Cambia esto por una clave segura
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false } // Cambia a true si usas HTTPS
}));

// Configurar Passport y OAuth
configureOAuth2Strategy();
server.use(passport.initialize());
server.use(passport.session());

// Configuracion de CORS
server.use(cors(corsConfig));

server.use(express.json());
server.use(morgan("dev"))

// Rutas definidas
server.use("/api", indexRouter);
console.log("✅ Registrando rutas: /Oauth");
server.use("/Oauth", OAuthRouter);
server.use("/file", fileRouter);


export default server;