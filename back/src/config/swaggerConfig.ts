import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import { Express } from "express";

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "API Documentation",
      version: "1.0.0",
      description: "API documentation for the Node + Express + Airtable project",
    },
    servers: [
        {
          url: "https://h4-02-vocaltech.onrender.com",
          description: "Development server",
        },
      {
        url: "http://localhost:3000",
        description: "Local development server",
      },
            {
        url: "http://localhost:3001",
        description: "Local development docker server",
      },
    ],
  },
  apis: ["./src/router/*.ts", "./src/controllers/*.ts"], // Adjust based on actual structure
};

const swaggerSpec = swaggerJsdoc(options);

export function setupSwagger(app: Express) {
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
}
