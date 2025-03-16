import { Router } from "express";
import apiController from "./controllers/apiController";

const router = Router();

router.get("/user", apiController.getUser);

export default router;
