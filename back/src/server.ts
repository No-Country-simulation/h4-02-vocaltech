import cors from "cors";
import morgan from "morgan";
import express from "express";
import passport from "passport";
import indexRouter from "./router/index";
import OAuthRouter from "./router/oAuth2Routes";
import corsConfig from "./utils/corsConfig";
import { configureOAuth2Strategy } from "./passport/oauth2.strategy";
import fileRouter from "./router/fileRouter";


const server = express();

// Configuracion de Passport
configureOAuth2Strategy();

// Configuracion de CORS
server.use(cors(corsConfig));

// Middleware de Passport
server.use(passport.initialize());

server.use(express.json());
server.use(morgan("dev"))

// Rutas definidas
server.use("/api", indexRouter);
server.use("/Oauth", OAuthRouter);
server.use("/file", fileRouter);


export default server;