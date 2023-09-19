import { Router } from "express";

import authController from "../controllers/auth-controller";

import classValidatorResource from "../middlewares/class-validator-resource";

import { AuthDTO } from "../dtos/auth-dto";

export const authRoutes = Router();

authRoutes.post('/',classValidatorResource(AuthDTO,'body'),authController.authenticate);