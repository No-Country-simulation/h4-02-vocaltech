import { Router } from "express";
import { fetchEmailsFromLeads } from "../controllers/leadsEmailController";

const emailRouter = Router();

// Definir las rutas para manejar las solicitudes
emailRouter.get("/", (res, req) => {fetchEmailsFromLeads});

export default emailRouter;

