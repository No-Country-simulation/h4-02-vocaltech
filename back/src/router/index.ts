import { Router } from "express";
import airTableRoutes from "../router/RouterAirTable";
import AuthRouter from "./authRoutes";
import UserRouter from "./userRoutes";

const router = Router();

// Rutas para AirTable
router.use("/airtable", airTableRoutes);
router.use("/user", AuthRouter);
router.use("/userdata", UserRouter);

/*
router.use("/leads", ledsRoutes);
router.use("/diagnostics",);
router.use("/notifications");
router.use("/admin",);
*/
export default router;
