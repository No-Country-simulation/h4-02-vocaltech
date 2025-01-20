import { Router } from "express";
import { authController } from "../controllers/authController";

const AuthRouter = Router();

// Ruta para registrar un usuario
AuthRouter.post("/register", async (req, res) => {
  try {
    await authController.register(req, res); // Espera la resolución de la promesa
  } catch (error) {
    res.status(500).json({
      message: "Error registering user",
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
});

// Ruta para loguear un usuario
AuthRouter.post("/login", async (req, res) => {
  try {
    await authController.login(req, res); // Espera la resolución de la promesa
  } catch (error) {
    res.status(500).json({
      message: "Error logging in user",
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
});

export default AuthRouter;

