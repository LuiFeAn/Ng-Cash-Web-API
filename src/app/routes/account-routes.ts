
import { Router } from "express";

import accountController from "../controllers/account-controller";

const accountRoutes = Router();

accountRoutes.get('/account/:id',accountController.show);