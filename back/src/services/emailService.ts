import sgMail from "@sendgrid/mail";
import { config } from "../config/validateEnv";
import { productService } from "./productService";
import { ProductFields } from './../models/Product';

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

  async sendCustomEmail(to: string, subject: string, text: string, html: string) {
    const msg = {
      to,
      from: "lms.segovia86@gmail.com", // Email verificado en SendGrid
      subject,
      text,
      html,
    };

    await sgMail.send(msg);
  },
};

export const emailDiagnosticService = {
    async sendDiagnosticEmail(to: string, name: string, productIds: string[]) {
      let productSections = "";
      let productDetails: any[] = [];

      if (productIds && productIds.length > 0) {
        productDetails = await Promise.all(
          productIds.map(async (productId) => {
            return await productService.findProductById(productId);
          })
        );
      }
      
      const validProducts = productDetails.filter(product => product && (product.NameProduct || product.id));
            
    //   console.log("Product IDs: ", productIds);
    //   console.log("valid IDs: ", validProducts);
  
      // Build HTML product sections
      productSections = validProducts
        .map((product, index) => `
          <br>
          <h3>Producto elegido ${index + 1}: ${product.NameProduct}</h3>
          <p>${product.Description}</p>
          <ul>
            <h4>Recomendamos trabajar:</h4>
            <li>${product.Question1}</li>
            <h4>¿Qué vas a lograr?</h4>
            <li>${product.Question2}</li>
          </ul>
          <br>
        `)
        .join("\n");
  
      // Build plain text version
      const textProductSections = validProducts
        .map((product, index) => 
          `Producto elegido ${index + 1}: ${product.NameProduct}
  Descripción: ${product.Description}
  Recomendamos trabajar:
  - ${product.Question1}
 ¿Qué vas a lograr?
  - ${product.Question2}`
        )
        .join("\n");
  
      const msg = {
        to,
        from: "lms.segovia86@gmail.com",
        subject: `Hola ${name}`,
        text: `Hola ${name}, gracias por completar nuestro diagnóstico en VocalTech. Hemos recibido tu información y estamos analizando los mejores recursos para ayudarte a potenciar tu comunicación y liderazgo.
  
  ${textProductSections}
  
  En breve, recibirás una recomendación personalizada con las mejores soluciones para ti.
  
  ¡Nos emociona acompañarte en este camino!
  
  Saludos,
  El equipo de VocalTech`,
        html: `<h1>Hola ${name}!</h1>
          <p>Gracias por completar nuestro diagnóstico en VocalTech. Hemos recibido tu información y estamos analizando los mejores recursos para ayudarte a potenciar tu comunicación y liderazgo. 
            A continuación te dejamos unas recomendaciones en base a lo seleccionado en el formulario de diagnóstico:</p> 
          ${productSections}
          <p>En breve, recibirás una recomendación personalizada con las mejores soluciones para ti.</p>
          <br><br>
          <p>¡Nos emociona acompañarte en este camino!</p>
          <br><p>Saludos, 
          <br>El equipo de VocalTech
        </p>`
      };
  
      await sgMail.send(msg);
    },
  };
  

  export const emailResponseDiagnosticService = {
    async sendResponseDiagnosticEmail(to: string, name: string, productIds: string[], Diagnostic: string) {
      let productSections = "";
      let productDetails: any[] = [];

      if (productIds && productIds.length > 0) {
        productDetails = await Promise.all(
          productIds.map(async (productId) => {
            return await productService.findProductById(productId);
          })
        );
      }
      
      const validProducts = productDetails.filter(product => product && (product.NameProduct || product.id));
            
    //   console.log("Product IDs: ", productIds);
    //   console.log("valid IDs: ", validProducts);
  
      // Build HTML product sections
      productSections = validProducts
        .map((product, index) => `
          <h3>Producto sugerido ${index + 1}: ${product.NameProduct}</h3>
          <p>${product.Description}</p>
        `)
        .join("\n");
  
      // Build plain text version
      const textProductSections = validProducts
        .map((product, index) => 
          `Producto sugerido ${index + 1}: ${product.NameProduct}
  Descripción: ${product.Description}
        `)
        .join("\n");
  
      const msg = {
        to,
        from: "lms.segovia86@gmail.com",
        subject: `Hola ${name}`,
        text: `Hola ${name}, gracias por completar nuestro diagnóstico en VocalTech.  
        Analizando tu información lo recomendable sería.
  
  ${textProductSections}
  
 ¿Qué vas a lograr?
  - ${Diagnostic}
  
  ¡Nos emociona acompañarte en este camino!
  
  Saludos,
  El equipo de VocalTech`,
        html: `<h1>Hola ${name}!</h1>
          <p>Gracias por completar nuestro diagnóstico en VocalTech.</p>
          <p>Analizando tu información lo recomendable sería.</p> 
          ${productSections}
          <p>¿Qué vas a lograr?</p>
          <p>${Diagnostic}</p>
          <br>
          <p>¡Nos emociona acompañarte en este camino!</p>
          <p>Saludos, 
          <br>El equipo de VocalTech
        </p>`
      };
  
      await sgMail.send(msg);
    },
  };





  //**************version original KO***************** */
// export const emailDiagnosticService = {
//   async sendDiagnosticEmail(to: string, name: string, product: ProductFields) {
//     const msg = {
//       to,
//       from: "lms.segovia86@gmail.com",
//       subject: `Hola ${name}`,
//       text: `Hola ${name}, gracias por completar nuestro diagnóstico en VocalTech. Hemos recibido tu información y estamos analizando los mejores recursos para ayudarte a potenciar tu comunicación y liderazgo.

//       Producto elegido: ${product.NameProduct}
//       Descripción: ${product.Description}
//       Preguntas recomendadas:
//       - ${product.Question1}
//       - ${product.Question2}
//       `,
//       html: `<h1>Hola ${name}!</h1>
//         <p>Gracias por completar nuestro diagnóstico en VocalTech. Hemos recibido tu información y estamos analizando los mejores recursos para ayudarte a potenciar tu comunicación y liderazgo. 
//           A continuación te dejamos unas recomendaciones en base a lo seleccionado en el fomulario de diagnóstico</p> 
//         <br>
//         <h3>Producto elegido: ${product.NameProduct}</h3>
//         <p>${product.Description}</p>
//         <h4>Preguntas recomendadas:</h4>
//         <ul>
//           <li>${product.Question1}</li>
//           <li>${product.Question2}</li>
//         </ul>
//         <br><br>
//         <p>En breve, recibirás una recomendación personalizada con las mejores soluciones para ti.</p>
//         <br><br>
//         <p>¡Nos emociona acompañarte en este camino!</p>
//         <br><p>Saludos, 
//         <br>El equipo de VocalTech
//       </p>`,
//     };

//     await sgMail.send(msg);
//   },
// };  
