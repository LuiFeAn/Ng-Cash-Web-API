import { Router } from "express";

import authController from "./controllers/auth-controller";
import userController from "./controllers/user-controller";
import accountController from "./controllers/account-controller";
import transactionController from "./controllers/transaction-controller";

import { verifyJwt } from "./middlewares/jwt-verification";

const router = Router();

router.post('/authentication',authController.authenticate);

router.post('/users',userController.store);

router.get('/accounts',verifyJwt,accountController.session);

router.get('/transactions',verifyJwt,transactionController.session);
router.post('/transactions',verifyJwt,transactionController.store);


export default router;
