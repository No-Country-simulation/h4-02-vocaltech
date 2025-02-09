import express from "express";
import passport from "passport";

const router = express.Router();

// Ruta de autenticación con Google OAuth2
router.get("/google", (req, res, next) => {
  // Si el usuario ya está autenticado, redirige a la página de inicio (o cualquier ruta deseada)
  if (req.isAuthenticated()) {
    return res.redirect("/api/home"); // O la ruta principal del frontend
  }
  passport.authenticate("google", { scope: ["profile", "email"] })(req, res, next);
});

// Ruta de callback después de la autenticación
router.get(
  "/google/callback",
  passport.authenticate("google", { failureRedirect: "/login" }),
  (req, res) => {
    // En caso de que no se pueda autenticar, redirigir con un mensaje de error
    if (!req.user) {
      return res.redirect("/login?error=not_authenticated");
    }

    // Si el login fue exitoso, redirigir a la ruta principal del backend o frontend
    // Aquí puedes personalizar según tu flujo de trabajo:
    // Backend: redirigir a alguna página o devolver un token
    // Frontend: redirigir al frontend con información de usuario
    res.redirect("/api/home"); // O redirigir al frontend, por ejemplo: /dashboard
  }
);

// Puedes agregar más rutas si necesitas otros flujos de autenticación, como cerrar sesión

export default router;






