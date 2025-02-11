import { Router } from "express";
import { emailService } from "../services/emailService";

const emailRouter = Router();

emailRouter.post("/send-email", async (req, res) => {
  try {
    const { to, subject, text, html } = req.body;

    if (!to || !subject || !text || !html) {
      return res.status(400).json({ message: "Todos los campos son obligatorios" });
    }

    await emailService.sendCustomEmail(to, subject, text, html);
    res.status(200).json({ message: "Email enviado exitosamente" });
  } catch (error) {
    console.error("Error enviando el email:", error);
    res.status(500).json({ message: "Error al enviar el email" });
  }
});

export default emailRouter;
