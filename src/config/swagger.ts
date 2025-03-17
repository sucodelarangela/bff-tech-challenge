import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import { Express } from "express";
import { config } from "./env";

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Documentação BFF API",
      version: "1.0.0",
      description:
        "Backend For Frontend para consumir API e disponibilizar para o microfrontend do Tech Challenge",
    },
    servers: [
      {
        url: "/bff",
        description: "Local development server",
      },
      // {
      //   url: `https://bff-tech-challenge.vercel.app/`,
      //   description: "Production server",
      // },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
    },
    security: [
      {
        bearerAuth: [],
      },
    ],
  },
  apis: ["./src/routes.ts", "./src/types/*.ts"], // Caminhos para os arquivos com anotações JSDoc
};

const specs = swaggerJsdoc(options);

export const setupSwagger = (app: Express): void => {
  app.use("/bff/docs", swaggerUi.serve, swaggerUi.setup(specs));
  app.use("/swagger.json", (req, res) => {
    res.setHeader("Content-Type", "application/json");
    res.send(specs);
  });
};
