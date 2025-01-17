import { Router } from "express";
import airTableRoutes from "../router/RouterAirTable";

const router = Router();

// Rutas para AirTable
router.use("/airtable", airTableRoutes);
/*
router.use("/auth",);
router.use("/leads",);
router.use("/diagnostics",);
router.use("/notifications");
router.use("/admin",);
*/
export default router;
