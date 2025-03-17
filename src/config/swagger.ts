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
        url: `http://localhost:${config.port}`,
        description: "Local development server",
      },
      {
        url: `https://bff-tech-challenge.vercel.app/`,
        description: "Production server",
      },
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
  apis: ["./src/routes.ts"],
};

const specs = swaggerJsdoc(options);

export const setupSwagger = (app: Express): void => {
  app.use(
    "/docs",
    swaggerUi.serve,
    swaggerUi.setup(specs, {
      customCssUrl:
        "https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/5.18.3/swagger-ui.min.css",
    })
  );
  app.use("/swagger.json", (req, res) => {
    res.setHeader("Content-Type", "application/json");
    res.send(specs);
  });
};
