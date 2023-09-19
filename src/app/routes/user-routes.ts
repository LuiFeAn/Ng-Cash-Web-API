import { Router } from "express";

import classValidatorResource from "../middlewares/class-validator-resource";

import { CreateUserDTO } from "../dtos/user-dto";

import userController from "../controllers/user-controller";

export const userRoutes = Router();

userRoutes.post('/',classValidatorResource(CreateUserDTO,'body'),userController.store);