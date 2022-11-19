import { Request, Response } from "express";

import { CustomRequest } from "../middlewares/jwt-verification";
import TokenPayload from "../@types/token-payload";

import Account from "../repositories/account-repository";
import AppDataSource from "../database";

class AccountController {

    async session(request:Request, response: Response){

        const { token } = (request as CustomRequest);
        const { accountId } = (token as TokenPayload);

        const repository = AppDataSource.getRepository(Account);
        const userAccount = await repository.findOne({ where: { id: accountId}});

        response.json(userAccount);

    }

}

export default new AccountController();
