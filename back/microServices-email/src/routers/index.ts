import { Router } from "express";
import airTableRoutes from "./RouterAirTable";
import emailLeadsRoutes from "./leadsEmailRoutes";

const router = Router();

// Rutas para AirTable
router.use("/airtable", airTableRoutes);
router.use("/emails", emailLeadsRoutes);

export default router;
