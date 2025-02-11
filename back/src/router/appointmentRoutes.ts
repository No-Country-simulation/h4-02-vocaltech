// src/routes/appointmentRoutes.ts
import { Router } from "express";
import { AppointmentController } from "../controllers/appointmentController";

const appointmentRouter = Router();

// Ruta para crear un Appointment
appointmentRouter.post("/", AppointmentController.createAppointment);

export default appointmentRouter;
