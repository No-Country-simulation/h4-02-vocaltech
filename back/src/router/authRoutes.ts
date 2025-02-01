import { Router } from "express";
import { authController } from "../controllers/authController";

const AuthRouter = Router();

// Ruta para registrar un usuario
/**
 * @swagger
 * /api/auth/register:
 *   post:
 *     summary: Create a new user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             additionalProperties: true
 *             example:
 *               name: "example"
 *               phone: "+1234567890"
 *               email: "exmample1@example.com"
 *               company: "Example Corp."
 *               password: "Example1234@"
 *               passwordConfirmation: "Example1234@"
 *     responses:
 *       201:
 *         description: User created successfully
 *       400:
 *         description: Bad request - Invalid data
 *       500:
 *         description: Internal server error
 */
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
/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     summary: Create a new user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             additionalProperties: true
 *             example:
 *               email: "johndoeReg@example.com"
 *               password: "$2a$10$82KIrqUg/5HdX/uGie7HAuHu21URhZfSuzx0.Ek5y8GzufbY1YWbC"
 *     responses:
 *       201:
 *         description: User created successfully
 *       400:
 *         description: Bad request - Invalid data
 *       500:
 *         description: Internal server error
 */
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

