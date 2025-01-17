import cors from "cors";
import morgan from "morgan";
import express from "express";
import passport from "passport";
import indexRouter from "./router/index";
import OAuthRouter from "./modules/auth/routes/authRoutes";

const server = express();

// Middleware de Passport
server.use(passport.initialize());

// Usar las rutas de autenticación
server.use("/api", OAuthRouter);

server.use(cors());
server.use(express.json());
server.use(morgan("dev"))

server.use("/api", indexRouter);

export default server;