import { Router } from "express";

export const userRoutes = Router();

import userController from "../controllers/user-controller";

userRoutes.post('/',userController.store);