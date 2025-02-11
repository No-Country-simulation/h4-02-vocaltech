import { Router } from "express";
import airTableRoutes from "../router/RouterAirTable";
import AuthRouter from "./authRoutes";
import UserRouter from "./userRoutes";
import DiagnosticRouter from "./diagnosticRoutes";
import ProductRouter from "./productRoutes";
import LeadRouter from "./leadRoutes";
import WappRouter from "./wappRoutes";
import ChatRouter from "./chatRoutes";
import emailRouter from "./emailRoutes";
import appointmentRouter from "./appointmentRoutes";

const router = Router();

// Rutas para AirTable
router.use("/airtable", airTableRoutes);
router.use("/auth", AuthRouter);
router.use("/user", UserRouter);
router.use("/diagnostics", DiagnosticRouter);
router.use("/products", ProductRouter);
router.use("/leads", LeadRouter);
router.use("/chats", ChatRouter);
router.use("/wapps", WappRouter);
router.use("/emails", emailRouter);
router.use("/appointments", appointmentRouter);
/*
router.use("/notifications");
router.use("/admin",);
*/
export default router;
