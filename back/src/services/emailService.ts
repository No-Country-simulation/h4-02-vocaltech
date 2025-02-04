import sgMail from "@sendgrid/mail";
import { config } from "../config/validateEnv";

sgMail.setApiKey(config.SENDGRID_API_KEY); // Configura la API Key de SendGrid

export const emailService = {
  async sendWelcomeEmail(to: string, name: string) {
    const msg = {
      to,
      from: 'lms.segovia86@gmail.com', // Email verificado en SendGrid
      subject: "Bienvenido a nuestra plataforma",
      text: `Hola ${name}, gracias por registrarte en nuestra plataforma.`,
      html: `<h1>Hola ${name}!</h1><p>Gracias por registrarte en nuestra plataforma.</p>`,
    };

    await sgMail.send(msg);
  },
};
