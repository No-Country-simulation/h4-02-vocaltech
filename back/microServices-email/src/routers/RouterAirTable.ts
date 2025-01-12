import { Router } from "express";
import { getTableRecords } from "../controllers/AirTableController";

const router = Router();

// Ruta para obtener registros de una tabla específica en AirTable
router.get("/:table", getTableRecords);

export default router;
