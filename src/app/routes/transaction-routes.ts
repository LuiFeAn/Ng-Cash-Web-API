import { Router } from "express";

import transactionController from "../controllers/transaction-controller";

import { verifyJwt } from "../middlewares/jwt-verification";

import classValidatorResource from "../middlewares/class-validator-resource";

import { CreateTransactionDTO, GetTransactionsDto } from "../dtos/transaction-dto";

export const transactionRoutes = Router();

transactionRoutes.get('/',verifyJwt,classValidatorResource(GetTransactionsDto,'query'),transactionController.index);

transactionRoutes.post('/',verifyJwt,classValidatorResource(CreateTransactionDTO,'body'),transactionController.store);