import { Router } from "express";
import airTableRoutes from "./RouterAirTable";
import emailRouter from "./leadsEmailRoutes";

const router = Router();

// Rutas para AirTable
router.use("/airtable", airTableRoutes);
router.use("/emails", emailRouter);

export default router;
