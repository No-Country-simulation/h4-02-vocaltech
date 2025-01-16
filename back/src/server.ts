import cors from "cors";
import morgan from "morgan";
import express from "express";
import router from "./routersAirtable/index";

const server = express();

server.use(cors());
server.use(express.json());
server.use(morgan("dev"))

server.use("/api", router);

export default server;