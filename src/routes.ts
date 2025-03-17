import { Router } from "express";
import apiController from "./controllers/apiController";
import { authMiddleware } from "./middleware/authMiddleware";

const router = Router();

// Rotas de usuário
router.post("/login", apiController.login);
router.get("/user", apiController.getUser);

// Rotas de conta
router.get("/account", authMiddleware, apiController.getAccount);
router.get(
  "/account/:id/statement",
  authMiddleware,
  apiController.getStatement
);
router.post(
  "/account/transaction",
  authMiddleware,
  apiController.createTransaction
);

export default router;
