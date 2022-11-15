import { Router } from "express";

import userController from "./controllers/user-controller";
import accountController from "./controllers/account-controller";
import transactionController from "./controllers/transaction-controller";

const router = Router();

router.post('/users',userController.store);


export default router;
