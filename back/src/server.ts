import cors from "cors";
import morgan from "morgan";
import express from "express";
import passport from "passport";
import indexRouter from "./router/index";
import OAuthRouter from "./modules/auth/routes/authRoutes";
import { configureOAuth2Strategy } from "./passport/oauth2.strategy";
import bodyParser from 'body-parser';

const server = express();

configureOAuth2Strategy();

server.use(cors({
    origin: 'http://localhost:3001',  
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
}));

// Middleware de Passport
server.use(passport.initialize());
server.use(bodyParser.json());

// Usar las rutas de autenticación
server.use("/auth", OAuthRouter);

server.use(express.json());
server.use(morgan("dev"))

server.use("/api", indexRouter);

export default server;