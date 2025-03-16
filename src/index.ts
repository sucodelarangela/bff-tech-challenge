import "express-async-errors";
import express from "express";
import cors from "cors";
import helmet from "helmet";
import routes from "./routes";
import { config } from "./config/env";

// Inicializa o servidor Express
const app = express();

// Middleware de segurança
app.use(helmet());

// Configuração do CORS
app.use(
  cors({
    origin: process.env.CORS_ORIGIN || "*",
    methods: ["GET", "POST"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// Middleware para parsing de JSON
app.use(express.json());

// Rotas da BFF
app.use("/bff", routes);

// Rota de health check
app.get("/health", (req, res) => {
  res.status(200).json({ status: "ok", environment: config.nodeEnv });
});

// Middleware de tratamento de erros
// TODO: Criar middleware
// app.use(errorHandler);

// Inicia o servidor
const PORT = config.port;
app.listen(PORT, () => {
  console.log(`🚀 BFF running on port ${PORT} in ${config.nodeEnv} mode`);
  console.log(`🔗 API URL: ${config.apiUrl}`);
});
