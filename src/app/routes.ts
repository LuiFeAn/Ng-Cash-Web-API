import { Router } from "express";

import authController from "./controllers/auth-controller";
import userController from "./controllers/user-controller";
import accountController from "./controllers/account-controller";
import transactionController from "./controllers/transaction-controller";

const router = Router();

router.post('/authentication',authController.authenticate);

router.post('/users',userController.store);


export default router;
