import { Router } from "express";


//Controllers
import authController from "./controllers/auth-controller";
import userController from "./controllers/user-controller";
import accountController from "./controllers/account-controller";
import transactionController from "./controllers/transaction-controller";

//Validations
import userValidation from "./validations/user-validation";
import transactionValidation from "./validations/transaction-validation";

//Middlewares
import { verifyJwt } from "./middlewares/jwt-verification";

const router = Router();

router.post('/authentication',authController.authenticate);

router.post('/users',userValidation.post,userController.store);

router.get('/accounts',verifyJwt,accountController.session);

router.get('/transactions',verifyJwt,transactionController.session);

router.post('/transactions',verifyJwt,transactionValidation.post,transactionController.store);


export default router;
