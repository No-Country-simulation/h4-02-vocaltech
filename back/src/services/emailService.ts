import sgMail from "@sendgrid/mail";
import { config } from "../config/validateEnv";

sgMail.setApiKey(config.SENDGRID_API_KEY); // Configura la API Key de SendGrid

export const emailService = {
  async sendWelcomeEmail(to: string, name: string) {
    const msg = {
      to,
      from: config.SENDGRID_EMAIL_FROM, // Email verificado en SendGrid
      subject: "Bienvenido a nuestra plataforma",
      text: `Hola ${name}, gracias por registrarte en nuestra plataforma.`,
      html: `<h1>Hola ${name}!</h1><p>Gracias por registrarte en nuestra plataforma.</p>`,
    };

    await sgMail.send(msg);
  },
};

export const emailDiagnoticService = {

  async sendWelcomeEmail(to: string, name: string) {
    const msg = {
      to,
      from: config.SENDGRID_EMAIL_FROM, // Email verificado en SendGrid
      subject: "Hola ${name}",
      text: `Hola ${name}, Gracias por completar nuestro diagnóstico en VocalTech. Hemos recibido tu información y estamos analizando los mejores recursos para ayudarte a potenciar tu comunicación y liderazgo.`,
      html: `<h1>Hola ${name}!</h1><p>Gracias por completar nuestro diagnóstico en VocalTech. Hemos recibido tu información y estamos analizando los mejores recursos para ayudarte a potenciar tu comunicación y liderazgo.</p> <br><br>
      <p>En breve, recibirás una recomendación personalizada con las mejores soluciones para ti.</p>
      <br><br>
      <p>¡Nos emociona acompañarte en este camino!</p>
        <br><p>Saludos, 
        <br>El equipo de VocalTech
      </p>
      `,
    };

    await sgMail.send(msg);
  },

}     
