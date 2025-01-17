import { Router } from "express";
import { getTableRecords } from "../config/AirTableController";

const router = Router();

// Ruta para obtener registros de una tabla específica en AirTable
router.get("/:table", getTableRecords);

export default router;
