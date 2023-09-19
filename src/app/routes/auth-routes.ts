import { Router } from "express";

export const authRoutes = Router();

import authController from "../controllers/auth-controller";

authRoutes.post('/',authController.authenticate);