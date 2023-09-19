
import { Router } from "express";

import accountController from "../controllers/account-controller";

export const accountRoutes = Router();

accountRoutes.get('/:id',accountController.show);