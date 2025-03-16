import { Router } from "express";
import apiController from "./controllers/apiController";

const router = Router();

// Rotas de usuário
router.post("/login", apiController.login);
router.get("/user", apiController.getUser);

export default router;
