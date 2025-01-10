import server from "./server";
import "reflect-metadata";
import dotenv from "dotenv";
import { dataSource } from "./config/dbConfig";

dotenv.config();

dataSource.initialize()
   .then( res => {
      console.log("Database connected");
      server.listen(process.env.PORT, () => {
         console.log(`Server listening on port ${process.env.PORT}`);
      });
   })