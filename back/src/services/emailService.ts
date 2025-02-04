import sgMail from "@sendgrid/mail";
import { config } from "../config/validateEnv";
import { ProductFields } from "../models/Product";

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

export const emailDiagnoticService = {
  async sendDiagnosticEmail(to: string, name: string, product: ProductFields) {
    const msg = {
      to,
      from: "lms.segovia86@gmail.com",
      subject: `Hola ${name}`,
      text: `Hola ${name}, gracias por completar nuestro diagnóstico en VocalTech. Hemos recibido tu información y estamos analizando los mejores recursos para ayudarte a potenciar tu comunicación y liderazgo.

      Producto elegido: ${product.NameProduct}
      Descripción: ${product.Description}
      Preguntas recomendadas:
      - ${product.Question1}
      - ${product.Question2}
      `,
      html: `<h1>Hola ${name}!</h1>
        <p>Gracias por completar nuestro diagnóstico en VocalTech. Hemos recibido tu información y estamos analizando los mejores recursos para ayudarte a potenciar tu comunicación y liderazgo. 
          A continuación te dejamos unas recomendaciones en base a lo seleccionado en el fomulario de diagnóstico</p> 
        <br>
        <h3>Producto elegido: ${product.NameProduct}</h3>
        <p>${product.Description}</p>
        <h4>Preguntas recomendadas:</h4>
        <ul>
          <li>${product.Question1}</li>
          <li>${product.Question2}</li>
        </ul>
        <br><br>
        <p>En breve, recibirás una recomendación personalizada con las mejores soluciones para ti.</p>
        <br><br>
        <p>¡Nos emociona acompañarte en este camino!</p>
        <br><p>Saludos, 
        <br>El equipo de VocalTech
      </p>`,
    };

    await sgMail.send(msg);
  },
};  
