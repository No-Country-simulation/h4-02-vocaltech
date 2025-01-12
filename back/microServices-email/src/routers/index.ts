import { Router } from "express";
import airTableRoutes from "./RouterAirTable";

const router = Router();

// Rutas para AirTable
router.use("/airtable", airTableRoutes);

export default router;
