import { Router } from "express";

export const transactionRoutes = Router();

import transactionController from "../controllers/transaction-controller";

import { verifyJwt } from "../middlewares/jwt-verification";

transactionRoutes.get('/',verifyJwt,transactionController.index);

transactionRoutes.post('/',verifyJwt,transactionController.store);