import { Router } from "express";

import userController from "./Controllers/user-controller";
import accountController from "./Controllers/account-controller";
import transactionController from "./Controllers/transaction-controller";

const router = Router();


router.get('/users',userController.show);
router.post('/users');


export default router;
