import { Request, Response } from "express";
import { AppointmentService } from "../services/appointmentService";
import { AppointmentDto } from "../dtos/AppointmentDto";

export class AppointmentController {
  // Endpoint para crear un Appointment
  public static async createAppointment(
    req: Request,
    res: Response
  ): Promise<void> {
    try {
      const appointmentDto: AppointmentDto = req.body;
      if (!appointmentDto.dateTime || !appointmentDto.description) {
        res.status(400).json({ message: "Todos los campos son obligatorios." });
        return;
      }

      const newAppointment = await AppointmentService.createAppointment(
        appointmentDto
      );

      res.status(201).json({
        message: "Cita creada con éxito",
        appointment: newAppointment,
      });
    } catch (error: any) {
      console.error("Error en la creación de cita:", error);
      res.status(400).json({ message: error.message || "Error al crear la cita." });
    }
  }
}
