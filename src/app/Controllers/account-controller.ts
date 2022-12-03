import { Request, Response } from "express";

import { CustomRequest } from "../middlewares/jwt-verification";
import TokenPayload from "../@types/token-payload";

import accountService from '../services/account-service';


class AccountController {

    async session(request:Request, response: Response){

        const { token } = request as CustomRequest;
        const { accountId } = token as TokenPayload;

        const service = await accountService.getAccountByTokenId(accountId);

        response.json(service);

    }

}

export default new AccountController();
