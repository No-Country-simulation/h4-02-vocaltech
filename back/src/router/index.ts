import { Router } from "express";
import airTableRoutes from "../router/RouterAirTable";

const router = Router();

// Rutas para AirTable
router.use("/airtable", airTableRoutes);
router.post('/create_user', (req, res) => {
    // Lógica para crear el usuario
    res.send('Usuario creado');
  });
/*
router.use("/leads",);
router.use("/auth",);
router.use("/diagnostics",);
router.use("/notifications");
router.use("/admin",);
*/
export default router;
