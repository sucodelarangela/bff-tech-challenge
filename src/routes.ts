import { Router } from "express";
import apiController from "./controllers/apiController";
import { authMiddleware } from "./middleware/authMiddleware";

const router = Router();

// Rotas de usuário
router.post("/login", apiController.login);
router.get("/user", apiController.getUser);

// Rota de conta
router.get("/account", authMiddleware, apiController.getAccount);

// Rotas de transações
router.post(
  "/create-transaction",
  authMiddleware,
  apiController.createTransaction
);

// TODO: Implementar rota de extrato

export default router;
