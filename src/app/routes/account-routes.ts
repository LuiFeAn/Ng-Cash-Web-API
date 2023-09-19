
import { Router } from "express";

import accountController from "../controllers/account-controller";

import classValidatorResource from "../middlewares/class-validator-resource";

import { AccountIdParamDto } from "../dtos/account-dto";

export const accountRoutes = Router();

accountRoutes.get('/:id',classValidatorResource(AccountIdParamDto,'params'),accountController.show);