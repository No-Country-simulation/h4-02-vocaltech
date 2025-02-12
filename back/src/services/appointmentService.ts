import axios from "axios";
import { config } from "../config/validateEnv";
import { AppointmentDto } from "../dtos/AppointmentDto";
import { DateTime } from "luxon";

export class AppointmentService {
  // Método para verificar si el horario ya está ocupado
  private static async isTimeSlotAvailable(dateTime: string): Promise<boolean> {
    try {
      const response = await axios.get(config.appointmentsTableUrl, {
        headers: {
          Authorization: `Bearer ${config.AIRTABLE_API_KEY}`,
        },
      });

      if (!response.data || !response.data.records) {
        throw new Error("Respuesta de API inválida.");
      }

      // Extraer solo la fecha y la hora del campo DateTime
      const [date, time] = dateTime.split("T");

      // Comprobar si ya existe una cita en la misma fecha y hora
      const existingAppointments = response.data.records.filter((record: any) => {
        const ARG_TIMEZONE = 'America/Argentina/Buenos_Aires';
        const recordDateTime = record.fields?.DateTime;  // Cambié el campo 'Date' por 'DateTime'
        if (!recordDateTime) return false;

        // Convertimos la fecha de Airtable a la zona horaria de Argentina
        const recordDate = DateTime.fromISO(recordDateTime).setZone(ARG_TIMEZONE).toFormat("yyyy-MM-dd");
        const recordTime = DateTime.fromISO(recordDateTime).setZone(ARG_TIMEZONE).toFormat("HH:mm");

        const selectedDate = DateTime.fromISO(dateTime).setZone(ARG_TIMEZONE).toFormat("yyyy-MM-dd");
        const selectedTime = DateTime.fromISO(dateTime).setZone(ARG_TIMEZONE).toFormat("HH:mm");

        return recordDate === selectedDate && recordTime === selectedTime;
      });

      return existingAppointments.length === 0;  // Si no hay citas en el mismo horario, está disponible
    } catch (error) {
      console.error("Error al verificar la disponibilidad del horario:", error);
      throw new Error("No se pudo verificar la disponibilidad del horario.");
    }
  }

  // Método para validar que la hora está dentro del rango permitido
  private static isValidTime(dateTime: string): boolean {
    const time = dateTime.split("T")[1];
    const hour = parseInt(time.split(":")[0], 10);
    return hour >= 10 && hour < 18; // Horario de 10:00 AM a 6:00 PM
  }

  public static async createAppointment(
    appointmentDto: AppointmentDto
  ): Promise<any> {
    const { dateTime, description } = appointmentDto;

    try {
      if (!this.isValidTime(dateTime)) {
        throw new Error("El horario debe estar entre las 10:00 AM y las 6:00 PM.");
      }

      const isAvailable = await this.isTimeSlotAvailable(dateTime);
      if (!isAvailable) {
        throw new Error("El horario seleccionado no está disponible.");
      }

      const data = {
        fields: {
          DateTime: dateTime,  // Asegúrate de que este nombre coincide con el campo en Airtable
          Description: description,
        },
      };

      const response = await axios.post(config.appointmentsTableUrl, data, {
        headers: {
          Authorization: `Bearer ${config.AIRTABLE_API_KEY}`,
          "Content-Type": "application/json",
        },
      });

      if (!response.data) {
        throw new Error("Error inesperado al crear la cita.");
      }

      return response.data;
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        console.error("Error al crear la cita:", error.response ? error.response.data : error.message);
        throw new Error(error.response ? error.response.data.error.message : "No se pudo crear la cita.");
      } else {
        console.error("Error desconocido:", error);
        throw new Error("No se pudo crear la cita.");
      }
    }
  }
}
