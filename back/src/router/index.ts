import { Router } from "express";
import airTableRoutes from "../router/RouterAirTable";
import userRoutes from '../modules/users/routes/airtable.routes';

const router = Router();

// Rutas para AirTable
router.use("/airtable", airTableRoutes);
router.post('/create_user', (req, res) => {
    // Lógica para crear el usuario
    res.send('Usuario creado');
  });

  
router.use("/users", userRoutes);  
/*
router.use("/leads",);
router.use("/auth",);
router.use("/diagnostics",);
router.use("/notifications");
router.use("/admin",);
*/
export default router;
