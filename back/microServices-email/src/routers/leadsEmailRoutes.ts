import { Router } from "express";
import { fetchEmailsFromLeads } from "../controllers/leadsEmailController";

const router = Router();

// Definir las rutas para manejar las solicitudes
router.get("/", (res, req) => {fetchEmailsFromLeads});

export default router;

