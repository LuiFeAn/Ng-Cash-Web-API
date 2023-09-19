import { Router } from "express";

import { authRoutes } from "./auth-routes";

import { userRoutes } from "./user-routes";

import { accountRoutes } from "./account-routes";

import { transactionRoutes } from "./transaction-routes";

export const mainrRoutes = Router();

mainrRoutes.use('/authentication',authRoutes);

mainrRoutes.use('/users',userRoutes);

mainrRoutes.use('/account',accountRoutes);

mainrRoutes.use('/transactions',transactionRoutes);