import { Router } from "express";
import airTableRoutes from "../router/RouterAirTable";
import AuthRouter from "./authRoutes";
import UserRouter from "./userRoutes";
import DiagnosticRouter from "./diagnosticRoutes";
import ProductRoutes from "./productRoutes";

const router = Router();

// Rutas para AirTable
router.use("/airtable", airTableRoutes);
router.use("/auth", AuthRouter);
router.use("/user", UserRouter);
router.use("/diagnostics", DiagnosticRouter);
router.use("/products", ProductRoutes);
/*
router.use("/leads", ledsRoutes);
router.use("/notifications");
router.use("/admin",);
*/
export default router;
